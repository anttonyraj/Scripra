"use client";
import { useState, useEffect } from "react";

export default function SolutionsSection() {
  const [activeTab, setActiveTab] = useState(0);

  const solutions = [
    {
      id: 0,
      title: "Personal productivity",
      desc: "Capture voice notes, ideas, reminders, and personal meetings. Turn unstructured thoughts into searchable memory.",
      tag: "VOICE_NOTE",
      diagram: {
        input: "Walking Idea Memo",
        output1: { label: "IDEA", text: "Bottom tab bar navigation", color: "indigo" },
        output2: { label: "REMINDER", text: "Follow up with designer", color: "teal" }
      }
    },
    {
      id: 1,
      title: "Meetings",
      desc: "Generate perfect recaps, Minutes of Meeting (MoM), extract decisions, and track action items automatically.",
      tag: "MINUTES_OF_MEETING",
      diagram: {
        input: "Weekly Product Sync",
        output1: { label: "DECISION", text: "Launch delayed to Q3", color: "indigo" },
        output2: { label: "ACTION", text: "Sarah to update roadmap", color: "amber" }
      }
    },
    {
      id: 2,
      title: "Education",
      desc: "Turn lectures and study sessions into transcripts, summaries, core concepts, and long-term study memory.",
      tag: "LECTURE_NOTES",
      diagram: {
        input: "CS101: Gradient Descent",
        output1: { label: "CONCEPT", text: "Formula: w = w - α * ∇J", color: "teal" },
        output2: { label: "FLASHCARD", text: "Tune learning rate α", color: "indigo" }
      }
    },
    {
      id: 3,
      title: "Customer conversations",
      desc: "Track customer needs, objections, commitments, and follow-ups across the entire sales cycle.",
      tag: "SALES_CALL",
      diagram: {
        input: "Enterprise Discovery Call",
        output1: { label: "OBJECTION", text: "Pricing too high for startup", color: "rose" },
        output2: { label: "FOLLOW UP", text: "Send custom discount", color: "amber" }
      }
    },
    {
      id: 4,
      title: "Engineering & product",
      desc: "Capture technical discussions, architecture decisions, recurring blockers, and feature requests.",
      tag: "TECH_SPEC",
      diagram: {
        input: "Architecture Review",
        output1: { label: "DECISION", text: "Use PostgreSQL over Mongo", color: "indigo" },
        output2: { label: "BLOCKER", text: "Need DevOps DB access", color: "rose" }
      }
    },
    {
      id: 5,
      title: "Leadership",
      desc: "Align the organization by tracking high-level decisions, commitments, and surfacing recurring risks.",
      tag: "BOARD_MEETING",
      diagram: {
        input: "Q2 Strategy Planning",
        output1: { label: "TARGET", text: "Increase ARR by 15%", color: "teal" },
        output2: { label: "RISK", text: "Enterprise churn rising", color: "rose" }
      }
    }
  ];

  // Auto-cycle tabs
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % solutions.length);
    }, 4500); // cycle every 4.5 seconds
    return () => clearInterval(timer);
  }, []);

  const getColors = (colorName: string) => {
    switch (colorName) {
      case 'indigo': return { border: 'border-indigo/30', text: 'text-indigo', bg: 'bg-white', dot: 'bg-indigo' };
      case 'teal': return { border: 'border-teal-500/30', text: 'text-teal-600', bg: 'bg-white', dot: 'bg-teal-500' };
      case 'amber': return { border: 'border-amber-500/30', text: 'text-amber-600', bg: 'bg-white', dot: 'bg-amber-500' };
      case 'rose': return { border: 'border-rose-500/30', text: 'text-rose-600', bg: 'bg-white', dot: 'bg-rose-500' };
      default: return { border: 'border-line', text: 'text-ink', bg: 'bg-white', dot: 'bg-line-hi' };
    }
  };

  const getGradient = (colorName: string) => {
    switch (colorName) {
      case 'teal': return "url(#grad-teal)";
      case 'amber': return "url(#grad-amber)";
      case 'rose': return "url(#grad-rose)";
      default: return "url(#grad-indigo)";
    }
  };

  const activeSolution = solutions[activeTab];
  const c1 = getColors(activeSolution.diagram.output1.color);
  const c2 = getColors(activeSolution.diagram.output2.color);

  return (
    <section id="solutions" className="py-32 px-6 bg-canvas border-t border-line overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-20 flex flex-col items-center">
          <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-indigo mb-6 bg-indigo-wash border border-indigo/20 px-3 py-1 rounded-full w-max">
            Built For
          </div>
          <h2 className="text-[clamp(40px,6vw,64px)] font-bold tracking-[-0.03em] leading-[1.25] mb-8 text-[#2D2482]">
            <span className="bg-[#E5E5FC] px-3 py-1 inline-block -mx-3 mb-2">Scripra fits the</span><br />
            <span className="bg-[#E5E5FC] px-3 py-1 inline-block -mx-3">conversation.</span>
          </h2>
          <p className="text-[18px] text-[#6A63E0] max-w-[600px] mx-auto">
            From quick ideas to executive board meetings, Scripra adapts to how you and your team work.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Side: Interactive List */}
          <div className="lg:col-span-5 flex flex-col gap-2 relative z-20">
            {solutions.map((sol) => {
              const isActive = activeTab === sol.id;
              return (
                <button
                  key={sol.id}
                  onClick={() => setActiveTab(sol.id)}
                  className={`text-left p-5 rounded-2xl transition-all duration-300 border ${
                    isActive 
                      ? "bg-white border-indigo/20 shadow-md transform scale-[1.02]" 
                      : "bg-transparent border-transparent hover:bg-panel"
                  }`}
                >
                  <h3 className={`text-[17px] font-bold mb-1 transition-colors ${isActive ? "text-[#4F46E5]" : "text-[#2D2482]"}`}>
                    {sol.title}
                  </h3>
                  <p className={`text-[14px] leading-relaxed transition-colors ${isActive ? "text-[#6A63E0]" : "text-[#818CF8]"}`}>
                    {sol.desc}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Side: Animated SVG Diagram */}
          <div className="lg:col-span-7 relative z-10 w-full rounded-[32px] bg-white border border-line p-2 md:p-6 shadow-sm overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(91,92,240,0.03)_0%,transparent_100%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg0MHY0MEgwVjB6bTM5IDM5VjFoLTM4djM4aDM4eiIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIwLjA0IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none opacity-50" />
            
            {/* Top Tag */}
            <div className="absolute top-6 left-6 z-30">
              <span className="bg-indigo-wash text-[#4F46E5] px-3 py-1.5 rounded-md text-[10px] font-bold tracking-wider uppercase border border-indigo/20 shadow-sm transition-all duration-300">
                {activeSolution.tag}
              </span>
            </div>

            {/* Diagram Container: Fixed Aspect Ratio for exact coordinate mapping */}
            <div className="w-full aspect-[4/3] relative" key={`diagram-${activeTab}`}>
              {/* The SVG Layer */}
              <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <linearGradient id="grad-indigo" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(79,70,229,0)" />
                    <stop offset="50%" stopColor="rgba(79,70,229,0.5)" />
                    <stop offset="100%" stopColor="rgba(79,70,229,1)" />
                  </linearGradient>
                  <linearGradient id="grad-teal" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(20,184,166,0)" />
                    <stop offset="50%" stopColor="rgba(20,184,166,0.5)" />
                    <stop offset="100%" stopColor="rgba(20,184,166,1)" />
                  </linearGradient>
                  <linearGradient id="grad-amber" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(245,158,11,0)" />
                    <stop offset="50%" stopColor="rgba(245,158,11,0.5)" />
                    <stop offset="100%" stopColor="rgba(245,158,11,1)" />
                  </linearGradient>
                  <linearGradient id="grad-rose" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(244,63,94,0)" />
                    <stop offset="50%" stopColor="rgba(244,63,94,0.5)" />
                    <stop offset="100%" stopColor="rgba(244,63,94,1)" />
                  </linearGradient>
                </defs>
                
                {/* Flow lines with animation */}
                {/* Input -> Brain */}
                <path d="M 180 300 L 400 300" fill="none" stroke="url(#grad-indigo)" strokeWidth="3" strokeDasharray="6 6" className="animate-[dash_2s_linear_infinite]" />
                
                {/* Brain -> Top Output */}
                <path d="M 400 300 C 500 300, 500 150, 620 150" fill="none" stroke={getGradient(activeSolution.diagram.output1.color)} strokeWidth="3" strokeDasharray="6 6" className="animate-[dash_2s_linear_infinite]" />
                
                {/* Brain -> Bottom Output */}
                <path d="M 400 300 C 500 300, 500 450, 620 450" fill="none" stroke={getGradient(activeSolution.diagram.output2.color)} strokeWidth="3" strokeDasharray="6 6" className="animate-[dash_2s_linear_infinite]" />
              </svg>

              {/* Input Node (Left) */}
              <div className="absolute z-10 w-[30%] max-w-[200px]" style={{ left: '22.5%', top: '50%', transform: 'translate(-50%, -50%)' }}>
                <div className="bg-white border border-line rounded-xl p-3 md:p-4 shadow-sm flex flex-col items-center text-center animate-[fade-in-up_0.4s_ease-out_forwards]">
                  <div className="w-8 h-8 rounded-full bg-indigo-wash border border-indigo/10 flex items-center justify-center mb-3">
                    <svg className="w-4 h-4 text-[#4F46E5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
                  </div>
                  <span className="text-[12px] md:text-[14px] font-bold text-[#2D2482] leading-tight">{activeSolution.diagram.input}</span>
                </div>
              </div>

              {/* Scripra Brain (Center) */}
              <div className="absolute z-10" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
                <div className="w-14 h-14 bg-[#4F46E5] rounded-2xl shadow-[0_0_30px_rgba(79,70,229,0.4)] flex items-center justify-center relative overflow-hidden group hover:scale-110 transition-transform">
                  <div className="absolute inset-0 bg-white/20 blur-xl scale-150 rotate-45 transition-transform duration-3000" />
                  <svg className="w-7 h-7 text-white relative z-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>
                </div>
              </div>

              {/* Output Node 1 (Top Right) */}
              <div className="absolute z-10 w-[35%] max-w-[240px]" style={{ left: '77.5%', top: '25%', transform: 'translate(-50%, -50%)' }}>
                <div className={`bg-white border ${c1.border} rounded-xl p-3 md:p-4 shadow-sm animate-[fade-in-up_0.5s_ease-out_forwards] delay-100`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`w-2 h-2 rounded-full ${c1.dot}`} />
                    <span className={`text-[9px] md:text-[11px] font-bold tracking-widest uppercase ${c1.text}`}>{activeSolution.diagram.output1.label}</span>
                  </div>
                  <span className="text-[12px] md:text-[14px] font-bold text-[#2D2482] leading-snug">{activeSolution.diagram.output1.text}</span>
                </div>
              </div>

              {/* Output Node 2 (Bottom Right) */}
              <div className="absolute z-10 w-[35%] max-w-[240px]" style={{ left: '77.5%', top: '75%', transform: 'translate(-50%, -50%)' }}>
                <div className={`bg-white border ${c2.border} rounded-xl p-3 md:p-4 shadow-sm animate-[fade-in-up_0.6s_ease-out_forwards] delay-200`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`w-2 h-2 rounded-full ${c2.dot}`} />
                    <span className={`text-[9px] md:text-[11px] font-bold tracking-widest uppercase ${c2.text}`}>{activeSolution.diagram.output2.label}</span>
                  </div>
                  <span className="text-[12px] md:text-[14px] font-bold text-[#2D2482] leading-snug">{activeSolution.diagram.output2.text}</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes dash {
          to {
            stroke-dashoffset: -100;
          }
        }
      `}} />
    </section>
  );
}
