import Link from "next/link";
import ConversationArtifact from "./ConversationArtifact";
import ScrollReveal from "./ScrollReveal";
import WordRotator from "./WordRotator";

export default function Hero() {
  return (
    <div className="relative min-h-[88vh] flex items-center justify-center pt-28 pb-16 px-6 sm:px-8 xl:px-12 overflow-hidden bg-transparent">
      <div className="max-w-[1380px] w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-center relative z-10">
        
        {/* Left Side: Headline, Product Pipeline & Copy */}
        <div className="flex flex-col items-start text-left max-w-[620px] w-full">
          <ScrollReveal direction="up" delay={0.1} className="w-full">
            
            {/* Live Product Intelligence Pipeline Graphic */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-wash/80 border border-indigo/25 text-indigo text-[12px] font-semibold mb-6 shadow-sm backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
              <span className="text-ink">Capture</span>
              <span className="text-indigo/50">→</span>
              <span className="text-ink">Transcribe</span>
              <span className="text-indigo/50">→</span>
              <span className="text-ink">Gemini MoM</span>
              <span className="text-indigo/50">→</span>
              <span className="text-amber font-bold flex items-center gap-1">
                <span>Action Memory</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber" />
              </span>
            </div>

            {/* Main Headline: Static 1-row AI Conversation Intelligence + Text Changing on next row */}
            <h1 className="font-black tracking-[-0.035em] leading-[1.14] mb-5 text-[#0F172A]">
              {/* Row 1: AI Conversation Intelligence (Static, 1 row) */}
              <span className="text-indigo block text-[clamp(22px,2.4vw,38px)] whitespace-nowrap">
                AI Conversation Intelligence
              </span>
              
              {/* Row 2: Text changing animation */}
              <span className="block text-[clamp(26px,3.2vw,44px)] text-[#0F172A] mt-1.5 font-black">
                <WordRotator />
              </span>

              {/* Row 3: engine for all your meetings */}
              <span className="block text-[clamp(22px,2.6vw,34px)] text-[#0F172A] mt-1.5 font-extrabold">
                engine for all your meetings
                <span className="inline-block w-3 h-3 rounded-full bg-amber ml-2 align-baseline shadow-[0_0_12px_rgba(245,160,32,0.65)]" />
              </span>
            </h1>
            
            {/* Crisp, Clear Definition of Scripra */}
            <div className="max-w-[530px] text-[15.5px] sm:text-[17px] font-medium text-ink-2 mb-8 tracking-tight flex items-start gap-2.5 leading-relaxed">
              <span className="w-2.5 h-2.5 rounded-full bg-teal inline-block shadow-sm shrink-0 mt-2" />
              <span>
                <strong className="text-ink font-bold">Scripra</strong> is the AI conversation engine that auto-joins your calls, synthesizes executive Minutes of Meeting (MoM), and builds an interconnected memory across your entire team.
              </span>
            </div>
            
            {/* Clean CTA Buttons */}
            <div className="flex items-center gap-4 mb-8">
              <Link
                href="/signup"
                className="px-7 py-3.5 rounded-xl bg-indigo text-white text-[15px] font-semibold hover:bg-indigo-deep hover:shadow-[0_8px_25px_rgba(67,83,255,0.35)] transition-all text-center shadow-md active:scale-[0.99]"
              >
                Try Scripra free
              </Link>
              <Link
                href="/demo"
                className="px-7 py-3.5 rounded-xl border border-line bg-card text-[#0F172A] text-[15px] font-semibold hover:border-indigo transition-all text-center shadow-sm"
              >
                Live Demo
              </Link>
            </div>

            {/* Product Integration & Feature Badges */}
            <div className="flex flex-wrap items-center gap-3.5 text-[11.5px] font-medium text-ink-3 pt-4 border-t border-line/60 max-w-[540px] w-full">
              <div className="flex items-center gap-1.5">
                <span className="text-teal font-bold">✓</span>
                <span className="text-ink font-semibold">Teams, Webex, Zoom &amp; Meet</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-amber font-bold">●</span>
                <span className="text-amber-deep font-semibold">Slack &amp; Discord (In-Progress)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-indigo font-bold">✓</span>
                <span>Gemini Flash Recaps &amp; MoM</span>
              </div>
            </div>

          </ScrollReveal>
        </div>

        {/* Right Side: Clean Structured Intelligence Card */}
        <ScrollReveal direction="left" delay={0.25} className="w-full flex justify-center lg:justify-end mt-4 lg:mt-0 relative">
          <ConversationArtifact />
        </ScrollReveal>
        
      </div>
    </div>
  );
}
