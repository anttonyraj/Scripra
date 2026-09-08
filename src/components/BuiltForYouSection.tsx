"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function BuiltForYouSection() {
  const [indState, setIndState] = useState(0);
  const [teamState, setTeamState] = useState(0);

  // Cycle states every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndState((prev) => (prev + 1) % 3);
      setTeamState((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-32 px-6 bg-[#F8F9FB] border-t border-line overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-24 flex flex-col items-center">
          <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-indigo mb-6 bg-indigo-wash border border-indigo/20 px-3 py-1 rounded-full w-max">
            BUILT FOR
          </div>
          <h2 className="text-[clamp(40px,6vw,64px)] font-bold tracking-[-0.03em] leading-[1.25] mb-8 text-[#2D2482]">
            <span className="bg-[#E5E5FC] px-3 py-1 inline-block -mx-3 mb-2">Scripra fits the</span><br />
            <span className="bg-[#E5E5FC] px-3 py-1 inline-block -mx-3">conversation.</span>
          </h2>
          <p className="text-[18px] text-[#6A63E0] max-w-[600px] mx-auto">
            Scripra works for personal memory, learning, meetings and team collaboration — without changing your workflow.
          </p>
        </div>

        <div className="flex flex-col gap-16">
          
          {/* Individual Segment - Full Width Split */}
          <div className="bg-panel border border-line rounded-[32px] overflow-hidden shadow-sm hover:shadow-[0_20px_60px_-15px_rgba(91,92,240,0.15)] transition-shadow duration-500 flex flex-col lg:flex-row">
            
            {/* Text Side */}
            <div className="lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center">
              <div className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo/[0.04] border border-indigo/10 w-max">
                <span className="w-2 h-2 rounded-full bg-indigo" />
                <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-indigo">Private & Secure</span>
              </div>
              <h3 className="text-[40px] leading-none font-bold tracking-[-0.03em] text-ink mb-6">
                For individuals
              </h3>
              <p className="text-[18px] text-ink-2 leading-relaxed mb-10">
                Remember everything worth keeping. Turn meetings, lectures, and voice notes into an organized, searchable personal memory.
              </p>
              
              <div className="flex flex-col gap-4 mb-12 text-[15px] font-medium">
                <div className={`flex items-center gap-3 transition-opacity duration-300 ${indState === 0 ? 'text-indigo font-bold' : 'text-ink-3'}`}>
                  <svg className={`w-5 h-5 ${indState === 0 ? 'text-indigo' : 'text-ink-4'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Capture: One-tap recording & transcripts
                </div>
                <div className={`flex items-center gap-3 transition-opacity duration-300 ${indState === 1 ? 'text-indigo font-bold' : 'text-ink-3'}`}>
                  <svg className={`w-5 h-5 ${indState === 1 ? 'text-indigo' : 'text-ink-4'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Understand: Automated tasks & key points
                </div>
                <div className={`flex items-center gap-3 transition-opacity duration-300 ${indState === 2 ? 'text-indigo font-bold' : 'text-ink-3'}`}>
                  <svg className={`w-5 h-5 ${indState === 2 ? 'text-indigo' : 'text-ink-4'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Recall: Ask Scripra to search your history
                </div>
              </div>

              <Link href="/signup" className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-ink text-white text-[15px] font-bold hover:bg-ink-2 transition-colors w-max shadow-sm">
                Start for free
              </Link>
            </div>

            {/* SVG Flow Side */}
            <div className="lg:w-1/2 bg-white border-t lg:border-t-0 lg:border-l border-line p-10 flex items-center justify-center relative overflow-hidden min-h-[400px]">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(91,92,240,0.05)_0%,transparent_70%)] pointer-events-none" />
              
              <div className="relative z-10 w-full max-w-[440px] aspect-square flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full overflow-visible z-0" viewBox="0 0 400 400">
                  <defs>
                    <linearGradient id="flow-grad-ind" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgba(91,92,240,0.2)" />
                      <stop offset="100%" stopColor="rgba(91,92,240,1)" />
                    </linearGradient>
                  </defs>
                  {/* Fixed Flow Lines - Shortened to stop at node edge */}
                  <path d="M 100 200 L 200 200" fill="none" stroke="url(#flow-grad-ind)" strokeWidth="2" strokeDasharray="6 6" className="animate-[dash_20s_linear_infinite]" />
                  <path d="M 200 200 C 240 200, 240 140, 275 140" fill="none" stroke="url(#flow-grad-ind)" strokeWidth="2" strokeDasharray="6 6" className="animate-[dash_20s_linear_infinite]" />
                  <path d="M 200 200 C 240 200, 240 260, 275 260" fill="none" stroke="url(#flow-grad-ind)" strokeWidth="2" strokeDasharray="6 6" className="animate-[dash_20s_linear_infinite]" />
                </svg>

                {/* Central Scripra Node (Always present) */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="w-16 h-16 bg-indigo rounded-2xl shadow-[0_0_30px_rgba(91,92,240,0.3)] flex items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-white/20 blur-xl scale-150 rotate-45 transition-transform duration-3000" />
                    <svg className="w-8 h-8 text-white relative z-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>
                  </div>
                </div>

                {/* State 0: Capture */}
                <div className={`absolute inset-0 transition-opacity duration-500 ${indState === 0 ? 'opacity-100 z-20' : 'opacity-0 z-0'}`}>
                  {/* Input */}
                  <div className="absolute left-[5%] top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
                    <div className="bg-white border border-line rounded-xl px-4 py-3 shadow-sm flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-[12px] font-bold text-ink">Voice Audio</span>
                    </div>
                  </div>
                  {/* Outputs */}
                  <div className="absolute right-[5%] top-[35%] -translate-y-1/2 flex flex-col gap-2 z-10">
                    <div className="bg-white border border-line rounded-xl px-4 py-3 shadow-sm">
                      <span className="text-[12px] font-medium text-ink-2">&quot;Send proposal tomorrow...&quot;</span>
                    </div>
                  </div>
                  <div className="absolute right-[5%] top-[65%] -translate-y-1/2 flex flex-col gap-2 z-10">
                    <div className="bg-white border border-line rounded-xl px-4 py-3 shadow-sm">
                      <span className="text-[12px] font-medium text-ink-2">&quot;Compare AWS vs Azure...&quot;</span>
                    </div>
                  </div>
                </div>

                {/* State 1: Understand */}
                <div className={`absolute inset-0 transition-opacity duration-500 ${indState === 1 ? 'opacity-100 z-20' : 'opacity-0 z-0'}`}>
                  {/* Input */}
                  <div className="absolute left-[5%] top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
                    <div className="bg-white border border-line rounded-xl px-4 py-3 shadow-sm flex items-center gap-3">
                      <span className="text-[12px] font-bold text-ink-2 line-clamp-1 w-[100px]">Full Transcript</span>
                    </div>
                  </div>
                  {/* Outputs */}
                  <div className="absolute right-[5%] top-[35%] -translate-y-1/2 flex flex-col gap-2 z-10">
                    <div className="bg-white border border-indigo/20 rounded-xl px-4 py-3 shadow-sm flex flex-col gap-1 w-36">
                      <span className="text-[10px] font-bold text-indigo uppercase tracking-wider">Task</span>
                      <span className="text-[12px] font-bold text-ink">Send proposal</span>
                    </div>
                  </div>
                  <div className="absolute right-[5%] top-[65%] -translate-y-1/2 flex flex-col gap-2 z-10">
                    <div className="bg-white border border-teal-500/20 rounded-xl px-4 py-3 shadow-sm flex flex-col gap-1 w-36">
                      <span className="text-[10px] font-bold text-teal-600 uppercase tracking-wider">Topic</span>
                      <span className="text-[12px] font-bold text-ink">Cloud Pricing</span>
                    </div>
                  </div>
                </div>

                {/* State 2: Recall */}
                <div className={`absolute inset-0 transition-opacity duration-500 ${indState === 2 ? 'opacity-100 z-20' : 'opacity-0 z-0'}`}>
                  {/* Input */}
                  <div className="absolute left-[5%] top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
                    <div className="bg-white border border-indigo/30 rounded-full px-4 py-3 shadow-sm flex items-center gap-2">
                      <svg className="w-4 h-4 text-indigo" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                      <span className="text-[12px] font-medium text-ink italic w-[80px]">&quot;pricing&quot;</span>
                    </div>
                  </div>
                  {/* Outputs */}
                  <div className="absolute right-[5%] top-[35%] -translate-y-1/2 flex flex-col gap-2 z-10">
                    <div className="bg-indigo text-white border border-indigo rounded-xl px-4 py-3 shadow-sm flex flex-col gap-1 w-36">
                      <span className="text-[10px] font-bold text-white/70 uppercase tracking-wider">Found Match</span>
                      <span className="text-[12px] font-bold text-white">Compare AWS/Azure</span>
                    </div>
                  </div>
                  <div className="absolute right-[5%] top-[65%] -translate-y-1/2 flex flex-col gap-2 z-10">
                    <div className="bg-white border border-line rounded-xl px-4 py-3 shadow-sm flex flex-col gap-1 w-36 opacity-50">
                      <span className="text-[10px] font-bold text-ink-3 uppercase tracking-wider">Other Note</span>
                      <span className="text-[12px] font-medium text-ink-2">UI Design Review</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Teams Segment - Full Width Split */}
          <div className="bg-panel border border-line rounded-[32px] overflow-hidden shadow-sm hover:shadow-[0_20px_60px_-15px_rgba(45,212,191,0.15)] transition-shadow duration-500 flex flex-col lg:flex-row-reverse">
            
            {/* Text Side */}
            <div className="lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center">
              <div className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal/[0.04] border border-teal/10 w-max">
                <span className="w-2 h-2 rounded-full bg-teal-500" />
                <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-teal-600">Workspace & SSO</span>
              </div>
              <h3 className="text-[40px] leading-none font-bold tracking-[-0.03em] text-ink mb-6">
                For teams
              </h3>
              <p className="text-[18px] text-ink-2 leading-relaxed mb-10">
                Multiply your team&apos;s intelligence. Build a shared knowledge base where everyone stays aligned with extracted tasks and project memory.
              </p>

              <div className="flex flex-col gap-4 mb-12 text-[15px] font-medium">
                <div className={`flex items-center gap-3 transition-opacity duration-300 ${teamState === 0 ? 'text-teal-600 font-bold' : 'text-ink-3'}`}>
                  <svg className={`w-5 h-5 ${teamState === 0 ? 'text-teal-500' : 'text-ink-4'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Capture: Shared meeting notes & recaps
                </div>
                <div className={`flex items-center gap-3 transition-opacity duration-300 ${teamState === 1 ? 'text-teal-600 font-bold' : 'text-ink-3'}`}>
                  <svg className={`w-5 h-5 ${teamState === 1 ? 'text-teal-500' : 'text-ink-4'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Understand: Track decisions globally
                </div>
                <div className={`flex items-center gap-3 transition-opacity duration-300 ${teamState === 2 ? 'text-teal-600 font-bold' : 'text-ink-3'}`}>
                  <svg className={`w-5 h-5 ${teamState === 2 ? 'text-teal-500' : 'text-ink-4'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  Act: Integrations with Slack & Jira
                </div>
              </div>

              <Link href="/pricing" className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-white border border-line text-ink text-[15px] font-bold hover:border-teal-500 transition-colors w-max shadow-sm">
                Explore Team plans
              </Link>
            </div>

            {/* SVG Flow Side */}
            <div className="lg:w-1/2 bg-white border-t lg:border-t-0 lg:border-r border-line p-10 flex items-center justify-center relative overflow-hidden min-h-[400px]">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(45,212,191,0.05)_0%,transparent_70%)] pointer-events-none" />
              
              <div className="relative z-10 w-full max-w-[440px] aspect-square flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full overflow-visible z-0" viewBox="0 0 400 400">
                  <defs>
                    <linearGradient id="flow-grad-team" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgba(45,212,191,0.2)" />
                      <stop offset="100%" stopColor="rgba(45,212,191,1)" />
                    </linearGradient>
                  </defs>
                  {/* Fixed Flow Lines - Shortened */}
                  <path d="M 100 200 L 200 200" fill="none" stroke="url(#flow-grad-team)" strokeWidth="2" strokeDasharray="6 6" className="animate-[dash_20s_linear_infinite]" />
                  <path d="M 200 200 C 240 200, 240 140, 275 140" fill="none" stroke="url(#flow-grad-team)" strokeWidth="2" strokeDasharray="6 6" className="animate-[dash_20s_linear_infinite]" />
                  <path d="M 200 200 C 240 200, 240 260, 275 260" fill="none" stroke="url(#flow-grad-team)" strokeWidth="2" strokeDasharray="6 6" className="animate-[dash_20s_linear_infinite]" />
                </svg>

                {/* Central Shared Brain Node (Always present) */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="w-16 h-16 bg-teal-500 rounded-2xl shadow-[0_0_30px_rgba(45,212,191,0.3)] flex flex-col items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-white/20 blur-xl scale-150 rotate-45 transition-transform duration-3000" />
                    <svg className="w-8 h-8 text-white relative z-10 mb-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>
                    <span className="text-[8px] font-bold text-white uppercase tracking-widest relative z-10">Shared</span>
                  </div>
                </div>

                {/* State 0: Capture */}
                <div className={`absolute inset-0 transition-opacity duration-500 ${teamState === 0 ? 'opacity-100 z-20' : 'opacity-0 z-0'}`}>
                  {/* Input */}
                  <div className="absolute left-[5%] top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
                    <div className="flex -space-x-2 bg-white border border-line rounded-xl px-3 py-2 shadow-sm">
                      <div className="w-6 h-6 rounded-full border-2 border-white bg-indigo-500" />
                      <div className="w-6 h-6 rounded-full border-2 border-white bg-amber-500" />
                      <div className="w-6 h-6 rounded-full border-2 border-white bg-teal-500" />
                    </div>
                  </div>
                  {/* Outputs */}
                  <div className="absolute right-[5%] top-[35%] -translate-y-1/2 flex flex-col gap-2 z-10">
                    <div className="bg-white border border-line rounded-xl px-4 py-3 shadow-sm w-36">
                      <span className="text-[12px] font-bold text-ink">Shared Recaps</span>
                    </div>
                  </div>
                  <div className="absolute right-[5%] top-[65%] -translate-y-1/2 flex flex-col gap-2 z-10">
                    <div className="bg-white border border-line rounded-xl px-4 py-3 shadow-sm w-36">
                      <span className="text-[12px] font-bold text-ink">Speaker Analytics</span>
                    </div>
                  </div>
                </div>

                {/* State 1: Understand */}
                <div className={`absolute inset-0 transition-opacity duration-500 ${teamState === 1 ? 'opacity-100 z-20' : 'opacity-0 z-0'}`}>
                  {/* Input */}
                  <div className="absolute left-[5%] top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
                    <div className="bg-white border border-line rounded-xl px-4 py-3 shadow-sm">
                      <span className="text-[12px] font-bold text-ink-2">Meeting Transcript</span>
                    </div>
                  </div>
                  {/* Outputs */}
                  <div className="absolute right-[5%] top-[35%] -translate-y-1/2 flex flex-col gap-2 z-10">
                    <div className="bg-white border border-teal-500/20 rounded-xl px-4 py-3 shadow-sm flex flex-col gap-1 w-36">
                      <span className="text-[10px] font-bold text-teal-600 uppercase tracking-wider">Decision</span>
                      <span className="text-[12px] font-bold text-ink">Launch Product</span>
                    </div>
                  </div>
                  <div className="absolute right-[5%] top-[65%] -translate-y-1/2 flex flex-col gap-2 z-10">
                    <div className="bg-white border border-indigo/20 rounded-xl px-4 py-3 shadow-sm flex flex-col gap-1 w-36">
                      <span className="text-[10px] font-bold text-indigo uppercase tracking-wider">Risk</span>
                      <span className="text-[12px] font-bold text-ink">Security Approval</span>
                    </div>
                  </div>
                </div>

                {/* State 2: Act */}
                <div className={`absolute inset-0 transition-opacity duration-500 ${teamState === 2 ? 'opacity-100 z-20' : 'opacity-0 z-0'}`}>
                  {/* Input */}
                  <div className="absolute left-[5%] top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
                    <div className="bg-white border border-line rounded-xl px-4 py-3 shadow-sm flex flex-col gap-1 w-[120px]">
                      <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">Action</span>
                      <span className="text-[12px] font-bold text-ink">Update Clients</span>
                    </div>
                  </div>
                  {/* Outputs */}
                  <div className="absolute right-[5%] top-[35%] -translate-y-1/2 flex flex-col gap-2 z-10">
                    <div className="bg-[#4A154B] text-white border border-[#4A154B]/20 rounded-xl px-4 py-3 shadow-sm flex items-center gap-2 w-36">
                      <span className="w-2 h-2 rounded-full bg-white/50" />
                      <span className="text-[12px] font-bold">Post to Slack</span>
                    </div>
                  </div>
                  <div className="absolute right-[5%] top-[65%] -translate-y-1/2 flex flex-col gap-2 z-10">
                    <div className="bg-[#0052CC] text-white border border-[#0052CC]/20 rounded-xl px-4 py-3 shadow-sm flex items-center gap-2 w-36">
                      <span className="w-2 h-2 rounded-full bg-white/50" />
                      <span className="text-[12px] font-bold">Create Jira Task</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes dash {
          to {
            stroke-dashoffset: -1000;
          }
        }
      `}} />
    </section>
  );
}
