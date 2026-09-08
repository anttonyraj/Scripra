import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HowItWorksInteractive from "@/components/HowItWorksInteractive";

export default function HowItWorksPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16 bg-canvas">
        <div className="pt-16 pb-12 text-center px-6 max-w-[840px] mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-wash text-teal text-[11px] font-bold tracking-[0.15em] uppercase border border-teal/25 mb-4">
            <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
            End-to-End Architecture
          </div>
          <h1 className="text-[clamp(38px,5vw,56px)] font-black tracking-[-0.03em] text-ink leading-[1.1] mb-5">
            How Scripra works
          </h1>
          <p className="text-[17px] sm:text-[19px] text-ink-3 leading-relaxed max-w-[660px] mx-auto">
            From multi-platform call capture to living organizational memory — see the 4-stage pipeline that turns conversations into decisions and automated actions.
          </p>
        </div>

        <HowItWorksInteractive />
      </main>
      <Footer />
    </>
  );
}
