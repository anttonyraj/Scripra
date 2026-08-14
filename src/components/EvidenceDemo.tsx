"use client";

import { useState } from "react";

export default function EvidenceDemo() {
  const [highlighted, setHighlighted] = useState(false);

  return (
    <div className="py-24 px-6 relative overflow-hidden bg-canvas">
      <div className="max-w-[1080px] mx-auto">
        <div className="text-center mb-16">
          <div className="text-[11px] font-bold tracking-wider text-indigo uppercase mb-4">
            Verify the intelligence
          </div>
          <h2 className="text-[clamp(32px,4vw,46px)] font-bold tracking-[-0.03em] leading-[1.05] mb-4">
            Every important insight should have evidence.
          </h2>
          <p className="text-[17px] text-ink-2 max-w-[500px] mx-auto">
            Scripra links everything back to the exact moment it came from.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center max-w-[900px] mx-auto bg-panel border border-line rounded-3xl p-8 lg:p-12 shadow-sm">
          
          {/* Left Side: Decision */}
          <div className="flex flex-col gap-4">
            <div className="bg-card border border-line rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-indigo" />
                <span className="text-[11px] font-bold tracking-wider text-indigo uppercase">Decision</span>
              </div>
              <p className="text-[18px] font-semibold text-ink mb-6">Launch Friday.</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-line border-dashed">
                <span className="text-[12px] font-medium text-ink-3">High confidence</span>
                <button 
                  onClick={() => setHighlighted(true)}
                  onMouseLeave={() => setHighlighted(false)}
                  className={`text-[12px] font-mono transition-all duration-300 flex items-center gap-1 ${
                    highlighted 
                      ? "text-indigo bg-indigo-wash px-2 py-1 rounded font-bold" 
                      : "text-ink-3 hover:text-indigo px-2 py-1"
                  }`}
                  aria-label="View source in transcript"
                >
                  12:04 <span className="text-[14px]">→</span>
                </button>
              </div>
            </div>
            <p className="text-[13px] text-ink-3 text-center">Click the timestamp to verify the source.</p>
          </div>

          {/* Right Side: Transcript */}
          <div className="bg-card border border-line rounded-2xl p-6 shadow-sm min-h-[220px] flex flex-col justify-center">
            <div className="flex gap-4">
              <div className="w-12 text-[12px] text-ink-3 font-mono mt-1 shrink-0">
                <span className={`px-1.5 py-0.5 -mx-1.5 rounded transition-colors duration-500 ${highlighted ? "bg-indigo-wash text-indigo font-bold" : ""}`}>
                  12:04
                </span>
              </div>
              <div>
                <div className="text-[13px] font-bold text-indigo mb-1">Antony</div>
                <div className={`text-[15px] leading-relaxed transition-colors duration-500 rounded px-2 py-1 -mx-2 ${
                  highlighted ? "bg-indigo-wash/40 text-ink" : "text-ink-2"
                }`}>
                  "Okay — let's commit. We ship the August release Friday."
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
