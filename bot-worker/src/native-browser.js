import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { chromium } from 'playwright';
import net from 'node:net';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function availablePort() {
  const server = net.createServer();
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });
  const port = server.address().port;
  await new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
  return port;
}

export async function launchNativeChrome(options = {}) {
  const edgeCandidates = [
    process.env.BOT_EDGE_PATH,
    path.join(process.env['PROGRAMFILES(X86)'] || 'C:/Program Files (x86)', 'Microsoft/Edge/Application/msedge.exe'),
    path.join(process.env.PROGRAMFILES || 'C:/Program Files', 'Microsoft/Edge/Application/msedge.exe'),
    path.join(process.env.LOCALAPPDATA || '', 'Microsoft/Edge/Application/msedge.exe')
  ].filter(Boolean);

  const chromeCandidates = [
    process.env.BOT_CHROME_PATH,
    path.join(process.env.PROGRAMFILES || 'C:/Program Files', 'Google/Chrome/Application/chrome.exe'),
    path.join(process.env['PROGRAMFILES(X86)'] || 'C:/Program Files (x86)', 'Google/Chrome/Application/chrome.exe'),
    path.join(process.env.LOCALAPPDATA || '', 'Google/Chrome/Application/chrome.exe')
  ].filter(Boolean);

  const useEdge = process.env.BOT_CHANNEL === 'msedge' || (!process.env.BOT_CHANNEL && edgeCandidates.some(c => fs.existsSync(c)));
  const candidates = useEdge ? [...edgeCandidates, ...chromeCandidates] : [...chromeCandidates, ...edgeCandidates];
  const executable = candidates.find(candidate => fs.existsSync(candidate));
  if (!executable) {
    throw new Error('A supported browser (Google Chrome or Microsoft Edge) was not found. Set BOT_CHROME_PATH or BOT_EDGE_PATH.');
  }

  const root = path.resolve(__dirname, '../../.guest-profiles');
  fs.mkdirSync(root, { recursive: true });
  const profile = fs.mkdtempSync(path.join(root, 'session-'));
  const port = await availablePort();

  const isHeadless = options.headless !== undefined ? options.headless : (process.env.BOT_HEADLESS !== 'false');

  // Spawn independent isolated browser process
  const launchArgs = [
    `--user-data-dir=${profile}`,
    `--remote-debugging-port=${port}`,
    `--remote-debugging-address=127.0.0.1`,
    '--no-first-run',
    '--no-default-browser-check',
    '--mute-audio',
    '--disable-sync',
    '--disable-features=msEdgeSync,msHubEdgeProfileSignin,msImplicitSignIn',
    '--disable-blink-features=AutomationControlled',
    '--use-fake-ui-for-media-stream',
    '--autoplay-policy=no-user-gesture-required',
    'about:blank'
  ];

  if (isHeadless) {
    launchArgs.push('--headless=new');
  }

  const child = spawn(executable, launchArgs, { windowsHide: isHeadless, stdio: ['ignore', 'ignore', 'pipe'] });
  let websocket;
  let stderr = '';
  child.stderr.on('data', chunk => {
    stderr = (stderr + chunk.toString()).slice(-8192);
    const match = stderr.match(/DevTools listening on (ws:\/\/127\.0\.0\.1:\d+\/devtools\/browser\/[a-zA-Z0-9-]+)/);
    if (match && new URL(match[1]).port === String(port)) websocket = match[1];
  });

  let launchError;
  child.on('error', error => { launchError = error; });

  try {
    const deadline = Date.now() + 20000;
    while (Date.now() < deadline) {
      if (launchError) throw launchError;
      if (child.exitCode !== null) throw new Error('Browser process exited before the bot could connect over CDP.');
      if (websocket) {
        const browser = await chromium.connectOverCDP(websocket, { timeout: 10000 });
        return { browser, child, profile };
      }
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    throw new Error('Timed out connecting to the isolated browser debugging endpoint.');
  } catch (error) {
    child.kill();
    throw error;
  }
}
