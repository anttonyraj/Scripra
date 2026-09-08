"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSubscription } from "@/context/SubscriptionContext";
import LiveMeetingStudio from "@/components/LiveMeetingStudio";

interface ActionItem {
  id: string;
  task: string;
  owner: string;
  deadline: string;
  priority: "high" | "medium" | "low";
  completed: boolean;
}

const recentConversations = [
  {
    id: "1",
    title: "Product Review — August Release & Roadmap",
    date: "Sep 2, 2026",
    duration: "42 min",
    platform: "Google Meet",
    speakers: 3,
    decisions: 2,
    actions: 3,
  },
  {
    id: "2",
    title: "Client Architecture Sync — Enterprise Deployment",
    date: "Sep 1, 2026",
    duration: "28 min",
    platform: "Zoom",
    speakers: 4,
    decisions: 1,
    actions: 2,
  },
  {
    id: "3",
    title: "Sprint Retrospective & Action Commitments",
    date: "Aug 30, 2026",
    duration: "55 min",
    platform: "Microsoft Teams",
    speakers: 5,
    decisions: 3,
    actions: 4,
  },
];

const teaserBullets = [
  "The team agreed to ship the August release on Friday, one week later than originally planned.",
  "Regression testing is the remaining blocker — Michael owns it and expects to finish Thursday.",
  "Security approval has now been raised in four consecutive reviews without resolution.",
];

const fullRecapData = {
  executiveRecap:
    "The engineering and product teams aligned on delaying the August release by one week to Friday to allow comprehensive regression testing by Michael. Security approval remains an open escalation item needing Antony's signoff.",
  decisions: [
    { title: "Delay release by 7 days to Friday", owner: "Team", status: "Agreed" },
    { title: "No new feature PRs merged until regression clears", owner: "Michael", status: "Active" },
  ],
  actionItems: [
    { id: "1", owner: "Michael", task: "Finish audio stream regression testing", deadline: "Thursday 5 PM", priority: "high", completed: false },
    { id: "2", owner: "Sarah", task: "Draft stakeholder communication on timeline", deadline: "Wednesday", priority: "medium", completed: false },
    { id: "3", owner: "Antony", task: "Escalate security audit sign-off with compliance", deadline: "Today", priority: "high", completed: false },
  ],
};

const platformBadges: Record<string, { bg: string; text: string; icon: string }> = {
  "Google Meet": { bg: "bg-teal-wash text-teal border-teal/30", text: "text-teal", icon: "🟢" },
  "Zoom": { bg: "bg-indigo-wash text-indigo border-indigo/30", text: "text-indigo", icon: "🔵" },
  "Microsoft Teams": { bg: "bg-purple-wash text-purple border-purple/30", text: "text-purple", icon: "🟣" },
  "Cisco Webex": { bg: "bg-amber-wash text-amber border-amber/30", text: "text-amber", icon: "🟠" },
};

export default function DashboardPage() {
  const { plan, meetingsUsed, meetingsLimit, openUpgradeModal } = useSubscription();
  const [activeTab, setActiveTab] = useState<"overview" | "studio">("overview");
  const [actionsList, setActionsList] = useState<ActionItem[]>(fullRecapData.actionItems as ActionItem[]);

  const toggleAction = (id: string) => {
    setActionsList((prev) =>
      prev.map((a) => (a.id === id ? { ...a, completed: !a.completed } : a))
    );
  };

  const usagePercent = Math.min(100, Math.round((meetingsUsed / (meetingsLimit || 10)) * 100));

  return (
    <div className="p-5 sm:p-7 md:p-8 max-w-[1240px] mx-auto w-full">
      {/* Futuristic Live Neural Telemetry HUD Strip */}
      <div className="mb-6 p-3 sm:p-3.5 rounded-2xl bg-[#090D1A] border border-indigo/30 shadow-[0_4px_30px_rgba(67,83,255,0.12)] flex flex-wrap items-center justify-between gap-4 text-white relative overflow-hidden">
        {/* Ambient laser sweep */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo/10 to-transparent -skew-x-12 animate-[custom-shimmer_4s_infinite_linear] pointer-events-none" />

        <div className="flex items-center gap-3 relative z-10">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-teal shadow-[0_0_10px_#00D2B4]"></span>
          </span>
          <div className="flex items-center gap-2 font-mono text-[11.5px] sm:text-[12px]">
            <span className="font-extrabold text-teal tracking-wider uppercase">NEURAL ASR CORE v4.2</span>
            <span className="text-white/30 hidden sm:inline">|</span>
            <span className="text-indigo-lift font-bold hidden sm:inline">EDGE RUNTIME [ACTIVE]</span>
          </div>
        </div>
        
        {/* Animated SVG Telemetry Audio Bus Spectrum */}
        <div className="hidden lg:flex items-center gap-2.5 relative z-10 px-3 py-1 rounded-xl bg-white/5 border border-white/10">
          <span className="text-[10px] font-mono tracking-widest text-white/50 uppercase">AUDIO BUS:</span>
          <svg width="100" height="18" viewBox="0 0 100 18" className="overflow-visible">
            {[10, 16, 8, 22, 14, 26, 18, 9, 24, 15, 28, 13, 20, 11, 23].map((h, idx) => (
              <rect
                key={idx}
                x={idx * 6.6}
                y={18 - h / 1.6}
                width="3.2"
                height={h / 1.6}
                rx="1"
                fill={idx % 2 === 0 ? "#00D2B4" : "#707EFF"}
                className="animate-pulse"
                style={{ animationDuration: `${0.6 + (idx % 5) * 0.18}s` }}
              />
            ))}
          </svg>
        </div>

        {/* Telemetry Status Chips */}
        <div className="flex items-center gap-2.5 text-[10.5px] font-mono relative z-10">
          <span className="px-2.5 py-1 rounded-lg bg-white/10 text-white/90 border border-white/15 font-bold">
            ⚡ &lt;218ms Edge
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-teal/15 text-teal border border-teal/30 font-bold">
            🔒 RAM Zero-Retention
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-indigo/25 text-indigo-lift border border-indigo/35 font-bold hidden sm:inline">
            48kHz PCM
          </span>
        </div>
      </div>

      {/* Top Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-5 border-b border-line">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <h1 className="text-[23px] sm:text-[27px] font-black tracking-tight text-ink">
              Intelligence Command Center
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-teal-wash text-teal border border-teal/30 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
              Live Sync
            </span>
          </div>
          <p className="text-[13.5px] text-ink-3">
            Real-time meeting capture, structured MoM synthesis, and cross-meeting memory graph.
          </p>
        </div>

        {/* Action Controls & Tab Switcher */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Segmented Tab Pill */}
          <div className="flex items-center bg-card border border-line rounded-xl p-1 shadow-2xs">
            <button
              onClick={() => setActiveTab("overview")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-[13px] font-semibold transition-all ${
                activeTab === "overview"
                  ? "bg-raise text-ink shadow-xs"
                  : "text-ink-3 hover:text-ink hover:bg-raise/50"
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab("studio")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-[13px] font-semibold transition-all ${
                activeTab === "studio"
                  ? "bg-indigo text-white shadow-xs"
                  : "text-ink-3 hover:text-ink hover:bg-raise/50"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
              <span>Live Studio</span>
            </button>
          </div>

          {/* Quick Record CTA (when on overview tab) */}
          {activeTab === "overview" && (
            <button
              onClick={() => setActiveTab("studio")}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo text-white text-[13px] font-bold hover:bg-indigo-deep transition-all shadow-xs active:scale-[0.98]"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              <span>New Meeting</span>
            </button>
          )}

          {/* Pro Upgrade Button if free */}
          {plan === "free" && (
            <button
              onClick={() => openUpgradeModal("pro")}
              className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-card border border-amber/30 text-amber text-[12px] font-bold hover:bg-amber-wash transition-all shadow-2xs"
            >
              <span>⭐ Upgrade Pro</span>
            </button>
          )}
        </div>
      </div>

      {/* ================= VIEW 1: LIVE STUDIO ================= */}
      {activeTab === "studio" ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-card border border-line rounded-xl px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-teal animate-ping" />
              <span className="text-[13px] font-bold text-ink">Active Recording &amp; Meeting Studio</span>
            </div>
            <button
              onClick={() => setActiveTab("overview")}
              className="text-[12px] text-ink-3 hover:text-ink font-semibold flex items-center gap-1 transition-colors"
            >
              <span>← Back to Dashboard Overview</span>
            </button>
          </div>
          <LiveMeetingStudio />
        </div>
      ) : (
        /* ================= VIEW 2: OVERVIEW & INTELLIGENCE ================= */
        <div className="space-y-6">
          {/* Metrics Row: 4 Futuristic Cards with Animated SVG Telemetry */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 1. Meeting Quota */}
            <div className="bg-card border border-line rounded-2xl p-5 shadow-2xs hover:border-indigo/40 transition-all relative overflow-hidden group">
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-ink-3 mb-2 flex items-center justify-between">
                <span>Monthly Quota</span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-md bg-indigo-wash text-indigo font-bold border border-indigo/20">
                  {plan}
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-1.5">
                <div>
                  <span className="text-[28px] sm:text-[32px] font-black tracking-tight text-ink">
                    {meetingsUsed}
                  </span>
                  <span className="text-[13px] text-ink-3 font-mono ml-1">
                    / {plan === "business" ? "∞" : meetingsLimit} calls
                  </span>
                </div>
                {/* Mini Radial SVG Arc */}
                <div className="w-10 h-10 relative flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="14" fill="none" stroke="currentColor" strokeWidth="3" className="text-raise" />
                    <circle
                      cx="18"
                      cy="18"
                      r="14"
                      fill="none"
                      stroke="#4353FF"
                      strokeWidth="3"
                      strokeDasharray={`${(plan === "business" ? 20 : usagePercent) * 0.88} 100`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute font-mono text-[9px] font-bold text-indigo">
                    {plan === "business" ? "∞" : `${usagePercent}%`}
                  </span>
                </div>
              </div>
              <div className="w-full h-1.5 bg-raise rounded-full mt-3 overflow-hidden">
                <div
                  className="h-1.5 bg-indigo rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(67,83,255,0.6)]"
                  style={{ width: `${plan === "business" ? 15 : usagePercent}%` }}
                />
              </div>
            </div>

            {/* 2. Open Action Items */}
            <div className="bg-card border border-line rounded-2xl p-5 shadow-2xs hover:border-amber/40 transition-all relative overflow-hidden group">
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-ink-3 mb-2 flex items-center justify-between">
                <span>Action Matrix</span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber animate-pulse shadow-[0_0_6px_#F5A020]" />
              </div>
              <div className="flex items-baseline justify-between gap-1.5">
                <div>
                  <span className="text-[28px] sm:text-[32px] font-black tracking-tight text-amber">
                    {actionsList.filter((a) => !a.completed).length}
                  </span>
                  <span className="text-[13px] text-ink-3 ml-1 font-medium">pending tasks</span>
                </div>
                <div className="px-2 py-0.5 rounded-md bg-amber-wash border border-amber/30 text-amber text-[10px] font-mono font-bold">
                  2 Due Soon
                </div>
              </div>
              <div className="text-[11.5px] text-ink-3 mt-3 flex items-center gap-1.5 font-mono">
                <span className="text-teal font-bold">✓</span> Auto-synced to Linear &amp; Slack
              </div>
            </div>

            {/* 3. Decisions Logged */}
            <div className="bg-card border border-line rounded-2xl p-5 shadow-2xs hover:border-indigo/40 transition-all relative overflow-hidden group">
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-ink-3 mb-2 flex items-center justify-between">
                <span>Decisions Logged</span>
                <span className="w-2.5 h-2.5 rounded-full bg-indigo animate-pulse shadow-[0_0_6px_#4353FF]" />
              </div>
              <div className="flex items-baseline justify-between gap-1.5">
                <div>
                  <span className="text-[28px] sm:text-[32px] font-black tracking-tight text-indigo">
                    {fullRecapData.decisions.length}
                  </span>
                  <span className="text-[13px] text-ink-3 ml-1 font-medium">consensus items</span>
                </div>
                <div className="px-2 py-0.5 rounded-md bg-indigo-wash border border-indigo/25 text-indigo text-[10px] font-mono font-bold">
                  100% Score
                </div>
              </div>
              <div className="text-[11.5px] text-ink-3 mt-3 flex items-center gap-1.5 font-mono">
                <span className="text-indigo font-bold">●</span> Linked to Cross-Call Graph
              </div>
            </div>

            {/* 4. Hours Captured with Animated SVG Equalizer */}
            <div className="bg-card border border-line rounded-2xl p-5 shadow-2xs hover:border-teal/40 transition-all relative overflow-hidden group">
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-ink-3 mb-2 flex items-center justify-between">
                <span>Audio Captured</span>
                <span className="w-2.5 h-2.5 rounded-full bg-teal animate-pulse shadow-[0_0_6px_#00D2B4]" />
              </div>
              <div className="flex items-baseline justify-between gap-1.5">
                <div>
                  <span className="text-[28px] sm:text-[32px] font-black tracking-tight text-teal">
                    2.1h
                  </span>
                  <span className="text-[13px] text-ink-3 ml-1 font-medium">multilingual</span>
                </div>
                {/* Mini SVG Live Equalizer */}
                <div className="flex items-end gap-1 h-6 px-1.5 py-0.5 rounded bg-teal-wash/60 border border-teal/25">
                  <div className="w-1 bg-teal rounded-full animate-[wave_1s_ease-in-out_infinite]" style={{ height: '40%' }} />
                  <div className="w-1 bg-teal rounded-full animate-[wave_1s_ease-in-out_infinite_0.15s]" style={{ height: '80%' }} />
                  <div className="w-1 bg-teal rounded-full animate-[wave_1s_ease-in-out_infinite_0.3s]" style={{ height: '60%' }} />
                  <div className="w-1 bg-teal rounded-full animate-[wave_1s_ease-in-out_infinite_0.45s]" style={{ height: '100%' }} />
                </div>
              </div>
              <div className="text-[11.5px] text-ink-3 mt-3 flex items-center gap-1.5 font-mono">
                <span className="text-teal font-bold">●</span> Scripra Acoustic Core
              </div>
            </div>
          </div>

          {/* Quick Launch Studio Banner with Cybernetic Glow */}
          <div className="relative rounded-2xl p-5 bg-gradient-to-r from-indigo/15 via-[#090D1A] to-indigo/10 border border-indigo/35 shadow-[0_8px_30px_rgba(67,83,255,0.1)] overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="absolute top-0 right-0 w-64 h-full bg-teal/10 blur-2xl pointer-events-none" />
            
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-indigo text-white flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(67,83,255,0.4)] border border-indigo-lift">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z" />
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-[15px] font-extrabold text-ink dark:text-white">Active Meeting Capture Studio</h3>
                  <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-teal-wash text-teal font-bold border border-teal/30">
                    Ready
                  </span>
                </div>
                <p className="text-[12.5px] text-ink-3 dark:text-white/70">
                  Instant zero-latency capture across Teams, Webex, Zoom, Google Meet &amp; local browser audio.
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveTab("studio")}
              className="px-5 py-2.5 rounded-xl bg-indigo text-white font-bold text-[13px] hover:bg-indigo-deep transition-all shadow-md shadow-indigo/25 flex items-center justify-center gap-2 self-start sm:self-auto flex-shrink-0 active:scale-[0.98] relative z-10"
            >
              <span>Launch Meeting Studio</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>

          {/* Two-Column Grid: Latest Intelligence (Left 60%) + Action Items & Memory (Right 40%) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Latest Meeting Intelligence Card with Waveform Scrubber */}
              <div className="bg-card border border-line rounded-2xl p-5 sm:p-6 shadow-2xs hover:border-indigo/30 transition-all">
                <div className="flex items-center justify-between pb-3.5 border-b border-line mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider bg-indigo-wash text-indigo px-2.5 py-0.5 rounded-md border border-indigo/20">
                      Latest MoM &amp; Synthesis
                    </span>
                    <span className="text-[12px] text-ink-3 font-mono">Sep 2 · 42m</span>
                  </div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-raise text-ink-2 border border-line">
                    Google Meet
                  </span>
                </div>

                <h3 className="text-[17px] font-black text-ink mb-3">
                  Product Review — August Release &amp; Roadmap
                </h3>

                {/* Futuristic Simulated Audio Waveform Bar with Timestamp Controls */}
                <div className="mb-4 p-3 rounded-xl bg-[#090D1A] border border-indigo/30 flex items-center gap-3 shadow-inner">
                  <button className="w-8 h-8 rounded-lg bg-indigo text-white flex items-center justify-center shrink-0 shadow-xs hover:bg-indigo-deep transition-all">
                    <span className="text-xs">▶</span>
                  </button>
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="flex items-center justify-between text-[10px] font-mono text-white/60 mb-1">
                      <span className="text-teal font-bold">12:04 / 42:18</span>
                      <span className="text-indigo-lift">Antony speaking (99.4% precision)</span>
                    </div>
                    {/* SVG Waveform Bars */}
                    <div className="flex items-center gap-1 h-5 w-full">
                      {[35, 60, 85, 40, 95, 70, 50, 80, 100, 65, 45, 90, 75, 40, 60, 80, 95, 55, 70, 85, 40, 65, 90, 75, 50, 85, 60, 45, 70, 95, 40, 60].map((h, i) => (
                        <div
                          key={i}
                          className={`flex-1 rounded-full ${i < 10 ? "bg-teal" : "bg-white/20"} transition-all`}
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Executive Summary */}
                <div className="mb-4">
                  <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-ink-3 mb-1.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal" />
                    <span>Executive Summary</span>
                  </div>
                  <p className="text-[13.5px] leading-[1.65] text-ink bg-raise/50 p-3.5 rounded-xl border border-line font-medium">
                    {fullRecapData.executiveRecap}
                  </p>
                </div>

                {/* Key Decisions Preview */}
                <div className="mb-4">
                  <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo mb-2 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-indigo animate-pulse" />
                    <span>Strategic Decisions (2)</span>
                  </div>
                  <div className="space-y-2">
                    {fullRecapData.decisions.map((d, idx) => (
                      <div key={idx} className="bg-raise/40 border border-line p-3 rounded-xl flex items-center justify-between text-[13px] hover:border-indigo/30 transition-colors">
                        <span className="font-semibold text-ink">{d.title}</span>
                        <span className="text-[11px] font-mono font-bold text-teal bg-teal-wash px-2 py-0.5 rounded border border-teal/20">
                          {d.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Teaser Bullets if Free Tier */}
                {plan === "free" && (
                  <div className="mt-4 pt-4 border-t border-line">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-ink-3 mb-2 flex items-center justify-between">
                      <span>Preview Highlights</span>
                      <span className="text-[10px] text-indigo font-bold cursor-pointer" onClick={() => openUpgradeModal("pro")}>
                        Unlock Full MoM ↗
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {teaserBullets.map((b, i) => (
                        <li key={i} className="text-[13px] text-ink-2 flex items-start gap-2">
                          <span className="text-indigo font-bold">•</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Recent Recorded Conversations */}
              <div className="bg-card border border-line rounded-2xl p-5 sm:p-6 shadow-2xs">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-line">
                  <div>
                    <h3 className="text-[15px] font-bold text-ink">Recent Conversations</h3>
                    <p className="text-[12px] text-ink-3">Searchable meeting logs with speaker diarization</p>
                  </div>
                  <Link
                    href="/dashboard/conversations"
                    className="text-[12px] font-bold text-indigo hover:underline flex items-center gap-1"
                  >
                    <span>View all</span>
                    <span>→</span>
                  </Link>
                </div>

                <div className="space-y-2.5">
                  {recentConversations.map((conv) => (
                    <Link
                      key={conv.id}
                      href={`/dashboard/conversations/${conv.id}`}
                      className="group flex items-center justify-between p-3.5 rounded-xl border border-line bg-raise/20 hover:bg-raise hover:border-indigo/40 transition-all"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-[20px]">
                          {platformBadges[conv.platform]?.icon || "💬"}
                        </span>
                        <div className="min-w-0">
                          <h4 className="text-[13.5px] font-semibold text-ink group-hover:text-indigo transition-colors truncate">
                            {conv.title}
                          </h4>
                          <p className="text-[11.5px] text-ink-3 font-mono mt-0.5">
                            {conv.date} · {conv.duration} · {conv.speakers} speakers
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                        <span className="hidden sm:inline-block text-[11px] font-mono text-ink-3 bg-raise px-2 py-0.5 rounded border border-line">
                          {conv.decisions} decisions
                        </span>
                        <span className="text-ink-3 group-hover:text-indigo transition-colors text-sm">
                          →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Action Commitments Matrix */}
              <div className="bg-card border border-line rounded-2xl p-5 sm:p-6 shadow-2xs hover:border-amber/30 transition-all">
                <div className="flex items-center justify-between pb-3.5 border-b border-line mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber animate-pulse shadow-[0_0_8px_#F5A020]" />
                    <h3 className="text-[15px] font-black text-ink">Action Matrix</h3>
                  </div>
                  <Link
                    href="/dashboard/actions"
                    className="text-[12px] font-mono font-bold text-amber hover:underline flex items-center gap-1"
                  >
                    <span>View all (3)</span>
                    <span>→</span>
                  </Link>
                </div>

                <div className="space-y-2.5">
                  {actionsList.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleAction(item.id)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer select-none flex items-start gap-3 ${
                        item.completed
                          ? "bg-raise/20 border-line opacity-60"
                          : "bg-raise/50 border-line hover:border-amber/50 hover:bg-raise/80 shadow-2xs"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => {}}
                        className="mt-1 rounded text-amber focus:ring-amber cursor-pointer"
                      />
                      <div className="flex-1 min-w-0">
                        <p className={`text-[13px] font-semibold leading-snug ${
                          item.completed ? "line-through text-ink-3" : "text-ink"
                        }`}>
                          {item.task}
                        </p>
                        <div className="flex items-center justify-between mt-2.5 text-[11px] font-mono">
                          <span className="font-bold text-indigo bg-indigo-wash px-1.5 py-0.2 rounded">@{item.owner}</span>
                          <span className="text-amber-deep font-extrabold bg-amber-wash px-2 py-0.5 rounded border border-amber/20">{item.deadline}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Organization Memory Search Quick Card */}
              <div className="bg-card border border-line rounded-2xl p-5 shadow-2xs hover:border-indigo/40 transition-all relative overflow-hidden group">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-wash text-indigo flex items-center justify-center border border-indigo/25">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-[14px] font-black text-ink">Search Across Meetings</h4>
                    <p className="text-[11.5px] text-ink-3">Semantic vector recall over all historical calls</p>
                  </div>
                </div>

                <Link
                  href="/dashboard/search"
                  className="mt-3.5 flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl bg-raise/80 border border-line text-[12.5px] text-ink-3 hover:text-ink hover:border-indigo/40 transition-all group shadow-2xs"
                >
                  <span className="truncate text-ink font-medium">&ldquo;What did Michael commit to on Thursday?&rdquo;</span>
                  <span className="font-mono text-[10px] bg-card px-2 py-0.5 rounded border border-line group-hover:border-indigo/40 font-bold text-indigo">
                    ⌘K
                  </span>
                </Link>
              </div>

              {/* Chrome Extension Integration */}
              <div className="bg-gradient-to-br from-teal-wash/50 via-card to-card border border-teal/30 rounded-2xl p-5 shadow-2xs hover:border-teal/50 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal bg-teal-wash px-2 py-0.5 rounded border border-teal/20">
                    1-Click Capture
                  </span>
                  <span className="text-[11px] font-mono text-ink-3 font-semibold">v1.2.0</span>
                </div>
                <h4 className="text-[14.5px] font-black text-ink mb-1">
                  Scripra Chrome Extension
                </h4>
                <p className="text-[12px] text-ink-3 leading-relaxed mb-3.5">
                  Capture Google Meet and browser conferences directly with zero-bot invisible recording.
                </p>
                <Link
                  href="/product#extension"
                  className="inline-flex items-center gap-1.5 text-[12.5px] font-mono font-bold text-teal hover:text-teal-deep transition-colors"
                >
                  <span>Install Chrome Extension</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

