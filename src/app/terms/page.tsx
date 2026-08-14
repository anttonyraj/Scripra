import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms of Service | Scripra",
  description: "Terms and conditions for using the Scripra platform.",
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-24 px-6 bg-canvas">
        <div className="max-w-[760px] mx-auto bg-panel border border-line rounded-3xl p-8 lg:p-12 shadow-sm">
          <h1 className="text-[32px] font-bold text-ink tracking-tight mb-4">Terms of Service</h1>
          <p className="text-[13px] text-ink-3 mb-8">Last updated: August 2026</p>

          <div className="prose prose-neutral text-ink-2 text-[14px] leading-relaxed space-y-6">
            <section>
              <h2 className="text-[18px] font-bold text-ink mb-2">1. Acceptance of Terms</h2>
              <p>
                By accessing or using Scripra, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-[18px] font-bold text-ink mb-2">2. Use of Services</h2>
              <p>
                You are responsible for ensuring that you have necessary consent from participants before recording any conversation, in compliance with applicable local laws and regulations.
              </p>
            </section>

            <section>
              <h2 className="text-[18px] font-bold text-ink mb-2">3. Intellectual Property</h2>
              <p>
                You retain full ownership of all audio recordings, transcripts, notes, and content that you upload or create using Scripra.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
