import { config } from './config.js';
import { MeetingBotService } from './meetingBotService.js';
import { PlatformDetector, MeetingPlatform } from './platformJoiners.js';
import { TranscriptBus } from './transcriptBus.js';

const url = process.argv[2];
if (!url || PlatformDetector.detect(url) !== MeetingPlatform.GoogleMeet) {
  console.error('Usage: npm run bot:join -- https://meet.google.com/abc-defg-hij');
  process.exit(1);
}

// This command deliberately joins only. It never starts a billable speech service.
const bus = new TranscriptBus();
const bot = new MeetingBotService({ ...config, bot: { ...config.bot, transcriptionEnabled: false } }, bus);
bus.subscribe(text => console.log(text));
let stopping = false;
async function stop(code = 0) {
  if (stopping) return;
  stopping = true;
  clearInterval(poll);
  await bot.leave();
  process.exitCode = code;
}
let previousState = '';
const poll = setInterval(() => {
  const { state, error } = bot.getStatus();
  if (state !== previousState) {
    console.log(`Status: ${state === 'Meeting started / listening' ? 'Admitted (join-only)' : state}`);
    previousState = state;
  }
  if (state === 'Error') {
    console.error(error || 'Unable to join this meeting.');
    void stop(1);
  } else if (state === 'Meeting ended') {
    void stop();
  }
}, 1000);
process.on('SIGINT', () => { void stop(); });
process.on('SIGTERM', () => { void stop(); });
console.log(`Joining as ${config.bot.name}. The host may need to admit the bot. Ctrl+C leaves the call.`);
try {
  await bot.join(url);
} catch (error) {
  console.error(error.message);
  await stop(1);
}
