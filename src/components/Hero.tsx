"use client";

import React, { useState } from "react";
import Link from "next/link";
import ConversationArtifact from "./ConversationArtifact";
import ScrollReveal from "./ScrollReveal";
import WordRotator from "./WordRotator";

export default function Hero() {
  const [meetingUrl, setMeetingUrl] = useState("meet.google.com/scripra-launch-demo");
  const [activePlatform, setActivePlatform] = useState<"meet" | "zoom" | "teams" | "webex">("meet");
  const [dispatchStatus, setDispatchStatus] = useState<"idle" | "connecting" | "active">("idle");

  const platformPresets = {
    meet: { name: "Google Meet", url: "meet.google.com/scripra-launch-demo", color: "#00D2B4" },
    zoom: { name: "Zoom", url: "zoom.us/j/94285109312", color: "#0B5CFF" },
    teams: { name: "Teams", url: "teams.microsoft.com/l/meetup-join/19...", color: "#5059C9" },
    webex: { name: "Webex", url: "webex.com/meet/exec-sync", color: "#00BC70" },
  };

  const handleSelectPreset = (key: "meet" | "zoom" | "teams" | "webex") => {
    setActivePlatform(key);
    setMeetingUrl(platformPresets[key].url);
    setDispatchStatus("idle");
  };

  const handleDeploy = (e: React.FormEvent) => {
    e.preventDefault();
    setDispatchStatus("connecting");
    setTimeout(() => {
      setDispatchStatus("active");
    }, 900);
  };

  return (
    <div className="relative min-h-[88vh] flex items-center justify-center pt-28 pb-16 px-6 sm:px-8 xl:px-12 overflow-hidden bg-transparent">
      <div className="max-w-[1380px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-center relative z-10">
        
        {/* Left Side: Headline, Interactive Dispatch & Copy */}
        <div className="flex flex-col items-start text-left max-w-[620px] w-full">
          <ScrollReveal direction="up" delay={0.1} className="w-full">
            
            {/* Live Product Intelligence Pipeline Graphic with Futuristic SVG Laser Conduit */}
            <div className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/90 border border-indigo/30 text-[12px] font-semibold mb-6 shadow-[0_4px_20px_rgba(67,83,255,0.12)] backdrop-blur-md overflow-hidden group">
              {/* Subtle sweeping laser shine */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo/15 to-transparent -skew-x-12 animate-[custom-shimmer_3s_infinite_linear] pointer-events-none" />
              
              <span className="w-2.5 h-2.5 rounded-full bg-teal animate-pulse shadow-[0_0_8px_#00D2B4]" />
              <span className="text-ink font-bold">Capture</span>
              
              {/* Mini animated SVG connector */}
              <svg width="18" height="8" viewBox="0 0 18 8" className="overflow-visible text-indigo/60">
                <line x1="0" y1="4" x2="14" y2="4" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" className="animate-[dash_1.5s_linear_infinite]" />
                <polygon points="14,1 18,4 14,7" fill="currentColor" />
              </svg>

              <span className="text-ink font-bold">Transcribe</span>
              
              <svg width="18" height="8" viewBox="0 0 18 8" className="overflow-visible text-indigo/60">
                <line x1="0" y1="4" x2="14" y2="4" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" className="animate-[dash_1.5s_linear_infinite]" />
                <polygon points="14,1 18,4 14,7" fill="currentColor" />
              </svg>

              <span className="text-ink font-bold">Executive MoM</span>
              
              <svg width="18" height="8" viewBox="0 0 18 8" className="overflow-visible text-amber/70">
                <line x1="0" y1="4" x2="14" y2="4" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" className="animate-[dash_1.5s_linear_infinite]" />
                <polygon points="14,1 18,4 14,7" fill="currentColor" />
              </svg>

              <span className="text-amber font-extrabold flex items-center gap-1.5">
                <span>Action Memory</span>
                <span className="w-2 h-2 rounded-full bg-amber animate-ping" />
              </span>
            </div>

            {/* Main Headline: Static 1-row AI Conversation Intelligence + Text Changing on next row */}
            <h1 className="font-black tracking-[-0.035em] leading-[1.14] mb-5 text-ink">
              {/* Row 1: AI Conversation Intelligence */}
              <span className="text-indigo block text-[clamp(22px,2.4vw,38px)] whitespace-nowrap">
                AI Conversation Intelligence
              </span>
              
              {/* Row 2: Text changing animation */}
              <span className="block text-[clamp(26px,3.2vw,44px)] text-ink mt-1.5 font-black">
                <WordRotator />
              </span>

              {/* Row 3: engine for all your meetings */}
              <span className="block text-[clamp(22px,2.6vw,34px)] text-ink mt-1.5 font-extrabold">
                engine for all your meetings
                <span className="inline-block w-3 h-3 rounded-full bg-amber ml-2 align-baseline shadow-[0_0_12px_rgba(245,160,32,0.65)]" />
              </span>
            </h1>
            
            {/* Crisp Definition */}
            <p className="max-w-[530px] text-[15.5px] sm:text-[17px] font-medium text-ink-2 mb-6 tracking-tight leading-relaxed">
              <strong className="text-ink font-bold">Scripra</strong> automatically dispatches silent AI scribes to your calendar calls, synthesizes executive Minutes of Meeting (MoM), and weaves an interconnected team memory.
            </p>

            {/* Interactive Futuristic Bot Dispatch Simulator Bar */}
            <div className="w-full max-w-[550px] p-3 rounded-2xl bg-card border border-line shadow-md mb-6 relative overflow-hidden">
              <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-line/60">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-ink-3">
                  <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
                  <span>Instant Bot Dispatch Simulator</span>
                </div>
                {/* Platform Quick Buttons */}
                <div className="flex items-center gap-1">
                  {(["meet", "zoom", "teams"] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => handleSelectPreset(p)}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase transition-all ${
                        activePlatform === p
                          ? "bg-indigo-wash text-indigo border border-indigo/30"
                          : "text-ink-3 hover:text-ink"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input & Dispatch Form */}
              <form onSubmit={handleDeploy} className="flex items-center gap-2">
                <div className="flex-1 relative flex items-center">
                  <span className="absolute left-3 text-ink-3 text-xs font-mono">🔗</span>
                  <input
                    type="text"
                    value={meetingUrl}
                    onChange={(e) => setMeetingUrl(e.target.value)}
                    placeholder="Enter Google Meet, Zoom, or Teams URL"
                    className="w-full pl-8 pr-3 py-2 text-[12.5px] font-mono bg-raise border border-line/80 rounded-xl text-ink focus:outline-none focus:border-indigo transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  disabled={dispatchStatus === "connecting"}
                  className="px-4 py-2 rounded-xl bg-indigo text-white text-[12.5px] font-bold hover:bg-indigo-deep shadow-sm transition-all whitespace-nowrap active:scale-[0.98] disabled:opacity-75"
                >
                  {dispatchStatus === "connecting"
                    ? "Dispatching..."
                    : dispatchStatus === "active"
                    ? "✓ Connected"
                    : "Deploy Bot →"}
                </button>
              </form>

              {/* Live Telemetry Feedback */}
              {dispatchStatus !== "idle" && (
                <div className="mt-2.5 pt-2 border-t border-line/60 flex items-center justify-between text-[11px] font-mono animate-fadeIn">
                  {dispatchStatus === "connecting" ? (
                    <span className="flex items-center gap-2 text-indigo">
                      <span className="w-2 h-2 rounded-full bg-indigo animate-ping" />
                      Handshaking with {platformPresets[activePlatform].name} WebRTC Relay...
                    </span>
                  ) : (
                    <>
                      <span className="flex items-center gap-1.5 text-teal font-bold">
                        <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
                        Bot in Call · Audio Diarization Active
                      </span>
                      <span className="text-ink-3">Latency: 210ms</span>
                    </>
                  )}
                </div>
              )}
            </div>
            
            {/* Primary Action Buttons */}
            <div className="flex items-center gap-4 mb-8">
              <Link
                href="/signup"
                className="px-7 py-3.5 rounded-xl bg-indigo text-white text-[15px] font-semibold hover:bg-indigo-deep hover:shadow-[0_8px_25px_rgba(67,83,255,0.35)] transition-all text-center shadow-md active:scale-[0.99]"
              >
                Try Scripra free
              </Link>
              <Link
                href="/demo"
                className="px-7 py-3.5 rounded-xl border border-line bg-card text-ink text-[15px] font-semibold hover:border-indigo transition-all text-center shadow-sm"
              >
                Interactive Demo
              </Link>
            </div>

            {/* Product Badges */}
            <div className="flex flex-wrap items-center gap-3.5 text-[11.5px] font-medium text-ink-3 pt-4 border-t border-line/60 max-w-[540px] w-full">
              <div className="flex items-center gap-1.5">
                <span className="text-teal font-bold">✓</span>
                <span className="text-ink font-semibold">Teams, Webex, Zoom &amp; Meet</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-teal font-bold">✓</span>
                <span className="text-ink-2 font-semibold">Google &amp; Outlook Calendar Sync</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-indigo font-bold">●</span>
                <span>Executive MoM in 60s</span>
              </div>
            </div>

          </ScrollReveal>
        </div>

        {/* Right Side: Clean Structured Intelligence Card */}
        <ScrollReveal direction="left" delay={0.25} className="w-full flex justify-center lg:justify-end mt-4 lg:mt-0 relative">
          <ConversationArtifact />
        </ScrollReveal>
        
      </div>
    </div>
  );
}
