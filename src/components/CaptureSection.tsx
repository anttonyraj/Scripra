export default function CaptureSection() {
  return (
    <section className="py-32 bg-canvas">
      <div className="max-w-[1080px] mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 flex flex-col gap-6">
            <div className="bg-panel border border-line rounded-[16px] p-8 shadow-sm flex flex-col gap-8">
              
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-rose/10 flex items-center justify-center text-rose shrink-0">
                  <div className="w-4 h-4 rounded-full bg-rose animate-pulse" />
                </div>
                <div>
                  <div className="text-[16px] font-semibold text-ink mb-2">Record anything</div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-[12px] bg-card border border-line px-2.5 py-1 rounded text-ink-2 font-medium">In-person</span>
                    <span className="text-[12px] bg-card border border-line px-2.5 py-1 rounded text-ink-2 font-medium">Browser</span>
                    <span className="text-[12px] bg-card border border-line px-2.5 py-1 rounded text-ink-2 font-medium">Meeting</span>
                    <span className="text-[12px] bg-card border border-line px-2.5 py-1 rounded text-ink-2 font-medium">Lecture</span>
                    <span className="text-[12px] bg-card border border-line px-2.5 py-1 rounded text-ink-2 font-medium">Voice note</span>
                    <span className="text-[12px] bg-card border border-line px-2.5 py-1 rounded text-ink-2 font-medium">Interview</span>
                    <span className="text-[12px] bg-card border border-line px-2.5 py-1 rounded text-ink-2 font-medium">Brainstorm</span>
                  </div>
                </div>
              </div>
              
              <div className="h-px w-full bg-line" />
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-indigo-wash flex items-center justify-center text-indigo shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
                  </svg>
                </div>
                <div>
                  <div className="text-[16px] font-semibold text-ink">Upload audio or video</div>
                  <div className="text-[14px] text-ink-3">.mp3, .mp4, .wav</div>
                </div>
              </div>

            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-indigo mb-4">
              01 — Capture
            </div>
            <h2 className="text-[clamp(36px,5vw,52px)] font-bold tracking-[-0.03em] text-ink leading-[1.05] mb-6">
              Capture any important conversation.
            </h2>
            <p className="text-[18px] text-ink-2 leading-[1.6]">
              Record in person, capture in the browser, or import audio and video you already have. Scripra is built to handle the way you actually work.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
