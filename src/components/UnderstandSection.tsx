"use client";

import { useState, useEffect } from 'react';

export default function UnderstandSection() {
  const [loopIndex, setLoopIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setLoopIndex((prev) => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const scenarios = [
    {
      type: "Team Sync",
      speakers: 3,
      transcript: [
        { time: "04:12", name: "Sarah", color: "text-indigo", text: "We need to lock in the architecture for the new caching layer. Right now, it's causing race conditions in production." },
        { time: "04:45", name: "Michael", color: "text-teal", text: "I think we should move to Redis for the session cache. It's stable, but the migration might take two weeks." },
        { time: "05:10", name: "Antony", color: "text-indigo-deep", active: true, text: "Yes. Let's officially decide to migrate to Redis. We'll delay the launch to ensure stability." }
      ],
      decision: "Migrate to Redis for session cache and delay launch by two weeks.",
      risk: "Migration might cause temporary downtime if not staged properly.",
      action: "Draft Redis migration plan.",
      owner: "Michael"
    },
    {
      type: "Voice Note",
      speakers: 1,
      transcript: [
        { time: "00:00", name: "You", color: "text-indigo", text: "Remember to send the proposal tomorrow morning to Acme Corp." },
        { time: "00:15", name: "You", color: "text-indigo", text: "Also, I need to compare AWS vs Azure pricing before the meeting. Azure seems cheaper for our database needs, but AWS has better tooling." },
        { time: "00:30", name: "You", color: "text-indigo-deep", active: true, text: "Wait, the main issue is actually just battery life for the edge devices. Let's focus the pitch on that." }
      ],
      decision: "Focus the pitch entirely on edge device battery life.",
      risk: "Azure pricing might have hidden data egress costs.",
      action: "Send proposal to Acme Corp.",
      owner: "You"
    },
    {
      type: "Lecture",
      speakers: 1,
      transcript: [
        { time: "12:05", name: "Professor", color: "text-teal", text: "Today we are discussing Gradient Descent. It's a first-order iterative optimization algorithm for finding a local minimum of a differentiable function." },
        { time: "12:20", name: "Professor", color: "text-teal", text: "The learning rate is crucial here. If it's too high, we might overshoot the minimum." },
        { time: "12:35", name: "Professor", color: "text-indigo-deep", active: true, text: "For your homework due Friday, implement stochastic gradient descent from scratch in Python." }
      ],
      decision: "Use a small learning rate to avoid overshooting.",
      risk: "High learning rate leads to divergent oscillations.",
      action: "Implement SGD in Python from scratch.",
      owner: "Student"
    }
  ];

  const current = scenarios[loopIndex];

  return (
    <section className="py-32 bg-raise border-t border-line">
      <div className="max-w-[1200px] mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-[64px] leading-none font-bold text-indigo tracking-tighter">02</span>
              <div className="h-[2px] flex-1 bg-gradient-to-r from-indigo to-transparent opacity-20"></div>
            </div>
            <h2 className="text-[clamp(36px,5vw,52px)] font-bold tracking-[-0.03em] text-ink leading-[1.05] mb-6">
              Ask in plain English.
            </h2>
            <p className="text-[18px] text-ink-2 leading-[1.6]">
              Scripra separates speakers and automatically extracts recaps, detailed summaries, decisions, risks, and open questions from your raw conversation. No complex querying needed.
            </p>
          </div>
        </div>

        {/* UI Mockup */}
        <div className="relative w-full rounded-[32px] bg-indigo/[0.03] border border-indigo/10 p-6 md:p-8 overflow-hidden shadow-sm group">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg0MHY0MEgwVjB6bTM5IDM5VjFoLTM4djM4aDM4eiIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIwLjA0IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none" />
          <div className="absolute top-5 left-5 text-[11px] font-mono tracking-[0.2em] text-teal/50 font-bold pointer-events-none select-none">UNDERSTANDING_ENGINE</div>
          
          <div className="relative z-10 bg-white rounded-2xl shadow-[0_12px_40px_rgb(0,0,0,0.08)] border border-line flex flex-col md:flex-row h-auto md:h-[600px] overflow-hidden transition-transform duration-500 group-hover:-translate-y-1">
            
            {/* Transcript side */}
            <div className="w-full md:w-1/2 border-b md:border-b-0 md:border-r border-line flex flex-col bg-white">
              <div className="sticky top-0 bg-white/90 backdrop-blur border-b border-line px-5 py-3.5 flex justify-between items-center z-10">
                <div className="flex items-center gap-3 transition-opacity duration-300" key={`title-${loopIndex}`}>
                  <span className="bg-indigo-wash text-indigo px-3 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase border border-indigo/20">{current.type}</span>
                </div>
                <span className="text-indigo/70 font-mono text-[12px] font-bold">{current.speakers} {current.speakers === 1 ? 'Speaker' : 'Speakers'}</span>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 relative">
                {current.transcript.map((line, idx) => (
                  <div key={`${loopIndex}-${idx}`} className={`grid grid-cols-[48px_1fr] gap-4 transition-all duration-500 animate-[fade-in-up_0.5s_ease-out_forwards] ${line.active ? 'bg-indigo/[0.02] border border-indigo/10 p-4 -mx-4 rounded-xl relative' : ''}`} style={{ animationDelay: `${idx * 150}ms`, opacity: 0 }}>
                    {line.active && <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo rounded-l-xl" />}
                    <div className="font-mono text-[12px] text-indigo/60 pt-0.5">{line.time}</div>
                    <div>
                      <div className={`text-[14px] font-bold ${line.color} mb-1`}>{line.name}</div>
                      <div className={`text-[14px] leading-relaxed ${line.active ? 'text-indigo-deep font-medium' : 'text-ink-2'}`}>{line.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Structured Output Side */}
            <div className="w-full md:w-1/2 bg-canvas flex flex-col relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-[0.02] pointer-events-none" />
              
              <div className="p-6 md:p-8 flex flex-col gap-5 relative z-10">
                <div className="text-[10px] font-bold tracking-[0.1em] uppercase text-indigo mb-2 border-b border-indigo/10 pb-3 flex items-center justify-between">
                  <span>Structured Output</span>
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo/30" />
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo/30" />
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo" />
                  </div>
                </div>

                <div key={`out-${loopIndex}`} className="flex flex-col gap-5">
                  {/* Decision Card */}
                  <div className="bg-white border border-indigo/10 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-indigo/30 transition-all duration-300 animate-[fade-in-up_0.5s_ease-out_forwards]" style={{ animationDelay: '400ms', opacity: 0 }}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 rounded-full bg-indigo animate-pulse" />
                      <span className="text-[11px] font-bold tracking-wider uppercase text-indigo">Decision</span>
                    </div>
                    <div className="text-[14.5px] font-medium text-indigo-deep leading-[1.5]">
                      {current.decision}
                    </div>
                  </div>

                  {/* Action Item Card */}
                  <div className="bg-white border border-amber/20 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-amber/40 transition-all duration-300 animate-[fade-in-up_0.5s_ease-out_forwards]" style={{ animationDelay: '550ms', opacity: 0 }}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[11px] font-bold tracking-wider uppercase text-amber-700">Action Item</span>
                    </div>
                    <div className="text-[14.5px] font-medium text-indigo-deep leading-[1.5] mb-4">
                      {current.action}
                    </div>
                    <div className="flex gap-2">
                      <span className="px-3 py-1.5 rounded-full bg-indigo-wash text-indigo text-[11px] font-bold flex items-center gap-1.5 border border-indigo/10">
                        {current.owner}
                      </span>
                    </div>
                  </div>

                  {/* Risk Card */}
                  <div className="bg-white border border-rose/20 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-rose/40 transition-all duration-300 animate-[fade-in-up_0.5s_ease-out_forwards]" style={{ animationDelay: '700ms', opacity: 0 }}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[11px] font-bold tracking-wider uppercase text-rose">Identified Risk</span>
                    </div>
                    <div className="text-[14.5px] font-medium text-indigo-deep leading-[1.5]">
                      {current.risk}
                    </div>
                  </div>
                </div>

              </div>
            </div>
            
          </div>

        </div>

      </div>
    </section>
  );
}
