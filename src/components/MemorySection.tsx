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
            
            <div className="bg-[#141C38] border border-[#1A2445] rounded-[16px] p-8 shadow-2xl relative overflow-hidden">
              {/* Subtle background decoration */}
              <div className="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] bg-[#7B7CFF]/10 blur-[100px] rounded-full pointer-events-none" />
              
              <div className="text-[12px] font-bold tracking-[0.15em] uppercase text-[#7B7CFF] mb-6 flex items-center justify-between">
                <span>Memory Overview</span>
                <span className="text-[9px] border border-[#7B7CFF]/30 bg-[#7B7CFF]/10 px-2 py-0.5 rounded tracking-widest text-[#7B7CFF]">PREVIEW</span>
              </div>
              
              <div className="text-[14px] text-[#9AA3C4] mb-6 border-b border-[#1A2445] pb-4">
                This week you captured:
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8 relative z-10">
                <div className="flex flex-col gap-1">
                  <span className="text-[28px] font-bold text-[#EDEFFA] leading-none">4</span>
                  <span className="text-[13px] font-medium text-[#9AA3C4]">Meetings</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[28px] font-bold text-[#EDEFFA] leading-none">2</span>
                  <span className="text-[13px] font-medium text-[#9AA3C4]">Voice notes</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[28px] font-bold text-[#EDEFFA] leading-none">1</span>
                  <span className="text-[13px] font-medium text-[#9AA3C4]">Lecture</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[28px] font-bold text-[#EDEFFA] leading-none">8</span>
                  <span className="text-[13px] font-medium text-[#FFB155]">Actions</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#1A2445] relative z-10">
                <div className="bg-[#0B1020] border border-[#1A2445] rounded-xl p-4">
                  <div className="text-[11px] font-bold tracking-wider uppercase text-[#7B7CFF] mb-2">
                    Ask Scripra
                  </div>
                  <div className="text-[14px] font-medium text-[#EDEFFA] mb-4">
                    What did I say this week about pricing?
                  </div>
                  <div className="text-[13px] leading-[1.6] text-[#9AA3C4]">
                    You discussed <span className="text-[#EDEFFA] font-medium border-b border-[#7B7CFF]/30 pb-0.5">pricing models</span> in 1 meeting with Sarah and 1 personal voice note.
                  </div>
                </div>
              </div>

            </div>

          </div>

          <div className="order-1 lg:order-2">
            <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#7B7CFF] mb-4">
              05 — Memory
            </div>
            <h2 className="text-[clamp(36px,5vw,52px)] font-bold tracking-[-0.03em] text-[#EDEFFA] leading-[1.05] mb-6">
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
