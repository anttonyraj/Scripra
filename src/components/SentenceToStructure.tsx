"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const SENTENCE = "Okay — we'll ship the new version Friday. Michael, can you finish regression testing by Thursday? I'll send the customer update.";

export default function SentenceToStructure() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [typed, setTyped] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [showMetadata, setShowMetadata] = useState(false);
  const [showArrows, setShowArrows] = useState(false);
  const [showCards, setShowCards] = useState([false, false, false, false]);

  const timers = useRef<NodeJS.Timeout[]>([]);

  const reset = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setTyped("");
    setShowCursor(true);
    setShowMetadata(false);
    setShowArrows(false);
    setShowCards([false, false, false, false]);
  };

  const run = useCallback(() => {
    reset();
    let i = 0;
    
    // Respect prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTyped(SENTENCE);
      setShowCursor(false);
      setShowMetadata(true);
      setShowArrows(true);
      setShowCards([true, true, true, true]);
      return;
    }

    const type = () => {
      if (i < SENTENCE.length) {
        setTyped(SENTENCE.slice(0, i + 1));
        i++;
        timers.current.push(setTimeout(type, SENTENCE[i - 1] === " " ? 22 : 30));
      } else {
        setShowCursor(false);
        setShowMetadata(true);
        timers.current.push(setTimeout(() => setShowArrows(true), 420));
        
        [0, 1, 2, 3].forEach((n) => {
          timers.current.push(
            setTimeout(() => {
              setShowCards(prev => {
                const next = [...prev];
                next[n] = true;
                return next;
              });
            }, 800 + n * 220)
          );
        });
      }
    };
    
    type();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            run();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.35 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      timers.current.forEach(clearTimeout);
    };
  }, [run]);

  return (
    <section className="py-24 border-t border-line">
      <div className="max-w-[1080px] mx-auto px-6">
        <h2 className="text-[clamp(28px,4vw,40px)] font-bold tracking-[-0.02em] mb-4">
          What Scripra actually does.
        </h2>
        <p className="text-[17px] leading-[1.65] text-ink-2 max-w-[660px] mb-12">
          Scripra listens to your conversations and immediately turns them into structured intelligence.
        </p>

        <div ref={containerRef} className="bg-card border border-line rounded-[18px] p-8 md:p-14 shadow-sm">
          <p className="text-[clamp(21px,3vw,32px)] font-semibold tracking-[-0.02em] leading-[1.4] min-h-[1.5em] mb-2">
            {typed}
            {showCursor && <span className="inline-block w-[2px] h-[1em] bg-indigo align-[-2px] ml-[2px] animate-pulse" />}
          </p>
          <div className="font-mono text-[12px] text-ink-3 mb-8 h-4">
            {showMetadata && "Antony · Product review · 12:04"}
          </div>

          <div className={`h-[26px] flex justify-center items-center text-indigo-lift text-[20px] transition-opacity duration-500 ${showArrows ? "opacity-100" : "opacity-0"}`}>
            ↓
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            <Card
              visible={showCards[0]}
              kicker="Decision"
              kickerColor="text-indigo-deep"
              value="Ship the new version on Friday."
              meta="High confidence · 12:04"
            />
            <Card
              visible={showCards[1]}
              kicker="Action item"
              kickerColor="text-amber-deep"
              value="Finish regression testing."
              meta="Michael · by Thursday · 12:11"
            />
            <Card
              visible={showCards[2]}
              kicker="Commitment"
              kickerColor="text-amber-deep"
              value="Send the customer update."
              meta="Sarah · 12:19"
            />
            <Card
              visible={showCards[3]}
              kicker="Risk"
              kickerColor="text-rose"
              value="Security approval still outstanding."
              meta="4 weeks running · 12:26"
            />
          </div>

          <button
            onClick={run}
            className="mt-10 bg-transparent border border-line text-ink-2 font-sans text-[13px] font-medium px-5 py-2.5 rounded-lg cursor-pointer hover:border-indigo hover:text-indigo transition-colors"
          >
            Replay
          </button>
        </div>
      </div>
    </section>
  );
}

function Card({ visible, kicker, kickerColor, value, meta }: { visible: boolean, kicker: string, kickerColor: string, value: string, meta: string }) {
  return (
    <div
      className={`rounded-xl p-[18px] border border-line bg-canvas transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className={`text-[10px] font-semibold tracking-[0.16em] uppercase mb-2 ${kickerColor}`}>
        {kicker}
      </div>
      <div className="text-[15px] leading-[1.45] text-ink">{value}</div>
      <div className="font-mono text-[11px] text-ink-3 mt-3">{meta}</div>
    </div>
  );
}
