"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function EnterpriseSection() {
  const [ssoActive, setSsoActive] = useState(true);
  const [retentionDays, setRetentionDays] = useState(90);

  const pillars = [
    {
      title: "Zero Model Training",
      badge: "Strict Privacy",
      desc: "Your audio, transcripts, and metadata are never used to train third-party or foundation AI models. Ever.",
      icon: "🛡️",
    },
    {
      title: "Enterprise SSO & SAML",
      badge: "Access Control",
      desc: "Enforce Okta, Azure AD, or Google Workspace authentication with automated SCIM user de-provisioning.",
      icon: "🔑",
    },
    {
      title: "Custom Data Retention",
      badge: "Governance",
      desc: "Set automatic expiration schedules (30, 60, 90, or 365 days) for raw audio files, diarized text, and summaries.",
      icon: "⏳",
    },
    {
      title: "Tamper-Evident Audit Logs",
      badge: "Compliance",
      desc: "Detailed audit trails recording who accessed, exported, or shared any conversation artifact.",
      icon: "📋",
    },
  ];

  return (
    <section id="security" className="py-24 sm:py-32 bg-raise/50 border-t border-line/60 relative overflow-hidden">
      <div className="max-w-[1320px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-[760px] mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-wash text-indigo text-[11px] font-bold tracking-[0.15em] uppercase border border-indigo/20 mb-4">
            <span className="w-2 h-2 rounded-full bg-indigo" />
            Enterprise Security &amp; Compliance
          </div>
          <h2 className="text-[clamp(32px,4.5vw,52px)] font-black tracking-[-0.03em] text-ink leading-[1.1] mb-5">
            Enterprise trust built in. <br className="hidden sm:inline" />
            <span className="text-indigo">From day one.</span>
          </h2>
          <p className="text-[16px] sm:text-[18px] text-ink-3 leading-relaxed">
            Engineered for organizations with strict compliance, security, and data sovereignty requirements.
          </p>
        </div>

        {/* 2-Column Split: Security Vault Mockup & Enterprise Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Interactive Security Vault UI Artifact */}
          <div className="bg-card border border-line rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(67,83,255,0.08)]">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-line/70">
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-teal" />
                <span className="text-[13px] font-mono font-bold text-ink uppercase tracking-wider">
                  Organization Security Console
                </span>
              </div>
              <span className="text-[10.5px] font-mono text-teal bg-teal-wash px-2.5 py-0.5 rounded-full border border-teal/20 font-bold">
                SOC 2 Ready
              </span>
            </div>

            {/* Interactive Setting 1: SSO Toggle */}
            <div className="p-4 rounded-2xl bg-raise border border-line mb-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-[14px] font-bold text-ink mb-0.5">Enforce Single Sign-On (SAML / SSO)</p>
                <p className="text-[12px] text-ink-3">Mandatory Okta, Azure AD, or Google Workspace login</p>
              </div>
              <button
                onClick={() => setSsoActive(!ssoActive)}
                className={`w-12 h-6 rounded-full transition-colors relative flex items-center px-1 ${
                  ssoActive ? "bg-teal" : "bg-ink-3/30"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white shadow-xs transition-transform ${
                    ssoActive ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Interactive Setting 2: Retention Slider */}
            <div className="p-4 rounded-2xl bg-raise border border-line mb-4">
              <div className="flex items-center justify-between mb-2.5">
                <div>
                  <p className="text-[14px] font-bold text-ink mb-0.5">Automated Data Retention</p>
                  <p className="text-[12px] text-ink-3">Permanently purge raw audio and transcripts</p>
                </div>
                <span className="text-[12px] font-mono font-bold text-indigo bg-indigo-wash px-2.5 py-1 rounded-lg border border-indigo/25">
                  {retentionDays} Days
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[30, 60, 90, 365].map((d) => (
                  <button
                    key={d}
                    onClick={() => setRetentionDays(d)}
                    className={`py-1.5 rounded-lg text-[11px] font-mono font-bold transition-all ${
                      retentionDays === d
                        ? "bg-indigo text-white shadow-xs"
                        : "bg-card text-ink-3 border border-line/70 hover:text-ink"
                    }`}
                  >
                    {d}d
                  </button>
                ))}
              </div>
            </div>

            {/* Setting 3: Zero Model Training Guarantee */}
            <div className="p-4 rounded-2xl bg-teal-wash/40 border border-teal/25 mb-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-[18px]">🔒</span>
                <div>
                  <p className="text-[13.5px] font-bold text-ink">Zero Model Training Contract</p>
                  <p className="text-[11.5px] text-ink-3">Zero data retention on foundation LLMs</p>
                </div>
              </div>
              <span className="text-[11px] font-mono text-teal font-bold px-2 py-0.5 rounded bg-card border border-teal/20">
                Active
              </span>
            </div>

            {/* Bottom Download Audit Logs Button */}
            <div className="pt-2 flex items-center justify-between text-[12px] text-ink-3">
              <span>Audit Log Streaming: <strong>Active (Syslog / S3)</strong></span>
              <button className="text-indigo font-bold hover:underline font-mono text-[11px]">
                Export Logs (CSV) ↗
              </button>
            </div>

          </div>

          {/* Right: Security Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {pillars.map((p, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-card border border-line shadow-xs hover:border-indigo/40 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[22px]">{p.icon}</span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-indigo font-bold bg-indigo-wash px-2 py-0.5 rounded border border-indigo/20">
                    {p.badge}
                  </span>
                </div>
                <h3 className="text-[16px] font-bold text-ink mb-1.5">{p.title}</h3>
                <p className="text-[13px] text-ink-3 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

        </div>

        {/* Security Badges Trust Strip */}
        <div className="mt-16 pt-8 border-t border-line/70 flex flex-wrap items-center justify-center gap-8 text-[12px] font-mono text-ink-3 font-semibold">
          <div className="flex items-center gap-2">
            <span className="text-teal font-bold">✓</span>
            <span>SOC 2 Type II Ready</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-teal font-bold">✓</span>
            <span>HIPAA Compliant Controls</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-teal font-bold">✓</span>
            <span>AES-256 &amp; TLS 1.3 Encryption</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-teal font-bold">✓</span>
            <span>GDPR &amp; CCPA Data Rights</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-teal font-bold">✓</span>
            <span>Zero Customer Data Training</span>
          </div>
        </div>

      </div>
    </section>
  );
}
