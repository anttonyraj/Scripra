export default function PlatformLoop() {
  const steps = [
    { title: "Capture", desc: "Record a meeting, lecture, interview, idea or voice note." },
    { title: "Understand", desc: "Scripra transcribes, separates speakers and extracts what matters." },
    { title: "Act", desc: "Turn commitments and next steps into structured actions." },
    { title: "Recall", desc: "Search and ask across what you've captured." },
    { title: "Remember", desc: "Build context across conversations over time." }
  ];

  return (
    <section className="py-24 bg-raise border-y border-line">
      <div className="max-w-[1080px] mx-auto px-6">
        
        <div className="text-center mb-16">
          <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-indigo mb-4">
            How it works
          </div>
          <h2 className="text-[clamp(32px,4vw,44px)] font-bold tracking-[-0.03em] text-ink leading-[1.1] mb-6">
            From conversation to action — and memory.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 lg:gap-10 text-left">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col gap-3">
              <div className="text-[32px] font-bold text-indigo/20 leading-none">0{i + 1}</div>
              <h3 className="text-[16px] font-bold text-ink">{step.title}</h3>
              <p className="text-[14px] text-ink-2 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
