"use client";

import React, { useState } from "react";

interface NodeItem {
  id: string;
  name: string;
  category: "person" | "topic" | "decision" | "meeting";
  x: number;
  y: number;
  color: string;
  desc: string;
  connections: string[];
}

export default function MemoryGraphSection() {
  const [selectedNode, setSelectedNode] = useState<string>("topic-1");
  const [searchQuery, setSearchQuery] = useState("What did we decide about the Q3 release schedule?");

  const nodes: NodeItem[] = [
    {
      id: "topic-1",
      name: "Q3 Release Schedule",
      category: "topic",
      x: 350,
      y: 190,
      color: "#4353FF",
      desc: "Committed to ship Friday the 12th. Production deployment led by Antony on Thursday.",
      connections: ["person-1", "person-2", "meet-1", "dec-1"],
    },
    {
      id: "person-1",
      name: "Antony (Engineering)",
      category: "person",
      x: 180,
      y: 90,
      color: "#00D2B4",
      desc: "Owner of Webex and Teams live audio diarization pipelines.",
      connections: ["topic-1", "meet-1", "dec-1"],
    },
    {
      id: "person-2",
      name: "Sarah (Design)",
      category: "person",
      x: 520,
      y: 90,
      color: "#00D2B4",
      desc: "Finalizing competitive benchmarking matrix and marketing visuals.",
      connections: ["topic-1", "meet-2"],
    },
    {
      id: "meet-1",
      name: "Sprint 42 Sync (Teams)",
      category: "meeting",
      x: 150,
      y: 300,
      color: "#5059C9",
      desc: "42 min meeting on MS Teams. 3 key decisions made with 99.4% speech accuracy.",
      connections: ["topic-1", "person-1", "dec-1"],
    },
    {
      id: "meet-2",
      name: "Exec Sync (Zoom)",
      category: "meeting",
      x: 540,
      y: 300,
      color: "#0B5CFF",
      desc: "55 min executive meeting on Zoom. Approved budget for WebRTC audio relays.",
      connections: ["topic-1", "person-2", "dec-2"],
    },
    {
      id: "dec-1",
      name: "Gemini Flash on Edge",
      category: "decision",
      x: 230,
      y: 220,
      color: "#F5A020",
      desc: "Sub-300ms transcription latency approved across all client meetings.",
      connections: ["topic-1", "person-1", "meet-1"],
    },
    {
      id: "dec-2",
      name: "SOC 2 Type II Audit",
      category: "decision",
      x: 470,
      y: 220,
      color: "#F5A020",
      desc: "Required by enterprise customers. Zero data retention model active.",
      connections: ["meet-2"],
    },
  ];

  const active = nodes.find((n) => n.id === selectedNode) || nodes[0];

  return (
    <section id="memory" className="py-24 sm:py-32 px-6 bg-canvas border-t border-line/60 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-indigo-wash/40 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1320px] mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-[760px] mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-wash text-indigo text-[11px] font-bold tracking-[0.15em] uppercase border border-indigo/20 mb-4">
            <span className="w-2 h-2 rounded-full bg-indigo" />
            Stage 03 · Cross-Meeting Intelligence
          </div>
          <h2 className="text-[clamp(32px,4.5vw,52px)] font-black tracking-[-0.03em] text-ink leading-[1.1] mb-5">
            Beyond single calls. <br className="hidden sm:inline" />
            <span className="text-indigo">An interconnected memory graph.</span>
          </h2>
          <p className="text-[16px] sm:text-[18px] text-ink-3 leading-relaxed">
            Competitors forget the meeting the moment it ends. Scripra builds an ongoing semantic graph that connects people, topics, and decisions across months of conversations.
          </p>
        </div>

        {/* 2-Column Graph + Ask Scripra Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-8 items-stretch">
          
          {/* Left: Interactive SVG Relationship Graph */}
          <div className="bg-card border border-line rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(67,83,255,0.06)] flex flex-col justify-between relative overflow-hidden">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-line/70">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo animate-pulse" />
                <span className="text-[12px] font-mono font-bold text-ink uppercase tracking-wider">
                  Live Enterprise Memory Graph
                </span>
              </div>
              <span className="text-[11px] font-mono text-ink-3">
                Click any node to explore connections
              </span>
            </div>

            {/* SVG Visual Canvas */}
            <div className="relative w-full h-[360px] sm:h-[400px] flex items-center justify-center my-2">
              <svg className="w-full h-full" viewBox="0 0 700 380" fill="none">
                {/* Connection lines */}
                {nodes.map((source) =>
                  source.connections.map((targetId) => {
                    const target = nodes.find((n) => n.id === targetId);
                    if (!target) return null;
                    const isConnected =
                      source.id === selectedNode || target.id === selectedNode;

                    return (
                      <line
                        key={`${source.id}-${target.id}`}
                        x1={source.x}
                        y1={source.y}
                        x2={target.x}
                        y2={target.y}
                        stroke={isConnected ? "var(--indigo)" : "rgba(67, 83, 255, 0.12)"}
                        strokeWidth={isConnected ? 2.5 : 1}
                        strokeDasharray={isConnected ? "none" : "4 4"}
                        className="transition-all duration-300"
                      />
                    );
                  })
                )}

                {/* Nodes */}
                {nodes.map((node) => {
                  const isSelected = node.id === selectedNode;
                  const isNeighbor = active.connections.includes(node.id);

                  return (
                    <g
                      key={node.id}
                      onClick={() => setSelectedNode(node.id)}
                      className="cursor-pointer transition-transform duration-200"
                      transform={`translate(${node.x}, ${node.y})`}
                    >
                      {/* Pulse ring for selected */}
                      {isSelected && (
                        <circle
                          r="28"
                          fill="none"
                          stroke={node.color}
                          strokeWidth="2"
                          opacity="0.3"
                          className="animate-ping"
                        />
                      )}
                      
                      {/* Node circle */}
                      <circle
                        r={isSelected ? "18" : isNeighbor ? "15" : "13"}
                        fill={isSelected ? node.color : "#FFFFFF"}
                        stroke={node.color}
                        strokeWidth={isSelected ? "3" : "2"}
                        className="transition-all"
                      />

                      {/* Icon or indicator */}
                      <circle
                        r="4"
                        fill={isSelected ? "#FFFFFF" : node.color}
                      />

                      {/* Node Label */}
                      <text
                        y="30"
                        textAnchor="middle"
                        className={`text-[11px] font-sans font-bold select-none pointer-events-none transition-colors ${
                          isSelected
                            ? "fill-indigo"
                            : isNeighbor
                            ? "fill-ink"
                            : "fill-ink-3"
                        }`}
                      >
                        {node.name}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Active Node Detail Card */}
            <div className="p-4 rounded-2xl bg-raise border border-line flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: active.color }}
                  />
                  <span className="text-[13px] font-bold text-ink">{active.name}</span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-ink-3 bg-card px-1.5 py-0.5 rounded border border-line">
                    {active.category}
                  </span>
                </div>
                <p className="text-[12.5px] text-ink-3 leading-relaxed">
                  {active.desc}
                </p>
              </div>

              <div className="text-[11px] font-mono text-indigo font-bold bg-indigo-wash px-2.5 py-1 rounded-lg border border-indigo/20 shrink-0">
                {active.connections.length} Synced Links ↗
              </div>
            </div>

          </div>

          {/* Right: "Ask Scripra" Semantic Query Interface */}
          <div className="bg-card border border-line rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(67,83,255,0.06)] flex flex-col justify-between">
            
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-line/70">
                <div className="flex items-center gap-2">
                  <span className="text-[16px]">🧠</span>
                  <span className="text-[13px] font-mono font-bold text-ink uppercase tracking-wider">
                    Ask Scripra Anything
                  </span>
                </div>
                <span className="text-[10px] font-mono bg-indigo text-white px-2 py-0.5 rounded font-bold">
                  Instant Recall
                </span>
              </div>

              {/* Natural Language Search Input Box */}
              <div className="p-3 rounded-2xl bg-raise border border-indigo/30 mb-5 shadow-xs">
                <div className="flex items-center gap-2 mb-2 text-ink-3 text-[11px] font-mono">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <span>Ask across all past calls:</span>
                </div>
                <div className="text-[13.5px] font-bold text-ink">
                  &ldquo;{searchQuery}&rdquo;
                </div>
              </div>

              {/* Verified AI Answer Box */}
              <div className="p-5 rounded-2xl bg-indigo-wash/50 border border-indigo/25 mb-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo animate-pulse" />
                    Synthesized Memory Answer
                  </span>
                  <span className="text-[10px] font-mono text-teal bg-teal-wash px-2 py-0.5 rounded font-bold border border-teal/20">
                    100% Grounded
                  </span>
                </div>

                <p className="text-[13.5px] text-ink leading-relaxed font-medium">
                  The team confirmed the release is locked for <strong>Friday the 12th</strong> during the Sprint 42 sync. Antony is scheduled to finish regression testing on <strong>Thursday</strong>, while the secondary billing tier was postponed until the 24th.
                </p>

                {/* Evidence Citations */}
                <div className="pt-2 border-t border-indigo/15 space-y-1.5">
                  <div className="text-[10.5px] font-mono text-ink-3 uppercase tracking-wider font-bold">
                    Direct Evidence Citations:
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-card border border-line text-[11px]">
                    <span className="font-medium text-ink">MS Teams · Sprint 42 Planning</span>
                    <span className="font-mono text-indigo font-bold">Timestamp 12:04 ↗</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-card border border-line text-[11px]">
                    <span className="font-medium text-ink">Zoom · Executive Strategy Sync</span>
                    <span className="font-mono text-indigo font-bold">Timestamp 34:18 ↗</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Prompt presets */}
            <div className="pt-4 border-t border-line/70">
              <div className="text-[11px] font-mono text-ink-3 mb-2 font-bold uppercase tracking-wider">
                Try asking:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "Who is responsible for the SOC 2 audit?",
                  "Why was the billing launch delayed?",
                  "Summarize what Antony committed to this week",
                ].map((q) => (
                  <button
                    key={q}
                    onClick={() => setSearchQuery(q)}
                    className="text-[11px] px-2.5 py-1 rounded-md bg-raise hover:bg-indigo-wash border border-line hover:border-indigo/30 text-ink-2 transition-all text-left"
                  >
                    &ldquo;{q}&rdquo;
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
