import path from 'path';
import fs from 'node:fs';
import crypto from 'node:crypto';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';
import { PlatformDetector, PlatformJoiners, MeetingPlatform } from './platformJoiners.js';
import { DeepgramTranscriber } from './deepgramTranscriber.js';
import { SonioxTranscriber } from './sonioxTranscriber.js';
import { GoogleCloudSpeechTranscriber } from './googleCloudSpeechTranscriber.js';
import { MeetCaptionTranscriber } from './meetCaptionTranscriber.js';
import { AzureSpeechTranscriber } from './azureSpeechTranscriber.js';
import { browserAudioCaptureScript } from './browserAudioCaptureScript.js';
import { launchNativeChrome } from './native-browser.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export class MeetingBotService {
  constructor(config, bus) {
    this.config = config;
    this.bus = bus;

    this.playwright = null;
    this.browser = null;
    this.nativeChild = null;
    this.nativeProfile = null;
    this.context = null;
    this.page = null;
    this.speech = null;
    this.monitorAbortController = null;

    this.state = 'Idle';
    this.platform = null;
    this.url = null;
    this.error = null;
    this.meetingStartedAt = null;
    this.meetingEndedAt = null;
    this.audioPackets = 0;
    this.audioBytes = 0;
    this.lastAudioEvent = null;
    this.isBusy = false;
    this.joinCancelled = false;
    this.transcriptionError = null;
  }

  getStatus() {
    return {
      state: this.state,
      platform: this.platform,
      url: this.url,
      error: this.error,
      meetingStartedAt: this.meetingStartedAt,
      meetingEndedAt: this.meetingEndedAt,
      audioPackets: this.audioPackets,
      transcriptionError: this.transcriptionError,
      audioBytes: this.audioBytes,
      lastAudioEvent: this.lastAudioEvent,
      transcriptionEnabled: Boolean(this.config.bot.transcriptionEnabled)
    };
  }

  async join(meetingUrl) {
    if (this.isBusy) {
      throw new Error('Bot is currently transitioning states. Please wait.');
    }
    const platform = PlatformDetector.detect(meetingUrl);
    if (platform === MeetingPlatform.Unknown) {
      throw new Error('Use a valid HTTPS meeting link. Google Meet links must use meet.google.com/abc-defg-hij.');
    }
    if (this.page && !this.page.isClosed()) {
      throw new Error('A bot is already active. Leave the current meeting before joining another.');
    }
    this.isBusy = true;
    this.joinCancelled = false;

    try {
      await this.leaveInternal();
      this.bus.clearTranscript();

      this.meetingStartedAt = null;
      this.meetingEndedAt = null;
      this.error = null;
      this.audioPackets = 0;
      this.audioBytes = 0;
      this.lastAudioEvent = null;

      this.platform = platform;
      this.url = meetingUrl;
      this.state = 'Starting background bot';
      this.bus.publish(`[Bot] ${platform} detected. Starting browser bot.`);

      if (platform === MeetingPlatform.Webex) {
        await this.startWebexChrome();
      } else if (platform === MeetingPlatform.GoogleMeet && this.config.bot.browserMode === 'native') {
        await this.startNativeChrome();
      } else {
        await this.startDefaultBrowser();
      }

      if (!this.page) {
        throw new Error('Meeting browser page could not be created.');
      }
      if (this.joinCancelled) throw new Error('Join canceled');

      if (this.config.bot.transcriptionEnabled) {
        await this.registerBrowserAudioBridge(this.page);
        await this.page.addInitScript(browserAudioCaptureScript);
      }

      const botName = this.config.bot.name || 'Scripra AI Notetaker';
      const effectiveUrl = PlatformJoiners.normalizeJoinUrl(platform, meetingUrl, botName);

      this.state = 'Opening meeting';
      this.bus.publish(`[Bot] Opening ${platform} meeting page.`);

      await this.page.goto(effectiveUrl, {
        waitUntil: 'domcontentloaded',
        timeout: platform === MeetingPlatform.Webex ? 90000 : 60000
      });

      await this.page.waitForTimeout(platform === MeetingPlatform.Webex ? 2500 : 1800);
      if (this.joinCancelled) throw new Error('Join canceled');

      this.state = 'Auto joining';
      this.bus.publish('[Bot] Filling pre-join details and clicking the meeting platform Join button automatically.');

      this.monitorAbortController = new AbortController();
      await PlatformJoiners.join(platform, this.page, this.config, this.monitorAbortController.signal);

      this.state = 'Join request sent';
      this.bus.publish('[Bot] Join request submitted. Waiting for platform/host admission if required.');

      this.monitorMeeting(platform, this.page, this.monitorAbortController.signal);
    } catch (err) {
      this.error = err.message;
      this.state = 'Error';
      this.bus.publish(`[Bot Error] ${err.message}`);
      await this.leaveInternal({ keepState: true });
      throw err;
    } finally {
      this.isBusy = false;
    }
  }

  async startNativeChrome() {
    this.bus.publish('[Bot] Launching isolated browser process with disposable profile...');
    try {
      const { browser, child, profile } = await launchNativeChrome({ headless: this.config.bot.headless });
      this.browser = browser;
      this.nativeChild = child;
      this.nativeProfile = profile;
      this.context = this.browser.contexts()[0] || await this.browser.newContext();
      this.page = this.context.pages()[0] || await this.context.newPage();
      this.page.setDefaultTimeout(this.config.bot.joinTimeoutSeconds * 1000);
    } catch (err) {
      console.warn('[Native Chrome Launch Failed, Falling Back to Playwright]', err.message);
      this.bus.publish(`[Bot Warning] Native Chrome launch failed: ${err.message}. Falling back to default browser.`);
      await this.startDefaultBrowser();
    }
  }

  async startDefaultBrowser() {
    const profileDir = path.resolve(__dirname, '../../.bot-profile');
    const launchOptions = {
      headless: this.config.bot.headless,
      viewport: { width: 1365, height: 850 },
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36',
      permissions: ['microphone', 'camera'],
      args: this.commonBrowserArgs(),
      ignoreDefaultArgs: ['--enable-automation']
    };

    try {
      this.context = await chromium.launchPersistentContext(profileDir, {
        ...launchOptions,
        channel: 'chrome'
      });
    } catch (_) {
      try {
        this.context = await chromium.launchPersistentContext(profileDir, launchOptions);
      } catch (err) {
        throw new Error('Unable to open the bot browser profile. Close the login window and other bot processes. Install Chrome or run npx playwright install chromium inside bot-worker. ' + err.message);
      }
    }

    this.page = this.context.pages()[0] || await this.context.newPage();

    // Stealth: hide automation flags
    await this.page.addInitScript(() => {
      try {
        Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
        window.chrome = window.chrome || { runtime: {} };
      } catch (_) {}
    });
  }

  async startWebexChrome() {
    const webexHeadless = this.config.webex.headless;
    this.bus.publish(`[Bot] Webex is using installed Google Chrome (headless=${webexHeadless}) with managed browser cleanup.`);

    try {
      this.browser = await chromium.launch({
        channel: 'chrome',
        headless: webexHeadless,
        args: [...this.commonBrowserArgs(), '--mute-audio']
      });
    } catch (err) {
      throw new Error(
        'Google Chrome could not be started for Webex. Install Google Chrome on this machine. Original error: ' + err.message
      );
    }

    this.context = await this.browser.newContext({
      viewport: { width: 1365, height: 850 },
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36',
      permissions: ['microphone', 'camera']
    });

    this.page = await this.context.newPage();

    // Stealth: hide automation flags
    await this.page.addInitScript(() => {
      try {
        Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
        window.chrome = window.chrome || { runtime: {} };
      } catch (_) {}
    });
  }

  commonBrowserArgs() {
    return [
      '--use-fake-ui-for-media-stream',
      '--autoplay-policy=no-user-gesture-required',
      '--disable-blink-features=AutomationControlled',
      '--disable-notifications',
      '--disable-features=TranslateUI',
      '--disable-dev-shm-usage',
      '--no-first-run',
      '--no-default-browser-check',
      '--mute-audio'
    ];
  }

  async registerBrowserAudioBridge(page) {
    await page.exposeFunction('pushMeetingPcm', (base64) => {
      try {
        const buffer = Buffer.from(base64, 'base64');
        this.audioPackets++;
        this.audioBytes += buffer.length;
        if (this.speech) {
          this.speech.push(buffer);
        }
      } catch (_) {}
    });

    await page.exposeFunction('botAudioEvent', (message) => {
      this.lastAudioEvent = message;
    });
  }

  // 4-Tier Speech Cascade Hierarchy:
  // Tier 1: Deepgram Nova-2 (using active $200 credit)
  // Tier 2: Soniox (failover when Deepgram credit is over or errors)
  // Tier 3: Google Cloud Speech-to-Text (if GCP service account credentials configured)
  // Tier 4: Google Meet Native Captions DOM Extractor ($0 guaranteed fail-safe)
  async ensureSpeechStarted() {
    if (!this.config.bot.transcriptionEnabled) return;
    if (this.speech) return;
    this.transcriptionError = null;

    // 1. Tier 1: Deepgram Nova-2
    if (this.config.deepgramKey && this.config.deepgramKey.trim().length > 10) {
      try {
        this.speech = new DeepgramTranscriber(this.config.deepgramKey, this.bus);
        await this.speech.start();
        this.bus.publish('[Bot] Tier 1: Scripra Neural Core (Deepgram Nova-2 Diarization) streaming active.');
        return;
      } catch (ex) {
        console.warn('[Deepgram Start Failed / Credit Over, Trying Tier 2 Soniox]', ex.message);
        this.bus.publish('[Bot Warning] Deepgram unavailable or credit exhausted. Switching to Tier 2: Soniox.');
        await this.speech?.dispose();
        this.speech = null;
      }
    }

    // 2. Tier 2: Soniox
    if (this.config.sonioxKey && this.config.sonioxKey.trim().length > 10) {
      try {
        this.speech = new SonioxTranscriber(this.config.sonioxKey, this.bus);
        await this.speech.start();
        this.bus.publish('[Bot] Tier 2: Soniox Real-Time Speech Core active.');
        return;
      } catch (ex) {
        console.warn('[Soniox Failed, Trying Tier 3 Google Cloud Speech]', ex.message);
        this.bus.publish('[Bot Warning] Soniox failed. Switching to Tier 3: Google Cloud Speech.');
        await this.speech?.dispose();
        this.speech = null;
      }
    }

    // 3. Tier 3: Google Cloud Speech-to-Text Streaming
    if (this.config.googleSpeech?.credentialsPath || process.env.GOOGLE_APPLICATION_CREDENTIALS || process.env.GOOGLE_CLOUD_CREDENTIALS_JSON) {
      try {
        this.speech = new GoogleCloudSpeechTranscriber(this.config, this.bus);
        await this.speech.start();
        this.bus.publish('[Bot] Tier 3: Google Cloud Speech Streaming with Diarization active.');
        return;
      } catch (ex) {
        console.warn('[Google Cloud Speech Failed, Falling back to Tier 4 Meet Captions]', ex.message);
        this.bus.publish('[Bot Warning] Google Cloud Speech unavailable. Switching to Tier 4: Google Meet Native Captions.');
        await this.speech?.dispose();
        this.speech = null;
      }
    }

    // 4. Tier 4 ($0 Fail-Safe): Google Meet Native Captions DOM Extractor
    if (this.platform === MeetingPlatform.GoogleMeet && this.page && !this.page.isClosed()) {
      try {
        this.speech = new MeetCaptionTranscriber(this.page, this.bus);
        await this.speech.start();
        this.bus.publish('[Bot] Tier 4: Google Meet Native Live Captions (Zero-Cost Fail-Safe) active.');
        return;
      } catch (ex) {
        console.warn('[Meet Native Captions Failed]', ex.message);
      }
    }

    // Azure Fallback if configured
    if (this.config.azureSpeech?.key && !this.config.azureSpeech.key.includes('put_azure')) {
      try {
        this.speech = new AzureSpeechTranscriber(this.config, this.bus);
        await this.speech.start();
        this.bus.publish('[Bot] Azure Speech recognizer active.');
        return;
      } catch (ex) {
        await this.speech?.dispose();
        this.speech = null;
      }
    }

    this.transcriptionError = 'No working transcription provider is currently available.';
    this.bus.publish('[Bot Error] ' + this.transcriptionError);
  }

  async markMeetingStarted() {
    if (this.meetingStartedAt) return;
    this.meetingStartedAt = new Date().toISOString();
    this.state = 'Meeting started / listening';
    this.bus.publish(this.config.bot.transcriptionEnabled
      ? '[Bot] Bot admitted. Starting meeting transcription cascade.'
      : '[Bot] Scripra bot admitted. Join-only mode: no audio capture or paid transcription.');
    await this.ensureSpeechStarted();
  }

  async monitorMeeting(platform, page, abortSignal) {
    let seenMeeting = false;
    const admissionDeadline = Date.now() + this.config.bot.joinTimeoutSeconds * 1000;

    while (!abortSignal.aborted) {
      try {
        if (platform === MeetingPlatform.GoogleMeet) {
          const text = (await PlatformJoiners.safeBodyText(page)).toLowerCase();
          if (text.includes('request to join was denied') || text.includes("you can't join this video call") || text.includes('you cannot join this video call')) {
            this.error = 'Google Meet denied entry. Ask the host to permit the bot before retrying.';
            await this.leaveInternal({ keepState: true, preserveMeetingInfo: true });
            this.state = 'Error';
            this.bus.publishSystem('[Bot Error] ' + this.error);
            return;
          }
        }
        if (!seenMeeting && Date.now() >= admissionDeadline) {
          this.error = 'Host admission timed out. Ask the host to admit Scripra, then retry.';
          await this.leaveInternal({ keepState: true, preserveMeetingInfo: true });
          this.state = 'Error';
          this.bus.publishSystem('[Bot Error] ' + this.error);
          return;
        }
        if (page.isClosed() || await PlatformJoiners.isMeetingEnded(platform, page)) {
          await this.finishMeetingFromMonitor(platform, page, 'Meeting ended by platform/host');
          return;
        }

        if (await PlatformJoiners.isInMeeting(platform, page)) {
          seenMeeting = true;
          await this.markMeetingStarted();
        } else {
          const lobby = await PlatformJoiners.detectLobbyState(platform, page);
          if (lobby) {
            this.state = lobby;
          } else if (!seenMeeting) {
            this.state = 'Waiting for meeting entry';
          } else {
            this.state = 'Meeting started / listening';
          }
        }

        await new Promise(r => setTimeout(r, 1200));
      } catch (ex) {
        if (abortSignal.aborted) return;
        this.error = ex.message;
        await new Promise(r => setTimeout(r, 1500));
      }
    }
  }

  saveTranscriptToDisk() {
    try {
      const sessionId = crypto.randomUUID();
      const dir = path.resolve(__dirname, '../transcripts');
      fs.mkdirSync(dir, { recursive: true });
      const transcriptText = this.bus.getTranscript ? this.bus.getTranscript() : '';
      const textPath = path.join(dir, `${sessionId}.txt`);
      const jsonPath = path.join(dir, `${sessionId}.json`);
      fs.writeFileSync(textPath, transcriptText || 'Empty transcript');
      fs.writeFileSync(jsonPath, JSON.stringify({
        id: sessionId,
        url: this.url,
        platform: this.platform,
        startedAt: this.meetingStartedAt,
        endedAt: this.meetingEndedAt,
        audioPackets: this.audioPackets,
        audioBytes: this.audioBytes,
        transcript: transcriptText
      }, null, 2));
      console.log(`[Transcript Saved] Saved to transcripts/${sessionId}.json`);
    } catch (e) {
      console.warn('[Save Transcript Error]', e.message);
    }
  }

  async finishMeetingFromMonitor(platform, page, reason) {
    if (this.page !== page) return;

    this.meetingEndedAt = this.meetingEndedAt || new Date().toISOString();
    this.state = 'Leaving meeting';
    this.bus.publishSystem(`[Bot] ${reason}. Leaving automatically.`);

    this.saveTranscriptToDisk();

    await PlatformJoiners.leaveMeeting(platform, page);
    await this.leaveInternal({ keepState: true, preserveMeetingInfo: true });

    this.state = 'Meeting ended';
    this.bus.publishSystem('[Bot] Bot exited the meeting automatically.');
  }

  async leave() {
    this.joinCancelled = true;
    this.monitorAbortController?.abort();
    if (this.meetingStartedAt || this.page) {
      this.meetingEndedAt = new Date().toISOString();
    }

    this.saveTranscriptToDisk();

    if (this.page && this.platform) {
      await PlatformJoiners.leaveMeeting(this.platform, this.page);
    }

    await this.leaveInternal({ preserveMeetingInfo: true });

    this.state = 'Meeting ended';
    this.bus.publishSystem('[Bot] Bot left the meeting.');
  }

  async leaveInternal(opts = {}) {
    const { keepState = false, preserveMeetingInfo = false } = opts;

    if (this.monitorAbortController) {
      try { this.monitorAbortController.abort(); } catch (_) {}
      this.monitorAbortController = null;
    }

    try {
      if (this.page && !this.page.isClosed()) {
        await this.page.close();
      }
    } catch (_) {}

    try {
      if (this.context) {
        await this.context.close();
      }
    } catch (_) {}

    try {
      if (this.browser) {
        await this.browser.close();
      }
    } catch (_) {}

    if (this.nativeChild) {
      try { this.nativeChild.kill(); } catch (_) {}
      this.nativeChild = null;
    }

    if (this.speech) {
      try {
        await this.speech.dispose();
      } catch (_) {}
    }

    this.page = null;
    this.context = null;
    this.browser = null;
    this.speech = null;

    if (!keepState && !preserveMeetingInfo) {
      this.state = 'Idle';
      this.platform = null;
      this.url = null;
      this.error = null;
    }
  }
}
