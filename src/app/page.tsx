import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Pillars from "@/components/Pillars";
import SentenceToStructure from "@/components/SentenceToStructure";
import ProductPreview from "@/components/ProductPreview";
import Differentiator from "@/components/Differentiator";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Pillars />
        <SentenceToStructure />
        <ProductPreview />
        <Differentiator />
      </main>
      <Footer />
    </>
  );
}
