"use client";
import { useEffect, useRef, useState } from "react";

export default function BackgroundAnimation() {
  const spotlightRef1 = useRef<HTMLDivElement>(null);
  const spotlightRef2 = useRef<HTMLDivElement>(null);
  
  // To avoid hydration mismatch with random values, we can only render the random bits after mount,
  // or use deterministic pseudo-random values. Let's use deterministic values based on index.
  
  const getPseudoRandom = (seed: number) => {
    const x = Math.sin(seed + 1) * 10000;
    return x - Math.floor(x);
  };

  useEffect(() => {
    let targetX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
    let targetY = typeof window !== 'undefined' ? window.innerHeight / 2 : 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      
      if (spotlightRef1.current) {
        spotlightRef1.current.style.background = `radial-gradient(800px circle at ${targetX}px ${targetY}px, rgba(91, 92, 240, 0.3), transparent 40%)`;
      }
      if (spotlightRef2.current) {
        spotlightRef2.current.style.background = `radial-gradient(400px circle at ${targetX}px ${targetY}px, rgba(18, 164, 124, 0.2), transparent 40%)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-canvas selection-transparent">
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes data-flow {
          0% { stroke-dashoffset: 100; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { stroke-dashoffset: -100; opacity: 0; }
        }
        @keyframes flow-right {
          0% { transform: translateX(0); opacity: 0; }
          10% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateX(95vw); opacity: 0; }
        }
        @keyframes pulse-core {
          0%, 100% { transform: scale(1); box-shadow: 0 0 30px rgba(91,92,240,0.5), inset 0 0 20px rgba(18,164,124,0.3); }
          50% { transform: scale(1.1); box-shadow: 0 0 60px rgba(91,92,240,0.8), inset 0 0 40px rgba(18,164,124,0.6); }
        }
        @keyframes rotate-core {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .anim-flow-right { animation: flow-right 12s linear infinite; }
      `}} />

      {/* Interactive Mouse Spotlights */}
      <div ref={spotlightRef1} className="absolute inset-0 z-[1] transition-opacity duration-500 opacity-100 mix-blend-normal" />
      <div ref={spotlightRef2} className="absolute inset-0 z-[1] transition-opacity duration-500 opacity-100 mix-blend-screen" />

      {/* 1. Subtle Animated Grid */}
      <div 
        className="absolute inset-0 opacity-[0.08] z-0"
        style={{
          backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      
      {/* 2. Floating Ambient Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[var(--indigo)] blur-[120px] rounded-full animate-blob mix-blend-normal opacity-[0.15] z-0" />
      <div className="absolute top-[20%] right-[-10%] w-[50%] h-[70%] bg-[var(--rose)] blur-[120px] rounded-full animate-blob [animation-delay:2s] mix-blend-normal opacity-[0.1] z-0" />
      <div className="absolute bottom-[-20%] left-[20%] w-[70%] h-[60%] bg-[var(--teal)] blur-[120px] rounded-full animate-blob [animation-delay:4s] mix-blend-normal opacity-[0.12] z-0" />

      {/* 3. Concept Animation: Sound -> Data Flow -> AI Capture */}
      <div className="absolute inset-0 z-10 flex items-center justify-between pointer-events-none overflow-hidden w-full">
        
        {/* A. Sonic Wave (Vertical Left Edge) */}
        <div className="absolute left-[-2%] lg:left-[-1%] top-0 bottom-0 w-24 lg:w-32 flex items-center opacity-90 z-20">
          <svg className="w-full h-[110%] -mt-[5%] drop-shadow-[0_0_15px_rgba(91,92,240,0.5)]" preserveAspectRatio="none" viewBox="0 0 100 1000">
            {/* Background glowing thick wave */}
            <path fill="none" stroke="var(--indigo)" strokeWidth="8" strokeOpacity="0.25" d="M 50 0 C 150 333, -50 666, 50 1000">
              <animate attributeName="d" dur="8s" repeatCount="indefinite" values="M 50 0 C 150 333, -50 666, 50 1000; M 50 0 C -50 333, 150 666, 50 1000; M 50 0 C 150 333, -50 666, 50 1000" />
            </path>
            {/* Medium wave teal */}
            <path fill="none" stroke="var(--teal)" strokeWidth="3" strokeOpacity="0.8" d="M 50 0 C -30 333, 130 666, 50 1000">
              <animate attributeName="d" dur="5s" repeatCount="indefinite" values="M 50 0 C -30 333, 130 666, 50 1000; M 50 0 C 130 333, -30 666, 50 1000; M 50 0 C -30 333, 130 666, 50 1000" />
            </path>
            {/* Bright thin core wave */}
            <path fill="none" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.9" d="M 50 0 C 100 333, 0 666, 50 1000">
              <animate attributeName="d" dur="4s" repeatCount="indefinite" values="M 50 0 C 100 333, 0 666, 50 1000; M 50 0 C 0 333, 100 666, 50 1000; M 50 0 C 100 333, 0 666, 50 1000" />
            </path>
            {/* Fast high frequency wave rose */}
            <path fill="none" stroke="var(--rose)" strokeWidth="2" strokeOpacity="0.7" d="M 50 0 C 120 166, -20 333, 50 500 C 120 666, -20 833, 50 1000">
              <animate attributeName="d" dur="3s" repeatCount="indefinite" values="M 50 0 C 120 166, -20 333, 50 500 C 120 666, -20 833, 50 1000; M 50 0 C -20 166, 120 333, 50 500 C -20 666, 120 833, 50 1000; M 50 0 C 120 166, -20 333, 50 500 C 120 666, -20 833, 50 1000" />
            </path>
          </svg>
        </div>

        {/* B. Flowing Data Lines converging to Right Center */}
        <svg className="absolute inset-0 w-full h-full opacity-60 z-10">
          {[...Array(12)].map((_, i) => {
            const startY = 10 + i * 7.5; // Spread vertically on the left
            return (
              <path 
                key={i}
                d={`M 5% ${startY}% C 40% ${startY}%, 70% 50%, 95% 50%`} 
                fill="none" 
                stroke={`url(#gradient-${i})`} 
                strokeWidth={getPseudoRandom(i + 100) > 0.5 ? "2" : "1"} 
                strokeDasharray="15 25"
                style={{ animation: `data-flow ${6 + getPseudoRandom(i + 200) * 4}s linear infinite`, animationDelay: `${getPseudoRandom(i + 300) * 2}s` }}
              />
            )
          })}
          <defs>
            {[...Array(12)].map((_, i) => (
              <linearGradient key={i} id={`gradient-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--indigo)" stopOpacity="0" />
                <stop offset="50%" stopColor="var(--indigo)" stopOpacity="0.8" />
                <stop offset="80%" stopColor="var(--teal)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="var(--teal)" stopOpacity="0" />
              </linearGradient>
            ))}
          </defs>
        </svg>

        {/* C. Flowing Text & Particles */}
        <div className="absolute inset-0 z-20">
          {/* Flowing Text */}
          {[
            { text: "AI_INTELLIGENCE", top: "25%", delay: "0s", duration: "16s", color: "var(--teal)" },
            { text: "VOICE_RECOGNITION", top: "45%", delay: "4s", duration: "14s", color: "var(--indigo)" },
            { text: "DATA_PARSING", top: "65%", delay: "2s", duration: "18s", color: "var(--rose)" },
            { text: "CONTEXT_MEMORY", top: "35%", delay: "8s", duration: "15s", color: "var(--indigo)" },
            { text: "ACTION_ITEMS", top: "75%", delay: "6s", duration: "17s", color: "var(--teal)" },
            { text: "PROCESSING_STREAM...", top: "55%", delay: "10s", duration: "13s", color: "var(--rose)" },
            { text: "SEMANTIC_SEARCH", top: "15%", delay: "12s", duration: "19s", color: "var(--teal)" },
            { text: "SYNTHESIS", top: "85%", delay: "7s", duration: "16s", color: "var(--indigo)" },
          ].map((item, i) => (
            <div 
              key={i} 
              className="absolute left-[8%] font-mono text-[11px] lg:text-[13px] tracking-[0.2em] font-bold drop-shadow-md whitespace-nowrap" 
              style={{ 
                top: item.top, 
                animation: `flow-right ${item.duration} linear infinite`, 
                animationDelay: item.delay,
                color: item.color
              }}
            >
              {item.text}
            </div>
          ))}

          {/* Flowing Particles */}
          {[...Array(30)].map((_, i) => {
            const colors = ['var(--rose)', 'var(--teal)', 'var(--indigo)'];
            const color = colors[i % colors.length];
            return (
              <div 
                key={`particle-${i}`}
                className="absolute w-1 h-1 rounded-full opacity-60"
                style={{
                  left: '5%',
                  top: `${10 + getPseudoRandom(i + 400) * 80}%`,
                  backgroundColor: color,
                  boxShadow: `0 0 10px ${color}`,
                  animation: `flow-right ${8 + getPseudoRandom(i + 500) * 10}s linear infinite`,
                  animationDelay: `${getPseudoRandom(i + 600) * 15}s`
                }}
              />
            );
          })}
        </div>

        {/* D. AI Capture Node (Extreme Right Edge) */}
        <div className="absolute right-[-20px] lg:right-[-40px] top-1/2 -translate-y-1/2 flex items-center justify-center z-30 opacity-90">
          <div className="relative flex items-center justify-center w-24 h-24 lg:w-32 lg:h-32">
            {/* Outer Rings */}
            <div className="absolute inset-0 rounded-full border border-[var(--teal)] opacity-30 border-dashed" style={{ animation: 'rotate-core 15s linear infinite' }}></div>
            <div className="absolute inset-[-10px] rounded-full border-2 border-[var(--indigo)] opacity-20 border-dotted" style={{ animation: 'rotate-core 20s linear reverse infinite' }}></div>
            
            {/* Core Pulsing Brain/Node */}
            <div 
              className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-tr from-[var(--indigo)] to-[var(--teal)] flex items-center justify-center relative overflow-hidden shadow-[0_0_20px_rgba(91,92,240,0.6)]" 
              style={{ animation: 'pulse-core 3s ease-in-out infinite' }}
            >
              <div className="absolute inset-0 bg-black/20 mix-blend-overlay"></div>
              <span className="font-mono text-lg lg:text-xl text-white font-bold tracking-widest z-10 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">AI</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

