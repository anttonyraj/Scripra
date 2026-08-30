"use client";
import Link from "next/link";
import Logo from "./Logo";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Header() {
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
        <div className="pl-4 pr-2 scale-90 origin-left flex items-center">
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
              <div className="w-[500px] bg-panel border border-line rounded-xl shadow-2xl p-6 grid grid-cols-2 gap-8">
                <div className="col-span-2 text-[11px] font-bold uppercase tracking-wider text-ink-3 pb-2 border-b border-line">One platform. Multiple capabilities.</div>
                <div className="flex flex-col gap-6">
                  <div className="text-[11px] font-bold tracking-[0.15em] uppercase text-indigo">Core</div>
                  <div className="flex flex-col gap-5">
                    <div className="group/item"><div className="text-[14px] font-semibold text-ink group-hover/item:text-indigo transition-colors mb-1">Capture</div><div className="text-[12px] text-ink-3">Record or import any conversation.</div></div>
                    <div className="group/item"><div className="text-[14px] font-semibold text-ink group-hover/item:text-indigo transition-colors mb-1">Recap</div><div className="text-[12px] text-ink-3">Summaries, MoM, key points and decisions.</div></div>
                    <div className="group/item"><div className="text-[14px] font-semibold text-ink group-hover/item:text-indigo transition-colors mb-1">Actions</div><div className="text-[12px] text-ink-3">Owners, due dates, commitments and follow-ups.</div></div>
                    <div className="group/item"><div className="text-[14px] font-semibold text-ink group-hover/item:text-indigo transition-colors mb-1">Recall</div><div className="text-[12px] text-ink-3">Search and ask across conversations.</div></div>
                  </div>
                </div>
                <div className="flex flex-col gap-6">
                  <div className="text-[11px] font-bold tracking-[0.15em] uppercase text-indigo">Intelligence</div>
                  <div className="flex flex-col gap-5">
                    <div className="group/item"><div className="text-[14px] font-semibold text-ink group-hover/item:text-indigo transition-colors mb-1">Memory</div><div className="text-[12px] text-ink-3">Context that grows across conversations.</div></div>
                    <div className="group/item"><div className="text-[14px] font-semibold text-ink group-hover/item:text-indigo transition-colors mb-1">Graph</div><div className="text-[12px] text-ink-3">Connect people, projects, topics and decisions.</div></div>
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
              <div className="w-[400px] bg-panel border border-line rounded-xl shadow-2xl p-6 grid grid-cols-2 gap-8">
                <div className="flex flex-col gap-5">
                  <Link href="#solutions" className="text-[14px] font-semibold text-ink hover:text-indigo transition-colors">Individuals</Link>
                  <Link href="#solutions" className="text-[14px] font-semibold text-ink hover:text-indigo transition-colors">Meetings</Link>
                  <Link href="#solutions" className="text-[14px] font-semibold text-ink hover:text-indigo transition-colors">Students</Link>
                </div>
                <div className="flex flex-col gap-5">
                  <Link href="#solutions" className="text-[14px] font-semibold text-ink hover:text-indigo transition-colors">Teams</Link>
                  <Link href="#solutions" className="text-[14px] font-semibold text-ink hover:text-indigo transition-colors">Sales & Customer</Link>
                  <Link href="#solutions" className="text-[14px] font-semibold text-ink hover:text-indigo transition-colors">Engineering & Product</Link>
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
              <div className="w-[400px] bg-panel border border-line rounded-xl shadow-2xl p-6 grid grid-cols-2 gap-8">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-3">
                    <div className="text-[11px] font-bold tracking-[0.15em] uppercase text-indigo">Meeting</div>
                    <div className="text-[13px] text-ink flex justify-between">Zoom <span className="text-[10px] bg-raise px-1.5 py-0.5 rounded text-ink-3">Soon</span></div>
                    <div className="text-[13px] text-ink flex justify-between">Google Meet <span className="text-[10px] bg-raise px-1.5 py-0.5 rounded text-ink-3">Soon</span></div>
                    <div className="text-[13px] text-ink flex justify-between">Teams <span className="text-[10px] bg-raise px-1.5 py-0.5 rounded text-ink-3">Soon</span></div>
                  </div>
                </div>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-3">
                    <div className="text-[11px] font-bold tracking-[0.15em] uppercase text-indigo">Work</div>
                    <div className="text-[13px] text-ink flex justify-between">Slack <span className="text-[10px] bg-raise px-1.5 py-0.5 rounded text-ink-3">Soon</span></div>
                    <div className="text-[13px] text-ink flex justify-between">Jira <span className="text-[10px] bg-raise px-1.5 py-0.5 rounded text-ink-3">Soon</span></div>
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
        </nav>

        {/* CTA Actions */}
        <div className="flex items-center gap-1 pl-4 pr-1 border-l border-line/50 ml-2">
          <Link href="/login" className="hidden md:block text-[13.5px] font-semibold text-ink hover:text-indigo transition-colors px-3 py-2">
            Sign in
          </Link>
          <Link
            href="/signup"
            className="hidden md:inline-flex relative items-center justify-center text-[13px] font-semibold px-5 py-2 rounded-full bg-indigo text-white transition-all shadow-sm group overflow-hidden"
          >
            <span className="relative z-10">Try it free</span>
            {/* Continuous glossy sheen animation */}
            <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/30 to-transparent animate-custom-shimmer" />
            {/* Continuous glowing shadow */}
            <div className="absolute inset-0 rounded-full animate-custom-glow pointer-events-none" />
          </Link>
        </div>
      </div>
    </header>
  );
}
