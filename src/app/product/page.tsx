import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product — Scripra",
  description: "Learn how Scripra captures, understands, acts, and recalls your conversations.",
};

export default function Product() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-24">
        <div className="max-w-[1080px] mx-auto px-6">
          <div className="text-center max-w-[800px] mx-auto mb-20">
            <h1 className="text-[clamp(36px,5vw,54px)] font-bold tracking-[-0.03em] mb-6">
              From spoken word to structural intelligence.
            </h1>
            <p className="text-[19px] leading-[1.65] text-ink-2">
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
              <div className="bg-raise rounded-2xl aspect-video border border-line flex items-center justify-center p-8">
                <div className="w-16 h-16 rounded-full bg-indigo flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
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
              <div className="bg-raise rounded-2xl aspect-video border border-line flex items-center justify-center p-8 md:order-1">
                <div className="bg-card p-6 rounded-xl border border-line shadow-sm w-full max-w-sm">
                  <div className="w-1/2 h-2 bg-line rounded mb-4"></div>
                  <div className="w-full h-2 bg-line rounded mb-2"></div>
                  <div className="w-3/4 h-2 bg-line rounded mb-6"></div>
                  
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-indigo-wash text-indigo rounded text-[10px] font-bold uppercase">Decision</span>
                    <span className="px-2 py-1 bg-rose-wash text-rose rounded text-[10px] font-bold uppercase">Risk</span>
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
              <div className="bg-raise rounded-2xl aspect-video border border-line flex items-center justify-center p-8">
                <div className="bg-card border border-line rounded-[13px] p-5 w-full max-w-sm shadow-sm">
                  <h3 className="text-[10px] font-semibold tracking-[0.17em] uppercase text-ink flex items-center gap-2 mb-4">
                    Action items
                  </h3>
                  <div className="flex gap-3 items-start">
                    <div className="w-4 h-4 rounded border-2 border-line-hi mt-0.5" />
                    <div className="flex-1">
                      <div className="text-[14px] leading-[1.5] text-ink mb-2">Finish regression testing.</div>
                      <div className="flex gap-2 items-center">
                        <span className="px-2.5 py-1 rounded-full bg-amber-wash text-amber-deep text-[10.5px] font-semibold">Michael</span>
                        <span className="px-2.5 py-1 rounded-full bg-amber-wash text-amber-deep text-[10.5px] font-semibold">Thursday</span>
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
              <div className="bg-raise rounded-2xl aspect-[4/3] border border-line flex items-center justify-center p-8 md:order-1 overflow-hidden relative">
                 <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-sm">
                   <div className="bg-card border border-line rounded-lg shadow-sm p-3 flex gap-3 items-center mb-6">
                     <svg className="w-4 h-4 text-ink-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                     <div className="text-[13px] text-ink-2">What did we decide about pricing?</div>
                   </div>
                   <div className="bg-card border border-line rounded-[13px] p-5 ml-4">
                     <div className="text-[10px] font-semibold tracking-[0.17em] uppercase text-indigo mb-2">Decision Found</div>
                     <div className="text-[14px] text-ink">Hold the pricing change until after launch.</div>
                     <div className="text-[11px] font-mono text-ink-3 mt-3">From: Product review (13 Aug)</div>
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
