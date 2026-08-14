import Link from "next/link";
import ConversationArtifact from "./ConversationArtifact";

export default function Hero() {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 px-6 overflow-hidden bg-transparent">
      {/* Ambient background grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] select-none" style={{ backgroundImage: 'linear-gradient(to bottom, var(--line) 1px, transparent 1px), linear-gradient(to right, var(--line) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
      
      <div className="max-w-[1280px] w-full mx-auto grid grid-cols-1 lg:grid-cols-[48%_52%] gap-10 lg:gap-12 items-center relative z-10">
        
        {/* Left Side (48%) */}
        <div className="flex flex-col items-start text-left max-w-[560px]">
          {/* Main Headline */}
          <h1 className="text-[clamp(32px,3.8vw,50px)] font-bold tracking-[-0.03em] leading-[1.12] mb-4 text-ink">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal via-indigo to-indigo-deep">
              The AI memory engine
            </span>{" "}
            for{" "}
            <span className="text-indigo">
              your conversations.
            </span>
          </h1>
          
          {/* 4 Pillars Subtitle */}
          <div className="text-[15px] sm:text-[16px] font-bold text-teal dark:text-teal mb-3.5 tracking-tight flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal inline-block shadow-sm shrink-0"></span>
            <span>Never forget what was said.</span>
          </div>
          
          {/* Descriptive Body Copy */}
          <p className="text-[15px] sm:text-[16px] leading-[1.6] text-ink-2 mb-7">
            Capture meetings, interviews, and passing thoughts. Scripra instantly turns your voice into crystal-clear transcripts, automated action items, and a persistent knowledge base you can query anytime.
          </p>
          
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 w-full sm:w-auto items-start sm:items-center mb-8">
            <Link
              href="/signup"
              className="px-6 py-3.5 rounded-xl border border-indigo bg-indigo text-white text-[15px] font-semibold hover:bg-indigo-deep hover:shadow-[0_0_20px_rgba(91,92,240,0.4)] transition-all w-full sm:w-auto text-center shadow-sm"
            >
              Try Scripra free
            </Link>
            <Link
              href="/demo"
              className="px-6 py-3.5 rounded-xl border border-line bg-card/80 backdrop-blur-md text-ink text-[15px] font-semibold hover:border-indigo transition-all w-full sm:w-auto text-center"
            >
              Live Demo
            </Link>
            <Link
              href="/how-it-works"
              className="px-6 py-3.5 rounded-xl border border-line bg-card/80 backdrop-blur-md text-ink text-[15px] font-semibold hover:border-indigo transition-all w-full sm:w-auto text-center"
            >
              See how it works
            </Link>
          </div>

          {/* Value-Driven Benefits (Clear & Easy to Understand) */}
          <div className="pt-5 border-t border-line/60 w-full flex flex-wrap items-center gap-x-6 gap-y-2 text-ink-2 text-[12px] font-medium">
            <div className="flex items-center gap-2">
              <span className="text-teal font-bold">✓</span>
              <span>Instant Transcription</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-indigo font-bold">✓</span>
              <span>Auto Action Items &amp; Recaps</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-rose font-bold">✓</span>
              <span>Search Past Conversations</span>
            </div>
          </div>

        </div>

        {/* Right Side (56%) */}
        <div className="flex justify-center lg:justify-end w-full pl-0 lg:pl-2">
          <ConversationArtifact />
        </div>
        
      </div>
    </div>
  );
}
