"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSubscription } from "@/context/SubscriptionContext";

const mockConversations = [
  {
    id: "1",
    title: "Product Review — August Release & Roadmap",
    date: "Sep 2, 2026",
    duration: "42 min",
    platform: "Google Meet",
    speakers: ["Sarah", "Antony", "Michael"],
    summary: "Agreed to push release to Friday to finish regression testing. Security sign-off pending.",
    decisions: 2,
    actionItems: 3,
  },
  {
    id: "2",
    title: "Client Architecture Sync — Enterprise Deployment",
    date: "Sep 1, 2026",
    duration: "28 min",
    platform: "Zoom",
    speakers: ["David", "Elena", "Marcus", "Antony"],
    summary: "Reviewed Kubernetes ingress requirements, VPC peering latency, and Zero-Storage compliance.",
    decisions: 1,
    actionItems: 2,
  },
  {
    id: "3",
    title: "Sprint Retrospective & Action Commitments",
    date: "Aug 30, 2026",
    duration: "55 min",
    platform: "Microsoft Teams",
    speakers: ["Rachel", "Ken", "Dev Team (5)"],
    summary: "Reviewed velocity bottlenecks, resolved audio streaming pipeline timeouts on headless Chrome.",
    decisions: 3,
    actionItems: 4,
  },
];

const platformIcons: Record<string, string> = {
  "Google Meet": "🟢",
  "Zoom": "🔵",
  "Microsoft Teams": "🟣",
  "Cisco Webex": "🟠",
};

export default function ConversationsPage() {
  const { plan, openUpgradeModal } = useSubscription();
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = mockConversations.filter((c) =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 md:p-8 max-w-[1050px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[26px] font-bold tracking-tight text-ink mb-1">
            Recorded Conversations
          </h1>
          <p className="text-[14px] text-ink-2">
            Browse, search, and review structured summaries of all recorded sessions.
          </p>
        </div>

        <Link
          href="/dashboard"
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-indigo text-white text-[13px] font-semibold hover:opacity-90 transition-opacity"
        >
          + Record New Meeting
        </Link>
      </div>

      {/* Search Bar */}
      <div className="mb-6 relative">
        <svg
          className="w-4 h-4 text-ink-3 absolute left-3.5 top-1/2 -translate-y-1/2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by topic, decision, speaker, or keyword..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-line text-[13.5px] text-ink placeholder:text-ink-3 focus:outline-none focus:border-indigo transition-colors shadow-sm"
        />
      </div>

      {/* Conversations Grid */}
      <div className="flex flex-col gap-3">
        {filtered.map((conv) => (
          <div
            key={conv.id}
            className="bg-card border border-line rounded-2xl p-5 hover:border-indigo transition-all shadow-sm group"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-3">
                <span className="text-[22px]">{platformIcons[conv.platform] || "💬"}</span>
                <div>
                  <Link
                    href={`/dashboard/conversations/${conv.id}`}
                    className="text-[16px] font-bold text-ink group-hover:text-indigo transition-colors"
                  >
                    {conv.title}
                  </Link>
                  <div className="text-[12px] text-ink-3 font-mono mt-0.5">
                    {conv.date} · {conv.duration} · {conv.platform}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start">
                <span className="text-[11px] font-semibold bg-indigo-wash text-indigo px-2.5 py-0.5 rounded-full">
                  {conv.decisions} Decisions
                </span>
                <span className="text-[11px] font-semibold bg-amber-wash text-amber px-2.5 py-0.5 rounded-full">
                  {conv.actionItems} Actions
                </span>
              </div>
            </div>

            <p className="text-[13.5px] text-ink-2 leading-relaxed mb-4 pl-9">
              {conv.summary}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-line pl-9">
              <div className="flex items-center gap-2 text-[12px] text-ink-3">
                <span>Speakers:</span>
                {conv.speakers.map((s, idx) => (
                  <span
                    key={idx}
                    className="bg-raise px-2 py-0.5 rounded text-ink font-medium text-[11px]"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={`/dashboard/conversations/${conv.id}`}
                  className="px-3 py-1.5 rounded-lg bg-raise text-ink-2 hover:text-ink text-[12px] font-semibold transition-colors"
                >
                  View Transcript &amp; Recap →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
