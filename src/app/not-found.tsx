import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-[80vh] flex items-center justify-center px-6 pt-32 pb-20 relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-[560px] w-full text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo/20 bg-indigo-wash text-indigo text-[11px] font-mono font-bold tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-rose animate-pulse" />
            ERROR 404 // NOT_FOUND
          </div>

          <h1 className="text-[clamp(36px,5vw,60px)] font-bold tracking-tight text-ink leading-[1.05] mb-4">
            Conversation lost in memory.
          </h1>

          <p className="text-[16px] text-ink-2 leading-relaxed mb-8 max-w-[440px] mx-auto">
            The page or transcript you are searching for does not exist or has been moved.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="px-6 py-3.5 rounded-xl bg-indigo text-white font-semibold text-[15px] hover:bg-indigo-deep transition-all shadow-sm w-full sm:w-auto text-center"
            >
              Back to Home
            </Link>
            <Link
              href="/demo"
              className="px-6 py-3.5 rounded-xl border border-line bg-card text-ink font-semibold text-[15px] hover:border-indigo transition-all w-full sm:w-auto text-center"
            >
              Explore Live Demo
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
