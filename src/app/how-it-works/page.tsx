import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CaptureSection from "@/components/CaptureSection";
import UnderstandSection from "@/components/UnderstandSection";
import ActionsSection from "@/components/ActionsSection";
import RecallSection from "@/components/RecallSection";
import MemorySection from "@/components/MemorySection";
import OneMemorySection from "@/components/OneMemorySection";
import GraphSection from "@/components/GraphSection";

export default function HowItWorksPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <div className="py-24 text-center px-6">
          <h1 className="text-[clamp(40px,5vw,56px)] font-bold tracking-[-0.03em] text-ink leading-[1.05] mb-6">
            How Scripra works
          </h1>
          <p className="text-[18px] text-ink-2 max-w-[600px] mx-auto">
            From capture to memory, see exactly how Scripra turns your conversations into intelligence.
          </p>
        </div>
        <CaptureSection />
        <UnderstandSection />
        <ActionsSection />
        <RecallSection />
        <MemorySection />
        <OneMemorySection />
        <GraphSection />
      </main>
      <Footer />
    </>
  );
}
