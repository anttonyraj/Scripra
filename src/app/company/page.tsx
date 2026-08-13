import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Company — Scripra",
  description: "Scripra is an AIworkX product focused on transforming conversations into structured, searchable intelligence.",
};

export default function Company() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-24 min-h-[70vh] flex flex-col justify-center">
        <div className="max-w-[1080px] mx-auto px-6 w-full text-center">
          <div className="max-w-[800px] mx-auto">
            <h1 className="text-[clamp(36px,5vw,54px)] font-bold tracking-[-0.03em] mb-6 text-ink">
              Building better organisational memory.
            </h1>
            <p className="text-[19px] leading-[1.65] text-ink-2 mb-12">
              Scripra is an AIworkX product focused on transforming conversations into structured, searchable intelligence.
            </p>
            
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-canvas border border-line">
              <span className="text-[14px] text-ink-2">A product of</span>
              <a 
                href="https://aiworkx.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[14px] font-bold text-ink hover:text-indigo transition-colors"
              >
                AIworkX
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
