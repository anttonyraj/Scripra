import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="py-28 sm:py-36 px-6 bg-gradient-to-b from-[#0F172A] via-[#0B0F19] to-[#0A0D18] text-center border-t border-white/10 relative overflow-hidden">
      {/* Ambient ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-500/20 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-[760px] mx-auto relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-400/25 text-indigo-300 text-[11px] font-bold tracking-wider uppercase mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
          Start Free Today
        </div>

        <h2 className="text-[clamp(36px,5vw,56px)] font-black tracking-[-0.03em] leading-[1.08] mb-6">
          <span className="block text-white">Meetings end.</span>
          <span className="block text-indigo-400">Their intelligence shouldn&apos;t.</span>
        </h2>
        
        <p className="text-[17px] sm:text-[19px] text-white/70 mb-10 max-w-[580px] mx-auto leading-relaxed">
          Never let another critical decision or assigned task get forgotten. Capture your next conversation with Scripra.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full sm:w-auto">
          <Link
            href="/signup"
            className="px-8 py-4 rounded-xl bg-indigo text-white text-[15px] font-bold hover:bg-indigo-deep transition-all w-full sm:w-auto text-center shadow-[0_8px_30px_rgba(67,83,255,0.4)] active:scale-[0.99]"
          >
            Try Scripra free
          </Link>
          <Link
            href="/demo"
            className="px-8 py-4 rounded-xl border border-white/20 bg-white/5 text-white text-[15px] font-bold hover:bg-white/10 transition-all w-full sm:w-auto text-center backdrop-blur-sm"
          >
            Explore interactive demo
          </Link>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6 text-[12px] font-mono text-white/40">
          <span>✓ No credit card required</span>
          <span>✓ 2-minute setup</span>
          <span>✓ Unlimited recording</span>
        </div>
      </div>
    </section>
  );
}
