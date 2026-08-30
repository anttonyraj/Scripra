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
        
        <div className="text-center mb-16">
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

        {/* Pipeline Mockup UI */}
        <div className="relative w-full max-w-[900px] mx-auto rounded-[32px] bg-indigo-[0.03] border border-indigo/10 p-8 md:p-12 overflow-hidden shadow-sm group mb-20">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg0MHY0MEgwVjB6bTM5IDM5VjFoLTM4djM4aDM4eiIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIwLjA0IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none" />
          <div className="absolute top-5 left-5 text-[11px] font-mono tracking-[0.2em] text-indigo/50 font-bold pointer-events-none">NEURAL_PIPELINE</div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 transition-transform duration-500 group-hover:-translate-y-1">
            
            {/* Input Data */}
            <div className="w-full md:w-[280px] bg-white rounded-2xl shadow-[0_12px_40px_rgb(0,0,0,0.08)] border border-indigo/10 p-5 relative hover:border-indigo/40 transition-colors">
              <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-6 h-[2px] bg-indigo/30 hidden md:block" />
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-wash border border-indigo/30 flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-deep"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
                </div>
                <div>
                  <div className="text-[11px] font-bold tracking-wider text-indigo uppercase">Raw Audio</div>
                  <div className="text-[13px] font-semibold text-ink-deep">Sales_Call_Q3.mp4</div>
                </div>
              </div>
              <div className="flex gap-1.5 items-center h-8 overflow-hidden">
                {[...Array(16)].map((_, i) => (
                  <div key={i} className="w-1.5 bg-indigo/30 rounded-full animate-pulse" style={{ height: `${Math.max(20, Math.random() * 100)}%`, animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>

            {/* AI Engine */}
            <div className="shrink-0 w-20 h-20 rounded-full bg-white border border-indigo/30 shadow-[0_0_60px_rgba(91,92,240,0.2)] flex items-center justify-center relative z-10">
              <div className="absolute inset-[-24px] rounded-full border-[2px] border-indigo/20 animate-[spin_12s_linear_infinite] border-dashed" />
              <div className="absolute inset-[-12px] rounded-full border-[2px] border-teal/20 animate-[spin_8s_linear_infinite_reverse] border-dashed" />
              <span className="w-4 h-4 rounded-full bg-indigo animate-ping" />
              <span className="absolute w-4 h-4 rounded-full bg-indigo" />
            </div>

            {/* Extracted Outputs */}
            <div className="w-full md:w-[280px] flex flex-col gap-4 relative">
              <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-6 h-[2px] bg-indigo/30 hidden md:block" />
              
              <div className="bg-white rounded-xl shadow-[0_12px_30px_rgb(0,0,0,0.06)] border border-indigo/10 p-4 flex items-center gap-3.5 hover:border-indigo/40 transition-colors">
                <span className="w-2 h-2 rounded-full bg-indigo" />
                <div>
                  <div className="text-[10px] font-bold tracking-wider text-indigo uppercase">Transcript</div>
                  <div className="text-[13px] font-semibold text-ink-deep">99.8% Accuracy</div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-[0_12px_30px_rgb(0,0,0,0.06)] border border-amber/20 p-4 flex items-center gap-3.5 ml-6 hover:border-amber/40 transition-colors">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <div>
                  <div className="text-[10px] font-bold tracking-wider text-amber-600 uppercase">Action Items</div>
                  <div className="text-[13px] font-semibold text-ink-deep">3 Tasks Extracted</div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-[0_12px_30px_rgb(0,0,0,0.06)] border border-teal/20 p-4 flex items-center gap-3.5 hover:border-teal/40 transition-colors">
                <span className="w-2 h-2 rounded-full bg-teal" />
                <div>
                  <div className="text-[10px] font-bold tracking-wider text-teal uppercase">Memory</div>
                  <div className="text-[13px] font-semibold text-ink-deep">Indexed for Search</div>
                </div>
              </div>
            </div>

          </div>
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
