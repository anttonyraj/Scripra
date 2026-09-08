import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InvestorsSection from "@/components/InvestorsSection";
import FinalCTA from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "Investors & Strategic Thesis | Scripra",
  description:
    "Why Scripra wins the $18B conversation intelligence transition. Bot-Free edge capture, cross-meeting knowledge graph moat, unit economics, competitive benchmark, and investor FAQ.",
  openGraph: {
    title: "Investors & Strategic Thesis | Scripra",
    description:
      "Explore Scripra's strategic thesis, unfair technical moat, and unit economics in conversation intelligence.",
  },
};

export default function InvestorsPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16 bg-canvas">
        <InvestorsSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
