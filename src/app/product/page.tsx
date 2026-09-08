import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductSuiteShowcase from "@/components/ProductSuiteShowcase";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products & Intelligence Suite — Scripra",
  description: "Explore the Scripra product suite: Scripra Global live multilingual translation, DealCloser sales whisper co-pilot, and Omnichannel cross-platform voice bot.",
};

export default function Product() {
  return (
    <>
      <Header />
      <main className="pt-28 pb-24 bg-canvas text-ink">
        {/* The 4 Advanced Speech Intelligence Products */}
        <ProductSuiteShowcase />

        <div className="max-w-[1080px] mx-auto px-6 mt-16 pt-16 border-t border-line">
          <div className="text-center max-w-[800px] mx-auto mb-20">
            <div className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-indigo mb-3">Underlying Engine</div>
            <h2 className="text-[clamp(32px,4vw,44px)] font-bold tracking-[-0.03em] mb-4">
              From spoken word to structural intelligence.
            </h2>
            <p className="text-[17px] leading-[1.65] text-ink-3">
              Scripra is designed to process conversations the way an intelligent observer would—capturing the nuance, extracting the commitments, and organising the history.
            </p>
          </div>

          <div className="flex flex-col gap-24">
            {/* Capture */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="text-[13px] font-semibold tracking-[0.2em] uppercase text-indigo mb-4">Capture</div>
                <h2 className="text-[28px] font-bold tracking-[-0.02em] mb-4">Never miss a detail.</h2>
                <p className="text-[16px] leading-[1.65] text-ink-2 mb-4">
                  Whether it&apos;s a browser recording, an in-person conversation, a meeting recording, or a direct audio/video upload, Scripra handles it natively.
                </p>
                <ul className="space-y-2 mt-6">
                  <li className="flex items-center gap-3 text-ink">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo" /> Browser recording
                  </li>
                  <li className="flex items-center gap-3 text-ink">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo" /> In-person conversations
                  </li>
                  <li className="flex items-center gap-3 text-ink">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo" /> Meeting recordings
                  </li>
                  <li className="flex items-center gap-3 text-ink">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo" /> Audio/video upload
                  </li>
                </ul>
              </div>
              <div className="relative rounded-[32px] bg-indigo/[0.03] border border-indigo/10 p-8 flex items-center justify-center overflow-hidden shadow-sm group">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg0MHY0MEgwVjB6bTM5IDM5VjFoLTM4djM4aDM4eiIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIwLjA0IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none" />
                <div className="absolute top-4 left-4 text-[10px] font-mono tracking-[0.2em] text-rose/50 font-bold pointer-events-none select-none z-20">RECORDING_ACTIVE</div>
                
                <div className="relative z-10 w-48 h-48 rounded-full bg-white shadow-[0_12px_40px_rgba(244,63,94,0.15)] flex flex-col items-center justify-center border border-rose/10 group-hover:scale-105 transition-transform duration-500">
                  <div className="absolute inset-0 rounded-full border border-rose/20 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" />
                  <div className="w-16 h-16 rounded-full bg-rose shadow-[0_0_30px_rgba(244,63,94,0.4)] flex items-center justify-center relative overflow-hidden mb-4">
                    <div className="w-full flex items-center justify-center gap-1">
                      <div className="w-1.5 bg-white rounded-full animate-[wave_1s_ease-in-out_infinite]" style={{ height: '30%' }} />
                      <div className="w-1.5 bg-white rounded-full animate-[wave_1s_ease-in-out_infinite_0.1s]" style={{ height: '70%' }} />
                      <div className="w-1.5 bg-white rounded-full animate-[wave_1s_ease-in-out_infinite_0.2s]" style={{ height: '50%' }} />
                      <div className="w-1.5 bg-white rounded-full animate-[wave_1s_ease-in-out_infinite_0.3s]" style={{ height: '90%' }} />
                      <div className="w-1.5 bg-white rounded-full animate-[wave_1s_ease-in-out_infinite_0.4s]" style={{ height: '40%' }} />
                    </div>
                  </div>
                  <div className="font-mono text-[14px] font-medium text-rose tracking-wider">04:23</div>
                </div>
              </div>
            </section>

            {/* Understand */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
              <div className="md:order-2">
                <div className="text-[13px] font-semibold tracking-[0.2em] uppercase text-indigo mb-4">Understand</div>
                <h2 className="text-[28px] font-bold tracking-[-0.02em] mb-4">Know what actually happened.</h2>
                <p className="text-[16px] leading-[1.65] text-ink-2 mb-4">
                  Scripra doesn&apos;t just transcribe. It separates speakers, identifies key topics, and structures the unstructured.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-canvas border border-line p-4 rounded-xl">Transcription</div>
                  <div className="bg-canvas border border-line p-4 rounded-xl">Speaker separation</div>
                  <div className="bg-canvas border border-line p-4 rounded-xl">Quick recap</div>
                  <div className="bg-canvas border border-line p-4 rounded-xl">Detailed summary</div>
                  <div className="bg-canvas border border-line p-4 rounded-xl">Minutes of Meeting</div>
                  <div className="bg-canvas border border-line p-4 rounded-xl text-indigo font-medium border-indigo-wash">Decisions</div>
                  <div className="bg-canvas border border-line p-4 rounded-xl text-rose font-medium border-rose-wash">Risks</div>
                  <div className="bg-canvas border border-line p-4 rounded-xl">Open questions</div>
                </div>
              </div>
              <div className="relative rounded-[32px] bg-indigo/[0.03] border border-indigo/10 p-8 flex items-center justify-center overflow-hidden shadow-sm md:order-1 group">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg0MHY0MEgwVjB6bTM5IDM5VjFoLTM4djM4aDM4eiIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIwLjA0IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none" />
                <div className="absolute top-4 left-4 text-[10px] font-mono tracking-[0.2em] text-indigo/50 font-bold pointer-events-none select-none z-20">UNDERSTANDING_ENGINE</div>
                
                <div className="relative z-10 w-full max-w-sm bg-white p-6 rounded-2xl border border-indigo/10 shadow-[0_12px_40px_rgb(0,0,0,0.08)] group-hover:-translate-y-1 transition-transform duration-500">
                  <div className="text-[10px] font-bold tracking-[0.1em] uppercase text-indigo mb-3 border-b border-indigo/10 pb-2">Structured Output</div>
                  
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-indigo-wash text-indigo rounded text-[10px] font-bold uppercase shadow-sm">Decision</span>
                      <div className="flex-1 bg-indigo/[0.02] border border-indigo/10 rounded px-3 py-1.5 flex items-center">
                        <div className="w-full h-1.5 bg-indigo/20 rounded-full"></div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-rose-wash text-rose rounded text-[10px] font-bold uppercase shadow-sm">Risk</span>
                      <div className="flex-1 bg-indigo/[0.02] border border-indigo/10 rounded px-3 py-1.5 flex items-center">
                        <div className="w-3/4 h-1.5 bg-rose/30 rounded-full"></div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-amber-wash text-amber-700 rounded text-[10px] font-bold uppercase shadow-sm">Action</span>
                      <div className="flex-1 bg-indigo/[0.02] border border-indigo/10 rounded px-3 py-1.5 flex items-center">
                        <div className="w-5/6 h-1.5 bg-amber/30 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Act */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="text-[13px] font-semibold tracking-[0.2em] uppercase text-amber mb-4">Act</div>
                <h2 className="text-[28px] font-bold tracking-[-0.02em] mb-4">Turn words into action.</h2>
                <p className="text-[16px] leading-[1.65] text-ink-2 mb-4">
                  Every meeting creates obligations. Scripra extracts action items, assigns owners, and flags deadlines and commitments, so you always know who owes what.
                </p>
                <ul className="space-y-4 mt-6">
                  <li className="flex items-center gap-4 bg-canvas border border-line p-4 rounded-xl">
                    <div className="w-4 h-4 rounded border-2 border-line-hi" />
                    <div>
                      <div className="text-ink font-medium">Action items</div>
                      <div className="text-ink-3 text-sm">Extracted automatically</div>
                    </div>
                  </li>
                  <li className="flex items-center gap-4 bg-canvas border border-line p-4 rounded-xl">
                    <div className="w-6 h-6 rounded-full bg-amber-wash text-amber-deep flex items-center justify-center text-xs font-bold">M</div>
                    <div>
                      <div className="text-ink font-medium">Owners & Deadlines</div>
                      <div className="text-ink-3 text-sm">Assigned based on context</div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="relative rounded-[32px] bg-indigo/[0.03] border border-indigo/10 p-8 flex items-center justify-center overflow-hidden shadow-sm group">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg0MHY0MEgwVjB6bTM5IDM5VjFoLTM4djM4aDM4eiIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIwLjA0IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none" />
                <div className="absolute top-4 left-4 text-[10px] font-mono tracking-[0.2em] text-amber-500/50 font-bold pointer-events-none select-none z-20">ACTION_ROUTING</div>
                
                <div className="relative z-10 w-full max-w-sm bg-white p-6 rounded-2xl border border-indigo/10 shadow-[0_12px_40px_rgb(0,0,0,0.08)] group-hover:scale-105 transition-transform duration-500">
                  <div className="text-[10px] font-bold tracking-[0.1em] uppercase text-indigo mb-4 flex items-center justify-between border-b border-indigo/10 pb-2">
                    <span>Task Pipeline</span>
                    <span className="text-[9px] bg-indigo-wash text-indigo px-1.5 py-0.5 rounded tracking-widest border border-indigo/10">1/3 PENDING</span>
                  </div>
                  
                  <div className="flex gap-4 items-start bg-indigo/[0.01] p-3 rounded-xl border border-indigo/5">
                    <div className="w-5 h-5 rounded-md border-2 border-indigo/30 flex-shrink-0 mt-0.5 hover:bg-indigo-wash hover:border-indigo transition-colors cursor-pointer" />
                    <div className="flex-1">
                      <div className="text-[13px] font-semibold text-indigo-deep leading-[1.4] mb-3">
                        Finish regression testing before release.
                      </div>
                      <div className="flex flex-wrap gap-2 items-center">
                        <div className="px-2.5 py-1 rounded-md bg-indigo-wash text-indigo text-[10px] font-bold flex items-center gap-1.5 border border-indigo/10 shadow-sm">
                          <div className="w-3 h-3 rounded-full bg-indigo text-white flex items-center justify-center text-[7px]">M</div>
                          Michael
                        </div>
                        <div className="px-2.5 py-1 rounded-md bg-amber-wash text-amber-700 text-[10px] font-bold flex items-center gap-1.5 border border-amber/20 shadow-sm">
                          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                          Thursday
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Recall */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
              <div className="md:order-2">
                <div className="text-[13px] font-semibold tracking-[0.2em] uppercase text-indigo mb-4">Recall</div>
                <h2 className="text-[28px] font-bold tracking-[-0.02em] mb-4">Searchable organisational memory.</h2>
                <p className="text-[16px] leading-[1.65] text-ink-2 mb-4">
                  Conversation history should be a searchable asset, not a dark archive.
                </p>
                <div className="mt-8 space-y-3">
                  <div className="bg-canvas border border-line p-4 rounded-xl flex items-center justify-between">
                    <span className="text-ink font-medium">Conversation history</span>
                  </div>
                  <div className="bg-canvas border border-line p-4 rounded-xl flex items-center justify-between">
                    <span className="text-ink font-medium">Searchable memory</span>
                  </div>
                  <div className="bg-canvas border border-line p-4 rounded-xl flex items-center justify-between">
                    <span className="text-ink font-medium">Cross-conversation intelligence</span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo bg-indigo-wash px-2 py-1 rounded">Coming later</span>
                  </div>
                </div>
              </div>
              <div className="relative rounded-[32px] bg-indigo/[0.03] border border-indigo/10 p-8 flex items-center justify-center overflow-hidden shadow-sm md:order-1 group min-h-[300px]">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg0MHY0MEgwVjB6bTM5IDM5VjFoLTM4djM4aDM4eiIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIwLjA0IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none" />
                <div className="absolute top-4 left-4 text-[10px] font-mono tracking-[0.2em] text-teal/50 font-bold pointer-events-none select-none z-20">QUERY_ENGINE</div>
                
                <div className="relative z-10 w-full max-w-sm flex flex-col gap-4">
                  <div className="bg-white border border-indigo/10 rounded-xl shadow-[0_4px_12px_rgb(0,0,0,0.05)] p-3.5 flex gap-3 items-center group-hover:-translate-y-1 transition-transform duration-500">
                    <svg className="w-4 h-4 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    <div className="text-[13px] font-medium text-indigo-deep">What did we decide about pricing?</div>
                  </div>
                  
                  <div className="bg-white border border-indigo/10 rounded-2xl shadow-[0_12px_40px_rgb(0,0,0,0.08)] p-5 ml-6 relative overflow-hidden group-hover:-translate-y-1 transition-transform duration-500 delay-75">
                    <div className="absolute top-0 left-0 w-1 h-full bg-teal" />
                    <div className="text-[10px] font-bold tracking-[0.1em] uppercase text-teal mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" /> Decision Found
                    </div>
                    <div className="text-[14px] font-medium leading-[1.5] text-indigo-deep mb-4">
                      Hold the pricing change until after launch to avoid <span className="text-teal font-bold border-b border-teal/30">support confusion</span>.
                    </div>
                    <div className="flex items-center justify-between border-t border-indigo/10 pt-3">
                      <span className="text-[11px] font-bold text-indigo bg-indigo-wash px-2.5 py-1 rounded-md border border-indigo/10">Product Review</span>
                      <span className="text-[11px] font-mono text-indigo/60">12:04</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
