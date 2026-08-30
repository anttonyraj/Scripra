"use client";
import { useEffect, useState } from "react";

export default function IntegrationsSection() {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setPulse(p => !p);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-32 bg-[#0B0D14] border-y border-white/5 overflow-hidden relative">
      {/* Deep ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1080px] mx-auto px-6 relative z-10">
        
        <div className="text-center max-w-[700px] mx-auto mb-24">
          <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-indigo-400 mb-4">
            Integrations
          </div>
          <h2 className="text-[clamp(36px,5vw,52px)] font-bold tracking-[-0.03em] text-white leading-[1.05] mb-6">
            Conversations happen everywhere.
            <br />
            <span className="text-indigo-400">Scripra should meet you there.</span>
          </h2>
          <p className="text-[18px] text-white/60 leading-[1.6]">
            We are building native integrations to bring Scripra directly into the tools your team already uses every day.
          </p>
        </div>

        {/* Ecosystem Visualization */}
        <div className="relative w-full max-w-[800px] mx-auto h-[400px] flex items-center justify-center">
          
          {/* Central Scripra Node */}
          <div className="relative z-20">
            <div className={`absolute inset-0 bg-indigo-500/30 rounded-full blur-xl transition-transform duration-1000 ${pulse ? 'scale-[2.5] opacity-0' : 'scale-100 opacity-100'}`} />
            <div className="w-24 h-24 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_0_40px_rgba(91,92,240,0.3)] flex items-center justify-center relative z-10">
              <span className="text-white font-bold text-3xl tracking-tighter drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">S.</span>
            </div>
          </div>

          {/* Incoming Connections (Left side) */}
          <div className="absolute left-0 top-0 bottom-0 w-[40%] flex flex-col justify-between py-10 z-10">
            <IntegrationNode name="Zoom" type="Meeting" delay="0ms" />
            <IntegrationNode name="Google Meet" type="Meeting" delay="500ms" />
            <IntegrationNode name="Voice Memos" type="Audio" delay="1000ms" />
          </div>

          {/* Outgoing Connections (Right side) */}
          <div className="absolute right-0 top-0 bottom-0 w-[40%] flex flex-col justify-between py-10 z-10 items-end">
            <IntegrationNode name="Slack" type="Work" delay="200ms" right />
            <IntegrationNode name="Jira" type="Tickets" delay="700ms" right />
            <IntegrationNode name="Salesforce" type="CRM" delay="1200ms" right />
          </div>

          {/* Flow Lines (SVG) */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Incoming Lines */}
              <path d="M 200 60 C 300 60, 300 200, 380 200" stroke="currentColor" className="text-indigo/10" strokeWidth="2" strokeDasharray="6 6" />
              <circle cx="200" cy="60" r="3" fill="currentColor" className="text-indigo animate-[flow_2s_linear_infinite]" />
              
              <path d="M 200 200 C 300 200, 300 200, 380 200" stroke="currentColor" className="text-indigo/10" strokeWidth="2" strokeDasharray="6 6" />
              <circle cx="200" cy="200" r="3" fill="currentColor" className="text-indigo animate-[flow_2s_linear_infinite_0.5s]" />
              
              <path d="M 200 340 C 300 340, 300 200, 380 200" stroke="currentColor" className="text-indigo/10" strokeWidth="2" strokeDasharray="6 6" />
              <circle cx="200" cy="340" r="3" fill="currentColor" className="text-indigo animate-[flow_2s_linear_infinite_1s]" />

              {/* Outgoing Lines */}
              <path d="M 420 200 C 500 200, 500 60, 600 60" stroke="currentColor" className="text-amber/20" strokeWidth="2" strokeDasharray="6 6" />
              <circle cx="420" cy="200" r="3" fill="currentColor" className="text-amber animate-[flow-out_2s_linear_infinite_0.2s]" />

              <path d="M 420 200 C 500 200, 500 200, 600 200" stroke="currentColor" className="text-amber/20" strokeWidth="2" strokeDasharray="6 6" />
              <circle cx="420" cy="200" r="3" fill="currentColor" className="text-amber animate-[flow-out_2s_linear_infinite_0.7s]" />

              <path d="M 420 200 C 500 200, 500 340, 600 340" stroke="currentColor" className="text-emerald-500/20" strokeWidth="2" strokeDasharray="6 6" />
              <circle cx="420" cy="200" r="3" fill="currentColor" className="text-emerald-500 animate-[flow-out_2s_linear_infinite_1.2s]" />
            </svg>
          </div>

        </div>

      </div>

      <style jsx>{`
        @keyframes flow {
          0% { offset-distance: 0%; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }
        @keyframes flow-out {
          0% { offset-distance: 0%; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }
        path { offset-path: path(inherit); }
        circle { offset-path: path(inherit); }
      `}</style>
    </section>
  );
}

function IntegrationNode({ name, type, right = false }: { name: string, type: string, delay?: string, right?: boolean }) {
  return (
    <div className={`flex items-center gap-4 ${right ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center font-bold text-white text-sm shadow-[0_0_15px_rgba(255,255,255,0.05)]">
        {name[0]}
      </div>
      <div className={`flex flex-col ${right ? 'text-right' : 'text-left'}`}>
        <span className="text-[14px] font-bold text-white drop-shadow-sm">{name}</span>
        <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/50">{type}</span>
      </div>
    </div>
  );
}
