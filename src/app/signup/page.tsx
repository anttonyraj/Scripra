import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SignupPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center px-6 pt-32 pb-20 relative overflow-hidden bg-canvas">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-[440px] w-full mx-auto relative z-10">
          <div className="bg-panel border border-line rounded-3xl p-8 lg:p-10 shadow-xl">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-wash border border-indigo/20 text-indigo text-[10px] font-bold tracking-wider uppercase mb-4">
                GET STARTED FREE
              </div>
              <h1 className="text-[28px] font-bold text-ink tracking-tight mb-2">Create your Scripra account</h1>
              <p className="text-[14px] text-ink-2">Never lose context from a conversation again.</p>
            </div>

            <form className="flex flex-col gap-4">
              <div>
                <label className="block text-[13px] font-semibold text-ink mb-1.5">Full Name</label>
                <input
                  type="text"
                  placeholder="Antony Raj"
                  className="w-full px-4 py-3 rounded-xl border border-line bg-canvas text-ink text-[14px] focus:outline-none focus:border-indigo transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-ink mb-1.5">Email Address</label>
                <input
                  type="email"
                  placeholder="antony@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-line bg-canvas text-ink text-[14px] focus:outline-none focus:border-indigo transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-ink mb-1.5">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-line bg-canvas text-ink text-[14px] focus:outline-none focus:border-indigo transition-colors"
                  required
                />
              </div>

              <button
                type="submit"
                className="mt-2 w-full py-3.5 rounded-xl bg-indigo text-white font-semibold text-[15px] hover:bg-indigo-deep transition-colors shadow-sm"
              >
                Start Free Trial
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-line text-center">
              <p className="text-[13px] text-ink-2">
                Already have an account?{" "}
                <Link href="/login" className="text-indigo font-semibold hover:underline">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
