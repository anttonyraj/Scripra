"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSubscription } from "@/context/SubscriptionContext";

interface Turn {
  speaker: string;
  time: string;
  text: string;
}

const sampleTranscriptTurns: Turn[] = [
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
  const id = (params?.id as string) || "1";
  const { plan, openUpgradeModal } = useSubscription();

  const [loading, setLoading] = useState(true);
  const [meetingData, setMeetingData] = useState<any | null>(null);
  const [isSampleData, setIsSampleData] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadMeeting() {
      try {
        setLoading(true);
        const res = await fetch(`/api/meetings/${encodeURIComponent(id)}`);
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.meeting) {
            setMeetingData(data.meeting);
            setIsSampleData(false);
            setLoading(false);
            return;
          }
        }
      } catch (e) {
        console.warn("[Conversation Detail] Could not load persisted meeting, falling back to sample:", e);
      }
      // If not in store or is demo ID
      setIsSampleData(true);
      setMeetingData({
        id,
        title: "Product Review — August Release & Roadmap",
        platform: "Google Meet",
        durationMinutes: 42,
        createdAt: "2026-09-02T16:00:00Z",
        segments: sampleTranscriptTurns.map((t) => ({
          speaker: t.speaker,
          time: t.time,
          text: t.text,
        })),
        decisions: [
          "Delay target release to Friday 5 PM UTC",
          "Security audit sign-off escalated",
        ],
        actionItems: [
          { task: "Finish regression testing", owner: "Michael", deadline: "Thursday" },
          { task: "Draft client timeline email", owner: "Sarah", deadline: "Wednesday" },
          { task: "Escalate security audit", owner: "Antony", deadline: "Today" },
        ],
        summary:
          "The leadership team aligned on delaying the target release to Friday 5 PM to accommodate end-to-end regression testing on browser DOM mutation watchers.",
      });
      setLoading(false);
    }

    loadMeeting();
  }, [id]);

  const activeTurns: Turn[] = (meetingData?.segments || []).map((s: any) => ({
    speaker: s.speaker || "Speaker",
    time: s.time || s.timestamp || "00:00",
    text: s.text || "",
  }));

  const handleExportTxt = () => {
    const text = activeTurns
      .map((t) => `[${t.time}] ${t.speaker}:\n${t.text}\n`)
      .join("\n");
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `scripra-transcript-meeting-${id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportMd = () => {
    const mdContent =
      `# Scripra — Meeting Transcript\n\n` +
      `- **Session ID**: #${id}\n` +
      `- **Meeting**: ${meetingData?.title || "Meeting Session"}\n` +
      `- **Platform**: ${meetingData?.platform || "Google Meet"}\n` +
      `- **Date**: ${meetingData?.createdAt ? new Date(meetingData.createdAt).toLocaleDateString() : "Live"}\n` +
      `- **Duration**: ${meetingData?.durationMinutes || 1} minutes\n\n` +
      `---\n\n` +
      `## Transcript Segments\n\n` +
      activeTurns.map((t) => `> **[${t.time}] ${t.speaker}**\n>\n> ${t.text}\n`).join("\n") +
      `\n\n---\n*Captured by Scripra AI Conversation Intelligence*\n`;
    const blob = new Blob([mdContent], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `scripra-transcript-meeting-${id}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-ink-3 font-mono">
        <div className="w-6 h-6 border-2 border-indigo border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        Resolving conversation intelligence #{id}...
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-[1050px] mx-auto">
      {/* Header breadcrumb */}
      <div className="flex items-center gap-2 text-[12.5px] text-ink-3 mb-4">
        <Link href="/dashboard" className="hover:text-ink transition-colors">
          Dashboard
        </Link>
        <span>/</span>
        <Link href="/dashboard/conversations" className="hover:text-ink transition-colors">
          Conversations
        </Link>
        <span>/</span>
        <span className="text-ink font-mono font-medium">Session #{id}</span>
      </div>

      {/* Explicit Boundary Banner for Sample/Demo Data */}
      {isSampleData && (
        <div className="mb-6 p-3.5 rounded-2xl bg-amber-wash/70 border border-amber/30 text-amber-900 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-amber font-bold">ℹ️ Sample Demonstration Session:</span>
            <span>
              This conversation displays illustrative sample data for walkthrough and demo purposes. Ingested meetings via the Chrome extension or Live Studio appear as distinct persistent records.
            </span>
          </div>
          <span className="font-mono uppercase font-bold text-[10px] bg-amber/20 px-2 py-0.5 rounded text-amber-800 shrink-0">
            Sample Data
          </span>
        </div>
      )}

      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-line mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[18px]">🟢</span>
            <h1 className="text-[24px] font-bold tracking-tight text-ink">
              {meetingData?.title || "Meeting Session"}
            </h1>
            {!isSampleData && (
              <span className="text-[11px] font-mono uppercase bg-teal-wash text-teal font-bold px-2 py-0.5 rounded-full border border-teal/30">
                Captured Live
              </span>
            )}
          </div>
          <div className="text-[12.5px] text-ink-3 font-mono">
            {meetingData?.createdAt ? new Date(meetingData.createdAt).toLocaleDateString() : "Live"} ·{" "}
            {meetingData?.durationMinutes || 1} minutes · {new Set(activeTurns.map((t) => t.speaker)).size} speakers · Platform:{" "}
            {meetingData?.platform || "Google Meet"}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleExportTxt}
            className="px-4 py-2 rounded-xl bg-indigo text-white text-[12.5px] font-bold hover:bg-indigo-deep transition-all shadow-xs flex items-center gap-1.5 active:scale-[0.98]"
            title="Download complete diarized transcript (.txt)"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Download Transcript</span>
          </button>

          <button
            onClick={handleExportMd}
            className="px-3 py-2 rounded-xl bg-card border border-line text-ink text-[12px] font-mono font-bold hover:border-indigo hover:text-indigo transition-colors shadow-sm"
            title="Download formatted Markdown transcript (.md)"
          >
            .md
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
              Transcript Segments ({activeTurns.length})
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={handleExportTxt}
                className="text-[11px] font-mono text-indigo hover:underline flex items-center gap-1"
                title="Download transcript text"
              >
                <span>📥 Download</span>
              </button>
              <span className="text-[11px] font-mono text-indigo bg-indigo-wash px-2 py-0.5 rounded">
                Scripra Acoustic Capture
              </span>
            </div>
          </div>

          <div className="bg-card border border-line rounded-2xl p-6 space-y-5 shadow-sm">
            {activeTurns.length > 0 ? (
              activeTurns.map((turn, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo text-white font-bold text-[12px] flex items-center justify-center flex-shrink-0 mt-0.5">
                    {turn.speaker[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-[13px] font-bold text-ink">{turn.speaker}</span>
                      <span className="text-[11px] font-mono text-ink-3">{turn.time}</span>
                    </div>
                    <p className="text-[14px] text-ink-2 leading-relaxed">{turn.text}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-ink-3 text-sm italic">
                No dialogue segments recorded for this session.
              </div>
            )}
          </div>
        </div>

        {/* Right: AI Intelligence Panel */}
        <div className="space-y-6">
          <h2 className="text-[13px] font-bold uppercase tracking-wider text-ink-3">
            Extracted Intelligence
          </h2>

          {plan === "free" ? (
            /* Free Tier: Teaser */
            <div className="bg-card border border-line rounded-2xl p-5 shadow-sm space-y-4">
              <div className="text-[12px] font-bold text-ink uppercase tracking-wider">
                Executive Summary
              </div>
              <p className="text-[13px] text-ink-2 leading-relaxed">
                {meetingData?.summary || "Meeting session processed by Scripra."}
              </p>

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
                  Decisions Made ({(meetingData?.decisions || []).length})
                </div>
                <div className="space-y-2">
                  {(meetingData?.decisions || []).length > 0 ? (
                    meetingData.decisions.map((d: string, idx: number) => (
                      <div key={idx} className="bg-raise p-2.5 rounded-lg text-[12.5px] font-medium text-ink">
                        ✓ {d}
                      </div>
                    ))
                  ) : (
                    <div className="text-xs text-ink-3 italic bg-raise p-2.5 rounded-lg">
                      No explicit voting or formal decisions recorded.
                    </div>
                  )}
                </div>
              </div>

              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-amber mb-2">
                  Action Items ({(meetingData?.actionItems || []).length})
                </div>
                <div className="space-y-2 text-[12.5px]">
                  {(meetingData?.actionItems || []).length > 0 ? (
                    meetingData.actionItems.map((a: any, idx: number) => (
                      <div key={idx} className="bg-raise p-2.5 rounded-lg">
                        <div className="font-semibold text-ink">{a.task}</div>
                        <div className="text-ink-3 text-[11px] mt-0.5">
                          Owner: {a.owner || "Team"} · Due: {a.deadline || "Upcoming"}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-xs text-ink-3 italic bg-raise p-2.5 rounded-lg">
                      No follow-up action items detected.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
