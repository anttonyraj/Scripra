"use client";
import { useState, useEffect } from "react";

export default function ScripraThinkSection() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 3);
    }, 3500); // 3.5s per step
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-28 px-6 bg-canvas border-t border-line relative overflow-hidden">
      {/* Massive Aurora glow */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-indigo/10 blur-[140px] rounded-full pointer-events-none opacity-60" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-teal-500/5 blur-[160px] rounded-full pointer-events-none opacity-60" />

      <div className="max-w-[1080px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Side: Copy */}
        <div>
          <div className="text-[11px] font-bold tracking-wider text-indigo uppercase mb-6 flex items-center gap-3">
            <span className="text-[10px] font-bold tracking-[0.2em] text-indigo uppercase bg-indigo-wash border border-indigo/20 px-3 py-1 rounded-full">
              SCRIPRA THINK
            </span>
            <span className="bg-teal-wash text-teal-600 px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase border border-teal-500/20">VOICE TO ACTION</span>
          </div>
          <h2 className="text-[clamp(40px,6vw,64px)] font-bold tracking-[-0.03em] leading-[1.25] mb-8 text-[#2D2482]">
            <span className="bg-[#E5E5FC] px-3 py-1 inline-block -mx-3 mb-2">Speak an idea</span><br />
            <span className="bg-[#E5E5FC] px-3 py-1 inline-block -mx-3 mb-2">before you lose</span><br />
            <span className="bg-[#E5E5FC] px-3 py-1 inline-block -mx-3">it.</span>
          </h2>
          <p className="text-[18px] text-[#6A63E0] max-w-[480px] leading-relaxed mb-8">
            Scripra turns raw voice notes into structured thoughts, tasks, topics and searchable memory. Capture on the go, without typing a word.
          </p>

          <div className="flex flex-col gap-4 text-[14px] font-medium">
            <div className={`flex items-center gap-3 transition-colors duration-500 ${step === 0 ? 'text-[#4F46E5] font-bold' : 'text-[#818CF8]'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              <span>Capture: One-tap recording & transcripts</span>
            </div>
            <div className={`flex items-center gap-3 transition-colors duration-500 ${step === 1 ? 'text-[#4F46E5] font-bold' : 'text-[#818CF8]'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              <span>Understand: Automated tasks & key points</span>
            </div>
            <div className={`flex items-center gap-3 transition-colors duration-500 ${step === 2 ? 'text-[#4F46E5] font-bold' : 'text-[#818CF8]'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              <span>Recall: Ask Scripra to search your history</span>
            </div>
          </div>
        </div>

        {/* Right Side: High-Fidelity UI Mockup */}
        <div className="relative w-full rounded-[32px] bg-indigo/[0.03] border border-indigo/10 p-6 lg:p-8 overflow-hidden shadow-sm group">
          {/* Faint Background Grid */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg0MHY0MEgwVjB6bTM5IDM5VjFoLTM4djM4aDM4eiIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIwLjA0IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none opacity-50" />
          
          {/* Floating Blueprint Text */}
          <div className="absolute top-10 left-[-20px] text-[11px] font-mono tracking-[0.2em] text-[#4F46E5]/40 font-bold pointer-events-none select-none -rotate-90">_PARSING</div>
          <div className="absolute bottom-20 right-[-10px] text-[11px] font-mono tracking-[0.2em] text-[#4F46E5]/40 font-bold pointer-events-none select-none rotate-90">VOICE_REC</div>
          <div className="absolute top-20 right-5 text-[11px] font-mono tracking-[0.2em] text-[#4F46E5]/40 font-bold pointer-events-none select-none">EXT_MEMORY</div>
          
          {/* Main White Card */}
          <div className="relative z-10 bg-white rounded-2xl shadow-[0_12px_40px_rgb(0,0,0,0.08)] border border-line flex flex-col overflow-hidden transition-transform duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_20px_50px_rgb(0,0,0,0.12)]">
            
            {/* Top Bar */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-line bg-white backdrop-blur-md relative z-30">
              <div className="flex items-center gap-3">
                <span className="bg-[#E5E5FC] text-[#4F46E5] px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase border border-indigo/20">Voice Note</span>
                <span className="text-[#4F46E5]/80 font-medium text-[13px]">Idea Memo Â· 1m</span>
              </div>
              <div className={`px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase flex items-center gap-2 transition-colors duration-500 ${step === 2 ? 'bg-teal-50 text-teal-700 border border-teal-200' : 'bg-line/50 text-ink-3 border border-transparent'}`}>
                <span className={`w-2 h-2 rounded-full ${step === 2 ? 'bg-teal-500 animate-pulse' : 'bg-ink-3/50'}`} />
                Search & Recall
              </div>
            </div>

            {/* Split Content */}
            <div className="flex flex-col md:flex-row bg-white relative pb-28 md:pb-32">
              
              {/* SVG Overlay for desktop connections (Visible in Step 1) */}
              <div className={`absolute inset-0 w-full h-full pointer-events-none hidden md:block z-20 transition-opacity duration-500 ${step >= 1 ? 'opacity-100' : 'opacity-0'}`}>
                <svg viewBox="0 0 800 480" preserveAspectRatio="none" className="w-full h-full">
                  <defs>
                    <linearGradient id="flow-action" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgba(245,158,11,0)" />
                      <stop offset="50%" stopColor="rgba(245,158,11,0.5)" />
                      <stop offset="100%" stopColor="rgba(245,158,11,1)" />
                    </linearGradient>
                    <linearGradient id="flow-topic" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgba(79,70,229,0)" />
                      <stop offset="50%" stopColor="rgba(79,70,229,0.5)" />
                      <stop offset="100%" stopColor="rgba(79,70,229,1)" />
                    </linearGradient>
                  </defs>
                  
                  {/* Path 1: "follow up with John tomorrow" -> Action Item Card */}
                  <path d="M 360 80 C 400 80, 400 130, 430 130" fill="none" stroke="url(#flow-action)" strokeWidth="2" strokeDasharray="4 4" className="animate-[extract_10s_linear_infinite]" />
                  <circle cx="430" cy="130" r="3" fill="#F59E0B" />

                  {/* Path 2: "compare the two laptop options" -> Topic Card */}
                  <path d="M 360 120 C 400 120, 400 250, 430 250" fill="none" stroke="url(#flow-topic)" strokeWidth="2" strokeDasharray="4 4" className="animate-[extract_10s_linear_infinite]" />
                  <circle cx="430" cy="250" r="3" fill="#4F46E5" />
                </svg>
              </div>

              {/* Left Column: Transcript */}
              <div className="md:w-1/2 p-6 md:p-8 border-b md:border-b-0 md:border-r border-line bg-white relative z-10">
                <div className="flex gap-4">
                  <div className="bg-[#E5E5FC] text-[#4F46E5] px-2 py-0.5 rounded text-[11px] font-mono font-bold h-fit shrink-0">00:00</div>
                  <div>
                    <div className="font-bold text-[#4F46E5] text-[14px] mb-2">Me</div>
                    <div className="text-[#2D2482] text-[14.5px] leading-relaxed font-medium">
                      I need to <span className={`transition-colors duration-500 rounded px-1 ${step >= 1 ? 'bg-amber-100' : 'bg-transparent'}`}>follow up with John tomorrow</span>, <br/><br/>
                      <span className={`transition-colors duration-500 rounded px-1 ${step >= 1 ? 'bg-[#E5E5FC]' : 'bg-transparent'}`}>compare the two laptop options</span>, <br/><br/>
                      and remember that the main issue is battery life.
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Extracted */}
              <div className="md:w-1/2 p-6 md:p-8 relative z-10 bg-white">
                <div className={`text-[#4F46E5]/60 text-[11px] font-bold tracking-widest uppercase mb-6 flex items-center gap-3 transition-opacity duration-500 ${step >= 1 ? 'opacity-100' : 'opacity-0'}`}>
                  Scripra Extracted
                  <div className="flex-1 h-[1px] bg-line" />
                </div>
                
                <div className="flex flex-col gap-4">
                  {/* Action Item Card */}
                  <div className={`bg-[#FEF3C7] border border-[#FDE68A] rounded-xl p-5 shadow-sm transition-all duration-500 ${step >= 1 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                      <span className="text-[#D97706] text-[11px] font-bold tracking-widest uppercase">Action Item</span>
                    </div>
                    <p className="text-[#2D2482] text-[14px] leading-relaxed font-bold mb-4">Follow up with John.</p>
                    <div className="border-t border-[#FDE68A] pt-3">
                      <span className="text-[#D97706] text-[12px] font-bold">Tomorrow</span>
                    </div>
                  </div>

                  {/* Topic Card */}
                  <div className={`bg-white border border-line rounded-xl p-5 shadow-sm transition-all duration-500 delay-100 ${step >= 1 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-2 h-2 rounded-full bg-[#4F46E5]" />
                      <span className="text-[#4F46E5] text-[11px] font-bold tracking-widest uppercase">Topic</span>
                    </div>
                    <p className="text-[#2D2482] text-[14px] leading-relaxed font-bold">Laptop Options</p>
                  </div>
                </div>
              </div>
              
              {/* Floating Chat Overlay (Visible in Step 2) */}
              <div className={`absolute bottom-[20px] left-1/2 -translate-x-1/2 w-[92%] max-w-[420px] bg-white rounded-2xl shadow-[0_20px_50px_rgba(45,36,130,0.15)] border border-line p-2 z-30 transition-all duration-700 ease-out ${step === 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'}`}>
                
                {/* Input Area */}
                <div className="border border-line rounded-xl px-4 py-3 flex items-center justify-between mb-2">
                  <span className="text-[#2D2482] text-[13.5px] font-medium">What did I want to compare about laptops?</span>
                  <div className="w-7 h-7 rounded-full bg-[#4F46E5] flex items-center justify-center text-white shrink-0 shadow-sm">
                    <svg className="w-3.5 h-3.5 translate-x-[-1px] translate-y-[1px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                  </div>
                </div>

                {/* Response Area */}
                <div className="bg-[#FAFFFE] rounded-xl p-5 border border-line">
                  <p className="text-[#2D2482] text-[13.5px] leading-relaxed font-medium mb-5">
                    Battery life was the main concern when comparing the two laptop options.
                  </p>
                  
                  {/* Source Evidence Link */}
                  <div className="border border-line rounded-lg bg-white px-3 py-2 flex items-center justify-between hover:bg-[#F5F5FA] cursor-pointer transition-colors">
                    <span className="text-[#4F46E5] text-[12px] font-semibold">Source Evidence</span>
                    <span className="text-[#4F46E5]/60 text-[11px] font-mono flex items-center gap-1.5">
                      00:00 
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes extract {
          to {
            stroke-dashoffset: -100;
          }
        }
      `}} />
    </section>
  );
}
