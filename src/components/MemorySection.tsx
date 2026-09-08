export default function MemorySection() {
  return (
    <section className="py-32 bg-canvas" data-theme="dark">
      {/* 
        We use data-theme="dark" but we'll apply dark background classes 
        to ensure the specific dark visual identity is used here, similar to the differentiator section 
      */}
      <div className="absolute inset-0 bg-[#0B1020] -z-10" />
      <div className="max-w-[1200px] mx-auto px-6 relative">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 flex flex-col gap-6">
            
            {/* UI Mockup - Dark Mode */}
            <div className="relative w-full rounded-[32px] bg-[#0F2828] border border-[#2DD4BF]/20 p-6 md:p-8 overflow-hidden shadow-2xl group">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg0MHY0MEgwVjB6bTM5IDM5VjFoLTM4djM4aDM4eiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIwLjA1IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none" />
              <div className="absolute top-5 left-5 text-[11px] font-mono tracking-[0.2em] text-[#2DD4BF]/50 font-bold pointer-events-none select-none">MEMORY_GRAPH</div>
              
              <div className="relative z-10 bg-[#0B1020] rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.5)] border border-[#1A2445] flex flex-col overflow-hidden transition-transform duration-500 group-hover:-translate-y-1">
                
                <div className="px-5 py-3.5 border-b border-[#1A2445] bg-[#0B1020]/90 backdrop-blur-md flex items-center justify-between">
                  <span className="bg-[#2DD4BF]/10 text-[#2DD4BF] px-3 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase border border-[#2DD4BF]/30 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#2DD4BF] animate-pulse" /> Weekly Synthesis
                  </span>
                  <div className="flex gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1A2445]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1A2445]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1A2445]" />
                  </div>
                </div>

                <div className="p-6 bg-[#0B1020] flex flex-col gap-6">
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border border-[#1A2445] rounded-xl p-4 bg-[#0F2828]/50 shadow-inner">
                      <div className="text-[28px] font-bold text-[#ECFDF5] leading-none mb-1">4</div>
                      <div className="text-[12px] font-medium text-[#9AA3C4] uppercase tracking-wider">Meetings</div>
                    </div>
                    <div className="border border-[#1A2445] rounded-xl p-4 bg-[#0F2828]/50 shadow-inner">
                      <div className="text-[28px] font-bold text-[#ECFDF5] leading-none mb-1">2</div>
                      <div className="text-[12px] font-medium text-[#9AA3C4] uppercase tracking-wider">Voice Notes</div>
                    </div>
                    <div className="border border-[#1A2445] rounded-xl p-4 bg-[#0F2828]/50 shadow-inner">
                      <div className="text-[28px] font-bold text-[#ECFDF5] leading-none mb-1">1</div>
                      <div className="text-[12px] font-medium text-[#9AA3C4] uppercase tracking-wider">Lecture</div>
                    </div>
                    <div className="border border-[#FFB155]/20 rounded-xl p-4 bg-[#0F2828]/50 shadow-inner">
                      <div className="text-[28px] font-bold text-[#FFB155] leading-none mb-1">8</div>
                      <div className="text-[12px] font-medium text-[#FFB155] uppercase tracking-wider">Actions Generated</div>
                    </div>
                  </div>

                  <div className="border border-[#1A2445] rounded-xl p-5 bg-[#0F2828]/80 shadow-md relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-[#2DD4BF]" />
                    <div className="text-[10px] font-bold tracking-widest uppercase text-[#2DD4BF] mb-2">Connected Concept</div>
                    <div className="text-[14px] font-medium text-[#ECFDF5] mb-4">What did I say this week about pricing?</div>
                    <p className="text-[13px] leading-[1.6] text-[#9AA3C4]">
                      You discussed <span className="text-[#ECFDF5] font-bold border-b border-[#2DD4BF]/50 pb-0.5">pricing models</span> in <span className="text-[#2DD4BF]">1 meeting</span> with Sarah and <span className="text-[#2DD4BF]">1 personal voice note</span>. The main takeaway was to delay the pricing changes.
                    </p>
                  </div>

                </div>
              </div>
            </div>

          </div>

          <div className="order-1 lg:order-2 lg:pl-10">
            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-[64px] leading-none font-bold text-[#2DD4BF] tracking-tighter">05</span>
              <div className="h-[2px] flex-1 bg-gradient-to-r from-[#2DD4BF] to-transparent opacity-20"></div>
            </div>
            <h2 className="text-[clamp(36px,5vw,52px)] font-bold tracking-[-0.03em] text-[#ECFDF5] leading-[1.05] mb-6">
              Memory that grows with every conversation.
            </h2>
            <p className="text-[18px] text-[#9AA3C4] leading-[1.6]">
              Scripra Memory connects meetings, lectures, interviews, personal voice notes, projects, people, decisions, tasks, and recurring topics over time.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
