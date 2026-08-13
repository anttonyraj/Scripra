export default function Pillars() {
  return (
    <section className="py-24 border-t border-line">
      <div className="max-w-[1080px] mx-auto px-6">
        <h2 className="text-[clamp(28px,4vw,40px)] font-bold tracking-[-0.02em] mb-16 text-center max-w-[700px] mx-auto">
          From conversation to intelligence.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {/* Capture */}
          <div className="flex flex-col gap-4">
            <div className="text-[12px] font-semibold tracking-[0.2em] uppercase text-indigo">
              Capture
            </div>
            <h3 className="text-[22px] font-bold tracking-[-0.02em] text-ink">
              Capture every important conversation.
            </h3>
            <p className="text-[16px] leading-[1.6] text-ink-2">
              Record in-person conversations, meetings, calls or lectures, or import existing audio and video. Scripra handles over 100 languages with precision.
            </p>
          </div>

          {/* Understand */}
          <div className="flex flex-col gap-4">
            <div className="text-[12px] font-semibold tracking-[0.2em] uppercase text-indigo">
              Understand
            </div>
            <h3 className="text-[22px] font-bold tracking-[-0.02em] text-ink">
              Know what actually happened.
            </h3>
            <p className="text-[16px] leading-[1.6] text-ink-2">
              Get an accurate transcript with speaker separation, quick recaps, detailed meeting summaries, and structured extractions of decisions and risks.
            </p>
          </div>

          {/* Act */}
          <div className="flex flex-col gap-4">
            <div className="text-[12px] font-semibold tracking-[0.2em] uppercase text-amber">
              Act
            </div>
            <h3 className="text-[22px] font-bold tracking-[-0.02em] text-ink">
              Turn words into action.
            </h3>
            <p className="text-[16px] leading-[1.6] text-ink-2">
              Scripra identifies action items, owners, deadlines, and commitments, ensuring nothing slips through the cracks after the call ends.
            </p>
          </div>

          {/* Recall */}
          <div className="flex flex-col gap-4">
            <div className="text-[12px] font-semibold tracking-[0.2em] uppercase text-indigo">
              Recall
            </div>
            <h3 className="text-[22px] font-bold tracking-[-0.02em] text-ink">
              Never lose the context.
            </h3>
            <p className="text-[16px] leading-[1.6] text-ink-2">
              Scripra is designed so conversations become searchable organisational memory. Find out what was decided, who committed to what, and track historical context effortlessly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
