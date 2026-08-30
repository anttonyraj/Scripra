"use client";
import { useState, useEffect } from "react";

export default function RecallSection() {
  const [stage, setStage] = useState(0); // 0: idle, 1: typing, 2: answering

  useEffect(() => {
    // Simple looping animation
    const timer = setInterval(() => {
      setStage(s => (s + 1) % 3);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-32 bg-raise border-t border-line">
      <div className="max-w-[1200px] mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-[64px] leading-none font-bold text-emerald-500 tracking-tighter">04</span>
              <div className="h-[2px] flex-1 bg-gradient-to-r from-emerald-500 to-transparent opacity-20"></div>
            </div>
            <h2 className="text-[clamp(36px,5vw,52px)] font-bold tracking-[-0.03em] text-ink leading-[1.05] mb-6">
              Ask your conversations.
            </h2>
            <p className="text-[18px] text-ink-2 leading-[1.6]">
              Never forget a detail again. Ask Scripra any question and instantly get the answer, directly linked to the exact moment it was discussed.
            </p>
          </div>
        </div>

        {/* UI Mockup */}
        <div className="relative w-full rounded-[32px] bg-emerald-[0.03] border border-emerald-500/10 p-6 md:p-8 overflow-hidden shadow-sm group min-h-[500px]">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg0MHY0MEgwVjB6bTM5IDM5VjFoLTM4djM4aDM4eiIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIwLjA0IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none" />
          <div className="absolute top-5 left-5 text-[11px] font-mono tracking-[0.2em] text-emerald-500/50 font-bold pointer-events-none select-none">QUERY_ENGINE</div>
          
          <div className="relative z-10 bg-white rounded-2xl shadow-[0_12px_40px_rgb(0,0,0,0.08)] border border-emerald-500/20 flex flex-col h-[500px] overflow-hidden transition-transform duration-500 group-hover:-translate-y-1">
            
            {/* Header */}
            <div className="px-5 py-3.5 border-b border-emerald-500/10 bg-white backdrop-blur-md flex items-center justify-between">
              <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase border border-emerald-500/20 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Ask Scripra
              </span>
            </div>

            <div className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto bg-emerald-[0.01]">
              
              {/* Suggested Queries */}
              <div className={`transition-opacity duration-500 ${stage > 0 ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
                <div className="text-[11px] font-bold tracking-wider uppercase text-emerald-600 mb-4">Suggested</div>
                <div className="flex flex-wrap gap-2">
                  <div className="px-4 py-2 rounded-lg border border-emerald-500/20 bg-white text-[13px] font-medium text-ink shadow-sm hover:border-emerald-500/40 transition-colors cursor-pointer">
                    What did we decide about pricing?
                  </div>
                  <div className="px-4 py-2 rounded-lg border border-emerald-500/20 bg-white text-[13px] font-medium text-ink shadow-sm hover:border-emerald-500/40 transition-colors cursor-pointer">
                    What did my professor say about gradient descent?
                  </div>
                  <div className="px-4 py-2 rounded-lg border border-emerald-500/20 bg-white text-[13px] font-medium text-ink shadow-sm hover:border-emerald-500/40 transition-colors cursor-pointer">
                    Find the idea I recorded about student pricing.
                  </div>
                  <div className="px-4 py-2 rounded-lg border-emerald-500/40 bg-emerald-50 text-emerald-700 font-bold text-[13px] shadow-sm relative border">
                    What blockers came up in Project Atlas?
                    {stage === 1 && (
                      <span className="absolute -bottom-6 left-4 text-[11px] text-emerald-600 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" />
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce delay-75" />
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce delay-150" />
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Answer State */}
              <div className={`transition-all duration-700 transform ${stage === 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 shrink-0 flex items-center justify-center text-white text-[12px] font-bold mt-1 shadow-sm">
                    S
                  </div>
                  <div className="flex flex-col gap-4 w-full">
                    <div className="bg-white border border-emerald-500/10 p-5 rounded-2xl rounded-tl-sm shadow-sm text-[14.5px] font-medium leading-[1.6] text-ink">
                      The team agreed to ship the August release on Friday, but delayed the pricing changes to avoid support confusion.
                    </div>
                    
                    <div className="bg-emerald-50/50 border border-emerald-500/20 p-4 rounded-xl flex items-center justify-between group hover:border-emerald-500/40 transition-colors cursor-pointer shadow-sm">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold tracking-[0.1em] uppercase text-emerald-600 mb-1 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Source Evidence
                        </span>
                        <span className="text-[13px] font-bold text-ink group-hover:text-emerald-700 transition-colors">Product Review — August Release</span>
                      </div>
                      <div className="font-mono text-[12px] text-emerald-700 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-500/10">
                        12:04
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Input Bar */}
            <div className="p-4 bg-white border-t border-emerald-500/10">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Ask a question..."
                  className="w-full bg-emerald-[0.02] border border-emerald-500/10 rounded-xl py-3.5 pl-5 pr-12 text-[14px] font-medium text-ink outline-none focus:border-emerald-500/40 transition-colors shadow-inner"
                  readOnly
                />
                <button className="absolute right-2 top-2 w-10 h-10 bg-emerald-500 rounded-lg text-white flex items-center justify-center shadow-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
