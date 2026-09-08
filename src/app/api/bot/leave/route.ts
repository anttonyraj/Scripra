import { botProxy } from '@/lib/botProxy';
export async function POST() { return botProxy('/api/bot/leave', 'POST'); }
