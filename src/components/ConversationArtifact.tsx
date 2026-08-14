"use client";

import { useEffect, useState, useRef } from "react";

type AnimationState = "idle" | "capture" | "transcript" | "understand" | "act" | "recall" | "memory" | "complete";

export default function ConversationArtifact() {
  const [animState, setAnimState] = useState<AnimationState>("idle");
  const [typingProgress, setTypingProgress] = useState(0);
  const [visibleRows, setVisibleRows] = useState(0);
  const [recallStage, setRecallStage] = useState(0); // 0: hidden, 1: bar, 2: answer
  const [evidenceActive, setEvidenceActive] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0); // 0: Meeting, 1: Voice Note
  
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const textMeeting1 = "Okay — let's ship the August release Friday.\nMichael, can you finish regression testing by Thursday?\nI'll send the customer update.";
  const textMeeting2 = "One more thing, security approval is still outstanding.";
  
  const textVoiceNote1 = "I need to follow up with John tomorrow,\ncompare the two laptop options,\nand remember that the main issue is battery life.";
  const textVoiceNote2 = "";

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  const schedule = (delay: number, fn: () => void) => {
    const id = setTimeout(fn, delay);
    timeoutsRef.current.push(id);
  };

  const playLoop = (index: number) => {
    clearAllTimeouts();
    
    // Reset state
    setLoopIndex(index);
    setAnimState("idle");
    setTypingProgress(0);
    setVisibleRows(0);
    setRecallStage(0);
    setEvidenceActive(false);

    // 0-2s: Capture
    schedule(200, () => setAnimState("capture"));
    
    // 2-4s: Transcript (Waveform fades, transcribing starts)
    schedule(2000, () => setAnimState("transcript"));
    
    const typingDuration = 1800;
    const steps = 20;
    for (let i = 1; i <= steps; i++) {
      schedule(2200 + (typingDuration / steps) * i, () => {
        setTypingProgress((i / steps) * 100);
      });
    }

    // 4-6s: Understand
    schedule(4000, () => setAnimState("understand"));
    schedule(4300, () => setVisibleRows(1));
    schedule(4600, () => setVisibleRows(2));
    schedule(4900, () => setVisibleRows(3));
    
    // 6-8s: Act
    schedule(6000, () => setAnimState("act"));
    schedule(6200, () => setVisibleRows(4));
    schedule(6500, () => setVisibleRows(5));

    // 8-11s: Recall
    schedule(8000, () => {
      setAnimState("recall");
      setRecallStage(1); // Show search bar
    });
    schedule(9500, () => {
      setRecallStage(2); // Show answer & highlight
      setEvidenceActive(true);
    });

    // 11-13s: Memory
    if (index === 0) {
      schedule(11500, () => setAnimState("memory"));
    }

    // 13s+: Complete
    schedule(13500, () => {
      setAnimState("complete");
      if (index === 0) {
        // Automatically proceed to Voice Note loop after a short delay
        schedule(1000, () => playLoop(1));
      }
    });
  };

  useEffect(() => {
    playLoop(0);
    return clearAllTimeouts;
  }, []);

  const currentText1 = loopIndex === 0 ? textMeeting1 : textVoiceNote1;
  const currentText2 = loopIndex === 0 ? textMeeting2 : textVoiceNote2;
  const charsToShow1 = Math.floor((typingProgress / 100) * currentText1.length);
  const charsToShow2 = currentText2 ? Math.floor(Math.max(0, (typingProgress - 70) / 30) * currentText2.length) : 0;

  return (
    <div className="w-full max-w-[650px] bg-panel border border-line rounded-[16px] shadow-2xl overflow-hidden flex flex-col relative text-left mx-auto h-[480px]">
      
      {/* Source Selector Label (Animated) */}
      <div className={`absolute top-[-30px] left-1/2 -translate-x-1/2 bg-ink text-white px-4 py-1.5 rounded-t-lg text-[10px] font-bold tracking-widest uppercase transition-all duration-700 z-0 ${animState !== "idle" ? "opacity-100 translate-y-10" : "opacity-0"}`}>
        CAPTURE SOURCE: {loopIndex === 0 ? "Meeting" : "Voice note"}
      </div>

      {/* Top Bar */}
      <div className="h-12 border-b border-line bg-canvas flex items-center justify-between px-4 z-10 relative shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 mr-3">
            <div className="w-2.5 h-2.5 rounded-full bg-line" />
            <div className="w-2.5 h-2.5 rounded-full bg-line" />
            <div className="w-2.5 h-2.5 rounded-full bg-line" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-ink text-white px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
              {loopIndex === 0 ? "Meeting" : "Voice note"}
            </span>
            <span className="text-[12px] font-medium text-ink-3 font-mono">
              {loopIndex === 0 ? "Product review · 42 min" : "Idea capture · 1 min"}
            </span>
          </div>
        </div>
        <div className={`flex items-center gap-2 transition-opacity duration-300 ${(animState === "capture" || animState === "idle" || animState === "complete") ? "opacity-100" : "opacity-0"}`}>
          <div className={`w-2 h-2 rounded-full transition-all duration-300 ${animState === "capture" ? "bg-rose animate-pulse" : "bg-line"}`} />
          <span className="text-[11px] font-bold tracking-wider text-ink-2 uppercase">LIVE</span>
        </div>
      </div>

      <div className="flex flex-col flex-1 relative overflow-hidden">
        
        {/* Stage 1: Waveform (Capture) */}
        <div className={`absolute inset-0 bg-panel z-40 flex flex-col items-center justify-center transition-opacity duration-700 p-8 ${(animState === "capture" || animState === "idle") ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
          <div className="flex items-center justify-center h-32 w-full max-w-[300px] gap-1.5">
            {[...Array(24)].map((_, i) => (
              <div 
                key={i} 
                className="w-2 bg-indigo rounded-full transition-all duration-150 ease-out"
                style={{ 
                  height: animState === "capture" ? `${Math.max(10, Math.random() * 100)}%` : "4px",
                  opacity: animState === "capture" ? (0.4 + Math.random() * 0.6) : 0.2
                }}
              />
            ))}
          </div>
          <p className="text-[14px] text-indigo mt-8 font-medium animate-pulse">Capturing conversation...</p>
        </div>

        {/* Base Layer: Transcript & Understand/Act */}
        <div className="absolute inset-0 flex flex-col md:flex-row bg-panel z-10">
          
          {/* Left: Transcript */}
          <div className={`flex-1 p-6 border-r border-line bg-canvas overflow-y-auto flex flex-col gap-6 relative md:w-1/2 transition-opacity duration-500 ${(animState === "memory") ? "opacity-10" : "opacity-100"}`}>
            
            {loopIndex === 0 && (
              <div className="flex gap-4 opacity-50">
                <div className="w-10 text-[11px] text-ink-3 font-mono mt-1 shrink-0">11:58</div>
                <div>
                  <div className="text-[12px] font-bold text-indigo mb-1">Sarah</div>
                  <div className="text-[13px] text-ink-2 leading-relaxed">Let's review the status of the August release before we wrap up.</div>
                </div>
              </div>
            )}

            <div className="flex gap-4 relative">
              <div className="w-10 text-[11px] text-ink-3 font-mono mt-1 shrink-0">
                <span className={`px-1 -mx-1 rounded transition-colors duration-500 ${evidenceActive ? "bg-indigo-wash text-indigo font-bold" : ""}`}>
                  {loopIndex === 0 ? "12:04" : "00:00"}
                </span>
              </div>
              <div className="relative">
                <div className="text-[12px] font-bold text-indigo mb-1">{loopIndex === 0 ? "Antony" : "Me"}</div>
                <div className="text-[13px] text-ink leading-relaxed whitespace-pre-wrap">
                  <span className={`transition-colors duration-500 rounded px-1 -mx-1 ${evidenceActive ? "bg-indigo-wash/50" : ""}`}>
                    {currentText1.substring(0, charsToShow1)}
                  </span>
                  {animState === "transcript" && typingProgress < 70 && <span className="inline-block w-2 h-4 bg-indigo ml-1 animate-pulse align-middle" />}
                </div>
              </div>
            </div>

            {loopIndex === 0 && typingProgress > 70 && (
              <div className="flex gap-4">
                <div className="w-10 text-[11px] text-ink-3 font-mono mt-1 shrink-0">31:02</div>
                <div>
                  <div className="text-[12px] font-bold text-indigo mb-1">Michael</div>
                  <div className="text-[13px] text-ink leading-relaxed whitespace-pre-wrap">
                    {currentText2.substring(0, charsToShow2)}
                    {animState === "transcript" && typingProgress >= 70 && typingProgress < 100 && <span className="inline-block w-2 h-4 bg-indigo ml-1 animate-pulse align-middle" />}
                  </div>
                </div>
              </div>
            )}
            
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-canvas to-transparent pointer-events-none" />
          </div>

          {/* Right: Extraction Panel */}
          <div className={`flex-[1.2] p-5 bg-panel flex flex-col gap-4 overflow-y-auto relative md:w-1/2 transition-opacity duration-500 ${(animState === "memory") ? "opacity-10" : "opacity-100"}`}>
            <div className={`transition-opacity duration-500 ${(animState !== "idle" && animState !== "capture" && animState !== "transcript") ? "opacity-100" : "opacity-0"}`}>
              <div className="text-[10px] font-bold tracking-wider text-ink-3 mb-3 flex items-center gap-2">
                SCRIPRA EXTRACTED
                <div className="flex-1 h-px bg-line" />
              </div>
            </div>

            {loopIndex === 0 ? (
              <>
                {/* MEETING EXTRACTION */}
                <div className={`bg-card border border-line rounded-lg p-3 transition-all duration-500 transform ${visibleRows >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 hidden"}`}>
                  <span className="text-[9px] font-bold tracking-wider text-ink uppercase mb-1 block">Recap</span>
                  <p className="text-[12px] text-ink-2 leading-snug">Team agreed to ship the August release Friday, pending Michael's regression tests by Thursday. Security approval is the main blocker.</p>
                </div>

                <div className={`bg-card border border-indigo/20 rounded-lg p-3 transition-all duration-500 transform ${visibleRows >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 hidden"}`}>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo" />
                    <span className="text-[9px] font-bold tracking-wider text-indigo uppercase">Decision</span>
                  </div>
                  <p className="text-[12px] font-medium text-ink mb-2 leading-snug">Ship the August release Friday.</p>
                </div>

                <div className={`bg-card border border-rose/30 rounded-lg p-3 transition-all duration-500 transform ${visibleRows >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 hidden"}`}>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose" />
                    <span className="text-[9px] font-bold tracking-wider text-rose uppercase">Risk</span>
                  </div>
                  <p className="text-[12px] font-medium text-ink mb-2 leading-snug">Security approval still outstanding.</p>
                </div>

                <div className={`bg-amber-wash border border-amber/30 rounded-lg p-3 transition-all duration-500 transform ${visibleRows >= 4 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 hidden"}`}>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber" />
                    <span className="text-[9px] font-bold tracking-wider text-amber uppercase">Action Item</span>
                  </div>
                  <p className="text-[12px] font-medium text-ink mb-2 leading-snug">Finish regression testing.</p>
                  <div className="flex justify-between items-center mt-2 pt-2 border-t border-amber/20">
                    <span className="text-[10px] font-medium text-amber">Michael · Due Thu</span>
                  </div>
                </div>

                <div className={`bg-amber-wash border border-amber/30 rounded-lg p-3 transition-all duration-500 transform ${visibleRows >= 5 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 hidden"}`}>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber" />
                    <span className="text-[9px] font-bold tracking-wider text-amber uppercase">Commitment</span>
                  </div>
                  <p className="text-[12px] font-medium text-ink leading-snug">Send the customer update.</p>
                </div>
              </>
            ) : (
              <>
                {/* VOICE NOTE EXTRACTION */}
                <div className={`bg-amber-wash border border-amber/30 rounded-lg p-3 transition-all duration-500 transform ${visibleRows >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 hidden"}`}>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber" />
                    <span className="text-[9px] font-bold tracking-wider text-amber uppercase">Action Item</span>
                  </div>
                  <p className="text-[12px] font-medium text-ink mb-2 leading-snug">Follow up with John.</p>
                  <div className="flex justify-between items-center mt-2 pt-2 border-t border-amber/20">
                    <span className="text-[10px] font-medium text-amber">Tomorrow</span>
                  </div>
                </div>

                <div className={`bg-card border border-indigo/20 rounded-lg p-3 transition-all duration-500 transform ${visibleRows >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 hidden"}`}>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo" />
                    <span className="text-[9px] font-bold tracking-wider text-indigo uppercase">Topic</span>
                  </div>
                  <p className="text-[12px] font-medium text-ink leading-snug">Laptop comparison.</p>
                </div>

                <div className={`bg-card border border-line rounded-lg p-3 transition-all duration-500 transform ${visibleRows >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 hidden"}`}>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-ink" />
                    <span className="text-[9px] font-bold tracking-wider text-ink uppercase">Key Point</span>
                  </div>
                  <p className="text-[12px] font-medium text-ink leading-snug">Battery life is the main concern.</p>
                </div>
              </>
            )}

          </div>
        </div>

        {/* Stage 5: Recall Overlay */}
        <div className={`absolute bottom-0 left-0 right-0 p-6 z-20 flex justify-center transition-all duration-700 ${(animState === "recall" || animState === "complete" && recallStage > 0) ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-10 pointer-events-none"}`}>
          <div className="bg-canvas border border-line rounded-xl shadow-2xl p-4 w-full max-w-[400px]">
            {/* Search Bar */}
            <div className="relative mb-4">
              <div className="w-full bg-panel border border-line rounded-full py-2.5 pl-4 pr-10 text-[13px] text-ink flex items-center">
                {loopIndex === 0 ? "What did we decide about the release?" : "What did I want to compare about laptops?"}
              </div>
              <div className="absolute right-2 top-2 w-6 h-6 bg-indigo rounded-full text-white flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </div>
            </div>
            
            {/* Answer */}
            <div className={`transition-all duration-500 transform ${recallStage >= 2 ? "opacity-100 translate-y-0 h-auto" : "opacity-0 -translate-y-4 h-0 overflow-hidden"}`}>
              <div className="bg-panel border border-line p-4 rounded-xl">
                <p className="text-[12px] leading-[1.6] text-ink mb-3">
                  {loopIndex === 0 
                    ? "The team agreed to ship the August release on Friday, assuming Michael finishes regression testing by Thursday."
                    : "Battery life was the main concern when comparing the two laptop options."}
                </p>
                <div className="bg-indigo-wash/50 border border-indigo/20 p-2 rounded flex justify-between items-center cursor-pointer hover:border-indigo/40 transition-colors">
                  <span className="text-[11px] font-medium text-indigo">Source Evidence</span>
                  <span className="font-mono text-[10px] text-indigo bg-indigo/10 px-1.5 py-0.5 rounded">
                    {loopIndex === 0 ? "12:04 ↗" : "00:00 ↗"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stage 6: Memory Overlay (Only on meeting for now) */}
        {loopIndex === 0 && (
          <div className={`absolute inset-0 bg-[#0B1020] z-30 transition-all duration-1000 flex items-center justify-center p-6 ${animState === "memory" ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
            <div className="w-full max-w-[400px] bg-[#141C38] border border-[#1A2445] rounded-xl p-6 shadow-2xl">
              <div className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#7B7CFF] mb-4">
                Cross-Meeting Memory
              </div>
              
              <div className="flex flex-col gap-4 relative">
                <div className="absolute left-[5px] top-2 bottom-2 w-px bg-[#1A2445]" />
                
                <div className="relative pl-6">
                  <div className="absolute left-0 top-1 w-2.5 h-2.5 rounded-full bg-[#141C38] border-2 border-[#646E93]" />
                  <div className="text-[11px] font-semibold text-[#9AA3C4] mb-0.5">Aug 2</div>
                  <div className="text-[13px] text-[#EDEFFA]">Security review requested</div>
                </div>

                <div className="relative pl-6">
                  <div className="absolute left-0 top-1 w-2.5 h-2.5 rounded-full bg-[#141C38] border-2 border-[#FF6B7A]" />
                  <div className="text-[11px] font-semibold text-[#FF6B7A] mb-0.5">Aug 9</div>
                  <div className="text-[13px] text-[#EDEFFA]">Security blocker raised</div>
                </div>

                <div className="relative pl-6">
                  <div className="absolute left-0 top-1 w-2.5 h-2.5 rounded-full bg-[#7B7CFF]" />
                  <div className="text-[11px] font-semibold text-[#7B7CFF] mb-0.5">Aug 13 (This meeting)</div>
                  <div className="text-[13px] text-[#EDEFFA] font-medium">Security approval still outstanding</div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Stage Indicator Overlay (to help user understand what they are looking at) */}
      <div className="absolute top-[60px] left-1/2 -translate-x-1/2 bg-ink/90 backdrop-blur text-white px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase z-50 shadow-lg">
        {animState === "idle" && "Waiting"}
        {animState === "capture" && "1. Capture"}
        {animState === "transcript" && "2. Transcript"}
        {animState === "understand" && "3. Understand"}
        {animState === "act" && "4. Act"}
        {animState === "recall" && "5. Recall"}
        {animState === "memory" && "6. Memory"}
        {animState === "complete" && "Done"}
      </div>

      {/* Replay Buttons overlay when complete */}
      <div className={`absolute bottom-6 right-6 flex flex-col gap-2 transition-opacity duration-500 z-50 ${animState === "complete" ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <button 
          onClick={() => playLoop(0)}
          className={`flex items-center justify-end gap-2 px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors shadow-sm ${loopIndex === 0 ? "bg-indigo text-white" : "bg-card border border-line text-ink-2 hover:text-ink"}`}
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Replay Meeting
        </button>
        <button 
          onClick={() => playLoop(1)}
          className={`flex items-center justify-end gap-2 px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors shadow-sm ${loopIndex === 1 ? "bg-indigo text-white" : "bg-card border border-line text-ink-2 hover:text-ink"}`}
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Replay Voice Note
        </button>
      </div>

    </div>
  );
}
