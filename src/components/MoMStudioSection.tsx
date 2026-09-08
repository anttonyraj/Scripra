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

  const templates: MeetingTemplate[] = [
    {
      type: "Engineering",
      badge: "Sprint Planning",
      title: "Sprint 42 Architecture & Release Sync",
      time: "42 min · Teams",
      summary:
        "The team agreed to ship the core Webex and Teams live audio diarization pipelines this Friday. Antony will lead production verification on Thursday, while Sarah coordinates user feedback loops.",
      decisions: [
        "Deploy Gemini 2.0 Flash audio processing directly to edge runtimes for <300ms transcription latency.",
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

            <div className="flex items-center gap-2">
              <span className="text-[12px] font-mono text-teal bg-teal-wash px-3 py-1.5 rounded-lg border border-teal/25 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
                Gemini Flash Synthesized
              </span>
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
