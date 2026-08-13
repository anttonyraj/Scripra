"use client";

import { useState, useRef, useEffect } from "react";

// SpeechRecognition type definitions
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function DemoClient() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (!SpeechRecognition) {
        setError("Speech recognition is not supported in this browser. Please try Chrome or Edge.");
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onresult = (event: any) => {
        let finalTrans = "";
        let interimTrans = "";

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTrans += event.results[i][0].transcript + " ";
          } else {
            interimTrans += event.results[i][0].transcript;
          }
        }
        
        if (finalTrans) {
          setTranscript(prev => prev + finalTrans);
        }
        setInterimTranscript(interimTrans);
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        if (event.error !== "no-speech") {
          setError(`Error: ${event.error}`);
          setIsRecording(false);
        }
      };

      recognition.onend = () => {
        setIsRecording(false);
        setInterimTranscript("");
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleRecording = () => {
    if (error && !recognitionRef.current) return;
    
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    } else {
      setError(null);
      setTranscript("");
      setInterimTranscript("");
      try {
        recognitionRef.current?.start();
        setIsRecording(true);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="w-full max-w-[900px] mx-auto bg-panel border border-line rounded-[16px] shadow-sm overflow-hidden flex flex-col min-h-[500px]">
      
      {/* Top Bar */}
      <div className="h-14 border-b border-line bg-canvas flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-rose/80 animate-pulse" style={{ animationPlayState: isRecording ? 'running' : 'paused' }} />
          <span className="text-[13px] font-semibold tracking-[-0.01em] text-ink">
            {isRecording ? "Listening..." : "Ready to record"}
          </span>
        </div>
        <div className="text-[11px] font-mono text-ink-3">Live browser capture</div>
      </div>

      {/* Main Area */}
      <div className="flex-1 p-8 flex flex-col relative">
        
        {error ? (
          <div className="bg-rose-wash text-rose border border-rose/20 p-4 rounded-xl text-[14px] font-medium mb-6">
            {error}
          </div>
        ) : null}

        {/* Transcript Box */}
        <div className="flex-1 bg-card border border-line rounded-xl p-6 overflow-y-auto mb-8 min-h-[250px]">
          {!transcript && !interimTranscript && !isRecording && (
            <div className="h-full flex flex-col items-center justify-center text-ink-3">
              <svg className="w-12 h-12 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
              <p className="text-[15px]">Click the microphone to begin.</p>
              <p className="text-[13px] mt-2 max-w-[300px] text-center opacity-80">
                Try saying: "We're going to ship the new version on Friday. Michael, can you finish testing?"
              </p>
            </div>
          )}

          <div className="text-[20px] leading-[1.6] tracking-[-0.01em] text-ink font-medium">
            {transcript}
            <span className="text-ink-3">{interimTranscript}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center mt-auto">
          <button
            onClick={toggleRecording}
            className={`group relative flex items-center justify-center w-20 h-20 rounded-full transition-all duration-300 ${
              isRecording 
                ? "bg-rose shadow-[0_0_0_8px_rgba(244,63,94,0.15)]" 
                : "bg-indigo hover:bg-indigo-deep hover:-translate-y-1 hover:shadow-lg"
            }`}
            aria-label={isRecording ? "Stop recording" : "Start recording"}
          >
            {isRecording ? (
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <rect x="7" y="7" width="10" height="10" rx="2" />
              </svg>
            ) : (
              <svg className="w-8 h-8 text-white transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
