import test from 'node:test';
import assert from 'node:assert/strict';
import { MeetingBotService } from '../src/meetingBotService.js';
import { PlatformDetector, PlatformJoiners, MeetingPlatform } from '../src/platformJoiners.js';
import { TranscriptBus } from '../src/transcriptBus.js';

test('Teams meeting links preserve the passcode and reject lookalike hosts', () => {
  const url = 'https://teams.microsoft.com/meet/123456789?p=test-passcode';
  assert.equal(PlatformDetector.detect(url), MeetingPlatform.Teams);
  assert.equal(PlatformJoiners.normalizeJoinUrl(MeetingPlatform.Teams, url, 'Scripra'), url);
  assert.equal(PlatformDetector.detect('https://teams.microsoft.com.evil.test/meet/123'), MeetingPlatform.Unknown);
});

test('Meet URL validation rejects lookalikes, credentials, invalid codes and non-HTTPS', () => {
  assert.equal(PlatformDetector.detect('https://meet.google.com/abc-defg-hij'), MeetingPlatform.GoogleMeet);
  for (const url of ['https://meet.google.com.evil.test/abc-defg-hij', 'http://meet.google.com/abc-defg-hij', 'https://user@meet.google.com/abc-defg-hij', 'https://meet.google.com/not-a-code']) {
    assert.equal(PlatformDetector.detect(url), MeetingPlatform.Unknown);
  }
});

function service() {
  return new MeetingBotService({ bot: { name: 'Scripra AI Notetaker', transcriptionEnabled: false, joinTimeoutSeconds: 90 } }, new TranscriptBus());
}

test('invalid URL and second join cannot close an existing meeting', async () => {
  const bot = service();
  let closed = false;
  bot.page = { isClosed: () => false };
  bot.leaveInternal = async () => { closed = true; };
  await assert.rejects(bot.join('https://evil.test'), /valid HTTPS/);
  await assert.rejects(bot.join('https://meet.google.com/abc-defg-hij'), /already active/);
  assert.equal(closed, false);
});

test('join-only never starts cloud speech even with a configured key', async () => {
  const bot = service();
  bot.config.deepgramKey = 'a-configured-key-that-must-not-be-used';
  await bot.ensureSpeechStarted();
  assert.equal(bot.speech, null);
  assert.equal(bot.getStatus().transcriptionEnabled, false);
});

test('enabled transcription reports missing credentials as a visible error', async () => {
  const bot = service();
  bot.config.bot.transcriptionEnabled = true;
  await bot.ensureSpeechStarted();
  assert.match(bot.getStatus().transcriptionError, /No working transcription provider/);
});

test('Teams transcription joins with audio and mutes media before clicking Join', async (t) => {
  let joined = false;
  let muted = false;
  const page = { setDefaultTimeout() {}, waitForTimeout: async () => {} };
  t.mock.method(PlatformJoiners, 'isInMeeting', async () => joined);
  t.mock.method(PlatformJoiners, 'detectLobbyState', async () => null);
  t.mock.method(PlatformJoiners, 'safeBodyText', async () => 'Enter name Join now');
  t.mock.method(PlatformJoiners, 'fillFirstDeepWithResult', async () => true);
  t.mock.method(PlatformJoiners, 'turnOffMediaDeep', async () => { muted = true; });
  t.mock.method(PlatformJoiners, 'clickAnyDeep', async (_page, ...labels) => {
    assert.ok(!labels.some(label => /without audio/i.test(label)));
    return false;
  });
  t.mock.method(PlatformJoiners, 'clickSelectorAnyDeep', async (_page, ...selectors) => {
    assert.ok(!selectors.some(selector => /without audio/i.test(selector)));
    if (selectors.some(selector => selector.includes('prejoin-join-button'))) {
      assert.equal(muted, true);
      joined = true;
      return true;
    }
    return false;
  });
  await PlatformJoiners.joinTeams(page, 'Scripra', undefined, { transcriptionEnabled: true });
  assert.equal(joined, true);
});

test('admission timeout closes the browser and reports an error', async () => {
  const bot = service();
  bot.config.bot.joinTimeoutSeconds = -1;
  let closed = false;
  bot.leaveInternal = async () => { closed = true; };
  await bot.monitorMeeting(MeetingPlatform.GoogleMeet, {}, new AbortController().signal);
  assert.equal(closed, true);
  assert.equal(bot.state, 'Error');
  assert.match(bot.error, /Host admission timed out/);
});

test('Meet pre-join respects cancellation', async () => {
  const controller = new AbortController();
  controller.abort();
  await assert.rejects(PlatformJoiners.joinMeet({}, 'Scripra', controller.signal), /canceled/);
});

test('muting does not click Unmute controls', async () => {
  const clicked = [];
  const labels = ['Unmute microphone', 'Turn on camera', 'Mute microphone', 'Turn off camera'];
  const frame = { locator: () => ({ count: async () => labels.length, nth: i => ({ getAttribute: async () => labels[i], click: async () => clicked.push(labels[i]) }) }) };
  await PlatformJoiners.turnOffGoogleMeetMedia({ frames: () => [frame], waitForTimeout: async () => {} });
  assert.deepEqual(clicked, ['Mute microphone', 'Turn off camera']);
});
