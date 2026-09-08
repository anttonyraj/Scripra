import path from 'path';
import fs from 'fs';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const profileDir = path.resolve(__dirname, '../../.bot-profile');

function findChromePath() {
  const candidates = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    path.join(process.env.LOCALAPPDATA || '', 'Google\\Chrome\\Application\\chrome.exe'),
    path.join(process.env.PROGRAMFILES || '', 'Google\\Chrome\\Application\\chrome.exe'),
    path.join(process.env['PROGRAMFILES(X86)'] || '', 'Google\\Chrome\\Application\\chrome.exe'),
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
  ];

  for (const candidate of candidates) {
    if (candidate && fs.existsSync(candidate)) {
      return candidate;
    }
  }
  return null;
}

async function loginGoogle() {
  console.log('===============================================================');
  console.log('  Google Account Sign-In (Direct Chrome Launcher)');
  console.log('===============================================================');

  const chromeExe = findChromePath();
  if (!chromeExe) {
    console.error('Could not find Google Chrome or Microsoft Edge installed on this PC.');
    process.exit(1);
  }

  console.log(`Using Browser: ${chromeExe}`);
  console.log(`Profile Directory: ${profileDir}`);
  console.log('\nStarting genuine browser window (bypasses "browser not secure" check)...');

  if (!fs.existsSync(profileDir)) {
    fs.mkdirSync(profileDir, { recursive: true });
  }

  const browserProcess = spawn(
    chromeExe,
    [
      `--user-data-dir=${profileDir}`,
      '--no-first-run',
      '--no-default-browser-check',
      'https://accounts.google.com/'
    ],
    {
      detached: false,
      stdio: 'ignore'
    }
  );

  console.log('\n[1] Browser window opened.');
  console.log('[2] Enter your Google email & password and complete any 2FA.');
  console.log('[3] Once logged in, close the browser window OR press ENTER below.\n');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  await new Promise((resolve) => {
    browserProcess.on('exit', () => {
      rl.close();
      resolve();
    });

    rl.question('>> Press ENTER when you have finished signing in: ', () => {
      try {
        browserProcess.kill();
      } catch (_) {}
      rl.close();
      resolve();
    });
  });

  console.log('\n===============================================================');
  console.log('  [✓] Google account session saved successfully to .bot-profile!');
  console.log('  [✓] You can now start the bot and join Google Meet calls.');
  console.log('===============================================================\n');
  process.exit(0);
}

loginGoogle().catch((err) => {
  console.error('Error during Google sign-in setup:', err);
  process.exit(1);
});
