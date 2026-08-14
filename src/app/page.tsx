import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PlatformLoop from "@/components/PlatformLoop";
import BuiltForYouSection from "@/components/BuiltForYouSection";
import ScripraThinkSection from "@/components/ScripraThinkSection";
import SolutionsSection from "@/components/SolutionsSection";
import IntegrationsSection from "@/components/IntegrationsSection";
import EnterpriseSection from "@/components/EnterpriseSection";
import EvidenceDemo from "@/components/EvidenceDemo";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <PlatformLoop />
        <BuiltForYouSection />
        <ScripraThinkSection />
        <SolutionsSection />
        <IntegrationsSection />
        <EnterpriseSection />
        <EvidenceDemo />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
