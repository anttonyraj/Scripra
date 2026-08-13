export default function Differentiator() {
  return (
    <section className="py-32 border-t border-line bg-canvas">
      <div className="max-w-[1080px] mx-auto px-6 text-center">
        <h2 className="text-[clamp(32px,5vw,54px)] font-bold tracking-[-0.03em] leading-[1.1] mb-20 max-w-[900px] mx-auto text-ink">
          <span className="text-ink-3">Other tools record meetings.</span>
          <br />
          Scripra remembers what your organisation said, decided and promised.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-[900px] mx-auto">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-indigo-wash text-indigo flex items-center justify-center mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-[20px] font-bold tracking-[-0.02em] text-ink mb-3">Said</h3>
            <p className="text-[15px] leading-[1.6] text-ink-2">
              Original conversation and highly accurate transcript.
            </p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-indigo-wash text-indigo flex items-center justify-center mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-[20px] font-bold tracking-[-0.02em] text-ink mb-3">Decided</h3>
            <p className="text-[15px] leading-[1.6] text-ink-2">
              Structured decisions with explicit source evidence.
            </p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-amber-wash text-amber-deep flex items-center justify-center mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-[20px] font-bold tracking-[-0.02em] text-ink mb-3">Promised</h3>
            <p className="text-[15px] leading-[1.6] text-ink-2">
              Actions and commitments automatically assigned to owners.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
