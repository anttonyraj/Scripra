"use client";

import React, { useEffect, useState, useRef } from "react";

type Stage = "capture" | "transcribe" | "extract" | "recall";

interface PlatformInfo {
  name: string;
  fullName: string;
  badgeColor: string;
  dotColor: string;
  meetingName: string;
  icon: (className?: string) => React.ReactNode;
}

const TeamsIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.5 7.5a2 2 0 00-2-2h-3a1 1 0 00-1 1v11a1 1 0 001 1h3a2 2 0 002-2v-9zM6.5 6.5A2.5 2.5 0 019 4h6a2.5 2.5 0 012.5 2.5v11A2.5 2.5 0 0115 20H9a2.5 2.5 0 01-2.5-2.5v-11z" opacity="0.4" />
    <path d="M12 2a3 3 0 100 6 3 3 0 000-6zM3.5 8.5a2 2 0 012-2h1v9.5h-1a2 2 0 01-2-2v-5.5z" />
  </svg>
);

const WebexIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="12" r="4" />
    <circle cx="16" cy="12" r="4" />
    <circle cx="12" cy="7" r="3" />
    <circle cx="12" cy="17" r="3" />
  </svg>
);

const ZoomIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 6.5A2.5 2.5 0 016.5 4h8A2.5 2.5 0 0117 6.5v11a2.5 2.5 0 01-2.5 2.5h-8A2.5 2.5 0 014 17.5v-11z" />
    <path d="M18 9.5l3.5-2.5v10L18 14.5v-5z" opacity="0.85" />
  </svg>
);

const MeetIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <rect x="3" y="6" width="12" height="12" rx="2.5" />
    <polygon points="16,10 21,6.5 21,17.5 16,14" opacity="0.85" />
  </svg>
);

const SlackIcon = ({ className = "w-3 h-3" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M5.5 10.5a2 2 0 110-4 2 2 0 010 4zm0 2h4a2 2 0 11-4 0zM13.5 5.5a2 2 0 114 0 2 2 0 01-4 0zm-2 0v4a2 2 0 110-4zM18.5 13.5a2 2 0 110 4 2 2 0 010-4zm0-2h-4a2 2 0 114 0zM10.5 18.5a2 2 0 11-4 0 2 2 0 014 0zm2 0v-4a2 2 0 110 4z" />
  </svg>
);

const DiscordIcon = ({ className = "w-3 h-3" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.3 5.4A15.3 15.3 0 0015.4 4c-.2.3-.4.8-.5 1.1-1.6-.2-3.2-.2-4.8 0-.1-.3-.3-.8-.5-1.1-1.4.5-2.7 1-3.9 1.4C3.2 9.2 2.6 14.4 3 19.5c1.8 1.3 3.5 2.1 5.2 2.6.4-.6.8-1.2 1.1-1.9-1.2-.5-1.7-1.1-1.7-1.1s.1 0 .3.1c3.4 1.6 7.1 1.6 10.4 0 .2-.1.3-.1.3-.1s-.5.6-1.7 1.1c.3.7.7 1.3 1.1 1.9 1.7-.5 3.4-1.3 5.2-2.6.5-5.9-.9-11-2.9-14.1zM8.5 15.5c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2zm7 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2z" />
  </svg>
);

const platforms: PlatformInfo[] = [
  {
    name: "Teams",
    fullName: "Microsoft Teams",
    badgeColor: "bg-[#5059C9]/15 text-[#5059C9] border-[#5059C9]/40",
    dotColor: "bg-[#5059C9]",
    meetingName: "MS Teams · Sprint Planning & Architecture",
    icon: (cls) => <TeamsIcon className={cls} />,
  },
  {
    name: "Webex",
    fullName: "Cisco Webex",
    badgeColor: "bg-teal-wash text-teal border-teal/40",
    dotColor: "bg-teal",
    meetingName: "Webex · Global Engineering Review",
    icon: (cls) => <WebexIcon className={cls} />,
  },
  {
    name: "Zoom",
    fullName: "Zoom Meetings",
    badgeColor: "bg-blue-50 text-blue-600 border-blue-300",
    dotColor: "bg-blue-500",
    meetingName: "Zoom · Executive Decision Sync",
    icon: (cls) => <ZoomIcon className={cls} />,
  },
  {
    name: "Google Meet",
    fullName: "Google Meet",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-300",
    dotColor: "bg-emerald-500",
    meetingName: "Google Meet · Product Launch Sync",
    icon: (cls) => <MeetIcon className={cls} />,
  },
];

export default function ConversationArtifact() {
  const [stage, setStage] = useState<Stage>("capture");
  const [typingProgress, setTypingProgress] = useState(0);
  const [platformIdx, setPlatformIdx] = useState(0);
  const [manualOverride, setManualOverride] = useState(false);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const fullSpeech = "Let's ship the release Friday the 12th. Michael, please finish regression testing Thursday.";

  const clearTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  const schedule = (delay: number, fn: () => void) => {
    const id = setTimeout(fn, delay);
    timeoutsRef.current.push(id);
  };

  const runWorkflow = () => {
    clearTimeouts();
    setStage("capture");
    setTypingProgress(0);

    // 0.0s - 2.4s: Step 1: Capture (Audio Wave)
    schedule(2400, () => {
      setStage("transcribe");
      const steps = 24;
      const stepDuration = 1600 / steps;
      for (let i = 1; i <= steps; i++) {
        schedule(i * stepDuration, () => {
          setTypingProgress((i / steps) * 100);
        });
      }
    });

    // 4.5s: Step 2: Extract (Decisions & Action Items appear)
    schedule(4500, () => {
      setStage("extract");
    });

    // 7.2s: Step 3: Recall (Instant Semantic Search & Evidence)
    schedule(7200, () => {
      setStage("recall");
    });

    // Loop back and cycle through platforms (Teams -> Webex -> Zoom -> Google Meet)
    schedule(11200, () => {
      setPlatformIdx((prev) => (prev + 1) % platforms.length);
      runWorkflow();
    });
  };

  useEffect(() => {
    if (!manualOverride) {
      runWorkflow();
    }
    return clearTimeouts;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [manualOverride]);

  const charsToShow = Math.floor((typingProgress / 100) * fullSpeech.length);
  const typedText = fullSpeech.substring(0, charsToShow);

  const selectStage = (s: Stage) => {
    clearTimeouts();
    setManualOverride(true);
    setStage(s);
    if (s === "transcribe" || s === "extract" || s === "recall") {
      setTypingProgress(100);
    }
    schedule(8000, () => {
      setManualOverride(false);
    });
  };

  const currentPlatform = platforms[platformIdx];

  return (
    <div className="w-full max-w-[600px] xl:max-w-[620px] bg-card border border-line/80 rounded-3xl p-5 sm:p-6 shadow-[0_25px_60px_rgba(67,83,255,0.12)] transition-all relative overflow-hidden select-none">
      
      <style jsx>{`
        @keyframes soundWave {
          0%, 100% { height: 4px; }
          50% { height: 26px; }
        }

        @keyframes cardPop {
          0% { opacity: 0; transform: translateY(8px) scale(0.97); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        .bar-1 { animation: soundWave 0.9s ease-in-out infinite 0.1s; }
        .bar-2 { animation: soundWave 1.2s ease-in-out infinite 0.25s; }
        .bar-3 { animation: soundWave 0.7s ease-in-out infinite 0.05s; }
        .bar-4 { animation: soundWave 1.4s ease-in-out infinite 0.3s; }
        .bar-5 { animation: soundWave 0.8s ease-in-out infinite 0.15s; }
        .bar-6 { animation: soundWave 1.3s ease-in-out infinite 0.35s; }
        .bar-7 { animation: soundWave 1.0s ease-in-out infinite 0.2s; }
        .bar-8 { animation: soundWave 0.6s ease-in-out infinite 0.4s; }

        .card-enter {
          animation: cardPop 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* ================= PLATFORMS SUPPORT BAR ================= */}
      <div className="pb-3 mb-3 border-b border-line/70">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          
          {/* Supported Platforms (Clickable) */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] font-mono uppercase tracking-wider text-ink font-bold mr-0.5">
              Live:
            </span>

            {platforms.map((p, idx) => {
              const isSelected = idx === platformIdx;
              return (
                <button
                  key={p.name}
                  onClick={() => setPlatformIdx(idx)}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded-md text-[10.5px] font-bold transition-all ${
                    isSelected
                      ? `${p.badgeColor} border shadow-xs ring-1 ring-black/5 scale-[1.02]`
                      : "bg-canvas border border-line/60 text-ink-2 hover:border-indigo/40 opacity-75 hover:opacity-100"
                  }`}
                >
                  {p.icon("w-3 h-3")}
                  <span>{p.name}</span>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Future / In-Progress Platforms */}
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] font-mono text-amber font-semibold uppercase tracking-wider">
              In-Progress:
            </span>
            <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-amber-wash/70 border border-amber/30 text-amber-deep font-bold flex items-center gap-1">
              <SlackIcon className="w-2.5 h-2.5" />
              Slack
            </span>
            <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-amber-wash/70 border border-amber/30 text-amber-deep font-bold flex items-center gap-1">
              <DiscordIcon className="w-2.5 h-2.5" />
              Discord
            </span>
          </div>
        </div>
      </div>

      {/* TOP HEADER: Active Meeting & 4-Step Stepper */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-line/60">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500" />
          </span>
          <div className="flex items-center gap-1.5">
            {currentPlatform.icon("w-3.5 h-3.5 text-ink")}
            <span className="text-[12px] font-bold text-ink transition-colors">
              {currentPlatform.meetingName}
            </span>
          </div>
          <span className="text-[10px] font-mono text-ink-3">12:04</span>
        </div>

        {/* 4-Step Interactive Pipeline Pills */}
        <div className="flex items-center gap-1 bg-canvas p-1 rounded-xl border border-line/60">
          <button
            onClick={() => selectStage("capture")}
            className={`px-2 py-0.5 rounded-lg text-[9.5px] font-bold tracking-wider uppercase transition-all ${
              stage === "capture"
                ? "bg-teal text-white shadow-xs"
                : "text-ink-3 hover:text-ink"
            }`}
          >
            1. Capture
          </button>
          <button
            onClick={() => selectStage("transcribe")}
            className={`px-2 py-0.5 rounded-lg text-[9.5px] font-bold tracking-wider uppercase transition-all ${
              stage === "transcribe"
                ? "bg-indigo text-white shadow-xs"
                : "text-ink-3 hover:text-ink"
            }`}
          >
            2. Transcribe
          </button>
          <button
            onClick={() => selectStage("extract")}
            className={`px-2 py-0.5 rounded-lg text-[9.5px] font-bold tracking-wider uppercase transition-all ${
              stage === "extract"
                ? "bg-amber text-white shadow-xs"
                : "text-ink-3 hover:text-ink"
            }`}
          >
            3. Extract
          </button>
          <button
            onClick={() => selectStage("recall")}
            className={`px-2 py-0.5 rounded-lg text-[9.5px] font-bold tracking-wider uppercase transition-all ${
              stage === "recall"
                ? "bg-indigo text-white shadow-xs"
                : "text-ink-3 hover:text-ink"
            }`}
          >
            4. Recall
          </button>
        </div>
      </div>

      {/* MAIN WORKFLOW STAGE DISPLAY */}
      <div className="min-h-[275px] flex flex-col justify-between relative">

        {/* ---------------- STAGE 1: CAPTURE (AUDIO WAVE) ---------------- */}
        {stage === "capture" && (
          <div className="flex-1 flex flex-col items-center justify-center p-5 bg-indigo-wash/30 border border-indigo/20 rounded-2xl text-center card-enter">
            {/* Live Visual Hub of Supported Video Platforms */}
            <div className="flex items-center justify-center gap-2 mb-3">
              {platforms.map((p, idx) => {
                const isActive = idx === platformIdx;
                return (
                  <div
                    key={p.name}
                    className={`flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold transition-all ${
                      isActive
                        ? "bg-white text-ink shadow-sm border border-indigo/40 ring-2 ring-indigo/10 scale-105"
                        : "bg-canvas/80 text-ink-3 border border-line/50 opacity-60"
                    }`}
                  >
                    {p.icon("w-3 h-3")}
                    <span>{p.name}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-teal animate-ping" />}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-center gap-2 h-12 mb-3">
              <span className="w-2 bg-teal rounded-full bar-1" />
              <span className="w-2 bg-indigo rounded-full bar-2" />
              <span className="w-2 bg-teal rounded-full bar-3" />
              <span className="w-2 bg-indigo rounded-full bar-4" />
              <span className="w-2 bg-amber rounded-full bar-5" />
              <span className="w-2 bg-indigo rounded-full bar-6" />
              <span className="w-2 bg-teal rounded-full bar-7" />
              <span className="w-2 bg-indigo rounded-full bar-8" />
            </div>

            <div className="text-[13.5px] font-bold text-ink mb-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
              Scripra Bot actively listening to {currentPlatform.fullName}
            </div>
            <p className="text-[12px] text-ink-3 max-w-[420px] leading-relaxed">
              Auto-joins <strong>Teams, Webex, Zoom &amp; Google Meet</strong>. Low latency audio ingestion, noise removal &amp; instant speaker diarization.
            </p>
          </div>
        )}

        {/* ---------------- STAGE 2: TRANSCRIBE ---------------- */}
        {stage === "transcribe" && (
          <div className="flex-1 flex flex-col justify-center p-5 bg-canvas border border-line rounded-2xl card-enter">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-line/60">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-indigo text-white text-[11px] font-bold flex items-center justify-center">
                  A
                </div>
                <span className="text-[12.5px] font-bold text-ink">Antony (Engineering Lead)</span>
              </div>
              <span className="text-[10px] font-mono text-teal bg-teal-wash px-2 py-0.5 rounded border border-teal/25 font-semibold">
                ● Live Speech-to-Text
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-card border border-indigo/20 shadow-xs">
              <p className="text-[13.5px] font-medium text-ink leading-relaxed">
                &ldquo;{typedText}&rdquo;
                {typingProgress < 100 && (
                  <span className="inline-block w-2 h-4 bg-indigo ml-1 animate-pulse align-middle" />
                )}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2.5 mt-1 text-[11px] font-mono text-ink-3">
              <span>99.4% Accuracy across {currentPlatform.name}</span>
              <span>Gemini Flash Audio Diarization</span>
            </div>
          </div>
        )}

        {/* ---------------- STAGE 3: EXTRACT (TASKS & DECISIONS) ---------------- */}
        {stage === "extract" && (
          <div className="flex-1 flex flex-col justify-between space-y-2 card-enter">
            <div className="flex items-center justify-between pb-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-amber font-bold flex items-center gap-1.5">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                Instant AI Extraction (From Spoken Words)
              </span>
              <span className="text-[9.5px] font-mono text-amber bg-amber-wash px-2 py-0.5 rounded-full font-bold border border-amber/25">
                ⚡ 0 Manual Notes
              </span>
            </div>

            {/* Extracted Decision Card */}
            <div className="p-2.5 rounded-xl bg-teal-wash/60 border border-teal/30 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded bg-teal text-white flex items-center justify-center text-[11px] font-bold shadow-xs">
                  📌
                </div>
                <div>
                  <span className="text-[9.5px] font-bold uppercase tracking-wider text-teal block">Key Decision</span>
                  <span className="text-[12px] font-bold text-ink">Ship release on Friday the 12th</span>
                </div>
              </div>
              <span className="text-[9.5px] font-mono text-teal font-bold px-2 py-0.5 rounded bg-card border border-teal/20">
                Consensus Reached
              </span>
            </div>

            {/* Extracted Action Item Card */}
            <div className="p-2.5 rounded-xl bg-amber-wash/60 border border-amber/35 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded bg-amber text-white flex items-center justify-center text-[11px] font-bold shadow-xs">
                  ✓
                </div>
                <div>
                  <span className="text-[9.5px] font-bold uppercase tracking-wider text-amber block">Auto-Assigned Task</span>
                  <span className="text-[12px] font-bold text-ink">
                    <span className="text-indigo font-extrabold mr-1">Michael:</span>
                    Finish regression testing
                  </span>
                </div>
              </div>
              <span className="text-[9.5px] font-mono text-amber font-bold px-2 py-0.5 rounded bg-card border border-amber/25">
                Due Thursday
              </span>
            </div>

            <div className="flex items-center justify-between pt-1 text-[10.5px] font-mono text-ink-3">
              <span className="text-teal font-semibold">✓ Synced to Jira &amp; Slack</span>
              <span>Traceable to Audio 12:04</span>
            </div>
          </div>
        )}

        {/* ---------------- STAGE 4: RECALL (THE MEMORY / ASK ANYTHING FEATURE) ---------------- */}
        {stage === "recall" && (
          <div className="flex-1 flex flex-col justify-between space-y-2 card-enter">
            {/* Search Prompt */}
            <div className="p-2.5 rounded-xl bg-canvas border border-line flex items-center justify-between gap-2 shadow-xs">
              <div className="flex items-center gap-2 flex-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-indigo">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <span className="text-[12px] font-bold text-ink">
                  &ldquo;When is the release and who is blocking it?&rdquo;
                </span>
              </div>
              <span className="text-[9px] font-mono bg-indigo text-white px-2 py-0.5 rounded font-bold">
                ASK SCRIPRA
              </span>
            </div>

            {/* Instant Verified Answer */}
            <div className="p-3 rounded-xl bg-indigo-wash/80 border border-indigo/35 shadow-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[9.5px] font-bold uppercase tracking-wider text-indigo flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo animate-pulse" />
                  Instant AI Answer
                </span>
                <span className="text-[9.5px] font-mono text-indigo font-bold bg-card px-2 py-0.5 rounded border border-indigo/25">
                  Source: {currentPlatform.name} 12:04 ↗
                </span>
              </div>

              <p className="text-[12px] font-medium text-ink leading-relaxed">
                The release is committed for <strong>Friday the 12th</strong>. Michael owns regression testing and expects to finish <strong>Thursday</strong>.
              </p>
            </div>

            {/* Cross-Meeting Memory Indicator */}
            <div className="p-2 rounded-lg bg-card border border-line flex items-center justify-between text-[10.5px]">
              <span className="text-ink-2 font-medium">Cross-Meeting Context:</span>
              <span className="text-indigo font-bold">Synced across Teams, Webex, Zoom &amp; Google Meet</span>
            </div>
          </div>
        )}

      </div>

      {/* BOTTOM CONTROL FOOTER */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-3 mt-3 border-t border-line/70 text-[10.5px] font-medium text-ink-3">
        <div className="flex items-center gap-1.5">
          <span className="text-teal font-bold">✓</span>
          <span className="text-ink font-semibold">Teams, Webex, Zoom &amp; Meet live</span>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[9.5px] text-amber-deep font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse" />
          <span>Slack &amp; Discord in progress</span>
        </div>
      </div>

    </div>
  );
}
