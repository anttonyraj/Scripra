import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy | Scripra",
  description: "Learn how Scripra protects your personal data and conversation privacy.",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-24 px-6 bg-canvas">
        <div className="max-w-[760px] mx-auto bg-panel border border-line rounded-3xl p-8 lg:p-12 shadow-sm">
          <h1 className="text-[32px] font-bold text-ink tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-[13px] text-ink-3 mb-8">Last updated: August 2026</p>

          <div className="prose prose-neutral text-ink-2 text-[14px] leading-relaxed space-y-6">
            <section>
              <h2 className="text-[18px] font-bold text-ink mb-2">1. Overview</h2>
              <p>
                At Scripra (a product of AIworkX), we believe your conversations belong to you. This Privacy Policy explains how we collect, use, and safeguard your data when you use our platform.
              </p>
            </section>

            <section>
              <h2 className="text-[18px] font-bold text-ink mb-2">2. Data We Process</h2>
              <p>
                When you use Scripra to record or upload audio, we process your voice notes and meetings solely to transcribe, summarize, and organize them into your private workspace.
              </p>
            </section>

            <section>
              <h2 className="text-[18px] font-bold text-ink mb-2">3. Zero Model Training</h2>
              <p>
                We do NOT sell your data, and we do NOT use your private conversations to train global AI models.
              </p>
            </section>

            <section>
              <h2 className="text-[18px] font-bold text-ink mb-2">4. Your Rights</h2>
              <p>
                You can export or permanently delete your conversations and account data at any time directly from your workspace settings.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
