"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function CaptureVisualSection() {
  const [mode, setMode] = useState<"bot" | "botfree">("bot");
  const [activePlatform, setActivePlatform] = useState(0);

  const [viewTab, setViewTab] = useState<"simulator" | "architecture">("simulator");

  const platforms = [
    { name: "Microsoft Teams", short: "Teams", color: "#5059C9", badge: "Live Bot" },
    { name: "Cisco Webex", short: "Webex", color: "#00BC70", badge: "Live Bot" },
    { name: "Zoom Meetings", short: "Zoom", color: "#0B5CFF", badge: "Live Bot" },
    { name: "Google Meet", short: "Google Meet", color: "#00AC47", badge: "Live Bot" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActivePlatform((prev) => (prev + 1) % platforms.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [platforms.length]);

  return (
    <section id="capture" className="py-24 sm:py-32 px-6 bg-canvas border-t border-line/60 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-indigo-wash/60 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-teal-wash/60 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-[1320px] mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-[760px] mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-wash text-teal text-[11px] font-bold tracking-[0.15em] uppercase border border-teal/25 mb-4">
            <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
            Stage 01 · Universal Capture
          </div>
          <h2 className="text-[clamp(32px,4.5vw,52px)] font-black tracking-[-0.03em] text-ink leading-[1.1] mb-5">
            Never miss a detail. <br className="hidden sm:inline" />
            <span className="text-indigo">Bot or 100% Bot-Free.</span>
          </h2>
          <p className="text-[16px] sm:text-[18px] text-ink-3 leading-relaxed">
            Scripra auto-joins your calendar meetings across Teams, Webex, Zoom, and Meet—or records directly from your browser with zero bots visible on the call.
          </p>
        </div>

        {/* 2-Column Visual Feature Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12 lg:gap-16 items-center">
          
          {/* Left Feature Description Cards */}
          <div className="flex flex-col gap-6">
            
            {/* Mode Switcher */}
            <div className="p-1.5 bg-raise border border-line rounded-2xl flex items-center gap-1.5 w-max">
              <button
                onClick={() => setMode("bot")}
                className={`px-4 py-2 rounded-xl text-[13px] font-bold transition-all flex items-center gap-2 ${
                  mode === "bot"
                    ? "bg-card text-ink shadow-sm border border-line/80"
                    : "text-ink-3 hover:text-ink"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${mode === "bot" ? "bg-indigo" : "bg-ink-3"}`} />
                Calendar Auto-Join Bot
              </button>
              <button
                onClick={() => setMode("botfree")}
                className={`px-4 py-2 rounded-xl text-[13px] font-bold transition-all flex items-center gap-2 ${
                  mode === "botfree"
                    ? "bg-card text-ink shadow-sm border border-line/80"
                    : "text-ink-3 hover:text-ink"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${mode === "botfree" ? "bg-teal" : "bg-ink-3"}`} />
                Bot-Free Native Capture
              </button>
            </div>

            {/* Feature 1 */}
            <div className="p-6 rounded-2xl bg-card border border-line/80 shadow-xs hover:border-indigo/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-indigo-wash text-indigo flex items-center justify-center font-bold text-lg mb-4">
                ⚡
              </div>
              <h3 className="text-[18px] font-bold text-ink mb-2">
                {mode === "bot" ? "Seamless Calendar Auto-Join" : "100% Invisible Audio Stream"}
              </h3>
              <p className="text-[14.5px] text-ink-3 leading-relaxed">
                {mode === "bot"
                  ? "Connect Google Calendar or Outlook. Scripra dispatches a verified silent bot 30 seconds before start time on Teams, Webex, Zoom, and Meet."
                  : "Need discretion with executive clients? Record internal system audio and mic directly from your browser with zero participants notified."}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-2xl bg-card border border-line/80 shadow-xs hover:border-teal/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-teal-wash text-teal flex items-center justify-center font-bold text-lg mb-4">
                🎙️
              </div>
              <h3 className="text-[18px] font-bold text-ink mb-2">
                Real-Time Neural Diarization
              </h3>
              <p className="text-[14.5px] text-ink-3 leading-relaxed">
                Separates speakers instantly with sub-second latency. Removes echo, keystrokes, and HVAC background noise for 99.4% speech accuracy.
              </p>
            </div>

            {/* CTA Link */}
            <div>
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 text-[14px] font-bold text-indigo hover:text-indigo-deep transition-colors"
              >
                <span>Experience live transcription demo</span>
                <span>→</span>
              </Link>
            </div>

          </div>

          {/* Right: Rich Interactive SVG Simulator Artifact */}
          <div className="w-full bg-card border border-line rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(67,83,255,0.08)] relative overflow-hidden">
            
            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-line/70">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-teal animate-pulse shadow-[0_0_8px_#00D2B4]" />
                <span className="text-[13px] font-mono font-bold text-ink">
                  {mode === "bot"
                    ? `${platforms[activePlatform].name} · Active Session`
                    : "Bot-Free Capture · Local Audio Device"}
                </span>
              </div>
              
              {/* View Switcher: Simulator vs 3D Neural HUD */}
              <div className="flex items-center gap-1 p-1 bg-raise border border-line rounded-lg">
                <button
                  onClick={() => setViewTab("simulator")}
                  className={`px-2.5 py-1 rounded text-[11px] font-bold font-mono transition-all ${
                    viewTab === "simulator"
                      ? "bg-card text-ink shadow-xs"
                      : "text-ink-3 hover:text-ink"
                  }`}
                >
                  ⚡ Waveform
                </button>
                <button
                  onClick={() => setViewTab("architecture")}
                  className={`px-2.5 py-1 rounded text-[11px] font-bold font-mono transition-all ${
                    viewTab === "architecture"
                      ? "bg-indigo text-white shadow-xs"
                      : "text-ink-3 hover:text-ink"
                  }`}
                >
                  ✨ 3D Neural HUD
                </button>
              </div>
            </div>

            {/* Platform Selector Hub */}
            {mode === "bot" && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                {platforms.map((p, idx) => {
                  const isActive = idx === activePlatform;
                  return (
                    <button
                      key={p.short}
                      onClick={() => setActivePlatform(idx)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        isActive
                          ? "bg-indigo-wash/50 border-indigo shadow-xs ring-2 ring-indigo/20"
                          : "bg-raise border-line/60 opacity-75 hover:opacity-100"
                      }`}
                    >
                      <span className="block text-[12px] font-bold text-ink mb-0.5">{p.short}</span>
                      <span className="text-[9px] font-mono font-semibold uppercase tracking-wider text-teal">
                        {isActive ? "● Connected" : "Standby"}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* View Tab 1: Architecture Image View */}
            {viewTab === "architecture" ? (
              <div className="relative rounded-2xl overflow-hidden border-2 border-indigo/40 shadow-xl group mb-6">
                <img
                  src="/images/concept-bot-stream.jpg"
                  alt="Scripra Real-Time Meeting Bot Stream Console"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070A12]/80 via-transparent to-transparent pointer-events-none" />
                
                {/* Floating Telemetry Badge Over Image */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between p-3 rounded-xl bg-[#090D1A]/90 border border-indigo/30 backdrop-blur-md text-white text-[11px] font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-teal animate-ping" />
                    <span className="text-teal font-bold">Multi-Stream Diarization Active</span>
                  </div>
                  <span className="text-white/70">Sub-240ms Edge Pipeline</span>
                </div>
              </div>
            ) : (
              /* View Tab 2: Interactive SVG Waveform View */
              <div className="p-5 sm:p-6 rounded-2xl bg-[#090D1A] border-2 border-indigo/30 mb-6 flex flex-col items-center justify-center min-h-[170px] relative overflow-hidden shadow-inner">
                {/* Subtle futuristic cyber grid background */}
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage: "linear-gradient(to right, #4353FF 1px, transparent 1px), linear-gradient(to bottom, #4353FF 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />

                {/* Animated Laser Sweep Beam */}
                <div className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-teal/20 to-transparent -skew-x-12 animate-[custom-shimmer_3s_infinite_linear] pointer-events-none" />

                {/* Full SVG Holographic Audio Oscilloscope */}
                <div className="w-full max-w-[460px] h-20 relative z-10 flex items-center justify-center">
                  <svg viewBox="0 0 460 80" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="cyberSine1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#4353FF" stopOpacity="0.2" />
                        <stop offset="35%" stopColor="#00D2B4" stopOpacity="1" />
                        <stop offset="65%" stopColor="#4353FF" stopOpacity="1" />
                        <stop offset="100%" stopColor="#F5A020" stopOpacity="0.3" />
                      </linearGradient>
                      <linearGradient id="cyberSine2" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#F5A020" stopOpacity="0.3" />
                        <stop offset="50%" stopColor="#707EFF" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#00D2B4" stopOpacity="0.2" />
                      </linearGradient>
                      <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    {/* Harmonic Wave 1 */}
                    <path
                      d="M 0,40 Q 57.5,5 115,40 T 230,40 T 345,40 T 460,40"
                      fill="none"
                      stroke="url(#cyberSine1)"
                      strokeWidth="2.5"
                      filter="url(#neonGlow)"
                      className="animate-[dash_2s_linear_infinite]"
                      strokeDasharray="140 60"
                    />

                    {/* Harmonic Wave 2 (Phase Inverted) */}
                    <path
                      d="M 0,40 Q 57.5,75 115,40 T 230,40 T 345,40 T 460,40"
                      fill="none"
                      stroke="url(#cyberSine2)"
                      strokeWidth="1.8"
                      opacity="0.75"
                      className="animate-[dash_2.8s_linear_infinite_reverse]"
                      strokeDasharray="120 80"
                    />

                    {/* Active Neural Peak Markers */}
                    <circle cx="115" cy="40" r="3.5" fill="#00D2B4" className="animate-ping" />
                    <circle cx="115" cy="40" r="2.5" fill="#FFFFFF" />
                    <circle cx="230" cy="40" r="4" fill="#4353FF" className="animate-ping" />
                    <circle cx="230" cy="40" r="2.5" fill="#FFFFFF" />
                    <circle cx="345" cy="40" r="3.5" fill="#F5A020" className="animate-ping" />
                    <circle cx="345" cy="40" r="2.5" fill="#FFFFFF" />

                    {/* Mini Vertical Spectrum Bars */}
                    {[30, 48, 65, 38, 72, 85, 45, 92, 60, 40, 78, 90, 52, 68, 42, 88, 70, 35].map((val, idx) => {
                      const x = 30 + idx * 23;
                      const h = (val / 100) * 28;
                      return (
                        <rect
                          key={idx}
                          x={x}
                          y={40 - h / 2}
                          width="2"
                          height={h}
                          rx="1"
                          fill={idx % 2 === 0 ? "#00D2B4" : "#4353FF"}
                          opacity={0.65}
                        />
                      );
                    })}
                  </svg>
                </div>

                {/* Futuristic Telemetry Status Bar */}
                <div className="mt-3 flex items-center justify-between w-full max-w-[460px] text-[10.5px] font-mono text-white/60 relative z-10 border-t border-white/10 pt-2">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
                    <span className="text-teal font-semibold">48kHz PCM Zero-Loss</span>
                  </span>
                  <span className="text-white/40">Noise Gate: -36dB</span>
                  <span className="text-indigo-lift font-bold">Latency: &lt;240ms</span>
                </div>
              </div>
            )}

            {/* Live Diarized Transcript Stream */}
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-card border border-line flex items-start gap-3 shadow-xs">
                <div className="w-7 h-7 rounded-full bg-indigo text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  A
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[12px] font-bold text-ink">Antony · Product Lead</span>
                    <span className="text-[10px] font-mono text-ink-3">10:02:14</span>
                  </div>
                  <p className="text-[13px] text-ink-2 leading-relaxed">
                    &ldquo;Let&apos;s finalize the Q3 roadmap: Teams and Webex bot integration is live, and we launch Slack Huddles next.&rdquo;
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-card border border-line flex items-start gap-3 shadow-xs">
                <div className="w-7 h-7 rounded-full bg-teal text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  S
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[12px] font-bold text-ink">Sarah · Head of Design</span>
                    <span className="text-[10px] font-mono text-ink-3">10:02:22</span>
                  </div>
                  <p className="text-[13px] text-ink-2 leading-relaxed">
                    &ldquo;Agreed. I will deliver the interactive competitor comparison table by Thursday.&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* Status Footer */}
            <div className="mt-5 pt-4 border-t border-line/70 flex items-center justify-between text-[11px] font-medium text-ink-3">
              <span className="flex items-center gap-1.5 text-teal font-bold">
                <span className="w-2 h-2 rounded-full bg-teal" />
                Diarizing 2 speakers simultaneously
              </span>
              <span className="font-mono text-ink-3">Export: Transcript · Audio · SRT</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
