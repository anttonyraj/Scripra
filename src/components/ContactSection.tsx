"use client";

import React, { useState } from "react";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("Enterprise Pilot");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    success: boolean;
    messageId?: string;
    note?: string;
    error?: string;
  } | null>(null);

  const topics = [
    "Enterprise Pilot",
    "Product Demo",
    "Pricing & Custom SLA",
    "Technical Support",
    "Partnership",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, topic, message }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setStatus({
          success: false,
          error: data.error || "Unable to send message right now. Please try again.",
        });
      } else {
        setStatus({
          success: true,
          messageId: data.messageId,
          note: data.note || "Message dispatched successfully via Resend API.",
        });
        setName("");
        setEmail("");
        setMessage("");
      }
    } catch (err: any) {
      console.error("Contact submit error:", err);
      setStatus({
        success: false,
        error: "Network transmission error. Please email us directly at team@scripra.com.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32 px-6 bg-canvas border-t border-line/60 relative overflow-hidden">
      {/* Background Cyber Ambient Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[400px] bg-indigo-wash/50 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[350px] bg-teal-wash/40 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-[1240px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-[760px] mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-wash text-teal text-[11px] font-bold tracking-[0.15em] uppercase border border-teal/25 mb-4">
            <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
            Direct Communications · Resend Powered
          </div>
          <h2 className="text-[clamp(32px,4.5vw,52px)] font-black tracking-[-0.03em] text-ink leading-[1.1] mb-5">
            Talk to the Scripra team. <br className="hidden sm:inline" />
            <span className="text-indigo">Direct response in &lt;2 hours.</span>
          </h2>
          <p className="text-[16px] sm:text-[18px] text-ink-3 leading-relaxed">
            Ready to deploy bot-free conversation intelligence across your organization, or need a custom enterprise SLA? Reach our leadership team directly.
          </p>
        </div>

        {/* 2-Column Grid: Left Contact Info & Telemetry, Right Interactive Resend Form */}
        <div className="grid grid-cols-1 lg:grid-cols-[42%_58%] gap-10 items-start">
          
          {/* Left Column: Direct Inquiries & Telemetry */}
          <div className="space-y-6">
            
            {/* Leadership Response SLA Card */}
            <div className="p-6 rounded-3xl bg-card border border-line shadow-xs relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono uppercase tracking-wider text-teal font-bold bg-teal-wash px-2.5 py-1 rounded-lg border border-teal/20">
                  ● Live Support Desk
                </span>
                <span className="text-[11px] font-mono text-ink-3">Avg SLA: 45m</span>
              </div>
              <h3 className="text-[19px] font-black text-ink mb-2">
                Executive &amp; Technical Support
              </h3>
              <p className="text-[14px] text-ink-3 leading-relaxed mb-6">
                All inquiries go directly to our engineering and product architects. We never outsource your questions to generic call centers.
              </p>

              {/* Direct channels */}
              <div className="space-y-3 pt-4 border-t border-line">
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-ink-3">Direct Executive Inquiries:</span>
                  <a href="mailto:contact@scripra.com" className="font-mono font-bold text-indigo hover:underline">
                    contact@scripra.com ↗
                  </a>
                </div>
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-ink-3">Email Transmission Gateway:</span>
                  <span className="font-mono text-teal font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
                    Resend Verified TLS
                  </span>
                </div>
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-ink-3">Enterprise Deployments:</span>
                  <span className="font-mono text-ink font-semibold">SOC 2 / HIPAA NDA</span>
                </div>
              </div>
            </div>

            {/* Quick Feature Perks */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-raise border border-line">
                <div className="text-indigo font-black text-2xl mb-1">&lt;300ms</div>
                <div className="text-[13px] font-bold text-ink">Edge Diarization</div>
                <div className="text-[11px] text-ink-3 mt-1">Multi-speaker real-time separation</div>
              </div>
              <div className="p-5 rounded-2xl bg-raise border border-line">
                <div className="text-teal font-black text-2xl mb-1">0-Days</div>
                <div className="text-[13px] font-bold text-ink">RAM Zero Retention</div>
                <div className="text-[11px] text-ink-3 mt-1">Audio never trains outside models</div>
              </div>
            </div>

          </div>

          {/* Right Column: High-Tech Working Resend Contact Form */}
          <div className="p-6 sm:p-10 rounded-3xl bg-card border border-line shadow-[0_20px_50px_rgba(67,83,255,0.08)] relative overflow-hidden">
            
            {/* Top Bar Indicator */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-line/70">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo animate-pulse" />
                <span className="text-[12px] font-mono font-bold text-ink uppercase tracking-wider">
                  Secure Inquiry Terminal
                </span>
              </div>
              <span className="text-[11px] font-mono bg-raise px-2.5 py-1 rounded-md text-ink-3 border border-line">
                API Endpoint: /api/contact
              </span>
            </div>

            {/* Topic Selector Pills */}
            <div className="mb-6">
              <label className="block text-[12px] font-mono uppercase tracking-wider font-bold text-ink-3 mb-2.5">
                Select Your Purpose:
              </label>
              <div className="flex flex-wrap gap-2">
                {topics.map((t) => {
                  const isSelected = topic === t;
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTopic(t)}
                      className={`px-3.5 py-1.5 rounded-xl text-[12px] font-bold transition-all ${
                        isSelected
                          ? "bg-indigo text-white shadow-xs scale-[1.02]"
                          : "bg-raise text-ink-2 hover:text-ink border border-line/70"
                      }`}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-bold text-ink mb-1.5 font-mono">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Antony Raj"
                    className="w-full px-4 py-3 rounded-xl border border-line bg-raise text-ink text-[14px] focus:outline-none focus:border-indigo transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-bold text-ink mb-1.5 font-mono">
                    Work Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. antony@company.com"
                    className="w-full px-4 py-3 rounded-xl border border-line bg-raise text-ink text-[14px] focus:outline-none focus:border-indigo transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-bold text-ink mb-1.5 font-mono">
                  Message / Inquiries <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your team size, meeting platforms (Teams, Zoom, Meet, Webex), and timeline..."
                  className="w-full px-4 py-3 rounded-xl border border-line bg-raise text-ink text-[14px] focus:outline-none focus:border-indigo transition-colors resize-none leading-relaxed"
                />
              </div>

              {/* Status Message Display */}
              {status && (
                <div
                  className={`p-4 rounded-xl text-[13px] border ${
                    status.success
                      ? "bg-teal-wash/60 text-teal-deep border-teal/40"
                      : "bg-rose-wash/60 text-rose border-rose/30"
                  }`}
                >
                  {status.success ? (
                    <div className="flex items-start gap-2.5">
                      <span className="text-teal font-bold text-lg">✓</span>
                      <div>
                        <p className="font-bold text-ink">Inquiry Transmitted via Resend!</p>
                        <p className="text-[12px] text-ink-2 mt-0.5">{status.note}</p>
                        {status.messageId && (
                          <p className="text-[11px] font-mono text-ink-3 mt-1">
                            Reference ID: <strong className="text-indigo">{status.messageId}</strong>
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="font-bold">✕</span>
                      <span>{status.error}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-indigo text-white font-bold text-[15px] hover:bg-indigo-deep active:scale-[0.99] transition-all shadow-md shadow-indigo/20 flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Transmitting via Resend...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message Directly</span>
                    <span>→</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-between text-[11px] font-mono text-ink-3 pt-2">
                <span className="flex items-center gap-1">
                  <span className="text-teal">🔒</span> TLS 1.3 256-bit encrypted
                </span>
                <span>Powered by Resend Delivery Network</span>
              </div>
            </form>

          </div>

        </div>

      </div>
    </section>
  );
}
