export default function ActionsSection() {
  return (
    <section className="py-32 bg-canvas">
      <div className="max-w-[1200px] mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-amber mb-4">
              03 — Act
            </div>
            <h2 className="text-[clamp(36px,5vw,52px)] font-bold tracking-[-0.03em] text-ink leading-[1.05] mb-6">
              Turn conversation into action.
            </h2>
            <p className="text-[18px] text-ink-2 leading-[1.6]">
              Scripra identifies what needs to get done, who is responsible, and when it’s due — without anyone having to type a single note.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            
            {/* Action Item */}
            <div className="bg-panel border border-line rounded-[16px] p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-amber" />
              <div className="text-[10px] font-bold tracking-[0.15em] uppercase text-amber mb-4">
                Action Item
              </div>
              <div className="text-[18px] font-semibold text-ink leading-[1.4] mb-6">
                Draft the Redis migration plan and timeline for engineering review.
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="px-3 py-1.5 rounded-full bg-amber-wash text-amber text-[12px] font-semibold flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-amber text-white flex items-center justify-center text-[9px]">M</div>
                  Michael
                </div>
                <div className="px-3 py-1.5 rounded-full bg-canvas border border-line text-ink-2 text-[12px] font-semibold flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  Due Thursday
                </div>
                <div className="ml-auto font-mono text-[12px] text-ink-3 bg-raise px-2 py-1 rounded">
                  Source: 05:30
                </div>
              </div>
            </div>

            {/* Commitment */}
            <div className="bg-panel border border-line rounded-[16px] p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-amber/60" />
              <div className="text-[10px] font-bold tracking-[0.15em] uppercase text-amber/80 mb-4">
                Commitment
              </div>
              <div className="text-[18px] font-semibold text-ink leading-[1.4] mb-6">
                Send the customer update to Acme informing them of the two-week delay.
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="px-3 py-1.5 rounded-full bg-amber-wash text-amber text-[12px] font-semibold flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-amber text-white flex items-center justify-center text-[9px]">S</div>
                  Sarah
                </div>
                <div className="ml-auto font-mono text-[12px] text-ink-3 bg-raise px-2 py-1 rounded">
                  Source: 08:45
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
