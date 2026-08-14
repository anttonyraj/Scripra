export default function GraphSection() {
  return (
    <section className="py-32 bg-canvas">
      <div className="max-w-[1280px] mx-auto px-6">
        
        <div className="text-center max-w-[700px] mx-auto mb-20">
          <h2 className="text-[clamp(36px,5vw,52px)] font-bold tracking-[-0.03em] text-ink leading-[1.05] mb-6">
            See how conversations connect.
          </h2>
          <p className="text-[18px] text-ink-2 leading-[1.6]">
            Under the hood, Scripra builds a relationship graph. It automatically connects the people, projects, meetings, concepts, and decisions you care about.
          </p>
        </div>

        {/* Visual Graph Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          
          {/* Personal Graph */}
          <div className="relative h-[400px] w-full bg-panel border border-line rounded-[16px] shadow-sm flex flex-col p-8 overflow-hidden">
            <div className="text-[11px] font-bold tracking-wider uppercase text-ink-3 mb-8 text-center z-20">
              Personal Graph
            </div>
            
            {/* SVG Lines */}
            <svg className="absolute inset-0 w-full h-full text-indigo/20 pointer-events-none">
              <path d="M50% 80 L50% 150" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
              <path d="M50% 150 L25% 250" stroke="currentColor" strokeWidth="2" />
              <path d="M50% 150 L75% 250" stroke="currentColor" strokeWidth="2" />
              <path d="M25% 250 L25% 330" stroke="currentColor" strokeWidth="2" />
              <path d="M75% 250 L75% 330" stroke="currentColor" strokeWidth="2" />
            </svg>

            <div className="relative w-full h-full flex items-center justify-center">
              {/* You */}
              <div className="absolute top-[-10px] bg-indigo border border-indigo-deep text-white rounded-full px-5 py-2 text-[14px] font-semibold shadow-sm z-10 flex items-center gap-2">
                You
              </div>
              
              {/* Course */}
              <div className="absolute top-[90px] left-[10%] bg-canvas border border-line rounded-full px-5 py-2 text-[13px] font-semibold text-ink shadow-sm z-10">
                Machine Learning Course
              </div>
              
              {/* Gradient Descent */}
              <div className="absolute top-[170px] left-[15%] bg-canvas border border-indigo/30 rounded-full px-4 py-1.5 text-[12px] font-medium text-ink shadow-sm z-10">
                Gradient Descent
              </div>

              {/* Ideas */}
              <div className="absolute top-[90px] right-[20%] bg-canvas border border-line rounded-full px-5 py-2 text-[13px] font-semibold text-ink shadow-sm z-10">
                Ideas
              </div>

              {/* Pricing */}
              <div className="absolute top-[170px] right-[25%] bg-canvas border border-amber/30 rounded-full px-4 py-1.5 text-[12px] font-medium text-ink shadow-sm z-10 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-amber rounded-full" />
                Pricing strategy
              </div>
            </div>
          </div>

          {/* Team Graph */}
          <div className="relative h-[400px] w-full bg-panel border border-line rounded-[16px] shadow-sm flex flex-col p-8 overflow-hidden">
            <div className="text-[11px] font-bold tracking-wider uppercase text-ink-3 mb-8 text-center z-20">
              Team Graph
            </div>

            {/* SVG Lines */}
            <svg className="absolute inset-0 w-full h-full text-indigo/20 pointer-events-none">
              <path d="M50% 80 L50% 150" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
              <path d="M50% 150 L50% 230" stroke="currentColor" strokeWidth="2" />
              <path d="M50% 230 L20% 320" stroke="currentColor" strokeWidth="2" />
              <path d="M50% 230 L50% 320" stroke="currentColor" strokeWidth="2" />
              <path d="M50% 230 L80% 320" stroke="currentColor" strokeWidth="2" />
            </svg>

            <div className="relative w-full h-full flex items-center justify-center">
              {/* Company */}
              <div className="absolute top-[-10px] bg-canvas border border-line rounded-full px-5 py-2 text-[14px] font-semibold text-ink shadow-sm z-10 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo" />
                Acme Corp
              </div>

              {/* Project */}
              <div className="absolute top-[60px] bg-canvas border border-line rounded-full px-5 py-2 text-[13px] font-semibold text-ink shadow-sm z-10">
                Project Atlas
              </div>

              {/* Meeting */}
              <div className="absolute top-[140px] bg-indigo-wash border border-indigo/20 rounded-full px-5 py-2 text-[13px] font-semibold text-indigo shadow-sm z-10 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo" />
                Product Review
              </div>

              {/* Decision */}
              <div className="absolute top-[230px] left-[5%] bg-canvas border border-indigo/30 rounded-full px-4 py-1.5 text-[12px] font-medium text-ink shadow-sm z-10 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-indigo rounded-full" />
                Decision
              </div>

              {/* Action */}
              <div className="absolute top-[230px] bg-canvas border border-amber/30 rounded-full px-4 py-1.5 text-[12px] font-medium text-ink shadow-sm z-10 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-amber rounded-full" />
                Action
              </div>

              {/* Risk */}
              <div className="absolute top-[230px] right-[5%] bg-canvas border border-rose/30 rounded-full px-4 py-1.5 text-[12px] font-medium text-ink shadow-sm z-10 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-rose rounded-full" />
                Risk
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
