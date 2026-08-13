import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — Scripra",
  description: "Scripra pricing and plans.",
};

export default function Pricing() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-24">
        <div className="max-w-[1080px] mx-auto px-6">
          <div className="text-center max-w-[800px] mx-auto mb-20">
            <h1 className="text-[clamp(36px,5vw,54px)] font-bold tracking-[-0.03em] mb-6">
              Simple, transparent pricing.
            </h1>
            <p className="text-[19px] leading-[1.65] text-ink-2">
              Start with the browser demo, or join early access for when we launch full accounts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Demo */}
            <div className="bg-canvas border border-line rounded-2xl p-8 flex flex-col">
              <h3 className="text-[18px] font-bold text-ink mb-2">Demo</h3>
              <div className="text-[32px] font-bold tracking-[-0.02em] text-ink mb-6">$0</div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-start gap-3 text-[14px] text-ink-2">
                  <span className="text-indigo mt-0.5">✓</span> No account required
                </li>
                <li className="flex items-start gap-3 text-[14px] text-ink-2">
                  <span className="text-indigo mt-0.5">✓</span> Browser demo
                </li>
                <li className="flex items-start gap-3 text-[14px] text-ink-2">
                  <span className="text-indigo mt-0.5">✓</span> Nothing stored
                </li>
              </ul>
              <Link href="/demo" className="block w-full text-center py-3 rounded-xl bg-card border border-line text-ink font-semibold hover:border-indigo transition-colors text-[14px]">
                Try it now
              </Link>
            </div>

            {/* Free */}
            <div className="bg-panel border-2 border-indigo rounded-2xl p-8 flex flex-col relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo text-white text-[10px] font-bold uppercase tracking-[0.1em] px-3 py-1 rounded-full">
                Planned
              </div>
              <h3 className="text-[18px] font-bold text-ink mb-2">Free</h3>
              <div className="text-[32px] font-bold tracking-[-0.02em] text-ink mb-6">$0</div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-start gap-3 text-[14px] text-ink-2">
                  <span className="text-indigo mt-0.5">✓</span> Dedicated account
                </li>
                <li className="flex items-start gap-3 text-[14px] text-ink-2">
                  <span className="text-indigo mt-0.5">✓</span> Real transcription
                </li>
                <li className="flex items-start gap-3 text-[14px] text-ink-2">
                  <span className="text-indigo mt-0.5">✓</span> Summaries
                </li>
                <li className="flex items-start gap-3 text-[14px] text-ink-2">
                  <span className="text-indigo mt-0.5">✓</span> Limited monthly processing
                </li>
              </ul>
              <Link href="#" className="block w-full text-center py-3 rounded-xl bg-indigo text-white font-semibold hover:bg-[#6E6FF5] transition-colors text-[14px]">
                Join early access
              </Link>
            </div>

            {/* Pro */}
            <div className="bg-canvas border border-line rounded-2xl p-8 flex flex-col">
              <h3 className="text-[18px] font-bold text-ink mb-2">Pro</h3>
              <div className="text-[20px] font-medium text-ink-3 mb-8 mt-3">Coming soon</div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-start gap-3 text-[14px] text-ink-2">
                  <span className="text-indigo mt-0.5">✓</span> Increased monthly processing
                </li>
                <li className="flex items-start gap-3 text-[14px] text-ink-2">
                  <span className="text-indigo mt-0.5">✓</span> Searchable history
                </li>
                <li className="flex items-start gap-3 text-[14px] text-ink-2">
                  <span className="text-indigo mt-0.5">✓</span> Export options
                </li>
              </ul>
              <Link href="#" className="block w-full text-center py-3 rounded-xl bg-card border border-line text-ink font-semibold hover:border-indigo transition-colors text-[14px]">
                Get updates
              </Link>
            </div>

            {/* Enterprise */}
            <div className="bg-canvas border border-line rounded-2xl p-8 flex flex-col">
              <h3 className="text-[18px] font-bold text-ink mb-2">Enterprise</h3>
              <div className="text-[20px] font-medium text-ink-3 mb-8 mt-3">Let&apos;s talk</div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-start gap-3 text-[14px] text-ink-2">
                  <span className="text-indigo mt-0.5">✓</span> Advanced security
                </li>
                <li className="flex items-start gap-3 text-[14px] text-ink-2">
                  <span className="text-indigo mt-0.5">✓</span> Deployment options
                </li>
                <li className="flex items-start gap-3 text-[14px] text-ink-2">
                  <span className="text-indigo mt-0.5">✓</span> Data-control options
                </li>
              </ul>
              <Link href="#" className="block w-full text-center py-3 rounded-xl bg-card border border-line text-ink font-semibold hover:border-indigo transition-colors text-[14px]">
                Talk to us
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
