"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSubscription } from "@/context/SubscriptionContext";

const searchResults = [
  {
    topic: "August Release Timeline",
    meeting: "Product Review — August Release & Roadmap",
    date: "Sep 2, 2026",
    quote: "Let's officially move the target release to Friday 5 PM. That gives Michael enough runway without risking customer uptime.",
    speaker: "Antony",
    badge: "Decision",
  },
  {
    topic: "Audio Stream Reliability on Chrome 128",
    meeting: "Sprint Retrospective & Action Commitments",
    date: "Aug 30, 2026",
    quote: "Resolved audio streaming pipeline timeouts on headless Chrome. Zero packet loss on synthetic tests.",
    speaker: "Ken",
    badge: "Technical",
  },
  {
    topic: "Enterprise Ingress & Zero Storage",
    meeting: "Client Architecture Sync — Enterprise Deployment",
    date: "Sep 1, 2026",
    quote: "All meeting transcripts are processed ephemerally in RAM and wiped immediately following Resend email dispatch.",
    speaker: "Elena",
    badge: "Compliance",
  },
];

export default function SearchPage() {
  const { plan, openUpgradeModal } = useSubscription();
  const [query, setQuery] = useState("");

  const filtered = searchResults.filter(
    (r) =>
      r.topic.toLowerCase().includes(query.toLowerCase()) ||
      r.quote.toLowerCase().includes(query.toLowerCase()) ||
      r.speaker.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-6 md:p-8 max-w-[1000px] mx-auto">
      <div className="mb-6">
        <h1 className="text-[26px] font-bold tracking-tight text-ink mb-1">
          Search &amp; Organizational Memory
        </h1>
        <p className="text-[14px] text-ink-2">
          Ask questions or query across every conversation, decision, and commitment ever recorded.
        </p>
      </div>

      {/* Search Input Box */}
      <div className="relative mb-8">
        <svg
          className="w-5 h-5 text-indigo absolute left-4 top-1/2 -translate-y-1/2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask Scripra: 'What was decided about the release timeline?' or search by speaker..."
          className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-card border border-line text-[14px] text-ink placeholder:text-ink-3 focus:outline-none focus:border-indigo transition-all shadow-sm"
        />
      </div>

      {/* Cross-conversation Intelligence Banner */}
      {plan === "free" && (
        <div className="mb-6 p-4 rounded-xl bg-indigo-wash border border-indigo/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="text-[18px]">⚡</span>
            <div>
              <div className="text-[13px] font-bold text-ink">Searchable History (3-Day Limit on Free)</div>
              <div className="text-[12px] text-ink-2">Upgrade to Pro for 90-day memory and AI semantic question answering.</div>
            </div>
          </div>
          <button
            onClick={() => openUpgradeModal("pro")}
            className="px-4 py-1.5 rounded-lg bg-indigo text-white text-[12px] font-semibold hover:opacity-90 transition-opacity flex-shrink-0"
          >
            Upgrade to Pro ($9.99)
          </button>
        </div>
      )}

      {/* Memory Results */}
      <div className="space-y-3">
        <div className="text-[11px] font-bold uppercase tracking-wider text-ink-3 mb-2">
          {filtered.length} Memory Records Found
        </div>

        {filtered.map((item, idx) => (
          <div
            key={idx}
            className="bg-card border border-line rounded-2xl p-5 hover:border-indigo transition-all shadow-sm group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[15px] font-bold text-ink group-hover:text-indigo transition-colors">
                {item.topic}
              </span>
              <span className="text-[11px] font-semibold bg-raise text-ink-3 px-2.5 py-0.5 rounded-full">
                {item.badge}
              </span>
            </div>

            <p className="text-[13.5px] text-ink-2 leading-relaxed bg-raise/60 p-3 rounded-xl border border-line/60 mb-3 italic">
              &ldquo;{item.quote}&rdquo;
            </p>

            <div className="flex items-center justify-between text-[12px] text-ink-3 font-mono">
              <span>{item.meeting} · {item.date}</span>
              <span className="text-indigo font-medium">Speaker: {item.speaker}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
