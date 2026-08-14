export default function OneMemorySection() {
  return (
    <section className="py-24 px-6 bg-canvas border-t border-line overflow-hidden">
      <div className="max-w-[1080px] mx-auto text-center">
        <h2 className="text-[clamp(32px,4vw,46px)] font-bold tracking-[-0.03em] leading-[1.05] mb-6 text-ink max-w-[800px] mx-auto">
          Your conversations should not live in separate silos.
        </h2>
        <p className="text-[18px] text-ink-2 max-w-[600px] mx-auto mb-20">
          A meeting, lecture, voice note and interview can all become part of the same searchable memory.
        </p>

        {/* Visual Graph Area */}
        <div className="relative max-w-[800px] mx-auto h-[400px] flex items-center justify-center">
          
          {/* Central Node */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-panel border-4 border-indigo flex items-center justify-center shadow-xl shadow-indigo/10 z-20">
              <span className="text-[13px] font-bold tracking-wider text-indigo uppercase text-center leading-tight">Scripra<br/>Memory</span>
            </div>
          </div>

          {/* Source Nodes */}
          {/* Top Left */}
          <div className="absolute left-[10%] top-[15%] z-10 flex items-center gap-4">
            <div className="bg-card border border-line rounded-lg px-4 py-2 text-[13px] font-medium text-ink shadow-sm">Meeting</div>
            <svg className="w-32 h-32 absolute left-[100%] top-[50%] pointer-events-none opacity-40 text-indigo" style={{ transform: 'translateY(-50%)' }} preserveAspectRatio="none" viewBox="0 0 100 100">
              <path d="M0 50 C 50 50, 50 100, 100 100" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="animate-[dash_20s_linear_infinite]" />
            </svg>
          </div>

          {/* Middle Left */}
          <div className="absolute left-[5%] top-[50%] -translate-y-1/2 z-10 flex items-center gap-4">
            <div className="bg-card border border-line rounded-lg px-4 py-2 text-[13px] font-medium text-ink shadow-sm">Lecture</div>
            <svg className="w-32 h-8 absolute left-[100%] top-[50%] pointer-events-none opacity-40 text-indigo" style={{ transform: 'translateY(-50%)' }} preserveAspectRatio="none" viewBox="0 0 100 10">
              <path d="M0 5 L 100 5" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="animate-[dash_20s_linear_infinite]" />
            </svg>
          </div>

          {/* Bottom Left */}
          <div className="absolute left-[10%] bottom-[15%] z-10 flex items-center gap-4">
            <div className="bg-card border border-line rounded-lg px-4 py-2 text-[13px] font-medium text-ink shadow-sm">Voice Note</div>
            <svg className="w-32 h-32 absolute left-[100%] bottom-[50%] pointer-events-none opacity-40 text-indigo" style={{ transform: 'translateY(50%)' }} preserveAspectRatio="none" viewBox="0 0 100 100">
              <path d="M0 50 C 50 50, 50 0, 100 0" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="animate-[dash_20s_linear_infinite]" />
            </svg>
          </div>

          {/* Top Right */}
          <div className="absolute right-[10%] top-[25%] z-10 flex items-center gap-4 flex-row-reverse">
            <div className="bg-card border border-line rounded-lg px-4 py-2 text-[13px] font-medium text-ink shadow-sm">Interview</div>
            <svg className="w-32 h-24 absolute right-[100%] top-[50%] pointer-events-none opacity-40 text-indigo" style={{ transform: 'translateY(-50%)' }} preserveAspectRatio="none" viewBox="0 0 100 100">
              <path d="M100 50 C 50 50, 50 100, 0 100" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="animate-[dash_20s_linear_infinite]" />
            </svg>
          </div>

          {/* Bottom Right */}
          <div className="absolute right-[10%] bottom-[25%] z-10 flex items-center gap-4 flex-row-reverse">
            <div className="bg-card border border-line rounded-lg px-4 py-2 text-[13px] font-medium text-ink shadow-sm">Brainstorm</div>
            <svg className="w-32 h-24 absolute right-[100%] bottom-[50%] pointer-events-none opacity-40 text-indigo" style={{ transform: 'translateY(50%)' }} preserveAspectRatio="none" viewBox="0 0 100 100">
              <path d="M100 50 C 50 50, 50 0, 0 0" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="animate-[dash_20s_linear_infinite]" />
            </svg>
          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes dash {
          to {
            stroke-dashoffset: -1000;
          }
        }
      `}} />
    </section>
  );
}
