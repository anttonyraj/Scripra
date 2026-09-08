"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface FeatureRow {
  name: string;
  category: string;
  scripra: string | boolean;
  fathom: string | boolean;
  otter: string | boolean;
  fireflies: string | boolean;
  highlight?: boolean;
}

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export default function InvestorsSection() {
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(0);
  const [isDeckRequested, setIsDeckRequested] = useState(false);
  const [investorEmail, setInvestorEmail] = useState("");
  const [investorFund, setInvestorFund] = useState("");
  const [requestStatus, setRequestStatus] = useState<"idle" | "submitting" | "success">("idle");

  const comparisonFeatures: FeatureRow[] = [
    {
      name: "Video Meeting Bots",
      category: "Platform",
      scripra: "Teams, Webex, Zoom & Meet",
      fathom: "Zoom, Meet, Teams",
      otter: "Zoom, Meet, Teams",
      fireflies: "Zoom, Meet, Teams, Webex",
      highlight: true,
    },
    {
      name: "Async Messaging Audio (In-Progress)",
      category: "Platform",
      scripra: "Slack & Discord Voice",
      fathom: false,
      otter: false,
      fireflies: "Slack channel recap only",
      highlight: true,
    },
    {
      name: "Bot-Free Invisible Recording",
      category: "Capture",
      scripra: "100% Client-Side WebExtension",
      fathom: "Desktop app required",
      otter: false,
      fireflies: false,
      highlight: true,
    },
    {
      name: "Structured Minutes of Meeting (MoM)",
      category: "Extraction",
      scripra: "Executive Brief + Consensus + Tasks",
      fathom: "Call Summary Only",
      otter: "Transcript + Outline",
      fireflies: "Bullet notes",
      highlight: true,
    },
    {
      name: "Cross-Meeting Long-Term Memory Graph",
      category: "Intelligence",
      scripra: "Multi-Month Semantic Network",
      fathom: "Per-call search",
      otter: "Keyword search",
      fireflies: "Topic tracker",
      highlight: true,
    },
    {
      name: "1-Click Ticket & Workflow Sync",
      category: "Integrations",
      scripra: "Linear, Jira, Slack, Notion, CRM",
      fathom: "Notion, Asana, Slack",
      otter: "Slack only",
      fireflies: "Slack, Notion, Jira",
    },
    {
      name: "AI Engine & Diarization Latency",
      category: "AI Engine",
      scripra: "Proprietary Edge Diarization (<300ms)",
      fathom: "GPT-4o mini",
      otter: "Proprietary STT",
      fireflies: "GPT-4o",
      highlight: true,
    },
    {
      name: "Direct Audio Timestamp Evidence",
      category: "Verification",
      scripra: true,
      fathom: true,
      otter: true,
      fireflies: true,
    },
    {
      name: "Zero Data Training on Your Audio",
      category: "Security",
      scripra: "Guaranteed Zero Retention (RAM Only)",
      fathom: "Zero Retention",
      otter: "Requires Enterprise Opt-out",
      fireflies: "Zero Retention",
      highlight: true,
    },
    {
      name: "Pricing & Margins Advantage",
      category: "Economics",
      scripra: "Free Forever Tier + 85% Gross Margins",
      fathom: "Per-seat paid model",
      otter: "300 min limit / legacy costs",
      fireflies: "Expensive STT overhead",
      highlight: true,
    },
  ];

  const investorFaqs: FAQItem[] = [
    {
      category: "Defensibility & Big Tech",
      question: "Why won't Google Meet, Microsoft Teams, or Zoom kill Scripra with their native AI?",
      answer:
        "Platform Neutrality & Enterprise Fragmentation. Enterprise knowledge workers don't live in a single walled garden: engineering uses Google Meet, sales leads Zoom calls, external clients mandate Microsoft Teams, and quick syncs happen over Slack huddles. Google Gemini will never index your Zoom calls, and Microsoft Copilot will never organize your Google Meet discussions. Scripra is the cross-platform, single-source-of-truth organizational memory that unifies every conversation across all tools without vendor lock-in.",
    },
    {
      category: "Capture Architecture",
      question: "How does Scripra's 100% Bot-Free capture survive enterprise bot-blocking policies?",
      answer:
        "Legacy solutions (Otter, Fireflies) dispatch synthetic participant bots that join meetings as external attendees. Today, Fortune 500 CISOs actively ban bot attendees, attendees feel surveilled, and bots get stuck in waiting rooms. Scripra operates directly in the user's browser runtime via WebExtension APIs and system audio hooks. Zero external bots ever join the call, eliminating admission delays and enterprise compliance blocks.",
    },
    {
      category: "Moat & AI Layer",
      question: "What is Scripra's defensive moat against generic LLMs like OpenAI or Anthropic?",
      answer:
        "Generic LLMs provide raw model inference, but enterprise intelligence requires stateful, cross-meeting memory. Scripra builds an evolving Knowledge Graph that tracks decisions, unresolved commitments, and stakeholder ownership across months. When a CEO asks 'Did we resolve the Q3 latency issue agreed upon in April?', Scripra queries its verified temporal graph with audio-timestamped receipts—something an ephemeral chat prompt cannot do.",
    },
    {
      category: "Unit Economics",
      question: "What are the gross margins and unit economics on real-time audio intelligence?",
      answer:
        "By leveraging client-side diarization, selective audio tokenization, and sub-300ms multimodal inference (Scripra Edge Neural Model), Scripra achieves an industry-leading compute cost profile of under $0.015 per meeting hour. Compared to legacy tools paying $0.20+ to legacy speech-to-text engines, Scripra operates at 85%+ software gross margins while offering a superior viral free tier.",
    },
    {
      category: "Go-To-Market & PLG",
      question: "What is the Go-To-Market motion and viral expansion velocity?",
      answer:
        "Bottom-Up Product-Led Growth (PLG) paired with enterprise top-down expansion. A single engineer or product manager installs the Chrome extension in 15 seconds. When they share the AI-generated Minutes of Meeting or sync action items into Jira/Slack, every meeting participant interacts with Scripra. Once 5+ seats activate within an enterprise domain, automated self-serve team upgrades and enterprise compliance upsells (SSO, BYOK, Audit Logs) kick in.",
    },
    {
      category: "Security & Compliance",
      question: "How does Scripra address enterprise infosec, HIPAA, and Zero Data Retention?",
      answer:
        "Scripra is engineered with privacy-by-design: audio streams are processed in ephemeral memory buffers with Zero Data Retention (ZDR) agreements. Customer audio is never stored or used to train public models. For regulated customers in healthcare and finance, Scripra supports Bring Your Own Key (BYOK) encryption, SOC 2 Type II compliance, and private VPC or on-prem inference deployment.",
    },
  ];

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleDeckSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!investorEmail || !investorEmail.includes("@")) return;
    setRequestStatus("submitting");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: investorFund.trim() ? `Investor (${investorFund.trim()})` : "Prospective Investor",
          email: investorEmail.trim(),
          topic: "Investor Diligence Memo & Deck Request",
          message: `Confidential investor materials requested by ${investorEmail.trim()} (Fund/Entity: ${investorFund.trim() || "Independent/Angel"}). Requesting Seed/Series A confidential memo, cap table, and unit economics review.`,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setRequestStatus("success");
      } else {
        setRequestStatus("idle");
        setErrorMessage(data.error || "Failed to transmit request.");
      }
    } catch (err: any) {
      console.error("[Investor Request Error]", err);
      setRequestStatus("idle");
      setErrorMessage("Network error connecting to server. Please try again.");
    }
  };

  return (
    <section id="investors" className="py-24 sm:py-32 px-6 bg-canvas border-t border-line/60 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-indigo/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-teal/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1320px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-[840px] mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-wash text-indigo text-[11px] font-bold tracking-[0.15em] uppercase border border-indigo/25 mb-4 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-indigo animate-pulse" />
            Strategic Thesis &amp; Investor Perspective · 2026
          </div>
          <h2 className="text-[clamp(32px,4.5vw,52px)] font-black tracking-[-0.03em] text-ink leading-[1.1] mb-5">
            The $18B Intelligence Shift: <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo via-indigo-deep to-teal">
              Why Scripra Wins the Next Decade.
            </span>
          </h2>
          <p className="text-[16px] sm:text-[18px] text-ink-3 leading-relaxed">
            Legacy meeting bots (Otter, Fireflies) are getting banned by enterprise CISOs and ignored by teams. 
            Scripra captures intelligence invisibly at the edge, compiling fragmented conversations into a compound organizational memory.
          </p>
        </div>

        {/* 4 Thesis Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          
          <div className="p-6 rounded-2xl bg-panel border border-line hover:border-indigo/40 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-wash border border-indigo/20 flex items-center justify-center text-indigo text-lg font-black mb-4 group-hover:scale-110 transition-transform">
                01
              </div>
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo mb-1">Market Catalyst</div>
              <h3 className="text-[17px] font-bold text-ink mb-2">The Enterprise Bot-Ban Wave</h3>
              <p className="text-[13.5px] text-ink-3 leading-relaxed">
                Enterprises are enforcing strict zero-external-bot policies in Zoom &amp; Teams. Scripra’s 100% Bot-Free extension captures cleanly without admission delays or attendee hesitation.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-line/60 flex items-center justify-between text-[11.5px] font-mono text-ink-3">
              <span>Security Blocked: 0%</span>
              <span className="text-teal font-bold">100% Invisible</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-panel border border-line hover:border-teal/40 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-teal-wash border border-teal/20 flex items-center justify-center text-teal text-lg font-black mb-4 group-hover:scale-110 transition-transform">
                02
              </div>
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-teal mb-1">Defensive Moat</div>
              <h3 className="text-[17px] font-bold text-ink mb-2">Cross-Meeting Memory Graph</h3>
              <p className="text-[13.5px] text-ink-3 leading-relaxed">
                Transcripts are ephemeral commodities. Scripra’s compound graph links roadmaps, commitments, and decisions across hundreds of calls to resolve ownership and accountability.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-line/60 flex items-center justify-between text-[11.5px] font-mono text-ink-3">
              <span>Single Call Silo</span>
              <span className="text-indigo font-bold">Compound Moat</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-panel border border-line hover:border-indigo/40 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-wash border border-indigo/20 flex items-center justify-center text-indigo text-lg font-black mb-4 group-hover:scale-110 transition-transform">
                03
              </div>
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-indigo mb-1">Unit Economics</div>
              <h3 className="text-[17px] font-bold text-ink mb-2">85%+ Software Gross Margins</h3>
              <p className="text-[13.5px] text-ink-3 leading-relaxed">
                By bypassing expensive legacy STT pipelines in favor of client-side diarization and ultra-efficient edge neural inference, compute cost is dropped to under $0.015/hour.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-line/60 flex items-center justify-between text-[11.5px] font-mono text-ink-3">
              <span>Legacy STT: $0.25/hr</span>
              <span className="text-teal font-bold">Scripra: &lt;$0.02/hr</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-panel border border-line hover:border-amber/40 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between group">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-wash border border-amber/20 flex items-center justify-center text-amber text-lg font-black mb-4 group-hover:scale-110 transition-transform">
                04
              </div>
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber mb-1">Expansion Engine</div>
              <h3 className="text-[17px] font-bold text-ink mb-2">PLG to Enterprise Pipeline</h3>
              <p className="text-[13.5px] text-ink-3 leading-relaxed">
                1-click Chrome Extension install drives grassroots team adoption. Shared interactive Minutes of Meeting virally invite attendees, converting organically into multi-seat contracts.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-line/60 flex items-center justify-between text-[11.5px] font-mono text-ink-3">
              <span>Viral Loop: 1.4x</span>
              <span className="text-amber-deep font-bold">In-App Expansion</span>
            </div>
          </div>

        </div>

        {/* COMPETITOR COMPARISON MATRIX (Integrated as the Institutional Moat) */}
        <div className="mb-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-wash text-teal text-[11px] font-bold tracking-[0.15em] uppercase border border-teal/25 mb-2">
                Competitive Benchmark
              </div>
              <h3 className="text-[26px] sm:text-[34px] font-black tracking-[-0.02em] text-ink">
                Scripra vs. Legacy Meeting Transcription
              </h3>
              <p className="text-[14px] sm:text-[15px] text-ink-3 max-w-[650px] mt-1">
                Comparing capture architecture, intelligence extraction, unit margins, and privacy against Fathom, Otter.ai, and Fireflies.
              </p>
            </div>
            <div className="text-[12px] font-mono text-ink-3 bg-raise px-3 py-1.5 rounded-lg border border-line self-start sm:self-auto">
              Verified Benchmark Q1 2026
            </div>
          </div>

          <div className="w-full bg-card border border-line rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(67,83,255,0.07)]">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[760px]">
                <thead>
                  <tr className="border-b border-line bg-raise/80">
                    <th className="p-5 sm:p-6 text-[12px] font-mono font-bold uppercase tracking-wider text-ink-3 w-[34%]">
                      Core Capability &amp; Strategic Vector
                    </th>
                    <th className="p-5 sm:p-6 text-[15px] font-extrabold text-indigo w-[24%] bg-indigo-wash/30 border-x border-indigo/20">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-indigo animate-pulse" />
                        <span>Scripra</span>
                        <span className="text-[10px] bg-indigo text-white px-2 py-0.5 rounded-full font-bold">Leader</span>
                      </div>
                    </th>
                    <th className="p-5 sm:p-6 text-[14px] font-bold text-ink-2 w-[14%]">Fathom</th>
                    <th className="p-5 sm:p-6 text-[14px] font-bold text-ink-2 w-[14%]">Otter.ai</th>
                    <th className="p-5 sm:p-6 text-[14px] font-bold text-ink-2 w-[14%]">Fireflies.ai</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-line/60 text-[13.5px]">
                  {comparisonFeatures.map((row, idx) => (
                    <tr
                      key={idx}
                      className={`transition-colors hover:bg-raise/50 ${
                        row.highlight ? "bg-indigo-wash/5" : ""
                      }`}
                    >
                      <td className="p-4 sm:p-5 font-bold text-ink">
                        <div className="flex items-center gap-2">
                          <span>{row.name}</span>
                          {row.highlight && (
                            <span className="text-[9.5px] font-mono text-indigo bg-indigo-wash px-1.5 py-0.5 rounded border border-indigo/20">
                              Moat
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="p-4 sm:p-5 font-bold text-indigo bg-indigo-wash/20 border-x border-indigo/20">
                        {typeof row.scripra === "boolean" ? (
                          row.scripra ? (
                            <span className="inline-flex items-center gap-1.5 text-teal font-extrabold">
                              <span className="w-4 h-4 rounded-full bg-teal text-white flex items-center justify-center text-[10px]">✓</span>
                              Yes
                            </span>
                          ) : (
                            <span className="text-ink-3">✕</span>
                          )
                        ) : (
                          <span className="text-indigo-deep font-extrabold flex items-center gap-1.5">
                            <span className="text-teal font-bold">✓</span>
                            {row.scripra}
                          </span>
                        )}
                      </td>

                      <td className="p-4 sm:p-5 text-ink-2 font-medium">
                        {typeof row.fathom === "boolean" ? (
                          row.fathom ? (
                            <span className="text-teal font-bold">✓ Yes</span>
                          ) : (
                            <span className="text-ink-3 opacity-60">✕ No</span>
                          )
                        ) : (
                          row.fathom
                        )}
                      </td>

                      <td className="p-4 sm:p-5 text-ink-2 font-medium">
                        {typeof row.otter === "boolean" ? (
                          row.otter ? (
                            <span className="text-teal font-bold">✓ Yes</span>
                          ) : (
                            <span className="text-ink-3 opacity-60">✕ No</span>
                          )
                        ) : (
                          row.otter
                        )}
                      </td>

                      <td className="p-4 sm:p-5 text-ink-2 font-medium">
                        {typeof row.fireflies === "boolean" ? (
                          row.fireflies ? (
                            <span className="text-teal font-bold">✓ Yes</span>
                          ) : (
                            <span className="text-ink-3 opacity-60">✕ No</span>
                          )
                        ) : (
                          row.fireflies
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-6 bg-raise/60 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-ink-2">
              <div className="flex items-center gap-2">
                <span className="text-teal font-bold">✦</span>
                <span>Architected from day one for zero enterprise intrusion and durable knowledge defensibility.</span>
              </div>
              <a
                href="#deck-request"
                className="text-indigo font-bold hover:underline inline-flex items-center gap-1"
              >
                Request Cap Table &amp; Financial Model →
              </a>
            </div>
          </div>
        </div>

        {/* INVESTOR & STRATEGIC FAQ ACCORDION */}
        <div className="mb-24">
          <div className="text-center max-w-[720px] mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-wash text-teal text-[11px] font-bold tracking-[0.15em] uppercase border border-teal/25 mb-3">
              Strategic Due Diligence
            </div>
            <h3 className="text-[28px] sm:text-[38px] font-black tracking-[-0.03em] text-ink">
              Frequently Addressed Investor Inquiries
            </h3>
            <p className="text-[15px] sm:text-[16px] text-ink-3 mt-2">
              Clear, unvarnished answers to the tough questions regarding platform risk, technical defensibility, and market timing.
            </p>
          </div>

          <div className="max-w-[960px] mx-auto space-y-4">
            {investorFaqs.map((faq, idx) => {
              const isOpen = activeFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? "bg-card border-indigo/40 shadow-[0_8px_25px_rgba(67,83,255,0.06)]"
                      : "bg-panel/70 border-line hover:border-line-hover"
                  }`}
                >
                  <button
                    onClick={() => setActiveFaqIndex(isOpen ? null : idx)}
                    className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 focus:outline-none"
                  >
                    <div className="flex flex-col gap-1 pr-2">
                      <span className="text-[10.5px] font-mono uppercase tracking-wider text-indigo font-bold">
                        {faq.category}
                      </span>
                      <span className="text-[16px] sm:text-[17px] font-bold text-ink leading-snug">
                        {faq.question}
                      </span>
                    </div>
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center border text-xs font-bold shrink-0 transition-transform duration-200 ${
                        isOpen
                          ? "bg-indigo text-white border-indigo rotate-180"
                          : "bg-raise text-ink-3 border-line rotate-0"
                      }`}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-5 sm:px-6 pb-6 pt-1 text-[14.5px] text-ink-2 leading-relaxed border-t border-line/40">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* INVESTOR DECK & FOUNDER BRIEFING CARD */}
        <div id="deck-request" className="max-w-[1080px] mx-auto">
          <div className="relative rounded-3xl bg-gradient-to-br from-[#0e101f] via-[#12152b] to-[#0a0c16] text-white p-8 sm:p-14 border border-white/10 shadow-2xl overflow-hidden">
            
            {/* Ambient decorative glow inside card */}
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-indigo/30 blur-[90px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-teal/20 blur-[90px] rounded-full pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-[11px] font-mono tracking-wider uppercase mb-4 border border-white/15">
                  <span className="w-2 h-2 rounded-full bg-teal" />
                  Seed / Series A Confidential Access
                </div>
                <h3 className="text-[28px] sm:text-[36px] font-black tracking-[-0.03em] leading-tight mb-4">
                  Request Confidential Deck &amp; Cap Table
                </h3>
                <p className="text-[15px] text-white/70 leading-relaxed mb-6">
                  Qualified angel syndicates, institutional venture funds, and strategic enterprise partners can request our full investment deck, unit economics breakdown, and roadmap.
                </p>

                <div className="grid grid-cols-2 gap-4 text-[13px] text-white/80">
                  <div className="flex items-center gap-2">
                    <span className="text-teal font-bold">✓</span>
                    <span>Detailed Financial Projections</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-teal font-bold">✓</span>
                    <span>Client-Side Capture Architecture</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-teal font-bold">✓</span>
                    <span>15-Min Founder Demo Booking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-teal font-bold">✓</span>
                    <span>Live Retention &amp; Cohort Metrics</span>
                  </div>
                </div>
              </div>

              {/* Form / Success State */}
              <div className="lg:col-span-5 bg-white/5 border border-white/10 p-6 sm:p-7 rounded-2xl backdrop-blur-md">
                {requestStatus === "success" ? (
                  <div className="text-center py-6">
                    <div className="w-12 h-12 rounded-full bg-teal/20 border border-teal text-teal mx-auto flex items-center justify-center text-xl font-bold mb-3">
                      ✓
                    </div>
                    <h4 className="text-[18px] font-bold text-white mb-2">Request Received</h4>
                    <p className="text-[13px] text-white/70 mb-4">
                      Thank you. We have dispatched the confidential investor memo to <span className="text-teal font-mono">{investorEmail}</span>. Our founding team will follow up within 24 hours.
                    </p>
                    <button
                      onClick={() => setRequestStatus("idle")}
                      className="text-[12px] font-mono text-white/50 hover:text-white underline"
                    >
                      Submit another inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleDeckSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-mono tracking-wider uppercase text-white/60 mb-1.5">
                        Work / Fund Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="partner@sequoia.com"
                        value={investorEmail}
                        onChange={(e) => setInvestorEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-[14px] placeholder-white/40 focus:outline-none focus:border-indigo"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono tracking-wider uppercase text-white/60 mb-1.5">
                        Fund / Entity Name (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Bessemer / Angel"
                        value={investorFund}
                        onChange={(e) => setInvestorFund(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-[14px] placeholder-white/40 focus:outline-none focus:border-indigo"
                      />
                    </div>

                    {errorMessage && (
                      <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-[12.5px] leading-snug">
                        {errorMessage}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={requestStatus === "submitting"}
                      className="w-full py-3 rounded-xl bg-indigo hover:bg-indigo-deep text-white font-bold text-[14px] transition-all shadow-lg hover:shadow-indigo/30 active:scale-[0.98] disabled:opacity-50"
                    >
                      {requestStatus === "submitting" ? "Verifying Access..." : "Request Pitch Deck & Memo"}
                    </button>

                    <p className="text-[11px] text-white/40 text-center">
                      Confidential. Sent under mutual NDA terms.
                    </p>
                  </form>
                )}
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
