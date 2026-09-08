import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — Scripra",
  description: "Simple, transparent pricing. Start free, upgrade when you need more.",
};

export default function Pricing() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-24">
        <div className="max-w-[1120px] mx-auto px-6">
          <div className="text-center max-w-[800px] mx-auto mb-20">
            <h1 className="text-[clamp(36px,5vw,54px)] font-bold tracking-[-0.03em] mb-6">
              Simple, transparent pricing.
            </h1>
            <p className="text-[19px] leading-[1.65] text-ink-2">
              Start free. Upgrade when Scripra becomes essential to your workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Free */}
            <div className="bg-canvas border border-line rounded-2xl p-7 flex flex-col">
              <h3 className="text-[18px] font-bold text-ink mb-1">Free</h3>
              <div className="text-[36px] font-bold tracking-[-0.02em] text-ink mb-1">$0</div>
              <div className="text-[13px] text-ink-3 mb-6">Forever free</div>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-start gap-3 text-[14px] text-ink-2">
                  <span className="text-indigo mt-0.5 flex-shrink-0">✓</span> 5 meetings/month
                </li>
                <li className="flex items-start gap-3 text-[14px] text-ink-2">
                  <span className="text-indigo mt-0.5 flex-shrink-0">✓</span> 30 min per meeting
                </li>
                <li className="flex items-start gap-3 text-[14px] text-ink-2">
                  <span className="text-indigo mt-0.5 flex-shrink-0">✓</span> Real-time transcription
                </li>
                <li className="flex items-start gap-3 text-[14px] text-ink-2">
                  <span className="text-indigo mt-0.5 flex-shrink-0">✓</span> 3-bullet recap preview
                </li>
                <li className="flex items-start gap-3 text-[14px] text-ink-2">
                  <span className="text-indigo mt-0.5 flex-shrink-0">✓</span> .txt export
                </li>
                <li className="flex items-start gap-3 text-[14px] text-ink-3 opacity-50">
                  <span className="mt-0.5 flex-shrink-0">✕</span> Full AI recap
                </li>
                <li className="flex items-start gap-3 text-[14px] text-ink-3 opacity-50">
                  <span className="mt-0.5 flex-shrink-0">✕</span> Email delivery
                </li>
              </ul>
              <Link href="/signup" className="block w-full text-center py-3 rounded-xl bg-card border border-line text-ink font-semibold hover:border-indigo transition-colors text-[14px]">
                Get started free
              </Link>
            </div>

            {/* Pro — Most Popular */}
            <div className="bg-panel border-2 border-indigo rounded-2xl p-7 flex flex-col relative shadow-lg">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo text-white text-[10px] font-bold uppercase tracking-[0.1em] px-3 py-1 rounded-full whitespace-nowrap">
                Most Popular
              </div>
              <h3 className="text-[18px] font-bold text-ink mb-1">Pro</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-[36px] font-bold tracking-[-0.02em] text-ink">$9.99</span>
                <span className="text-[14px] text-ink-3">/month</span>
              </div>
              <div className="text-[13px] text-ink-3 mb-6">or $7.99/mo billed annually</div>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-start gap-3 text-[14px] text-ink-2">
                  <span className="text-indigo mt-0.5 flex-shrink-0">✓</span> 30 meetings/month
                </li>
                <li className="flex items-start gap-3 text-[14px] text-ink-2">
                  <span className="text-indigo mt-0.5 flex-shrink-0">✓</span> 2 hours per meeting
                </li>
                <li className="flex items-start gap-3 text-[14px] text-ink-2">
                  <span className="text-indigo mt-0.5 flex-shrink-0">✓</span> Full AI recap &amp; action items
                </li>
                <li className="flex items-start gap-3 text-[14px] text-ink-2">
                  <span className="text-indigo mt-0.5 flex-shrink-0">✓</span> Email recap delivery
                </li>
                <li className="flex items-start gap-3 text-[14px] text-ink-2">
                  <span className="text-indigo mt-0.5 flex-shrink-0">✓</span> Ask Scripra AI (50/mo)
                </li>
                <li className="flex items-start gap-3 text-[14px] text-ink-2">
                  <span className="text-indigo mt-0.5 flex-shrink-0">✓</span> 90-day searchable history
                </li>
                <li className="flex items-start gap-3 text-[14px] text-ink-2">
                  <span className="text-indigo mt-0.5 flex-shrink-0">✓</span> .txt + .pdf export
                </li>
              </ul>
              <Link href="/signup?plan=pro" className="block w-full text-center py-3 rounded-xl bg-indigo text-white font-semibold hover:opacity-90 transition-opacity text-[14px]">
                Start Pro — $9.99/mo
              </Link>
            </div>

            {/* Business */}
            <div className="bg-canvas border border-line rounded-2xl p-7 flex flex-col">
              <h3 className="text-[18px] font-bold text-ink mb-1">Business</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-[36px] font-bold tracking-[-0.02em] text-ink">$29</span>
                <span className="text-[14px] text-ink-3">/user/mo</span>
              </div>
              <div className="text-[13px] text-ink-3 mb-6">or $22/user/mo billed annually</div>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-start gap-3 text-[14px] text-ink-2">
                  <span className="text-indigo mt-0.5 flex-shrink-0">✓</span> Unlimited meetings
                </li>
                <li className="flex items-start gap-3 text-[14px] text-ink-2">
                  <span className="text-indigo mt-0.5 flex-shrink-0">✓</span> 4 hours per meeting
                </li>
                <li className="flex items-start gap-3 text-[14px] text-ink-2">
                  <span className="text-indigo mt-0.5 flex-shrink-0">✓</span> Everything in Pro
                </li>
                <li className="flex items-start gap-3 text-[14px] text-ink-2">
                  <span className="text-indigo mt-0.5 flex-shrink-0">✓</span> Team workspace
                </li>
                <li className="flex items-start gap-3 text-[14px] text-ink-2">
                  <span className="text-indigo mt-0.5 flex-shrink-0">✓</span> Cross-meeting intelligence
                </li>
                <li className="flex items-start gap-3 text-[14px] text-ink-2">
                  <span className="text-indigo mt-0.5 flex-shrink-0">✓</span> 1-year history
                </li>
                <li className="flex items-start gap-3 text-[14px] text-ink-2">
                  <span className="text-indigo mt-0.5 flex-shrink-0">✓</span> Slack &amp; Notion integrations
                </li>
              </ul>
              <Link href="/contact" className="block w-full text-center py-3 rounded-xl bg-card border border-line text-ink font-semibold hover:border-indigo transition-colors text-[14px]">
                Start Business trial
              </Link>
            </div>

            {/* Enterprise */}
            <div className="bg-canvas border border-line rounded-2xl p-7 flex flex-col">
              <h3 className="text-[18px] font-bold text-ink mb-1">Enterprise</h3>
              <div className="text-[20px] font-medium text-ink-3 mb-2 mt-3">Custom pricing</div>
              <div className="text-[13px] text-ink-3 mb-6">For teams with advanced needs</div>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-start gap-3 text-[14px] text-ink-2">
                  <span className="text-indigo mt-0.5 flex-shrink-0">✓</span> Everything in Business
                </li>
                <li className="flex items-start gap-3 text-[14px] text-ink-2">
                  <span className="text-indigo mt-0.5 flex-shrink-0">✓</span> SSO / SAML
                </li>
                <li className="flex items-start gap-3 text-[14px] text-ink-2">
                  <span className="text-indigo mt-0.5 flex-shrink-0">✓</span> Data residency
                </li>
                <li className="flex items-start gap-3 text-[14px] text-ink-2">
                  <span className="text-indigo mt-0.5 flex-shrink-0">✓</span> SLA guarantee
                </li>
                <li className="flex items-start gap-3 text-[14px] text-ink-2">
                  <span className="text-indigo mt-0.5 flex-shrink-0">✓</span> API access
                </li>
                <li className="flex items-start gap-3 text-[14px] text-ink-2">
                  <span className="text-indigo mt-0.5 flex-shrink-0">✓</span> Audit logs
                </li>
              </ul>
              <Link href="/contact" className="block w-full text-center py-3 rounded-xl bg-card border border-line text-ink font-semibold hover:border-indigo transition-colors text-[14px]">
                Talk to sales
              </Link>
            </div>
          </div>

          {/* Comparison note */}
          <div className="mt-16 text-center">
            <p className="text-[14px] text-ink-3 max-w-[600px] mx-auto">
              All plans include Teams, Zoom, Meet &amp; Webex support. Speaker diarization included on every tier. No credit card required for Free plan.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
