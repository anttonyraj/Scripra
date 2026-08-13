import { ImageResponse } from 'next/og';
 
export const runtime = 'edge';
 
export const alt = 'Scripra — AI Conversation Intelligence';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 84,
          background: '#0B1020',
          color: '#EDEFFA',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          <svg width="100" height="100" viewBox="0 0 40 40" fill="none">
            <path d="M9 9 H31" stroke="#5B5CF0" strokeWidth="3" />
            <path d="M9 16.5 H26" stroke="#5B5CF0" strokeWidth="3" />
            <path d="M14 23.5 H31" stroke="#5B5CF0" strokeWidth="3" />
            <path d="M9 31 H31" stroke="#3D34C4" strokeWidth="3" />
            <path d="M30 10.5 C30 6.5 10 6.5 10 14 C10 20.5 30 19.5 30 26 C30 33.5 10 33.5 10 29.5" stroke="#5B5CF0" strokeWidth="3.4" />
            <circle cx="31.5" cy="31" r="3.4" fill="#F0A02A" />
          </svg>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ fontSize: 72, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1 }}>Scripra</div>
            <div style={{ fontSize: 32, fontWeight: 600, color: '#9AA3C4', letterSpacing: '0.05em' }}>AI CONVERSATION INTELLIGENCE</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
