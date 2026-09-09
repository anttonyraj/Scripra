import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AiNotetakerInteractive from "@/components/AiNotetakerInteractive";

export const metadata: Metadata = {
  title: "AI Notetaker for Google Meet, Zoom, Teams & Webex — Scripra",
  description:
    "Autonomous AI meeting notetaker for Google Meet, Zoom, Microsoft Teams, and Webex. Real-time diarized transcripts, executive MoM synthesis, consensus tracking, and bot-free capture. Free forever.",
  alternates: {
    canonical: "https://www.scripra.com/ai-notetaker",
  },
  openGraph: {
    title: "AI Notetaker for Google Meet, Zoom, Teams & Webex — Scripra",
    description:
      "Autonomous AI meeting notetaker. Generates executive Minutes of Meeting (MoM), captures diarized transcripts, and assigns action items with zero manual typing.",
    url: "https://www.scripra.com/ai-notetaker",
    siteName: "Scripra",
    images: [
      {
        url: "https://www.scripra.com/images/concept-mom-studio.jpg",
        width: 1200,
        height: 630,
        alt: "Scripra AI Meeting Notetaker & MoM Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Notetaker for Google Meet, Zoom, Teams & Webex — Scripra",
    description:
      "Autonomous AI meeting notetaker. Instant Minutes of Meeting (MoM), diarized transcripts, and task sync. Top alternative to Otter.",
    images: ["https://www.scripra.com/images/concept-mom-studio.jpg"],
  },
};

export default function AiNotetakerPage() {
  return (
    <>
      <Header />
      <main className="pt-28 pb-16 bg-canvas text-ink relative min-h-screen">
        <AiNotetakerInteractive />
      </main>
      <Footer />
    </>
  );
}
