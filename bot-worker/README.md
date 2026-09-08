# Scripra's own Google Meet bot

The bot runs Chrome/Chromium on your computer using Playwright. No Recall.ai account or speech API key is needed to join. Keep the computer awake and connected for the whole meeting. This first version supports one meeting at a time on a local computer, not a public multi-tenant deployment.

## Quickest test: terminal

From the Scripra repository root:

```powershell
npm --prefix bot-worker install
npm run bot:join -- https://meet.google.com/abc-defg-hij
```

Replace the example link with your actual Meet link. Have the host open the meeting and admit **Scripra AI Notetaker**. The command reports admission separately from submitting the join request. Ctrl+C leaves the call. This command always disables audio capture and cloud transcription, even if speech keys are configured.

Installed Google Chrome is preferred. If Chrome is unavailable, install Chromium:

```powershell
cd bot-worker
npx playwright install chromium
```

## Use the dashboard

Run `npm run bot:start` and `npm run dev` in separate terminals at the repository root. Sign in to Scripra, open Dashboard → Live Meeting Studio, paste a Google Meet link, confirm the checkbox and click Start. The worker binds to 127.0.0.1:5000. The web app and worker must run on the same machine. Stop leaves the meeting. Do not run the CLI bot and dashboard worker simultaneously because they share a dedicated browser profile.

The worker reserves its single session for the first signed-in caller. Restart it to change Scripra accounts. It rejects a second meeting instead of disconnecting the first. The loopback worker trusts the local Next.js process; do not expose port 5000 or use this as a remote production security boundary.

## Configuration

Optional values in the root `.env.local` (restart both processes after changes):

```dotenv
BOT_NAME=Scripra AI Notetaker
BOT_PORT=5000
BOT_SERVER_URL=http://127.0.0.1:5000
BOT_HEADLESS=true
BOT_JOIN_TIMEOUT_SECONDS=90
BOT_TRANSCRIPTION_ENABLED=false
```

Joining is free of third-party bot/API fees on your own hardware. Hosting and electricity are still your responsibility. Leave transcription disabled while proving admission. Enabling it in the dashboard worker uses the existing configured speech services and may incur charges; that pipeline is separate from this join-only implementation.

## When Google requires sign-in

Stop any active bot, then run `npm run bot:login`. Sign in yourself in the dedicated browser window, including any Google verification, and close the window when finished. Do not use your personal Chrome profile or paste credentials into Scripra. The bot then reuses `.bot-profile`; it is ignored by Git. Google can show the signed-in account's name rather than the guest bot name, so choose the account's display name appropriately.

Signing in does not override the host's admission or organization restrictions. If Google blocks automated browsers or requires additional verification, the operator must resolve that normally; admission is not guaranteed. Do not retry rejected entry indefinitely.

## Verification

`npm run bot:test` runs local tests for URL validation, preserving an active meeting, join-only speech isolation, timeout, cancellation and mute controls. Tests do not enter real calls. A final live check needs a valid Meet link and a host to admit the bot; verify its presence in the participant list and verify Stop removes it.
