"use client";

import React from "react";
import Link from "next/link";

interface FeatureRow {
  name: string;
  category: string;
  scripra: string | boolean;
  fathom: string | boolean;
  otter: string | boolean;
  fireflies: string | boolean;
  highlight?: boolean;
}

export default function CompetitorComparisonSection() {
  const features: FeatureRow[] = [
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
      scripra: "Built-in Browser / System Audio",
      fathom: "Desktop app required",
      otter: false,
      fireflies: false,
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
      scripra: "Guaranteed Zero Retention",
      fathom: "Zero Retention",
      otter: "Requires Enterprise Opt-out",
      fireflies: "Zero Retention",
      highlight: true,
    },
    {
      name: "Generous Starting Tier",
      category: "Value",
      scripra: "Free Forever with Unlimited Diarization",
      fathom: "Free Tier Available",
      otter: "300 min/mo limit",
      fireflies: "Limited Free Tier",
    },
  ];

  return (
    <section id="comparison" className="py-24 sm:py-32 px-6 bg-canvas border-t border-line/60 relative overflow-hidden">
      <div className="max-w-[1320px] mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-[760px] mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-wash text-teal text-[11px] font-bold tracking-[0.15em] uppercase border border-teal/25 mb-4">
            <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
            Stage 04 · Competitive Edge &amp; Benchmark
          </div>
          <h2 className="text-[clamp(32px,4.5vw,52px)] font-black tracking-[-0.03em] text-ink leading-[1.1] mb-5">
            How Scripra compares <br className="hidden sm:inline" />
            <span className="text-indigo">to Fathom, Otter &amp; Fireflies.</span>
          </h2>
          <p className="text-[16px] sm:text-[18px] text-ink-3 leading-relaxed">
            While standard tools stop at simple call transcriptions, Scripra is purpose-built as an active conversation intelligence engine and cross-meeting memory.
          </p>
        </div>

        {/* Comparison Table Container */}
        <div className="w-full bg-card border border-line rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(67,83,255,0.07)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[760px]">
              
              {/* Table Head */}
              <thead>
                <tr className="border-b border-line bg-raise/80">
                  <th className="p-5 sm:p-6 text-[13px] font-mono font-bold uppercase tracking-wider text-ink-3 w-[34%]">
                    Core Capability
                  </th>
                  <th className="p-5 sm:p-6 text-[15px] font-extrabold text-indigo w-[22%] bg-indigo-wash/30 border-x border-indigo/20">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-indigo animate-pulse" />
                      <span>Scripra</span>
                    </div>
                  </th>
                  <th className="p-5 sm:p-6 text-[14px] font-bold text-ink-2 w-[15%]">
                    Fathom
                  </th>
                  <th className="p-5 sm:p-6 text-[14px] font-bold text-ink-2 w-[14%]">
                    Otter.ai
                  </th>
                  <th className="p-5 sm:p-6 text-[14px] font-bold text-ink-2 w-[15%]">
                    Fireflies.ai
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-line/60 text-[13.5px]">
                {features.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`transition-colors hover:bg-raise/50 ${
                      row.highlight ? "bg-indigo-wash/5" : ""
                    }`}
                  >
                    {/* Capability Name */}
                    <td className="p-4 sm:p-5 font-bold text-ink">
                      <div className="flex items-center gap-2">
                        <span>{row.name}</span>
                        {row.highlight && (
                          <span className="text-[9.5px] font-mono text-indigo bg-indigo-wash px-1.5 py-0.2 rounded border border-indigo/20">
                            Advantage
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Scripra Column (Highlighted) */}
                    <td className="p-4 sm:p-5 font-bold text-indigo bg-indigo-wash/20 border-x border-indigo/20">
                      {typeof row.scripra === "boolean" ? (
                        row.scripra ? (
                          <span className="inline-flex items-center gap-1.5 text-teal font-extrabold">
                            <span className="w-4 h-4 rounded-full bg-teal text-white flex items-center justify-center text-[10px]">
                              ✓
                            </span>
                            Yes
                          </span>
                        ) : (
                          <span className="text-ink-3">✕</span>
                        )
                      ) : (
                        <span className="text-indigo-deep font-extrabold flex items-center gap-1">
                          <span className="text-teal font-bold">✓</span>
                          {row.scripra}
                        </span>
                      )}
                    </td>

                    {/* Fathom Column */}
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

                    {/* Otter Column */}
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

                    {/* Fireflies Column */}
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

          {/* Table Footer Banner */}
          <div className="p-6 bg-raise/60 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-3 text-[13px] text-ink-2">
              <span className="text-teal font-bold">★</span>
              <span>Ready to upgrade your conversation intelligence workflow?</span>
              <span className="hidden sm:inline text-line-hi">|</span>
              <Link
                href="/investors"
                className="text-[12px] font-mono text-indigo hover:underline flex items-center gap-1"
              >
                <span>Institutional Thesis &amp; Cap Table</span>
                <span>↗</span>
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/signup"
                className="px-5 py-2.5 rounded-xl bg-indigo text-white text-[13.5px] font-bold hover:bg-indigo-deep transition-all shadow-xs"
              >
                Get Started Free
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
