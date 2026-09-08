export const MeetingPlatform = {
  Teams: 'Teams',
  Zoom: 'Zoom',
  GoogleMeet: 'GoogleMeet',
  Webex: 'Webex',
  Unknown: 'Unknown'
};

export class PlatformDetector {
  static detect(url) {
    try {
      const parsed = new URL(url);
      if (parsed.protocol !== 'https:' || parsed.username || parsed.password || parsed.port) return MeetingPlatform.Unknown;
      const host = parsed.hostname.toLowerCase();
      if (['teams.microsoft.com', 'teams.live.com', 'teams.cloud.microsoft'].includes(host)) return MeetingPlatform.Teams;
      if (host.includes('zoom.us')) return MeetingPlatform.Zoom;
      if (host === 'meet.google.com' && /^\/[a-z]{3}-[a-z]{4}-[a-z]{3}\/?$/.test(parsed.pathname)) return MeetingPlatform.GoogleMeet;
      if (host.includes('webex.com')) return MeetingPlatform.Webex;
    } catch (_) {}
    return MeetingPlatform.Unknown;
  }
}

export class PlatformJoiners {
  static normalizeJoinUrl(platform, originalUrl, botName) {
    if (platform !== MeetingPlatform.Zoom) return originalUrl;

    try {
      const uri = new URL(originalUrl);
      const m = uri.pathname.match(/\/j\/(\d+)/i);
      if (!m) return originalUrl;

      const meetingId = m[1];
      const params = new URLSearchParams(uri.search);
      params.set('prefer', '1');
      params.set('un', Buffer.from(botName, 'utf8').toString('base64'));
      return `${uri.origin}/wc/${meetingId}/join?${params.toString()}`;
    } catch (_) {
      return originalUrl;
    }
  }

  static async join(platform, page, config, abortSignal) {
    const name = config.bot.name || 'MRCL Meeting Bot';
    const email = config.bot.email || 'meetingbot@example.com';
    const timeout = (config.bot.joinTimeoutSeconds || 90) * 1000;
    page.setDefaultTimeout(timeout);

    switch (platform) {
      case MeetingPlatform.Teams:
        await this.joinTeams(page, name, abortSignal, config.bot);
        break;
      case MeetingPlatform.Zoom:
        await this.joinZoom(page, name);
        break;
      case MeetingPlatform.GoogleMeet:
        await this.joinMeet(page, name, abortSignal, config.bot.joinTimeoutSeconds);
        break;
      case MeetingPlatform.Webex:
        await this.joinWebex(page, name, email, abortSignal);
        break;
      default:
        throw new Error('Supported links: Microsoft Teams, Zoom, Google Meet and Webex.');
    }
  }

  static async detectLobbyState(platform, page) {
    try {
      const text = (await page.locator('body').innerText()).toLowerCase();
      if (platform === MeetingPlatform.Zoom &&
          (text.includes('waiting for the host') || text.includes('host will let you in') || text.includes('waiting room'))) {
        return 'Waiting for host admission';
      }
      if (platform === MeetingPlatform.Teams &&
          (text.includes('someone in the meeting should let you in soon') ||
           text.includes("we've let people in the meeting know you're waiting") ||
           text.includes("we've let people know you're waiting") ||
           text.includes("let people know you're waiting") ||
           text.includes("when the meeting starts") ||
           text.includes("waiting to be admitted") ||
           text.includes("waiting in the lobby") ||
           text.includes("you're in the lobby") ||
           text.includes("you are in the lobby") ||
           text.includes("waiting for the host") ||
           text.includes("waiting for host") ||
           text.includes("host will let you in") ||
           text.includes("you'll be admitted soon"))) {
        return 'Waiting for host admission';
      }
      if (platform === MeetingPlatform.GoogleMeet &&
          (text.includes('asking to join') || text.includes("you'll join the call when someone lets you in"))) {
        return 'Waiting for host admission';
      }
      if (platform === MeetingPlatform.Webex &&
          (text.includes('waiting in the lobby') ||
           text.includes('you are in the lobby') ||
           text.includes("you're in the lobby") ||
           text.includes('waiting to be admitted') ||
           text.includes('wait for the host to admit you') ||
           text.includes('waiting for the host to let you in') ||
           text.includes('host will let you in') ||
           text.includes('the host will let you in') ||
           text.includes('please wait for the host') ||
           text.includes('waiting for host approval'))) {
        return 'Waiting for host admission';
      }
    } catch (_) {}
    return null;
  }

  static async isInMeeting(platform, page) {
    try {
      switch (platform) {
        case MeetingPlatform.Zoom:
          return await this.isZoomActuallyInMeeting(page);
        case MeetingPlatform.Teams:
          return await this.isTeamsActuallyInMeeting(page);
        case MeetingPlatform.GoogleMeet:
          return await this.isMeetActuallyInMeeting(page);
        case MeetingPlatform.Webex:
          return await this.isWebexActuallyInMeeting(page);
        default:
          return false;
      }
    } catch (_) {
      return false;
    }
  }

  static async isMeetActuallyInMeeting(p) {
    try {
      if (p.isClosed()) return false;

      // If pre-join inputs or ask to join buttons are visible, bot is NOT in the meeting
      const hasPrejoin = await this.anyVisibleDeep(p,
        "input[placeholder*='name' i]",
        "input[aria-label*='Your name' i]",
        "button[aria-label*='Ask to join' i]",
        "button:has-text('Ask to join')",
        "button:has-text('Join now')",
        "button[aria-label*='Join now' i]"
      );
      if (hasPrejoin) return false;

      const lobby = await this.detectLobbyState(MeetingPlatform.GoogleMeet, p);
      if (lobby) return false;

      return await this.anyVisibleDeep(p,
        "button[aria-label*='Leave call' i]",
        "button[data-tooltip*='Leave call' i]",
        "button[aria-label*='Show everyone' i]",
        "button[aria-label*='Chat with everyone' i]",
        "button[aria-label*='Meeting details' i]",
        "button[aria-label*='Host controls' i]"
      );
    } catch (_) {
      return false;
    }
  }

  static async isTeamsActuallyInMeeting(p) {
    try {
      if (p.isClosed()) return false;

      const hasPrejoin = await this.anyVisibleDeep(p,
        "input[data-tid*='prejoin-display-name' i]",
        "button[data-tid*='prejoin-join' i]",
        "button:has-text('Continue on this browser')",
        "button:has-text('Join now')"
      );
      if (hasPrejoin) return false;

      const lobby = await this.detectLobbyState(MeetingPlatform.Teams, p);
      if (lobby) return false;

      return await this.anyVisibleDeep(p,
        "button[data-tid*='hangup' i]",
        "button[aria-label*='Leave' i]",
        "button[aria-label*='People' i]",
        "button[aria-label*='Chat' i]",
        "button[data-tid*='call-controls' i]"
      );
    } catch (_) {
      return false;
    }
  }

  static async isZoomActuallyInMeeting(p) {
    try {
      if (p.isClosed()) return false;

      const hasPrejoin = await this.anyVisibleDeep(p,
        "input#input-for-name",
        "button.preview-join-button",
        "button:has-text('Join Meeting')"
      );
      if (hasPrejoin) return false;

      const lobby = await this.detectLobbyState(MeetingPlatform.Zoom, p);
      if (lobby) return false;

      return await this.anyVisibleDeep(p,
        "button.footer__leave-btn",
        "button[aria-label*='Leave' i]",
        "button[aria-label*='Participants' i]",
        "button[aria-label*='Chat' i]"
      );
    } catch (_) {
      return false;
    }
  }

  static async isMeetingEnded(platform, page) {
    try {
      if (page.isClosed()) return true;
      const text = (await page.locator('body').innerText()).toLowerCase();

      switch (platform) {
        case MeetingPlatform.Zoom:
          return text.includes('meeting has been ended by host') ||
                 text.includes('this meeting has been ended') ||
                 text.includes('the host has ended this meeting') ||
                 text.includes('you have been removed from the meeting');
        case MeetingPlatform.Teams:
          return text.includes("you've left the meeting") ||
                 text.includes('you have left the meeting') ||
                 text.includes('this meeting has ended') ||
                 text.includes('the meeting has ended') ||
                 text.includes('you were removed from the meeting');
        case MeetingPlatform.GoogleMeet:
          return text.includes('you left the meeting') ||
                 text.includes("you've left the call") ||
                 text.includes('the call has ended') ||
                 text.includes('you were removed');
        case MeetingPlatform.Webex:
          return text.includes('meeting has ended') ||
                 text.includes('the meeting has ended') ||
                 text.includes('this meeting has ended') ||
                 text.includes('meeting is over') ||
                 text.includes('you left the meeting') ||
                 text.includes('you have left the meeting') ||
                 text.includes('you have been removed') ||
                 text.includes('the host has ended the meeting');
        default:
          return false;
      }
    } catch (_) {
      return false;
    }
  }

  static async leaveMeeting(platform, page) {
    try {
      if (page.isClosed()) return;

      switch (platform) {
        case MeetingPlatform.Zoom:
          await this.clickSelectorAnyDeep(page,
            'button.footer__leave-btn',
            "button[aria-label='Leave']",
            "button[aria-label*='Leave meeting' i]",
            "button[aria-label*='Leave' i]");
          await page.waitForTimeout(350);
          await this.clickAnyDeep(page, 'Leave Meeting', 'Leave meeting', 'Leave');
          break;

        case MeetingPlatform.Teams:
          await this.clickSelectorAnyDeep(page,
            "button[data-tid*='hangup' i]",
            "button[aria-label*='Leave' i]");
          await page.waitForTimeout(350);
          await this.clickAnyDeep(page, 'Leave', 'Leave meeting');
          break;

        case MeetingPlatform.GoogleMeet:
          await this.clickSelectorAnyDeep(page,
            "button[aria-label*='Leave call' i]",
            "button[data-tooltip*='Leave call' i]");
          break;

        case MeetingPlatform.Webex:
          await this.clickSelectorAnyDeep(page,
            "button[data-test*='leave' i]",
            "button[data-testid*='leave' i]",
            "button[aria-label*='Leave' i]",
            "button[aria-label*='End' i]");
          await page.waitForTimeout(350);
          await this.clickAnyDeep(page, 'Leave meeting', 'Leave Meeting', 'Leave');
          break;
      }

      for (let i = 0; i < 8; i++) {
        if (page.isClosed() || await this.isMeetingEnded(platform, page) || !await this.isInMeeting(platform, page)) break;
        await page.waitForTimeout(500);
      }
    } catch (_) {}
  }

  static async isWebexActuallyInMeeting(page) {
    try {
      if (page.isClosed()) return false;

      const title = (await page.title()).toLowerCase();
      if (title.includes('in meeting') && title.includes('webex')) return true;

      const body = (await this.safeBodyText(page)).toLowerCase();
      if (body.includes('the meeting has ended') ||
          body.includes('meeting has ended') ||
          body.includes('enter your name and join') ||
          body.includes('get ready to join') ||
          body.includes('waiting in the lobby') ||
          body.includes('waiting to be admitted') ||
          body.includes('wait for the host')) {
        return false;
      }

      return await this.anyVisibleDeep(page,
        "button[data-test*='leave' i]",
        "button[data-testid*='leave' i]",
        "button[aria-label='Leave meeting' i]",
        "button[aria-label*='Leave meeting' i]",
        "button[aria-label*='Participants' i]",
        "button[aria-label*='Meeting info' i]");
    } catch (_) {
      return false;
    }
  }

  static async joinTeams(p, name, abortSignal, options = {}) {
    // Bound stale-control waits independently from the overall join deadline.
    p.setDefaultTimeout(1500);
    const deadline = Date.now() + (options.joinTimeoutSeconds || 90) * 1000;
    for (let attempt = 0; attempt < 36; attempt++) {
      if (abortSignal && abortSignal.aborted) throw new Error('Join canceled');
      if (Date.now() >= deadline) break;

      if (await this.isInMeeting(MeetingPlatform.Teams, p) ||
          await this.detectLobbyState(MeetingPlatform.Teams, p) !== null) {
        return;
      }

      const body = await this.safeBodyText(p);
      const lower = body.toLowerCase();

      if (lower.includes('captcha') || lower.includes('verify you are human')) {
        throw new Error('Teams requested interactive verification/CAPTCHA.');
      }

      // 1) Continue on this browser (Teams web app join)
      if (await this.clickSelectorAnyDeep(p,
          "button[data-tid='joinOnWeb']",
          "button[data-tid*='join-on-web' i]",
          "button[data-tid*='joinOnWeb' i]",
          "a[data-tid='joinOnWeb']",
          "a[data-tid*='joinOnWeb' i]",
          "[data-tid='joinOnWeb']",
          "[data-tid*='joinOnWeb' i]",
          "button:has-text('Continue on this browser')",
          "button:has-text('Join meeting from this browser')",
          "a:has-text('Continue on this browser')",
          "a:has-text('Join meeting from this browser')",
          "[role='button']:has-text('Continue on this browser')",
          "[role='button']:has-text('Join meeting from this browser')") ||
          await this.clickAnyDeep(p,
          'Continue on this browser',
          'Continue in this browser',
          'Join on the web instead',
          'Join on the web',
          'Use the web app instead',
          'Join in this browser',
          'Join meeting from this browser')) {
        await p.waitForTimeout(350);
        continue;
      }

      // 2) Media permission bypass
      if (!options.transcriptionEnabled && (await this.clickSelectorAnyDeep(p,
          "button:has-text('Continue without audio or video')",
          "button:has-text('Continue without audio and video')",
          "button:has-text('Continue without audio')",
          "button:has-text('Join without audio')",
          "[role='button']:has-text('Continue without audio')") ||
          await this.clickAnyDeep(p,
          'Continue without audio or video',
          'Continue without audio and video',
          'Continue without audio',
          'Join without audio or video',
          'Join without audio'))) {
        await p.waitForTimeout(1000);
        continue;
      }

      // 3) Join without signing in
      if (await this.clickSelectorAnyDeep(p,
          "button[data-tid*='guest' i]",
          "button:has-text('Join without signing in')",
          "button:has-text('Continue without signing in')",
          "button:has-text('Join as a guest')",
          "button:has-text('Join as guest')",
          "a:has-text('Join as guest')",
          "[role='button']:has-text('Join as guest')") ||
          await this.clickAnyDeep(p,
          'Join without signing in',
          'Continue without signing in',
          'Join as a guest',
          'Join as guest')) {
        await p.waitForTimeout(350);
        continue;
      }

      // 4) Fill display name
      const nameFilled = await this.fillFirstDeepWithResult(p, name,
        "input[data-tid='prejoin-display-name-input']",
        "input[data-tid*='prejoin-display-name' i]",
        "input[data-tid*='display-name' i]",
        "input[placeholder*='type your name' i]",
        "input[placeholder*='name' i]",
        "input[aria-label*='name' i]");

      // Keep computer audio connected; mute only the bot's microphone and camera.
      if (nameFilled) await this.turnOffMediaDeep(p);

      // 6) Click Join now button
      const clickedJoin = await this.clickSelectorAnyDeep(p,
        "button[data-tid='prejoin-join-button']",
        "button[data-tid*='prejoin-join' i]",
        "button[data-tid*='join-button' i]",
        "button[aria-label='Join now']",
        "button[aria-label*='Join now' i]",
        "button:has-text('Join now')",
        "[role='button']:has-text('Join now')") ||
        await this.clickAnyDeep(p, 'Join now', 'Ask to join', 'Join meeting', 'Join');

      if (clickedJoin || nameFilled) {
        await p.waitForTimeout(1000);
        if (await this.isInMeeting(MeetingPlatform.Teams, p) ||
            await this.detectLobbyState(MeetingPlatform.Teams, p) !== null) {
          return;
        }
      }

      await p.waitForTimeout(850);
    }

    const finalBody = (await this.safeBodyText(p)).toLowerCase();
    if (finalBody.includes('one-time passcode') || finalBody.includes('send code') || finalBody.includes('verification code')) {
      throw new Error('Teams requires email/one-time-passcode verification for this meeting.');
    }
    if (finalBody.includes('sign in') && !finalBody.includes('join now')) {
      throw new Error('Teams requires sign-in for this meeting. Guest browser join is not enabled.');
    }

    const controls = await this.describeInteractiveControlsDeep(p);
    throw new Error(`Teams pre-join did not reach Join now. Visible controls: ${controls}`);
  }

  static async joinZoom(p, name) {
    for (let i = 0; i < 4; i++) {
      await this.clickAnyDeep(p, 'Join from your browser', 'Join from Browser', 'Launch Meeting', 'Continue');
      await p.waitForTimeout(800);
    }

    await this.clickAnyDeep(p, 'Accept Cookies', 'Accept all cookies', 'Agree and Proceed', 'I Agree', 'Accept');

    await this.fillFirstDeep(p, name,
      'input#input-for-name',
      "input[name='displayName']",
      "input[placeholder*='name' i]",
      "input[aria-label*='name' i]");

    await this.turnOffMediaDeep(p);

    try {
      for (const frame of this.allFrames(p)) {
        const boxes = frame.locator("input[type='checkbox']");
        const count = await boxes.count();
        for (let i = 0; i < count; i++) {
          const b = boxes.nth(i);
          if (await b.isVisible() && !(await b.isChecked())) {
            try { await b.check({ force: true }); } catch (_) {}
          }
        }
      }
    } catch (_) {}

    let joined = false;
    for (let attempt = 0; attempt < 12 && !joined; attempt++) {
      joined = await this.clickSelectorAnyDeep(p,
        'button.preview-join-button',
        "button[data-testid*='join' i]",
        "button[class*='join' i]:not([disabled])");

      joined = joined || await this.clickAnyDeep(p, 'Join', 'Join Meeting', 'Join meeting', 'Join Audio', 'Continue');
      if (!joined) await p.waitForTimeout(1000);
    }

    if (!joined && !await this.isInMeeting(MeetingPlatform.Zoom, p)) {
      const body = (await this.safeBodyText(p)).toLowerCase();
      if (body.includes('captcha')) throw new Error('Zoom requested guest verification/CAPTCHA.');
      if (body.includes('sign in') || body.includes('authenticated')) throw new Error('Zoom requires authentication.');
      if (body.includes('end-to-end encryption') || body.includes('e2ee')) throw new Error('This Zoom meeting uses E2EE and cannot use Web App bot.');
      throw new Error('Zoom pre-join Join button could not be activated automatically.');
    }
  }

  static async joinMeet(p, name, abortSignal, timeoutSeconds = 90) {
    const deadline = Date.now() + timeoutSeconds * 1000;
    // Google Meet pre-join loop: handles device permission modals, name input,
    // mic/cam mute, and Ask to join / Join now buttons.
    for (let attempt = 0; attempt < 35; attempt++) {
      if (abortSignal && abortSignal.aborted) throw new Error('Join canceled');

      if (Date.now() >= deadline) throw new Error('Google Meet pre-join timed out. Check the link and whether Google sign-in is required.');

      if (await this.isInMeeting(MeetingPlatform.GoogleMeet, p) ||
          await this.detectLobbyState(MeetingPlatform.GoogleMeet, p) !== null) {
        return;
      }

      const body = await this.safeBodyText(p);
      const lower = body.toLowerCase();

      if (lower.includes("you can't join this video call") || lower.includes('you cannot join this video call')) {
        throw new Error("Google Meet reported: \"You can't join this video call\". This meeting is either inactive/ended, or the host organization requires participants to sign in with a Google Account.");
      }

      if (lower.includes('returning to home screen') || (lower.includes('return to home screen') && !lower.includes('ask to join') && !lower.includes('join now'))) {
        throw new Error("Google Meet reported that this meeting is no longer active (Return to home screen).");
      }

      if (lower.includes('sign in') && (lower.includes('sign in to join') || lower.includes('google account'))) {
        throw new Error('Google Meet requires Google Account sign-in. Guest browser join is not enabled by the organizer.');
      }

      if (lower.includes('check your meeting code') || lower.includes("couldn't find your meeting") || lower.includes("invalid meeting code")) {
        throw new Error('Invalid Google Meet meeting code or meeting does not exist.');
      }

      // 1) Dismiss any Google Meet overlay dialogs / prompts
      await this.clickAnyDeep(p, 'Got it', 'Dismiss', 'Close', 'No thanks', 'Allow', 'Continue without microphone');

      // 2) Fill display name if present
      const filledName = await this.fillFirstDeepWithResult(p, name,
        "input[placeholder*='Your name' i]",
        "input[aria-label*='Your name' i]",
        "input[placeholder*='name' i]",
        "input[aria-label*='name' i]",
        "input[type='text']");

      if (filledName) {
        await p.waitForTimeout(300);
      }

      // 3) Turn off camera and microphone on the pre-join preview
      await this.turnOffMediaDeep(p);
      await this.turnOffGoogleMeetMedia(p);

      // 4) Click Join button
      const clickedJoin = await this.clickSelectorAnyDeep(p,
        "button[aria-label*='Ask to join' i]",
        "button[aria-label*='Join now' i]",
        "button[data-idom-class*='join' i]",
        "button[jsname*='Qx7uuf']",
        "button:has-text('Ask to join')",
        "button:has-text('Join now')",
        "button:has-text('Join')",
        "[role='button']:has-text('Ask to join')",
        "[role='button']:has-text('Join now')",
        "span:has-text('Ask to join')",
        "span:has-text('Join now')") ||
        await this.clickAnyDeep(p, 'Ask to join', 'Join now', 'Join', 'Ask to join meeting') ||
        await this.clickLooseDeep(p, 'ask to join', 'join now');

      // 5) If name is filled and attempt >= 2, also press Enter to trigger form submission
      if (!clickedJoin && filledName && attempt >= 2) {
        try {
          await p.keyboard.press('Enter');
          await p.waitForTimeout(600);
        } catch (_) {}
      }

      if (clickedJoin || filledName) {
        for (let wait = 0; wait < 8; wait++) {
          await p.waitForTimeout(600);
          if (await this.isInMeeting(MeetingPlatform.GoogleMeet, p)) return;
          if (await this.detectLobbyState(MeetingPlatform.GoogleMeet, p) !== null) return;
        }
        continue;
      }

      await p.waitForTimeout(850);
    }

    const finalBody = (await this.safeBodyText(p)).toLowerCase();
    if (finalBody.includes('sign in')) {
      throw new Error('Google Meet requires Google Account sign-in. Guest browser join is not permitted for this meeting.');
    }

    const controls = await this.describeInteractiveControlsDeep(p);
    throw new Error(`Google Meet join button not found after multiple attempts. Controls detected: ${controls}`);
  }

  static async turnOffGoogleMeetMedia(p) {
    for (const frame of this.allFrames(p)) {
      try {
        const mediaButtons = frame.locator("div[role='button'][aria-label*='microphone' i], div[role='button'][aria-label*='camera' i], button[aria-label*='microphone' i], button[aria-label*='camera' i]");
        const count = await mediaButtons.count();
        for (let i = 0; i < count; i++) {
          const btn = mediaButtons.nth(i);
          try {
            const aria = (await btn.getAttribute('aria-label') || '').toLowerCase();
            if (aria.includes('turn off') || (aria.includes('mute') && !aria.includes('unmute'))) {
              await btn.click({ force: true });
              await p.waitForTimeout(150);
            }
          } catch (_) {}
        }
      } catch (_) {}
    }
  }

  static async joinWebex(p, name, email, abortSignal) {
    // Webex guest flow: handles cookie consent, browser launcher, guest identity,
    // media preview, and Join meeting.
    for (let attempt = 0; attempt < 45; attempt++) {
      if (abortSignal && abortSignal.aborted) throw new Error('Join canceled');

      if (await this.isInMeeting(MeetingPlatform.Webex, p) ||
          await this.detectLobbyState(MeetingPlatform.Webex, p) !== null) {
        return;
      }

      const body = await this.safeBodyText(p);
      const lower = body.toLowerCase();
      if (lower.includes('captcha') || lower.includes('verify you are human')) {
        throw new Error('Webex requested interactive verification/CAPTCHA.');
      }

      // 1) Dismiss cookie consent or modal dialogs FIRST so they don't block buttons underneath
      try {
        await p.keyboard.press('Escape');
      } catch (_) {}

      await this.clickSelectorAnyDeep(p,
        "button[data-test*='close' i]",
        "button[aria-label*='close' i]",
        "button[aria-label*='dismiss' i]",
        "button.el-dialog__headerbtn",
        "i.el-dialog__close",
        ".el-dialog__close",
        "button[data-testid*='close' i]");

      if (await this.clickAnyDeep(p,
          'Accept', 'Accept all', 'Accept All', 'Reject', 'Reject all', 'Reject All',
          'Accept cookies', 'Accept Cookies', 'I agree', 'I Agree', 'Close', 'Dismiss') ||
          await this.clickLooseDeep(p, 'accept all', 'reject all', 'accept cookies', 'manage cookie', 'reject')) {
        await p.waitForTimeout(400);
      }

      // 2) Force browser/web-app path rather than downloading or launching the native Webex app
      const hasWebexFields = await this.anyVisibleDeep(p,
        'input#guestName', 'input#displayName', "input[name='guestName']",
        "input[placeholder*='your name' i]", "input[placeholder*='name' i]",
        "button[data-test*='join-meeting' i]", "button:has-text('Join meeting')"
      );

      if (!hasWebexFields) {
        const clickedBrowserJoin = await this.clickWebexBrowserOption(p);
        if (clickedBrowserJoin) {
          await p.waitForTimeout(1500);
          continue;
        }
      }

      // 3) Explicit guest path if shown
      if (await this.clickAnyDeep(p, 'Join as guest', 'Continue as guest', 'Join as a guest', 'Guest') ||
          await this.clickLooseDeep(p, 'join as guest', 'continue as guest')) {
        await p.waitForTimeout(800);
        continue;
      }

      // 4) Fill Webex guest identity
      const filledName = await this.fillFirstDeepWithResult(p, name,
        'input#guestName', 'input#displayName', "input[name='guestName']",
        "input[name*='displayName' i]", "input[name*='display-name' i]",
        "input[autocomplete='name']", "input[placeholder*='your name' i]",
        "input[placeholder*='name' i]", "input[aria-label*='your name' i]",
        "input[aria-label*='name' i]");

      const filledEmail = await this.fillFirstDeepWithResult(p, email,
        'input#guestEmail', "input[name='guestEmail']", "input[type='email']",
        "input[name*='email' i]", "input[autocomplete='email']",
        "input[placeholder*='email' i]", "input[aria-label*='email' i]");

      const genericFilled = await this.fillWebexRequiredFieldsDeep(p, name, email);
      if (filledName || filledEmail || genericFilled > 0) {
        await p.waitForTimeout(500);
      }

      // Next / Continue button on identity screen
      if ((filledName || genericFilled > 0) &&
          (await this.clickAnyDeep(p, 'Next', 'Continue') || await this.clickLooseDeep(p, 'next', 'continue'))) {
        await p.waitForTimeout(900);
        continue;
      }

      // 5) Render remote audio
      if (await this.clickAnyDeep(p,
          'Use computer audio', 'Use computer for audio', 'Connect to audio', 'Use computer audio only') ||
          await this.clickLooseDeep(p, 'use computer audio', 'connect to audio')) {
        await p.waitForTimeout(500);
      }

      await this.turnOffMediaDeep(p);

      // 6) Join meeting button
      const clickedJoin = await this.clickSelectorAnyDeep(p,
        "button[data-test*='join-meeting' i]:not([disabled])",
        "button[data-testid*='join-meeting' i]:not([disabled])",
        "button[aria-label*='Join meeting' i]:not([disabled])",
        "button:has-text('Join meeting'):not([disabled])") ||
        await this.clickAnyDeep(p, 'Join meeting', 'Join Meeting', 'Ask to join', 'Join') ||
        await this.clickLooseDeep(p, 'join meeting', 'ask to join') ||
        await this.clickWebexJoinDirect(p);

      if (clickedJoin) {
        for (let wait = 0; wait < 12; wait++) {
          await p.waitForTimeout(500);
          if (await this.isInMeeting(MeetingPlatform.Webex, p)) return;
          if (await this.detectLobbyState(MeetingPlatform.Webex, p) !== null) return;
          const afterJoinBody = (await this.safeBodyText(p)).toLowerCase();
          if (this.looksLikeWebexPostJoinWaiting(afterJoinBody)) return;
        }
        continue;
      }

      if (lower.includes('please complete the requir') || lower.includes('required field')) {
        await this.fillWebexRequiredFieldsDeep(p, name, email);
        await p.waitForTimeout(650);
        continue;
      }

      await p.waitForTimeout(800);
    }

    const finalBody = (await this.safeBodyText(p)).toLowerCase();
    if (finalBody.includes('verification code') || finalBody.includes('one-time') || finalBody.includes('email code')) {
      throw new Error('Webex requires interactive email verification for this meeting.');
    }
    if (finalBody.includes('sign in') && !finalBody.includes('join meeting')) {
      throw new Error('Webex requires sign-in for this meeting. Guest browser join is not enabled.');
    }

    const controls = await this.describeInteractiveControlsDeep(p);
    throw new Error(`Webex pre-join did not reach Join meeting. Visible controls: ${controls}`);
  }

  static async clickWebexBrowserOption(p) {
    // 1. Search and click "Join from this browser" / "Join from browser" in all frames & shadow DOM
    for (const frame of this.allFrames(p)) {
      try {
        const clicked = await frame.evaluate(() => {
          const all = Array.from(document.querySelectorAll('a, button, [role="button"], span, i'));
          for (const el of all) {
            const text = (el.innerText || el.textContent || '').trim().toLowerCase();
            if (text === 'join from this browser' || text === 'join from browser' ||
                text.includes('join from this browser') || text.includes('join from browser')) {
              const target = el.closest('a') || el.closest('button') || el.closest('[role="button"]');
              if (target) {
                target.click();
                return true;
              }
            }
          }
          return false;
        });
        if (clicked) {
          await p.waitForTimeout(800);
          return true;
        }
      } catch (_) {}
    }

    return await this.clickSelectorAnyDeep(p,
      "a:has-text('Join from this browser')",
      "button:has-text('Join from this browser')",
      "a:has-text('Join from browser')",
      "button:has-text('Join from browser')",
      "[data-test*='join-from-browser' i]",
      "[data-testid*='join-from-browser' i]",
      "[aria-label*='Join from this browser' i]",
      "[aria-label*='Join from browser' i]"
    );
  }

  static async clickWebexJoinDirect(p) {
    for (const frame of this.allFrames(p)) {
      try {
        const candidates = frame.locator("button, [role='button']");
        const count = Math.min(await candidates.count(), 160);
        for (let i = 0; i < count; i++) {
          const el = candidates.nth(i);
          try {
            if (!await el.isVisible({ timeout: 100 })) continue;
            const text = (await el.innerText()).trim();
            const aria = (await el.getAttribute('aria-label') || '').trim();
            const combined = `${text} ${aria}`.trim();
            if (!combined.toLowerCase().includes('join meeting')) continue;

            const disabled = await el.getAttribute('disabled');
            const ariaDisabled = await el.getAttribute('aria-disabled');
            if (disabled !== null || (ariaDisabled && ariaDisabled.toLowerCase() === 'true')) continue;

            try {
              await el.scrollIntoViewIfNeeded();
              await el.focus();
              await el.press('Enter');
              await p.waitForTimeout(500);
              return true;
            } catch (_) {}

            try {
              await el.evaluate((e) => e.click());
              await p.waitForTimeout(500);
              return true;
            } catch (_) {}
          } catch (_) {}
        }
      } catch (_) {}
    }
    return false;
  }

  static looksLikeWebexPostJoinWaiting(body) {
    if (!body) return false;
    const waiting =
      body.includes('waiting in the lobby') ||
      body.includes('you are in the lobby') ||
      body.includes("you're in the lobby") ||
      body.includes('waiting to be admitted') ||
      body.includes('wait for the host') ||
      body.includes('host will let you in') ||
      body.includes('waiting for host approval');
    if (waiting) return true;

    const genericWaiting = body.includes('please wait') || body.includes('waiting...');
    const stillOnPreJoin = body.includes('join meeting') &&
      (body.includes('audio options') || body.includes('start video') || body.includes('unmute'));

    return genericWaiting && !stillOnPreJoin;
  }

  static async fillWebexRequiredFieldsDeep(p, name, email) {
    let filled = 0;
    for (const frame of this.allFrames(p)) {
      try {
        const inputs = frame.locator('input');
        const count = Math.Min ? Math.min(await inputs.count(), 80) : Math.min(await inputs.count(), 80);
        for (let i = 0; i < count; i++) {
          const input = inputs.nth(i);
          try {
            if (!await input.isVisible({ timeout: 100 }) || !await input.isEditable()) continue;
            const required = (await input.getAttribute('required')) !== null ||
              (await input.getAttribute('aria-required')) === 'true';
            const type = (await input.getAttribute('type') || 'text').toLowerCase();
            const nameAttr = (await input.getAttribute('name') || '').toLowerCase();
            const idAttr = (await input.getAttribute('id') || '').toLowerCase();
            const placeholder = (await input.getAttribute('placeholder') || '').toLowerCase();
            const aria = (await input.getAttribute('aria-label') || '').toLowerCase();
            const auto = (await input.getAttribute('autocomplete') || '').toLowerCase();
            const hint = `${type} ${nameAttr} ${idAttr} ${placeholder} ${aria} ${auto}`;

            const isEmail = type === 'email' || hint.includes('email');
            const isName = auto === 'name' || hint.includes('displayname') || hint.includes('display-name') ||
              hint.includes('guestname') || hint.includes('your name') || (required && type === 'text' && !isEmail);
            if (!isEmail && !isName) continue;

            const value = isEmail ? email : name;
            const current = await input.inputValue();
            if (current && current.trim() === value) continue;

            await input.fill(value);
            await input.dispatchEvent('input');
            await input.dispatchEvent('change');
            await input.blur();
            filled++;
          } catch (_) {}
        }
      } catch (_) {}
    }
    return filled;
  }

  static allFrames(p) {
    return p.frames();
  }

  static async safeBodyText(p) {
    try {
      return await p.locator('body').innerText({ timeout: 1500 });
    } catch (_) {
      return '';
    }
  }

  static async anyVisibleDeep(p, ...selectors) {
    for (const frame of this.allFrames(p)) {
      for (const selector of selectors) {
        try {
          if (await frame.locator(selector).first().isVisible({ timeout: 250 })) return true;
        } catch (_) {}
      }
    }
    return false;
  }

  static async clickSelectorAnyDeep(p, ...selectors) {
    for (const frame of this.allFrames(p)) {
      for (const selector of selectors) {
        try {
          const loc = frame.locator(selector).first();
          if (await loc.isVisible({ timeout: 450 }) && await loc.isEnabled()) {
            await loc.click({ force: true });
            await p.waitForTimeout(450);
            return true;
          }
        } catch (_) {}
      }
    }
    return false;
  }

  static async clickAnyDeep(p, ...labels) {
    for (const frame of this.allFrames(p)) {
      for (const label of labels) {
        const exact = new RegExp(`^${label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i');
        try {
          const button = frame.getByRole('button', { name: exact }).first();
          if (await button.isVisible({ timeout: 350 }) && await button.isEnabled()) {
            await button.click({ force: true });
            await p.waitForTimeout(450);
            return true;
          }
        } catch (_) {}
        try {
          const link = frame.getByRole('link', { name: exact }).first();
          if (await link.isVisible({ timeout: 300 })) {
            await link.click({ force: true });
            await p.waitForTimeout(450);
            return true;
          }
        } catch (_) {}
        try {
          const loc = frame.getByText(exact).first();
          if (await loc.isVisible({ timeout: 300 })) {
            await loc.click({ force: true });
            await p.waitForTimeout(450);
            return true;
          }
        } catch (_) {}
      }
    }
    return false;
  }

  static async clickLooseDeep(p, ...phrases) {
    for (const frame of this.allFrames(p)) {
      try {
        // 1) Try getByText direct regex matching
        for (const phrase of phrases) {
          try {
            const loc = frame.getByText(new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')).first();
            if (await loc.isVisible({ timeout: 350 })) {
              await loc.click({ force: true });
              await p.waitForTimeout(500);
              return true;
            }
          } catch (_) {}
        }

        // 2) Inspect interactive candidates & cards
        const candidates = frame.locator("button, [role='button'], a, [tabindex='0'], div[data-tid], div[role='link']");
        const count = Math.min(await candidates.count(), 300);
        for (let i = 0; i < count; i++) {
          const el = candidates.nth(i);
          try {
            const text = (await el.innerText({ timeout: 300 })).trim();
            const aria = (await el.getAttribute('aria-label') || '').trim();
            const title = (await el.getAttribute('title') || '').trim();
            const combined = `${text} ${aria} ${title}`.toLowerCase();

            if (!phrases.some(x => combined.includes(x.toLowerCase()))) continue;

            const ariaDisabled = await el.getAttribute('aria-disabled');
            const disabled = await el.getAttribute('disabled');
            if ((ariaDisabled && ariaDisabled.toLowerCase() === 'true') || disabled !== null) continue;

            await el.click({ force: true, timeout: 1500 });
            await p.waitForTimeout(500);
            return true;
          } catch (_) {}
        }
      } catch (_) {}
    }
    return false;
  }

  static async fillFirstDeepWithResult(p, value, ...selectors) {
    for (const frame of this.allFrames(p)) {
      for (const selector of selectors) {
        try {
          const loc = frame.locator(selector).first();
          if (await loc.isVisible({ timeout: 350 }) && await loc.isEditable()) {
            const existing = await loc.inputValue();
            if (existing?.trim() !== value) {
              await loc.fill(value);
            }
            try { await loc.focus(); } catch (_) {}
            return true;
          }
        } catch (_) {}
      }
    }
    return false;
  }

  static async fillFirstDeep(p, value, ...selectors) {
    for (const frame of this.allFrames(p)) {
      for (const selector of selectors) {
        try {
          const loc = frame.locator(selector).first();
          if (await loc.isVisible({ timeout: 450 }) && await loc.isEditable()) {
            const existing = await loc.inputValue();
            if (existing?.trim() !== value) {
              await loc.fill(value);
            }
            return;
          }
        } catch (_) {}
      }
    }
  }

  static async describeInteractiveControlsDeep(p) {
    const found = [];
    for (const frame of this.allFrames(p)) {
      try {
        const els = frame.locator("button, [role='button'], a, input");
        const count = Math.min(await els.count(), 120);
        for (let i = 0; i < count && found.length < 12; i++) {
          const el = els.nth(i);
          try {
            if (!await el.isVisible({ timeout: 80 })) continue;
            const text = (await el.innerText()).trim();
            const aria = (await el.getAttribute('aria-label') || '').trim();
            const placeholder = (await el.getAttribute('placeholder') || '').trim();
            const value = (await el.getAttribute('value') || '').trim();
            const label = [text, aria, placeholder, value].filter(Boolean).join(' ').trim();
            if (label && !found.some(x => x.toLowerCase() === label.toLowerCase())) {
              found.push(label.length > 80 ? label.substring(0, 80) : label);
            }
          } catch (_) {}
        }
      } catch (_) {}
    }
    return found.length === 0 ? '(none detected)' : found.join(' | ');
  }

  static async turnOffMediaDeep(p) {
    for (const frame of this.allFrames(p)) {
      try {
        const buttons = frame.locator('button');
        const count = Math.min(await buttons.count(), 150);
        for (let i = 0; i < count; i++) {
          const b = buttons.nth(i);
          if (!await b.isVisible()) continue;
          const aria = (await b.getAttribute('aria-label') || '').toLowerCase();
          const title = (await b.getAttribute('title') || '').toLowerCase();
          const text = (await b.innerText()).toLowerCase();
          const all = `${aria} ${title} ${text}`;

          const shouldMuteMic = !all.includes('unmute') && (all.includes('mute microphone') || all.includes('turn off microphone') || all.includes('mute mic'));
          const shouldStopCamera = all.includes('turn off camera') || all.includes('stop video') || all.includes('turn video off');
          if (shouldMuteMic || shouldStopCamera) {
            try {
              await b.click({ force: true });
              await p.waitForTimeout(150);
            } catch (_) {}
          }
        }
      } catch (_) {}
    }
  }
}
