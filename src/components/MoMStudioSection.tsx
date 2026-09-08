"use client";

import React, { useState } from "react";

interface MeetingTemplate {
  type: string;
  badge: string;
  title: string;
  time: string;
  summary: string;
  decisions: string[];
  tasks: { title: string; assignee: string; due: string; platform: string }[];
}

export default function MoMStudioSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [synced, setSynced] = useState<Record<number, boolean>>({});
  const [viewMode, setViewMode] = useState<"studio" | "visual">("studio");

  const templates: MeetingTemplate[] = [
    {
      type: "Engineering",
      badge: "Sprint Planning",
      title: "Sprint 42 Architecture & Release Sync",
      time: "42 min · Teams",
      summary:
        "The team agreed to ship the core Webex and Teams live audio diarization pipelines this Friday. Antony will lead production verification on Thursday, while Sarah coordinates user feedback loops.",
      decisions: [
        "Deploy Scripra Neural audio processing directly to edge runtimes for <300ms transcription latency.",
        "Delay secondary billing tier rollout until security audit closes on the 24th.",
      ],
      tasks: [
        { title: "Run end-to-end load testing on Webex audio streamer", assignee: "Antony", due: "Thursday", platform: "Linear" },
        { title: "Finalize interactive comparison matrix for marketing", assignee: "Sarah", due: "Wednesday", platform: "Jira" },
      ],
    },
    {
      type: "Executive",
      badge: "Board & Leadership",
      title: "Quarterly Strategy & Expansion Review",
      time: "55 min · Zoom",
      summary:
        "Leadership reviewed Q3 revenue targets and approved the direct integration roadmap for Slack Huddles and Discord voice channels. Enterprise compliance (SOC 2 Type II) is on track for Q4.",
      decisions: [
        "Allocate $120k infrastructure budget for multi-region WebRTC listener relays.",
        "Prioritize enterprise SSO/SAML integration ahead of self-serve team plans.",
      ],
      tasks: [
        { title: "Sign master service agreement with enterprise pilot", assignee: "Michael", due: "Friday", platform: "Salesforce" },
        { title: "Publish updated data retention and security manifesto", assignee: "Elena", due: "Monday", platform: "Notion" },
      ],
    },
    {
      type: "Sales",
      badge: "Customer Discovery",
      title: "Enterprise Deal Review · Acme Corp",
      time: "28 min · Google Meet",
      summary:
        "Customer confirmed a requirement for 90-day automatic transcript retention and HIPAA compliance. They are migrating from Otter due to lack of Webex and custom CRM synchronization.",
      decisions: [
        "Approved 50-seat pilot pending compliance review.",
        "Offer custom Salesforce field mapping for automated deal notes.",
      ],
      tasks: [
        { title: "Send custom security packet & SOC 2 report to CISO", assignee: "David", due: "Tomorrow", platform: "HubSpot" },
        { title: "Configure sandbox organization with SSO enforce", assignee: "Alex", due: "Thursday", platform: "Slack" },
      ],
    },
  ];

  const current = templates[activeTab];

  const toggleSync = (idx: number) => {
    setSynced((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <section id="mom" className="py-24 sm:py-32 px-6 bg-raise/50 border-t border-line/60 relative overflow-hidden">
      <div className="max-w-[1320px] mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-[760px] mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-wash text-amber-deep text-[11px] font-bold tracking-[0.15em] uppercase border border-amber/30 mb-4">
            <span className="w-2 h-2 rounded-full bg-amber" />
            Stage 02 · Minutes of Meeting (MoM)
          </div>
          <h2 className="text-[clamp(32px,4.5vw,52px)] font-black tracking-[-0.03em] text-ink leading-[1.1] mb-5">
            Zero note-taking. <br className="hidden sm:inline" />
            <span className="text-indigo">Instant executive decisions.</span>
          </h2>
          <p className="text-[16px] sm:text-[18px] text-ink-3 leading-relaxed">
            While competitors hand you unorganized transcripts, Scripra synthesizes structured Minutes of Meeting (MoM) and auto-assigns actionable tasks with one-click workflow sync.
          </p>
        </div>

        {/* Template Switcher Tabs */}
        <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
          {templates.map((t, idx) => (
            <button
              key={t.type}
              onClick={() => setActiveTab(idx)}
              className={`px-5 py-2.5 rounded-xl text-[13.5px] font-bold transition-all flex items-center gap-2 ${
                activeTab === idx
                  ? "bg-indigo text-white shadow-md shadow-indigo/25 scale-[1.02]"
                  : "bg-card text-ink-2 border border-line/70 hover:border-indigo/40"
              }`}
            >
              <span>{t.type}</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-md font-mono ${
                  activeTab === idx ? "bg-white/20 text-white" : "bg-raise text-ink-3"
                }`}
              >
                {t.badge}
              </span>
            </button>
          ))}
        </div>

        {/* The MoM Studio Artifact Card */}
        <div className="max-w-[1080px] mx-auto bg-card border border-line rounded-3xl p-6 sm:p-10 shadow-[0_25px_60px_rgba(67,83,255,0.08)]">
          
          {/* Card Top Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-line/70">
            <div>
              <div className="flex items-center gap-2.5 mb-1.5">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-indigo-wash text-indigo border border-indigo/20">
                  {current.badge}
                </span>
                <span className="text-[12px] font-mono text-ink-3">{current.time}</span>
              </div>
              <h3 className="text-[20px] sm:text-[24px] font-black text-ink tracking-tight">
                {current.title}
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 p-1 bg-raise border border-line rounded-lg">
                <button
                  onClick={() => setViewMode("studio")}
                  className={`px-2.5 py-1 rounded text-[11px] font-bold font-mono transition-all ${
                    viewMode === "studio"
                      ? "bg-card text-ink shadow-xs"
                      : "text-ink-3 hover:text-ink"
                  }`}
                >
                  📑 Studio View
                </button>
                <button
                  onClick={() => setViewMode("visual")}
                  className={`px-2.5 py-1 rounded text-[11px] font-bold font-mono transition-all ${
                    viewMode === "visual"
                      ? "bg-indigo text-white shadow-xs"
                      : "text-ink-3 hover:text-ink"
                  }`}
                >
                  ✨ 3D Executive Console
                </button>
              </div>

              <span className="hidden sm:flex text-[12px] font-mono text-teal bg-teal-wash px-3 py-1.5 rounded-lg border border-teal/25 font-bold items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
                Scripra Synthesized
              </span>
            </div>
          </div>

          {/* 3D Visual View Mode */}
          {viewMode === "visual" ? (
            <div className="mb-8 relative rounded-2xl overflow-hidden border-2 border-indigo/40 shadow-xl group">
              <img
                src="/images/concept-mom-studio.jpg"
                alt="Scripra Executive MoM Studio & Decision Engine"
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.01]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070A12]/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between p-3 rounded-xl bg-[#090D1A]/90 border border-indigo/30 backdrop-blur-md text-white text-[11px] font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber animate-ping" />
                  <span className="text-amber font-bold">Executive Decision Log &amp; Multi-Tool Dispatch Active</span>
                </div>
                <span className="text-teal font-semibold">Slack · Jira · Linear · Notion</span>
              </div>
            </div>
          ) : null}

          {/* Futuristic SVG Neural Synthesis Engine Graphic */}
          <div className="mb-8 p-4 rounded-2xl bg-[#090D1A] border border-indigo/30 relative overflow-hidden shadow-inner">
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage: "linear-gradient(to right, #4353FF 1px, transparent 1px), linear-gradient(to bottom, #4353FF 1px, transparent 1px)",
                backgroundSize: "16px 16px",
              }}
            />
            <div className="relative z-10">
              <div className="flex items-center justify-between text-[11px] font-mono text-white/70 mb-2 pb-2 border-b border-white/10">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
                  <strong className="text-teal font-bold uppercase tracking-wider">Neural Synthesis Pipeline</strong>
                </span>
                <span className="text-indigo-lift">Voice Audio → Structured MoM Tokens &amp; Actions</span>
              </div>

              <div className="w-full h-24 sm:h-28 flex items-center justify-center">
                <svg viewBox="0 0 800 100" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="synthGradLeft" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#00D2B4" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#4353FF" stopOpacity="1" />
                    </linearGradient>
                    <linearGradient id="synthGradRight1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#4353FF" stopOpacity="1" />
                      <stop offset="100%" stopColor="#707EFF" stopOpacity="0.9" />
                    </linearGradient>
                    <linearGradient id="synthGradRight2" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#4353FF" stopOpacity="1" />
                      <stop offset="100%" stopColor="#00D2B4" stopOpacity="0.9" />
                    </linearGradient>
                    <linearGradient id="synthGradRight3" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#4353FF" stopOpacity="1" />
                      <stop offset="100%" stopColor="#F5A020" stopOpacity="0.9" />
                    </linearGradient>
                    <filter id="synthGlow" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="2.5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Incoming Raw Voice Waves */}
                  <path
                    d="M 20 50 Q 80 15, 140 50 T 260 50 T 380 50"
                    fill="none"
                    stroke="url(#synthGradLeft)"
                    strokeWidth="2.2"
                    strokeDasharray="6 4"
                    className="animate-[dash_2s_linear_infinite]"
                  />
                  <path
                    d="M 20 50 Q 80 85, 140 50 T 260 50 T 380 50"
                    fill="none"
                    stroke="#00D2B4"
                    strokeWidth="1.2"
                    opacity="0.4"
                    strokeDasharray="4 4"
                    className="animate-[dash_3s_linear_infinite_reverse]"
                  />

                  {/* Left Label */}
                  <text x="60" y="80" fill="#00D2B4" fontSize="10" fontFamily="monospace" fontWeight="bold">
                    RAW VOICE STREAM
                  </text>

                  {/* Central Neural Synthesis Node */}
                  <g transform="translate(400, 50)">
                    {/* Pulsing Aura */}
                    <circle r="26" fill="none" stroke="#4353FF" strokeWidth="1.5" opacity="0.4" className="animate-ping" />
                    <circle r="22" fill="#0F172A" stroke="#707EFF" strokeWidth="2" filter="url(#synthGlow)" />
                    <circle r="12" fill="#4353FF" opacity="0.8" />
                    <circle r="5" fill="#FFFFFF" />
                    <text x="0" y="-28" fill="#FFFFFF" fontSize="9" textAnchor="middle" fontFamily="monospace" fontWeight="bold">
                      SCRIPRA SLM CORE
                    </text>
                    <text x="0" y="38" fill="#00D2B4" fontSize="8.5" textAnchor="middle" fontFamily="monospace">
                      &lt;280ms
                    </text>
                  </g>

                  {/* Outgoing Conduits */}
                  <path
                    id="mom-out-1"
                    d="M 425 45 C 500 45, 540 25, 620 25"
                    fill="none"
                    stroke="url(#synthGradRight1)"
                    strokeWidth="2"
                    strokeDasharray="5 5"
                    className="animate-[dash_2s_linear_infinite]"
                  />
                  <path
                    id="mom-out-2"
                    d="M 425 50 C 500 50, 540 50, 620 50"
                    fill="none"
                    stroke="url(#synthGradRight2)"
                    strokeWidth="2"
                    strokeDasharray="5 5"
                    className="animate-[dash_2s_linear_infinite]"
                  />
                  <path
                    id="mom-out-3"
                    d="M 425 55 C 500 55, 540 75, 620 75"
                    fill="none"
                    stroke="url(#synthGradRight3)"
                    strokeWidth="2"
                    strokeDasharray="5 5"
                    className="animate-[dash_2s_linear_infinite]"
                  />

                  {/* Gliding Structured Tokens / Packets */}
                  <circle r="3.5" fill="#707EFF" filter="url(#synthGlow)">
                    <animateMotion dur="1.8s" repeatCount="indefinite" path="M 425 45 C 500 45, 540 25, 620 25" />
                  </circle>
                  <circle r="3.5" fill="#00D2B4" filter="url(#synthGlow)">
                    <animateMotion dur="2.1s" repeatCount="indefinite" path="M 425 50 C 500 50, 540 50, 620 50" />
                  </circle>
                  <circle r="3.5" fill="#F5A020" filter="url(#synthGlow)">
                    <animateMotion dur="2.4s" repeatCount="indefinite" path="M 425 55 C 500 55, 540 75, 620 75" />
                  </circle>

                  {/* Output Node Tokens */}
                  <g transform="translate(620, 25)">
                    <rect x="0" y="-11" width="150" height="22" rx="6" fill="#1E1B4B" stroke="#707EFF" strokeWidth="1.2" />
                    <text x="12" y="4" fill="#C7D2FE" fontSize="9.5" fontFamily="sans-serif" fontWeight="bold">
                      📑 Executive Summary
                    </text>
                  </g>

                  <g transform="translate(620, 50)">
                    <rect x="0" y="-11" width="150" height="22" rx="6" fill="#064E3B" stroke="#00D2B4" strokeWidth="1.2" />
                    <text x="12" y="4" fill="#A7F3D0" fontSize="9.5" fontFamily="sans-serif" fontWeight="bold">
                      ✓ Key Decisions Agreed
                    </text>
                  </g>

                  <g transform="translate(620, 75)">
                    <rect x="0" y="-11" width="150" height="22" rx="6" fill="#451A03" stroke="#F5A020" strokeWidth="1.2" />
                    <text x="12" y="4" fill="#FDE68A" fontSize="9.5" fontFamily="sans-serif" fontWeight="bold">
                      ⚡ Action Commitments
                    </text>
                  </g>
                </svg>
              </div>
            </div>
          </div>

          {/* 1. Executive Summary Box */}
          <div className="mb-6 p-5 sm:p-6 rounded-2xl bg-raise border border-line/80">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-indigo font-bold">
                Executive Brief · 60-Second Read
              </span>
            </div>
            <p className="text-[14.5px] sm:text-[15.5px] text-ink leading-relaxed font-medium">
              {current.summary}
            </p>
          </div>

          {/* 2. Key Decisions Agreed */}
          <div className="mb-6">
            <div className="text-[12px] font-mono uppercase tracking-wider text-teal font-bold mb-3 flex items-center gap-2">
              <span>📌</span>
              <span>Key Consensus Decisions</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {current.decisions.map((dec, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-teal-wash/40 border border-teal/25 flex items-start gap-3"
                >
                  <span className="w-5 h-5 rounded-full bg-teal text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </span>
                  <p className="text-[13.5px] text-ink font-medium leading-snug">
                    {dec}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Action Items Auto-Assigned & 1-Click Sync */}
          <div>
            <div className="text-[12px] font-mono uppercase tracking-wider text-amber font-bold mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span>⚡</span>
                <span>Auto-Extracted Commitments</span>
              </div>
              <span className="text-[11px] text-ink-3 font-normal font-sans">
                Click button to push directly to tool
              </span>
            </div>

            <div className="space-y-3">
              {current.tasks.map((task, i) => {
                const isPushed = synced[i];
                return (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-card border border-line flex flex-wrap sm:flex-nowrap items-center justify-between gap-4 hover:border-indigo/40 transition-all shadow-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-md bg-amber-wash border border-amber/30 text-amber font-bold flex items-center justify-center text-[12px] shrink-0">
                        {i + 1}
                      </div>
                      <div>
                        <p className="text-[14px] font-bold text-ink mb-0.5">
                          {task.title}
                        </p>
                        <div className="flex items-center gap-3 text-[12px] text-ink-3 font-mono">
                          <span>Owner: <strong className="text-indigo font-bold">{task.assignee}</strong></span>
                          <span>·</span>
                          <span>Due: <strong className="text-amber font-bold">{task.due}</strong></span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleSync(i)}
                      className={`px-3.5 py-1.5 rounded-lg text-[12px] font-mono font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                        isPushed
                          ? "bg-teal text-white shadow-xs"
                          : "bg-raise text-ink-2 hover:bg-indigo hover:text-white border border-line"
                      }`}
                    >
                      {isPushed ? "✓ Synced" : `Push to ${task.platform} ↗`}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Card Footer Integration Row */}
          <div className="mt-8 pt-6 border-t border-line/70 flex flex-wrap items-center justify-between gap-4 text-[12px] text-ink-3 font-medium">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-mono text-[11px] uppercase tracking-wider text-ink font-bold">
                Auto-Exports to:
              </span>
              <span className="px-2 py-0.5 rounded bg-raise border border-line">Slack</span>
              <span className="px-2 py-0.5 rounded bg-raise border border-line">Linear</span>
              <span className="px-2 py-0.5 rounded bg-raise border border-line">Jira</span>
              <span className="px-2 py-0.5 rounded bg-raise border border-line">Notion</span>
              <span className="px-2 py-0.5 rounded bg-raise border border-line">Salesforce</span>
            </div>
            <span className="text-teal font-mono text-[11px] font-bold">
              Traceable to raw audio timestamps ↗
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
