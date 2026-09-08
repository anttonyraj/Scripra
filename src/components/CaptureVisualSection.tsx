"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function CaptureVisualSection() {
  const [mode, setMode] = useState<"bot" | "botfree">("bot");
  const [activePlatform, setActivePlatform] = useState(0);

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
                Real-Time Gemini Flash Diarization
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
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-line/70">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
                <span className="text-[13px] font-mono font-bold text-ink">
                  {mode === "bot"
                    ? `${platforms[activePlatform].name} · Active Session`
                    : "Bot-Free Capture · Local Audio Device"}
                </span>
              </div>
              <span className="text-[11px] font-mono bg-raise px-2.5 py-1 rounded-md text-ink-3 border border-line">
                Gemini 2.0 Diarization
              </span>
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
                          ? "bg-indigo-wash/40 border-indigo/40 shadow-xs ring-2 ring-indigo/10"
                          : "bg-raise border-line/60 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <span className="block text-[12px] font-bold text-ink mb-0.5">{p.short}</span>
                      <span className="text-[9px] font-mono font-semibold uppercase tracking-wider text-teal">
                        {isActive ? "● Connected" : "Ready"}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* SVG Audio Equalizer & Waveform Stream */}
            <div className="p-6 rounded-2xl bg-raise border border-line/80 mb-6 flex flex-col items-center justify-center min-h-[160px] relative overflow-hidden">
              <div className="flex items-center justify-center gap-1.5 h-16 w-full max-w-[420px]">
                {[32, 54, 78, 42, 90, 65, 38, 82, 100, 70, 48, 86, 92, 58, 74, 45, 88, 62, 40, 95, 52].map((height, i) => (
                  <span
                    key={i}
                    className="w-1.5 rounded-full transition-all duration-300"
                    style={{
                      height: `${height * 0.55}%`,
                      backgroundColor: i % 3 === 0 ? "var(--teal)" : i % 2 === 0 ? "var(--indigo)" : "var(--amber)",
                      opacity: 0.85,
                      animation: `pulse 1.2s ease-in-out infinite ${(i * 0.08).toFixed(2)}s`,
                    }}
                  />
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between w-full max-w-[420px] text-[11px] font-mono text-ink-3">
                <span>Noise Filter: Active (-32dB)</span>
                <span className="text-teal font-bold">Latency: 280ms</span>
              </div>
            </div>

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
