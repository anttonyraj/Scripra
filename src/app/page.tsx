import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CaptureVisualSection from "@/components/CaptureVisualSection";
import MoMStudioSection from "@/components/MoMStudioSection";
import MemoryGraphSection from "@/components/MemoryGraphSection";
import InvestorsSection from "@/components/InvestorsSection";
import IntegrationsSection from "@/components/IntegrationsSection";
import EnterpriseSection from "@/components/EnterpriseSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="relative">
        <Hero />
        <CaptureVisualSection />
        <MoMStudioSection />
        <MemoryGraphSection />
        <InvestorsSection />
        <IntegrationsSection />
        <EnterpriseSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
