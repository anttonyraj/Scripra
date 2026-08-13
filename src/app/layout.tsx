import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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
  title: "Scripra — AI Conversation Intelligence",
  description: "Turn meetings, calls and conversations into searchable transcripts, recaps, decisions, action items, commitments and organisational memory with Scripra.",
  metadataBase: new URL("https://scripra.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Scripra — AI Conversation Intelligence",
    description: "Turn meetings, calls and conversations into searchable transcripts, recaps, decisions, action items, commitments and organisational memory with Scripra.",
    url: "https://scripra.com",
    siteName: "Scripra",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scripra — AI Conversation Intelligence",
    description: "Turn meetings, calls and conversations into searchable transcripts, recaps, decisions, action items, commitments and organisational memory with Scripra.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('scripra-theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var theme = saved || (prefersDark ? 'dark' : 'light');
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-canvas text-ink antialiased selection:bg-indigo-wash selection:text-indigo-deep`}>
        {children}
      </body>
    </html>
  );
}
