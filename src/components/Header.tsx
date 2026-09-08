"use client";
import Link from "next/link";
import Logo from "./Logo";
import { useState } from "react";
import { motion } from "framer-motion";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes custom-glow {
          0% { box-shadow: 0 0 10px rgba(123,124,255,0.4); }
          50% { box-shadow: 0 0 25px rgba(123,124,255,0.9); }
          100% { box-shadow: 0 0 10px rgba(123,124,255,0.4); }
        }
        @keyframes custom-shimmer {
          0% { transform: translateX(-150%); }
          100% { transform: translateX(150%); }
        }
        .animate-custom-glow {
          animation: custom-glow 2s infinite alternate ease-in-out;
        }
        .animate-custom-shimmer {
          animation: custom-shimmer 2.5s infinite linear;
        }
      `}} />
      
      <div className="flex items-center p-1.5 bg-canvas/80 backdrop-blur-2xl border border-line rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
        
        {/* Logo */}
        <div className="pl-3.5 pr-2 flex items-center">
          <Logo />
        </div>
        
        {/* Navigation */}
        <nav className="hidden lg:flex items-center relative z-10">
          
          {/* Product */}
          <div 
            className="relative group"
            onMouseEnter={() => setHoveredTab("Product")}
            onMouseLeave={() => setHoveredTab(null)}
          >
            {hoveredTab === "Product" && (
              <motion.div layoutId="nav-pill" className="absolute inset-0 bg-indigo/10 rounded-full z-0" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
            )}
            <button className="relative z-10 px-4 py-2 text-[13.5px] font-medium text-ink-2 group-hover:text-indigo transition-colors flex items-center gap-1.5">
              Product
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 group-hover:rotate-180 transition-transform"><path d="M6 9l6 6 6-6"/></svg>
            </button>
            {/* Dropdown */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all z-50">
              <div className="w-[520px] bg-panel border border-line rounded-2xl shadow-2xl p-6 grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-4">
                  <div className="text-[11px] font-bold tracking-[0.15em] uppercase text-indigo">Specialized Products</div>
                  <div className="flex flex-col gap-3">
                    <Link href="/product" className="group/item block">
                      <div className="text-[13.5px] font-semibold text-ink group-hover/item:text-teal transition-colors flex items-center gap-1.5">
                        <span>🌐</span> Scripra Global
                      </div>
                      <div className="text-[11px] text-ink-3">Live translation &amp; code-switching.</div>
                    </Link>
                    <Link href="/product" className="group/item block">
                      <div className="text-[13.5px] font-semibold text-ink group-hover/item:text-amber-deep transition-colors flex items-center gap-1.5">
                        <span>⚡</span> Scripra DealCloser
                      </div>
                      <div className="text-[11px] text-ink-3">Sub-300ms live sales whisper AI.</div>
                    </Link>
                    <Link href="/product" className="group/item block">
                      <div className="text-[13.5px] font-semibold text-ink group-hover/item:text-rose transition-colors flex items-center gap-1.5">
                        <span>🔄</span> Omnichannel Mesh
                      </div>
                      <div className="text-[11px] text-ink-3">Teams, Zoom, Meet, Slack, Discord.</div>
                    </Link>
                  </div>
                </div>
                <div className="flex flex-col gap-4 border-l border-line/60 pl-6">
                  <div className="text-[11px] font-bold tracking-[0.15em] uppercase text-indigo">Platform Engine</div>
                  <div className="flex flex-col gap-3">
                    <Link href="/#mom" className="group/item block">
                      <div className="text-[13.5px] font-semibold text-ink group-hover/item:text-indigo transition-colors flex items-center gap-1.5">
                        <span>📑</span> Minutes of Meeting
                      </div>
                      <div className="text-[11px] text-ink-3">Executive MoM &amp; action extraction.</div>
                    </Link>
                    <Link href="/product" className="group/item block">
                      <div className="text-[13.5px] font-semibold text-ink group-hover/item:text-indigo transition-colors flex items-center gap-1.5">
                        <span>🧠</span> Memory Graph
                      </div>
                      <div className="text-[11px] text-ink-3">Cross-meeting semantic intelligence.</div>
                    </Link>
                    <Link href="/security" className="group/item block">
                      <div className="text-[13.5px] font-semibold text-ink group-hover/item:text-teal transition-colors flex items-center gap-1.5">
                        <span>🔒</span> Security &amp; Compliance
                      </div>
                      <div className="text-[11px] text-ink-3">Zero data retention in RAM.</div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* How it works */}
          <div 
            className="relative group"
            onMouseEnter={() => setHoveredTab("How it works")}
            onMouseLeave={() => setHoveredTab(null)}
          >
            {hoveredTab === "How it works" && (
              <motion.div layoutId="nav-pill" className="absolute inset-0 bg-indigo/10 rounded-full z-0" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
            )}
            <Link href="/how-it-works" className="relative z-10 px-4 py-2 text-[13.5px] font-medium text-ink-2 group-hover:text-indigo transition-colors block">
              How it works
            </Link>
          </div>

          {/* Solutions */}
          <div 
            className="relative group"
            onMouseEnter={() => setHoveredTab("Solutions")}
            onMouseLeave={() => setHoveredTab(null)}
          >
            {hoveredTab === "Solutions" && (
              <motion.div layoutId="nav-pill" className="absolute inset-0 bg-indigo/10 rounded-full z-0" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
            )}
            <button className="relative z-10 px-4 py-2 text-[13.5px] font-medium text-ink-2 group-hover:text-indigo transition-colors flex items-center gap-1.5">
              Solutions
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 group-hover:rotate-180 transition-transform"><path d="M6 9l6 6 6-6"/></svg>
            </button>
            {/* Dropdown */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all z-50">
              <div className="w-[420px] bg-panel border border-line rounded-xl shadow-2xl p-6 grid grid-cols-2 gap-8">
                <div className="flex flex-col gap-4">
                  <div className="text-[11px] font-bold tracking-[0.15em] uppercase text-indigo">Use Cases</div>
                  <Link href="#mom" className="text-[13.5px] font-semibold text-ink hover:text-indigo transition-colors">Engineering Sprints</Link>
                  <Link href="#mom" className="text-[13.5px] font-semibold text-ink hover:text-indigo transition-colors">Executive Leadership</Link>
                  <Link href="#mom" className="text-[13.5px] font-semibold text-ink hover:text-indigo transition-colors">Customer &amp; Sales</Link>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="text-[11px] font-bold tracking-[0.15em] uppercase text-indigo">Workflows</div>
                  <Link href="#capture" className="text-[13.5px] font-semibold text-ink hover:text-indigo transition-colors">Bot-Free Capture</Link>
                  <Link href="#memory" className="text-[13.5px] font-semibold text-ink hover:text-indigo transition-colors">Long-Term Memory</Link>
                  <Link href="#security" className="text-[13.5px] font-semibold text-ink hover:text-indigo transition-colors">Enterprise Security</Link>
                </div>
              </div>
            </div>
          </div>

          {/* Integrations */}
          <div 
            className="relative group"
            onMouseEnter={() => setHoveredTab("Integrations")}
            onMouseLeave={() => setHoveredTab(null)}
          >
            {hoveredTab === "Integrations" && (
              <motion.div layoutId="nav-pill" className="absolute inset-0 bg-indigo/10 rounded-full z-0" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
            )}
            <button className="relative z-10 px-4 py-2 text-[13.5px] font-medium text-ink-2 group-hover:text-indigo transition-colors flex items-center gap-1.5">
              Integrations
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 group-hover:rotate-180 transition-transform"><path d="M6 9l6 6 6-6"/></svg>
            </button>
            {/* Dropdown */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all z-50">
              <div className="w-[440px] bg-panel border border-line rounded-xl shadow-2xl p-6 grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2.5">
                    <div className="text-[11px] font-bold tracking-[0.15em] uppercase text-teal flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal" />
                      Supported Live
                    </div>
                    <div className="text-[13px] text-ink font-medium flex justify-between items-center">
                      <span>MS Teams</span>
                      <span className="text-[10px] bg-teal-wash text-teal font-bold px-1.5 py-0.5 rounded border border-teal/20">Live</span>
                    </div>
                    <div className="text-[13px] text-ink font-medium flex justify-between items-center">
                      <span>Cisco Webex</span>
                      <span className="text-[10px] bg-teal-wash text-teal font-bold px-1.5 py-0.5 rounded border border-teal/20">Live</span>
                    </div>
                    <div className="text-[13px] text-ink font-medium flex justify-between items-center">
                      <span>Zoom</span>
                      <span className="text-[10px] bg-teal-wash text-teal font-bold px-1.5 py-0.5 rounded border border-teal/20">Live</span>
                    </div>
                    <div className="text-[13px] text-ink font-medium flex justify-between items-center">
                      <span>Google Meet</span>
                      <span className="text-[10px] bg-teal-wash text-teal font-bold px-1.5 py-0.5 rounded border border-teal/20">Live</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-4 border-l border-line/60 pl-6">
                  <div className="flex flex-col gap-2.5">
                    <div className="text-[11px] font-bold tracking-[0.15em] uppercase text-amber flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse" />
                      In-Progress
                    </div>
                    <div className="text-[13px] text-ink font-medium flex justify-between items-center">
                      <span>Slack</span>
                      <span className="text-[10px] bg-amber-wash text-amber-deep font-bold px-1.5 py-0.5 rounded border border-amber/25">Building</span>
                    </div>
                    <div className="text-[13px] text-ink font-medium flex justify-between items-center">
                      <span>Discord</span>
                      <span className="text-[10px] bg-amber-wash text-amber-deep font-bold px-1.5 py-0.5 rounded border border-amber/25">Building</span>
                    </div>
                    <div className="text-[13px] text-ink font-medium flex justify-between items-center">
                      <span>Jira &amp; Linear</span>
                      <span className="text-[10px] bg-raise px-1.5 py-0.5 rounded text-ink-3">Next</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Security */}
          <div 
            className="relative group"
            onMouseEnter={() => setHoveredTab("Security")}
            onMouseLeave={() => setHoveredTab(null)}
          >
            {hoveredTab === "Security" && (
              <motion.div layoutId="nav-pill" className="absolute inset-0 bg-indigo/10 rounded-full z-0" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
            )}
            <Link href="/security" className="relative z-10 px-4 py-2 text-[13.5px] font-medium text-ink-2 group-hover:text-indigo transition-colors block">
              Security
            </Link>
          </div>
          
          {/* Pricing */}
          <div 
            className="relative group"
            onMouseEnter={() => setHoveredTab("Pricing")}
            onMouseLeave={() => setHoveredTab(null)}
          >
            {hoveredTab === "Pricing" && (
              <motion.div layoutId="nav-pill" className="absolute inset-0 bg-indigo/10 rounded-full z-0" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
            )}
            <Link href="/pricing" className="relative z-10 px-4 py-2 text-[13.5px] font-medium text-ink-2 group-hover:text-indigo transition-colors block">
              Pricing
            </Link>
          </div>

          {/* Investors */}
          <div 
            className="relative group"
            onMouseEnter={() => setHoveredTab("Investors")}
            onMouseLeave={() => setHoveredTab(null)}
          >
            {hoveredTab === "Investors" && (
              <motion.div layoutId="nav-pill" className="absolute inset-0 bg-indigo/10 rounded-full z-0" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
            )}
            <Link href="/investors" className="relative z-10 px-4 py-2 text-[13.5px] font-medium text-ink-2 group-hover:text-indigo transition-colors block">
              Investors
            </Link>
          </div>

          {/* Dashboard */}
          <div 
            className="relative group"
            onMouseEnter={() => setHoveredTab("Dashboard")}
            onMouseLeave={() => setHoveredTab(null)}
          >
            {hoveredTab === "Dashboard" && (
              <motion.div layoutId="nav-pill" className="absolute inset-0 bg-indigo/10 rounded-full z-0" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
            )}
            <Link href="/dashboard" className="relative z-10 px-4 py-2 text-[13.5px] font-medium text-indigo font-semibold hover:opacity-90 transition-colors block">
              Dashboard
            </Link>
          </div>
        </nav>

        {/* CTA Actions */}
        <div className="flex items-center gap-2 pl-4 pr-1 border-l border-line/50 ml-2">
          <Link
            href="/dashboard"
            className="hidden md:inline-flex items-center gap-1.5 text-[12.5px] font-semibold px-3 py-1.5 rounded-full bg-indigo-wash text-indigo hover:bg-indigo hover:text-white transition-all"
          >
            <span>App</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
          {session ? (
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 mr-2">
                <span className="text-[13px] font-medium text-ink-2">
                  {session.user?.name}
                </span>
                {session.user?.image && (
                  <img src={session.user.image} alt="Profile" className="w-8 h-8 rounded-full border border-line shadow-sm" />
                )}
              </div>
              <button 
                onClick={() => signOut()}
                className="hidden md:inline-flex relative items-center justify-center text-[13px] font-semibold px-4 py-1.5 rounded-full border border-line bg-panel text-ink hover:text-indigo transition-colors shadow-sm"
              >
                Sign out
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => signIn("google")}
                className="text-[13.5px] font-semibold text-ink hover:text-indigo transition-colors px-3 py-2"
              >
                Log in
              </button>
              <button
                onClick={() => signIn("google")}
                className="inline-flex relative items-center justify-center text-[13.5px] font-semibold px-5 py-2 rounded-xl bg-indigo text-white hover:bg-indigo-deep transition-all shadow-sm active:scale-[0.99]"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
