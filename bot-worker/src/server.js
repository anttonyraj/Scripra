import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from './config.js';
import { TranscriptBus } from './transcriptBus.js';
import { MeetingBotService } from './meetingBotService.js';
import { PlatformDetector, MeetingPlatform } from './platformJoiners.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use((req, res, next) => {
  if (req.headers.origin || !req.headers['x-scripra-owner']) {
    return res.status(401).json({ error: 'Use the signed-in Scripra dashboard.' });
  }
  next();
});
app.use(express.json({ limit: '8kb' }));

const bus = new TranscriptBus();
const bot = new MeetingBotService(config, bus);
let owner = null;
app.use((req, res, next) => {
  if (owner && owner !== req.headers['x-scripra-owner']) {
    return res.status(409).json({ error: 'Local worker reserved by another session. Restart it to change accounts.' });
  }
  next();
});

// Join meeting endpoint
app.post('/api/bot/join', async (req, res) => {
  const { url } = req.body || {};
  if (!url || typeof url !== 'string' || !url.trim()) {
    return res.status(400).json({ error: 'Meeting URL is required.' });
  }

  try {
    if (PlatformDetector.detect(url.trim()) === MeetingPlatform.Unknown) {
      return res.status(400).json({ error: 'Unsupported meeting link.' });
    }
    if (bot.isBusy || (bot.page && !bot.page.isClosed())) {
      return res.status(409).json({ error: 'A bot is already joining or in a meeting. Leave it before joining again.' });
    }
    owner = owner || req.headers['x-scripra-owner'];
    // Joining can take minutes while the host admits the bot. Report progress through status polling.
    void bot.join(url.trim()).catch(() => {}); // join stores the error in bot status.
    res.status(202).json({ ok: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Leave meeting endpoint
app.post('/api/bot/leave', async (req, res) => {
  try {
    await bot.leave();
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Bot status endpoint
app.get('/api/bot/status', (req, res) => {
  res.json(bot.getStatus());
});

// Transcript download
app.get('/api/transcript/download', (req, res) => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const fileName = `meeting-transcript-${timestamp}.txt`;
  const buffer = bus.getTranscriptBytes();

  res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.send(buffer);
});

// Server-Sent Events for live transcript streaming
app.get('/api/transcript/stream', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const unsubscribe = bus.subscribe((text) => {
    const safe = text.replace(/\r/g, ' ').replace(/\n/g, ' ');
    res.write(`data: ${safe}\n\n`);
  });

  req.on('close', () => {
    unsubscribe();
  });
});

// Serve client static build in production
const clientDistPath = path.resolve(__dirname, '../../client/dist');
app.use(express.static(clientDistPath));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(clientDistPath, 'index.html'), (err) => {
    if (err) res.status(404).send('Meeting Bot API is running. React build not found yet.');
  });
});

function startServer(port, maxRetries = 10) {
  const server = app.listen(port, '127.0.0.1', () => {
    console.log(`===============================================`);
    console.log(`  Meeting Bot Server listening on port ${port}`);
    console.log(`  Open in browser: http://localhost:${port}`);
    console.log(`  API URL: http://localhost:${port}/api/bot/status`);
    console.log(`===============================================`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Bot port ${port} is in use. Stop the old worker or configure BOT_PORT and BOT_SERVER_URL to match.`);
      process.exitCode = 1;
    } else {
      console.error('Server error:', err);
    }
  });
}

startServer(config.port);
