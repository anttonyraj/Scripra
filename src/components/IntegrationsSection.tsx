"use client";

import React, { useEffect, useState } from "react";

interface NodeProps {
  name: string;
  type: string;
  status: "Supported" | "In-Progress" | "Next";
  color: string;
  right?: boolean;
}

export default function IntegrationsSection() {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setPulse((p) => !p);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="integrations" className="py-24 sm:py-32 bg-canvas border-t border-line/60 overflow-hidden relative">
      {/* Subtle ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-indigo-wash/50 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-[1320px] mx-auto px-6 relative z-10">
        
        {/* Section Header with Crisp Definition */}
        <div className="text-center max-w-[760px] mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-wash text-indigo text-[11px] font-bold tracking-[0.15em] uppercase border border-indigo/20 mb-4">
            <span className="w-2 h-2 rounded-full bg-indigo" />
            Stage 05 · Bi-Directional Workflow Sync
          </div>
          <h2 className="text-[clamp(32px,4.5vw,52px)] font-black tracking-[-0.03em] text-ink leading-[1.1] mb-5">
            Conversations happen everywhere. <br className="hidden sm:inline" />
            <span className="text-indigo">Scripra turns them into action.</span>
          </h2>
          <p className="text-[16px] sm:text-[18px] text-ink-3 leading-relaxed">
            <strong className="text-ink font-bold">Bi-directional integration:</strong> Automatically ingest audio from video conferencing &amp; async messaging, then auto-push tickets and recaps directly into your daily tools.
          </p>
        </div>

        {/* Ecosystem Visualization */}
        <div className="relative w-full max-w-[920px] mx-auto min-h-[480px] flex items-center justify-center bg-card border border-line/80 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(67,83,255,0.06)]">
          
          {/* Central Scripra Node */}
          <div className="relative z-20">
            <div className={`absolute inset-0 bg-indigo/25 rounded-full blur-xl transition-transform duration-1000 ${pulse ? 'scale-[2.2] opacity-0' : 'scale-100 opacity-100'}`} />
            <div className="w-24 h-24 rounded-2xl bg-card border border-indigo/30 shadow-[0_10px_35px_rgba(67,83,255,0.18)] flex flex-col items-center justify-center relative z-10">
              <span className="text-indigo font-black text-3xl tracking-tighter drop-shadow-xs">S.</span>
              <span className="text-[9.5px] font-mono text-indigo font-bold uppercase tracking-wider mt-0.5">Brain</span>
            </div>
          </div>

          {/* Incoming Connections (Left side - Supported Meeting Platforms) */}
          <div className="absolute left-6 sm:left-10 top-0 bottom-0 w-[42%] flex flex-col justify-between py-8 z-10">
            <IntegrationNode 
              name="MS Teams" 
              type="Meeting Bot" 
              status="Supported" 
              color="#5059C9" 
            />
            <IntegrationNode 
              name="Cisco Webex" 
              type="Meeting Bot" 
              status="Supported" 
              color="#00BC70" 
            />
            <IntegrationNode 
              name="Zoom" 
              type="Meeting Bot" 
              status="Supported" 
              color="#0B5CFF" 
            />
            <IntegrationNode 
              name="Google Meet" 
              type="Meeting Bot" 
              status="Supported" 
              color="#00AC47" 
            />
          </div>

          {/* Outgoing & Future Connections (Right side - In-Progress & Work Hubs) */}
          <div className="absolute right-6 sm:right-10 top-0 bottom-0 w-[42%] flex flex-col justify-between py-8 z-10 items-end">
            <IntegrationNode 
              name="Slack" 
              type="Async Hub" 
              status="In-Progress" 
              color="#E01E5A" 
              right 
            />
            <IntegrationNode 
              name="Discord" 
              type="Voice & Chat" 
              status="In-Progress" 
              color="#5865F2" 
              right 
            />
            <IntegrationNode 
              name="Linear & Jira" 
              type="Auto Tickets" 
              status="Next" 
              color="#F59E0B" 
              right 
            />
            <IntegrationNode 
              name="Salesforce & Notion" 
              type="CRM & Wiki" 
              status="Next" 
              color="#00A1E0" 
              right 
            />
          </div>

          {/* Flow Lines (SVG) */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 920 480" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Incoming Lines from 4 Supported Platforms */}
              <path d="M 230 60 C 340 60, 340 240, 420 240" stroke="currentColor" className="text-teal/40" strokeWidth="2" strokeDasharray="5 5" />
              <path d="M 230 180 C 340 180, 340 240, 420 240" stroke="currentColor" className="text-teal/40" strokeWidth="2" strokeDasharray="5 5" />
              <path d="M 230 300 C 340 300, 340 240, 420 240" stroke="currentColor" className="text-teal/40" strokeWidth="2" strokeDasharray="5 5" />
              <path d="M 230 420 C 340 420, 340 240, 420 240" stroke="currentColor" className="text-teal/40" strokeWidth="2" strokeDasharray="5 5" />

              {/* Outgoing Lines to Future & Work Hubs */}
              <path d="M 500 240 C 580 240, 580 60, 690 60" stroke="currentColor" className="text-amber/40" strokeWidth="2" strokeDasharray="5 5" />
              <path d="M 500 240 C 580 240, 580 180, 690 180" stroke="currentColor" className="text-amber/40" strokeWidth="2" strokeDasharray="5 5" />
              <path d="M 500 240 C 580 240, 580 300, 690 300" stroke="currentColor" className="text-amber/40" strokeWidth="2" strokeDasharray="5 5" />
              <path d="M 500 240 C 580 240, 580 420, 690 420" stroke="currentColor" className="text-amber/40" strokeWidth="2" strokeDasharray="5 5" />
            </svg>
          </div>

        </div>

        {/* Integration Badges Footer */}
        <div className="mt-12 text-center text-[12px] font-mono text-ink-3">
          <span>Supported Video Bots · 1-Click Ticket Sync · Real-Time Webhooks</span>
        </div>

      </div>
    </section>
  );
}

function IntegrationNode({ name, type, status, color, right = false }: NodeProps) {
  const isSupported = status === "Supported";
  const isInProgress = status === "In-Progress";

  return (
    <div className={`flex items-center gap-3.5 ${right ? 'flex-row-reverse' : 'flex-row'}`}>
      <div 
        className="w-11 h-11 rounded-xl bg-raise border border-line flex items-center justify-center font-bold text-sm shadow-xs transition-transform hover:scale-105"
        style={{ borderTopColor: color, borderTopWidth: 2.5 }}
      >
        <span style={{ color }}>{name[0]}</span>
      </div>
      <div className={`flex flex-col ${right ? 'text-right' : 'text-left'}`}>
        <div className="flex items-center gap-1.5">
          {right && (
            <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded border ${
              isInProgress 
                ? 'bg-amber-wash text-amber-deep border-amber/30' 
                : 'bg-raise text-ink-3 border-line'
            }`}>
              {status}
            </span>
          )}
          <span className="text-[13px] font-bold text-ink">{name}</span>
          {!right && (
            <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded border ${
              isSupported 
                ? 'bg-teal-wash text-teal border-teal/30' 
                : 'bg-amber-wash text-amber-deep border-amber/30'
            }`}>
              {status}
            </span>
          )}
        </div>
        <span className="text-[10px] font-mono tracking-wider uppercase text-ink-3">{type}</span>
      </div>
    </div>
  );
}
