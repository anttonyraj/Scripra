import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import BackgroundAnimation from "@/components/BackgroundAnimation";
import { Providers } from "@/components/Providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Scripra — #1 Autonomous AI Meeting Bot & Conversation Intelligence Agent",
    template: "%s | Scripra AI",
  },
  description: "Autonomous AI meeting agent & bot for Google Meet, Zoom, Microsoft Teams & Webex. Instant diarized transcripts, executive MoM synthesis, consensus action items, and cross-meeting memory graph. The privacy-first alternative to Otter & Fireflies.",
  keywords: [
    "Scripra",
    "AI notetaker",
    "AI meeting notetaker",
    "automated meeting notes",
    "AI meeting notes",
    "meeting note taker bot",
    "best AI notetaker",
    "AI notetaker for Google Meet",
    "AI notetaker for Zoom",
    "AI notetaker for Teams",
    "meeting summarizer AI",
    "automated minutes of meeting",
    "MoM generator AI",
    "board meeting minutes AI",
    "executive meeting recap template",
    "formal meeting minutes software",
    "action item extractor",
    "AI meeting bot",
    "AI meeting assistant",
    "AI agents",
    "AI bot",
    "meeting bot",
    "meeting AI",
    "Otter alternative",
    "Otter.ai alternative",
    "Fireflies alternative",
    "Fathom alternative",
    "Granola alternative",
    "Supernormal alternative",
    "Avoma alternative",
    "autonomous meeting bot",
    "AI conversation intelligence",
    "real-time speech transcription",
    "record meeting without bot",
    "private AI notetaker",
    "Google Meet bot",
    "Microsoft Teams bot",
    "Zoom bot",
    "Webex bot",
    "cross-meeting memory graph",
    "enterprise meeting AI",
  ],
  authors: [{ name: "Scripra AI Inc.", url: "https://www.scripra.com" }],
  creator: "Scripra AI",
  publisher: "Scripra AI",
  category: "Technology & Software",
  metadataBase: new URL("https://www.scripra.com"),
  alternates: {
    canonical: "https://www.scripra.com",
  },
  icons: {
    icon: [
      { url: "/scripra-curvy-s-hd.png", type: "image/png" },
      { url: "/scripra-icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/scripra-curvy-s-hd.png",
  },
  verification: {
    google: "googleb3f88da066692fe9",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Scripra — #1 Autonomous AI Meeting Bot & Conversation Intelligence Agent",
    description: "Autonomous AI meeting agent & bot for Google Meet, Zoom, Teams & Webex. Instant diarized transcripts, executive MoM synthesis, action items, and cross-meeting memory.",
    url: "https://www.scripra.com",
    siteName: "Scripra",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://www.scripra.com/images/concept-bot-stream.jpg",
        width: 1200,
        height: 630,
        alt: "Scripra Autonomous AI Meeting Bot & Multi-Platform Diarization",
      },
      {
        url: "https://www.scripra.com/scripra-curvy-s-hd.png",
        width: 512,
        height: 512,
        alt: "Scripra Curvy S Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Scripra — #1 Autonomous AI Meeting Bot & Conversation Intelligence Agent",
    description: "Autonomous AI meeting agent & bot for Google Meet, Zoom, Teams & Webex. The privacy-first alternative to Otter & Fireflies.",
    images: ["https://www.scripra.com/images/concept-bot-stream.jpg"],
    creator: "@scripra_ai",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.scripra.com/#organization",
      name: "Scripra",
      url: "https://www.scripra.com",
      logo: "https://www.scripra.com/scripra-curvy-s-hd.png",
      sameAs: [
        "https://twitter.com/scripra_ai",
        "https://github.com/anttonyraj/Scripra",
      ],
      description: "Enterprise AI Conversation Intelligence and Autonomous Meeting Bot platform.",
    },
    {
      "@type": "WebApplication",
      "@id": "https://www.scripra.com/#webapp",
      name: "Scripra AI Notetaker & Meeting Intelligence",
      url: "https://www.scripra.com",
      applicationCategory: "BusinessApplication",
      operatingSystem: "All (Web, Google Meet, Microsoft Teams, Zoom, Cisco Webex, Chrome Extension)",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        ratingCount: "1280",
        bestRating: "5",
        worstRating: "1",
      },
      featureList: [
        "Autonomous AI Meeting Notetaker for Meet, Teams, Zoom, and Webex",
        "Sub-300ms Real-time Speech Diarization",
        "Instant Transcript Download (.txt & Markdown)",
        "Automated Institutional Minutes of Meeting (MoM)",
        "Consensus and Objection Detection",
        "1-Click Task Export to Jira, Linear, Slack, and Notion",
        "Cross-Meeting Constellation Memory Graph",
        "Zero-Trust Enterprise Encryption with Zero Model Training",
      ],
    },
    {
      "@type": "HowTo",
      "@id": "https://www.scripra.com/#howto-notes",
      name: "How to Automatically Take AI Meeting Notes & Generate Minutes with Scripra",
      description: "Step-by-step guide to generating real-time speaker-diarized meeting transcripts, institutional MoM, and action items across Google Meet, Microsoft Teams, Zoom, and Webex using Scripra AI.",
      totalTime: "PT1M",
      step: [
        {
          "@type": "HowToStep",
          name: "Connect or Dispatch Scripra Bot",
          text: "Paste your Google Meet, Zoom, Teams, or Webex invite URL into the Scripra Dispatch Simulator, or click Join in the Scripra Chrome Extension.",
          url: "https://www.scripra.com/ai-notetaker#dispatch",
        },
        {
          "@type": "HowToStep",
          name: "Autonomous Speech Diarization",
          text: "Scripra Neural Core captures multi-speaker audio with sub-300ms latency, identifying who spoke and timestamping every dialogue turn.",
          url: "https://www.scripra.com/ai-notetaker#transcription",
        },
        {
          "@type": "HowToStep",
          name: "Executive MoM & Action Item Synthesis",
          text: "Scripra synthesizes structured Minutes of Meeting, detects consensus vs objections, and assigns tasks with owners and deadlines.",
          url: "https://www.scripra.com/ai-notetaker#mom",
        },
        {
          "@type": "HowToStep",
          name: "Export & 1-Click Workflow Sync",
          text: "Download the diarized transcript in .txt or Markdown (.md), or push action items directly to Linear, Jira, Slack, or Notion.",
          url: "https://www.scripra.com/ai-notetaker#export",
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.scripra.com/#breadcrumbs",
      itemListElement: [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.scripra.com",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "AI Notetaker",
          "item": "https://www.scripra.com/ai-notetaker",
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Pricing",
          "item": "https://www.scripra.com/pricing",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.scripra.com/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is Scripra AI meeting notetaker?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Scripra is an autonomous AI meeting notetaker and conversation intelligence agent that automatically takes notes, captures multi-speaker transcripts, generates executive Minutes of Meeting (MoM), and extracts action items across Google Meet, Zoom, Microsoft Teams, and Webex.",
          },
        },
        {
          "@type": "Question",
          name: "How does Scripra compare to Otter.ai and Fireflies?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Unlike Otter and Fireflies which produce flat transcripts with limited context, Scripra generates structured institutional Minutes of Meeting (MoM), tracks consensus vs. objections, builds an ongoing cross-meeting memory constellation graph, supports bot-free stealth capture, and guarantees zero training on customer voice data.",
          },
        },
        {
          "@type": "Question",
          name: "Can I download diarized transcripts from Scripra?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Scripra provides instant one-click transcript downloads in plain text (.txt) and formatted Markdown (.md) with timestamps, speaker identities, and full meeting metadata.",
          },
        },
        {
          "@type": "Question",
          name: "Which meeting platforms are supported by Scripra?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Scripra supports Google Meet, Microsoft Teams, Zoom, and Cisco Webex, in addition to direct microphone input and browser tab audio capture.",
          },
        },
        {
          "@type": "Question",
          name: "Can Scripra take meeting notes without a bot joining?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. In addition to bot dispatch, Scripra offers zero-bot invisible audio capture using your browser tab or local microphone via the Scripra Chrome Extension, allowing you to record without any bot visibly entering the participant list.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <link rel="icon" href="/scripra-curvy-s-hd.png" type="image/png" />
        <link rel="icon" href="/scripra-icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('scripra-theme');
                  var theme = saved || 'light';
                  document.documentElement.setAttribute('data-theme', theme);
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans text-ink antialiased selection:bg-indigo-wash selection:text-indigo-deep`}>
        <BackgroundAnimation />
        <Providers>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </Providers>
      </body>
    </html>
  );
}
