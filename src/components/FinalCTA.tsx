import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="py-32 px-6 bg-raise border-t border-line text-center">
      <div className="max-w-[700px] mx-auto">
        <h2 className="text-[clamp(36px,5vw,56px)] font-bold tracking-[-0.03em] leading-[1.05] mb-6">
          <span className="block text-ink">Meetings end.</span>
          <span className="block text-indigo">Their context shouldn’t.</span>
        </h2>
        
        <p className="text-[18px] text-ink-2 mb-10 max-w-[500px] mx-auto">
          Turn your next conversation into something your team can actually use.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
          <Link
            href="/signup"
            className="px-8 py-4 rounded-xl border border-transparent bg-indigo text-white text-[16px] font-semibold hover:bg-indigo-deep transition-colors w-full sm:w-auto text-center shadow-sm"
          >
            Try Scripra free
          </Link>
          <Link
            href="/how-it-works"
            className="px-8 py-4 rounded-xl border border-line bg-card text-ink text-[16px] font-semibold hover:border-indigo-deep transition-colors w-full sm:w-auto text-center"
          >
            See how it works
          </Link>
        </div>
      </div>
    </section>
  );
}
