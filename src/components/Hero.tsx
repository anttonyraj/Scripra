import Link from "next/link";
import ConversationArtifact from "./ConversationArtifact";

export default function Hero() {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 px-6 overflow-hidden bg-transparent">
      {/* Optional faint background grid as requested */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] select-none" style={{ backgroundImage: 'linear-gradient(to bottom, var(--line) 1px, transparent 1px)', backgroundSize: '100% 48px' }} />
      
      <div className="max-w-[1280px] w-full mx-auto grid grid-cols-1 lg:grid-cols-[42%_58%] gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Side (42%) */}
        <div className="flex flex-col items-start text-left">
          <div className="flex items-center gap-2 mb-6">
            <div className="relative inline-flex overflow-hidden rounded-full p-[1px]">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,var(--indigo)_0%,var(--teal)_50%,var(--indigo)_100%)]" />
              <div className="inline-flex h-full w-full items-center justify-center rounded-full bg-canvas px-4 py-1.5 backdrop-blur-3xl">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase bg-gradient-to-r from-indigo to-teal bg-clip-text text-transparent">AI Conversation Intelligence</span>
              </div>
            </div>
          </div>
          
          <h1 className="text-[clamp(36px,4.5vw,56px)] font-bold tracking-[-0.03em] leading-[1.05] mb-6 text-ink">
            Every conversation becomes intelligence.
          </h1>
          
          <div className="text-[17px] font-semibold text-indigo mb-4">
            Capture. Understand. Act. Recall.
          </div>
          
          <p className="text-[16px] leading-[1.6] text-ink-2 mb-8 max-w-[480px]">
            Record or import any conversation. Scripra turns meetings, calls, lectures, interviews, ideas and voice notes into searchable transcripts, recaps, decisions, action items and memory — with important insights traceable back to the moment they were said.
          </p>
          
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 w-full sm:w-auto items-start sm:items-center mb-6">
            <Link
              href="/signup"
              className="px-6 py-3.5 rounded-xl border border-transparent bg-indigo text-white text-[15px] font-semibold hover:bg-indigo-deep transition-colors w-full sm:w-auto text-center shadow-sm"
            >
              Try Scripra free
            </Link>
            <Link
              href="/demo"
              className="px-6 py-3.5 rounded-xl border border-line bg-card text-ink text-[15px] font-semibold hover:border-indigo-deep transition-colors w-full sm:w-auto text-center"
            >
              Live Demo
            </Link>
            <Link
              href="/how-it-works"
              className="px-6 py-3.5 rounded-xl border border-line bg-card text-ink text-[15px] font-semibold hover:border-indigo-deep transition-colors w-full sm:w-auto text-center"
            >
              See how it works
            </Link>
          </div>

          <p className="text-[13px] font-medium text-ink-3">
            For individuals and teams.
          </p>
        </div>

        {/* Right Side (58%) */}
        <div className="flex justify-center lg:justify-end w-full pl-0 lg:pl-4">
          <ConversationArtifact />
        </div>
        
      </div>
    </div>
  );
}
