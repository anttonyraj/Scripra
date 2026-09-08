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
          <div className="relative h-[400px] w-full bg-indigo/[0.03] border border-indigo/10 rounded-[32px] shadow-sm flex flex-col p-8 overflow-hidden group">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg0MHY0MEgwVjB6bTM5IDM5VjFoLTM4djM4aDM4eiIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIwLjA0IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none" />
            <div className="absolute top-5 left-5 text-[11px] font-mono tracking-[0.2em] text-indigo/50 font-bold pointer-events-none select-none z-20">INDIVIDUAL_GRAPH</div>
            
            {/* SVG Lines */}
            <svg className="absolute inset-0 w-full h-full text-indigo/30 pointer-events-none z-0">
              <path d="M50% 80 L50% 150" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 4" className="animate-[dash_20s_linear_infinite]" />
              <path d="M50% 150 L25% 250" stroke="currentColor" strokeWidth="2.5" />
              <path d="M50% 150 L75% 250" stroke="currentColor" strokeWidth="2.5" />
              <path d="M25% 250 L25% 330" stroke="currentColor" strokeWidth="2.5" />
              <path d="M75% 250 L75% 330" stroke="currentColor" strokeWidth="2.5" />
            </svg>

            <div className="relative w-full h-full flex items-center justify-center z-10">
              {/* You */}
              <div className="absolute top-[-10px] bg-indigo border border-indigo-deep text-white rounded-xl px-5 py-2.5 text-[14px] font-bold shadow-lg z-10 flex items-center gap-2 group-hover:scale-105 transition-transform duration-500">
                You
              </div>
              
              {/* Course */}
              <div className="absolute top-[90px] left-[5%] bg-white border border-indigo/20 rounded-xl px-5 py-2.5 text-[13px] font-bold text-indigo-deep shadow-[0_8px_20px_rgba(0,0,0,0.06)] z-10 group-hover:-translate-x-2 transition-transform duration-500">
                Machine Learning Course
              </div>
              
              {/* Gradient Descent */}
              <div className="absolute top-[170px] left-[15%] bg-indigo-wash border border-indigo/20 rounded-xl px-4 py-2 text-[12px] font-bold text-indigo shadow-sm z-10 group-hover:-translate-y-2 transition-transform duration-500">
                Gradient Descent
              </div>

              {/* Ideas */}
              <div className="absolute top-[90px] right-[10%] bg-white border border-amber/20 rounded-xl px-5 py-2.5 text-[13px] font-bold text-indigo-deep shadow-[0_8px_20px_rgba(0,0,0,0.06)] z-10 group-hover:translate-x-2 transition-transform duration-500 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-amber-500" />
                Ideas
              </div>

              {/* Pricing */}
              <div className="absolute top-[170px] right-[25%] bg-white border border-amber/20 rounded-xl px-4 py-2 text-[12px] font-bold text-indigo-deep shadow-sm z-10 flex items-center gap-2 group-hover:translate-y-2 transition-transform duration-500 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-amber-500" />
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                Pricing strategy
              </div>
            </div>
          </div>

          {/* Team Graph */}
          <div className="relative h-[400px] w-full bg-indigo/[0.03] border border-indigo/10 rounded-[32px] shadow-sm flex flex-col p-8 overflow-hidden group">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg0MHY0MEgwVjB6bTM5IDM5VjFoLTM4djM4aDM4eiIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIwLjA0IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none" />
            <div className="absolute top-5 left-5 text-[11px] font-mono tracking-[0.2em] text-teal/50 font-bold pointer-events-none select-none z-20">TEAM_GRAPH</div>

            {/* SVG Lines */}
            <svg className="absolute inset-0 w-full h-full text-indigo/30 pointer-events-none z-0">
              <path d="M50% 80 L50% 150" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 4" className="animate-[dash_20s_linear_infinite]" />
              <path d="M50% 150 L50% 230" stroke="currentColor" strokeWidth="2.5" />
              <path d="M50% 230 L20% 320" stroke="currentColor" strokeWidth="2.5" />
              <path d="M50% 230 L50% 320" stroke="currentColor" strokeWidth="2.5" />
              <path d="M50% 230 L80% 320" stroke="currentColor" strokeWidth="2.5" />
            </svg>

            <div className="relative w-full h-full flex items-center justify-center z-10">
              {/* Company */}
              <div className="absolute top-[-10px] bg-white border border-indigo/20 rounded-xl px-5 py-2.5 text-[14px] font-bold text-indigo-deep shadow-[0_8px_20px_rgba(0,0,0,0.06)] z-10 flex items-center gap-2 group-hover:scale-105 transition-transform duration-500">
                <span className="w-2 h-2 rounded-full bg-indigo" />
                Acme Corp
              </div>

              {/* Project */}
              <div className="absolute top-[60px] bg-white border border-indigo/20 rounded-xl px-5 py-2.5 text-[13px] font-bold text-indigo-deep shadow-[0_8px_20px_rgba(0,0,0,0.06)] z-10 group-hover:scale-105 transition-transform duration-500 delay-75">
                Project Atlas
              </div>

              {/* Meeting */}
              <div className="absolute top-[140px] bg-indigo border border-indigo-deep rounded-xl px-5 py-2.5 text-[13px] font-bold text-white shadow-lg z-10 flex items-center gap-2 group-hover:scale-105 transition-transform duration-500 delay-100">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                Product Review
              </div>

              {/* Decision */}
              <div className="absolute top-[230px] left-[5%] bg-indigo-wash border border-indigo/20 rounded-xl px-4 py-2 text-[12px] font-bold text-indigo shadow-sm z-10 flex items-center gap-2 group-hover:-translate-x-2 group-hover:translate-y-2 transition-transform duration-500">
                <span className="w-1.5 h-1.5 bg-indigo rounded-full" />
                Decision
              </div>

              {/* Action */}
              <div className="absolute top-[230px] bg-white border border-amber/20 rounded-xl px-4 py-2 text-[12px] font-bold text-indigo-deep shadow-sm z-10 flex items-center gap-2 group-hover:translate-y-2 transition-transform duration-500 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-amber-500" />
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                Action
              </div>

              {/* Risk */}
              <div className="absolute top-[230px] right-[5%] bg-white border border-rose/20 rounded-xl px-4 py-2 text-[12px] font-bold text-indigo-deep shadow-sm z-10 flex items-center gap-2 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-rose-500" />
                <span className="w-1.5 h-1.5 bg-rose-500 rounded-full" />
                Risk
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
