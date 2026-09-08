"use client";

import { useEffect, useRef, useState } from "react";

export default function BackgroundAnimation() {
  const spotlightRef1 = useRef<HTMLDivElement>(null);
  const spotlightRef2 = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  const getPseudoRandom = (seed: number) => {
    const x = Math.sin(seed + 1) * 10000;
    return x - Math.floor(x);
  };

  useEffect(() => {
    setIsMounted(true);

    let targetX = typeof window !== "undefined" ? window.innerWidth / 2 : 0;
    let targetY = typeof window !== "undefined" ? window.innerHeight / 2 : 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (spotlightRef1.current) {
        spotlightRef1.current.style.background = `radial-gradient(800px circle at ${targetX}px ${targetY}px, rgba(67, 83, 255, 0.15), transparent 45%)`;
      }
      if (spotlightRef2.current) {
        spotlightRef2.current.style.background = `radial-gradient(400px circle at ${targetX}px ${targetY}px, rgba(0, 210, 180, 0.10), transparent 45%)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const streamItems = [
    { text: "AI_INTELLIGENCE", top: "18%", delay: "0.5s", duration: "18s", color: "var(--teal)" },
    { text: "VOICE_RECOGNITION", top: "36%", delay: "2.5s", duration: "20s", color: "var(--indigo)" },
    { text: "DATA_PARSING", top: "56%", delay: "5s", duration: "22s", color: "var(--indigo)" },
    { text: "CONTEXT_MEMORY", top: "28%", delay: "1.5s", duration: "19s", color: "var(--indigo)" },
    { text: "ACTION_ITEMS", top: "72%", delay: "3.5s", duration: "18s", color: "var(--amber)" },
    { text: "SEMANTIC_SEARCH", top: "12%", delay: "1s", duration: "21s", color: "var(--teal)" },
    { text: "DECISION_GRAPH", top: "46%", delay: "4s", duration: "20s", color: "var(--indigo)" },
    { text: "CROSS_MEETING_MEMORY", top: "82%", delay: "6s", duration: "19s", color: "var(--indigo)" },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-canvas selection-transparent">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes sound-bar-horizontal {
          0%, 100% { transform: scaleX(0.35); opacity: 0.4; }
          50% { transform: scaleX(1); opacity: 1; }
        }
        @keyframes data-flow {
          0% { stroke-dashoffset: 100; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { stroke-dashoffset: -100; opacity: 0; }
        }
        @keyframes flow-stream {
          0% { transform: translateX(0); opacity: 0; }
          6% { opacity: 0.85; }
          90% { opacity: 0.85; }
          100% { transform: translateX(92vw); opacity: 0; }
        }
      `,
        }}
      />

      {/* Mouse Spotlights */}
      <div ref={spotlightRef1} className="absolute inset-0 z-[1] transition-opacity duration-500 opacity-100 mix-blend-normal" />
      <div ref={spotlightRef2} className="absolute inset-0 z-[1] transition-opacity duration-500 opacity-100 mix-blend-screen" />

      {/* 1. Base Structure Grid */}
      <div
        className="absolute inset-0 opacity-[0.06] dark:opacity-[0.10] z-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* 2. Soft Ambient Color Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[var(--indigo)] blur-[140px] rounded-full opacity-[0.10] z-0" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[var(--teal)] blur-[140px] rounded-full opacity-[0.08] z-0" />

      {/* Render dynamic elements only after mount */}
      {isMounted && (
        <>
          {/* 3. Left-Side Soundbars (Audio Input Stream) */}
          <div className="absolute left-0 inset-y-0 h-full w-14 lg:w-20 flex flex-col justify-around py-4 opacity-90 z-20">
            {[...Array(50)].map((_, i) => (
              <div
                key={`left-bar-${i}`}
                className="relative h-1.5 lg:h-2 bg-indigo-500/15 dark:bg-white/10 rounded-r-full overflow-hidden"
                style={{
                  width: `${(40 + getPseudoRandom(i) * 60).toFixed(2)}%`,
                  opacity: Math.max(0.3, 1 - Math.abs(25 - i) / 30),
                }}
              >
                <div
                  className="absolute left-0 top-0 bottom-0 rounded-r-full bg-[var(--indigo)] shadow-[0_0_10px_rgba(67,83,255,0.7)]"
                  style={{
                    width: "100%",
                    animation: `sound-bar-horizontal ${(3 + getPseudoRandom(i + 10) * 3).toFixed(2)}s ease-in-out infinite alternate`,
                    animationDelay: `${(getPseudoRandom(i) * 2).toFixed(2)}s`,
                    transformOrigin: "left",
                  }}
                />
              </div>
            ))}
          </div>

          {/* 4. Converging Flow Lines (The wave) */}
          <svg className="absolute inset-0 w-full h-full opacity-40 z-10">
            {[...Array(10)].map((_, i) => {
              const startY = (12 + i * 8.5).toFixed(1);
              return (
                <path
                  key={i}
                  d={`M 5% ${startY}% C 40% ${startY}%, 70% 50%, 95% 50%`}
                  fill="none"
                  stroke={`url(#stream-grad-${i})`}
                  strokeWidth={getPseudoRandom(i + 100) > 0.5 ? "1.5" : "1"}
                  strokeDasharray="15 25"
                  style={{
                    animation: `data-flow ${(9 + getPseudoRandom(i + 200) * 6).toFixed(2)}s linear infinite`,
                    animationDelay: `${(getPseudoRandom(i + 300) * 4).toFixed(2)}s`,
                  }}
                />
              );
            })}
            <defs>
              {[...Array(10)].map((_, i) => (
                <linearGradient key={i} id={`stream-grad-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--indigo)" stopOpacity="0" />
                  <stop offset="50%" stopColor="var(--indigo)" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="var(--teal)" stopOpacity="0" />
                </linearGradient>
              ))}
            </defs>
          </svg>

          {/* 5. Flowing Semantic Text Streams (Left to Right) */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            {streamItems.map((item, i) => (
              <div
                key={`stream-text-${i}`}
                className="absolute left-[2%] flex items-center gap-2.5 whitespace-nowrap opacity-0"
                style={{
                  top: item.top,
                  animation: `flow-stream ${item.duration} linear infinite both`,
                  animationDelay: item.delay,
                }}
              >
                {/* Glowing Leading Dot Particle */}
                <span
                  className="relative flex h-2 w-2 shrink-0 rounded-full"
                  style={{
                    backgroundColor: item.color,
                    boxShadow: `0 0 10px ${item.color}`,
                  }}
                >
                  <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                    style={{ backgroundColor: item.color }}
                  />
                </span>

                {/* Integrated Semantic Text Label */}
                <span
                  className="font-mono text-[11px] lg:text-[12.5px] tracking-[0.2em] font-semibold drop-shadow-sm select-none"
                  style={{ color: item.color }}
                >
                  {item.text}
                </span>
              </div>
            ))}

            {/* Ambient Drifting Particles */}
            {[...Array(12)].map((_, i) => {
              const colors = ["var(--indigo)", "var(--teal)", "var(--amber)"];
              const color = colors[i % colors.length];
              return (
                <div
                  key={`dot-${i}`}
                  className="absolute left-[6%] rounded-full opacity-0"
                  style={{
                    top: `${(10 + getPseudoRandom(i + 700) * 80).toFixed(2)}%`,
                    width: "3px",
                    height: "3px",
                    backgroundColor: color,
                    boxShadow: `0 0 6px ${color}`,
                    animation: `flow-stream ${(18 + getPseudoRandom(i + 800) * 16).toFixed(2)}s linear infinite both`,
                    animationDelay: `${(getPseudoRandom(i + 900) * 20).toFixed(2)}s`,
                  }}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
