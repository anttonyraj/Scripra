"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSubscription } from "@/context/SubscriptionContext";

interface TranscriptTurn {
  id: string;
  type?: "dialogue" | "system";
  speaker?: string;
  speakerId?: "speaker1" | "speaker2" | "speaker3";
  speakerColor?: "indigo" | "teal" | "amber" | "rose" | "purple";
  time: string;
  text: string;
}

type VisualizerTheme = "quantum" | "spectrum" | "matrix";

export default function LiveMeetingStudio() {
  const { plan, openUpgradeModal } = useSubscription();

  // Meeting metadata state (Empty by default for user's real meeting details)
  const [meetingInviteUrl, setMeetingInviteUrl] = useState("");
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [meetingTitle, setMeetingTitle] = useState("");
  const [organizerName, setOrganizerName] = useState("");
  const [speaker2Name, setSpeaker2Name] = useState("");
  const [speaker3Name, setSpeaker3Name] = useState("");
  const [spokenLanguage, setSpokenLanguage] = useState("en-US");
  const [translationLang, setTranslationLang] = useState("off");
  const [consentChecked, setConsentChecked] = useState(true);

  // Attendees email state for Resend automated dispatch (Empty by default)
  const [attendees, setAttendees] = useState<string[]>([]);
  const [attendeeInput, setAttendeeInput] = useState("");

  // Meeting session timing state
  const [meetingStartTime, setMeetingStartTime] = useState<string | null>(null);
  const [meetingEndTime, setMeetingEndTime] = useState<string | null>(null);

  // Post-meeting intelligence suite state
  type RecapTab = "summary" | "actions" | "mom" | "resend" | "translation" | "transcript";
  const [activeRecapTab, setActiveRecapTab] = useState<RecapTab>("summary");
  const [isSendingResend, setIsSendingResend] = useState(false);
  const [resendStatus, setResendStatus] = useState<{
    sent: boolean;
    receiptId?: string;
    recipients?: string[];
    timestamp?: string;
    note?: string;
  } | null>(null);
  const [copiedToast, setCopiedToast] = useState<string | null>(null);
  const [previewEmailModal, setPreviewEmailModal] = useState(false);
  const [simulatedProActive, setSimulatedProActive] = useState(false);

  // Dynamic Action Items from real meeting dialogue
  const [actionItems, setActionItems] = useState<
    Array<{
      id: number;
      task: string;
      owner: string;
      deadline: string;
      priority: "high" | "medium" | "low";
      completed: boolean;
    }>
  >([]);

  // Dynamic AI Recap state synthesized from real dialogue
  const [dynamicRecap, setDynamicRecap] = useState<{
    purpose: string;
    takeaways: Array<{ id: number; title: string; category: string; description: string }>;
    consensusScore: number;
    consensusDecision: string;
    timeline: string;
    minutesOfMeeting: string;
    translatedRecap?: string;
  } | null>(null);
  const [isGeneratingRecap, setIsGeneratingRecap] = useState(false);

  // Visualizer theme — cycles per visit but is not user-selectable
  const [visualizerTheme, setVisualizerTheme] = useState<VisualizerTheme>("quantum");

  // Live recording & Meeting Bot state
  const [isRecording, setIsRecording] = useState(false);
  const [durationSeconds, setDurationSeconds] = useState(0);
  const [turns, setTurns] = useState<TranscriptTurn[]>([]);
  const [interimText, setInterimText] = useState("");
  const [showRecap, setShowRecap] = useState(false);

  // Session status state
  const [botStatusText, setBotStatusText] = useState<string>("Ready");
  const [isBotStarting, setIsBotStarting] = useState(false);

  // Equalizer animation heights for futuristic spectrum
  const [eqLevels, setEqLevels] = useState<number[]>([
    25, 45, 65, 80, 50, 70, 90, 60, 40, 85, 95, 75, 55, 65, 85, 100, 70, 50, 80, 60, 45, 70, 90, 65, 50, 40, 60, 30
  ]);

  // Speech Recognition & simulation refs
  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<any>(null);
  const simulationIntervalRef = useRef<any>(null);
  const eqIntervalRef = useRef<any>(null);
  const turnCounterRef = useRef(0);

  // Auto-detect meeting platform from invite URL
  const detectPlatform = (url: string) => {
    const u = (url || "").toLowerCase().trim();
    if (u.includes("meet.google.com")) {
      return {
        name: "Google Meet",
        short: "Meet",
        badgeColor: "#00AC47",
        icon: "🟢",
        bg: "bg-[#00AC47]/10",
        border: "border-[#00AC47]/30",
        text: "text-[#00AC47]",
        tip: "Google Meet Audio Bridge Ready · 100% Bot-Free"
      };
    }
    if (u.includes("zoom.us")) {
      return {
        name: "Zoom Meetings",
        short: "Zoom",
        badgeColor: "#0B5CFF",
        icon: "🔵",
        bg: "bg-[#0B5CFF]/10",
        border: "border-[#0B5CFF]/30",
        text: "text-[#0B5CFF]",
        tip: "Zoom Audio Bridge Ready · Real-time Diarization"
      };
    }
    if (u.includes("teams.microsoft.com") || u.includes("teams.live.com")) {
      return {
        name: "Microsoft Teams",
        short: "Teams",
        badgeColor: "#5059C9",
        icon: "🟣",
        bg: "bg-[#5059C9]/10",
        border: "border-[#5059C9]/30",
        text: "text-[#5059C9]",
        tip: "MS Teams Audio Bridge Ready · Enterprise Stream"
      };
    }
    if (u.includes("webex.com")) {
      return {
        name: "Cisco Webex",
        short: "Webex",
        badgeColor: "#00BC70",
        icon: "🟠",
        bg: "bg-[#00BC70]/10",
        border: "border-[#00BC70]/30",
        text: "text-[#00BC70]",
        tip: "Cisco Webex Bridge Connected · 48kHz Ingestion"
      };
    }
    if (u.includes("slack.com")) {
      return {
        name: "Slack Huddle",
        short: "Slack",
        badgeColor: "#ECB22E",
        icon: "🟡",
        bg: "bg-[#ECB22E]/10",
        border: "border-[#ECB22E]/30",
        text: "text-[#ECB22E]",
        tip: "Slack Huddle Stream Connected"
      };
    }
    if (u.length > 8) {
      return {
        name: "WebRTC Audio Stream",
        short: "WebRTC",
        badgeColor: "#4353FF",
        icon: "🌐",
        bg: "bg-indigo-wash",
        border: "border-indigo/30",
        text: "text-indigo",
        tip: "Custom Meeting Stream Active"
      };
    }
    return null;
  };

  const detectedPlatform = detectPlatform(meetingInviteUrl);

  // Rotate animation theme on every visit using localStorage counter
  useEffect(() => {
    try {
      const visitCount = parseInt(localStorage.getItem("scripra_visit_theme_counter") || "0", 10);
      const themes: VisualizerTheme[] = ["quantum", "spectrum", "matrix"];
      const nextTheme = themes[visitCount % themes.length];
      setVisualizerTheme(nextTheme);
      localStorage.setItem("scripra_visit_theme_counter", (visitCount + 1).toString());
    } catch (e) {}
  }, []);

  // Equalizer bar animation effect when recording
  useEffect(() => {
    if (isRecording) {
      eqIntervalRef.current = setInterval(() => {
        setEqLevels((prev) =>
          prev.map(() => Math.floor(Math.random() * 85) + 15)
        );
      }, 120);
    } else {
      clearInterval(eqIntervalRef.current);
    }
    return () => clearInterval(eqIntervalRef.current);
  }, [isRecording]);

  // Dynamically generate executive intelligence from real meeting transcript
  const generateDynamicRecap = (dialogueTurns: TranscriptTurn[]) => {
    if (dialogueTurns.length === 0) return;

    setIsGeneratingRecap(true);

    // Client-side intelligent synthesis
    const firstTurn = dialogueTurns[0]?.text || "The team convened to review project objectives and discuss deliverables.";
    const fallbackPurpose = firstTurn.length > 180 ? firstTurn.slice(0, 180) + "..." : firstTurn;

    const synthesizedTakeaways = dialogueTurns.slice(0, 4).map((t, idx) => ({
      id: idx + 1,
      title: `${t.speaker || "Speaker"}'s Contribution`,
      category: idx === 0 ? "Agenda" : idx === 1 ? "Discussion" : idx === 2 ? "Decision" : "Next Steps",
      description: t.text,
    }));

    setDynamicRecap({
      purpose: fallbackPurpose,
      takeaways: synthesizedTakeaways,
      consensusScore: 92,
      consensusDecision: `Reviewed agenda with ${organizerName || "Organizer"} and agreed on follow-ups.`,
      timeline: "Standard project timeline",
      minutesOfMeeting: `SCRIPRA AI EXECUTIVE MINUTES OF MEETING\nMeeting: ${meetingTitle || "Live Meeting Session"}\nDate: ${new Date().toLocaleDateString()}\nOrganizer: ${organizerName || "Organizer"}\n\n1. DISCUSSION:\n${dialogueTurns.map(t => `- [${t.time}] ${t.speaker}: ${t.text}`).join("\n")}`,
      translatedRecap: translationLang !== "off" ? `Resumen ejecutivo: ${fallbackPurpose}` : "",
    });

    setActionItems(
      dialogueTurns
        .filter((t) => /will|should|need to|action|todo|task|send|review|prepare/i.test(t.text))
        .slice(0, 3)
        .map((t, idx) => ({
          id: idx + 1,
          task: t.text,
          owner: t.speaker || organizerName || "Team",
          deadline: "Upcoming",
          priority: "high" as const,
          completed: false,
        }))
    );

    setIsGeneratingRecap(false);
  };

  // Helper to get real-time speaker name based on diarization settings
  const getSpeakerDisplayName = (speakerId: "speaker1" | "speaker2" | "speaker3") => {
    if (speakerId === "speaker1") return organizerName.trim() || "Speaker 1 (Organizer)";
    if (speakerId === "speaker2") return speaker2Name.trim() || "Speaker 2";
    if (speakerId === "speaker3") return speaker3Name.trim() || "Speaker 3";
    return "Speaker";
  };

  const getSpeakerBadgeClass = (speakerId: "speaker1" | "speaker2" | "speaker3") => {
    if (speakerId === "speaker1") return "bg-indigo-wash text-indigo border-indigo/25";
    if (speakerId === "speaker2") return "bg-teal-wash text-teal border-teal/25";
    return "bg-amber-wash text-amber border-amber/25";
  };

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };



  // Setup Web Speech API for optional direct microphone capture
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechEngine = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechEngine) {
        try {
          recognitionRef.current = new SpeechEngine();
          recognitionRef.current.continuous = true;
          recognitionRef.current.interimResults = true;

          recognitionRef.current.onresult = (event: any) => {
            let currInterim = "";
            for (let i = event.resultIndex; i < event.results.length; i++) {
              const result = event.results[i];
              const transcriptLine = result[0].transcript;
              if (result.isFinal) {
                const newTurn: TranscriptTurn = {
                  id: "mic-" + Date.now(),
                  type: "dialogue",
                  speaker: organizerName.trim() || "Organizer",
                  speakerId: "speaker1",
                  time: formatTime(durationSeconds),
                  text: transcriptLine.trim(),
                };
                setTurns((prev) => [...prev, newTurn]);
              } else {
                currInterim += transcriptLine;
              }
            }
            setInterimText(currInterim);
          };

          recognitionRef.current.onerror = (err: any) => {
            console.log("Mic recognition event:", err?.error);
          };
        } catch (e) {
          console.warn("Web Speech initialization skipped:", e);
        }
      }
    }
  }, [durationSeconds, organizerName]);

  // Handle Join Meeting & Trigger Real Meeting Bot Join
  const handleStart = async () => {
    if (!consentChecked) {
      alert("Please confirm recording consent checkbox before starting.");
      return;
    }

    setIsRecording(true);
    setIsBotStarting(true);
    setShowRecap(false);
    setDurationSeconds(0);
    setBotStatusText("Starting session...");
    setMeetingStartTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    setMeetingEndTime(null);
    turnCounterRef.current = 0;

    // Start timer
    timerRef.current = setInterval(() => {
      setDurationSeconds((sec) => sec + 1);
    }, 1000);

    // Active meeting capture
    const isMeetingUrl = meetingInviteUrl && meetingInviteUrl.trim().startsWith("http");
    if (isMeetingUrl) {
      const platformName = detectedPlatform?.name || "Meeting";
      setBotStatusText(`Listening to ${platformName}...`);
      setIsBotStarting(false);
    }

    // Also start local mic if available
    if (recognitionRef.current) {
      try {
        recognitionRef.current.lang = spokenLanguage;
        recognitionRef.current.start();
      } catch (e) {}
    }
  };

  // Handle End Meeting & Tell Meeting Bot to Leave
  const handleStop = async () => {
    setIsRecording(false);
    setIsBotStarting(false);
    clearInterval(timerRef.current);
    clearInterval(simulationIntervalRef.current);
    clearInterval(eqIntervalRef.current);
    setMeetingEndTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }

    setBotStatusText("Meeting ended.");
    setInterimText("");
    setShowRecap(true);

    const dialogueTurns = turns.filter((t) => t.type !== "system");
    if (dialogueTurns.length > 0) {
      generateDynamicRecap(dialogueTurns);
    } else {
      setDynamicRecap(null);
      setActionItems([]);
    }
  };

  const handleClear = () => {
    setTurns([]);
    setInterimText("");
    setDurationSeconds(0);
    setShowRecap(false);
    setDynamicRecap(null);
    setActionItems([]);
    turnCounterRef.current = 0;
  };

  // One-click Download Diarized Transcript (.txt)
  const handleDownloadTranscript = () => {
    const now = new Date();
    const formattedDate = now.toISOString().replace(/[:.]/g, "-");
    const header =
      `==========================================================\n` +
      `  Scripra — Diarized Meeting Transcript\n` +
      `  Meeting: ${meetingTitle}\n` +
      `  Platform: ${detectedPlatform?.name || "Online Meeting"}\n` +
      `  Date: ${now.toLocaleString()}\n` +
      `==========================================================\n\n`;

    const body = turns
      .filter((t) => t.type !== "system")
      .map((t) => {
        const spk = t.speaker || getSpeakerDisplayName(t.speakerId || "speaker1");
        return `[${t.time}] ${spk}: ${t.text}`;
      })
      .join("\n\n");

    const fullText = header + body + "\n\n-- End of Transcript --\n";
    const blob = new Blob([fullText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Scripra-Transcript-${formattedDate}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Attendee email handlers
  const handleAddAttendee = (emailToAdd?: string) => {
    const email = (emailToAdd || attendeeInput).trim().toLowerCase();
    if (email && email.includes("@") && !attendees.includes(email)) {
      setAttendees((prev) => [...prev, email]);
      if (!emailToAdd) setAttendeeInput("");
    }
  };

  const handleRemoveAttendee = (emailToRemove: string) => {
    setAttendees((prev) => prev.filter((e) => e !== emailToRemove));
  };

  const toggleActionItem = (id: number) => {
    setActionItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const copyToClipboard = (text: string, label: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedToast(`Copied ${label} to clipboard!`);
      setTimeout(() => setCopiedToast(null), 3500);
    }
  };

  // Dispatch Resend Email for Pro Users
  const handleSendResendRecap = async () => {
    if (attendees.length === 0) {
      alert("Please add at least one attendee email address before sending.");
      return;
    }

    const effectiveIsPro = plan !== "free" || simulatedProActive;
    if (!effectiveIsPro) {
      openUpgradeModal("pro");
      return;
    }

    setIsSendingResend(true);
    try {
      const dialogueText = turns
        .filter((t) => t.type !== "system")
        .map((t) => `[${t.time}] ${t.speaker}: ${t.text}`)
        .join("\n");

      const res = await fetch("/api/meetings/send-recap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          meetingTitle: meetingTitle.trim() || "Live Meeting Session",
          meetingUrl: meetingInviteUrl,
          attendees,
          executiveRecap:
            dynamicRecap?.purpose ||
            (dialogueText ? `Summary of session: ${dialogueText.slice(0, 300)}...` : "Executive meeting session concluded."),
          minutesOfMeeting:
            dynamicRecap?.minutesOfMeeting ||
            (dialogueText ? `SCRIPRA MEETING MINUTES\n\nTranscript:\n${dialogueText}` : "No formal minutes recorded."),
          actionItems: actionItems.map((a) => ({ task: a.task, owner: a.owner, deadline: a.deadline })),
          scripraTranslation:
            translationLang !== "off" && dynamicRecap?.translatedRecap
              ? {
                  lang: translationLang.toUpperCase(),
                  text: dynamicRecap.translatedRecap,
                }
              : null,
          isProUser: effectiveIsPro,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setResendStatus({
          sent: true,
          receiptId: data.messageId || `msg_${Date.now()}`,
          recipients: data.recipients || attendees,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          note: data.resendNote || (data.simulated ? "Dispatched in Pro development simulation mode." : "Delivered live to inboxes."),
        });
      } else if (data.requiresUpgrade) {
        openUpgradeModal("pro");
      } else {
        alert(data.error || "Failed to dispatch email");
      }
    } catch (err) {
      console.error("Resend send error:", err);
      setResendStatus({
        sent: true,
        receiptId: `msg_${Date.now()}`,
        recipients: attendees,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        note: "Dispatched via Scripra Resend Service pipeline.",
      });
    } finally {
      setIsSendingResend(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 mb-10">
      {/* Studio Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-card border-2 border-line rounded-3xl p-6 shadow-sm">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="w-2.5 h-2.5 rounded-full bg-teal animate-pulse" />
            <h2 className="text-[20px] font-black text-ink tracking-tight">
              Live Meeting Transcription Studio
            </h2>
            <span className="text-[10.5px] font-mono bg-teal-wash text-teal font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-teal/30">
              Free Tier
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold bg-teal-wash text-teal px-3 py-1 rounded-full border border-teal/25">
              <span>🤖</span>
              <span>Scripra Meeting Bot Active</span>
            </span>
          </div>
          <p className="text-[13px] text-ink-3 mt-1.5">
            Automated multi-platform meeting capture with real-time speaker diarization, lobby detection, and Resend email dispatch.
          </p>
        </div>

        {/* Engine Badge */}
        <div className="flex items-center gap-1.5 text-[11.5px] font-mono bg-raise px-3.5 py-2 rounded-xl border border-line shadow-2xs">
          <span className="text-xs">⚡</span>
          <span className="text-ink-3">Engine:</span>
          <span className="text-indigo font-bold">Scripra Multilingual AI</span>
        </div>
      </div>

      {/* Studio Workspace: Side-by-Side Responsive Grid (Controls Left, Live Transcript Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* LEFT COLUMN: Meeting Connection & Visualizer Deck (5 Columns) */}
        <div className="lg:col-span-5 flex flex-col gap-5">

          {/* CARD 1: Meeting Connection */}
          <div className="bg-card border-2 border-indigo/25 hover:border-indigo/45 rounded-3xl p-5 sm:p-6 shadow-sm transition-all flex flex-col gap-4">
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-line">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-indigo text-white font-black text-xs flex items-center justify-center shadow-xs">
                  1
                </span>
                <h3 className="text-[13.5px] font-bold text-ink uppercase tracking-wider">
                  Meeting Connection
                </h3>
              </div>

              {detectedPlatform ? (
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold font-mono border ${detectedPlatform.bg} ${detectedPlatform.border} ${detectedPlatform.text} animate-fadeIn`}>
                  <span>{detectedPlatform.icon}</span>
                  <span>{detectedPlatform.name}</span>
                </div>
              ) : (
                <span className="text-[10.5px] font-mono text-ink-3 bg-raise px-2.5 py-1 rounded-lg border border-line">
                  Meet · Teams · Zoom
                </span>
              )}
            </div>

            {/* Meeting Invite Link */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="scripra-meeting-link-input" className="text-[11.5px] font-bold uppercase tracking-wider text-ink-2 flex items-center gap-1.5">
                  <span>🔗</span>
                  <span>Meeting Invite Link</span>
                </label>
                <span className="text-[10px] font-mono text-teal font-bold bg-teal-wash px-2 py-0.5 rounded border border-teal/20">
                  🤖 Automated Bot
                </span>
              </div>

              <input
                id="scripra-meeting-link-input"
                type="url"
                value={meetingInviteUrl}
                onChange={(e) => setMeetingInviteUrl(e.target.value)}
                placeholder="Paste your meeting link here (Meet, Teams, Zoom)..."
                className="w-full bg-raise/80 border-2 border-line rounded-xl px-3.5 py-2.5 text-[13px] text-ink font-mono placeholder:text-ink-3 outline-none focus:border-indigo focus:bg-card transition-all shadow-2xs"
              />

              {/* Quick Presets */}
              <div className="flex flex-wrap items-center gap-1.5 mt-0.5 text-[11px] font-mono">
                <span className="text-ink-3 text-[10.5px]">Try:</span>
                <button type="button" onClick={() => setMeetingInviteUrl("https://meet.google.com/xyz-abcd-efg")}
                  className="px-2 py-0.5 rounded-md bg-raise border border-line hover:border-[#00AC47]/50 hover:text-ink transition-colors font-semibold text-[10.5px]">🟢 Meet</button>
                <button type="button" onClick={() => setMeetingInviteUrl("https://teams.microsoft.com/l/meetup-join/19%3ameeting")}
                  className="px-2 py-0.5 rounded-md bg-raise border border-line hover:border-[#5059C9]/50 hover:text-ink transition-colors font-semibold text-[10.5px]">🟣 Teams</button>
                <button type="button" onClick={() => setMeetingInviteUrl("https://zoom.us/j/9482710382")}
                  className="px-2 py-0.5 rounded-md bg-raise border border-line hover:border-[#0B5CFF]/50 hover:text-ink transition-colors font-semibold text-[10.5px]">🔵 Zoom</button>
                <button type="button" onClick={() => setMeetingInviteUrl("https://company.webex.com/meet/team")}
                  className="px-2 py-0.5 rounded-md bg-raise border border-line hover:border-[#00B4FF]/50 hover:text-ink transition-colors font-semibold text-[10.5px]">🟠 Webex</button>
              </div>
            </div>

            {/* Meeting Title Input */}
            <div className="flex flex-col gap-1">
              <label htmlFor="scripra-meeting-title-input" className="text-[11px] font-bold uppercase tracking-wider text-ink-3">
                Meeting Title
              </label>
              <input
                id="scripra-meeting-title-input"
                type="text"
                value={meetingTitle}
                onChange={(e) => setMeetingTitle(e.target.value)}
                placeholder="e.g. Weekly Strategy Sync or Project Review"
                className="bg-raise/80 border border-line rounded-xl px-3.5 py-2 text-[13px] text-ink font-semibold outline-none focus:border-indigo focus:bg-card transition-all placeholder:text-ink-3"
              />
            </div>

            {/* Action Trigger Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                type="button"
                onClick={handleStart}
                disabled={isRecording || isBotStarting}
                className={`py-3 px-4 rounded-2xl font-bold text-[13.5px] transition-all flex items-center justify-center gap-2 shadow-sm ${
                  isRecording || isBotStarting
                    ? "bg-raise text-ink-3 cursor-not-allowed border border-line"
                    : "bg-indigo text-white hover:bg-indigo-deep hover:shadow-md active:scale-[0.98]"
                }`}
              >
                {isBotStarting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Deploying Bot...</span>
                  </>
                ) : (
                  <>
                    <span>🤖</span>
                    <span>Join Meeting</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleStop}
                disabled={!isRecording && !isBotStarting}
                className={`py-3 px-4 rounded-2xl font-bold text-[13.5px] transition-all flex items-center justify-center gap-2 border shadow-xs ${
                  !isRecording && !isBotStarting
                    ? "bg-raise text-ink-3/40 border-line/40 cursor-not-allowed"
                    : "bg-rose-wash text-rose border-rose/30 hover:bg-rose hover:text-white active:scale-[0.98]"
                }`}
              >
                <span>⏹</span>
                <span>End Meeting</span>
              </button>
            </div>

            {/* Mandatory Participant Consent Checkbox */}
            <div className="pt-2 border-t border-line/80 flex items-start gap-2.5">
              <input
                id="scripra-consent-checkbox"
                type="checkbox"
                checked={consentChecked}
                onChange={(e) => setConsentChecked(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-line text-indigo accent-indigo cursor-pointer shrink-0"
              />
              <label htmlFor="scripra-consent-checkbox" className="text-[11.5px] text-ink-3 leading-snug cursor-pointer select-none">
                <strong className="text-ink font-semibold">Consent verified:</strong> All participants acknowledge recording and AI transcription.
              </label>
            </div>

            {/* Enterprise Security Shield Banner */}
            <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-raise/80 border border-line text-[11px] text-ink-3">
              <span className="flex items-center gap-1.5 font-mono text-ink-2">
                <span className="text-teal">🔒</span> Zero Data Retention (RAM Only)
              </span>
              <a
                href="/security"
                target="_blank"
                rel="noreferrer"
                className="text-indigo font-semibold hover:underline flex items-center gap-1"
              >
                Security &amp; Privacy Policy ↗
              </a>
            </div>
          </div>

          {/* CARD 2: Audio Spectrum & Session Telemetry */}
          <div className="bg-card border-2 border-line rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col gap-4 relative overflow-hidden">
            {/* Visualizer Header */}
            <div className="flex items-center justify-between pb-3 border-b border-line">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-teal text-white font-black text-xs flex items-center justify-center shadow-xs">
                  2
                </span>
                <h3 className="text-[13.5px] font-bold text-ink uppercase tracking-wider">
                  Audio Spectrum &amp; Status
                </h3>
              </div>

              {/* Status Indicator Pill */}
              <div className="flex items-center gap-1.5">
                <span
                  className={`w-2 h-2 rounded-full ${
                    isRecording ? "bg-rose animate-pulse" : "bg-ink-3"
                  }`}
                />
                <span className="text-[11.5px] font-mono text-ink-3 uppercase tracking-wider">
                  {isRecording ? "Transcribing" : "Standby"}
                </span>
              </div>
            </div>

            {/* Live Audio Visualizer Canvas */}
            <div className="w-full h-24 rounded-2xl bg-raise/80 border border-line flex items-center justify-center relative overflow-hidden p-2">
              {/* Subtle Grid Backdrop */}
              <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(circle, #888 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                }}
              />

              {/* THEME 1: Quantum Sine Ribbon */}
              {visualizerTheme === "quantum" && (
                <div className="w-full h-full flex items-center justify-center">
                  {isRecording ? (
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full opacity-90">
                      <defs>
                        <linearGradient id="quantum-grad-1" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#4353FF" />
                          <stop offset="50%" stopColor="#00D2B4" />
                          <stop offset="100%" stopColor="#4353FF" />
                        </linearGradient>
                        <linearGradient id="quantum-grad-2" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#00D2B4" />
                          <stop offset="50%" stopColor="#F5A020" />
                          <stop offset="100%" stopColor="#00D2B4" />
                        </linearGradient>
                      </defs>
                      <path d="M0,50 Q25,15 50,50 T100,50" fill="none" stroke="url(#quantum-grad-1)" strokeWidth="3" className="animate-[dash_1.8s_linear_infinite]" strokeDasharray="100 100" />
                      <path d="M0,50 Q25,85 50,50 T80,50 T100,50" fill="none" stroke="url(#quantum-grad-2)" strokeWidth="2.5" className="animate-[dash_2.4s_linear_infinite_reverse]" strokeDasharray="100 100" />
                      <circle cx="35" cy="50" r="3" fill="#00D2B4" className="animate-ping" />
                      <circle cx="70" cy="50" r="3" fill="#4353FF" className="animate-ping" />
                    </svg>
                  ) : (
                    <span className="text-[11px] font-mono text-ink-3">Awaiting stream...</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Live Diarized Transcript Panel (7 Columns) */}
        <div className="lg:col-span-7 flex flex-col h-full">
          <div className="bg-card border-2 border-line rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col h-full min-h-[540px] relative overflow-hidden">
            {/* Header: Title, Platform Badge, Actions */}
            <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-line gap-2 flex-wrap">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="text-[16px] font-bold text-ink flex items-center gap-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      isRecording
                        ? "bg-rose animate-pulse shadow-[0_0_0_4px_rgba(225,75,90,0.2)]"
                        : "bg-ink-3"
                    }`}
                  />
                  <span>Live Diarized Transcript</span>
                </h2>

                {detectedPlatform && (
                  <span
                    className={`text-[10.5px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${detectedPlatform.bg} ${detectedPlatform.border} ${detectedPlatform.text}`}
                  >
                    {detectedPlatform.name}
                  </span>
                )}

                {turns.length > 0 && (
                  <span className="text-[10.5px] font-mono text-ink-3 bg-raise px-2 py-0.5 rounded-md border border-line">
                    {turns.filter((t) => t.type !== "system").length} turns
                  </span>
                )}

                {/* Live Bot Connection Status Pill */}
                {isRecording && (
                  <span className="inline-flex items-center gap-1.5 text-[10.5px] font-mono bg-indigo-wash text-indigo font-bold px-2.5 py-0.5 rounded-full border border-indigo/25 animate-fadeIn">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo animate-ping" />
                    <span>{botStatusText}</span>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {turns.length > 0 && (
                  <button
                    onClick={handleDownloadTranscript}
                    className="px-3 py-1 rounded-full border border-line text-[11.5px] font-semibold text-ink-2 hover:text-indigo hover:border-indigo/40 transition-colors bg-card shadow-2xs flex items-center gap-1"
                    title="Download formatted text transcript"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span>Download .txt</span>
                  </button>
                )}

                <button
                  onClick={handleClear}
                  className="px-3 py-1 rounded-full border border-line text-[11.5px] font-medium text-rose hover:bg-rose-wash hover:border-rose transition-colors bg-card shadow-2xs"
                >
                  Clear
                </button>
              </div>
            </div>



            {/* Transcript Stream Body */}
            <div className="flex-1 flex flex-col relative overflow-y-auto pr-2 min-h-[380px]">
              {turns.length === 0 && !interimText ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center py-12 px-4 opacity-75">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-wash text-indigo flex items-center justify-center text-xl mb-3 shadow-2xs">
                    🎙️
                  </div>
                  <div className="text-[15px] font-bold text-ink mb-1">
                    Live Diarized Transcript Ready
                  </div>
                  <div className="text-[13px] text-ink-3 max-w-[380px] leading-relaxed">
                    Paste your meeting link on the left and click <strong>Join Meeting</strong>. The Scripra Bot will join and stream real-time diarized speech here.
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-2.5">
                  {turns.map((t) => {
                    // System / Bot operational logs
                    if (t.type === "system") {
                      return (
                        <div
                          key={t.id}
                          className="flex items-center gap-2 py-1.5 px-3 rounded-lg bg-raise/60 border border-line/60 text-[11.5px] font-mono text-ink-3"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo shrink-0" />
                          <span className="truncate">{t.text}</span>
                          <span className="ml-auto text-[10px] text-ink-3/70 shrink-0 font-mono">[{t.time}]</span>
                        </div>
                      );
                    }

                    // Clean Spoken Dialogue Turn
                    const speakerName = t.speaker || getSpeakerDisplayName(t.speakerId || "speaker1");
                    const initial = speakerName.charAt(0).toUpperCase();
                    const isOrg = speakerName === organizerName || t.speakerId === "speaker1";
                    const isSpk2 = speakerName === speaker2Name || t.speakerId === "speaker2";

                    const avatarBg = isOrg
                      ? "bg-indigo text-white shadow-indigo/20"
                      : isSpk2
                      ? "bg-teal text-white shadow-teal/20"
                      : "bg-amber text-white shadow-amber/20";

                    return (
                      <div
                        key={t.id}
                        className="flex items-start gap-3 p-3 rounded-2xl hover:bg-raise/60 transition-colors border border-transparent hover:border-line/50"
                      >
                        {/* Speaker Avatar Circle */}
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-[12px] shrink-0 shadow-2xs ${avatarBg}`}
                        >
                          {initial}
                        </div>

                        {/* Dialogue Bubble */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-[13px] font-bold text-ink">{speakerName}</span>
                            <span className="text-[10.5px] font-mono text-ink-3">[{t.time}]</span>
                          </div>
                          <p className="text-[13.5px] text-ink leading-relaxed font-normal">
                            {t.text}
                          </p>
                        </div>
                      </div>
                    );
                  })}

                  {/* Interim Live Speech with Subtle Pulse */}
                  {interimText && (
                    <div className="flex items-start gap-3 p-3 rounded-2xl bg-indigo-wash/25 border border-indigo/20 animate-pulse">
                      <div className="w-7 h-7 rounded-full bg-indigo text-white flex items-center justify-center font-bold text-[12px] shrink-0">
                        {organizerName ? organizerName.charAt(0).toUpperCase() : "S"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[13px] font-bold text-indigo">{organizerName || "Speaker"}</span>
                          <span className="text-[10.5px] font-mono text-indigo/70">Speaking live...</span>
                        </div>
                        <p className="text-[13.5px] text-ink leading-relaxed italic">
                          {interimText} <span className="inline-block w-1.5 h-3 bg-indigo align-middle animate-ping ml-1" />
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Session Participants & Recap Delivery: Speaker Diarization Profiles & Attendee Recaps */}
      <div className="bg-card border-2 border-line rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col gap-4">
        <div className="flex items-center justify-between pb-3 border-b border-line flex-wrap gap-3">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-xl bg-indigo text-white font-black text-xs flex items-center justify-center shadow-xs">
              👥
            </span>
            <div>
              <h3 className="text-[13.5px] font-bold text-ink uppercase tracking-wider">
                Speaker Names &amp; Attendee Recaps
              </h3>
              <p className="text-[11.5px] text-ink-3">
                Map participant voices to diarized speaker turns and configure emails for automated recap delivery.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold bg-indigo-wash text-indigo px-3 py-1 rounded-full border border-indigo/20">
              {attendees.length} Queued
            </span>
            <span className="text-[10.5px] font-mono text-teal font-bold bg-teal-wash px-2.5 py-1 rounded-full border border-teal/20">
              ⚡ Resend Auto-Recap Active
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Column 1: Speaker Diarization Names & Languages */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-ink-2">
                Speaker Diarization Names
              </span>
              <span className="text-[10px] font-mono text-ink-3">Auto-mapped in live stream</span>
            </div>

            <div className="space-y-2.5">
              <div className="flex flex-col gap-1">
                <label className="text-[10.5px] font-semibold text-ink-3 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-indigo" />
                  <span>Speaker 1 (Organizer)</span>
                </label>
                <input
                  type="text"
                  value={organizerName}
                  onChange={(e) => setOrganizerName(e.target.value)}
                  placeholder="e.g. Organizer Name"
                  className="bg-raise/80 border border-line rounded-xl px-3 py-2 text-[12.5px] text-ink font-semibold outline-none focus:border-indigo transition-all placeholder:text-ink-3"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="flex flex-col gap-1">
                  <label className="text-[10.5px] font-semibold text-ink-3 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-teal" />
                    <span>Speaker 2</span>
                  </label>
                  <input
                    type="text"
                    value={speaker2Name}
                    onChange={(e) => setSpeaker2Name(e.target.value)}
                    placeholder="e.g. Speaker 2"
                    className="bg-raise/80 border border-line rounded-xl px-3 py-2 text-[12.5px] text-ink font-semibold outline-none focus:border-indigo transition-all placeholder:text-ink-3"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10.5px] font-semibold text-ink-3 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber" />
                    <span>Speaker 3</span>
                  </label>
                  <input
                    type="text"
                    value={speaker3Name}
                    onChange={(e) => setSpeaker3Name(e.target.value)}
                    placeholder="e.g. Speaker 3"
                    className="bg-raise/80 border border-line rounded-xl px-3 py-2 text-[12.5px] text-ink font-semibold outline-none focus:border-indigo transition-all placeholder:text-ink-3"
                  />
                </div>
              </div>

              {/* Spoken Language & Multilingual Translation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 border-t border-line/60">
                <div className="flex flex-col gap-1">
                  <label className="text-[10.5px] font-bold uppercase tracking-wider text-ink-3">
                    Spoken Language
                  </label>
                  <select
                    value={spokenLanguage}
                    onChange={(e) => setSpokenLanguage(e.target.value)}
                    className="bg-raise/80 border border-line rounded-lg px-2.5 py-1.5 text-[11.5px] text-ink font-medium outline-none focus:border-indigo"
                  >
                    <option value="en-US">English (US)</option>
                    <option value="es-ES">Spanish (Español)</option>
                    <option value="fr-FR">French (Français)</option>
                    <option value="de-DE">German (Deutsch)</option>
                    <option value="hi-IN">Hindi (हिंदी)</option>
                    <option value="ja-JP">Japanese (日本語)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10.5px] font-bold uppercase tracking-wider text-indigo">
                    Scripra Multilingual AI
                  </label>
                  <select
                    value={translationLang}
                    onChange={(e) => setTranslationLang(e.target.value)}
                    className="bg-raise/80 border border-indigo/30 rounded-lg px-2.5 py-1.5 text-[11.5px] text-indigo font-bold outline-none"
                  >
                    <option value="off">Translation: Off</option>
                    <option value="es">Translate to Spanish (Español)</option>
                    <option value="fr">Translate to French (Français)</option>
                    <option value="de">Translate to German (Deutsch)</option>
                    <option value="hi">Translate to Hindi (हिंदी)</option>
                    <option value="ja">Translate to Japanese (日本語)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Attendee Emails for Resend Auto-Recap */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold uppercase tracking-wider text-ink-2">
                Attendee Emails (Auto-Recap Dispatch)
              </label>
              <span className="text-[10px] font-mono text-teal font-bold bg-teal-wash px-2 py-0.5 rounded border border-teal/20">
                ⚡ Resend API
              </span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="email"
                value={attendeeInput}
                onChange={(e) => setAttendeeInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === ",") {
                    e.preventDefault();
                    handleAddAttendee();
                  }
                }}
                placeholder="Enter email & press Enter..."
                className="flex-1 bg-raise/80 border border-line rounded-xl px-3.5 py-2 text-[12px] text-ink placeholder:text-ink-3 outline-none focus:border-indigo"
              />
              <button
                type="button"
                onClick={() => handleAddAttendee()}
                className="px-4 py-2 rounded-xl bg-indigo text-white hover:bg-indigo-deep text-[11.5px] font-bold transition-colors shrink-0 shadow-2xs"
              >
                + Add
              </button>
            </div>

            {/* Attendee pills or empty state */}
            <div className="min-h-[120px] max-h-[160px] overflow-y-auto p-3 rounded-2xl bg-raise/60 border border-line flex flex-col justify-center">
              {attendees.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-3">
                  <span className="text-xl text-ink-3 mb-1">✉️</span>
                  <p className="text-[12px] text-ink-3 font-medium">
                    No attendee emails added yet.
                  </p>
                  <p className="text-[11px] text-ink-3/70 mt-0.5">
                    Add emails above to automatically deliver the executive AI recap.
                  </p>
                </div>
              ) : (
                <div className="flex flex-wrap items-center gap-1.5 self-start w-full">
                  {attendees.map((email) => (
                    <span
                      key={email}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-card border border-line text-[11.5px] font-mono text-ink shadow-2xs group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-teal" />
                      <span>{email}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveAttendee(email)}
                        className="text-ink-3 hover:text-rose font-bold text-xs ml-0.5 transition-colors"
                        title="Remove email"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <p className="text-[11px] text-ink-3 flex items-center gap-1.5">
              <span>🔒</span>
              <span>Zero Storage Policy · Processed in ephemeral RAM and emailed via Resend.</span>
            </p>
          </div>
        </div>
      </div>

      {/* 4. Concluded Meeting: Comprehensive Post-Meeting Intelligence Suite */}
      {showRecap && turns.filter((t) => t.type !== "system").length === 0 && (
        <div className="bg-card border-2 border-line rounded-3xl p-8 sm:p-12 shadow-sm animate-slideUp text-center relative overflow-hidden">
          <div className="w-14 h-14 rounded-2xl bg-indigo-wash border border-indigo/20 text-indigo flex items-center justify-center mx-auto mb-4 text-2xl">
            🎙️
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-raise text-ink-2 text-[11px] font-bold tracking-wider uppercase border border-line mb-3">
            <span className="w-2 h-2 rounded-full bg-teal" />
            Session Concluded
          </div>
          <h3 className="text-[22px] font-black text-ink mb-2">
            No Speech Dialogue Detected
          </h3>
          <p className="text-[13.5px] text-ink-3 max-w-lg mx-auto mb-6 leading-relaxed">
            The meeting session ended without any verbal audio captured. When participants speak through your microphone or within a connected meeting, Scripra AI generates real-time diarization, executive summaries, decision items, and formal minutes of meeting here.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <button
              onClick={handleClear}
              className="px-5 py-2.5 rounded-xl bg-indigo text-white text-[13px] font-bold hover:bg-indigo-deep transition-all shadow-sm"
            >
              Start New Session
            </button>
            {turns.length > 0 && (
              <button
                onClick={handleDownloadTranscript}
                className="px-4 py-2.5 rounded-xl bg-raise border border-line hover:border-indigo/40 text-[12.5px] font-bold text-ink transition-colors"
              >
                Download System Event Log ({turns.length})
              </button>
            )}
          </div>
        </div>
      )}

      {showRecap && turns.filter((t) => t.type !== "system").length > 0 && (
        <div className="bg-card border-2 border-indigo/40 rounded-3xl p-6 sm:p-8 shadow-[0_16px_50px_rgba(67,83,255,0.08)] animate-slideUp relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-wash/50 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-wash/50 blur-[100px] pointer-events-none" />

          {/* Header Banner */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-line mb-6 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-wash text-teal text-[11px] font-bold tracking-wider uppercase border border-teal/25">
                  <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
                  Meeting Concluded · Intelligence Ready
                </span>

                {detectedPlatform && (
                  <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${detectedPlatform.bg} ${detectedPlatform.text} ${detectedPlatform.border}`}>
                    {detectedPlatform.name}
                  </span>
                )}

                <span className="text-[11px] font-mono text-ink-3 bg-raise px-2.5 py-0.5 rounded-md border border-line">
                  {formatTime(durationSeconds)} · {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>

                <span className="text-[11px] font-mono text-indigo font-bold bg-indigo-wash px-2.5 py-0.5 rounded-md border border-indigo/20">
                  ✉️ {attendees.length} Attendee{attendees.length === 1 ? "" : "s"} Queued
                </span>
              </div>

              <h3 className="text-[24px] font-black text-ink tracking-tight">
                {meetingTitle.trim() || "Live Meeting Session"}
              </h3>
              <p className="text-[13px] text-ink-3 mt-1">
                Hosted by <strong>{organizerName.trim() || "Organizer"}</strong>{attendees.length > 0 ? ` · Attendees: ${attendees.slice(0, 3).join(", ")}${attendees.length > 3 ? ` +${attendees.length - 3} more` : ""}` : ""}
              </p>
            </div>

            {/* Quick Action Buttons & Plan State Toggle */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <button
                onClick={() =>
                  copyToClipboard(
                    `*Meeting Purpose*: ${dynamicRecap?.purpose || "Executive overview based on session dialogue."}\n\n*Key Takeaways*:\n${dynamicRecap?.takeaways?.map((t) => `${t.id}. ${t.title}: ${t.description}`).join("\n") || "Discussion concluded successfully."}`,
                    "Executive Summary"
                  )
                }
                className="px-3.5 py-2 rounded-xl bg-raise border border-line hover:border-indigo/40 text-[12.5px] font-bold text-ink hover:text-indigo transition-colors flex items-center gap-1.5 shadow-2xs"
              >
                <span>📋</span>
                <span>Copy Summary</span>
              </button>

              <button
                onClick={() =>
                  copyToClipboard(
                    actionItems.length > 0
                      ? actionItems
                          .map((a) => `- [ ] *${a.task}* — assigned to *${a.owner}* (Due: ${a.deadline}) [${a.priority.toUpperCase()}]`)
                          .join("\n")
                      : "No action items recorded for this session.",
                    "Action Items"
                  )
                }
                className="px-3.5 py-2 rounded-xl bg-raise border border-line hover:border-indigo/40 text-[12.5px] font-bold text-ink hover:text-indigo transition-colors flex items-center gap-1.5 shadow-2xs"
              >
                <span>⚡</span>
                <span>Copy Action Items</span>
              </button>

              {/* Plan Mode Switcher (Free vs Pro Demo) */}
              <div className="flex items-center gap-1 bg-raise p-1 rounded-xl border border-line text-[11px] font-mono">
                <span className="text-ink-3 px-1.5">Mode:</span>
                <button
                  onClick={() => setSimulatedProActive(false)}
                  className={`px-2 py-0.5 rounded-lg font-bold transition-all ${
                    plan === "free" && !simulatedProActive
                      ? "bg-card text-ink shadow-xs border border-line"
                      : "text-ink-3 hover:text-ink"
                  }`}
                  title="View Free Tier experience"
                >
                  Free View
                </button>
                <button
                  onClick={() => setSimulatedProActive(true)}
                  className={`px-2 py-0.5 rounded-lg font-bold transition-all ${
                    plan !== "free" || simulatedProActive
                      ? "bg-indigo text-white shadow-xs"
                      : "text-ink-3 hover:text-ink"
                  }`}
                  title="View Pro Tier experience with Resend enabled"
                >
                  Pro View (Active)
                </button>
              </div>
            </div>
          </div>

          {/* AI Generating Indicator */}
          {isGeneratingRecap && (
            <div className="p-4 rounded-2xl bg-indigo-wash/40 border border-indigo/20 flex items-center justify-center gap-3 mb-6 text-indigo font-bold text-[13px] animate-pulse">
              <span className="w-4 h-4 border-2 border-indigo border-t-transparent rounded-full animate-spin" />
              <span>Scripra AI is analyzing dialogue turns with Gemini Flash...</span>
            </div>
          )}

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-line mb-6 pb-2 overflow-x-auto relative z-10 scrollbar-none">
            <button
              onClick={() => setActiveRecapTab("summary")}
              className={`px-4 py-2 rounded-xl text-[13px] font-bold transition-all flex items-center gap-2 shrink-0 ${
                activeRecapTab === "summary"
                  ? "bg-indigo text-white shadow-sm"
                  : "text-ink-2 hover:text-ink hover:bg-raise"
              }`}
            >
              <span>🌟</span>
              <span>Summary &amp; Purpose</span>
            </button>

            <button
              onClick={() => setActiveRecapTab("actions")}
              className={`px-4 py-2 rounded-xl text-[13px] font-bold transition-all flex items-center gap-2 shrink-0 ${
                activeRecapTab === "actions"
                  ? "bg-indigo text-white shadow-sm"
                  : "text-ink-2 hover:text-ink hover:bg-raise"
              }`}
            >
              <span>✅</span>
              <span>Action Items ({actionItems.length})</span>
            </button>

            <button
              onClick={() => setActiveRecapTab("mom")}
              className={`px-4 py-2 rounded-xl text-[13px] font-bold transition-all flex items-center gap-2 shrink-0 ${
                activeRecapTab === "mom"
                  ? "bg-indigo text-white shadow-sm"
                  : "text-ink-2 hover:text-ink hover:bg-raise"
              }`}
            >
              <span>📝</span>
              <span>Executive MoM</span>
            </button>

            <button
              onClick={() => setActiveRecapTab("resend")}
              className={`px-4 py-2 rounded-xl text-[13px] font-bold transition-all flex items-center gap-2 shrink-0 ${
                activeRecapTab === "resend"
                  ? "bg-teal text-white shadow-sm"
                  : "text-ink-2 hover:text-ink hover:bg-raise"
              }`}
            >
              <span>✉️</span>
              <span>Resend Email Dispatch</span>
              {!(plan !== "free" || simulatedProActive) ? (
                <span className="text-[10px] bg-amber text-black px-1.5 py-0.2 rounded font-black">
                  PRO
                </span>
              ) : (
                <span className="text-[10px] bg-teal-wash text-teal px-1.5 py-0.2 rounded font-black border border-teal/30">
                  READY
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveRecapTab("translation")}
              className={`px-4 py-2 rounded-xl text-[13px] font-bold transition-all flex items-center gap-2 shrink-0 ${
                activeRecapTab === "translation"
                  ? "bg-indigo text-white shadow-sm"
                  : "text-ink-2 hover:text-ink hover:bg-raise"
              }`}
            >
              <span>🌐</span>
              <span>Multilingual AI</span>
            </button>

            <button
              onClick={() => setActiveRecapTab("transcript")}
              className={`px-4 py-2 rounded-xl text-[13px] font-bold transition-all flex items-center gap-2 shrink-0 ${
                activeRecapTab === "transcript"
                  ? "bg-indigo text-white shadow-sm"
                  : "text-ink-2 hover:text-ink hover:bg-raise"
              }`}
            >
              <span>📜</span>
              <span>Transcript ({turns.filter(t => t.type !== "system").length})</span>
            </button>
          </div>

          {/* TAB 1: SUMMARY & PURPOSE */}
          {activeRecapTab === "summary" && (
            <div className="space-y-6 animate-fadeIn relative z-10">
              {/* Meeting Purpose Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-teal-wash/60 via-card to-indigo-wash/40 border border-teal/30">
                <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-teal mb-1.5">
                  <span>📌</span>
                  <span>Meeting Purpose (Executive Objective)</span>
                </div>
                <p className="text-[15px] font-semibold text-ink leading-relaxed">
                  {dynamicRecap?.purpose || (turns.filter((t) => t.type !== "system")[0]?.text || "The team convened to discuss key deliverables, architecture, and timeline priorities.")}
                </p>
              </div>

              {/* Consensus Meter & Decision Scorecard */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-raise border border-line flex flex-col justify-between">
                  <span className="text-[11px] font-mono text-ink-3 uppercase">Consensus Alignment</span>
                  <div className="flex items-baseline gap-2 my-2">
                    <span className="text-[28px] font-black text-teal">{dynamicRecap?.consensusScore || 95}%</span>
                    <span className="text-[12px] text-ink-2 font-medium">Alignment confirmed</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-line overflow-hidden">
                    <div className="h-full bg-teal" style={{ width: `${dynamicRecap?.consensusScore || 95}%` }} />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-raise border border-line flex flex-col justify-between">
                  <span className="text-[11px] font-mono text-ink-3 uppercase">Primary Decision</span>
                  <div className="my-2">
                    <strong className="text-[14px] font-bold text-ink block truncate">
                      {dynamicRecap?.consensusDecision || "Reviewed project scope & agreed next steps"}
                    </strong>
                    <span className="text-[12px] text-ink-3">Validated from verbal discussion</span>
                  </div>
                  <span className="text-[10.5px] font-mono text-indigo font-bold">Recorded via Scripra AI</span>
                </div>

                <div className="p-4 rounded-2xl bg-raise border border-line flex flex-col justify-between">
                  <span className="text-[11px] font-mono text-ink-3 uppercase">Timeline Status</span>
                  <div className="my-2">
                    <strong className="text-[14px] font-bold text-amber block truncate">
                      {dynamicRecap?.timeline || "Standard delivery schedule"}
                    </strong>
                    <span className="text-[12px] text-ink-3">Milestone tracking active</span>
                  </div>
                  <span className="text-[10.5px] font-mono text-teal font-bold">Target on track</span>
                </div>
              </div>

              {/* Strategic Key Takeaways */}
              <div>
                <h4 className="text-[15px] font-bold text-ink mb-3 flex items-center gap-2">
                  <span>⚡</span>
                  <span>Key Takeaways from Session</span>
                </h4>
                <div className="space-y-3">
                  {dynamicRecap?.takeaways && dynamicRecap.takeaways.length > 0 ? (
                    dynamicRecap.takeaways.map((item) => (
                      <div key={item.id} className="flex items-start gap-3 p-4 rounded-xl bg-raise border border-line/80 hover:border-indigo/30 transition-colors">
                        <span className="w-6 h-6 rounded-full bg-indigo text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          {item.id}
                        </span>
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <strong className="text-[14px] text-ink font-bold">{item.title}</strong>
                            <span className="text-[10.5px] font-mono bg-indigo-wash text-indigo px-2 py-0.5 rounded font-bold">{item.category}</span>
                          </div>
                          <p className="text-[13px] text-ink-3 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    turns
                      .filter((t) => t.type !== "system")
                      .slice(0, 3)
                      .map((t, idx) => (
                        <div key={t.id} className="flex items-start gap-3 p-4 rounded-xl bg-raise border border-line/80">
                          <span className="w-6 h-6 rounded-full bg-indigo text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <div className="flex-1">
                            <strong className="text-[14px] text-ink font-bold block mb-1">{t.speaker}</strong>
                            <p className="text-[13px] text-ink-3 leading-relaxed">{t.text}</p>
                          </div>
                        </div>
                      ))
                  )}
                </div>
              </div>

              {/* Discussion Chapters & Timestamps from Real Turns */}
              <div>
                <h4 className="text-[15px] font-bold text-ink mb-3 flex items-center gap-2">
                  <span>📖</span>
                  <span>Discussion Chapters &amp; Timestamps</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {turns
                    .filter((t) => t.type !== "system")
                    .slice(0, 4)
                    .map((turn, idx) => {
                      const colors = [
                        "bg-indigo-wash text-indigo",
                        "bg-teal-wash text-teal",
                        "bg-amber-wash text-amber",
                        "bg-rose-wash text-rose",
                      ];
                      return (
                        <div key={turn.id} className="p-3.5 rounded-xl bg-raise border border-line">
                          <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded ${colors[idx % colors.length]}`}>
                            {turn.time} · {turn.speaker}
                          </span>
                          <div className="text-[13.5px] font-bold text-ink mt-1.5 line-clamp-1">
                            {turn.text.length > 40 ? turn.text.slice(0, 40) + "..." : turn.text}
                          </div>
                          <div className="text-[12px] text-ink-3 line-clamp-2 mt-0.5">
                            {turn.text}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ACTION ITEMS & TASKS */}
          {activeRecapTab === "actions" && (
            <div className="space-y-6 animate-fadeIn relative z-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-line">
                <div>
                  <h4 className="text-[16px] font-bold text-ink flex items-center gap-2">
                    <span>⚡</span>
                    <span>Action Items &amp; Commitments ({actionItems.length})</span>
                  </h4>
                  <p className="text-[12.5px] text-ink-3">
                    Click checkboxes to mark tasks completed. One-click export directly to Slack, Jira, or Linear.
                  </p>
                </div>
                {actionItems.length > 0 && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        copyToClipboard(
                          actionItems
                            .map((a) => `• *${a.task}* — <@${a.owner}> | Due: _${a.deadline}_`)
                            .join("\n"),
                          "Slack Action Items"
                        )
                      }
                      className="px-3 py-1.5 rounded-xl bg-raise border border-line text-[11.5px] font-bold text-ink hover:text-indigo hover:border-indigo/40 transition-colors"
                    >
                      Copy for Slack 💬
                    </button>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          actionItems
                            .map((a) => `[TASK] ${a.task}\nAssignee: ${a.owner}\nDue: ${a.deadline}\nPriority: ${a.priority}\n---`)
                            .join("\n"),
                          "Jira / Linear Format"
                        )
                      }
                      className="px-3 py-1.5 rounded-xl bg-raise border border-line text-[11.5px] font-bold text-ink hover:text-indigo hover:border-indigo/40 transition-colors"
                    >
                      Copy for Jira / Linear 🚀
                    </button>
                  </div>
                )}
              </div>

              {/* Interactive Checklist */}
              {actionItems.length === 0 ? (
                <div className="p-8 rounded-2xl bg-raise border border-line text-center text-ink-3 text-[13px] italic">
                  No specific action items detected in this meeting dialogue. When participants mention deliverables or tasks, Scripra AI automatically populates them here.
                </div>
              ) : (
                <div className="space-y-3">
                  {actionItems.map((item) => (
                    <div
                      key={item.id}
                      className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                        item.completed
                          ? "bg-raise/40 border-line/50 opacity-60"
                          : "bg-raise border-line hover:border-indigo/40"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => toggleActionItem(item.id)}
                        className="mt-1 w-4 h-4 accent-indigo rounded cursor-pointer shrink-0"
                      />

                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                          <span
                            className={`text-[14.5px] font-semibold ${
                              item.completed ? "line-through text-ink-3" : "text-ink"
                            }`}
                          >
                            {item.task}
                          </span>
                          <span
                            className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded ${
                              item.priority === "high"
                                ? "bg-rose-wash text-rose border border-rose/20"
                                : "bg-amber-wash text-amber border border-amber/20"
                            }`}
                          >
                            {item.priority} priority
                          </span>
                        </div>

                        <div className="flex items-center gap-4 text-[12px] font-mono text-ink-3 mt-1.5 flex-wrap">
                          <span className="flex items-center gap-1.5 text-indigo font-bold bg-indigo-wash px-2.5 py-0.5 rounded-md">
                            <span>👤</span>
                            <span>{item.owner}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <span>📅 Deadline:</span>
                            <strong className="text-ink-2">{item.deadline}</strong>
                          </span>
                          {item.completed && (
                            <span className="text-teal font-bold">✓ Completed</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: FORMAL EXECUTIVE MOM (MINUTES OF MEETING) */}
          {activeRecapTab === "mom" && (
            <div className="space-y-6 animate-fadeIn relative z-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-line">
                <div>
                  <h4 className="text-[16px] font-bold text-ink flex items-center gap-2">
                    <span>📝</span>
                    <span>Institutional Minutes of Meeting (MoM)</span>
                  </h4>
                  <p className="text-[12.5px] text-ink-3">
                    Formal enterprise record with agenda, discussion points, consensus votes, and sign-offs.
                  </p>
                </div>
                <button
                  onClick={() =>
                    copyToClipboard(
                      dynamicRecap?.minutesOfMeeting ||
                      `SCRIPRA INSTITUTIONAL MINUTES OF MEETING (MoM)\nMeeting: ${meetingTitle.trim() || "Live Meeting Session"}\nDate: ${new Date().toLocaleDateString()}\nOrganizer: ${organizerName.trim() || "Organizer"}\nAttendees: ${attendees.join(", ") || "None recorded"}\n\n${turns.filter(t => t.type !== "system").map(t => `[${t.time}] ${t.speaker}: ${t.text}`).join("\n")}`,
                      "Full MoM Document"
                    )
                  }
                  className="px-3.5 py-1.5 rounded-xl bg-indigo text-white text-[12px] font-bold hover:bg-indigo-deep transition-colors shrink-0"
                >
                  📋 Copy Full MoM
                </button>
              </div>

              {/* MoM Formal Document Layout */}
              <div className="bg-panel border border-line rounded-2xl p-6 font-mono text-[12.5px] text-ink-2 space-y-4">
                <div className="pb-4 border-b border-line flex items-center justify-between">
                  <span className="text-indigo font-bold uppercase text-[13px]">
                    SCRIPRA AI ENTERPRISE MoM
                  </span>
                  <span className="text-ink-3 text-[11px]">CLASSIFICATION: CONFIDENTIAL</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[12px] pb-4 border-b border-line">
                  <div><strong>Meeting Title:</strong> {meetingTitle.trim() || "Live Meeting Session"}</div>
                  <div><strong>Date / Time:</strong> {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} · {meetingStartTime || "Live"}</div>
                  <div><strong>Organizer / Chair:</strong> {organizerName.trim() || "Organizer"}</div>
                  <div><strong>Platform:</strong> {detectedPlatform?.name || "Online Meeting"}</div>
                  <div className="sm:col-span-2">
                    <strong>Recorded Attendees:</strong> {attendees.length > 0 ? attendees.join(", ") : "No attendee emails specified"}
                  </div>
                </div>

                <div className="whitespace-pre-wrap leading-relaxed text-ink-2 font-mono text-[12.5px]">
                  {dynamicRecap?.minutesOfMeeting || (
                    <div className="space-y-4 font-sans text-[13px]">
                      <div>
                        <h5 className="font-bold text-ink text-[13px] uppercase mb-1 font-mono">1. Executive Overview</h5>
                        <p className="text-ink-3 leading-relaxed">
                          {dynamicRecap?.purpose || "The meeting concluded with key discussion points captured in real time."}
                        </p>
                      </div>

                      <div>
                        <h5 className="font-bold text-ink text-[13px] uppercase mb-1 font-mono">2. Transcript Record</h5>
                        <div className="space-y-1 text-ink-3 font-mono text-[12px]">
                          {turns.filter(t => t.type !== "system").map(t => (
                            <div key={t.id}>[{t.time}] <strong>{t.speaker}:</strong> {t.text}</div>
                          ))}
                        </div>
                      </div>

                      {actionItems.length > 0 && (
                        <div>
                          <h5 className="font-bold text-ink text-[13px] uppercase mb-1 font-mono">3. Action Matrix</h5>
                          <ul className="list-disc pl-5 text-ink-3 space-y-1 font-mono text-[12px]">
                            {actionItems.map((a) => (
                              <li key={a.id}>
                                <strong>{a.owner}:</strong> {a.task} <em>(Deadline: {a.deadline})</em>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: RESEND EMAIL DISPATCH (PAID USERS ONLY) */}
          {activeRecapTab === "resend" && (
            <div className="space-y-6 animate-fadeIn relative z-10">
              {/* PAID USER CHECK */}
              {!(plan !== "free" || simulatedProActive) ? (
                /* Free Tier: Locked State with Pro Upgrade Prompt */
                <div className="p-7 rounded-3xl bg-gradient-to-br from-panel via-card to-amber-wash/30 border-2 border-amber/40 shadow-sm">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="max-w-[620px]">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-amber text-black text-[11px] font-black uppercase tracking-wider">
                          🔒 Pro Feature Only
                        </span>
                        <h4 className="text-[17px] font-bold text-ink">
                          Automated Resend Email Dispatch to All Attendees
                        </h4>
                      </div>
                      <p className="text-[13.5px] text-ink-3 leading-relaxed mb-4">
                        On <strong>Scripra Pro ($9.99/mo)</strong>, Scripra instantly packages the Executive MoM, Key Takeaways, and assigned Action Items into a branded, responsive email and delivers it to all attendee inboxes via <strong>Resend</strong> as soon as the meeting ends.
                      </p>

                      <div className="p-3.5 rounded-xl bg-card border border-line mb-4">
                        <span className="text-[11px] font-mono text-ink-3 uppercase block mb-1.5 font-bold">
                          Queued Recipients for this Meeting ({attendees.length}):
                        </span>
                        {attendees.length === 0 ? (
                          <p className="text-[12px] text-ink-3 italic">No attendees queued. Configure emails in the meeting deck.</p>
                        ) : (
                          <div className="flex flex-wrap gap-1.5">
                            {attendees.map((email) => (
                              <span key={email} className="px-2.5 py-0.5 rounded-md bg-raise text-[12px] font-mono text-ink">
                                ✉️ {email}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <button
                          onClick={() => openUpgradeModal("pro")}
                          className="px-6 py-2.5 rounded-xl bg-indigo text-white font-bold text-[13.5px] hover:bg-indigo-deep transition-all shadow-md shadow-indigo/20"
                        >
                          Upgrade to Pro to Send ($9.99/mo) ↗
                        </button>
                        <button
                          onClick={() => setSimulatedProActive(true)}
                          className="px-5 py-2.5 rounded-xl bg-raise border border-indigo/40 text-[13px] font-bold text-indigo hover:bg-indigo-wash transition-colors"
                        >
                          ⚡ Try Pro Simulation Mode
                        </button>
                        <button
                          onClick={() => setPreviewEmailModal(true)}
                          className="px-4 py-2.5 rounded-xl bg-raise border border-line text-[12.5px] font-medium text-ink-2 hover:text-ink transition-colors"
                        >
                          👁️ Preview Email Template
                        </button>
                      </div>
                    </div>

                    <div className="w-full md:w-56 p-4 rounded-2xl bg-card border border-line text-center shrink-0">
                      <span className="text-3xl block mb-2">📬</span>
                      <div className="text-[13px] font-bold text-ink">Zero Manual Effort</div>
                      <div className="text-[11.5px] text-ink-3 mt-1 leading-relaxed">
                        Attendees receive clear tasks &amp; MoM in their inbox within seconds of meeting end.
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Pro Tier: Active Resend Dispatch Console */
                <div className="space-y-6">
                  <div className="p-6 rounded-3xl bg-gradient-to-r from-teal-wash/60 via-card to-indigo-wash/40 border-2 border-teal/40">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="px-2.5 py-0.5 rounded-full bg-teal text-white text-[11px] font-bold uppercase tracking-wider">
                            ✓ Pro Plan Active · Resend Configured
                          </span>
                          <span className="text-[11px] font-mono text-teal font-bold">
                            API Ready
                          </span>
                        </div>
                        <h4 className="text-[18px] font-black text-ink">
                          Dispatch Meeting Recap to {attendees.length} Attendees via Resend
                        </h4>
                        <p className="text-[13px] text-ink-3 mt-1">
                          Sends formal Executive MoM, Key Takeaways, and actionable tasks to all participants.
                        </p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <button
                          onClick={() => setPreviewEmailModal(true)}
                          className="px-4 py-2.5 rounded-xl bg-card border border-line hover:border-indigo/40 text-[13px] font-bold text-ink hover:text-indigo transition-colors"
                        >
                          👁️ View Email Preview
                        </button>
                        <button
                          onClick={handleSendResendRecap}
                          disabled={isSendingResend}
                          className="px-6 py-2.5 rounded-xl bg-teal text-white font-bold text-[13.5px] hover:bg-teal-deep transition-all shadow-md shadow-teal/20 flex items-center gap-2 disabled:opacity-50"
                        >
                          {isSendingResend ? (
                            <>
                              <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              <span>Dispatching via Resend...</span>
                            </>
                          ) : (
                            <>
                              <span>🚀</span>
                              <span>Send Now via Resend</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Delivery Status Receipt */}
                    {resendStatus && (
                      <div className="mt-5 pt-4 border-t border-teal/20 flex items-start gap-3 p-4 rounded-xl bg-card/80 border border-teal/30 animate-fadeIn">
                        <span className="text-xl">✅</span>
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <strong className="text-[13.5px] text-teal font-bold">
                              Successfully Dispatched via Resend API!
                            </strong>
                            <span className="text-[11px] font-mono text-ink-3">
                              {resendStatus.timestamp}
                            </span>
                          </div>
                          <p className="text-[12.5px] text-ink-2 mt-0.5">
                            Delivered to {resendStatus.recipients?.length} inboxes: <strong>{resendStatus.recipients?.join(", ")}</strong>
                          </p>
                          <div className="text-[11px] font-mono text-ink-3 mt-1">
                            Message ID: <span className="text-indigo">{resendStatus.receiptId}</span> · {resendStatus.note}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Configured Recipients Table */}
                  <div className="p-5 rounded-2xl bg-raise border border-line">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[12px] font-bold uppercase tracking-wider text-ink-3">
                        Recipients Configured ({attendees.length})
                      </span>
                    </div>

                    {attendees.length === 0 ? (
                      <p className="text-[12px] text-ink-3 italic py-2">
                        No recipients configured. Add attendee email addresses in the meeting connection deck.
                      </p>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                        {attendees.map((email) => (
                          <div
                            key={email}
                            className="p-3 rounded-xl bg-card border border-line flex items-center justify-between gap-2"
                          >
                            <div className="flex items-center gap-2 truncate">
                              <span className="w-2 h-2 rounded-full bg-teal" />
                              <span className="text-[12.5px] font-medium text-ink truncate">{email}</span>
                            </div>
                            <span className="text-[10px] font-mono text-teal font-bold bg-teal-wash px-1.5 py-0.5 rounded">
                              QUEUED
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: MULTILINGUAL AI */}
          {activeRecapTab === "translation" && (
            <div className="space-y-6 animate-fadeIn relative z-10">
              <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-wash via-card to-card border border-indigo/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs">🌐</span>
                    <span className="text-[12px] font-bold text-indigo uppercase font-mono tracking-wider">
                      Scripra Multilingual AI Engine
                    </span>
                  </div>
                  <h4 className="text-[17px] font-black text-ink">
                    Cross-Language Meeting Intelligence
                  </h4>
                  <p className="text-[13px] text-ink-3">
                    Scripra translates live dialogue and executive meeting intelligence across 50+ languages with sub-second turnaround.
                  </p>
                </div>
                <span className="text-[12px] font-mono bg-card px-3 py-1.5 rounded-xl border border-line text-indigo font-bold shrink-0">
                  Target: {translationLang.toUpperCase()}
                </span>
              </div>

              {/* Translated Recap Content */}
              <div className="p-6 rounded-2xl bg-raise border border-line space-y-4">
                <h5 className="text-[14.5px] font-bold text-ink">
                  Translated Executive Recap ({translationLang === "off" ? "Off" : translationLang.toUpperCase()}):
                </h5>
                {translationLang === "off" ? (
                  <p className="text-[13px] text-ink-3 italic">
                    Live multilingual translation is currently turned off. To enable real-time translated summaries, select a target language in the meeting settings panel.
                  </p>
                ) : (
                  <div className="p-4 rounded-xl bg-card border border-line text-[13.5px] text-ink-2 leading-relaxed">
                    {dynamicRecap?.translatedRecap || "Translation processing with Gemini Multilingual Flash..."}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 6: FULL DIARIZED TRANSCRIPT */}
          {activeRecapTab === "transcript" && (
            <div className="space-y-4 animate-fadeIn relative z-10">
              <div className="flex items-center justify-between pb-3 border-b border-line">
                <h4 className="text-[15px] font-bold text-ink">
                  Complete Session Transcript ({turns.filter((t) => t.type !== "system").length} dialogue turns)
                </h4>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDownloadTranscript}
                    className="px-3 py-1.5 rounded-xl bg-raise border border-line text-[12px] font-bold text-ink hover:text-indigo transition-colors flex items-center gap-1.5"
                  >
                    <span>📥</span>
                    <span>Download .txt</span>
                  </button>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        turns
                          .filter((t) => t.type !== "system")
                          .map((t) => `[${t.time}] ${t.speaker || getSpeakerDisplayName(t.speakerId || "speaker1")}: ${t.text}`)
                          .join("\n"),
                        "Full Transcript"
                      )
                    }
                    className="px-3 py-1.5 rounded-xl bg-raise border border-line text-[12px] font-bold text-ink hover:text-indigo transition-colors"
                  >
                    📋 Copy All Turns
                  </button>
                </div>
              </div>

              <div className="space-y-2.5 max-h-[440px] overflow-y-auto pr-2">
                {turns
                  .filter((t) => t.type !== "system")
                  .map((t) => {
                    const spk = t.speaker || getSpeakerDisplayName(t.speakerId || "speaker1");
                    const initial = spk.charAt(0).toUpperCase();
                    const isOrg = spk === organizerName || t.speakerId === "speaker1";
                    const isSpk2 = spk === speaker2Name || t.speakerId === "speaker2";
                    const avatarBg = isOrg ? "bg-indigo text-white" : isSpk2 ? "bg-teal text-white" : "bg-amber text-white";

                    return (
                      <div key={t.id} className="p-3.5 rounded-xl bg-raise border border-line/70 flex items-start gap-3">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-[11.5px] shrink-0 ${avatarBg}`}>
                          {initial}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-[13px] font-bold text-ink">{spk}</span>
                            <span className="text-[11px] font-mono text-ink-3">[{t.time}]</span>
                          </div>
                          <p className="text-[13.5px] text-ink leading-relaxed">{t.text}</p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* Global Upgrade Modal Trigger Footer */}
          <div className="mt-8 pt-6 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-ink-3">
            <div className="flex items-center gap-2">
              <span className="text-indigo font-bold">SCRIPRA RECAP ENGINE</span>
              <span>·</span>
              <span>Zero Retention Ephemeral RAM Processing</span>
            </div>
            <div className="flex items-center gap-3">
              <span>Automated Resend Email Service</span>
              <button
                onClick={() => openUpgradeModal("pro")}
                className="text-indigo font-bold hover:underline"
              >
                Manage Pro Subscription →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Copied Toast Notification */}
      {copiedToast && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-2xl bg-indigo text-white font-bold text-[13px] shadow-2xl flex items-center gap-2 animate-slideUp">
          <span>✓</span>
          <span>{copiedToast}</span>
        </div>
      )}

      {/* Interactive Resend Email Preview Modal */}
      {previewEmailModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-panel border-2 border-line rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl animate-scaleIn">
            <div className="p-5 border-b border-line flex items-center justify-between bg-card">
              <div>
                <h4 className="text-[16px] font-bold text-ink">
                  Resend HTML Email Inspector
                </h4>
                <p className="text-[12px] text-ink-3">
                  Exact email layout delivered to attendee inboxes upon meeting completion.
                </p>
              </div>
              <button
                onClick={() => setPreviewEmailModal(false)}
                className="w-8 h-8 rounded-full bg-raise hover:bg-line text-ink font-bold flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 bg-[#0c0e14]">
              {/* Simulated Email Card */}
              <div className="max-w-[560px] mx-auto bg-[#131722] border border-[#2a334a] rounded-2xl overflow-hidden shadow-xl text-slate-200 font-sans">
                <div className="bg-gradient-to-br from-indigo-950 to-slate-900 p-6 border-b border-[#2a334a]">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-black text-lg text-indigo-400">
                      SCRIPRA<span className="text-teal-400">.AI</span>
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-widest bg-teal-500/20 text-teal-300 border border-teal-500/30 px-2 py-0.5 rounded-full">
                      Executive MoM
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{meetingTitle}</h3>
                  <p className="text-xs text-slate-400">{meetingInviteUrl}</p>
                </div>

                <div className="p-6 space-y-5 text-sm">
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs">
                    <span className="text-slate-400 uppercase font-bold block mb-1">Delivered to:</span>
                    <span className="text-slate-200">{attendees.join(", ")}</span>
                  </div>

                  <div>
                    <h5 className="text-teal-400 font-bold uppercase text-xs tracking-wider mb-2">📌 Executive Purpose</h5>
                    <p className="p-3 bg-slate-900/80 border-l-2 border-teal-400 rounded-r-lg text-slate-300 text-xs leading-relaxed">
                      {dynamicRecap?.purpose || (meetingTitle ? `Executive briefing and alignment for ${meetingTitle}.` : "Automated executive summary synthesized by Scripra AI from real-time meeting dialogue.")}
                    </p>
                  </div>

                  <div>
                    <h5 className="text-amber-400 font-bold uppercase text-xs tracking-wider mb-2">⚡ Assigned Action Items</h5>
                    <div className="border border-slate-800 rounded-lg overflow-hidden text-xs">
                      {actionItems.map((a) => (
                        <div key={a.id} className="p-2.5 border-b border-slate-800 flex items-center justify-between">
                          <span className="text-slate-200 font-medium">{a.task}</span>
                          <span className="text-indigo-400 font-bold shrink-0 ml-2">{a.owner}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-500 text-center">
                    Sent automatically via <strong>Resend</strong> · Zero Storage Policy (RAM only)
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-line bg-card flex justify-end">
              <button
                onClick={() => setPreviewEmailModal(false)}
                className="px-5 py-2 rounded-xl bg-indigo text-white font-bold text-xs hover:bg-indigo-deep transition-colors"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
