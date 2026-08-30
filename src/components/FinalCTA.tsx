import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="py-32 px-6 bg-[#0B0D14] text-center border-t border-white/10">
      <div className="max-w-[700px] mx-auto">
        <h2 className="text-[clamp(36px,5vw,56px)] font-bold tracking-[-0.03em] leading-[1.05] mb-6">
          <span className="block text-white">Meetings end.</span>
          <span className="block text-indigo-400">Their context shouldn’t.</span>
        </h2>
        
        <p className="text-[18px] text-white/60 mb-10 max-w-[500px] mx-auto">
          Turn your next conversation into something your team can actually use.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
          <Link
            href="/signup"
            className="px-8 py-4 rounded-xl border border-transparent bg-indigo-500 text-white text-[16px] font-semibold hover:bg-indigo-400 transition-colors w-full sm:w-auto text-center shadow-[0_0_20px_rgba(99,102,241,0.3)]"
          >
            Try Scripra free
          </Link>
          <Link
            href="/how-it-works"
            className="px-8 py-4 rounded-xl border border-white/20 bg-white/5 text-white text-[16px] font-semibold hover:bg-white/10 transition-colors w-full sm:w-auto text-center backdrop-blur-sm"
          >
            See how it works
          </Link>
        </div>
      </div>
    </section>
  );
}
