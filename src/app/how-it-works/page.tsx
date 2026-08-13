import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How it works — Scripra",
  description: "A simple four-stage pipeline from conversation to structured, traceable intelligence.",
};

export default function HowItWorks() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-24">
        <div className="max-w-[1080px] mx-auto px-6">
          <div className="text-center max-w-[800px] mx-auto mb-24">
            <h1 className="text-[clamp(36px,5vw,54px)] font-bold tracking-[-0.03em] mb-6">
              How Scripra works.
            </h1>
            <p className="text-[19px] leading-[1.65] text-ink-2">
              A seamless pipeline that turns audio into text, text into structure, and structure into verifiable memory.
            </p>
          </div>

          <div className="max-w-[700px] mx-auto relative">
            {/* The vertical connection line */}
            <div className="absolute left-[39px] top-[80px] bottom-[80px] w-[2px] bg-line hidden md:block" />

            <div className="space-y-16">
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row gap-8 relative z-10">
                <div className="w-20 h-20 rounded-2xl bg-canvas border-2 border-line flex items-center justify-center text-[24px] font-bold text-ink-3 shrink-0">
                  01
                </div>
                <div className="pt-4">
                  <h3 className="text-[22px] font-bold tracking-[-0.02em] text-ink mb-3">Record or upload</h3>
                  <p className="text-[16px] leading-[1.65] text-ink-2">
                    Scripra captures audio from your browser, in-person meetings, or existing files.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col md:flex-row gap-8 relative z-10">
                <div className="w-20 h-20 rounded-2xl bg-canvas border-2 border-line flex items-center justify-center text-[24px] font-bold text-ink-3 shrink-0">
                  02
                </div>
                <div className="pt-4">
                  <h3 className="text-[22px] font-bold tracking-[-0.02em] text-ink mb-3">Transcribe and separate speakers</h3>
                  <p className="text-[16px] leading-[1.65] text-ink-2">
                    Advanced models turn speech into a highly accurate transcript, automatically identifying who said what.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col md:flex-row gap-8 relative z-10">
                <div className="w-20 h-20 rounded-2xl bg-canvas border-2 border-line flex items-center justify-center text-[24px] font-bold text-ink-3 shrink-0">
                  03
                </div>
                <div className="pt-4">
                  <h3 className="text-[22px] font-bold tracking-[-0.02em] text-ink mb-3">Extract conversation intelligence</h3>
                  <p className="text-[16px] leading-[1.65] text-ink-2">
                    Scripra identifies decisions, action items, risks, and commitments from the unstructured text.
                  </p>
                </div>
              </div>

              {/* Step 4 - The visual emphasis */}
              <div className="flex flex-col md:flex-row gap-8 relative z-10">
                <div className="w-20 h-20 rounded-2xl bg-indigo text-white shadow-lg flex items-center justify-center text-[24px] font-bold shrink-0">
                  04
                </div>
                <div className="pt-4 w-full">
                  <h3 className="text-[22px] font-bold tracking-[-0.02em] text-ink mb-3">Link every insight to evidence</h3>
                  <p className="text-[16px] leading-[1.65] text-ink-2 mb-8">
                    Trust requires verification. Every structured insight points directly back to the moment in the conversation it originated from.
                  </p>

                  <div className="bg-panel border border-line rounded-2xl p-6 shadow-sm">
                    <div className="mb-6">
                      <div className="text-[11px] font-semibold text-ink-3 uppercase tracking-[0.1em] mb-2">Conversation</div>
                      <div className="bg-raise border-l-2 border-indigo p-4 rounded-r-lg">
                        <p className="text-[15px] italic text-ink-2">
                          &quot;I&apos;ll finish regression testing Thursday.&quot;
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-center my-4">
                      <div className="text-indigo-lift text-xl">↓</div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <div className="text-[11px] font-semibold text-ink-3 uppercase tracking-[0.1em] mb-2">Structured Action Item</div>
                        <div className="bg-card border border-line p-4 rounded-xl shadow-sm">
                          <p className="text-[14px] font-medium text-ink mb-2">Finish regression testing</p>
                          <div className="flex gap-2 text-[12px]">
                            <span className="text-ink-3">Owner:</span>
                            <span className="font-semibold text-amber-deep">Michael</span>
                          </div>
                          <div className="flex gap-2 text-[12px] mt-1">
                            <span className="text-ink-3">Due:</span>
                            <span className="font-semibold text-amber-deep">Thursday</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col justify-center">
                        <div className="text-[11px] font-semibold text-indigo uppercase tracking-[0.1em] mb-2">Evidence Link</div>
                        <div className="inline-flex items-center gap-2 bg-indigo-wash text-indigo px-3 py-2 rounded-lg font-mono text-[13px] self-start">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          12:11
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
