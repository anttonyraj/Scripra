"use client";

import { useState, useEffect } from "react";

export default function CaptureSection() {
  const [recordingStage, setRecordingStage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRecordingStage((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-32 bg-canvas">
      <div className="max-w-[1200px] mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="order-2 lg:order-1 flex flex-col gap-6">
            {/* Capture UI Mockup */}
            <div className="relative w-full rounded-[32px] bg-teal-[0.03] border border-teal/10 p-6 md:p-8 overflow-hidden shadow-sm group min-h-[400px]">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg0MHY0MEgwVjB6bTM5IDM5VjFoLTM4djM4aDM4eiIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIwLjA0IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none" />
              <div className="absolute top-5 left-5 text-[11px] font-mono tracking-[0.2em] text-teal/50 font-bold pointer-events-none select-none">AUDIO_INPUT</div>
              
              <div className="relative z-10 bg-white rounded-2xl shadow-[0_12px_40px_rgb(0,0,0,0.08)] border border-teal/20 flex flex-col overflow-hidden transition-transform duration-500 group-hover:-translate-y-1 mt-6">
                <div className="px-5 py-3.5 border-b border-teal/10 bg-white backdrop-blur-md flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    {recordingStage === 0 && (
                      <span className="bg-line-hi text-ink px-3 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase border border-line flex items-center gap-2 transition-all">
                        <span className="w-2 h-2 rounded-full bg-ink" /> Idle
                      </span>
                    )}
                    {recordingStage === 1 && (
                      <span className="bg-rose-wash text-rose-500 px-3 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase border border-rose/20 flex items-center gap-2 transition-all">
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" /> Recording
                      </span>
                    )}
                    {recordingStage === 2 && (
                      <span className="bg-teal-wash text-teal px-3 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase border border-teal/20 flex items-center gap-2 transition-all">
                        <span className="w-2 h-2 rounded-full bg-teal" /> Saved
                      </span>
                    )}
                  </div>
                  <span className="text-teal/70 font-mono text-[12px] font-bold">
                    {recordingStage === 1 ? '14:02:44' : '00:00:00'}
                  </span>
                </div>
                
                <div className="p-6 bg-white flex flex-col gap-6 relative">
                  {/* Absolute positioning for the "Processing" overlay */}
                  {recordingStage === 2 && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-20 flex items-center justify-center animate-[fade-in_0.3s_ease-out_forwards]">
                       <div className="bg-teal text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg flex items-center gap-2">
                         <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                         Processing Audio...
                       </div>
                    </div>
                  )}

                  {/* Waveform Visualization */}
                  <div className={`flex gap-1.5 items-end justify-center h-20 border border-teal/10 rounded-xl p-4 transition-colors duration-500 ${recordingStage === 1 ? 'bg-teal-[0.02]' : 'bg-canvas'}`}>
                    {[...Array(32)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-1.5 rounded-full transition-all duration-300 ${recordingStage === 1 ? 'bg-teal animate-pulse' : 'bg-line-hi'}`} 
                        style={{ 
                          height: recordingStage === 1 ? `${Math.max(20, Math.random() * 100)}%` : '20%', 
                          animationDelay: `${i * 0.05}s` 
                        }} 
                      />
                    ))}
                  </div>
                  
                  {/* Live Transcript Snippet */}
                  <div className="h-12 flex items-center justify-center text-center">
                    {recordingStage === 0 && <span className="text-ink-3 text-sm italic">Ready to capture...</span>}
                    {recordingStage === 1 && <span className="text-teal-deep text-sm font-medium animate-[fade-in-up_0.5s_ease-out_forwards]">"We should completely redesign the landing page by Friday..."</span>}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 lg:pl-10">
            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-[64px] leading-none font-bold text-teal tracking-tighter">01</span>
              <div className="h-[2px] flex-1 bg-gradient-to-r from-teal to-transparent opacity-20"></div>
            </div>
            <h2 className="text-[clamp(36px,5vw,52px)] font-bold tracking-[-0.03em] text-ink leading-[1.05] mb-6">
              Connect your audio sources.
            </h2>
            <p className="text-[18px] text-ink-2 leading-[1.6]">
              Point Scripra at your browser, a microphone, or upload an existing recording. The engine automatically transcribes the audio with perfect speaker diarization in real-time. No manual data entry required.
            </p>
          </div>
          
        </div>

      </div>
    </section>
  );
}
