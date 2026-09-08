"use client";

import { useState, useEffect } from "react";

export default function ActionsSection() {
  const [loopIndex, setLoopIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setLoopIndex((prev) => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const scenarios = [
    {
      title: "Team Sync",
      actions: [
        { title: "Draft the Redis migration plan and timeline for engineering review.", owner: "Michael", initial: "M", deadline: "Due Thursday", time: "05:30" },
        { title: "Send the customer update informing them of the two-week delay.", owner: "Sarah", initial: "S", deadline: "Due Friday", time: "05:10" }
      ]
    },
    {
      title: "Voice Note",
      actions: [
        { title: "Send proposal to Acme Corp.", owner: "You", initial: "Y", deadline: "Tomorrow Morning", time: "00:00" },
        { title: "Compare AWS vs Azure pricing structure.", owner: "You", initial: "Y", deadline: "Before Meeting", time: "00:15" }
      ]
    },
    {
      title: "Lecture",
      actions: [
        { title: "Implement stochastic gradient descent from scratch in Python.", owner: "Student", initial: "S", deadline: "Due Friday", time: "12:35" }
      ]
    }
  ];

  const current = scenarios[loopIndex];

  return (
    <section className="py-32 bg-canvas">
      <div className="max-w-[1200px] mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-[64px] leading-none font-bold text-amber tracking-tighter">03</span>
              <div className="h-[2px] flex-1 bg-gradient-to-r from-amber to-transparent opacity-20"></div>
            </div>
            <h2 className="text-[clamp(36px,5vw,52px)] font-bold tracking-[-0.03em] text-ink leading-[1.05] mb-6">
              Turn conversation into action.
            </h2>
            <p className="text-[18px] text-ink-2 leading-[1.6]">
              Scripra identifies what needs to get done, who is responsible, and when it’s due — without anyone having to type a single note.
            </p>
          </div>

          <div className="order-1 lg:order-2 flex flex-col gap-6">
            
            {/* Actions UI Mockup */}
            <div className="relative w-full rounded-[32px] bg-indigo/[0.03] border border-indigo/10 p-6 md:p-8 overflow-hidden shadow-sm group min-h-[450px]">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg0MHY0MEgwVjB6bTM5IDM5VjFoLTM4djM4aDM4eiIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIwLjA0IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none" />
              <div className="absolute top-5 left-5 text-[11px] font-mono tracking-[0.2em] text-amber/50 font-bold pointer-events-none select-none">ACTION_ROUTING</div>
              
              <div className="relative z-10 bg-white rounded-2xl shadow-[0_12px_40px_rgb(0,0,0,0.08)] border border-line flex flex-col overflow-hidden transition-transform duration-500 group-hover:-translate-y-1">
                
                <div className="px-5 py-3.5 border-b border-line bg-white backdrop-blur-md flex justify-between items-center">
                  <span className="bg-amber-wash text-amber-600 px-3 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase border border-amber/20 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" /> Extracted Tasks
                  </span>
                  <div className="flex items-center gap-3 transition-opacity duration-300" key={`title-${loopIndex}`}>
                    <span className="bg-indigo/[0.02] text-indigo px-3 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase border border-indigo/10">{current.title}</span>
                  </div>
                </div>
                
                <div className="p-6 bg-white flex flex-col gap-5 bg-indigo/[0.01]">
                  {current.actions.map((action, idx) => (
                    <div key={`${loopIndex}-${idx}`} className="border border-amber/20 rounded-xl p-5 bg-white shadow-sm hover:border-amber/40 transition-colors relative overflow-hidden animate-[fade-in-up_0.5s_ease-out_forwards]" style={{ animationDelay: `${idx * 200}ms`, opacity: 0 }}>
                      <div className="absolute top-0 left-0 w-1 h-full bg-amber-500" />
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-amber-600 text-[11px] font-bold tracking-widest uppercase">Action Item</span>
                      </div>
                      <div className="text-[14.5px] font-semibold text-indigo-deep leading-[1.5] mb-4">
                        {action.title}
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-3 mt-1">
                        <div className="flex gap-3">
                          <div className="px-3 py-1.5 rounded-full bg-indigo-wash text-indigo text-[11px] font-bold flex items-center gap-2 border border-indigo/10">
                            <div className="w-4 h-4 rounded-full bg-indigo text-white flex items-center justify-center text-[9px]">{action.initial}</div>
                            {action.owner}
                          </div>
                          <div className="px-3 py-1.5 rounded-full bg-amber-wash text-amber-700 text-[11px] font-bold flex items-center gap-2 border border-amber/20">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                              <line x1="16" y1="2" x2="16" y2="6"/>
                              <line x1="8" y1="2" x2="8" y2="6"/>
                              <line x1="3" y1="10" x2="21" y2="10"/>
                            </svg>
                            {action.deadline}
                          </div>
                        </div>
                        <div className="font-mono text-[11px] text-indigo/60">
                          {action.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
