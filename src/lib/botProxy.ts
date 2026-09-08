import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export async function botProxy(path: string, method: 'GET' | 'POST', body?: unknown, stream = false) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Sign in to control your bot.' }, { status: 401 });
  const base = process.env.BOT_SERVER_URL || 'http://127.0.0.1:5000';
  try {
    const workerUrl = new URL(base);
    if (!['localhost', '127.0.0.1', '[::1]'].includes(workerUrl.hostname)) {
      return NextResponse.json({ error: 'This integration is local-only. Remote deployment requires authenticated worker transport.' }, { status: 503 });
    }
    const response = await fetch(`${base}${path}`, {
      method,
      headers: { 'Content-Type': 'application/json', 'x-scripra-owner': session.user.id },
      ...(body === undefined ? {} : { body: JSON.stringify(body) }),
      cache: 'no-store',
      ...(!stream ? { signal: AbortSignal.timeout(180_000) } : {}),
    });
    if (stream && response.ok) return new Response(response.body, {
      headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache, no-transform' },
    });
    const data = await response.json().catch(() => ({ error: 'Invalid response from bot worker.' }));
    return NextResponse.json(data, { status: response.status });
  } catch {
    return NextResponse.json({ error: 'Bot worker unavailable. Run npm run bot:start on the same computer as Scripra.', state: 'Offline', offline: true }, { status: 503 });
  }
}
