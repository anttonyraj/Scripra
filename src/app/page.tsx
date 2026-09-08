import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CaptureVisualSection from "@/components/CaptureVisualSection";
import MoMStudioSection from "@/components/MoMStudioSection";
import MemoryGraphSection from "@/components/MemoryGraphSection";
import FuturisticBentoShowcase from "@/components/FuturisticBentoShowcase";
import IntegrationsSection from "@/components/IntegrationsSection";
import ContactSection from "@/components/ContactSection";
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
        <FuturisticBentoShowcase />
        <IntegrationsSection />
        <ContactSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
