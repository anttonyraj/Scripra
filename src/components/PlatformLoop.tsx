export default function PlatformLoop() {
  const steps = [
    { title: "Capture", tag: "VOICE & MEETINGS", desc: "Record or upload any meeting, lecture, interview or voice note." },
    { title: "Understand", tag: "AUTO TRANSCRIPTS", desc: "Scripra transcribes audio, separates speakers, and summarizes key points." },
    { title: "Act", tag: "DECISIONS & TASKS", desc: "Turn commitments and next steps into structured, assigned action items." },
    { title: "Recall", tag: "INSTANT SEARCH", desc: "Search and ask questions across all your past conversations with instant audio citations." },
    { title: "Remember", tag: "CONNECTED MEMORY", desc: "Build persistent knowledge across conversations over time so nothing is forgotten." }
  ];

  return (
    <section className="py-28 bg-raise/50 border-y border-line relative overflow-hidden backdrop-blur-sm">
      {/* Background glow node */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-indigo/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-indigo/20 bg-indigo-wash text-indigo text-[11px] font-bold tracking-wider uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo animate-pulse"></span>
            HOW IT WORKS
          </div>
          <h2 className="text-[clamp(32px,4vw,46px)] font-bold tracking-[-0.03em] text-ink leading-[1.1] mb-4">
            From raw conversation to organized action.
          </h2>
          <p className="text-[16px] text-ink-2 max-w-[540px] mx-auto">
            A zero-loss feedback loop transforming spoken words into structured actions and queryable memory.
          </p>
        </div>

        {/* Neural Pipeline Grid with Connecting Conduit */}
        <div className="relative">
          {/* Connecting Data Conduit Line (visible on md+ screens) */}
          <div className="hidden md:block absolute top-[28px] left-[5%] right-[5%] h-[2px] bg-gradient-to-r from-indigo/20 via-teal/30 to-indigo/20 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal to-transparent w-32 animate-[flow-right_4s_linear_infinite]" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 text-left relative z-10">
            {steps.map((step, i) => (
              <div 
                key={i} 
                className="group relative flex flex-col gap-4 p-6 rounded-2xl bg-card/60 hover:bg-card border border-line hover:border-indigo/40 transition-all duration-300 shadow-sm hover:shadow-[0_8px_30px_rgba(91,92,240,0.12)] hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-indigo-wash border border-indigo/20 flex items-center justify-center font-mono font-bold text-[14px] text-indigo group-hover:bg-indigo group-hover:text-white transition-colors shadow-sm">
                    0{i + 1}
                  </div>
                  <span className="font-mono text-[9px] font-semibold tracking-wider text-ink-3 uppercase">
                    {step.tag}
                  </span>
                </div>

                <div>
                  <h3 className="text-[17px] font-bold text-ink mb-1 group-hover:text-indigo transition-colors">{step.title}</h3>
                  <p className="text-[13px] text-ink-2 leading-relaxed">{step.desc}</p>
                </div>

                <div className="pt-2 mt-auto border-t border-line/40 flex items-center gap-1.5 text-ink-3 text-[11px] font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-teal">●</span> READY
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
