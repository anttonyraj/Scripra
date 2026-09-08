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
    <div className="p-5 sm:p-7 md:p-8 max-w-[1200px] mx-auto w-full">
      {/* Top Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-5 border-b border-line">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-[22px] sm:text-[25px] font-bold tracking-tight text-ink">
              Intelligence Dashboard
            </h1>
            <span className="hidden sm:inline-block text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-wash text-indigo border border-indigo/20">
              Live
            </span>
          </div>
          <p className="text-[13px] text-ink-3">
            Real-time meeting capture, structured synthesis, and searchable intelligence.
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
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo text-white text-[13px] font-semibold hover:bg-indigo-deep transition-all shadow-xs"
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
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-card border border-amber/30 text-amber text-[12px] font-bold hover:bg-amber-wash transition-all shadow-2xs"
            >
              <span>⭐ Upgrade</span>
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
          {/* Metrics Row: 4 Balanced Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
            {/* 1. Meeting Quota */}
            <div className="bg-card border border-line rounded-2xl p-4 sm:p-5 shadow-2xs hover:border-line/80 transition-all">
              <div className="text-[11px] font-bold uppercase tracking-wider text-ink-3 mb-2 flex items-center justify-between">
                <span>Monthly Quota</span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-raise text-indigo font-bold">
                  {plan}
                </span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-[26px] sm:text-[28px] font-bold tracking-tight text-ink">
                  {meetingsUsed}
                </span>
                <span className="text-[13px] text-ink-3 font-mono">
                  / {plan === "business" ? "∞" : meetingsLimit} calls
                </span>
              </div>
              <div className="w-full h-1.5 bg-raise rounded-full mt-3 overflow-hidden">
                <div
                  className="h-1.5 bg-indigo rounded-full transition-all duration-500"
                  style={{ width: `${plan === "business" ? 15 : usagePercent}%` }}
                />
              </div>
            </div>

            {/* 2. Open Action Items */}
            <div className="bg-card border border-line rounded-2xl p-4 sm:p-5 shadow-2xs hover:border-line/80 transition-all">
              <div className="text-[11px] font-bold uppercase tracking-wider text-ink-3 mb-2 flex items-center justify-between">
                <span>Action Items</span>
                <span className="w-2 h-2 rounded-full bg-amber" />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-[26px] sm:text-[28px] font-bold tracking-tight text-amber">
                  {actionsList.filter((a) => !a.completed).length}
                </span>
                <span className="text-[13px] text-ink-3">commitments</span>
              </div>
              <div className="text-[11.5px] text-ink-3 mt-2 flex items-center gap-1.5">
                <span className="text-amber font-semibold">2 due</span> this week
              </div>
            </div>

            {/* 3. Decisions Logged */}
            <div className="bg-card border border-line rounded-2xl p-4 sm:p-5 shadow-2xs hover:border-line/80 transition-all">
              <div className="text-[11px] font-bold uppercase tracking-wider text-ink-3 mb-2 flex items-center justify-between">
                <span>Decisions Logged</span>
                <span className="w-2 h-2 rounded-full bg-indigo" />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-[26px] sm:text-[28px] font-bold tracking-tight text-indigo">
                  {fullRecapData.decisions.length}
                </span>
                <span className="text-[13px] text-ink-3">consensus points</span>
              </div>
              <div className="text-[11.5px] text-ink-3 mt-2 flex items-center gap-1.5">
                <span className="text-teal font-semibold">100%</span> consensus score
              </div>
            </div>

            {/* 4. Hours Captured */}
            <div className="bg-card border border-line rounded-2xl p-4 sm:p-5 shadow-2xs hover:border-line/80 transition-all">
              <div className="text-[11px] font-bold uppercase tracking-wider text-ink-3 mb-2 flex items-center justify-between">
                <span>Audio Captured</span>
                <span className="w-2 h-2 rounded-full bg-teal" />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-[26px] sm:text-[28px] font-bold tracking-tight text-teal">
                  2.1h
                </span>
                <span className="text-[13px] text-ink-3">multilingual ASR</span>
              </div>
              <div className="text-[11.5px] text-ink-3 mt-2 flex items-center gap-1.5">
                <span>Deepgram + Gemini</span>
              </div>
            </div>
          </div>

          {/* Quick Launch Studio Banner */}
          <div className="bg-gradient-to-r from-indigo/10 via-teal/5 to-card border border-indigo/25 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-indigo text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z" />
                </svg>
              </div>
              <div>
                <h3 className="text-[14.5px] font-bold text-ink">Ready to capture a meeting?</h3>
                <p className="text-[12.5px] text-ink-3">
                  Paste a Microsoft Teams, Google Meet, Zoom, or Webex link, or capture browser audio directly.
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveTab("studio")}
              className="px-4 py-2.5 rounded-xl bg-indigo text-white font-semibold text-[13px] hover:bg-indigo-deep transition-all shadow-xs flex items-center justify-center gap-2 self-start sm:self-auto flex-shrink-0"
            >
              <span>Launch Meeting Studio</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>

          {/* Two-Column Grid: Latest Intelligence (Left 60%) + Action Items & Memory (Right 40%) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Latest Meeting Intelligence Card */}
              <div className="bg-card border border-line rounded-2xl p-5 sm:p-6 shadow-2xs">
                <div className="flex items-center justify-between pb-3.5 border-b border-line mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider bg-indigo-wash text-indigo px-2.5 py-0.5 rounded-md">
                      Latest MoM &amp; Synthesis
                    </span>
                    <span className="text-[12px] text-ink-3 font-mono">Sep 2 · 42m</span>
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-raise text-ink-2">
                    Google Meet
                  </span>
                </div>

                <h3 className="text-[16.5px] font-bold text-ink mb-2.5">
                  Product Review — August Release &amp; Roadmap
                </h3>

                {/* Executive Summary */}
                <div className="mb-4">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-ink-3 mb-1.5">
                    Executive Summary
                  </div>
                  <p className="text-[13.5px] leading-[1.65] text-ink bg-raise/50 p-3.5 rounded-xl border border-line">
                    {fullRecapData.executiveRecap}
                  </p>
                </div>

                {/* Key Decisions Preview */}
                <div className="mb-4">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-indigo mb-2 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-indigo" />
                    <span>Strategic Decisions (2)</span>
                  </div>
                  <div className="space-y-2">
                    {fullRecapData.decisions.map((d, idx) => (
                      <div key={idx} className="bg-raise/40 border border-line p-3 rounded-lg flex items-center justify-between text-[13px]">
                        <span className="font-semibold text-ink">{d.title}</span>
                        <span className="text-[11px] font-bold text-teal bg-teal-wash px-2 py-0.5 rounded">
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
              <div className="bg-card border border-line rounded-2xl p-5 sm:p-6 shadow-2xs">
                <div className="flex items-center justify-between pb-3.5 border-b border-line mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber" />
                    <h3 className="text-[14.5px] font-bold text-ink">Action Matrix</h3>
                  </div>
                  <Link
                    href="/dashboard/actions"
                    className="text-[12px] font-bold text-amber hover:underline"
                  >
                    View all (3) →
                  </Link>
                </div>

                <div className="space-y-2.5">
                  {actionsList.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleAction(item.id)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer select-none flex items-start gap-3 ${
                        item.completed
                          ? "bg-raise/20 border-line opacity-60"
                          : "bg-raise/50 border-line hover:border-amber/40"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => {}}
                        className="mt-1 rounded text-amber focus:ring-amber cursor-pointer"
                      />
                      <div className="flex-1 min-w-0">
                        <p className={`text-[13px] font-medium leading-snug ${
                          item.completed ? "line-through text-ink-3" : "text-ink"
                        }`}>
                          {item.task}
                        </p>
                        <div className="flex items-center justify-between mt-2 text-[11px]">
                          <span className="font-semibold text-ink-2">@{item.owner}</span>
                          <span className="font-mono text-amber font-bold">{item.deadline}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Organization Memory Search Quick Card */}
              <div className="bg-card border border-line rounded-2xl p-5 shadow-2xs">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-wash text-indigo flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-[13.5px] font-bold text-ink">Search Across Meetings</h4>
                    <p className="text-[11.5px] text-ink-3">Find any past decision, topic, or speaker quote</p>
                  </div>
                </div>

                <Link
                  href="/dashboard/search"
                  className="mt-3 flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl bg-raise border border-line text-[12.5px] text-ink-3 hover:text-ink hover:border-indigo/40 transition-all group"
                >
                  <span className="truncate">Ask: &quot;What did Michael commit to on Thursday?&quot;</span>
                  <span className="font-mono text-[10px] bg-card px-1.5 py-0.5 rounded border border-line group-hover:border-indigo/30">
                    ⌘K
                  </span>
                </Link>
              </div>

              {/* Chrome Extension Integration */}
              <div className="bg-gradient-to-br from-teal-wash/40 via-card to-card border border-teal/25 rounded-2xl p-5 shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10.5px] font-bold uppercase tracking-wider text-teal">
                    1-Click Capture
                  </span>
                  <span className="text-[11px] font-mono text-ink-3">v1.2.0</span>
                </div>
                <h4 className="text-[14px] font-bold text-ink mb-1">
                  Scripra Chrome Extension
                </h4>
                <p className="text-[12px] text-ink-3 leading-relaxed mb-3.5">
                  Capture Google Meet and browser conferences directly without needing any meeting bot invite.
                </p>
                <Link
                  href="/product#extension"
                  className="inline-flex items-center gap-1.5 text-[12.5px] font-bold text-teal hover:underline"
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

