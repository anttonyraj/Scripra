import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DemoClient from "@/components/DemoClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demo — Scripra",
  description: "Try the Scripra interactive demo.",
};

export default function Demo() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-24 min-h-[80vh] flex flex-col">
        <div className="max-w-[1080px] mx-auto px-6 w-full flex-1 flex flex-col items-center justify-center">
          <div className="text-center max-w-[800px] mx-auto mb-12">
            <h1 className="text-[clamp(32px,4vw,46px)] font-bold tracking-[-0.03em] mb-4">
              Try Scripra live.
            </h1>
            <p className="text-[17px] text-ink-2">
              Speak into your microphone and see how Scripra captures the conversation in real-time.
            </p>
          </div>
          
          <DemoClient />
          
        </div>
      </main>
      <Footer />
    </>
  );
}
