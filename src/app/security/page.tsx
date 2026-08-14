import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Security & Privacy | Scripra",
  description: "Enterprise-grade encryption, privacy-first AI, and complete control over your conversation memory.",
};

export default function SecurityPage() {
  const securityFeatures = [
    {
      title: "End-to-End Encryption",
      desc: "All audio streams, transcripts, summaries, and extracted metadata are encrypted at rest using AES-256 and in transit using TLS 1.3.",
    },
    {
      title: "Zero Model Training on Your Data",
      desc: "Your recordings and transcripts are never used to train global AI foundation models. Your data remains strictly your own.",
    },
    {
      title: "Granular Access Controls",
      desc: "Role-based permissions (RBAC), SSO via SAML/Okta/Google Workspace, and granular sharing settings for both individuals and team workspaces.",
    },
    {
      title: "Complete Data Sovereignty",
      desc: "Export all your conversations, audio files, and memory graphs at any time in standard formats (JSON, Markdown, MP3) with single-click deletion.",
    },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-24 px-6 bg-canvas">
        <div className="max-w-[1080px] mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-wash border border-indigo/20 text-indigo text-[10px] font-bold tracking-wider uppercase mb-4">
              ENTERPRISE SECURITY
            </div>
            <h1 className="text-[clamp(32px,4vw,48px)] font-bold text-ink tracking-tight mb-4">
              Your conversations are private. Period.
            </h1>
            <p className="text-[17px] text-ink-2 max-w-[600px] mx-auto">
              Built with bank-grade encryption and privacy-by-design principles from day one.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {securityFeatures.map((item, i) => (
              <div key={i} className="bg-panel border border-line rounded-2xl p-8 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-indigo-wash text-indigo flex items-center justify-center font-bold text-[16px] mb-4">
                  0{i + 1}
                </div>
                <h2 className="text-[20px] font-bold text-ink mb-2">{item.title}</h2>
                <p className="text-[14px] text-ink-2 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
