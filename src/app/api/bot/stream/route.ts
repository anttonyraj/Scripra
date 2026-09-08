import { botProxy } from '@/lib/botProxy';
export const dynamic = 'force-dynamic';
export async function GET() { return botProxy('/api/transcript/stream', 'GET', undefined, true); }
