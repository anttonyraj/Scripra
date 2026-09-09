"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface TurnItem {
  speaker: string;
  role: string;
  avatarColor: string;
  time: string;
  text: string;
}

export default function AiNotetakerInteractive() {
  const [activePlatform, setActivePlatform] = useState<"meet" | "teams" | "zoom" | "webex">("meet");
  const [activeTab, setActiveTab] = useState<"mom" | "actions" | "transcript">("mom");
  const [copiedMoM, setCopiedMoM] = useState(false);
  const [downloadFeedback, setDownloadFeedback] = useState<string | null>(null);

  const platforms = [
    { id: "meet", name: "Google Meet", icon: "🟢", color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { id: "teams", name: "Microsoft Teams", icon: "🟣", color: "text-indigo-500", bg: "bg-indigo-500/10" },
    { id: "zoom", name: "Zoom", icon: "🔵", color: "text-sky-500", bg: "bg-sky-500/10" },
    { id: "webex", name: "Cisco Webex", icon: "🟠", color: "text-amber-500", bg: "bg-amber-500/10" },
  ];

  const sampleDialogue: TurnItem[] = [
    {
      speaker: "Sarah Chen",
      role: "VP of Product",
      avatarColor: "bg-indigo text-white",
      time: "00:14",
      text: "We need to ensure all meeting intelligence is generated with sub-300ms latency. Clients specifically asked to eliminate manual note-taking entirely.",
    },
    {
      speaker: "David Miller",
      role: "Lead Architect",
      avatarColor: "bg-teal text-ink-deep font-bold",
      time: "00:42",
      text: "Agreed. Our edge WebAssembly audio pipeline is running in browser tabs with zero CPU spikes. Consensus reached on shipping the one-click transcript export in both .txt and .md.",
    },
    {
      speaker: "Elena Rostova",
      role: "Head of Security",
      avatarColor: "bg-amber text-ink-deep font-bold",
      time: "01:05",
      text: "Crucial point: Enterprise clients require bot-free capture so sensitive board meetings can be transcribed without an uninvited bot visibly entering the call.",
    },
  ];

  const handleDownloadDemo = (format: "txt" | "md") => {
    setDownloadFeedback(format === "md" ? "Markdown (.md) downloaded!" : "Transcript (.txt) downloaded!");
    setTimeout(() => setDownloadFeedback(null), 2500);

    const content =
      format === "md"
        ? `# Scripra AI Notetaker — Session Minutes\n\n` +
          `- **Meeting**: Enterprise Architecture & Security Sync\n` +
          `- **Platform**: ${platforms.find((p) => p.id === activePlatform)?.name}\n` +
          `- **Date**: ${new Date().toLocaleDateString()}\n\n` +
          `## Executive Summary\n` +
          `Team reached 100% consensus on deploying sub-300ms edge speech diarization and zero-bot stealth capture for enterprise client meetings.\n\n` +
          `## Action Items\n` +
          `- [x] Ship one-click .txt and .md export (Owner: David Miller, Due: Friday)\n` +
          `- [ ] Finalize SOC 2 Type II audit report for enterprise pilots (Owner: Elena Rostova, Due: Next Tuesday)\n\n` +
          `## Full Transcript\n` +
          sampleDialogue.map((d) => `> **[${d.time}] ${d.speaker} (${d.role})**:\n> ${d.text}\n`).join("\n")
        : `SCRIPRA AI NOTETAKER — MEETING TRANSCRIPT\n` +
          `Platform: ${platforms.find((p) => p.id === activePlatform)?.name}\n` +
          `Date: ${new Date().toLocaleString()}\n\n` +
          sampleDialogue.map((d) => `[${d.time}] ${d.speaker}: ${d.text}`).join("\n\n") +
          `\n\n-- End of Notes --\n`;

    const blob = new Blob([content], { type: format === "md" ? "text/markdown" : "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Scripra-AI-Notes-Demo.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "What is an AI Meeting Notetaker?",
      a: "An AI meeting notetaker is an autonomous assistant that joins your video conferences (Google Meet, Microsoft Teams, Zoom, Webex) or captures local browser audio to transcribe speech in real-time, generate structured Minutes of Meeting (MoM), track consensus decisions, and automatically assign action items with deadlines.",
    },
    {
      q: "Can Scripra take meeting notes without an uninvited bot joining?",
      a: "Yes! Scripra is one of the only meeting intelligence platforms offering 100% Bot-Free Stealth Capture. Using our Chrome extension or browser tab audio capture, you can record and transcribe calls with zero bots visibly appearing in the participant roster.",
    },
    {
      q: "How does Scripra compare to Otter.ai and Fireflies?",
      a: "While Otter and Fireflies provide basic raw text with limited structure, Scripra generates executive-ready Minutes of Meeting (MoM) with consensus scores, builds an ongoing cross-meeting constellation memory graph, provides sub-300ms diarization, and guarantees that your audio is never used to train third-party AI models.",
    },
    {
      q: "Is Scripra AI Notetaker free to use?",
      a: "Yes! Scripra features a Free Forever tier with unlimited real-time speaker diarization, browser mic recording, live MoM synthesis, and instant one-click transcript downloads in both .txt and formatted Markdown (.md).",
    },
    {
      q: "Can I download my meeting transcripts and notes?",
      a: "Absolutely. You can export complete diarized transcripts and formatted executive minutes in one click as plain text (.txt), Markdown (.md), or sync action items directly to Linear, Jira, Slack, and Notion.",
    },
  ];

  return (
    <div className="space-y-24 sm:space-y-32">
      {/* Hero Section */}
      <section className="text-center max-w-[960px] mx-auto px-6 pt-12 sm:pt-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-wash text-indigo text-[12px] font-mono font-bold tracking-[0.12em] uppercase border border-indigo/25 mb-6 animate-fadeIn">
          <span className="w-2 h-2 rounded-full bg-indigo animate-ping" />
          <span>Autonomous AI Meeting Notetaker</span>
        </div>

        <h1 className="text-[clamp(34px,5.5vw,64px)] font-black tracking-[-0.035em] text-ink leading-[1.08] mb-6">
          The AI notetaker that writes <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-indigo via-[#6370FF] to-teal bg-clip-text text-transparent">
            executive-ready minutes
          </span>{" "}
          in real-time.
        </h1>

        <p className="text-[17px] sm:text-[20px] text-ink-3 leading-relaxed max-w-[760px] mx-auto mb-10">
          Stop scrambling to type during meetings. Scripra auto-joins your calls, separates speakers, extracts consensus decisions, and delivers structured Minutes of Meeting (MoM) with zero manual effort.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-indigo text-white text-[15px] font-bold hover:bg-indigo-deep transition-all shadow-[0_12px_28px_rgba(67,83,255,0.3)] flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <span>Start Taking Notes Free</span>
            <span className="text-[18px]">→</span>
          </Link>
          <Link
            href="/demo"
            className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-card border border-line hover:border-indigo/40 text-ink text-[15px] font-bold transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <span>Watch 60-Second Demo</span>
          </Link>
        </div>

        <div className="flex items-center justify-center gap-6 sm:gap-10 text-[12.5px] font-mono text-ink-3">
          <div className="flex items-center gap-1.5">
            <span className="text-emerald-500 font-bold">✓</span>
            <span>No Credit Card Required</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-emerald-500 font-bold">✓</span>
            <span>Google Meet · Teams · Zoom · Webex</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-emerald-500 font-bold">✓</span>
            <span>Zero Bot Stealth Mode</span>
          </div>
        </div>
      </section>

      {/* Interactive AI Notetaker Live Simulator */}
      <section className="max-w-[1240px] mx-auto px-6">
        <div className="bg-card border border-line rounded-3xl p-6 sm:p-8 shadow-[0_30px_90px_rgba(67,83,255,0.08)] relative overflow-hidden">
          {/* Top Bar with Platform Selector */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-line mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h2 className="text-[18px] font-bold text-ink">Interactive Notetaker Live Feed</h2>
                <span className="text-[11px] font-mono uppercase bg-indigo-wash text-indigo font-bold px-2 py-0.5 rounded-full border border-indigo/20">
                  Sub-300ms Diarization
                </span>
              </div>
              <p className="text-[12.5px] text-ink-3">
                Simulating autonomous multi-speaker transcript capture and instant executive MoM generation.
              </p>
            </div>

            {/* Platform pills */}
            <div className="flex items-center gap-1.5 bg-raise p-1 rounded-xl border border-line">
              {platforms.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActivePlatform(p.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-[12px] font-bold transition-all flex items-center gap-1.5 ${
                    activePlatform === p.id
                      ? "bg-card text-ink shadow-xs border border-line"
                      : "text-ink-3 hover:text-ink"
                  }`}
                >
                  <span>{p.icon}</span>
                  <span className="hidden sm:inline">{p.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Side-by-Side Live Simulator */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Spoken Dialogue */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center justify-between text-[12px] font-mono font-bold uppercase tracking-wider text-ink-3">
                <span>Live Audio Stream</span>
                <span className="text-teal font-bold flex items-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-teal animate-ping" />
                  3 Speakers Diarized
                </span>
              </div>

              <div className="bg-canvas border border-line rounded-2xl p-4 sm:p-5 space-y-4 font-sans max-h-[380px] overflow-y-auto">
                {sampleDialogue.map((d, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className={`w-7 h-7 rounded-full ${d.avatarColor} text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5`}
                    >
                      {d.speaker[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-[13px] font-bold text-ink">{d.speaker}</span>
                        <span className="text-[11px] text-ink-3 font-mono">[{d.role}]</span>
                        <span className="text-[10.5px] text-ink-3 font-mono ml-auto">{d.time}</span>
                      </div>
                      <p className="text-[13.5px] text-ink-2 leading-relaxed bg-card p-3 rounded-xl border border-line/60">
                        {d.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: AI Notetaker Output */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center justify-between">
                {/* Tabs */}
                <div className="flex items-center gap-1 bg-raise p-1 rounded-xl border border-line">
                  <button
                    onClick={() => setActiveTab("mom")}
                    className={`px-3 py-1 rounded-lg text-[11.5px] font-bold transition-all ${
                      activeTab === "mom"
                        ? "bg-card text-indigo border border-line shadow-2xs"
                        : "text-ink-3 hover:text-ink"
                    }`}
                  >
                    📝 Executive MoM
                  </button>
                  <button
                    onClick={() => setActiveTab("actions")}
                    className={`px-3 py-1 rounded-lg text-[11.5px] font-bold transition-all ${
                      activeTab === "actions"
                        ? "bg-card text-indigo border border-line shadow-2xs"
                        : "text-ink-3 hover:text-ink"
                    }`}
                  >
                    ⚡ Action Items (2)
                  </button>
                  <button
                    onClick={() => setActiveTab("transcript")}
                    className={`px-3 py-1 rounded-lg text-[11.5px] font-bold transition-all ${
                      activeTab === "transcript"
                        ? "bg-card text-indigo border border-line shadow-2xs"
                        : "text-ink-3 hover:text-ink"
                    }`}
                  >
                    📑 Verbatim
                  </button>
                </div>

                {/* Download Actions */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleDownloadDemo("txt")}
                    className="px-3 py-1 rounded-lg bg-indigo text-white text-[11.5px] font-bold hover:bg-indigo-deep transition-all shadow-2xs flex items-center gap-1"
                    title="Download diarized notes (.txt)"
                  >
                    <span>📥</span>
                    <span>{downloadFeedback === "Transcript (.txt) downloaded!" ? "Downloaded!" : "Download .txt"}</span>
                  </button>
                  <button
                    onClick={() => handleDownloadDemo("md")}
                    className="px-2.5 py-1 rounded-lg bg-card border border-line text-[11.5px] font-mono font-bold text-ink hover:text-indigo transition-colors"
                    title="Download Markdown notes (.md)"
                  >
                    .md
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <div className="bg-canvas border border-line rounded-2xl p-5 min-h-[340px]">
                {activeTab === "mom" && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="p-3.5 rounded-xl bg-teal-wash/60 border border-teal/30">
                      <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-teal mb-1 flex items-center gap-1.5">
                        <span>🎯</span>
                        <span>Key Decision &amp; 100% Consensus</span>
                      </div>
                      <p className="text-[13px] font-semibold text-ink">
                        Team approved edge WebAssembly diarization for zero manual typing, with mandatory bot-free stealth mode for enterprise board meetings.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-[12px] font-mono font-bold uppercase tracking-wider text-ink-3 mb-2">
                        Executive Summary
                      </h4>
                      <p className="text-[13px] text-ink-2 leading-relaxed bg-card p-3 rounded-xl border border-line">
                        Discussion established core requirements for enterprise meeting automation. Sub-300ms speech latency confirmed on browser edge. One-click transcript export in both .txt and .md approved for immediate deployment.
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === "actions" && (
                  <div className="space-y-3 animate-fadeIn">
                    <div className="p-3 rounded-xl bg-card border border-line flex items-start gap-3">
                      <input type="checkbox" defaultChecked className="mt-1 accent-indigo rounded" />
                      <div className="flex-1">
                        <p className="text-[13px] font-bold text-ink">Ship one-click .txt &amp; .md transcript download</p>
                        <div className="flex items-center gap-2 mt-1 text-[11px] font-mono text-ink-3">
                          <span className="bg-indigo-wash text-indigo px-1.5 py-0.2 rounded">David Miller</span>
                          <span>Due: Friday</span>
                          <span className="text-teal font-bold">Priority: High</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-card border border-line flex items-start gap-3">
                      <input type="checkbox" className="mt-1 accent-indigo rounded" />
                      <div className="flex-1">
                        <p className="text-[13px] font-bold text-ink">Finalize SOC 2 Type II audit report for enterprise pilots</p>
                        <div className="flex items-center gap-2 mt-1 text-[11px] font-mono text-ink-3">
                          <span className="bg-amber-wash text-amber px-1.5 py-0.2 rounded">Elena Rostova</span>
                          <span>Due: Next Tuesday</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "transcript" && (
                  <div className="space-y-2 text-[12px] font-mono text-ink-2 max-h-[280px] overflow-y-auto animate-fadeIn">
                    {sampleDialogue.map((d, i) => (
                      <div key={i} className="border-b border-line/40 pb-2">
                        <span className="font-bold text-indigo">[{d.time}] {d.speaker}:</span> {d.text}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Advantages Grid */}
      <section className="max-w-[1240px] mx-auto px-6">
        <div className="text-center max-w-[640px] mx-auto mb-16">
          <h2 className="text-[clamp(28px,3.5vw,44px)] font-bold tracking-tight text-ink mb-4">
            Why teams switch to Scripra for meeting notes.
          </h2>
          <p className="text-[16px] text-ink-3">
            Designed for executives, founders, and engineering teams who need structured intelligence instead of raw unorganized transcripts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-7 rounded-3xl bg-card border border-line hover:border-indigo/40 transition-all shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-wash text-indigo flex items-center justify-center text-[22px]">
              ⚡
            </div>
            <h3 className="text-[18px] font-bold text-ink">Sub-300ms Real-Time Diarization</h3>
            <p className="text-[14px] text-ink-2 leading-relaxed">
              Scripra processes audio at the edge. Notes are generated as participants speak, allowing instant recap dispatch the exact second your meeting concludes.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-card border border-line hover:border-teal/40 transition-all shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-wash text-teal flex items-center justify-center text-[22px]">
              🕵️
            </div>
            <h3 className="text-[18px] font-bold text-ink">100% Bot-Free Invisible Mode</h3>
            <p className="text-[14px] text-ink-2 leading-relaxed">
              Need to take notes without broadcasting an AI bot to all participants? Capture directly through browser tab audio or microphone with zero intrusive bot profiles.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-card border border-line hover:border-amber/40 transition-all shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-wash text-amber flex items-center justify-center text-[22px]">
              📝
            </div>
            <h3 className="text-[18px] font-bold text-ink">Institutional Minutes of Meeting (MoM)</h3>
            <p className="text-[14px] text-ink-2 leading-relaxed">
              Formal boardroom-ready structure with agenda alignment, voting consensus, objections noted, and automated ticket synchronization to Jira and Linear.
            </p>
          </div>
        </div>
      </section>

      {/* Head-to-Head Comparison Table */}
      <section className="max-w-[1100px] mx-auto px-6">
        <div className="text-center max-w-[600px] mx-auto mb-12">
          <h2 className="text-[28px] sm:text-[36px] font-bold tracking-tight text-ink mb-3">
            How Scripra compares as an AI Notetaker.
          </h2>
          <p className="text-[15px] text-ink-3">
            Transparent comparison against legacy transcription tools.
          </p>
        </div>

        <div className="w-full bg-card border border-line rounded-3xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-line bg-raise/80 text-[12px] font-mono uppercase tracking-wider text-ink-3">
                  <th className="p-4 sm:p-5">Notetaker Capability</th>
                  <th className="p-4 sm:p-5 text-indigo font-bold bg-indigo-wash/30 border-x border-indigo/20">
                    Scripra AI
                  </th>
                  <th className="p-4 sm:p-5">Otter.ai</th>
                  <th className="p-4 sm:p-5">Fireflies.ai</th>
                </tr>
              </thead>
              <tbody className="text-[13.5px] divide-y divide-line">
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-ink">Minutes of Meeting (MoM) with Consensus</td>
                  <td className="p-4 sm:p-5 text-emerald-500 font-bold bg-indigo-wash/10 border-x border-indigo/10">
                    ✓ Full Institutional MoM
                  </td>
                  <td className="p-4 sm:p-5 text-ink-3">Basic outline only</td>
                  <td className="p-4 sm:p-5 text-ink-3">Bullet notes</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-ink">Bot-Free Stealth Recording</td>
                  <td className="p-4 sm:p-5 text-emerald-500 font-bold bg-indigo-wash/10 border-x border-indigo/10">
                    ✓ Browser &amp; Tab Audio
                  </td>
                  <td className="p-4 sm:p-5 text-rose font-semibold">✗ Bot required</td>
                  <td className="p-4 sm:p-5 text-rose font-semibold">✗ Bot required</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-ink">One-Click .txt &amp; Markdown Download</td>
                  <td className="p-4 sm:p-5 text-emerald-500 font-bold bg-indigo-wash/10 border-x border-indigo/10">
                    ✓ Unlimited Free Export
                  </td>
                  <td className="p-4 sm:p-5 text-ink-3">Requires Paid Plan</td>
                  <td className="p-4 sm:p-5 text-ink-3">Limited Free Formats</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-ink">Customer Voice Data Privacy</td>
                  <td className="p-4 sm:p-5 text-emerald-500 font-bold bg-indigo-wash/10 border-x border-indigo/10">
                    ✓ Zero AI Model Training
                  </td>
                  <td className="p-4 sm:p-5 text-ink-3">Requires Opt-out</td>
                  <td className="p-4 sm:p-5 text-emerald-500">Zero Retention</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Interactive FAQ Accordion */}
      <section className="max-w-[840px] mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-[28px] sm:text-[36px] font-bold tracking-tight text-ink mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-[15px] text-ink-3">
            Everything you need to know about taking notes with Scripra.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div
              key={i}
              className="bg-card border border-line rounded-2xl overflow-hidden transition-all shadow-2xs"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-[15px] text-ink hover:text-indigo transition-colors"
              >
                <span>{f.q}</span>
                <span className="text-ink-3 font-mono text-[18px]">
                  {openFaq === i ? "−" : "+"}
                </span>
              </button>
              {openFaq === i && (
                <div className="px-5 pb-5 pt-1 text-[14px] text-ink-2 leading-relaxed border-t border-line/50">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-[1100px] mx-auto px-6 pb-12">
        <div className="p-10 sm:p-16 rounded-3xl bg-gradient-to-br from-panel via-card to-canvas border border-line shadow-2xl text-center space-y-6 relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-[11.5px] font-mono font-bold uppercase border border-emerald-500/20">
            <span>✓ Ready to deploy in 30 seconds</span>
          </div>

          <h2 className="text-[clamp(28px,4vw,48px)] font-black tracking-tight text-ink leading-tight">
            Never take manual meeting notes again.
          </h2>

          <p className="text-[16px] text-ink-3 max-w-[600px] mx-auto">
            Experience real-time speaker diarization, automated executive MoM, and 1-click transcript export with Scripra AI.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-indigo text-white text-[15px] font-bold hover:bg-indigo-deep transition-all shadow-lg shadow-indigo/25"
            >
              Start Free Notetaker
            </Link>
            <Link
              href="/pricing"
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-card border border-line text-ink text-[15px] font-bold hover:border-indigo transition-colors"
            >
              View Free &amp; Pro Plans
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
