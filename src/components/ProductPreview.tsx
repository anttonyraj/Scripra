"use client";

import { useState } from "react";

export default function ProductPreview() {
  const [activeSeg, setActiveSeg] = useState<string | null>(null);

  const handleTimestampClick = (id: string) => {
    setActiveSeg(id);
    
    // Find the element in the scrollable container and scroll to it
    const el = document.getElementById(`preview-seg-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    
    setTimeout(() => {
      setActiveSeg(null);
    }, 2400);
  };

  return (
    <section className="py-24 bg-raise">
      <div className="max-w-[1080px] mx-auto px-6">
        <div className="text-center max-w-[720px] mx-auto mb-16">
          <h2 className="text-[clamp(28px,4vw,40px)] font-bold tracking-[-0.02em] mb-4">
            AI you can verify.
          </h2>
          <p className="text-[17px] leading-[1.65] text-ink-2">
            Every important insight can link back to the moment in the conversation where it came from.
          </p>
        </div>

        {/* Browser Frame */}
        <div className="rounded-[16px] border border-line bg-panel shadow-2xl overflow-hidden flex flex-col h-[700px]">
          {/* Browser Chrome */}
          <div className="h-10 border-b border-line bg-canvas flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-rose/40" />
            <div className="w-3 h-3 rounded-full bg-amber/40" />
            <div className="w-3 h-3 rounded-full bg-teal/40" />
            <div className="mx-auto bg-card border border-line rounded-md h-6 w-1/3 flex items-center justify-center">
              <span className="text-[11px] text-ink-3">app.scripra.com</span>
            </div>
          </div>

          {/* App Layout */}
          <div className="flex flex-1 overflow-hidden" data-theme="dark">
            {/* Sidebar */}
            <aside className="w-[230px] hidden lg:flex flex-col bg-panel border-r border-line p-5">
              <div className="flex items-center gap-2.5 mb-6 px-2">
                <div className="w-7 h-7 rounded-full bg-indigo flex items-center justify-center">
                  <span className="text-white text-xs font-bold">S</span>
                </div>
                <div className="text-[17px] font-bold tracking-[-0.02em] text-ink">Scripra</div>
              </div>
              <nav className="flex flex-col gap-1">
                <div className="px-3 py-2 rounded-lg bg-indigo-wash text-indigo text-[13.5px] font-medium flex justify-between items-center">
                  <span className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-current opacity-65" />
                    Conversations
                  </span>
                  <span className="font-mono text-[11px] opacity-70">24</span>
                </div>
                <div className="px-3 py-2 rounded-lg text-ink-2 text-[13.5px] font-medium flex justify-between items-center">
                  <span className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-current opacity-65" />
                    Ask Scripra
                  </span>
                </div>
              </nav>
            </aside>

            {/* Main */}
            <main className="flex-1 p-6 md:p-8 flex flex-col min-w-0 overflow-y-auto">
              <div className="flex justify-between items-start mb-6 flex-wrap gap-4">
                <div>
                  <h1 className="text-[23px] font-semibold tracking-[-0.02em] mb-1 text-ink">Product review — August release</h1>
                  <div className="font-mono text-[11.5px] text-ink-3">13 Aug 2026 · 42 min · English · 3 speakers</div>
                </div>
                <div className="flex gap-2">
                  <button className="px-3.5 py-2 rounded-lg bg-indigo text-white text-[12.5px] font-semibold border-transparent pointer-events-none">
                    Ask Scripra
                  </button>
                </div>
              </div>

              <div className="flex gap-2 mb-6">
                <div className="flex items-center gap-2 bg-card border border-line rounded-full py-1 pr-3 pl-1">
                  <div className="w-[22px] h-[22px] rounded-full bg-indigo text-white flex items-center justify-center text-[10px] font-bold">A</div>
                  <span className="text-[12.5px] text-ink">Antony</span>
                </div>
                <div className="flex items-center gap-2 bg-card border border-line rounded-full py-1 pr-3 pl-1">
                  <div className="w-[22px] h-[22px] rounded-full bg-amber text-white flex items-center justify-center text-[10px] font-bold">M</div>
                  <span className="text-[12.5px] text-ink">Michael</span>
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-6 flex-1 min-h-0">
                {/* Insights Column */}
                <div className="flex flex-col gap-4 overflow-y-auto pr-2 pb-10">
                  
                  {/* Decisions */}
                  <div className="bg-card border border-line rounded-[13px] p-5">
                    <h2 className="text-[10px] font-semibold tracking-[0.17em] uppercase text-ink flex items-center gap-2 mb-4">
                      Decisions <span className="font-mono bg-raise text-ink-3 px-2 py-0.5 rounded-full tracking-normal">1</span>
                    </h2>
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <div className="text-[14px] leading-[1.5] text-ink mb-2">Ship the August release on Friday 12 September.</div>
                        <div className="flex gap-2 items-center">
                          <span className="px-2.5 py-1 rounded-full bg-indigo-wash text-indigo text-[10.5px] font-semibold">High confidence</span>
                          <button 
                            onClick={() => handleTimestampClick('s1')}
                            className="font-mono text-[10.5px] text-ink-3 hover:text-indigo hover:bg-indigo-wash px-1.5 py-1 rounded transition-colors"
                          >
                            12:04
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="bg-card border border-line rounded-[13px] p-5">
                    <h2 className="text-[10px] font-semibold tracking-[0.17em] uppercase text-ink flex items-center gap-2 mb-4">
                      Action items <span className="font-mono bg-raise text-ink-3 px-2 py-0.5 rounded-full tracking-normal">1</span>
                    </h2>
                    <div className="flex gap-3 items-start">
                      <div className="w-4 h-4 rounded border-2 border-line-hi mt-0.5" />
                      <div className="flex-1">
                        <div className="text-[14px] leading-[1.5] text-ink mb-2">Finish regression testing on the release branch.</div>
                        <div className="flex gap-2 items-center">
                          <span className="px-2.5 py-1 rounded-full bg-amber-wash text-amber text-[10.5px] font-semibold">Michael</span>
                          <span className="px-2.5 py-1 rounded-full bg-amber-wash text-amber text-[10.5px] font-semibold">Thursday</span>
                          <button 
                            onClick={() => handleTimestampClick('s2')}
                            className="font-mono text-[10.5px] text-ink-3 hover:text-indigo hover:bg-indigo-wash px-1.5 py-1 rounded transition-colors"
                          >
                            12:11
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Transcript Column */}
                <div className="bg-panel border border-line rounded-[13px] flex flex-col overflow-hidden h-[450px]">
                  <div className="sticky top-0 bg-panel border-b border-line p-3 px-5 text-[10px] font-semibold tracking-[0.17em] uppercase text-ink-3 z-10 shadow-sm">
                    Transcript
                  </div>
                  <div className="flex-1 overflow-y-auto py-2">
                    <TranscriptSegment 
                      id="s1"
                      time="12:04"
                      speaker="Antony"
                      speakerColor="text-indigo"
                      text="Okay — let's commit. We ship the August release Friday the twelfth. One week later than we said, but it's the honest date."
                      active={activeSeg === 's1'}
                    />
                    <TranscriptSegment 
                      id="s2"
                      time="12:11"
                      speaker="Michael"
                      speakerColor="text-amber"
                      text="That works if I get regression testing done. I should finish Thursday, assuming the staging environment stays up."
                      active={activeSeg === 's2'}
                    />
                    <TranscriptSegment 
                      id="s3"
                      time="12:19"
                      speaker="Sarah"
                      speakerColor="text-teal"
                      text="I'll send the customer update to Acme so they're not surprised by the shift."
                      active={activeSeg === 's3'}
                    />
                    <TranscriptSegment 
                      id="s4"
                      time="19:45"
                      speaker="Antony"
                      speakerColor="text-indigo"
                      text="Do we want to bundle the pricing change into the same release, or keep them separate?"
                      active={activeSeg === 's4'}
                    />
                    <TranscriptSegment 
                      id="s5"
                      time="28:37"
                      speaker="Sarah"
                      speakerColor="text-teal"
                      text="Separate, I think. If pricing lands the same day, every support ticket becomes ambiguous. Maybe hold it until after launch."
                      active={activeSeg === 's5'}
                    />
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </section>
  );
}

function TranscriptSegment({ id, time, speaker, speakerColor, text, active }: { id: string, time: string, speaker: string, speakerColor: string, text: string, active: boolean }) {
  return (
    <div 
      id={`preview-seg-${id}`}
      className={`grid grid-cols-[52px_1fr] gap-3 p-4 px-5 transition-colors duration-500 ${active ? 'bg-indigo-wash' : 'hover:bg-raise'}`}
    >
      <div className="font-mono text-[10.5px] text-ink-3 pt-[2px]">{time}</div>
      <div>
        <div className={`text-[11px] font-semibold mb-1 ${speakerColor}`}>{speaker}</div>
        <div className={`text-[13.5px] leading-[1.55] ${active ? 'text-ink' : 'text-ink-2'}`}>
          {text}
        </div>
      </div>
    </div>
  );
}
