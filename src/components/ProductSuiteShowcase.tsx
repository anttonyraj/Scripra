"use client";

import React, { useState } from "react";
import Link from "next/link";

interface ProductTab {
  id: string;
  name: string;
  tagline: string;
  badge: string;
  color: string;
  icon: string;
}

const products: ProductTab[] = [
  {
    id: "global",
    name: "Scripra Global",
    tagline: "Live Multilingual Interpretation & Code-Switching",
    badge: "Proprietary Multilingual Core",
    color: "teal",
    icon: "🌐",
  },
  {
    id: "dealcloser",
    name: "Scripra DealCloser",
    tagline: "Real-Time In-Meeting Sales Whisper AI & Battlecards",
    badge: "Sub-300ms Neural Streaming",
    color: "amber",
    icon: "⚡",
  },
  {
    id: "omnichannel",
    name: "Scripra Omnichannel",
    tagline: "Universal Voice Intelligence Across Every Workplace App",
    badge: "Teams · Zoom · Meet · Slack · Discord",
    color: "rose",
    icon: "🔄",
  },
];

export default function ProductSuiteShowcase() {
  const [activeTab, setActiveTab] = useState<string>("global");

  return (
    <section className="py-20 bg-canvas text-ink relative overflow-hidden" id="products-suite">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes wave-bounce {
          0%, 100% { height: 16%; }
          50% { height: 95%; }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.95); opacity: 0.8; }
          50% { transform: scale(1.08); opacity: 0.3; }
          100% { transform: scale(0.95); opacity: 0.8; }
        }
        @keyframes laser-sweep {
          0% { transform: translateY(-100%); opacity: 0.2; }
          50% { opacity: 0.8; }
          100% { transform: translateY(100%); opacity: 0.2; }
        }
        @keyframes data-drift {
          0% { stroke-dashoffset: 60; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes float-hud {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        .anim-wave-1 { animation: wave-bounce 1.1s ease-in-out infinite; }
        .anim-wave-2 { animation: wave-bounce 1.4s ease-in-out infinite 0.2s; }
        .anim-wave-3 { animation: wave-bounce 0.9s ease-in-out infinite 0.4s; }
        .anim-wave-4 { animation: wave-bounce 1.3s ease-in-out infinite 0.1s; }
        .anim-wave-5 { animation: wave-bounce 1.0s ease-in-out infinite 0.3s; }
        .anim-pulse-ring { animation: pulse-ring 3s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .anim-laser { animation: laser-sweep 2.8s ease-in-out infinite; }
        .anim-data-flow { stroke-dasharray: 6 6; animation: data-drift 2s linear infinite; }
        .anim-float { animation: float-hud 4s ease-in-out infinite; }
      `}} />

      <div className="max-w-[1240px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-[840px] mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-wash border border-indigo/25 text-indigo text-[11px] font-mono font-bold tracking-wider uppercase mb-5 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
            <span>Next-Generation Product Suite</span>
          </div>
          <h2 className="text-[clamp(32px,4.5vw,52px)] font-black tracking-tight text-ink leading-[1.1] mb-5">
            Beyond Basic Notetakers. <br />
            <span className="text-indigo">Specialized AI Conversation Products.</span>
          </h2>
          <p className="text-[16px] sm:text-[18px] text-ink-3 leading-relaxed max-w-[700px] mx-auto">
            Otter.ai and Fathom only generate delayed English summaries. Scripra harnesses proprietary acoustic models and edge neural engines to power live simultaneous translation, in-meeting sales whisper battlecards, and universal cross-platform bots.
          </p>
        </div>

        {/* Product Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12 p-1.5 rounded-2xl bg-raise border border-line max-w-[940px] mx-auto shadow-xs">
          {products.map((p) => {
            const isActive = activeTab === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActiveTab(p.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-bold text-[13px] transition-all cursor-pointer ${
                  isActive
                    ? "bg-card text-ink shadow-sm border border-line scale-[1.02]"
                    : "text-ink-3 hover:text-ink hover:bg-card/50"
                }`}
              >
                <span className="text-lg">{p.icon}</span>
                <div className="text-left">
                  <div className="leading-tight">{p.name}</div>
                  <div className="text-[10px] font-mono font-normal opacity-70 hidden sm:block">{p.badge}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* PRODUCT 1: SCRIPRA GLOBAL */}
        {/* ======================================================== */}
        {activeTab === "global" && (
          <div className="space-y-12 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Text Description */}
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-teal-wash border border-teal/30 text-teal text-[11px] font-mono font-bold uppercase tracking-wider">
                  <span>🌐 Scripra 60+ Language Polyglot Engine</span>
                </div>
                <h3 className="text-[28px] sm:text-[36px] font-black text-ink tracking-tight leading-tight">
                  Scripra Global: Simultaneous Multilingual Interpretation &amp; Code-Switching
                </h3>
                <p className="text-[15px] text-ink-3 leading-relaxed">
                  International teams waste hundreds of hours deciphering accented dialogue and language barriers. While Otter only handles English and single-language recordings, <strong className="text-ink">Scripra Global natively understands mid-sentence code-switching</strong> (switching between English, Spanish, Hindi, or Tagalog within the same sentence) without requiring users to manually select language modes.
                </p>

                {/* Key Points */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-card border border-line">
                    <div className="text-[11px] font-mono font-bold text-teal uppercase mb-1">Sub-Syllable Detection</div>
                    <div className="text-[13px] text-ink-2">Instant language shift recognition mid-breath without latency spikes.</div>
                  </div>
                  <div className="p-4 rounded-xl bg-card border border-line">
                    <div className="text-[11px] font-mono font-bold text-indigo uppercase mb-1">Live Multi-Track Subtitles</div>
                    <div className="text-[13px] text-ink-2">Each attendee reads subtitles rendered in their own preferred native tongue.</div>
                  </div>
                  <div className="p-4 rounded-xl bg-card border border-line">
                    <div className="text-[11px] font-mono font-bold text-amber uppercase mb-1">Acoustic Accent Invariance</div>
                    <div className="text-[13px] text-ink-2">Trained on diverse global acoustic corpora for flawless technical recognition.</div>
                  </div>
                  <div className="p-4 rounded-xl bg-card border border-line">
                    <div className="text-[11px] font-mono font-bold text-rose uppercase mb-1">85% Lower Margins</div>
                    <div className="text-[13px] text-ink-2">High-efficiency neural streaming at just $0.12/hr vs $2.00/hr legacy interpretation.</div>
                  </div>
                </div>
              </div>

              {/* Animated SVG Illustration: Multilingual Pipeline */}
              <div className="lg:col-span-6">
                <div className="p-6 sm:p-8 rounded-3xl bg-card border-2 border-teal/30 shadow-md relative overflow-hidden">
                  <div className="text-[11px] font-mono font-bold text-teal uppercase tracking-widest mb-4 flex items-center justify-between">
                    <span>LIVE PIPELINE SIMULATION</span>
                    <span className="flex items-center gap-1 text-[10px] text-ink-3">
                      <span className="w-2 h-2 rounded-full bg-teal animate-pulse" /> 60+ Languages Live
                    </span>
                  </div>

                  {/* SVG Canvas */}
                  <svg viewBox="0 0 540 380" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="globalGlow" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#00D2B4" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#4353FF" stopOpacity="0.1" />
                      </linearGradient>
                      <linearGradient id="streamGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#00D2B4" />
                        <stop offset="100%" stopColor="#4353FF" />
                      </linearGradient>
                    </defs>

                    {/* Background Rect */}
                    <rect x="0" y="0" width="540" height="380" rx="20" fill="url(#globalGlow)" stroke="#00D2B4" strokeOpacity="0.2" />

                    {/* Speaker Box (Input) */}
                    <rect x="24" y="30" width="492" height="75" rx="14" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.5" />
                    <circle cx="50" cy="67" r="16" fill="#00D2B4" fillOpacity="0.15" />
                    <text x="50" y="72" textAnchor="middle" fontSize="16">🎙️</text>
                    <text x="76" y="55" fontSize="11" fontFamily="monospace" fontWeight="bold" fill="#00A38C">SPEAKER [MEXICO CITY / HYDERABAD]</text>
                    <text x="76" y="73" fontSize="13" fontWeight="600" fill="#111827">&quot;Let&apos;s push the release, aur deployment status kal subah check karenge.&quot;</text>
                    <text x="76" y="90" fontSize="10" fontFamily="monospace" fill="#6B7280">[Code-Switching Detected: English + Hindi]</text>

                    {/* Connecting Audio Waves */}
                    <g transform="translate(240, 115)">
                      <rect x="0" y="0" width="4" height="24" rx="2" fill="#00D2B4" className="anim-wave-1" />
                      <rect x="8" y="0" width="4" height="24" rx="2" fill="#00D2B4" className="anim-wave-2" />
                      <rect x="16" y="0" width="4" height="24" rx="2" fill="#4353FF" className="anim-wave-3" />
                      <rect x="24" y="0" width="4" height="24" rx="2" fill="#4353FF" className="anim-wave-4" />
                      <rect x="32" y="0" width="4" height="24" rx="2" fill="#00D2B4" className="anim-wave-5" />
                      <rect x="40" y="0" width="4" height="24" rx="2" fill="#4353FF" className="anim-wave-2" />
                      <rect x="48" y="0" width="4" height="24" rx="2" fill="#00D2B4" className="anim-wave-1" />
                    </g>

                    {/* Scripra Engine Core Box */}
                    <rect x="120" y="150" width="300" height="60" rx="14" fill="#111827" />
                    <text x="270" y="176" textAnchor="middle" fontSize="12" fontFamily="monospace" fontWeight="bold" fill="#00E5C4">⚡ SCRIPRA POLYGLOT ACOUSTIC CORE</text>
                    <text x="270" y="194" textAnchor="middle" fontSize="10" fill="#9CA3AF">Simultaneous Tokenization · Zero Manual Language Toggle</text>

                    {/* Data Stream Paths Downward */}
                    <path d="M210 210 L150 245" stroke="url(#streamGrad)" strokeWidth="2" className="anim-data-flow" />
                    <path d="M270 210 L270 245" stroke="url(#streamGrad)" strokeWidth="2" className="anim-data-flow" />
                    <path d="M330 210 L390 245" stroke="url(#streamGrad)" strokeWidth="2" className="anim-data-flow" />

                    {/* Output Subtitle Cards */}
                    {/* English Subtitle */}
                    <rect x="24" y="250" width="155" height="105" rx="12" fill="#FFFFFF" stroke="#00D2B4" strokeWidth="1.5" />
                    <text x="36" y="272" fontSize="11" fontWeight="bold" fill="#00A38C">🇬🇧 ENGLISH SYNC</text>
                    <text x="36" y="295" fontSize="11.5" fontWeight="500" fill="#111827">&quot;Let&apos;s push the release, and we&apos;ll check deployment tomorrow.&quot;</text>
                    <text x="36" y="340" fontSize="9" fontFamily="monospace" fill="#00A38C">✓ LATENCY: 220ms</text>

                    {/* Spanish Subtitle */}
                    <rect x="192" y="250" width="155" height="105" rx="12" fill="#FFFFFF" stroke="#4353FF" strokeWidth="1.5" />
                    <text x="204" y="272" fontSize="11" fontWeight="bold" fill="#4353FF">🇪🇸 SPANISH SYNC</text>
                    <text x="204" y="295" fontSize="11.5" fontWeight="500" fill="#111827">&quot;Hagamos el despliegue y revisaremos el estado mañana.&quot;</text>
                    <text x="204" y="340" fontSize="9" fontFamily="monospace" fill="#4353FF">✓ LATENCY: 240ms</text>

                    {/* Japanese Subtitle */}
                    <rect x="360" y="250" width="155" height="105" rx="12" fill="#FFFFFF" stroke="#F5A020" strokeWidth="1.5" />
                    <text x="372" y="272" fontSize="11" fontWeight="bold" fill="#B45309">🇯🇵 JAPANESE SYNC</text>
                    <text x="372" y="295" fontSize="11.5" fontWeight="500" fill="#111827">&quot;リリースを実行し、明日の朝デプロイ状況を確認しましょう。&quot;</text>
                    <text x="372" y="340" fontSize="9" fontFamily="monospace" fill="#B45309">✓ LATENCY: 260ms</text>
                  </svg>
                </div>
              </div>
            </div>

            {/* Step-by-Step Architecture */}
            <div className="p-6 sm:p-8 rounded-3xl bg-raise border border-line">
              <h4 className="text-[18px] font-bold text-ink mb-6">How Scripra Global Operates (4-Step Pipeline)</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-card border border-line">
                  <div className="text-[12px] font-mono font-bold text-teal mb-1">01. Multi-Tone Ingestion</div>
                  <p className="text-[12.5px] text-ink-3">Captures 16kHz PCM audio stream from Teams/Zoom with no voice clipping.</p>
                </div>
                <div className="p-4 rounded-2xl bg-card border border-line">
                  <div className="text-[12px] font-mono font-bold text-teal mb-1">02. Code-Switching ASR</div>
                  <p className="text-[12.5px] text-ink-3">Scripra identifies language switches syllable-by-syllable in real-time RAM.</p>
                </div>
                <div className="p-4 rounded-2xl bg-card border border-line">
                  <div className="text-[12px] font-mono font-bold text-teal mb-1">03. Flash Polyglot Synthesis</div>
                  <p className="text-[12.5px] text-ink-3">Scripra Neural Engine aligns contextual translations into target languages.</p>
                </div>
                <div className="p-4 rounded-2xl bg-card border border-line">
                  <div className="text-[12px] font-mono font-bold text-teal mb-1">04. Synchronized Overlay</div>
                  <p className="text-[12.5px] text-ink-3">Live translated subtitle streams broadcast instantly to participant viewports.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* PRODUCT 2: SCRIPRA DEALCLOSER */}
        {/* ======================================================== */}
        {activeTab === "dealcloser" && (
          <div className="space-y-12 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Text Description */}
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-wash border border-amber/30 text-amber-deep text-[11px] font-mono font-bold uppercase tracking-wider">
                  <span>⚡ Sub-300ms Real-Time HUD</span>
                </div>
                <h3 className="text-[28px] sm:text-[36px] font-black text-ink tracking-tight leading-tight">
                  Scripra DealCloser: Real-Time Sales Whisper AI &amp; In-Call Battlecards
                </h3>
                <p className="text-[15px] text-ink-3 leading-relaxed">
                  Fathom and Otter are completely passive—they just email you a summary after the call is over. When a tough prospect mentions a competitor or pushes back on price, <strong className="text-ink">you need the winning answer immediately, while you are still speaking</strong>. Scripra DealCloser turns live calls into unfair advantages.
                </p>

                {/* Key Points */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-card border border-line">
                    <div className="text-[11px] font-mono font-bold text-amber-deep uppercase mb-1">Sub-300ms Intent Stream</div>
                    <div className="text-[13px] text-ink-2">Acoustic token streaming detects competitor mentions within 1/3 of a second.</div>
                  </div>
                  <div className="p-4 rounded-xl bg-card border border-line">
                    <div className="text-[11px] font-mono font-bold text-indigo uppercase mb-1">Automated Objection Battlecards</div>
                    <div className="text-[13px] text-ink-2">Instantly renders exact talking points, ROI metrics, and trap questions on your screen.</div>
                  </div>
                  <div className="p-4 rounded-xl bg-card border border-line">
                    <div className="text-[11px] font-mono font-bold text-teal uppercase mb-1">Real-Time Acoustic Sentiment</div>
                    <div className="text-[13px] text-ink-2">Live visual meters show customer engagement, hesitation, and talk-to-listen ratios.</div>
                  </div>
                  <div className="p-4 rounded-xl bg-card border border-line">
                    <div className="text-[11px] font-mono font-bold text-rose uppercase mb-1">CRM Auto-Sync (Salesforce/HubSpot)</div>
                    <div className="text-[13px] text-ink-2">Direct sync of next steps, MEDDPICC criteria, and budget figures without typing.</div>
                  </div>
                </div>
              </div>

              {/* Animated SVG Illustration: Live Sales HUD */}
              <div className="lg:col-span-6">
                <div className="p-6 sm:p-8 rounded-3xl bg-card border-2 border-amber/30 shadow-md relative overflow-hidden">
                  <div className="text-[11px] font-mono font-bold text-amber-deep uppercase tracking-widest mb-4 flex items-center justify-between">
                    <span>SALES IN-MEETING HUD (CONFIDENTIAL)</span>
                    <span className="flex items-center gap-1 text-[10px] text-amber-deep">
                      <span className="w-2 h-2 rounded-full bg-amber animate-pulse" /> Live Whisper Active
                    </span>
                  </div>

                  {/* SVG Canvas */}
                  <svg viewBox="0 0 540 380" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="dealGlow" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#F5A020" stopOpacity="0.12" />
                        <stop offset="100%" stopColor="#4353FF" stopOpacity="0.08" />
                      </linearGradient>
                      <filter id="shadowCard" x="-10%" y="-10%" width="120%" height="120%">
                        <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#F5A020" floodOpacity="0.18" />
                      </filter>
                    </defs>

                    {/* Canvas Background */}
                    <rect x="0" y="0" width="540" height="380" rx="20" fill="url(#dealGlow)" stroke="#F5A020" strokeOpacity="0.3" />

                    {/* Prospect Speech Input */}
                    <rect x="24" y="24" width="492" height="74" rx="14" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="1.5" />
                    <circle cx="50" cy="61" r="16" fill="#F5A020" fillOpacity="0.2" />
                    <text x="50" y="66" textAnchor="middle" fontSize="16">💼</text>
                    <text x="76" y="48" fontSize="11" fontFamily="monospace" fontWeight="bold" fill="#B45309">PROSPECT (VP OF ENGINEERING)</text>
                    <text x="76" y="67" fontSize="12.5" fontWeight="600" fill="#111827">&quot;We like Scripra, but Gong is giving us a 20% discount on annual seats...&quot;</text>
                    <text x="76" y="85" fontSize="10" fontFamily="monospace" fill="#E14B5A">🚨 [OBJECTION DETECTED: PRICING + COMPETITOR &apos;GONG&apos;]</text>

                    {/* Scripra Lightning Fast Radar Line */}
                    <path d="M270 98 L270 130" stroke="#F5A020" strokeWidth="2.5" strokeDasharray="4 4" className="anim-data-flow" />

                    {/* Radar Pulse Circle */}
                    <circle cx="270" cy="140" r="18" fill="#F5A020" fillOpacity="0.1" className="anim-pulse-ring" />
                    <circle cx="270" cy="140" r="8" fill="#F5A020" />
                    <text x="270" y="143" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#FFFFFF">300ms</text>

                    {/* Floating Holographic Battlecard (Animated Float) */}
                    <g className="anim-float">
                      <rect x="36" y="170" width="468" height="185" rx="16" fill="#FFFFFF" stroke="#F5A020" strokeWidth="2" filter="url(#shadowCard)" />
                      
                      {/* Battlecard Header */}
                      <rect x="36" y="170" width="468" height="38" rx="16" fill="#FFFBEB" />
                      <text x="56" y="194" fontSize="12" fontFamily="monospace" fontWeight="bold" fill="#B45309">⚡ LIVE BATTLECARD: GONG PRICING OBJECTION</text>
                      <rect x="420" y="178" width="70" height="22" rx="6" fill="#F5A020" />
                      <text x="455" y="193" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#FFFFFF">98% CONF</text>

                      {/* Counter Metrics */}
                      <g transform="translate(56, 222)">
                        <circle cx="6" cy="6" r="4" fill="#00D2B4" />
                        <text x="18" y="10" fontSize="12" fontWeight="bold" fill="#111827">Counter 1: Hidden Platform Costs</text>
                        <text x="18" y="26" fontSize="11" fill="#4B5563">Gong charges $1,400/user/yr + expensive 3-yr commitments. Scripra is $19/mo pay-as-you-go.</text>
                      </g>

                      <g transform="translate(56, 266)">
                        <circle cx="6" cy="6" r="4" fill="#00D2B4" />
                        <text x="18" y="10" fontSize="12" fontWeight="bold" fill="#111827">Counter 2: Privacy &amp; Data Training Trap</text>
                        <text x="18" y="26" fontSize="11" fill="#4B5563">Gong retains recordings to train models. Scripra operates with 100% ephemeral RAM &amp; ZDR.</text>
                      </g>

                      {/* Recommended Talk Track */}
                      <rect x="52" y="306" width="436" height="36" rx="8" fill="#F4F5FB" stroke="#E5E7EB" />
                      <text x="64" y="322" fontSize="10" fontFamily="monospace" fontWeight="bold" fill="#4353FF">💡 SUGGESTED TALK TRACK:</text>
                      <text x="64" y="335" fontSize="11" fontStyle="italic" fill="#111827">&quot;I hear you on the upfront discount. Have you factored in their mandatory multi-year contract and data retention risks?&quot;</text>
                    </g>
                  </svg>
                </div>
              </div>
            </div>

            {/* Step-by-Step Architecture */}
            <div className="p-6 sm:p-8 rounded-3xl bg-raise border border-line">
              <h4 className="text-[18px] font-bold text-ink mb-6">How DealCloser Operates in Real Time</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-card border border-line">
                  <div className="text-[12px] font-mono font-bold text-amber-deep mb-1">01. Sub-300ms Streaming</div>
                  <p className="text-[12.5px] text-ink-3">Scripra delivers instantaneous word tokens directly from the buyer&apos;s speech.</p>
                </div>
                <div className="p-4 rounded-2xl bg-card border border-line">
                  <div className="text-[12px] font-mono font-bold text-amber-deep mb-1">02. Entity &amp; Intent Match</div>
                  <p className="text-[12.5px] text-ink-3">Scans for competitor keywords, budget pushback, timeline delays, and hesitations.</p>
                </div>
                <div className="p-4 rounded-2xl bg-card border border-line">
                  <div className="text-[12px] font-mono font-bold text-amber-deep mb-1">03. Flash Battlecard Query</div>
                  <p className="text-[12.5px] text-ink-3">Scripra queries your company&apos;s pricing sheet and competitive playbook in 200ms.</p>
                </div>
                <div className="p-4 rounded-2xl bg-card border border-line">
                  <div className="text-[12px] font-mono font-bold text-amber-deep mb-1">04. Private Rep HUD</div>
                  <p className="text-[12.5px] text-ink-3">Pops up clean talking points visible solely on the sales rep&apos;s dual monitor or sidebar.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* PRODUCT 3: SCRIPRA OMNICHANNEL */}
        {/* ======================================================== */}
        {activeTab === "omnichannel" && (
          <div className="space-y-12 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Text Description */}
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-rose-wash border border-rose/30 text-rose text-[11px] font-mono font-bold uppercase tracking-wider">
                  <span>🔄 6 Major Platforms Supported</span>
                </div>
                <h3 className="text-[28px] sm:text-[36px] font-black text-ink tracking-tight leading-tight">
                  Scripra Omnichannel: Universal Voice Bot for Every Workplace App
                </h3>
                <p className="text-[15px] text-ink-3 leading-relaxed">
                  Companies don&apos;t just use Zoom. Engineers chat on <strong className="text-ink">Discord</strong> and jump into <strong className="text-ink">Slack Huddles</strong>; enterprise clients use <strong className="text-ink">Microsoft Teams</strong> and <strong className="text-ink">Webex</strong>. Otter and Fathom force you into silos. Scripra Omnichannel brings a single, unified intelligence layer across all 6 workplace audio platforms.
                </p>

                {/* Key Points */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-card border border-line">
                    <div className="text-[11px] font-mono font-bold text-rose uppercase mb-1">Zero-Config URL Join</div>
                    <div className="text-[13px] text-ink-2">Paste any Teams, Zoom, Meet, or Webex link and Scripra joins automatically in seconds.</div>
                  </div>
                  <div className="p-4 rounded-xl bg-card border border-line">
                    <div className="text-[11px] font-mono font-bold text-indigo uppercase mb-1">Slack Huddles &amp; Discord Bot</div>
                    <div className="text-[13px] text-ink-2">Autonomous voice bot sits silently in team channels and transcribes impromptu developer huddles.</div>
                  </div>
                  <div className="p-4 rounded-xl bg-card border border-line">
                    <div className="text-[11px] font-mono font-bold text-teal uppercase mb-1">Unified Search Memory</div>
                    <div className="text-[13px] text-ink-2">Query cross-platform decisions: &quot;What did we discuss in yesterday&apos;s Slack huddle?&quot;</div>
                  </div>
                  <div className="p-4 rounded-xl bg-card border border-line">
                    <div className="text-[11px] font-mono font-bold text-amber uppercase mb-1">Bot-Free Browser Capture</div>
                    <div className="text-[13px] text-ink-2">Option to record locally via tab capture without inviting a visible bot to the room.</div>
                  </div>
                </div>
              </div>

              {/* Animated SVG Illustration: Omnichannel Satellite Mesh */}
              <div className="lg:col-span-6">
                <div className="p-6 sm:p-8 rounded-3xl bg-card border-2 border-rose/30 shadow-md relative overflow-hidden">
                  <div className="text-[11px] font-mono font-bold text-rose uppercase tracking-widest mb-4 flex items-center justify-between">
                    <span>CROSS-PLATFORM TOPOLOGY</span>
                    <span className="flex items-center gap-1 text-[10px] text-ink-3">
                      <span className="w-2 h-2 rounded-full bg-rose animate-pulse" /> Universal Mesh Active
                    </span>
                  </div>

                  {/* SVG Canvas */}
                  <svg viewBox="0 0 540 380" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="omniGlow" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#E14B5A" stopOpacity="0.12" />
                        <stop offset="100%" stopColor="#4353FF" stopOpacity="0.12" />
                      </linearGradient>
                    </defs>

                    {/* Canvas Background */}
                    <rect x="0" y="0" width="540" height="380" rx="20" fill="url(#omniGlow)" stroke="#E14B5A" strokeOpacity="0.25" />

                    {/* Connector Rays from Center to Satellites */}
                    <line x1="270" y1="190" x2="90" y2="90" stroke="#4353FF" strokeWidth="2" className="anim-data-flow" />
                    <line x1="270" y1="190" x2="270" y2="60" stroke="#00D2B4" strokeWidth="2" className="anim-data-flow" />
                    <line x1="270" y1="190" x2="450" y2="90" stroke="#00B2FF" strokeWidth="2" className="anim-data-flow" />
                    <line x1="270" y1="190" x2="90" y2="290" stroke="#00A38C" strokeWidth="2" className="anim-data-flow" />
                    <line x1="270" y1="190" x2="270" y2="320" stroke="#E14B5A" strokeWidth="2" className="anim-data-flow" />
                    <line x1="270" y1="190" x2="450" y2="290" stroke="#5865F2" strokeWidth="2" className="anim-data-flow" />

                    {/* Central Scripra Core Hub */}
                    <circle cx="270" cy="190" r="48" fill="#111827" />
                    <circle cx="270" cy="190" r="58" stroke="#4353FF" strokeWidth="1.5" strokeDasharray="6 4" className="anim-pulse-ring" />
                    <text x="270" y="185" textAnchor="middle" fontSize="13" fontWeight="900" fill="#FFFFFF">SCRIPRA</text>
                    <text x="270" y="202" textAnchor="middle" fontSize="9" fontFamily="monospace" fontWeight="bold" fill="#00E5C4">UNIFIED BRAIN</text>

                    {/* 6 Satellite Nodes */}
                    {/* Node 1: Teams */}
                    <g transform="translate(60, 60)">
                      <circle cx="30" cy="30" r="28" fill="#FFFFFF" stroke="#4353FF" strokeWidth="2" />
                      <text x="30" y="34" textAnchor="middle" fontSize="14">🔷</text>
                      <text x="30" y="70" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#111827">MS Teams</text>
                    </g>

                    {/* Node 2: Google Meet */}
                    <g transform="translate(240, 30)">
                      <circle cx="30" cy="30" r="28" fill="#FFFFFF" stroke="#00D2B4" strokeWidth="2" />
                      <text x="30" y="34" textAnchor="middle" fontSize="14">🟢</text>
                      <text x="30" y="70" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#111827">Google Meet</text>
                    </g>

                    {/* Node 3: Zoom */}
                    <g transform="translate(420, 60)">
                      <circle cx="30" cy="30" r="28" fill="#FFFFFF" stroke="#00B2FF" strokeWidth="2" />
                      <text x="30" y="34" textAnchor="middle" fontSize="14">📹</text>
                      <text x="30" y="70" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#111827">Zoom</text>
                    </g>

                    {/* Node 4: Webex */}
                    <g transform="translate(60, 260)">
                      <circle cx="30" cy="30" r="28" fill="#FFFFFF" stroke="#00A38C" strokeWidth="2" />
                      <text x="30" y="34" textAnchor="middle" fontSize="14">🌐</text>
                      <text x="30" y="70" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#111827">Cisco Webex</text>
                    </g>

                    {/* Node 5: Slack Huddles */}
                    <g transform="translate(240, 290)">
                      <circle cx="30" cy="30" r="28" fill="#FFFFFF" stroke="#E14B5A" strokeWidth="2" />
                      <text x="30" y="34" textAnchor="middle" fontSize="14">💬</text>
                      <text x="30" y="70" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#111827">Slack Huddles</text>
                    </g>

                    {/* Node 6: Discord */}
                    <g transform="translate(420, 260)">
                      <circle cx="30" cy="30" r="28" fill="#FFFFFF" stroke="#5865F2" strokeWidth="2" />
                      <text x="30" y="34" textAnchor="middle" fontSize="14">🎮</text>
                      <text x="30" y="70" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#111827">Discord Voice</text>
                    </g>
                  </svg>
                </div>
              </div>
            </div>

            {/* Step-by-Step Architecture */}
            <div className="p-6 sm:p-8 rounded-3xl bg-raise border border-line">
              <h4 className="text-[18px] font-bold text-ink mb-6">How Scripra Omnichannel Unifies Your Stack</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-card border border-line">
                  <div className="text-[12px] font-mono font-bold text-rose mb-1">01. URL / Webhook Trigger</div>
                  <p className="text-[12.5px] text-ink-3">Trigger via meeting calendar invite, link paste, or automatic Discord/Slack voice connect.</p>
                </div>
                <div className="p-4 rounded-2xl bg-card border border-line">
                  <div className="text-[12px] font-mono font-bold text-rose mb-1">02. Sandboxed WebRTC Tap</div>
                  <p className="text-[12.5px] text-ink-3">Connects to the audio stream without requiring any complex admin bots on participant computers.</p>
                </div>
                <div className="p-4 rounded-2xl bg-card border border-line">
                  <div className="text-[12px] font-mono font-bold text-rose mb-1">03. Universal ASR Bus</div>
                  <p className="text-[12.5px] text-ink-3">Routes all 6 platforms into identical Scripra Neural Streams for consistent quality.</p>
                </div>
                <div className="p-4 rounded-2xl bg-card border border-line">
                  <div className="text-[12px] font-mono font-bold text-rose mb-1">04. Unified Memory Graph</div>
                  <p className="text-[12.5px] text-ink-3">Search conversations across Slack, Teams, and Zoom simultaneously in one dashboard.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* COMPARISON MATRIX VS OTTER & FATHOM */}
        {/* ======================================================== */}
        <div className="mt-24 pt-16 border-t border-line">
          <div className="text-center max-w-[720px] mx-auto mb-12">
            <span className="text-[11px] font-mono text-indigo font-bold uppercase tracking-wider block mb-2">
              Competitive Benchmark
            </span>
            <h3 className="text-[26px] sm:text-[34px] font-black text-ink tracking-tight">
              Scripra Suite vs. Legacy Notetakers
            </h3>
            <p className="text-[14px] text-ink-3 mt-2">
              See why forward-thinking organizations are switching from single-purpose recorders to Scripra.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px] border-collapse min-w-[680px]">
              <thead>
                <tr className="border-b-2 border-line text-ink-3 font-mono text-[11px] uppercase tracking-wider">
                  <th className="py-4 px-4">Feature / Capability</th>
                  <th className="py-4 px-4 text-indigo font-bold bg-indigo-wash/30 rounded-t-xl">Scripra Suite</th>
                  <th className="py-4 px-4 text-ink-3">Otter.ai</th>
                  <th className="py-4 px-4 text-ink-3">Fathom</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                <tr>
                  <td className="py-4 px-4 font-semibold text-ink">Multilingual Code-Switching</td>
                  <td className="py-4 px-4 font-bold text-teal bg-indigo-wash/10">✓ 60+ Languages (Mid-sentence)</td>
                  <td className="py-4 px-4 text-rose">❌ Fails on mixed language</td>
                  <td className="py-4 px-4 text-rose">❌ English &amp; single Euro</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-ink">Live In-Meeting Sales Whisper AI</td>
                  <td className="py-4 px-4 font-bold text-teal bg-indigo-wash/10">✓ Yes (Sub-300ms Neural HUD)</td>
                  <td className="py-4 px-4 text-rose">❌ None (Post-call only)</td>
                  <td className="py-4 px-4 text-rose">❌ None (Post-call only)</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-ink">Slack Huddles &amp; Discord Support</td>
                  <td className="py-4 px-4 font-bold text-teal bg-indigo-wash/10">✓ Yes (Omnichannel Mesh)</td>
                  <td className="py-4 px-4 text-rose">❌ No Discord or Huddles</td>
                  <td className="py-4 px-4 text-rose">❌ Zoom / Meet / Teams only</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-ink">Zero Data Retention (ZDR)</td>
                  <td className="py-4 px-4 font-bold text-teal bg-indigo-wash/10">✓ Ephemeral RAM Only</td>
                  <td className="py-4 px-4 text-rose">❌ Stores all audio permanently</td>
                  <td className="py-4 px-4 text-rose">❌ Cloud video storage</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-ink">Model Training Policy</td>
                  <td className="py-4 px-4 font-bold text-teal bg-indigo-wash/10">✓ Never trains on your data</td>
                  <td className="py-4 px-4 text-amber-deep">⚠️ Trains on free users</td>
                  <td className="py-4 px-4 text-amber-deep">⚠️ Proprietary cloud</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-ink">Starting Price</td>
                  <td className="py-4 px-4 font-bold text-indigo bg-indigo-wash/10">$19 / month</td>
                  <td className="py-4 px-4 text-ink-2">$20 – $40 / user / mo</td>
                  <td className="py-4 px-4 text-ink-2">$24 – $39 / user / mo</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-indigo-wash via-card to-teal-wash/20 border-2 border-indigo/25 text-center shadow-md">
          <h3 className="text-[26px] sm:text-[32px] font-black text-ink tracking-tight mb-3">
            Ready to Experience the Complete Intelligence Suite?
          </h3>
          <p className="text-[15px] text-ink-3 max-w-[600px] mx-auto mb-8 leading-relaxed">
            Test any meeting link on Microsoft Teams, Google Meet, Zoom, or Webex in seconds with zero downloads.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="px-6 py-3 rounded-2xl bg-indigo text-white font-bold text-[13.5px] hover:bg-indigo-deep transition-all shadow-md shadow-indigo/20 active:scale-[0.99]"
            >
              Launch Live Meeting Studio →
            </Link>
            <Link
              href="/security"
              className="px-6 py-3 rounded-2xl bg-card border border-line hover:border-indigo/40 text-ink font-bold text-[13.5px] transition-colors"
            >
              Review Security &amp; Compliance Hub
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
