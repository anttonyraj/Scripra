"use client";
import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

interface Segment {
  start: string;
  text: string;
  confidence: number;
  translated: string;
}

export default function DemoPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [segments, setSegments] = useState<Segment[]>([]);
  const [interimText, setInterimText] = useState("");
  const [sourceLang, setSourceLang] = useState("en-US");
  const [targetLang, setTargetLang] = useState("off");

  const recognitionRef = useRef<any>(null);
  const sessionStartRef = useRef<number | null>(null);
  const manuallyStoppedRef = useRef(false);
  const sourceLangRef = useRef(sourceLang);
  const targetLangRef = useRef(targetLang);

  // Keep refs in sync with state for the recognition closure
  useEffect(() => { sourceLangRef.current = sourceLang; }, [sourceLang]);
  useEffect(() => { targetLangRef.current = targetLang; }, [targetLang]);

  const translateText = async (text: string, sLang: string, tLang: string) => {
    if (tLang === "off" || !text) return "";
    const sourceBase = sLang.split("-")[0];
    if (sourceBase === tLang) return "";
    try {
      const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceBase}|${tLang}`;
      const res = await fetch(url);
      const data = await res.json();
      return data?.responseData?.translatedText || "";
    } catch (err) {
      console.error(err);
      return "";
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechEngine = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechEngine) {
        recognitionRef.current = new SpeechEngine();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;

        recognitionRef.current.onresult = async (event: any) => {
          let currentInterim = "";
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const result = event.results[i];
            const transcriptLine = result[0].transcript;
            const confidence = result[0].confidence || 0;

            if (result.isFinal) {
              const seconds = Math.floor((Date.now() - (sessionStartRef.current || Date.now())) / 1000);
              const start = new Date(seconds * 1000).toISOString().substring(11, 19);
              
              const newSegment: Segment = { start, text: transcriptLine.trim(), confidence, translated: "" };
              setSegments(prev => [...prev, newSegment]);
            } else {
              currentInterim += transcriptLine;
            }
          }
          setInterimText(currentInterim);
        };

        recognitionRef.current.onerror = (e: any) => console.error("Speech Recognition Error:", e.error);
        
        recognitionRef.current.onend = () => {
          if (!manuallyStoppedRef.current && recognitionRef.current) {
            console.log("Auto-restarting speech recognition...");
            try {
              recognitionRef.current.start();
            } catch(e) {}
          }
        };
      }
    }
  }, []);

  const handleStart = () => {
    if (!recognitionRef.current) {
      alert("Web Speech API not supported in this browser. Please use Chrome or Edge.");
      return;
    }
    manuallyStoppedRef.current = false;
    recognitionRef.current.lang = sourceLangRef.current;
    if (!sessionStartRef.current) sessionStartRef.current = Date.now();
    try {
      recognitionRef.current.start();
    } catch(e) {}
    setIsRecording(true);
  };
  
  const handleStop = () => {
    manuallyStoppedRef.current = true;
    if (recognitionRef.current) recognitionRef.current.stop();
    setIsRecording(false);
    setInterimText("");
  };

  const handleClear = () => {
    setSegments([]);
    setInterimText("");
    sessionStartRef.current = null;
  };

  return (
    <>
      <Header />
      <main className="pt-24 pb-32 min-h-screen relative">
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-[clamp(32px,4vw,46px)] font-bold tracking-[-0.03em] text-ink leading-[1.05] mb-4">
              Live Capture Demo
            </h1>
            <p className="text-[16px] text-ink-2 max-w-[600px] mx-auto">
              Experience how Scripra captures and translates your conversations in real-time. 
              <br/>
              <Link href="/signup" className="text-indigo hover:text-indigo-deep underline mt-2 inline-block transition-colors">
                Try it free to save your transcripts and generate insights.
              </Link>
            </p>
          </div>

          <div className="flex flex-col gap-6">
            
            {/* 1. Settings Panel */}
            <div className="bg-panel border border-line rounded-2xl p-6 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold tracking-wider uppercase text-ink-3">Meeting Title</label>
                  <input type="text" placeholder="Architecture review" className="bg-canvas border border-line rounded-lg px-4 py-2.5 text-[14px] text-ink placeholder:text-ink-3 outline-none focus:border-indigo transition-colors" />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold tracking-wider uppercase text-ink-3">Organizer</label>
                  <input type="text" placeholder="Your name" className="bg-canvas border border-line rounded-lg px-4 py-2.5 text-[14px] text-ink placeholder:text-ink-3 outline-none focus:border-indigo transition-colors" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[11px] font-bold tracking-wider uppercase text-ink-3">Spoken Language</label>
                  <select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)} className="bg-canvas border border-line rounded-lg px-4 py-2.5 text-[14px] text-ink outline-none focus:border-indigo transition-colors appearance-none">
                    <option value="en-US">English (US)</option>
                    <option value="hi-IN">Hindi</option>
                    <option value="es-ES">Spanish</option>
                    <option value="fr-FR">French</option>
                    <option value="de-DE">German</option>
                    <option value="ja-JP">Japanese</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <input type="checkbox" defaultChecked className="mt-1 shrink-0 accent-indigo" />
                <p className="text-[13px] text-ink-2 leading-relaxed">
                  <strong className="text-ink">Everyone in this meeting knows it's being transcribed.</strong> Recording laws differ by country and state — in many places all parties must agree before you start.
                </p>
              </div>
            </div>

            {/* 2. Recording Controls Panel */}
            <div className="bg-panel border border-line rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-center gap-8 justify-between relative overflow-hidden">
              
              <div className="absolute inset-0 pointer-events-none opacity-20 -z-10">
                <div className="absolute top-[-50%] left-[-10%] w-[40%] h-[200%] bg-indigo blur-[80px] rounded-full animate-blob mix-blend-multiply" />
                <div className="absolute top-[-50%] right-[-10%] w-[40%] h-[200%] bg-teal blur-[80px] rounded-full animate-blob [animation-delay:2s] mix-blend-multiply" />
              </div>

              <div className="flex-1 w-full h-12 flex items-center overflow-hidden">
                {isRecording ? (
                  <svg className="w-full h-full text-indigo opacity-80" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <path d="M0,50 Q25,10 50,50 T100,50" fill="none" stroke="currentColor" strokeWidth="2" className="animate-[dash_2s_linear_infinite]" strokeDasharray="100 100" />
                    <path d="M0,50 Q25,90 50,50 T100,50" fill="none" stroke="currentColor" strokeWidth="2" className="animate-[dash_3s_linear_infinite_reverse]" strokeDasharray="100 100" />
                    <path d="M0,50 Q25,30 50,50 T100,50" fill="none" stroke="currentColor" strokeWidth="1" className="animate-[dash_1.5s_linear_infinite]" strokeDasharray="50 50" opacity="0.5" />
                  </svg>
                ) : (
                  <div className="w-full h-0.5 border-t-2 border-dashed border-line-hi" />
                )}
              </div>

              <div className="flex flex-col gap-3 shrink-0">
                <div className="flex items-center gap-2 text-[12px] font-bold tracking-wider uppercase justify-end text-ink-3">
                  {isRecording ? (
                    <><span className="w-2 h-2 rounded-full bg-rose animate-pulse" /> <span className="text-rose">Recording</span></>
                  ) : (
                    <><span className="w-2 h-2 rounded-full bg-ink-3" /> Ready</>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={handleStart}
                    disabled={isRecording}
                    className={`px-6 py-2 rounded-lg text-[14px] font-semibold flex items-center gap-2 transition-colors ${
                      isRecording ? 'bg-teal-wash text-teal cursor-not-allowed' : 'bg-teal text-white hover:bg-teal-deep'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current" /> Start
                  </button>
                  <button 
                    onClick={handleStop}
                    disabled={!isRecording}
                    className={`px-6 py-2 rounded-lg text-[14px] font-semibold flex items-center gap-2 transition-colors ${
                      !isRecording ? 'bg-rose-wash text-rose cursor-not-allowed' : 'bg-rose text-white hover:bg-rose-deep'
                    }`}
                  >
                    <span className="w-2 h-2 bg-current" /> Stop
                  </button>
                </div>
              </div>
            </div>

            {/* 3. Transcript Panel */}
            <div className="bg-panel border border-line rounded-2xl p-6 shadow-xl min-h-[400px] flex flex-col relative overflow-hidden">
              <div className="flex items-center justify-between mb-8 relative z-10">
                <h2 className="text-[18px] font-bold text-ink flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${isRecording ? 'bg-rose animate-pulse shadow-[0_0_0_4px_rgba(225,75,90,0.2)]' : 'bg-ink-3'}`} />
                  Transcript
                </h2>
                <div className="flex items-center gap-3">
                  <button onClick={handleClear} className="px-4 py-1.5 rounded-full border border-line text-[13px] font-medium text-rose hover:bg-rose-wash hover:border-rose transition-colors bg-canvas">Clear</button>
                </div>
              </div>
              
              <div className="flex-1 flex flex-col relative z-10 max-h-[500px] overflow-y-auto pr-2">
                {segments.length === 0 && !interimText ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center opacity-70">
                    <div className="text-[16px] font-bold text-ink-2 mb-2">Nothing captured yet</div>
                    <div className="text-[14px] text-ink-3 max-w-[400px]">
                      Select your language and press Start. Make sure to allow microphone permissions in your browser.
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-6">
                    {segments.map((seg, i) => (
                      <div key={i} className="flex flex-col gap-1 pb-4 border-b border-line border-dashed last:border-0">
                        <div className="flex gap-4">
                          <span className="text-indigo font-bold text-[13px] font-mono shrink-0 pt-0.5">[{seg.start}]</span>
                          <span className="text-[15px] text-ink leading-relaxed">{seg.text}</span>
                          <span className="text-[11px] text-ink-3 font-mono shrink-0 pt-1 ml-auto opacity-50">{(seg.confidence * 100).toFixed(0)}%</span>
                        </div>
                      </div>
                    ))}
                    {interimText && (
                      <div className="flex gap-4 pb-4">
                        <span className="text-indigo/50 font-bold text-[13px] font-mono shrink-0 pt-0.5">[{new Date(Math.floor((Date.now() - (sessionStartRef.current || Date.now())) / 1000) * 1000).toISOString().substring(11, 19)}]</span>
                        <span className="text-[15px] text-ink-3 italic leading-relaxed">{interimText}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* 4. Insights Panel */}
            <div className="bg-panel border border-line rounded-2xl p-6 shadow-xl flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-indigo" />
                  <h3 className="text-[16px] font-bold text-ink">Meeting insights</h3>
                </div>
                <div className="text-[13px] text-ink-3">
                  MOM, Recap, Decisions and Action items, pulled from what was said.
                </div>
              </div>
              <Link href="/signup" className="px-6 py-2.5 rounded-lg border border-line bg-canvas text-[14px] font-bold text-ink-2 hover:text-ink hover:border-indigo transition-all">
                Generate AI Insights
              </Link>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
