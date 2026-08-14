export default function ScripraThinkSection() {
  return (
    <section className="py-24 px-6 bg-canvas border-t border-line">
      <div className="max-w-[1080px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Copy */}
        <div>
          <div className="text-[11px] font-bold tracking-wider text-indigo uppercase mb-4 flex items-center gap-3">
            Scripra Think
            <span className="bg-indigo-wash text-indigo px-2 py-0.5 rounded text-[9px] tracking-widest border border-indigo/20">PREVIEW</span>
          </div>
          <h2 className="text-[clamp(32px,4vw,40px)] font-bold tracking-[-0.03em] leading-[1.05] mb-6 text-ink">
            Speak an idea before you lose it.
          </h2>
          <p className="text-[17px] text-ink-2 max-w-[440px] leading-relaxed">
            Scripra turns raw voice notes into structured thoughts, tasks, topics and searchable memory. Capture on the go, without typing a word.
          </p>
        </div>

        {/* Right Side: Mockup */}
        <div className="bg-panel border border-line rounded-3xl p-8 lg:p-10 shadow-sm relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-indigo/5 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="relative z-10 flex flex-col gap-6">
            
            {/* Input Note */}
            <div className="flex gap-4 opacity-70">
              <div className="w-8 h-8 rounded-full bg-line flex items-center justify-center shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ink-2">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                  <line x1="12" x2="12" y1="19" y2="22"/>
                </svg>
              </div>
              <div className="text-[14px] leading-relaxed text-ink-2 font-medium italic pt-1">
                "I should create a pricing comparison, email Sarah, and explore a student plan."
              </div>
            </div>

            {/* Extracted Structs */}
            <div className="pl-12 flex flex-col gap-3">
              <div className="bg-card border border-indigo/20 rounded-lg p-3">
                <span className="text-[9px] font-bold tracking-wider text-indigo uppercase mb-1 block">Idea</span>
                <p className="text-[13px] font-medium text-ink">Pricing comparison</p>
              </div>
              
              <div className="bg-amber-wash border border-amber/30 rounded-lg p-3">
                <span className="text-[9px] font-bold tracking-wider text-amber uppercase mb-1 block">Action</span>
                <p className="text-[13px] font-medium text-ink">Email Sarah</p>
              </div>
              
              <div className="bg-card border border-indigo/20 rounded-lg p-3">
                <span className="text-[9px] font-bold tracking-wider text-indigo uppercase mb-1 block">Idea</span>
                <p className="text-[13px] font-medium text-ink">Explore student plan</p>
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </section>
  );
}
