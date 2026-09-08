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
        <div className="relative w-full max-w-[800px] mx-auto rounded-[32px] bg-indigo/[0.03] border border-indigo/10 p-10 h-[400px] flex items-center justify-center overflow-hidden shadow-sm group">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg0MHY0MEgwVjB6bTM5IDM5VjFoLTM4djM4aDM4eiIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIwLjA0IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=')] [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)] pointer-events-none" />
          <div className="absolute top-5 left-5 text-[11px] font-mono tracking-[0.2em] text-indigo/50 font-bold pointer-events-none select-none">SINGLE_MEMORY_STORE</div>
          
          {/* Central Node */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
            <div className="w-28 h-28 rounded-full bg-white border-4 border-indigo flex items-center justify-center shadow-[0_0_40px_rgba(91,92,240,0.3)] z-20 relative group-hover:scale-105 transition-transform duration-500">
              <div className="absolute inset-0 rounded-full border border-indigo/20 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" />
              <span className="text-[13px] font-bold tracking-wider text-indigo uppercase text-center leading-tight">Scripra<br/>Memory</span>
            </div>
          </div>

          {/* Source Nodes */}
          {/* Top Left */}
          <div className="absolute left-[8%] top-[15%] z-10 flex items-center gap-4 group-hover:-translate-y-1 transition-transform duration-500 delay-75">
            <div className="bg-white border border-indigo/20 rounded-xl px-5 py-2.5 text-[13px] font-bold text-indigo-deep shadow-[0_8px_20px_rgba(0,0,0,0.06)] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-indigo" />
              Meeting
            </div>
            <svg className="w-40 h-32 absolute left-[100%] top-[50%] pointer-events-none opacity-50 text-indigo" style={{ transform: 'translateY(-50%)' }} preserveAspectRatio="none" viewBox="0 0 100 100">
              <path d="M0 50 C 50 50, 50 100, 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 4" className="animate-[dash_20s_linear_infinite]" />
            </svg>
          </div>

          {/* Middle Left */}
          <div className="absolute left-[2%] top-[50%] -translate-y-1/2 z-10 flex items-center gap-4 group-hover:-translate-x-1 transition-transform duration-500 delay-100">
            <div className="bg-white border border-amber/20 rounded-xl px-5 py-2.5 text-[13px] font-bold text-indigo-deep shadow-[0_8px_20px_rgba(0,0,0,0.06)] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-amber-500" />
              Lecture
            </div>
            <svg className="w-32 h-8 absolute left-[100%] top-[50%] pointer-events-none opacity-50 text-amber-500" style={{ transform: 'translateY(-50%)' }} preserveAspectRatio="none" viewBox="0 0 100 10">
              <path d="M0 5 L 100 5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 4" className="animate-[dash_20s_linear_infinite]" />
            </svg>
          </div>

          {/* Bottom Left */}
          <div className="absolute left-[8%] bottom-[15%] z-10 flex items-center gap-4 group-hover:translate-y-1 transition-transform duration-500 delay-150">
            <div className="bg-white border border-rose/20 rounded-xl px-5 py-2.5 text-[13px] font-bold text-indigo-deep shadow-[0_8px_20px_rgba(0,0,0,0.06)] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-rose-500" />
              Voice Note
            </div>
            <svg className="w-40 h-32 absolute left-[100%] bottom-[50%] pointer-events-none opacity-50 text-rose-500" style={{ transform: 'translateY(50%)' }} preserveAspectRatio="none" viewBox="0 0 100 100">
              <path d="M0 50 C 50 50, 50 0, 100 0" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 4" className="animate-[dash_20s_linear_infinite]" />
            </svg>
          </div>

          {/* Top Right */}
          <div className="absolute right-[8%] top-[25%] z-10 flex items-center gap-4 flex-row-reverse group-hover:-translate-y-1 transition-transform duration-500 delay-200">
            <div className="bg-white border border-teal/20 rounded-xl px-5 py-2.5 text-[13px] font-bold text-indigo-deep shadow-[0_8px_20px_rgba(0,0,0,0.06)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-1 h-full bg-teal" />
              Interview
            </div>
            <svg className="w-40 h-24 absolute right-[100%] top-[50%] pointer-events-none opacity-50 text-teal" style={{ transform: 'translateY(-50%)' }} preserveAspectRatio="none" viewBox="0 0 100 100">
              <path d="M100 50 C 50 50, 50 100, 0 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 4" className="animate-[dash_20s_linear_infinite]" />
            </svg>
          </div>

          {/* Bottom Right */}
          <div className="absolute right-[8%] bottom-[25%] z-10 flex items-center gap-4 flex-row-reverse group-hover:translate-y-1 transition-transform duration-500 delay-300">
            <div className="bg-white border border-indigo/20 rounded-xl px-5 py-2.5 text-[13px] font-bold text-indigo-deep shadow-[0_8px_20px_rgba(0,0,0,0.06)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-1 h-full bg-indigo" />
              Brainstorm
            </div>
            <svg className="w-40 h-24 absolute right-[100%] bottom-[50%] pointer-events-none opacity-50 text-indigo" style={{ transform: 'translateY(50%)' }} preserveAspectRatio="none" viewBox="0 0 100 100">
              <path d="M100 50 C 50 50, 50 0, 0 0" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 4" className="animate-[dash_20s_linear_infinite]" />
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
