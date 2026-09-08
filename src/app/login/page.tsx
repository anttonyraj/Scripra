"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function LoginForm() {
  const { status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [loading, setLoading] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.push(callbackUrl);
    }
  }, [status, router, callbackUrl]);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await signIn("google", { callbackUrl });
    } catch (err) {
      console.error("Sign-in error:", err);
      setLoading(false);
    }
  };

  const handleGuestSignIn = async () => {
    try {
      setGuestLoading(true);
      const res = await signIn("credentials", {
        redirect: false,
        email: "demo@scripra.com",
        name: "Pilot Guest",
        callbackUrl,
      });
      if (res?.ok || !res?.error) {
        router.push(callbackUrl);
      } else {
        router.push(callbackUrl);
      }
    } catch (err) {
      console.error("Guest sign-in error:", err);
      router.push(callbackUrl);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={handleGoogleSignIn}
        disabled={loading || guestLoading}
        className="w-full py-3.5 px-5 rounded-2xl bg-card border-2 border-line hover:border-indigo/40 hover:bg-raise text-ink font-bold text-[15px] transition-all flex items-center justify-center gap-3 shadow-xs active:scale-[0.99] disabled:opacity-50"
      >
        {/* Official Google G Logo */}
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
        <span>{loading ? "Connecting to Google..." : "Continue with Google"}</span>
      </button>

      <div className="flex items-center gap-3 my-1">
        <div className="h-px bg-line/60 flex-1" />
        <span className="text-[11px] font-mono uppercase tracking-wider text-ink-3">
          or preview instantly
        </span>
        <div className="h-px bg-line/60 flex-1" />
      </div>

      <button
        onClick={handleGuestSignIn}
        disabled={loading || guestLoading}
        className="w-full py-3 px-5 rounded-2xl bg-indigo-wash/50 border border-indigo/20 hover:border-indigo/50 hover:bg-indigo-wash text-indigo font-bold text-[14px] transition-all flex items-center justify-center gap-2 shadow-xs active:scale-[0.99] disabled:opacity-50"
      >
        <span>⚡</span>
        <span>{guestLoading ? "Opening Demo Workspace..." : "Explore Demo Workspace (Instant Access)"}</span>
      </button>

      <div className="text-[12px] text-center text-ink-3 leading-relaxed">
        New to Scripra? Instant access creates your local workspace with sample meeting data.
      </div>
    </div>
  );
}

export default function LoginPage() {

  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center px-6 pt-32 pb-20 relative overflow-hidden bg-canvas">
        {/* Ambient Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-wash/60 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-[440px] w-full mx-auto relative z-10">
          <div className="bg-card border border-line rounded-3xl p-8 sm:p-10 shadow-[0_25px_60px_rgba(67,83,255,0.08)]">
            
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-wash text-teal text-[11px] font-bold tracking-wider uppercase border border-teal/20 mb-4">
                <span className="w-2 h-2 rounded-full bg-teal" />
                Single 1-Click Access
              </div>
              <h1 className="text-[28px] font-black text-ink tracking-tight mb-2">
                Sign in to Scripra
              </h1>
              <p className="text-[14px] text-ink-3">
                Access your meetings, executive recaps, and organization memory.
              </p>
            </div>

            {/* 1-Click Google Auth Button */}
            <Suspense
              fallback={
                <div className="w-full py-4 text-center text-sm font-mono text-ink-3 animate-pulse">
                  Loading authentication...
                </div>
              }
            >
              <LoginForm />
            </Suspense>

            {/* Security Notice */}
            <div className="mt-8 pt-6 border-t border-line/70 text-center">
              <div className="flex items-center justify-center gap-4 text-[11px] font-mono text-ink-3">
                <span className="flex items-center gap-1">
                  <span className="text-teal font-bold">✓</span> No password required
                </span>
                <span className="flex items-center gap-1">
                  <span className="text-teal font-bold">✓</span> SOC 2 Ready
                </span>
              </div>

              <p className="text-[11px] text-ink-3 mt-3">
                By continuing, you agree to our{" "}
                <Link href="/terms" className="text-indigo underline hover:text-indigo-deep">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-indigo underline hover:text-indigo-deep">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
