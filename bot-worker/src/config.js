import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const config = {
  port: parseInt(process.env.BOT_PORT || '5000', 10),
  deepgramKey: process.env.DEEPGRAM_API_KEY || '',
  azureSpeech: {
    key: process.env.AZURE_SPEECH_KEY || '',
    region: process.env.AZURE_SPEECH_REGION || 'northeurope',
    language: process.env.AZURE_SPEECH_LANGUAGE || 'en-US'
  },
  bot: {
    name: process.env.BOT_NAME || 'Scripra AI Notetaker',
    email: process.env.BOT_EMAIL || 'notetaker@scripra.com',
    headless: process.env.BOT_HEADLESS !== 'false',
    transcriptionEnabled: process.env.BOT_TRANSCRIPTION_ENABLED === 'true',
    joinTimeoutSeconds: parseInt(process.env.BOT_JOIN_TIMEOUT_SECONDS || '90', 10)
  },
  webex: {
    headless: process.env.WEBEX_HEADLESS !== 'false'
  }
};
