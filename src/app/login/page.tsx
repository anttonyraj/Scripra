import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LoginPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center px-6 pt-32 pb-20 relative overflow-hidden bg-canvas">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-[420px] w-full mx-auto relative z-10">
          <div className="bg-panel border border-line rounded-3xl p-8 lg:p-10 shadow-xl">
            <div className="text-center mb-8">
              <h1 className="text-[28px] font-bold text-ink tracking-tight mb-2">Welcome back</h1>
              <p className="text-[14px] text-ink-2">Log in to your Scripra workspace.</p>
            </div>

            <form className="flex flex-col gap-4">
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
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-[13px] font-semibold text-ink">Password</label>
                  <a href="#" className="text-[12px] text-indigo hover:underline">Forgot?</a>
                </div>
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
                Log In
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-line text-center">
              <p className="text-[13px] text-ink-2">
                Don't have an account?{" "}
                <Link href="/signup" className="text-indigo font-semibold hover:underline">
                  Sign up free
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
