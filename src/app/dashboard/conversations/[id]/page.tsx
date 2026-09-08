"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSubscription } from "@/context/SubscriptionContext";

const transcriptTurns = [
  {
    speaker: "Sarah",
    time: "00:03",
    text: "Hey everyone, let's review the status of the August release before we freeze the repo tonight.",
  },
  {
    speaker: "Antony",
    time: "00:28",
    text: "I've been monitoring the Web Speech API transcription pipelines. Webex and Google Meet are passing all synthetic tests with zero packet loss.",
  },
  {
    speaker: "Michael",
    time: "01:15",
    text: "Teams is also solid, but I need 48 more hours to finish end-to-end regression testing on Edge browser DOM mutation watchers.",
  },
  {
    speaker: "Sarah",
    time: "02:10",
    text: "Can we delay the client release to Friday? That gives Michael enough runway without risking customer uptime.",
  },
  {
    speaker: "Antony",
    time: "02:45",
    text: "Agreed. Let's officially move the target release to Friday 5 PM. I will also follow up on the security review today.",
  },
];

export default function ConversationDetailPage() {
  const params = useParams();
  const { plan, openUpgradeModal } = useSubscription();
  const [copied, setCopied] = useState(false);

  const handleExportTxt = () => {
    const text = transcriptTurns
      .map((t) => `[${t.time}] ${t.speaker}:\n${t.text}\n`)
      .join("\n");
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `scripra-transcript-meeting-${params?.id || "session"}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 md:p-8 max-w-[1050px] mx-auto">
      {/* Header breadcrumb */}
      <div className="flex items-center gap-2 text-[12.5px] text-ink-3 mb-4">
        <Link href="/dashboard" className="hover:text-ink transition-colors">Dashboard</Link>
        <span>/</span>
        <Link href="/dashboard/conversations" className="hover:text-ink transition-colors">Conversations</Link>
        <span>/</span>
        <span className="text-ink font-mono font-medium">Session #{params?.id || "1"}</span>
      </div>

      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-line mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[18px]">🟢</span>
            <h1 className="text-[24px] font-bold tracking-tight text-ink">
              Product Review — August Release &amp; Roadmap
            </h1>
          </div>
          <div className="text-[12.5px] text-ink-3 font-mono">
            Recorded Sep 2, 2026 · 42 minutes · 3 speakers · Platform: Google Meet
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportTxt}
            className="px-3.5 py-2 rounded-xl bg-card border border-line text-ink text-[12.5px] font-semibold hover:border-indigo transition-colors shadow-sm flex items-center gap-1.5"
          >
            <svg className="w-4 h-4 text-indigo" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export .txt
          </button>

          {plan === "free" ? (
            <button
              onClick={() => openUpgradeModal("pro")}
              className="px-4 py-2 rounded-xl bg-indigo text-white text-[12.5px] font-semibold hover:opacity-90 transition-opacity shadow-sm flex items-center gap-1.5"
            >
              <span>Unlock PDF &amp; Email (Pro)</span>
            </button>
          ) : (
            <button
              onClick={() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="px-4 py-2 rounded-xl bg-indigo text-white text-[12.5px] font-semibold hover:opacity-90 transition-opacity shadow-sm"
            >
              {copied ? "Link Copied!" : "Share Intelligence"}
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Transcript */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-[13px] font-bold uppercase tracking-wider text-ink-3">
              Live Intercepted Transcript
            </h2>
            <span className="text-[11px] font-mono text-indigo bg-indigo-wash px-2 py-0.5 rounded">
              Web Speech Engine
            </span>
          </div>

          <div className="bg-card border border-line rounded-2xl p-6 space-y-5 shadow-sm">
            {transcriptTurns.map((turn, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-indigo text-white font-bold text-[12px] flex items-center justify-center flex-shrink-0 mt-0.5">
                  {turn.speaker[0]}
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-[13px] font-bold text-ink">{turn.speaker}</span>
                    <span className="text-[11px] font-mono text-ink-3">{turn.time}</span>
                  </div>
                  <p className="text-[14px] text-ink-2 leading-relaxed">
                    {turn.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: AI Intelligence Panel */}
        <div className="space-y-6">
          <h2 className="text-[13px] font-bold uppercase tracking-wider text-ink-3">
            Extracted Intelligence
          </h2>

          {plan === "free" ? (
            /* Free Tier: 3-Bullet Teaser */
            <div className="bg-card border border-line rounded-2xl p-5 shadow-sm space-y-4">
              <div className="text-[12px] font-bold text-ink uppercase tracking-wider">
                Quick Summary (Teaser)
              </div>
              <ul className="space-y-2 text-[13px] text-ink-2 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-indigo font-bold">•</span>
                  Delayed release by 1 week to Friday.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo font-bold">•</span>
                  Michael finishing regression testing.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo font-bold">•</span>
                  Security review pending signoff.
                </li>
              </ul>

              <div className="p-4 bg-raise rounded-xl border border-line text-center">
                <div className="text-[14px] font-bold text-ink mb-1">🔒 Full AI Insights Locked</div>
                <p className="text-[12px] text-ink-3 mb-3">
                  Upgrade to Pro to unlock action owners, deadlines, decisions, and auto-email recaps.
                </p>
                <button
                  onClick={() => openUpgradeModal("pro")}
                  className="w-full py-2 rounded-lg bg-indigo text-white text-[12px] font-semibold hover:opacity-90 transition-opacity"
                >
                  Upgrade to Pro — $9.99/mo
                </button>
              </div>
            </div>
          ) : (
            /* Unlocked Pro Panel */
            <div className="bg-card border border-line rounded-2xl p-5 shadow-sm space-y-5">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-indigo mb-2">
                  Decisions Made (2)
                </div>
                <div className="space-y-2">
                  <div className="bg-raise p-2.5 rounded-lg text-[12.5px] font-medium text-ink">
                    ✓ Delay target release to Friday 5 PM UTC
                  </div>
                  <div className="bg-raise p-2.5 rounded-lg text-[12.5px] font-medium text-ink">
                    ✓ Security audit sign-off escalated
                  </div>
                </div>
              </div>

              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-amber mb-2">
                  Action Items (3)
                </div>
                <div className="space-y-2 text-[12.5px]">
                  <div className="bg-raise p-2.5 rounded-lg">
                    <div className="font-semibold text-ink">Finish regression testing</div>
                    <div className="text-ink-3 text-[11px] mt-0.5">Owner: Michael · Due: Thursday</div>
                  </div>
                  <div className="bg-raise p-2.5 rounded-lg">
                    <div className="font-semibold text-ink">Draft client timeline email</div>
                    <div className="text-ink-3 text-[11px] mt-0.5">Owner: Sarah · Due: Wednesday</div>
                  </div>
                  <div className="bg-raise p-2.5 rounded-lg">
                    <div className="font-semibold text-ink">Escalate security audit</div>
                    <div className="text-ink-3 text-[11px] mt-0.5">Owner: Antony · Due: Today</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
