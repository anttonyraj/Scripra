"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSubscription } from "@/context/SubscriptionContext";
import { useSession, signOut } from "next-auth/react";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const { plan, meetingsUsed, meetingsLimit, openUpgradeModal } = useSubscription();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=" + encodeURIComponent(pathname));
    }
  }, [status, router, pathname]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-canvas flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-indigo border-t-transparent rounded-full animate-spin" />
          <span className="text-[13px] font-mono text-ink-3">Verifying Scripra session...</span>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-canvas flex items-center justify-center p-6">
        <div className="text-center max-w-sm">
          <div className="w-12 h-12 rounded-2xl bg-indigo-wash text-indigo font-bold flex items-center justify-center mx-auto mb-4 text-xl">
            🔒
          </div>
          <h2 className="text-xl font-bold text-ink mb-2">Authentication Required</h2>
          <p className="text-sm text-ink-3 mb-6">
            Please sign in with Google to access your Scripra meetings and workspace.
          </p>
          <Link
            href={`/login?callbackUrl=${encodeURIComponent(pathname)}`}
            className="inline-block px-6 py-3 rounded-xl bg-indigo text-white font-bold text-sm hover:bg-indigo-deep transition-all shadow-xs"
          >
            Continue with Google ↗
          </Link>
        </div>
      </div>
    );
  }

  const usagePercent = Math.min(100, Math.round((meetingsUsed / meetingsLimit) * 100));

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      name: "Conversations",
      href: "/dashboard/conversations",
      badge: "3",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
    },
    {
      name: "Search & Memory",
      href: "/dashboard/search",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-canvas flex">
      {/* Sidebar */}
      <aside className="w-[250px] bg-panel border-r border-line flex flex-col p-4 sticky top-0 h-screen overflow-y-auto hidden md:flex">
        {/* Brand */}
        <div className="px-2 pb-3.5 border-b border-line mb-3">
          <Logo showTagline={false} />
        </div>

        {/* Theme Appearance Selector */}
        <div className="px-2 pb-3 mb-2 flex items-center justify-between border-b border-line/60">
          <span className="text-[10px] font-bold tracking-wider uppercase text-ink-3">Theme</span>
          <ThemeToggle />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13.5px] font-medium transition-colors ${
                  isActive
                    ? "bg-indigo-wash text-indigo font-semibold"
                    : "text-ink-2 hover:bg-raise hover:text-ink"
                }`}
              >
                {item.icon}
                {item.name}
                {item.badge && (
                  <span className="ml-auto font-mono text-[11px] bg-raise px-1.5 py-0.5 rounded text-ink-3">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}

          <div className="text-[9.5px] font-semibold tracking-[0.16em] uppercase text-ink-3 px-3 pt-5 pb-2">
            Intelligence
          </div>
          <Link
            href="/dashboard/decisions"
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13.5px] font-medium text-ink-2 hover:bg-raise hover:text-ink transition-colors"
          >
            <svg className="w-4 h-4 text-indigo" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Decisions Found
          </Link>
          <Link
            href="/dashboard/actions"
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13.5px] font-medium text-ink-2 hover:bg-raise hover:text-ink transition-colors"
          >
            <svg className="w-4 h-4 text-amber" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            Action Items
            <span className="ml-auto font-mono text-[10px] bg-amber-wash text-amber font-bold px-1.5 py-0.5 rounded">
              3
            </span>
          </Link>

          <div className="text-[9.5px] font-semibold tracking-[0.16em] uppercase text-ink-3 px-3 pt-5 pb-2">
            Account &amp; Billing
          </div>
          <Link
            href="/dashboard/settings"
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13.5px] font-medium transition-colors ${
              pathname === "/dashboard/settings"
                ? "bg-indigo-wash text-indigo font-semibold"
                : "text-ink-2 hover:bg-raise hover:text-ink"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Plan &amp; Settings
          </Link>
        </nav>

        {/* Plan Usage Card */}
        <div className="mt-auto pt-4 border-t border-line">
          <div className="bg-card border border-line rounded-xl p-3.5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] font-bold text-ink capitalize">
                {plan} Tier
              </span>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                plan === "free"
                  ? "bg-raise text-ink-3"
                  : "bg-indigo-wash text-indigo"
              }`}>
                {plan === "free" ? "Free" : "Active"}
              </span>
            </div>
            <div className="text-[11px] text-ink-3 mb-2.5">
              {plan === "business"
                ? "Unlimited meetings"
                : `${meetingsUsed} of ${meetingsLimit} meetings used`}
            </div>
            {/* Progress bar */}
            {plan !== "business" && (
              <div className="w-full h-1.5 bg-raise rounded-full mb-3 overflow-hidden">
                <div
                  className="h-1.5 bg-indigo rounded-full transition-all duration-500"
                  style={{ width: `${usagePercent}%` }}
                />
              </div>
            )}
            {plan === "free" ? (
              <button
                onClick={() => openUpgradeModal("pro")}
                className="w-full text-center py-2 rounded-lg bg-indigo text-white text-[11.5px] font-semibold hover:opacity-90 active:scale-[0.99] transition-all shadow-sm flex items-center justify-center gap-1.5"
              >
                <span>Upgrade to Pro</span>
                <span className="text-white/80 text-[10px] font-mono">$9.99</span>
              </button>
            ) : (
              <Link
                href="/dashboard/settings"
                className="block w-full text-center py-1.5 rounded-lg border border-line text-ink-2 hover:text-ink text-[11px] font-medium transition-colors"
              >
                Manage Subscription
              </Link>
            )}
          </div>

          {/* User Profile & Sign Out */}
          <div className="mt-3 pt-3 border-t border-line flex items-center justify-between gap-2 px-1">
            <div className="flex items-center gap-2.5 min-w-0">
              {session?.user?.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  className="w-8 h-8 rounded-full border border-line object-cover flex-shrink-0"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-indigo-wash text-indigo font-bold flex items-center justify-center text-xs flex-shrink-0">
                  {session?.user?.name?.charAt(0) || "U"}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="text-[12px] font-semibold text-ink truncate leading-tight">
                  {session?.user?.name || "Scripra User"}
                </p>
                <p className="text-[10px] text-ink-3 truncate leading-tight font-mono">
                  {session?.user?.email || ""}
                </p>
              </div>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              title="Sign out"
              className="p-1.5 rounded-lg text-ink-3 hover:text-ink hover:bg-raise transition-colors flex-shrink-0"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0 flex flex-col">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between px-5 py-3.5 bg-panel border-b border-line sticky top-0 z-40">
          <Logo showTagline={false} />
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/dashboard/conversations"
              className="p-2 rounded-lg text-ink-2 hover:bg-raise border border-line text-xs font-semibold"
              title="Conversations"
            >
              💬
            </Link>
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}
