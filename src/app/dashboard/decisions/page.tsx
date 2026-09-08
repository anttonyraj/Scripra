"use client";

import React from "react";
import Link from "next/link";
import { useSubscription } from "@/context/SubscriptionContext";

const decisionsList = [
  {
    title: "Delay target release to Friday 5 PM UTC",
    meeting: "Product Review — August Release & Roadmap",
    date: "Sep 2, 2026",
    owner: "Team Consensus",
    status: "Agreed",
    context: "Postponing by 1 week allows Michael to finalize Edge DOM mutation tests without risking production stability.",
  },
  {
    title: "Escalate security review sign-off immediately",
    meeting: "Product Review — August Release & Roadmap",
    date: "Sep 2, 2026",
    owner: "Antony",
    status: "In Progress",
    context: "Compliance audit approval is the remaining critical blocker before deployment.",
  },
  {
    title: "Enforce zero-retention ephemeral audio pipeline",
    meeting: "Client Architecture Sync — Enterprise Deployment",
    date: "Sep 1, 2026",
    owner: "Elena",
    status: "Approved",
    context: "Transcripts are generated in memory and discarded right after email delivery to satisfy enterprise privacy.",
  },
];

export default function DecisionsPage() {
  const { plan, openUpgradeModal } = useSubscription();

  return (
    <div className="p-6 md:p-8 max-w-[1000px] mx-auto">
      <div className="mb-6">
        <h1 className="text-[26px] font-bold tracking-tight text-ink mb-1">
          Extracted Decisions
        </h1>
        <p className="text-[14px] text-ink-2">
          Automatic catalog of all consensus moments, agreements, and team decisions extracted from meetings.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {decisionsList.map((dec, idx) => (
          <div
            key={idx}
            className="bg-card border border-line rounded-2xl p-5 hover:border-indigo transition-all shadow-sm"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo" />
                <h3 className="text-[15.5px] font-bold text-ink">{dec.title}</h3>
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider bg-indigo-wash text-indigo px-2.5 py-0.5 rounded-full self-start sm:self-auto">
                {dec.status}
              </span>
            </div>

            <p className="text-[13.5px] text-ink-2 leading-relaxed mb-3 pl-4 border-l-2 border-indigo/30">
              {dec.context}
            </p>

            <div className="flex items-center justify-between text-[12px] text-ink-3 font-mono pt-2 border-t border-line">
              <span>{dec.meeting} · {dec.date}</span>
              <span className="text-ink font-medium">Owner: {dec.owner}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
