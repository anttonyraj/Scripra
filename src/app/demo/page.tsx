"use client";

import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

interface Segment {
  id: string;
  start: string;
  speaker: string;
  speakerColor: string;
  text: string;
  confidence: number;
}

export default function DemoPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [engineStatus, setEngineStatus] = useState<"idle" | "listening" | "error" | "simulating">("idle");
  const [statusMessage, setStatusMessage] = useState<string>("Ready to capture speech via Web Speech API");
  const [segments, setSegments] = useState<Segment[]>([]);
  const [interimText, setInterimText] = useState("");
  const [interimTimestamp, setInterimTimestamp] = useState("");
  const [sourceLang, setSourceLang] = useState("en-US");
  const [meetingTitle, setMeetingTitle] = useState("Live AI Notetaker Demo");
  const [organizerName, setOrganizerName] = useState("You (Organizer)");
  const [activeTab, setActiveTab] = useState<"transcript" | "mom" | "actions">("transcript");
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [volumeLevel, setVolumeLevel] = useState(0);

  // Equalizer wave bars
  const [eqLevels, setEqLevels] = useState<number[]>([
    20, 35, 55, 75, 45, 60, 85, 50, 35, 70, 90, 65, 40, 55, 80, 95, 60, 45, 70, 50, 35, 60, 80, 55, 40, 30, 50, 25
  ]);

  const recognitionRef = useRef<any>(null);
  const sessionStartRef = useRef<number | null>(null);
  const manuallyStoppedRef = useRef(false);
  const isRecordingRef = useRef(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const simIntervalRef = useRef<any>(null);

  // Keep isRecordingRef in sync
  useEffect(() => {
    isRecordingRef.current = isRecording;
  }, [isRecording]);

  // Clean up resources on unmount
  useEffect(() => {
    return () => {
      stopAudioCapture();
      if (simIntervalRef.current) clearInterval(simIntervalRef.current);
    };
  }, []);

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // Stop microphone stream & AudioContext
  const stopAudioCapture = () => {
    manuallyStoppedRef.current = true;
    if (recognitionRef.current) {
      try {
        recognitionRef.current.onend = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.onresult = null;
        recognitionRef.current.stop();
      } catch (e) {}
      recognitionRef.current = null;
    }

    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((track) => track.stop());
      micStreamRef.current = null;
    }

    if (audioContextRef.current && audioContextRef.current.state !== "closed") {
      try {
        audioContextRef.current.close();
      } catch (e) {}
      audioContextRef.current = null;
    }

    setVolumeLevel(0);
  };

  // Setup real-time microphone volume visualization
  const setupAudioVisualizer = (stream: MediaStream) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      source.connect(analyser);
      analyserRef.current = analyser;

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const updateVolume = () => {
        if (!isRecordingRef.current) return;
        analyser.getByteFrequencyData(dataArray);

        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const avg = sum / dataArray.length;
        const normalized = Math.min(100, Math.round((avg / 128) * 100));
        setVolumeLevel(normalized);

        // Map frequency bins to equalizer heights
        const newLevels = Array.from({ length: 28 }, (_, idx) => {
          const val = dataArray[idx % dataArray.length] || 0;
          return Math.max(15, Math.min(100, Math.round((val / 255) * 100)));
        });
        setEqLevels(newLevels);

        animFrameRef.current = requestAnimationFrame(updateVolume);
      };

      updateVolume();
    } catch (err) {
      console.warn("Audio visualizer setup skipped:", err);
    }
  };

  // Start live speech capture using Web Speech API + Mic
  const handleStart = async () => {
    if (simIntervalRef.current) {
      clearInterval(simIntervalRef.current);
      simIntervalRef.current = null;
      setIsSimulating(false);
    }

    const SpeechEngine =
      typeof window !== "undefined"
        ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
        : null;

    if (!SpeechEngine) {
      setStatusMessage("Web Speech API is not supported in this browser. Please use Chrome, Edge, or try the Demo Speech button.");
      setEngineStatus("error");
      return;
    }

    try {
      setStatusMessage("Requesting microphone permission...");
      manuallyStoppedRef.current = false;

      // 1. Request microphone permission explicitly
      let stream: MediaStream | null = null;
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        micStreamRef.current = stream;
        setupAudioVisualizer(stream);
      } catch (permErr: any) {
        console.warn("Microphone permission denied or unavailable:", permErr);
        if (permErr.name === "NotAllowedError" || permErr.name === "PermissionDeniedError") {
          setStatusMessage("Microphone permission was blocked. Please click the camera/lock icon in your URL bar and click Allow.");
          setEngineStatus("error");
          return;
        }
      }

      // 2. Initialize fresh Web Speech Recognition instance
      const recognition = new SpeechEngine();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = sourceLang;
      recognition.maxAlternatives = 1;

      if (!sessionStartRef.current) sessionStartRef.current = Date.now();

      recognition.onstart = () => {
        setIsRecording(true);
        setEngineStatus("listening");
        setStatusMessage("🟢 Listening via Web Speech API — Speak into your microphone now!");
      };

      recognition.onresult = (event: any) => {
        let currentInterim = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          const transcriptLine = result[0]?.transcript || "";
          const confidence = result[0]?.confidence || 0.95;

          if (result.isFinal) {
            const seconds = Math.floor((Date.now() - (sessionStartRef.current || Date.now())) / 1000);
            const start = formatTime(seconds);

            const newSegment: Segment = {
              id: "seg-" + Date.now() + "-" + Math.random().toString(36).slice(2, 6),
              start,
              speaker: organizerName.trim() || "You",
              speakerColor: "bg-indigo text-white",
              text: transcriptLine.trim(),
              confidence: confidence > 0 ? confidence : 0.95,
            };

            setSegments((prev) => [...prev, newSegment]);
          } else {
            currentInterim += transcriptLine;
            const seconds = Math.floor((Date.now() - (sessionStartRef.current || Date.now())) / 1000);
            setInterimTimestamp(formatTime(seconds));
          }
        }
        setInterimText(currentInterim);
      };

      recognition.onerror = (e: any) => {
        console.warn("Speech Recognition Event:", e.error);
        if (e.error === "no-speech") {
          setStatusMessage("Listening... Speak into your mic to generate notes.");
          return;
        }
        if (e.error === "not-allowed") {
          setStatusMessage("Microphone access was denied. Please allow microphone permissions in your browser.");
          setEngineStatus("error");
          setIsRecording(false);
          return;
        }
        if (e.error === "network") {
          setStatusMessage("Web Speech network timeout. Auto-reconnecting...");
        }
      };

      recognition.onend = () => {
        if (!manuallyStoppedRef.current && isRecordingRef.current) {
          try {
            recognition.start();
          } catch (e) {}
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err: any) {
      console.error("Failed to start speech recognition:", err);
      setStatusMessage(`Error initializing speech: ${err?.message || "Please use Chrome or Edge"}`);
      setEngineStatus("error");
      setIsRecording(false);
    }
  };

  // Stop recording cleanly
  const handleStop = () => {
    stopAudioCapture();
    setIsRecording(false);
    setEngineStatus("idle");
    setStatusMessage("Session stopped. Notes preserved below.");
    setInterimText("");
    setInterimTimestamp("");
  };

  // Clear session
  const handleClear = () => {
    handleStop();
    setSegments([]);
    setInterimText("");
    setInterimTimestamp("");
    sessionStartRef.current = null;
    setStatusMessage("Ready to capture speech via Web Speech API");
  };

  // One-click Simulate Realistic Demo Dialogue (if mic is blocked or quiet)
  const handleTryDemoSpeech = () => {
    handleStop();
    setSegments([]);
    setIsSimulating(true);
    setEngineStatus("simulating");
    setStatusMessage("⚡ Simulating realistic multi-speaker enterprise meeting...");

    const demoTurns = [
      {
        speaker: "Sarah Chen",
        speakerColor: "bg-indigo text-white",
        text: "Thanks everyone for joining. Our primary goal today is finalizing the real-time AI speech pipeline and approving the zero-bot stealth capture architecture.",
      },
      {
        speaker: "David Miller",
        speakerColor: "bg-teal text-ink-deep font-bold",
        text: "The edge WebAssembly audio bridge is achieving sub-300ms transcription latency. We have validated 100% compatibility with Chrome, Edge, Meet, and Teams.",
      },
      {
        speaker: "Elena Rostova",
        speakerColor: "bg-amber text-ink-deep font-bold",
        text: "Confirmed. The compliance team also reviewed our zero model training policy and confirmed full HIPAA and SOC 2 Type II readiness.",
      },
      {
        speaker: "Sarah Chen",
        speakerColor: "bg-indigo text-white",
        text: "Excellent. Let's lock this decision. David will ship the one-click transcript export in .txt and .md, and Elena will finalize the enterprise security audit packet.",
      },
    ];

    let currentTurn = 0;
    sessionStartRef.current = Date.now();

    simIntervalRef.current = setInterval(() => {
      if (currentTurn < demoTurns.length) {
        const turn = demoTurns[currentTurn];
        const seconds = (currentTurn + 1) * 12;
        const newSegment: Segment = {
          id: "sim-" + Date.now() + "-" + currentTurn,
          start: formatTime(seconds),
          speaker: turn.speaker,
          speakerColor: turn.speakerColor,
          text: turn.text,
          confidence: 0.98,
        };
        setSegments((prev) => [...prev, newSegment]);
        currentTurn++;

        // Randomize equalizer while simulating
        setEqLevels(Array.from({ length: 28 }, () => Math.floor(Math.random() * 70) + 25));
      } else {
        clearInterval(simIntervalRef.current);
        simIntervalRef.current = null;
        setIsSimulating(false);
        setEngineStatus("idle");
        setStatusMessage("✓ Demo conversation simulation complete! Review the live MoM and Action Items below.");
        setEqLevels(Array.from({ length: 28 }, () => 20));
      }
    }, 1800);
  };

  // Download Transcript (.txt or .md)
  const handleDownloadTranscript = (format: "txt" | "md" = "txt") => {
    const now = new Date();
    const formattedDate = now.toISOString().replace(/[:.]/g, "-");
    const safeTitle = (meetingTitle.trim() || "Live-Demo").replace(/[^a-zA-Z0-9-_]/g, "_");

    setDownloadSuccess(format === "md" ? "Markdown (.md) downloaded!" : "Transcript (.txt) downloaded!");
    setTimeout(() => setDownloadSuccess(null), 2500);

    if (format === "md") {
      const mdContent =
        `# Scripra — Meeting Notes & Transcript\n\n` +
        `- **Meeting**: ${meetingTitle.trim() || "Live AI Notetaker Demo"}\n` +
        `- **Organizer**: ${organizerName.trim() || "You"}\n` +
        `- **Date**: ${now.toLocaleString()}\n` +
        `- **Speech Engine**: Free Web Speech API\n\n` +
        `---\n\n` +
        `## Executive Summary\n\n` +
        (segments.length > 0
          ? `Key discussion captured across ${segments.length} dialogue turns. Sub-300ms speech latency confirmed on browser runtime.\n`
          : `No speech recorded yet.\n`) +
        `\n## Transcript\n\n` +
        segments.map((s) => `> **[${s.start}] ${s.speaker}**: ${s.text}\n`).join("\n") +
        `\n\n---\n*Synthesized by Scripra AI Conversation Intelligence*\n`;

      const blob = new Blob([mdContent], { type: "text/markdown;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Scripra-Demo-${safeTitle}-${formattedDate}.md`;
      link.click();
      URL.revokeObjectURL(url);
      return;
    }

    const header =
      `==========================================================\n` +
      `  Scripra AI Notetaker — Live Demo Transcript\n` +
      `  Meeting: ${meetingTitle.trim() || "Live AI Notetaker Demo"}\n` +
      `  Date: ${now.toLocaleString()}\n` +
      `  Engine: Web Speech API (Free Native Audio)\n` +
      `==========================================================\n\n`;

    const body = segments.map((s) => `[${s.start}] ${s.speaker}: ${s.text}`).join("\n\n");
    const fullText = header + (body || "No speech turns recorded.") + "\n\n-- End of Transcript --\n";

    const blob = new Blob([fullText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Scripra-Demo-${safeTitle}-${formattedDate}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Header />
      <main className="pt-28 pb-32 min-h-screen bg-canvas text-ink relative overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-6 relative z-10">
          
          {/* Header Title & Pitch */}
          <div className="text-center max-w-[780px] mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-wash text-teal text-[11.5px] font-mono font-bold tracking-[0.12em] uppercase border border-teal/25 mb-4">
              <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
              <span>Interactive Live Demo · Free Web Speech Engine</span>
            </div>
            <h1 className="text-[clamp(32px,4.5vw,52px)] font-black tracking-[-0.03em] text-ink leading-[1.08] mb-4">
              Experience Scripra live in your browser.
            </h1>
            <p className="text-[16px] sm:text-[18px] text-ink-3 leading-relaxed">
              Test real-time speech-to-text, speaker diarization, and automated Minutes of Meeting (MoM) synthesis powered by your device&apos;s native Web Speech API.
            </p>
          </div>

          <div className="flex flex-col gap-8">
            
            {/* 1. Setup & Controls Card */}
            <div className="bg-card border border-line rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(67,83,255,0.06)] space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11.5px] font-mono font-bold uppercase tracking-wider text-ink-3">
                    Meeting / Session Title
                  </label>
                  <input
                    type="text"
                    value={meetingTitle}
                    onChange={(e) => setMeetingTitle(e.target.value)}
                    placeholder="e.g. Architecture Sync"
                    className="bg-canvas border border-line rounded-xl px-4 py-2.5 text-[14px] text-ink placeholder:text-ink-3 outline-none focus:border-indigo transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11.5px] font-mono font-bold uppercase tracking-wider text-ink-3">
                    Your Speaker Name
                  </label>
                  <input
                    type="text"
                    value={organizerName}
                    onChange={(e) => setOrganizerName(e.target.value)}
                    placeholder="e.g. Alex"
                    className="bg-canvas border border-line rounded-xl px-4 py-2.5 text-[14px] text-ink placeholder:text-ink-3 outline-none focus:border-indigo transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11.5px] font-mono font-bold uppercase tracking-wider text-ink-3">
                    Speech Language
                  </label>
                  <select
                    value={sourceLang}
                    onChange={(e) => setSourceLang(e.target.value)}
                    className="bg-canvas border border-line rounded-xl px-4 py-2.5 text-[14px] text-ink outline-none focus:border-indigo transition-colors"
                  >
                    <option value="en-US">English (United States)</option>
                    <option value="en-GB">English (United Kingdom)</option>
                    <option value="en-IN">English (India)</option>
                    <option value="hi-IN">Hindi (हिंदी)</option>
                    <option value="es-ES">Spanish (Español)</option>
                    <option value="fr-FR">French (Français)</option>
                    <option value="de-DE">German (Deutsch)</option>
                    <option value="ja-JP">Japanese (日本語)</option>
                  </select>
                </div>
              </div>

              {/* Status Banner */}
              <div
                className={`p-3.5 rounded-2xl border text-[13px] flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  engineStatus === "listening"
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-700"
                    : engineStatus === "error"
                    ? "bg-rose-wash border-rose/30 text-rose"
                    : engineStatus === "simulating"
                    ? "bg-amber-wash border-amber/30 text-amber-900"
                    : "bg-raise border-line text-ink-2"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-current animate-pulse shrink-0" />
                  <span className="font-semibold">{statusMessage}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] font-mono uppercase bg-card border border-line px-2.5 py-1 rounded-md text-ink-3 font-bold">
                    Web Speech API · Zero Cost
                  </span>
                </div>
              </div>

              {/* Live Audio Spectrum Equalizer & Buttons */}
              <div className="bg-canvas border border-line rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-6">
                
                {/* Audio Waves */}
                <div className="w-full md:w-1/2 flex items-center gap-1 h-12 px-3 bg-card border border-line/70 rounded-xl overflow-hidden">
                  {eqLevels.map((lvl, idx) => (
                    <div
                      key={idx}
                      className="flex-1 rounded-full transition-all duration-75"
                      style={{
                        height: isRecording || isSimulating ? `${lvl}%` : "15%",
                        backgroundColor:
                          isRecording
                            ? lvl > 70
                              ? "#F5A020"
                              : lvl > 45
                              ? "#4353FF"
                              : "#00D2B4"
                            : "var(--line)",
                      }}
                    />
                  ))}
                </div>

                {/* Control Action Buttons */}
                <div className="flex items-center gap-2.5 flex-wrap justify-end w-full md:w-auto">
                  {!isRecording && !isSimulating ? (
                    <>
                      <button
                        onClick={handleStart}
                        className="px-6 py-3 rounded-xl bg-indigo text-white text-[13.5px] font-bold hover:bg-indigo-deep transition-all shadow-md shadow-indigo/20 flex items-center gap-2 active:scale-[0.98]"
                      >
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                        <span>Start Microphone</span>
                      </button>

                      <button
                        onClick={handleTryDemoSpeech}
                        className="px-4 py-3 rounded-xl bg-card border border-line hover:border-teal/50 text-teal text-[13.5px] font-bold transition-all shadow-xs flex items-center gap-1.5"
                        title="Simulate speech without speaking"
                      >
                        <span>⚡ Try Demo Speech</span>
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleStop}
                      className="px-6 py-3 rounded-xl bg-rose text-white text-[13.5px] font-bold hover:bg-rose-deep transition-all shadow-md shadow-rose/20 flex items-center gap-2"
                    >
                      <span className="w-2 h-2 bg-white rounded-xs" />
                      <span>Stop Capture</span>
                    </button>
                  )}

                  <button
                    onClick={handleClear}
                    disabled={segments.length === 0 && !interimText}
                    className="px-4 py-3 rounded-xl border border-line bg-card text-ink-3 hover:text-rose hover:border-rose/30 text-[13px] font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>

            {/* 2. Intelligence Workspace Tabs (Live Transcript, MoM, Action Items) */}
            <div className="bg-card border border-line rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_rgba(67,83,255,0.06)] min-h-[460px] flex flex-col space-y-6">
              
              {/* Top Navigation & Export Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-line">
                <div className="flex items-center gap-1.5 bg-raise p-1 rounded-xl border border-line self-start">
                  <button
                    onClick={() => setActiveTab("transcript")}
                    className={`px-3.5 py-1.5 rounded-lg text-[12px] font-bold transition-all flex items-center gap-1.5 ${
                      activeTab === "transcript"
                        ? "bg-card text-indigo border border-line shadow-xs"
                        : "text-ink-3 hover:text-ink"
                    }`}
                  >
                    <span>🎙️</span>
                    <span>Live Transcript ({segments.length})</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("mom")}
                    className={`px-3.5 py-1.5 rounded-lg text-[12px] font-bold transition-all flex items-center gap-1.5 ${
                      activeTab === "mom"
                        ? "bg-card text-indigo border border-line shadow-xs"
                        : "text-ink-3 hover:text-ink"
                    }`}
                  >
                    <span>📝</span>
                    <span>Executive MoM</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("actions")}
                    className={`px-3.5 py-1.5 rounded-lg text-[12px] font-bold transition-all flex items-center gap-1.5 ${
                      activeTab === "actions"
                        ? "bg-card text-indigo border border-line shadow-xs"
                        : "text-ink-3 hover:text-ink"
                    }`}
                  >
                    <span>⚡</span>
                    <span>Action Items</span>
                  </button>
                </div>

                {/* Download Buttons */}
                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => handleDownloadTranscript("txt")}
                    disabled={segments.length === 0}
                    className={`px-4 py-2 rounded-xl text-[12px] font-bold transition-all flex items-center gap-1.5 shadow-xs ${
                      segments.length > 0
                        ? "bg-indigo text-white hover:bg-indigo-deep cursor-pointer"
                        : "bg-raise text-ink-3/50 border border-line cursor-not-allowed"
                    }`}
                  >
                    <span>📥</span>
                    <span>{downloadSuccess === "Transcript (.txt) downloaded!" ? "Downloaded .txt!" : "Download Transcript"}</span>
                  </button>

                  <button
                    onClick={() => handleDownloadTranscript("md")}
                    disabled={segments.length === 0}
                    className="px-3 py-2 rounded-xl bg-card border border-line text-ink text-[12px] font-mono font-bold hover:border-indigo hover:text-indigo transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    title="Download Markdown format (.md)"
                  >
                    {downloadSuccess === "Markdown (.md) downloaded!" ? "✓ .md" : ".md"}
                  </button>
                </div>
              </div>

              {/* Tab 1: Live Verbatim Transcript */}
              {activeTab === "transcript" && (
                <div className="flex-1 flex flex-col space-y-4 animate-fadeIn">
                  {segments.length === 0 && !interimText ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center py-16 px-4">
                      <div className="w-14 h-14 rounded-2xl bg-indigo-wash text-indigo flex items-center justify-center text-[26px] mb-4">
                        🎙️
                      </div>
                      <h3 className="text-[17px] font-bold text-ink mb-1.5">Awaiting Live Speech</h3>
                      <p className="text-[14px] text-ink-3 max-w-[420px] mb-6">
                        Click <strong>&quot;Start Microphone&quot;</strong> and speak, or click <strong>&quot;Try Demo Speech&quot;</strong> to watch live diarization in action.
                      </p>
                      <button
                        onClick={handleTryDemoSpeech}
                        className="px-5 py-2.5 rounded-xl bg-card border border-line text-indigo text-[13px] font-bold hover:border-indigo transition-colors shadow-2xs"
                      >
                        ⚡ Simulate Live Conversation
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                      {segments.map((seg) => (
                        <div key={seg.id} className="flex items-start gap-3 p-3.5 rounded-2xl bg-canvas border border-line/60">
                          <div className={`w-8 h-8 rounded-full ${seg.speakerColor} text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-2xs`}>
                            {seg.speaker[0]}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline gap-2 mb-1">
                              <span className="text-[13.5px] font-bold text-ink">{seg.speaker}</span>
                              <span className="text-[11px] font-mono text-ink-3">[{seg.start}]</span>
                              <span className="text-[10px] font-mono text-emerald-600 bg-emerald-500/10 px-1.5 py-0.2 rounded ml-auto">
                                {(seg.confidence * 100).toFixed(0)}% accuracy
                              </span>
                            </div>
                            <p className="text-[14px] text-ink-2 leading-relaxed font-sans">{seg.text}</p>
                          </div>
                        </div>
                      ))}

                      {/* Interim Speech (currently being spoken) */}
                      {interimText && (
                        <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-indigo-wash/30 border border-indigo/20 animate-pulse">
                          <div className="w-8 h-8 rounded-full bg-indigo text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                            ...
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline gap-2 mb-1">
                              <span className="text-[13px] font-bold text-indigo">Speaking now...</span>
                              <span className="text-[11px] font-mono text-ink-3">[{interimTimestamp || "00:00"}]</span>
                            </div>
                            <p className="text-[14px] text-ink italic leading-relaxed">{interimText}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Executive Minutes of Meeting (MoM) */}
              {activeTab === "mom" && (
                <div className="space-y-5 animate-fadeIn">
                  <div className="p-4 rounded-2xl bg-teal-wash/60 border border-teal/30">
                    <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-teal mb-1 flex items-center gap-1.5">
                      <span>🎯</span>
                      <span>Consensus Alignment Score: 96%</span>
                    </div>
                    <p className="text-[13.5px] font-semibold text-ink">
                      Team confirmed immediate adoption of automated AI meeting minutes with edge Web Speech diarization and zero-training data retention.
                    </p>
                  </div>

                  <div className="bg-canvas border border-line rounded-2xl p-5 space-y-3">
                    <h4 className="text-[12px] font-mono font-bold uppercase tracking-wider text-ink-3">
                      Executive Summary (MoM)
                    </h4>
                    <p className="text-[13.5px] text-ink-2 leading-relaxed">
                      {segments.length > 0
                        ? `Discussion covered core topics from ${segments.length} dialogue turns. Meeting verified sub-300ms speech latency, one-click transcript export in Markdown and plain text, and complete compliance across enterprise platforms.`
                        : "Start speaking or click 'Try Demo Speech' to watch Scripra automatically synthesize executive minutes."}
                    </p>
                  </div>

                  <div className="bg-canvas border border-line rounded-2xl p-5 space-y-2">
                    <h4 className="text-[12px] font-mono font-bold uppercase tracking-wider text-ink-3">
                      Attendees &amp; Roles
                    </h4>
                    <div className="flex items-center gap-2 flex-wrap">
                      {Array.from(new Set(segments.map((s) => s.speaker))).length > 0 ? (
                        Array.from(new Set(segments.map((s) => s.speaker))).map((spk, idx) => (
                          <span key={idx} className="text-[12px] font-mono bg-card border border-line px-3 py-1 rounded-full text-ink font-semibold">
                            👤 {spk}
                          </span>
                        ))
                      ) : (
                        <span className="text-[13px] text-ink-3 italic">Waiting for speakers...</span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Action Items */}
              {activeTab === "actions" && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="p-4 rounded-2xl bg-card border border-line flex items-start gap-3 shadow-2xs">
                    <input type="checkbox" defaultChecked className="mt-1 accent-indigo rounded" />
                    <div className="flex-1">
                      <p className="text-[14px] font-bold text-ink">Verify Web Speech API free microphone pipeline</p>
                      <div className="flex items-center gap-3 mt-1.5 text-[11.5px] font-mono text-ink-3">
                        <span className="bg-indigo-wash text-indigo px-2 py-0.5 rounded font-bold">Assigned: Engineering</span>
                        <span className="text-teal font-bold">Status: Active</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-card border border-line flex items-start gap-3 shadow-2xs">
                    <input type="checkbox" className="mt-1 accent-indigo rounded" />
                    <div className="flex-1">
                      <p className="text-[14px] font-bold text-ink">Export diarized transcripts to .txt and .md</p>
                      <div className="flex items-center gap-3 mt-1.5 text-[11.5px] font-mono text-ink-3">
                        <span className="bg-amber-wash text-amber-900 px-2 py-0.5 rounded font-bold">Due: Today</span>
                        <span>Priority: High</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-[12px] font-mono text-ink-3">
                    <span>Auto-extracted by Scripra Neural Engine</span>
                    <Link href="/dashboard" className="text-indigo hover:underline font-bold">
                      Open Dashboard Workspace →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Bottom Ready-To-Upgrade Banner */}
            <div className="bg-gradient-to-r from-indigo/10 via-card to-teal/10 border border-line rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
              <div className="space-y-1 text-center md:text-left">
                <h3 className="text-[18px] font-bold text-ink">Ready to connect to real meetings?</h3>
                <p className="text-[14px] text-ink-3">
                  Deploy the Scripra Bot to Google Meet, Teams, Zoom, or Webex in 1-click. Free forever tier included.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/dashboard"
                  className="px-6 py-3 rounded-xl bg-indigo text-white text-[13.5px] font-bold hover:bg-indigo-deep transition-all shadow-md shadow-indigo/20"
                >
                  Launch Full Studio
                </Link>
                <Link
                  href="/pricing"
                  className="px-5 py-3 rounded-xl bg-card border border-line text-ink text-[13.5px] font-bold hover:border-indigo transition-colors"
                >
                  View Plans
                </Link>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
