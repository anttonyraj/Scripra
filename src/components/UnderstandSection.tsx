export default function UnderstandSection() {
  return (
    <section className="py-32 bg-raise border-t border-line">
      <div className="max-w-[1200px] mx-auto px-6">
        
        <div className="text-center max-w-[700px] mx-auto mb-20">
          <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-indigo mb-4">
            02 — Understand
          </div>
          <h2 className="text-[clamp(36px,5vw,52px)] font-bold tracking-[-0.03em] text-ink leading-[1.05] mb-6">
            Know what actually happened.
          </h2>
          <p className="text-[18px] text-ink-2 leading-[1.6]">
            Scripra separates speakers and automatically extracts recaps, detailed summaries, decisions, risks, and open questions from your raw conversation.
          </p>
        </div>

        {/* UI Mockup */}
        <div className="rounded-[16px] border border-line bg-panel shadow-2xl overflow-hidden flex flex-col md:flex-row h-auto md:h-[600px]">
          
          {/* Transcript side */}
          <div className="w-full md:w-1/2 border-b md:border-b-0 md:border-r border-line flex flex-col bg-canvas">
            <div className="sticky top-0 bg-canvas/90 backdrop-blur border-b border-line p-4 px-6 text-[11px] font-bold tracking-[0.15em] uppercase text-ink-3 z-10 flex justify-between">
              <span>Transcript</span>
              <span className="font-mono">3 Speakers</span>
            </div>
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              
              <div className="grid grid-cols-[48px_1fr] gap-3">
                <div className="font-mono text-[11px] text-ink-3 pt-1">04:12</div>
                <div>
                  <div className="text-[12px] font-semibold text-indigo mb-1">Sarah</div>
                  <div className="text-[14.5px] leading-[1.6] text-ink-2">We need to lock in the architecture for the new caching layer. Right now, it's causing race conditions in production.</div>
                </div>
              </div>

              <div className="grid grid-cols-[48px_1fr] gap-3">
                <div className="font-mono text-[11px] text-ink-3 pt-1">04:45</div>
                <div>
                  <div className="text-[12px] font-semibold text-amber mb-1">Michael</div>
                  <div className="text-[14.5px] leading-[1.6] text-ink-2">I think we should move to Redis for the session cache. It's stable, but the migration might take two weeks. Are we okay pushing the launch?</div>
                </div>
              </div>

              <div className="grid grid-cols-[48px_1fr] gap-3 bg-indigo-wash p-4 -mx-4 rounded-xl">
                <div className="font-mono text-[11px] text-ink-3 pt-1">05:10</div>
                <div>
                  <div className="text-[12px] font-semibold text-teal mb-1">Antony</div>
                  <div className="text-[14.5px] leading-[1.6] text-ink">Yes. Let's officially decide to migrate to Redis. We'll delay the launch by two weeks to ensure stability.</div>
                </div>
              </div>

              <div className="grid grid-cols-[48px_1fr] gap-3">
                <div className="font-mono text-[11px] text-ink-3 pt-1">05:30</div>
                <div>
                  <div className="text-[12px] font-semibold text-amber mb-1">Michael</div>
                  <div className="text-[14.5px] leading-[1.6] text-ink-2">Great, I'll draft the migration plan today. One risk though: if AWS introduces latency between the nodes, we might still see timeouts.</div>
                </div>
              </div>

            </div>
          </div>

          {/* Structured Output Side */}
          <div className="w-full md:w-1/2 flex flex-col bg-panel">
            <div className="sticky top-0 bg-panel/90 backdrop-blur border-b border-line p-4 px-6 text-[11px] font-bold tracking-[0.15em] uppercase text-ink-3 z-10">
              Scripra Extracted
            </div>
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5">
              
              {/* Quick Recap */}
              <div className="bg-card border border-line rounded-xl p-5 shadow-sm">
                <div className="text-[11px] font-bold tracking-[0.15em] uppercase text-ink mb-3">Quick Recap</div>
                <p className="text-[14px] leading-[1.6] text-ink-2">
                  The team discussed production race conditions and agreed to migrate the session cache to Redis, which will delay the upcoming launch by two weeks.
                </p>
              </div>

              {/* Decision */}
              <div className="bg-card border border-indigo/20 rounded-xl p-5 shadow-sm">
                <div className="text-[11px] font-bold tracking-[0.15em] uppercase text-indigo flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-indigo" />
                  Decision
                </div>
                <div className="text-[14px] leading-[1.5] text-ink mb-3">
                  Migrate the session cache to Redis and delay the launch by two weeks.
                </div>
                <div className="flex justify-between items-center">
                  <span className="px-2 py-1 rounded bg-indigo-wash text-indigo text-[10px] font-semibold">High confidence</span>
                  <span className="font-mono text-[11px] text-indigo bg-indigo-wash px-2 py-1 rounded">05:10</span>
                </div>
              </div>

              {/* Risk */}
              <div className="bg-card border border-rose/20 rounded-xl p-5 shadow-sm">
                <div className="text-[11px] font-bold tracking-[0.15em] uppercase text-rose flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-rose" />
                  Risk
                </div>
                <div className="text-[14px] leading-[1.5] text-ink mb-3">
                  AWS network latency between nodes could still result in timeouts despite the Redis migration.
                </div>
                <div className="flex justify-end items-center">
                  <span className="font-mono text-[11px] text-ink-3">05:30</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
