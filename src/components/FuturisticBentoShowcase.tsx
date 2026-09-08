"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function FuturisticBentoShowcase() {
  const [activeApiPlatform, setActiveApiPlatform] = useState<"zoom" | "teams" | "meet" | "webex">("meet");

  const apiPayloads = {
    meet: {
      platform: "Google Meet",
      endpoint: "POST /v1/bots/join",
      status: "200 OK · Handshake Connected",
      latency: "180ms",
      response: `{\n  "bot_id": "bot_gm_94a21",\n  "platform": "google_meet",\n  "status": "in_call",\n  "stream": "wss://edge.scripra.ai/v1/audio/live",\n  "sample_rate": 48000,\n  "diarization": "active"\n}`,
    },
    teams: {
      platform: "Microsoft Teams",
      endpoint: "POST /v1/bots/join",
      status: "200 OK · WebRTC Relay Active",
      latency: "260ms",
      response: `{\n  "bot_id": "bot_ms_47f89",\n  "platform": "microsoft_teams",\n  "status": "in_call",\n  "tenant_sso": "verified",\n  "sample_rate": 48000,\n  "diarization": "active"\n}`,
    },
    zoom: {
      platform: "Zoom Meetings",
      endpoint: "POST /v1/bots/join",
      status: "200 OK · Token Authenticated",
      latency: "210ms",
      response: `{\n  "bot_id": "bot_zm_12c77",\n  "platform": "zoom",\n  "status": "in_call",\n  "recording_mode": "raw_pcm",\n  "sample_rate": 48000,\n  "diarization": "active"\n}`,
    },
    webex: {
      platform: "Cisco Webex",
      endpoint: "POST /v1/bots/join",
      status: "200 OK · SIP Trunk Ready",
      latency: "290ms",
      response: `{\n  "bot_id": "bot_wx_88d34",\n  "platform": "cisco_webex",\n  "status": "in_call",\n  "codec": "opus",\n  "sample_rate": 48000,\n  "diarization": "active"\n}`,
    },
  };

  return (
    <section id="futuristic-suite" className="py-24 sm:py-32 px-6 bg-canvas border-t border-line/60 relative overflow-hidden">
      {/* Soft futuristic ambient light */}
      <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-indigo-wash/70 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[480px] h-[480px] bg-teal-wash/60 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-[1320px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-[820px] mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-wash text-indigo text-[11px] font-bold tracking-[0.15em] uppercase border border-indigo/25 mb-4">
            <span className="w-2 h-2 rounded-full bg-indigo animate-pulse" />
            The Next-Gen Architecture
          </div>
          <h2 className="text-[clamp(32px,4.5vw,52px)] font-black tracking-[-0.03em] text-ink leading-[1.1] mb-5">
            Autonomous calendar intelligence. <br className="hidden sm:inline" />
            <span className="text-indigo">Sub-second real-time streaming API.</span>
          </h2>
          <p className="text-[16px] sm:text-[18px] text-ink-3 leading-relaxed">
            Engineered for modern high-performance teams. Scripra bridges frictionless calendar automation with enterprise-grade real-time voice intelligence and zero-trust security.
          </p>
        </div>

        {/* Master Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* Bento Tile 1: Smart Calendar & Predictive Bot Dispatch (7 cols) */}
          <div className="lg:col-span-7 bg-card border border-line rounded-3xl p-6 sm:p-8 shadow-sm hover:border-indigo/40 transition-all flex flex-col justify-between overflow-hidden relative group">
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-teal-wash text-teal-deep border border-teal/30 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
                  Predictive Auto-Dispatch
                </span>
                <span className="text-[12px] font-mono text-ink-3">Google &amp; Outlook Cal Sync</span>
              </div>
              
              <h3 className="text-[22px] sm:text-[26px] font-black text-ink mb-2 tracking-tight">
                Zero-Friction Calendar Automation
              </h3>
              <p className="text-[14.5px] sm:text-[15.5px] text-ink-3 mb-6 leading-relaxed">
                Connect your work calendar once. Scripra automatically monitors upcoming calls on Teams, Zoom, Webex, and Meet—dispatching your private AI scribe 30 seconds before start time.
              </p>
            </div>

            {/* Visual Image Preview */}
            <div className="relative rounded-2xl overflow-hidden border border-indigo/25 shadow-md mb-4 group-hover:border-indigo/50 transition-colors">
              <img
                src="/images/concept-calendar-dispatch.jpg"
                alt="Scripra Smart Calendar Integration and Automated Bot Dispatch"
                className="w-full h-[260px] sm:h-[300px] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070A12]/80 via-transparent to-transparent pointer-events-none" />
              
              {/* Floating UI Over Image */}
              <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-[#0B0F1E]/90 border border-indigo/30 backdrop-blur-md flex items-center justify-between text-white text-[11px] font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal animate-ping" />
                  <span className="text-teal font-bold">Auto-Dispatch Arm: ON</span>
                </div>
                <span className="text-white/80">30s Pre-Flight Handshake</span>
              </div>
            </div>

            {/* Feature Checkpoints */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-[12px] font-medium text-ink-2">
              <div className="flex items-center gap-2">
                <span className="text-teal font-bold">✓</span>
                <span>Two-way Google Cal</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-teal font-bold">✓</span>
                <span>Microsoft 365 / Outlook</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber font-bold">●</span>
                <span>Custom Join Rules</span>
              </div>
            </div>
          </div>

          {/* Bento Tile 2: Real-Time Developer API & Webhooks (5 cols) */}
          <div className="lg:col-span-5 bg-card border border-line rounded-3xl p-6 sm:p-8 shadow-sm hover:border-indigo/40 transition-all flex flex-col justify-between overflow-hidden relative">
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-indigo-wash text-indigo border border-indigo/30">
                  Developer Engine
                </span>
                <span className="text-[12px] font-mono text-teal font-bold">&lt;280ms Edge Stream</span>
              </div>
              
              <h3 className="text-[22px] sm:text-[26px] font-black text-ink mb-2 tracking-tight">
                Unified Meeting Bot API
              </h3>
              <p className="text-[14px] text-ink-3 mb-5 leading-relaxed">
                One single WebSocket and REST API for Zoom, Google Meet, Teams, and Webex. Stream raw 48kHz audio and receive live speaker diarization payloads.
              </p>

              {/* Platform Selector Tabs */}
              <div className="grid grid-cols-4 gap-1.5 p-1 bg-raise border border-line rounded-xl mb-4 text-center">
                {(["meet", "teams", "zoom", "webex"] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setActiveApiPlatform(p)}
                    className={`py-1 rounded-lg text-[11px] font-mono font-bold uppercase transition-all ${
                      activeApiPlatform === p
                        ? "bg-card text-indigo shadow-xs border border-indigo/20"
                        : "text-ink-3 hover:text-ink"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Terminal Console Preview */}
            <div className="bg-[#090D1A] border border-indigo/30 rounded-2xl p-4 font-mono text-[11px] relative overflow-hidden shadow-inner mb-4">
              <div className="flex items-center justify-between text-white/50 border-b border-white/10 pb-2 mb-3">
                <span className="text-teal font-bold">{apiPayloads[activeApiPlatform].endpoint}</span>
                <span className="text-white/60">{apiPayloads[activeApiPlatform].latency}</span>
              </div>
              <pre className="text-indigo-lift overflow-x-auto whitespace-pre leading-relaxed">
                {apiPayloads[activeApiPlatform].response}
              </pre>
            </div>

            <div className="flex items-center justify-between text-[11.5px] font-medium text-ink-3 pt-2">
              <span className="text-teal font-bold">● WebSocket 48kHz PCM Lossless</span>
              <Link href="/demo" className="text-indigo font-bold hover:underline">
                Explore API Docs ↗
              </Link>
            </div>
          </div>

          {/* Bento Tile 3: Enterprise Zero-Trust & Stealth Mode (5 cols) */}
          <div className="lg:col-span-5 bg-card border border-line rounded-3xl p-6 sm:p-8 shadow-sm hover:border-teal/40 transition-all flex flex-col justify-between overflow-hidden relative group">
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-teal-wash text-teal border border-teal/30">
                  Zero-Trust Architecture
                </span>
                <span className="text-[12px] font-mono text-ink-3">SOC 2 Type II</span>
              </div>

              <h3 className="text-[22px] sm:text-[26px] font-black text-ink mb-2 tracking-tight">
                Enterprise Shield &amp; Stealth Mode
              </h3>
              <p className="text-[14px] text-ink-3 mb-5 leading-relaxed">
                Need 100% discretion with high-profile executives or sensitive M&amp;A negotiations? Switch to Bot-Free Native Capture with zero participants notified.
              </p>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-teal/30 shadow-md mb-4 group-hover:border-teal/50 transition-colors">
              <img
                src="/images/concept-enterprise-stealth.jpg"
                alt="Scripra Zero-Trust Enterprise Security and Stealth Capture"
                className="w-full h-[220px] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070A12]/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2.5 left-2.5 right-2.5 p-2.5 rounded-xl bg-[#0B0F1E]/90 border border-teal/30 backdrop-blur-md flex items-center justify-between text-white text-[10.5px] font-mono">
                <span className="text-teal font-bold">End-to-End Encrypted (AES-256)</span>
                <span className="text-white/70">HIPAA · GDPR Compliant</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11.5px] font-medium text-ink-3 pt-2">
              <span className="text-teal font-semibold">✓ 100% Local Browser Recording Available</span>
              <span className="text-indigo font-bold">Zero Data Training</span>
            </div>
          </div>

          {/* Bento Tile 4: Cross-Team Action Execution Matrix (7 cols) */}
          <div className="lg:col-span-7 bg-card border border-line rounded-3xl p-6 sm:p-8 shadow-sm hover:border-amber/40 transition-all flex flex-col justify-between overflow-hidden relative">
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-amber-wash text-amber-deep border border-amber/30 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber" />
                  Decision &amp; Action Hub
                </span>
                <span className="text-[12px] font-mono text-ink-3">Bi-directional Sync</span>
              </div>

              <h3 className="text-[22px] sm:text-[26px] font-black text-ink mb-2 tracking-tight">
                Decisions instantly converted to tasks
              </h3>
              <p className="text-[14.5px] sm:text-[15.5px] text-ink-3 mb-6 leading-relaxed">
                Agreements made in spoken conversation shouldn&apos;t evaporate. Scripra extracts commitments, detects owners and due dates, and pushes them directly into your team&apos;s project stack.
              </p>
            </div>

            {/* Interactive Integration Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
              {[
                { name: "Slack", icon: "💬", desc: "MoM broadcast to channel", status: "Active" },
                { name: "Linear", icon: "⚡", desc: "Auto-create issues & tags", status: "Synced" },
                { name: "Jira", icon: "🔷", desc: "Assign sprint tickets", status: "Synced" },
                { name: "Notion", icon: "📝", desc: "Structured wiki pages", status: "Updated" },
              ].map((tool) => (
                <div
                  key={tool.name}
                  className="p-3.5 rounded-2xl bg-raise border border-line/80 hover:border-indigo/30 transition-all text-center group/tool"
                >
                  <span className="text-2xl block mb-1 group-hover/tool:scale-110 transition-transform">
                    {tool.icon}
                  </span>
                  <span className="block text-[13px] font-bold text-ink mb-0.5">{tool.name}</span>
                  <span className="text-[10px] text-ink-3 block mb-1.5">{tool.desc}</span>
                  <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded-full bg-teal-wash text-teal font-bold">
                    {tool.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-line/60 text-[12px]">
              <span className="text-ink-2 font-medium">
                Connected with <strong className="text-ink">25+ productivity &amp; CRM tools</strong>
              </span>
              <Link
                href="/signup"
                className="font-bold text-indigo hover:text-indigo-deep transition-colors"
              >
                Connect your workspace →
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
