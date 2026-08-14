"use client";
import { useEffect, useRef } from "react";

export default function BackgroundAnimation() {
  const spotlightRef1 = useRef<HTMLDivElement>(null);
  const spotlightRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let targetX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
    let targetY = typeof window !== 'undefined' ? window.innerHeight / 2 : 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      
      // Update immediately to avoid perceived lag on fast movements
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
        @keyframes sound-bar {
          0%, 100% { transform: scaleY(0.15); opacity: 0.2; }
          50% { transform: scaleY(1); opacity: 1; }
        }
        @keyframes data-flow {
          0% { stroke-dashoffset: 100; opacity: 0; }
          50% { opacity: 1; }
          100% { stroke-dashoffset: -100; opacity: 0; }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes type-text {
          0% { opacity: 0; transform: translateY(10px); }
          20% { opacity: 1; transform: translateY(0); }
          80% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-10px); }
        }
        .anim-sound { animation: sound-bar 3.5s ease-in-out infinite; transform-origin: bottom; }
        .anim-flow { animation: data-flow 5s linear infinite; }
        .anim-float { animation: float-slow 8s ease-in-out infinite; }
        .anim-type { animation: type-text 6s infinite; }
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

      {/* 3. Concept Animation: Sound -> Data Flow */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
        
        <div className="w-full max-w-[1280px] mx-auto px-6 h-full relative flex items-center justify-center anim-float z-10">
          
          {/* A. Sound Waves (Centered & Slower) */}
          <div className="flex items-end justify-center gap-2 lg:gap-3 h-48 absolute left-1/2 -translate-x-1/2 bottom-[5%] lg:bottom-[10%] opacity-80">
            {[...Array(24)].map((_, i) => (
              <div 
                key={i} 
                className="w-2 lg:w-3 bg-[var(--indigo)] rounded-t-full anim-sound shadow-[0_0_15px_rgba(91,92,240,0.6)]"
                style={{ 
                  animationDelay: `${i * 0.15}s`,
                  height: `${15 + Math.random() * 85}%`
                }}
              />
            ))}
          </div>

          {/* B. Flowing Data Curve (Radiating from Center outwards) */}
          <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.5 }}>
            {/* Left Flow */}
            <path 
              d="M 50% 85% C 35% 85%, 25% 45%, 5% 45%" 
              fill="none" 
              stroke="url(#flowGradientLeft)" 
              strokeWidth="2.5" 
              strokeDasharray="15 25"
              className="anim-flow"
            />
            {/* Right Flow */}
            <path 
              d="M 50% 85% C 65% 85%, 75% 45%, 95% 45%" 
              fill="none" 
              stroke="url(#flowGradientRight)" 
              strokeWidth="2.5" 
              strokeDasharray="15 25"
              className="anim-flow"
              style={{ animationDelay: '1.5s' }}
            />
            <defs>
              <linearGradient id="flowGradientLeft" x1="100%" y1="0%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="var(--indigo)" stopOpacity="0" />
                <stop offset="30%" stopColor="var(--indigo)" stopOpacity="0.8" />
                <stop offset="70%" stopColor="var(--teal)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="var(--teal)" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="flowGradientRight" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--indigo)" stopOpacity="0" />
                <stop offset="30%" stopColor="var(--indigo)" stopOpacity="0.8" />
                <stop offset="70%" stopColor="var(--rose)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="var(--rose)" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>

          {/* Floating conversion text points */}
          <div className="absolute top-[60%] left-[25%] font-mono text-[13px] tracking-[0.2em] text-[var(--teal)] font-bold anim-type drop-shadow-md" style={{ animationDelay: '0s' }}>
            AI_INTELLIGENCE
          </div>
          <div className="absolute top-[40%] left-[10%] font-mono text-[12px] tracking-[0.2em] text-[var(--teal)] font-bold anim-type drop-shadow-md" style={{ animationDelay: '2s' }}>
            MEMORY
          </div>
          <div className="absolute top-[60%] right-[25%] font-mono text-[12px] tracking-[0.2em] text-[var(--rose)] font-bold anim-type drop-shadow-md" style={{ animationDelay: '4s' }}>
            RECALL
          </div>
          <div className="absolute top-[40%] right-[10%] font-mono text-[13px] tracking-[0.2em] text-[var(--rose)] font-bold anim-type drop-shadow-md" style={{ animationDelay: '1s' }}>
            INSIGHTS
          </div>
          <div className="absolute bottom-[20%] right-[30%] font-mono text-[11px] tracking-[0.2em] text-[var(--indigo)] font-bold anim-type drop-shadow-md" style={{ animationDelay: '3s' }}>
            ACTION_ITEMS
          </div>
          
        </div>
      </div>
    </div>
  );
}
