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
      <div className="max-w-[1080px] mx-auto px-6">
        
        <div className="text-center max-w-[700px] mx-auto mb-16">
          <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-indigo mb-4">
            04 — Recall
          </div>
          <h2 className="text-[clamp(36px,5vw,52px)] font-bold tracking-[-0.03em] text-ink leading-[1.05] mb-6">
            Ask your conversations.
          </h2>
          <p className="text-[18px] text-ink-2 leading-[1.6]">
            Never forget a detail again. Ask Scripra any question and instantly get the answer, directly linked to the exact moment it was discussed.
          </p>
        </div>

        <div className="max-w-[800px] mx-auto bg-panel border border-line rounded-[16px] shadow-2xl overflow-hidden flex flex-col h-[500px]">
          {/* Header */}
          <div className="h-14 border-b border-line bg-canvas flex items-center px-6 gap-3">
            <div className="w-6 h-6 rounded-full bg-indigo flex items-center justify-center text-white text-[10px] font-bold">
              S
            </div>
            <div className="text-[14px] font-bold text-ink">Ask Scripra</div>
          </div>

          <div className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto bg-canvas">
            
            {/* Suggested Queries */}
            <div className={`transition-opacity duration-500 ${stage > 0 ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
              <div className="text-[12px] font-semibold text-ink-3 mb-4">Suggested questions</div>
              <div className="flex flex-wrap gap-2">
                <div className="px-4 py-2 rounded-full border border-line bg-panel text-[13px] text-ink shadow-sm hover:border-indigo transition-colors cursor-pointer">
                  What did we decide about pricing?
                </div>
                <div className="px-4 py-2 rounded-full border border-line bg-panel text-[13px] text-ink shadow-sm hover:border-indigo transition-colors cursor-pointer">
                  What did my professor say about gradient descent?
                </div>
                <div className="px-4 py-2 rounded-full border border-line bg-panel text-[13px] text-ink shadow-sm hover:border-indigo transition-colors cursor-pointer">
                  What did I promise Sarah?
                </div>
                <div className="px-4 py-2 rounded-full border border-line bg-panel text-[13px] text-ink shadow-sm hover:border-indigo transition-colors cursor-pointer">
                  Find the idea I recorded about student pricing.
                </div>
                <div className="px-4 py-2 rounded-full border border-line bg-panel text-[13px] text-ink shadow-sm hover:border-indigo transition-colors cursor-pointer">
                  What did the customer say about SSO?
                </div>
                <div className="px-4 py-2 rounded-full border-indigo bg-indigo-wash text-indigo font-medium text-[13px] shadow-sm relative">
                  What blockers came up in Project Atlas?
                  {stage === 1 && (
                    <span className="absolute -bottom-6 left-4 text-[11px] text-indigo flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-indigo rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-indigo rounded-full animate-bounce delay-75" />
                      <span className="w-1.5 h-1.5 bg-indigo rounded-full animate-bounce delay-150" />
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Answer State */}
            <div className={`transition-all duration-700 transform ${stage === 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-indigo shrink-0 flex items-center justify-center text-white text-[12px] font-bold mt-1">
                  S
                </div>
                <div className="flex flex-col gap-4 w-full">
                  <div className="bg-panel border border-line p-5 rounded-2xl rounded-tl-sm shadow-sm text-[15px] leading-[1.6] text-ink">
                    The team agreed to ship the August release on Friday, but delayed the pricing changes to avoid support confusion.
                  </div>
                  
                  <div className="bg-raise border border-line p-4 rounded-xl flex items-center justify-between group hover:border-indigo transition-colors cursor-pointer">
                    <div className="flex flex-col">
                      <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-ink-3 mb-1">Source Evidence</span>
                      <span className="text-[13px] font-medium text-ink group-hover:text-indigo transition-colors">Product Review — August Release</span>
                    </div>
                    <div className="font-mono text-[12px] text-indigo bg-indigo-wash px-2.5 py-1 rounded-md">
                      12:04
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Input Bar */}
          <div className="p-4 bg-panel border-t border-line">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Ask a question..."
                className="w-full bg-canvas border border-line rounded-full py-3 pl-5 pr-12 text-[14px] outline-none focus:border-indigo transition-colors"
                readOnly
              />
              <button className="absolute right-2 top-2 w-8 h-8 bg-indigo rounded-full text-white flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
