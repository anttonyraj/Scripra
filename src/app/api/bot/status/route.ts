import { botProxy } from '@/lib/botProxy';
export async function GET() { return botProxy('/api/bot/status', 'GET'); }
