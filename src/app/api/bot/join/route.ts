import { NextRequest, NextResponse } from 'next/server';
import { botProxy } from '@/lib/botProxy';
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  try {
    const url = new URL(body?.url);
    const isMeet = url.hostname === 'meet.google.com' && /^\/[a-z]{3}-[a-z]{4}-[a-z]{3}\/?$/.test(url.pathname);
    const isTeams = ['teams.microsoft.com', 'teams.live.com', 'teams.cloud.microsoft'].includes(url.hostname)
      && /^\/(?:meet\/\d+\/?$|l\/meetup-join\/[^/]+|dl\/launcher\/launcher\.html$)/.test(url.pathname);
    if (url.protocol !== 'https:' || url.port || url.username || url.password || (!isMeet && !isTeams)) throw new Error();
    return botProxy('/api/bot/join', 'POST', { url: url.origin + url.pathname + url.search });
  } catch {
    return NextResponse.json({ error: 'Enter a valid Google Meet or Microsoft Teams meeting link.' }, { status: 400 });
  }
}
