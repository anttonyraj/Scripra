"use client";
import Link from "next/link";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-canvas/90 backdrop-blur-md border-b border-line">
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
        .nav-link {
          transition: all 0.3s ease;
        }
        .nav-link:hover {
          color: var(--indigo);
          text-shadow: 0 0 12px rgba(123,124,255,0.6);
        }
      `}} />
      <div className="max-w-[1080px] mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Logo />
          
          <nav className="hidden lg:flex items-center gap-8">
            {/* Product Dropdown */}
            <div className="relative group py-8">
              <button className="nav-link text-[14px] font-medium text-ink-2 group-hover:text-indigo transition-colors flex items-center gap-1.5">
                Product
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 group-hover:rotate-180 transition-transform">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>
              
              <div className="absolute top-[80px] left-0 w-[500px] bg-panel border border-line rounded-xl shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all p-6 grid grid-cols-2 gap-8 z-50">
                <div className="col-span-2 text-[11px] font-bold uppercase tracking-wider text-ink-3 pb-2 border-b border-line">
                  One platform. Multiple capabilities.
                </div>
                <div className="flex flex-col gap-6">
                  <div className="text-[11px] font-bold tracking-[0.15em] uppercase text-indigo">Core</div>
                  <div className="flex flex-col gap-5">
                    <div className="group/item">
                      <div className="text-[14px] font-semibold text-ink group-hover/item:text-indigo transition-colors mb-1">Capture</div>
                      <div className="text-[12px] text-ink-3">Record or import any conversation.</div>
                    </div>
                    <div className="group/item">
                      <div className="text-[14px] font-semibold text-ink group-hover/item:text-indigo transition-colors mb-1">Recap</div>
                      <div className="text-[12px] text-ink-3">Summaries, MoM, key points and decisions.</div>
                    </div>
                    <div className="group/item">
                      <div className="text-[14px] font-semibold text-ink group-hover/item:text-indigo transition-colors mb-1">Actions</div>
                      <div className="text-[12px] text-ink-3">Owners, due dates, commitments and follow-ups.</div>
                    </div>
                    <div className="group/item">
                      <div className="text-[14px] font-semibold text-ink group-hover/item:text-indigo transition-colors mb-1">Recall</div>
                      <div className="text-[12px] text-ink-3">Search and ask across conversations.</div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-6">
                  <div className="text-[11px] font-bold tracking-[0.15em] uppercase text-indigo">Intelligence</div>
                  <div className="flex flex-col gap-5">
                    <div className="group/item">
                      <div className="text-[14px] font-semibold text-ink group-hover/item:text-indigo transition-colors mb-1">Memory</div>
                      <div className="text-[12px] text-ink-3">Context that grows across conversations.</div>
                    </div>
                    <div className="group/item">
                      <div className="text-[14px] font-semibold text-ink group-hover/item:text-indigo transition-colors mb-1">Graph</div>
                      <div className="text-[12px] text-ink-3">Connect people, projects, topics and decisions.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Link href="/how-it-works" className="nav-link text-[14px] font-medium text-ink-2 hover:text-indigo transition-colors">
              How it works
            </Link>

            {/* Solutions Dropdown */}
            <div className="relative group py-8">
              <button className="nav-link text-[14px] font-medium text-ink-2 group-hover:text-indigo transition-colors flex items-center gap-1.5">
                Solutions
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 group-hover:rotate-180 transition-transform">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>
              
              <div className="absolute top-[80px] left-0 w-[400px] bg-panel border border-line rounded-xl shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all p-6 grid grid-cols-2 gap-8 z-50">
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

            {/* Integrations Dropdown */}
            <div className="relative group py-8">
              <button className="nav-link text-[14px] font-medium text-ink-2 group-hover:text-indigo transition-colors flex items-center gap-1.5">
                Integrations
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 group-hover:rotate-180 transition-transform">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>
              
              <div className="absolute top-[80px] left-0 w-[400px] bg-panel border border-line rounded-xl shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all p-6 grid grid-cols-2 gap-8 z-50">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-3">
                    <div className="text-[11px] font-bold tracking-[0.15em] uppercase text-indigo">Meeting</div>
                    <div className="text-[13px] text-ink flex justify-between">Zoom <span className="text-[10px] bg-raise px-1.5 py-0.5 rounded text-ink-3">Soon</span></div>
                    <div className="text-[13px] text-ink flex justify-between">Google Meet <span className="text-[10px] bg-raise px-1.5 py-0.5 rounded text-ink-3">Soon</span></div>
                    <div className="text-[13px] text-ink flex justify-between">Teams <span className="text-[10px] bg-raise px-1.5 py-0.5 rounded text-ink-3">Soon</span></div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="text-[11px] font-bold tracking-[0.15em] uppercase text-indigo">Calendar</div>
                    <div className="text-[13px] text-ink flex justify-between">Google Calendar <span className="text-[10px] bg-raise px-1.5 py-0.5 rounded text-ink-3">Soon</span></div>
                    <div className="text-[13px] text-ink flex justify-between">Outlook <span className="text-[10px] bg-raise px-1.5 py-0.5 rounded text-ink-3">Soon</span></div>
                  </div>
                </div>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-3">
                    <div className="text-[11px] font-bold tracking-[0.15em] uppercase text-indigo">Work</div>
                    <div className="text-[13px] text-ink flex justify-between">Slack <span className="text-[10px] bg-raise px-1.5 py-0.5 rounded text-ink-3">Soon</span></div>
                    <div className="text-[13px] text-ink flex justify-between">Jira <span className="text-[10px] bg-raise px-1.5 py-0.5 rounded text-ink-3">Soon</span></div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="text-[11px] font-bold tracking-[0.15em] uppercase text-indigo">CRM</div>
                    <div className="text-[13px] text-ink flex justify-between">Salesforce <span className="text-[10px] bg-raise px-1.5 py-0.5 rounded text-ink-3">Soon</span></div>
                    <div className="text-[13px] text-ink flex justify-between">HubSpot <span className="text-[10px] bg-raise px-1.5 py-0.5 rounded text-ink-3">Soon</span></div>
                  </div>
                </div>
              </div>
            </div>

            <Link href="/security" className="nav-link text-[14px] font-medium text-ink-2 hover:text-indigo transition-colors">
              Security
            </Link>
            <Link href="/pricing" className="nav-link text-[14px] font-medium text-ink-2 hover:text-indigo transition-colors">
              Pricing
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/login" className="hidden md:block text-[14px] font-semibold text-ink hover:text-indigo transition-colors">
            Sign in
          </Link>
          <Link
            href="/signup"
            className="hidden md:inline-flex relative items-center justify-center text-[13.5px] font-semibold px-[20px] py-[10px] rounded-[8px] bg-indigo text-white transition-all shadow-sm group overflow-hidden"
          >
            <span className="relative z-10">Try it free</span>
            {/* Continuous glossy sheen animation */}
            <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/30 to-transparent animate-custom-shimmer" />
            {/* Continuous glowing shadow */}
            <div className="absolute inset-0 rounded-[8px] animate-custom-glow pointer-events-none" />
          </Link>
        </div>
      </div>
    </header>
  );
}
