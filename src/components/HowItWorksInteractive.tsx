"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function HowItWorksInteractive() {
  const [activeStage, setActiveStage] = useState<number>(1);

  const stages = [
    {
      id: 1,
      num: "01",
      tabLabel: "Universal Capture",
      tag: "Ingestion & Diarization",
      title: "Universal Multi-Platform Capture",
      subtitle: "Join every call automatically or capture 100% bot-free from your browser.",
      color: "teal",
      highlights: [
        "Auto-joins Google Meet, Microsoft Teams, Zoom & Cisco Webex",
        "Supports Slack Huddles, Discord & in-person audio uploads",
        "100% Bot-Free mode: Zero visible participants on call",
        "Lossless 48kHz multi-speaker diarization & noise cancellation",
      ],
    },
    {
      id: 2,
      num: "02",
      tabLabel: "MoM Studio",
      tag: "MoM Studio & Decision Engine",
      title: "Real-Time Executive Intelligence",
      subtitle: "From 60-minute calls to structured executive Minutes of Meeting in 30 seconds.",
      color: "indigo",
      highlights: [
        "Instant Executive Summary with core context & conclusions",
        "Formal Decision Log with consensus score & alternatives considered",
        "Owner-assigned Action Items with due dates & priority flags",
        "Timestamped verbatim transcript with speaker verification",
      ],
    },
    {
      id: 3,
      num: "03",
      tabLabel: "Knowledge Graph",
      tag: "Cross-Meeting Knowledge Graph",
      title: "Living Organizational Memory",
      subtitle: "No isolated silos. Every conversation connects into a searchable knowledge graph.",
      color: "amber",
      highlights: [
        "Links decisions, topics, and people across weeks and months",
        "Ask natural questions: 'Why did we choose Redis over Memcached in July?'",
        "Detects contradictions & recurring topics across departments",
        "Enterprise access control: Users only search calls they have access to",
      ],
    },
    {
      id: 4,
      num: "04",
      tabLabel: "Enterprise Sync",
      tag: "Two-Way Enterprise Automation",
      title: "Instant Workflow Execution",
      subtitle: "Decisions and tasks route directly to your team's tools with zero copy-pasting.",
      color: "indigo",
      highlights: [
        "Creates formatted tickets in Linear, Jira, and Asana automatically",
        "Dispatches clean executive recaps to designated Slack channels",
        "Syncs meeting outcomes to Notion, Confluence, and HubSpot CRM",
        "Two-way status sync updates Scripra when Jira tickets resolve",
      ],
    },
  ];

  return (
    <div className="w-full">
      {/* 4-Stage Navigation Selector */}
      <div className="sticky top-20 z-30 bg-canvas/90 backdrop-blur-xl border-y border-line py-3.5 px-6 mb-16 shadow-xs">
        <div className="max-w-[1120px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3.5">
          {stages.map((stg) => {
            const isActive = activeStage === stg.id;
            return (
              <button
                key={stg.id}
                onClick={() => setActiveStage(stg.id)}
                className={`px-3 sm:px-4 py-2.5 rounded-xl font-bold text-[12.5px] sm:text-[13.5px] transition-all flex items-center justify-center gap-2 text-center ${
                  isActive
                    ? "bg-indigo text-white shadow-md shadow-indigo/20 scale-[1.02]"
                    : "bg-raise hover:bg-line/40 text-ink-3 hover:text-ink border border-line/40"
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-mono shrink-0 ${
                    isActive ? "bg-white/20 text-white" : "bg-card text-ink-3"
                  }`}
                >
                  {stg.num}
                </span>
                <span className="truncate">{stg.tabLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[1240px] mx-auto px-6">
        
        {/* Active Stage Hero Showcase */}
        {stages.map((stg) => {
          if (stg.id !== activeStage) return null;

          return (
            <div
              key={stg.id}
              className="bg-card border border-line rounded-3xl p-8 sm:p-12 shadow-[0_20px_50px_rgba(67,83,255,0.06)] mb-20 animate-fade-in"
            >
              <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-10 lg:gap-14 items-center">
                
                {/* Stage Info & Bullets */}
                <div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-wash text-indigo text-[11.5px] font-bold tracking-[0.14em] uppercase border border-indigo/20 mb-5">
                    <span className="w-2 h-2 rounded-full bg-indigo animate-pulse" />
                    Stage {stg.num} · {stg.tag}
                  </div>
                  <h2 className="text-[clamp(28px,3.8vw,44px)] font-black tracking-[-0.03em] text-ink leading-[1.15] mb-4">
                    {stg.title}
                  </h2>
                  <p className="text-[16px] sm:text-[18px] text-ink-3 leading-relaxed mb-8">
                    {stg.subtitle}
                  </p>

                  <div className="space-y-3.5 mb-8">
                    {stg.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-teal-wash text-teal font-bold flex items-center justify-center shrink-0 mt-0.5 text-xs">
                          ✓
                        </div>
                        <span className="text-[14px] sm:text-[15px] text-ink-2 font-medium leading-normal">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 pt-4 border-t border-line/70">
                    <button
                      onClick={() => setActiveStage((prev) => (prev % 4) + 1)}
                      className="px-5 py-2.5 rounded-xl bg-indigo text-white font-bold text-xs sm:text-sm hover:bg-indigo-deep transition-all shadow-xs flex items-center gap-2"
                    >
                      <span>Next Stage ({activeStage === 4 ? "01" : `0${activeStage + 1}`})</span>
                      <span>→</span>
                    </button>
                    <Link
                      href="/login"
                      className="text-xs sm:text-sm font-bold text-ink-3 hover:text-ink transition-colors"
                    >
                      Try with Google Auth ↗
                    </Link>
                  </div>
                </div>

                {/* Stage Concept-Specific Custom SVG Visual */}
                <div className="relative">
                  {/* Stage 01 Concept Image: Universal Ingestion Pipeline */}
                  {stg.id === 1 && (
                    <div className="bg-panel border border-line rounded-2xl p-6 shadow-inner relative overflow-hidden">
                      <div className="flex items-center justify-between pb-4 border-b border-line mb-6">
                        <span className="text-[11px] font-mono text-ink-3 uppercase tracking-wider">
                          MULTI-SOURCE AUDIO STREAM INGESTION
                        </span>
                        <span className="flex items-center gap-1.5 text-[11px] font-mono text-teal bg-teal-wash px-2 py-0.5 rounded-full font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal animate-ping" />
                          LIVE 48kHz LOSSLESS
                        </span>
                      </div>

                      {/* SVG Pipeline Animation */}
                      <svg viewBox="0 0 540 320" className="w-full h-auto drop-shadow-sm" fill="none">
                        {/* Background connection paths */}
                        <path d="M 120 60 C 220 60, 240 160, 320 160" stroke="#4353FF" strokeWidth="2.5" strokeDasharray="5 5" className="animate-[dash_12s_linear_infinite]" opacity="0.4" />
                        <path d="M 120 125 C 220 125, 240 160, 320 160" stroke="#0B5CFF" strokeWidth="2.5" strokeDasharray="5 5" className="animate-[dash_12s_linear_infinite]" opacity="0.5" />
                        <path d="M 120 195 C 220 195, 240 160, 320 160" stroke="#5059C9" strokeWidth="2.5" strokeDasharray="5 5" className="animate-[dash_12s_linear_infinite]" opacity="0.5" />
                        <path d="M 120 260 C 220 260, 240 160, 320 160" stroke="#00BC70" strokeWidth="2.5" strokeDasharray="5 5" className="animate-[dash_12s_linear_infinite]" opacity="0.4" />

                        {/* Input Source Badges (Left) */}
                        {/* Google Meet */}
                        <g transform="translate(20, 42)">
                          <rect width="105" height="36" rx="8" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1" />
                          <circle cx="18" cy="18" r="8" fill="#00AC47" />
                          <text x="32" y="22" fill="#111827" fontSize="11" fontWeight="700" fontFamily="sans-serif">Google Meet</text>
                        </g>

                        {/* Zoom */}
                        <g transform="translate(20, 107)">
                          <rect width="105" height="36" rx="8" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1" />
                          <circle cx="18" cy="18" r="8" fill="#0B5CFF" />
                          <text x="32" y="22" fill="#111827" fontSize="11" fontWeight="700" fontFamily="sans-serif">Zoom Calls</text>
                        </g>

                        {/* Teams */}
                        <g transform="translate(20, 177)">
                          <rect width="105" height="36" rx="8" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1" />
                          <circle cx="18" cy="18" r="8" fill="#5059C9" />
                          <text x="32" y="22" fill="#111827" fontSize="11" fontWeight="700" fontFamily="sans-serif">MS Teams</text>
                        </g>

                        {/* Webex / Slack */}
                        <g transform="translate(20, 242)">
                          <rect width="105" height="36" rx="8" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1" />
                          <circle cx="18" cy="18" r="8" fill="#00BC70" />
                          <text x="32" y="22" fill="#111827" fontSize="11" fontWeight="700" fontFamily="sans-serif">Webex/Slack</text>
                        </g>

                        {/* Center Ingestion Node */}
                        <g transform="translate(280, 110)">
                          <rect width="100" height="100" rx="20" fill="#4353FF" />
                          <circle cx="50" cy="50" r="35" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="4 4" className="animate-spin" />
                          <text x="50" y="47" fill="#FFFFFF" fontSize="10" fontWeight="800" fontFamily="monospace" textAnchor="middle">SCRIPRA</text>
                          <text x="50" y="62" fill="#A5B4FC" fontSize="9" fontWeight="700" fontFamily="sans-serif" textAnchor="middle">INGESTION</text>
                        </g>

                        {/* Output Stream: Multi-speaker Diarization (Right) */}
                        <path d="M 380 160 L 430 160" stroke="#4353FF" strokeWidth="3" markerEnd="url(#arrow)" />
                        
                        <g transform="translate(420, 85)">
                          <rect width="100" height="42" rx="10" fill="#FFFFFF" stroke="#4353FF" strokeWidth="1.5" />
                          <text x="12" y="18" fill="#4353FF" fontSize="9" fontWeight="800" fontFamily="monospace">SPEAKER 1</text>
                          <text x="12" y="32" fill="#111827" fontSize="10" fontWeight="600" fontFamily="sans-serif">Sarah (Product)</text>
                        </g>

                        <g transform="translate(420, 137)">
                          <rect width="100" height="42" rx="10" fill="#FFFFFF" stroke="#00D2B4" strokeWidth="1.5" />
                          <text x="12" y="18" fill="#00D2B4" fontSize="9" fontWeight="800" fontFamily="monospace">SPEAKER 2</text>
                          <text x="12" y="32" fill="#111827" fontSize="10" fontWeight="600" fontFamily="sans-serif">Alex (Engineering)</text>
                        </g>

                        <g transform="translate(420, 189)">
                          <rect width="100" height="42" rx="10" fill="#FFFFFF" stroke="#F5A020" strokeWidth="1.5" />
                          <text x="12" y="18" fill="#F5A020" fontSize="9" fontWeight="800" fontFamily="monospace">SPEAKER 3</text>
                          <text x="12" y="32" fill="#111827" fontSize="10" fontWeight="600" fontFamily="sans-serif">Maria (Design)</text>
                        </g>
                      </svg>
                      
                      <div className="mt-4 pt-3 border-t border-line flex items-center justify-between text-[11.5px] text-ink-3 font-mono">
                        <span>Capture mode: <strong>Bot or Bot-Free</strong></span>
                        <span className="text-teal font-bold">100% Calendar Synced</span>
                      </div>
                    </div>
                  )}

                  {/* Stage 02 Concept Image: MoM Studio & Decision Engine */}
                  {stg.id === 2 && (
                    <div className="bg-panel border border-line rounded-2xl p-6 shadow-inner">
                      <div className="flex items-center justify-between pb-4 border-b border-line mb-4">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-indigo" />
                          <span className="text-[12px] font-bold text-ink">Minutes of Meeting (MoM) Studio</span>
                        </div>
                        <span className="text-[10px] font-mono bg-indigo-wash text-indigo px-2 py-0.5 rounded font-bold">
                          GENERATED IN 24s
                        </span>
                      </div>

                      {/* Mock MoM Document */}
                      <div className="space-y-4">
                        {/* Executive Summary Card */}
                        <div className="bg-card border border-line rounded-xl p-4">
                          <div className="text-[10px] font-mono uppercase tracking-wider text-ink-3 mb-1 font-bold">
                            EXECUTIVE SUMMARY
                          </div>
                          <p className="text-[12.5px] text-ink-2 font-medium leading-relaxed">
                            Team aligned on adopting Redis session clustering for the Q3 enterprise launch. Launch timeline extended by two weeks to ensure stress testing and failover verification.
                          </p>
                        </div>

                        {/* Tagged Decision */}
                        <div className="bg-card border-l-4 border-l-indigo border border-line rounded-xl p-4">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[10.5px] font-mono uppercase tracking-wider text-indigo font-bold flex items-center gap-1.5">
                              <span>⭐</span> DECISION LOGGED · 05:10
                            </span>
                            <span className="text-[10px] bg-teal-wash text-teal font-bold px-1.5 py-0.5 rounded">
                              94% CONSENSUS
                            </span>
                          </div>
                          <p className="text-[13px] font-bold text-ink">
                            Migrate session cache to Redis and schedule zero-downtime cutover for Aug 18.
                          </p>
                          <div className="mt-2 text-[11px] text-ink-3">
                            Alternatives discarded: Memcached (lacks key eviction persistence).
                          </div>
                        </div>

                        {/* Action Items List */}
                        <div className="bg-card border border-line rounded-xl p-4">
                          <div className="text-[10px] font-mono uppercase tracking-wider text-amber font-bold mb-2 flex items-center gap-1">
                            <span>⚡</span> ACTION ITEMS (2)
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-[12px] pb-1.5 border-b border-line/60">
                              <span className="font-semibold text-ink">Draft Redis failover replication plan</span>
                              <span className="font-mono text-[10.5px] bg-raise px-2 py-0.5 rounded text-indigo font-bold">
                                @Alex · Due Aug 12
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-[12px]">
                              <span className="font-semibold text-ink">Update SLA documentation for enterprise clients</span>
                              <span className="font-mono text-[10.5px] bg-raise px-2 py-0.5 rounded text-indigo font-bold">
                                @Sarah · Due Aug 15
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Stage 03 Concept Image: Living Knowledge Graph */}
                  {stg.id === 3 && (
                    <div className="bg-panel border border-line rounded-2xl p-6 shadow-inner">
                      <div className="flex items-center justify-between pb-4 border-b border-line mb-4">
                        <span className="text-[11px] font-mono text-ink-3 uppercase tracking-wider">
                          CROSS-MEETING KNOWLEDGE GRAPH
                        </span>
                        <span className="text-[10px] font-mono bg-amber-wash text-amber px-2 py-0.5 rounded font-bold">
                          1,480 CONNECTED NODES
                        </span>
                      </div>

                      {/* Interactive Simulated Semantic Query Bar */}
                      <div className="bg-card border border-line rounded-xl p-3 mb-4 flex items-center gap-2.5 shadow-xs">
                        <span className="text-indigo text-sm">🔍</span>
                        <span className="text-[12px] font-mono text-ink font-semibold">
                          &quot;Why did we postpone the enterprise launch in August?&quot;
                        </span>
                      </div>

                      {/* SVG Knowledge Graph with Linked Meetings */}
                      <svg viewBox="0 0 460 210" className="w-full h-auto drop-shadow-sm" fill="none">
                        {/* Connecting Graph Lines */}
                        <line x1="230" y1="105" x2="90" y2="50" stroke="#4353FF" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />
                        <line x1="230" y1="105" x2="90" y2="160" stroke="#F5A020" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />
                        <line x1="230" y1="105" x2="370" y2="60" stroke="#00D2B4" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />
                        <line x1="230" y1="105" x2="370" y2="155" stroke="#4353FF" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />

                        {/* Central Query Hub */}
                        <g transform="translate(165, 75)">
                          <rect width="130" height="60" rx="14" fill="#4353FF" />
                          <text x="65" y="27" fill="#FFFFFF" fontSize="10.5" fontWeight="800" fontFamily="sans-serif" textAnchor="middle">KNOWLEDGE HUB</text>
                          <text x="65" y="44" fill="#C7D2FE" fontSize="9" fontWeight="600" fontFamily="monospace" textAnchor="middle">Cross-Meeting Citations</text>
                        </g>

                        {/* Node 1: Architecture Review Call */}
                        <g transform="translate(20, 25)">
                          <rect width="125" height="48" rx="10" fill="#FFFFFF" stroke="#4353FF" strokeWidth="1.5" />
                          <text x="10" y="20" fill="#4353FF" fontSize="9" fontWeight="800" fontFamily="monospace">CALL · AUG 04</text>
                          <text x="10" y="36" fill="#111827" fontSize="10.5" fontWeight="700" fontFamily="sans-serif">Redis Architecture</text>
                        </g>

                        {/* Node 2: Decision Node */}
                        <g transform="translate(20, 135)">
                          <rect width="125" height="48" rx="10" fill="#FFFFFF" stroke="#F5A020" strokeWidth="1.5" />
                          <text x="10" y="20" fill="#F5A020" fontSize="9" fontWeight="800" fontFamily="monospace">DECISION #419</text>
                          <text x="10" y="36" fill="#111827" fontSize="10.5" fontWeight="700" fontFamily="sans-serif">Failover Stability</text>
                        </g>

                        {/* Node 3: Executive Sync */}
                        <g transform="translate(300, 35)">
                          <rect width="135" height="48" rx="10" fill="#FFFFFF" stroke="#00D2B4" strokeWidth="1.5" />
                          <text x="10" y="20" fill="#00D2B4" fontSize="9" fontWeight="800" fontFamily="monospace">CALL · AUG 11</text>
                          <text x="10" y="36" fill="#111827" fontSize="10.5" fontWeight="700" fontFamily="sans-serif">Timeline Alignment</text>
                        </g>

                        {/* Node 4: Linear Sync Ticket */}
                        <g transform="translate(300, 130)">
                          <rect width="135" height="48" rx="10" fill="#FFFFFF" stroke="#4353FF" strokeWidth="1.5" />
                          <text x="10" y="20" fill="#4353FF" fontSize="9" fontWeight="800" fontFamily="monospace">LINEAR · SCR-104</text>
                          <text x="10" y="36" fill="#111827" fontSize="10.5" fontWeight="700" fontFamily="sans-serif">Load Test Cluster</text>
                        </g>
                      </svg>

                      {/* Cited Answer */}
                      <div className="bg-card border border-line rounded-xl p-3.5 mt-3 text-[12px] text-ink-2 leading-relaxed">
                        <span className="font-bold text-teal">Answer: </span>
                        The launch was postponed by 14 days during the Aug 4 Architecture Review to ensure Redis failover replication passed security stress testing before client onboarding.
                      </div>
                    </div>
                  )}

                  {/* Stage 04 Concept Image: Two-Way Enterprise Sync */}
                  {stg.id === 4 && (
                    <div className="bg-panel border border-line rounded-2xl p-6 shadow-inner">
                      <div className="flex items-center justify-between pb-4 border-b border-line mb-4">
                        <span className="text-[11px] font-mono text-ink-3 uppercase tracking-wider">
                          AUTOMATED WORKFLOW DISPATCH
                        </span>
                        <span className="text-[10px] font-mono bg-teal-wash text-teal px-2 py-0.5 rounded font-bold">
                          WEBHOOK STATUS: 200 OK
                        </span>
                      </div>

                      {/* 4 Dispatch Cards */}
                      <div className="grid grid-cols-2 gap-3.5">
                        {/* Linear Ticket */}
                        <div className="bg-card border border-line rounded-xl p-3.5">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="font-mono text-[10px] text-indigo font-bold">LINEAR</span>
                            <span className="w-2 h-2 rounded-full bg-teal" />
                          </div>
                          <div className="text-[12px] font-bold text-ink truncate">SCR-104 · Redis Deploy</div>
                          <div className="text-[10.5px] text-ink-3 mt-1 font-mono">Assigned to @Alex · P1</div>
                        </div>

                        {/* Jira Ticket */}
                        <div className="bg-card border border-line rounded-xl p-3.5">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="font-mono text-[10px] text-[#0052CC] font-bold">JIRA</span>
                            <span className="w-2 h-2 rounded-full bg-teal" />
                          </div>
                          <div className="text-[12px] font-bold text-ink truncate">PROD-249 · Security Audit</div>
                          <div className="text-[10.5px] text-ink-3 mt-1 font-mono">Due Aug 18 · Verified</div>
                        </div>

                        {/* Slack Broadcast */}
                        <div className="bg-card border border-line rounded-xl p-3.5">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="font-mono text-[10px] text-[#4A154B] font-bold">SLACK</span>
                            <span className="w-2 h-2 rounded-full bg-teal" />
                          </div>
                          <div className="text-[12px] font-bold text-ink truncate">#eng-announcements</div>
                          <div className="text-[10.5px] text-ink-3 mt-1 font-mono">Executive MoM Sent ↗</div>
                        </div>

                        {/* Notion Hub */}
                        <div className="bg-card border border-line rounded-xl p-3.5">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="font-mono text-[10px] text-ink font-bold">NOTION</span>
                            <span className="w-2 h-2 rounded-full bg-teal" />
                          </div>
                          <div className="text-[12px] font-bold text-ink truncate">Architecture RFC Database</div>
                          <div className="text-[10.5px] text-ink-3 mt-1 font-mono">Page Updated · Auto-tagged</div>
                        </div>
                      </div>

                      <div className="mt-4 p-3 rounded-xl bg-raise border border-line text-[11.5px] text-ink-3 flex items-center justify-between">
                        <span>Human copy-pasting required:</span>
                        <strong className="text-teal font-bold">0 minutes</strong>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          );
        })}

        {/* Comparison Matrix: Before vs. With Scripra */}
        <div className="bg-panel border border-line rounded-3xl p-8 sm:p-12 mb-20">
          <div className="text-center max-w-[680px] mx-auto mb-10">
            <h3 className="text-[26px] sm:text-[34px] font-black tracking-tight text-ink mb-3">
              The Evolution of Meeting Workflows
            </h3>
            <p className="text-[15px] sm:text-[16px] text-ink-3">
              See why high-velocity engineering and revenue teams replace disjointed recording tools with Scripra.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Legacy Approach */}
            <div className="bg-card border border-line/80 rounded-2xl p-6 relative overflow-hidden">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-3 h-3 rounded-full bg-rose" />
                <span className="text-[13px] font-bold font-mono uppercase tracking-wider text-rose">
                  Legacy Note-Taking &amp; Transcripts
                </span>
              </div>
              <ul className="space-y-3 text-[13.5px] text-ink-3">
                <li className="flex items-start gap-2.5">
                  <span className="text-rose font-bold">✕</span>
                  <span>45 minutes spent after each call formatting notes and assigning tasks.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose font-bold">✕</span>
                  <span>Walls of raw, unstructured transcripts that no one reads or reviews.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose font-bold">✕</span>
                  <span>Critical decisions forgotten within 3 weeks; identical debates repeated.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose font-bold">✕</span>
                  <span>Tasks manually copied into Jira or Slack, resulting in dropped follow-ups.</span>
                </li>
              </ul>
            </div>

            {/* Scripra Intelligence */}
            <div className="bg-card border-2 border-indigo/40 rounded-2xl p-6 relative overflow-hidden shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-3 h-3 rounded-full bg-teal" />
                <span className="text-[13px] font-bold font-mono uppercase tracking-wider text-indigo">
                  With Scripra Intelligence
                </span>
              </div>
              <ul className="space-y-3 text-[13.5px] text-ink-2 font-medium">
                <li className="flex items-start gap-2.5">
                  <span className="text-teal font-bold">✓</span>
                  <span>Instant Executive MoM ready in 30 seconds with 0 manual effort.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-teal font-bold">✓</span>
                  <span>Structured Decision Logs with consensus ratings and rationale.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-teal font-bold">✓</span>
                  <span>Cross-meeting Knowledge Graph recalls exact context across months.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-teal font-bold">✓</span>
                  <span>Automatic 2-way sync to Linear, Jira, Slack, Notion, and Salesforce.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Enterprise FAQ */}
        <div className="max-w-[800px] mx-auto mb-20">
          <div className="text-center mb-8">
            <h3 className="text-[22px] sm:text-[28px] font-black tracking-tight text-ink mb-2">
              Frequently Asked Questions
            </h3>
            <p className="text-[14px] text-ink-3">
              Clear answers to technical and operational questions.
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-card border border-line rounded-2xl p-5">
              <h4 className="text-[15px] font-bold text-ink mb-1.5">
                Can Scripra capture calls without inviting a bot?
              </h4>
              <p className="text-[13.5px] text-ink-3 leading-relaxed">
                Yes. In addition to our automated calendar bot that joins Zoom, Teams, Meet, and Webex, Scripra offers 100% Bot-Free local audio capture directly via your Chrome or Edge browser extension with zero bot presence visible on the call.
              </p>
            </div>

            <div className="bg-card border border-line rounded-2xl p-5">
              <h4 className="text-[15px] font-bold text-ink mb-1.5">
                Do you train AI models on our proprietary conversations?
              </h4>
              <p className="text-[13.5px] text-ink-3 leading-relaxed">
                Never. We have strict zero-retention and zero-training policies with our AI foundation providers. Your conversation audio, transcripts, and organizational memory are encrypted with AES-256 and never used for public model training.
              </p>
            </div>

            <div className="bg-card border border-line rounded-2xl p-5">
              <h4 className="text-[15px] font-bold text-ink mb-1.5">
                How does Scripra differentiate speakers in a crowded meeting?
              </h4>
              <p className="text-[13.5px] text-ink-3 leading-relaxed">
                Scripra utilizes multi-channel acoustic diarization and voiceprint matching to accurately isolate each participant even when speakers overlap, attributing decisions and action items to the exact individual.
              </p>
            </div>
          </div>
        </div>

        {/* Final Page CTA */}
        <div className="bg-gradient-to-br from-indigo-wash/80 via-canvas to-teal-wash/60 border border-line rounded-3xl p-10 sm:p-14 text-center mb-20 shadow-sm">
          <h3 className="text-[clamp(26px,3.5vw,42px)] font-black tracking-tight text-ink mb-4">
            Ready to turn team conversations into permanent intelligence?
          </h3>
          <p className="text-[16px] text-ink-3 max-w-[560px] mx-auto mb-8">
            Get started in less than 60 seconds with 1-click Google authentication. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="px-8 py-4 rounded-2xl bg-indigo text-white font-bold text-[15px] hover:bg-indigo-deep transition-all shadow-md shadow-indigo/25 active:scale-[0.99]"
            >
              Get Started Free with Google ↗
            </Link>
            <Link
              href="/demo"
              className="px-8 py-4 rounded-2xl bg-card border border-line hover:bg-raise text-ink font-bold text-[15px] transition-all"
            >
              Interactive Product Tour
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
