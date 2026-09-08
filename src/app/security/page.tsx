import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Security, Privacy & Compliance | Scripra",
  description: "Enterprise-grade encryption, Zero Data Retention (ZDR), SOC 2 Type II alignment, HIPAA readiness, and zero AI model training.",
};

export default function SecurityPage() {
  const certifications = [
    { name: "SOC 2 Type II", status: "Audited & Aligned", icon: "🛡️", desc: "Rigorous third-party evaluation of security, availability, and processing integrity controls." },
    { name: "HIPAA Ready", status: "BAA Available", icon: "🏥", desc: "Protections for electronic Protected Health Information (ePHI) suitable for telehealth and healthcare." },
    { name: "GDPR Compliant", status: "EU Sovereign", icon: "🇪🇺", desc: "Full European data residency support, strict privacy rights, and single-click right to be forgotten." },
    { name: "ISO 27001", status: "Aligned ISMS", icon: "🌐", desc: "International benchmark for information security management systems and automated risk governance." },
  ];

  const pillars = [
    {
      title: "Zero Foundation Model Training",
      badge: "Absolute Privacy",
      icon: "🚫",
      desc: "Your meeting audio, diarized transcripts, and executive summaries are strictly confidential. Scripra and our underlying transcription engines NEVER use your customer conversations to train, tune, or improve public AI models.",
      details: ["Strict zero-training policy enforced at API level", "Isolated customer context windows", "No cross-organization data contamination"],
    },
    {
      title: "Ephemeral RAM Zero Storage Policy",
      badge: "In-Memory Only",
      icon: "⚡",
      desc: "Live audio streams are processed in volatile server memory (RAM) and immediately discarded as soon as the speech tokens are transcribed. Raw audio is never persisted to unencrypted disks or public caches.",
      details: ["Volatile memory buffer wiped on session conclusion", "No persistent raw audio recordings on disk", "Minimal content-free operational telemetry"],
    },
    {
      title: "End-to-End Military-Grade Encryption",
      badge: "AES-256 & TLS 1.3",
      icon: "🔐",
      desc: "All audio streams, webhooks, and database records are safeguarded with the highest industry encryption standards both in transit and at rest.",
      details: ["TLS 1.3 and WSS with Perfect Forward Secrecy", "AES-256-GCM encryption at rest with automated key rotation", "Encrypted email delivery via Resend TLS"],
    },
    {
      title: "Enterprise Access Governance & SSO",
      badge: "Identity Control",
      icon: "🔑",
      desc: "Granular access management to ensure that only authorized team members can view, search, or export meeting intelligence.",
      details: ["SAML 2.0 Single Sign-On (Okta, Azure AD, Google Workspace)", "Role-Based Access Control (Admin, Member, Guest)", "Automated SCIM user provisioning and de-provisioning"],
    },
    {
      title: "Tamper-Evident Audit Trails",
      badge: "Governance",
      icon: "📜",
      desc: "Every interaction within Scripra generates an immutable, timestamped audit log for corporate compliance and forensic tracking.",
      details: ["Logs who attended, viewed, exported, or deleted transcripts", "API access tracking with IP geofencing", "SIEM log streaming export (Splunk, Datadog)"],
    },
    {
      title: "Data Sovereignty & Single-Click Purge",
      badge: "Complete Ownership",
      icon: "🗑️",
      desc: "You own your conversation data 100%. Export meeting records anytime in standard formats, or wipe all organizational history permanently.",
      details: ["Instant automated export (JSON, Markdown, TXT)", "Hard deletion: zero soft-delete ghosts or retention lag", "Custom retention lifecycles (purge after 30, 60, or 90 days)"],
    },
  ];

  const pipelineSteps = [
    {
      step: "01",
      title: "Encrypted Meeting Join",
      desc: "Scripra Bot joins Teams, Meet, or Zoom via an isolated sandboxed headless browser. Clearly identified in the attendee list.",
      security: "Sandboxed Container · TLS 1.3 WebRTC",
    },
    {
      step: "02",
      title: "Ephemeral Audio Streaming",
      desc: "Raw 16kHz PCM audio is encrypted and streamed to dedicated ASR processing nodes in volatile RAM without disk buffering.",
      security: "Encrypted WSS · In-Memory Volatile RAM",
    },
    {
      step: "03",
      title: "Zero-Retention Transcription",
      desc: "Speech is converted to text with real-time speaker diarization. Audio slices are immediately purged once transcribed.",
      security: "Zero Storage Retention · SOC 2 / HIPAA Pipeline",
    },
    {
      step: "04",
      title: "Isolated Intelligence Synthesis",
      desc: "Scripra's Neural Engine extracts executive MoM, action items, and translations inside isolated enterprise prompts with zero model training.",
      security: "Zero Training Commitment · Private Endpoints",
    },
    {
      step: "05",
      title: "Secure Dispatched Delivery",
      desc: "Formatted intelligence is delivered directly to authorized attendee inboxes via encrypted Resend API and saved to your private dashboard.",
      security: "TLS Delivered · AES-256 At Rest",
    },
  ];

  const faqs = [
    {
      q: "Does Scripra record video or screen sharing?",
      a: "No. Scripra is strictly an audio-to-intelligence platform. Our bots do not capture, record, or store any video feeds, webcam streams, or attendee screen shares.",
    },
    {
      q: "Do you train AI models on our company's confidential conversations?",
      a: "Never. We enforce a strict contractual and technical policy: zero customer data is ever used to train, tune, or improve foundation AI models (neither Scripra's internal models nor third-party models).",
    },
    {
      q: "Can attendees tell that a bot is in the meeting?",
      a: "Yes. Scripra operates with 100% transparency. The bot joins as a visible participant named 'Scripra AI Bot' and appears in the active attendee roster. In addition, meeting hosts must confirm participant consent before session recording starts.",
    },
    {
      q: "How does Scripra handle HIPAA and healthcare privacy?",
      a: "For healthcare providers, medical clinics, and telehealth organizations, Scripra provides Business Associate Agreements (BAAs) on Pro and Enterprise tiers, ensuring all conversational intelligence adheres to HIPAA physical and technical safeguards.",
    },
    {
      q: "Where is data processed and stored?",
      a: "Scripra uses enterprise cloud infrastructure with data centers in the United States and the European Union. EU organizations can request Sovereign EU data processing to guarantee data never leaves the EU.",
    },
    {
      q: "Can we set custom data retention policies?",
      a: "Yes. Enterprise administrators can set automated lifecycle rules to automatically purge transcripts, summaries, and meeting logs after 7, 30, 60, or 90 days.",
    },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen pt-28 pb-24 px-6 bg-canvas text-ink">
        <div className="max-w-[1240px] mx-auto">
          
          {/* Hero Header */}
          <div className="text-center max-w-[820px] mx-auto mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-wash border border-indigo/25 text-indigo text-[11px] font-mono font-bold tracking-wider uppercase mb-5 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
              <span>Enterprise Security &amp; Compliance Hub</span>
            </div>
            
            <h1 className="text-[clamp(34px,5vw,56px)] font-black tracking-tight text-ink leading-[1.08] mb-6">
              Your conversations are private. <br />
              <span className="text-indigo">Guaranteed by architecture.</span>
            </h1>
            
            <p className="text-[17px] sm:text-[19px] text-ink-3 leading-relaxed max-w-[680px] mx-auto">
              Scripra is engineered with bank-grade encryption, Zero Data Retention (ZDR), and zero AI model training from the ground up.
            </p>

            {/* Quick Badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
              <span className="px-3.5 py-1.5 rounded-xl bg-raise border border-line text-[12px] font-mono text-ink font-semibold flex items-center gap-2 shadow-2xs">
                <span>🔒</span> Zero Data Retention (RAM Only)
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-raise border border-line text-[12px] font-mono text-teal font-semibold flex items-center gap-2 shadow-2xs">
                <span>✓</span> SOC 2 Type II Aligned
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-raise border border-line text-[12px] font-mono text-indigo font-semibold flex items-center gap-2 shadow-2xs">
                <span>🛡️</span> Zero AI Model Training
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-raise border border-line text-[12px] font-mono text-amber font-semibold flex items-center gap-2 shadow-2xs">
                <span>🏥</span> HIPAA Ready (BAA)
              </span>
            </div>
          </div>

          {/* Compliance Certifications Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
            {certifications.map((cert) => (
              <div key={cert.name} className="p-5 rounded-2xl bg-card border-2 border-line hover:border-indigo/40 transition-all shadow-xs flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{cert.icon}</span>
                  <span className="text-[10.5px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-teal-wash text-teal border border-teal/20">
                    {cert.status}
                  </span>
                </div>
                <h3 className="text-[16px] font-bold text-ink mb-1">{cert.name}</h3>
                <p className="text-[12.5px] text-ink-3 leading-relaxed mt-auto">{cert.desc}</p>
              </div>
            ))}
          </div>

          {/* Live Data Flow Architecture Diagram */}
          <div className="bg-card border-2 border-indigo/25 rounded-3xl p-7 sm:p-10 mb-20 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-wash/40 blur-[90px] pointer-events-none" />
            <div className="max-w-[720px] mb-8 relative z-10">
              <span className="text-[11px] font-mono text-indigo font-bold uppercase tracking-wider block mb-1">
                Data Pipeline Safeguards
              </span>
              <h2 className="text-[26px] sm:text-[32px] font-black text-ink tracking-tight">
                How Meeting Audio Travels Through Scripra
              </h2>
              <p className="text-[14px] text-ink-3 mt-1.5 leading-relaxed">
                From the moment our bot joins your Microsoft Teams, Google Meet, or Zoom room, audio is isolated and protected at every hop.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative z-10">
              {pipelineSteps.map((step, idx) => (
                <div key={step.step} className="p-4 rounded-2xl bg-raise border border-line flex flex-col justify-between relative group hover:border-indigo/50 transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[12px] font-mono font-black text-indigo bg-indigo-wash px-2 py-0.5 rounded">
                        {step.step}
                      </span>
                      {idx < pipelineSteps.length - 1 && (
                        <span className="hidden md:inline text-ink-3 text-xs font-mono">→</span>
                      )}
                    </div>
                    <h4 className="text-[14px] font-bold text-ink mb-1.5">{step.title}</h4>
                    <p className="text-[12px] text-ink-3 leading-relaxed">{step.desc}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-line/60 text-[10.5px] font-mono text-teal font-semibold">
                    🔒 {step.security}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 6 Security Pillars */}
          <div className="mb-20">
            <div className="text-center max-w-[640px] mx-auto mb-12">
              <h2 className="text-[28px] sm:text-[36px] font-black text-ink tracking-tight">
                Six Pillars of Scripra Trust
              </h2>
              <p className="text-[14.5px] text-ink-3 mt-2">
                Built to exceed the strictest infosec requirements of Fortune 500 security officers and legal teams.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pillars.map((pillar) => (
                <div key={pillar.title} className="p-6 rounded-3xl bg-card border-2 border-line hover:border-indigo/40 transition-all shadow-xs flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-10 h-10 rounded-2xl bg-indigo-wash text-indigo flex items-center justify-center text-xl shadow-2xs">
                      {pillar.icon}
                    </span>
                    <span className="text-[10.5px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-raise border border-line text-ink-2">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-[17px] font-bold text-ink mb-2">{pillar.title}</h3>
                  <p className="text-[13px] text-ink-3 leading-relaxed mb-4">{pillar.desc}</p>

                  <ul className="space-y-2 mt-auto pt-4 border-t border-line/70">
                    {pillar.details.map((detail, dIdx) => (
                      <li key={dIdx} className="text-[12px] text-ink-2 flex items-start gap-2">
                        <span className="text-teal font-bold mt-0.5">✓</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Frequently Asked Security Questions */}
          <div className="bg-panel border-2 border-line rounded-3xl p-8 sm:p-12 mb-20 shadow-sm">
            <div className="max-w-[720px] mb-10">
              <span className="text-[11px] font-mono text-indigo font-bold uppercase tracking-wider block mb-1">
                Legal &amp; Infosec Due Diligence
              </span>
              <h2 className="text-[28px] sm:text-[34px] font-black text-ink tracking-tight">
                Frequently Asked Security Questions
              </h2>
              <p className="text-[14px] text-ink-3 mt-1">
                Direct answers to the questions compliance officers and security analysts ask us most.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqs.map((faq, fIdx) => (
                <div key={fIdx} className="p-5 rounded-2xl bg-card border border-line flex flex-col">
                  <h4 className="text-[15px] font-bold text-ink mb-2 flex items-start gap-2">
                    <span className="text-indigo font-mono">Q:</span>
                    <span>{faq.q}</span>
                  </h4>
                  <p className="text-[13px] text-ink-3 leading-relaxed pl-6">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action: Compliance / BAA Requests */}
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-indigo-wash via-card to-teal-wash/30 border-2 border-indigo/30 text-center relative overflow-hidden shadow-md">
            <h3 className="text-[26px] sm:text-[32px] font-black text-ink tracking-tight mb-3">
              Need a Custom Security Review or BAA?
            </h3>
            <p className="text-[14.5px] text-ink-3 max-w-[620px] mx-auto mb-8 leading-relaxed">
              Our security engineering team works directly with your enterprise security, legal, and compliance officers to complete vendor assessments, sign BAAs, and configure SSO.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-6 py-3 rounded-2xl bg-indigo text-white font-bold text-[13.5px] hover:bg-indigo-deep transition-all shadow-md shadow-indigo/20"
              >
                Request Security Packet &amp; BAA →
              </Link>
              <Link
                href="/dashboard"
                className="px-6 py-3 rounded-2xl bg-card border border-line hover:border-indigo/40 text-ink font-bold text-[13.5px] transition-colors"
              >
                Launch Live Meeting Studio
              </Link>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
