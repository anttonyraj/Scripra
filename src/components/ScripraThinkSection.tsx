export default function ScripraThinkSection() {
  return (
    <section className="py-28 px-6 bg-canvas border-t border-line relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[300px] bg-indigo/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1080px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Side: Copy */}
        <div>
          <div className="text-[11px] font-bold tracking-wider text-indigo uppercase mb-4 flex items-center gap-3">
            <span className="text-[10px] font-bold tracking-wider text-indigo uppercase bg-indigo-wash border border-indigo/20 px-3 py-1 rounded-full">
              SCRIPRA THINK
            </span>
            <span className="bg-teal-wash text-teal px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider border border-teal/20">VOICE TO ACTION</span>
          </div>
          <h2 className="text-[clamp(32px,4vw,42px)] font-bold tracking-[-0.03em] leading-[1.05] mb-6 text-ink">
            Speak an idea before you lose it.
          </h2>
          <p className="text-[16px] text-ink-2 max-w-[440px] leading-relaxed mb-6">
            Scripra turns raw voice notes into structured thoughts, tasks, topics and searchable memory. Capture on the go, without typing a word.
          </p>

          <div className="flex items-center gap-6 text-[12px] font-medium text-ink-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
              <span>Crystal Clear Audio</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo" />
              <span>Instant Task Extraction</span>
            </div>
          </div>
        </div>

        {/* Right Side: Mockup */}
        <div className="group bg-panel/80 backdrop-blur-md border border-line hover:border-indigo/40 rounded-3xl p-8 lg:p-10 shadow-sm hover:shadow-[0_20px_50px_rgba(91,92,240,0.12)] transition-all duration-300 relative overflow-hidden">
          {/* Top Status Strip */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-line/60 text-[11px] font-medium text-ink-3">
            <span className="flex items-center gap-1.5 text-indigo font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo" />
              VOICE NOTE PARSER
            </span>
            <span>AUTO-EXTRACTED</span>
          </div>
          
          <div className="relative z-10 flex flex-col gap-6">
            
            {/* Input Note */}
            <div className="flex gap-4 items-start bg-canvas/70 border border-line/60 rounded-2xl p-4">
              <div className="w-9 h-9 rounded-xl bg-indigo-wash border border-indigo/20 flex items-center justify-center shrink-0">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                  <line x1="12" x2="12" y1="19" y2="22"/>
                </svg>
              </div>
              <div className="text-[13px] leading-relaxed text-ink font-medium italic pt-1">
                "I should create a pricing comparison, email Sarah, and explore a student plan."
              </div>
            </div>

            {/* Extracted Structs with Connection Line */}
            <div className="relative pl-6 flex flex-col gap-3 border-l-2 border-dashed border-indigo/30 ml-4">
              <div className="bg-card border border-indigo/20 rounded-xl p-3.5 hover:border-indigo/40 transition-colors shadow-sm">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-bold tracking-wider text-indigo uppercase">IDEA</span>
                  <span className="text-[10px] text-ink-3">Topic</span>
                </div>
                <p className="text-[13px] font-semibold text-ink">Pricing comparison</p>
              </div>
              
              <div className="bg-amber-wash border border-amber/30 rounded-xl p-3.5 shadow-sm">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-bold tracking-wider text-amber uppercase">ACTION ITEM</span>
                  <span className="text-[10px] text-amber font-medium">To-Do</span>
                </div>
                <p className="text-[13px] font-semibold text-ink">Email Sarah</p>
              </div>
              
              <div className="bg-card border border-indigo/20 rounded-xl p-3.5 hover:border-indigo/40 transition-colors shadow-sm">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-bold tracking-wider text-indigo uppercase">IDEA</span>
                  <span className="text-[10px] text-ink-3">Opportunity</span>
                </div>
                <p className="text-[13px] font-semibold text-ink">Explore student plan</p>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
