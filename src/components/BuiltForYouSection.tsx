import Link from "next/link";

export default function BuiltForYouSection() {
  return (
    <section className="py-24 px-6 bg-canvas">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-16">
          <div className="text-[11px] font-bold tracking-wider text-indigo uppercase mb-4">
            For you or your team
          </div>
          <h2 className="text-[clamp(32px,4vw,46px)] font-bold tracking-[-0.03em] leading-[1.05] mb-4 text-ink">
            One conversation platform.<br />Different ways to use it.
          </h2>
          <p className="text-[17px] text-ink-2 max-w-[600px] mx-auto">
            Scripra works for personal memory, learning, meetings and team collaboration — without changing the core workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Personal Panel */}
          <div className="bg-panel border border-line rounded-[32px] p-8 lg:p-12 shadow-sm flex flex-col h-full">
            <h3 className="text-[32px] font-bold tracking-tight text-ink mb-2">For individuals</h3>
            <p className="text-[18px] font-medium text-ink-2 mb-4">Remember everything worth keeping.</p>
            <p className="text-[15px] leading-relaxed text-ink-3 mb-10">
              Capture meetings, lectures, interviews, ideas and voice notes. Scripra turns them into organized, searchable memory you can use later.
            </p>

            <div className="flex-1 grid grid-cols-2 gap-x-6 gap-y-8 mb-12">
              <div>
                <h4 className="text-[11px] font-bold tracking-wider text-ink uppercase mb-3">Capture</h4>
                <ul className="text-[13px] text-ink-2 space-y-2">
                  <li>one-tap recording</li>
                  <li>voice notes</li>
                  <li>lectures</li>
                  <li>interviews</li>
                  <li>brainstorming</li>
                  <li>audio/video upload</li>
                </ul>
              </div>
              <div>
                <h4 className="text-[11px] font-bold tracking-wider text-ink uppercase mb-3">Understand</h4>
                <ul className="text-[13px] text-ink-2 space-y-2">
                  <li>transcript</li>
                  <li>summary</li>
                  <li>key points</li>
                  <li>topics</li>
                  <li>mind maps later</li>
                  <li>study notes later</li>
                </ul>
              </div>
              <div>
                <h4 className="text-[11px] font-bold tracking-wider text-ink uppercase mb-3">Act</h4>
                <ul className="text-[13px] text-ink-2 space-y-2">
                  <li>personal tasks</li>
                  <li>follow-ups</li>
                  <li>reminders</li>
                  <li>commitments</li>
                </ul>
              </div>
              <div>
                <h4 className="text-[11px] font-bold tracking-wider text-ink uppercase mb-3">Recall</h4>
                <ul className="text-[13px] text-ink-2 space-y-2">
                  <li>search your conversations</li>
                  <li>Ask Scripra</li>
                  <li>find old ideas</li>
                  <li>retrieve what someone said</li>
                  <li>revisit lecture concepts</li>
                </ul>
              </div>
            </div>

            {/* Mobile Mockup Example */}
            <div className="bg-canvas border border-line rounded-2xl p-6 mb-12 relative overflow-hidden flex flex-col gap-4">
              <div className="text-[10px] font-bold tracking-wider text-ink-3 mb-2 flex items-center gap-2">
                VOICE NOTE
                <div className="flex-1 h-px bg-line" />
              </div>
              <p className="text-[13px] text-ink leading-relaxed font-medium mb-2">
                "Remember to send the proposal tomorrow and compare AWS vs Azure pricing."
              </p>
              
              <div className="text-[10px] font-bold tracking-wider text-indigo mb-2 flex items-center gap-2 mt-2">
                SCRIPRA
                <div className="flex-1 h-px bg-indigo/10" />
              </div>
              
              <div className="bg-amber-wash border border-amber/30 rounded-lg p-3">
                <span className="text-[9px] font-bold tracking-wider text-amber uppercase mb-1 block">Action</span>
                <p className="text-[12px] font-medium text-ink mb-1">Send proposal</p>
                <span className="text-[10px] font-medium text-amber">Tomorrow</span>
              </div>
              <div className="bg-card border border-indigo/20 rounded-lg p-3">
                <span className="text-[9px] font-bold tracking-wider text-indigo uppercase mb-1 block">Topic</span>
                <p className="text-[12px] font-medium text-ink">Cloud pricing</p>
              </div>
              <div className="bg-card border border-line rounded-lg p-3">
                <span className="text-[9px] font-bold tracking-wider text-ink uppercase mb-1 block">Memory</span>
                <p className="text-[12px] font-medium text-ink">AWS vs Azure comparison</p>
              </div>
            </div>

            <div className="mt-auto pt-6 border-t border-line text-center">
              <Link href="/signup" className="inline-block px-6 py-3 rounded-xl bg-ink text-white text-[14px] font-semibold hover:bg-ink-2 transition-colors w-full mb-3 shadow-sm">
                Try Scripra for yourself
              </Link>
              <p className="text-[12px] text-ink-3">Start with a meeting, lecture or voice note.</p>
            </div>
          </div>

          {/* Team Panel */}
          <div className="bg-panel border border-line rounded-[32px] p-8 lg:p-12 shadow-sm flex flex-col h-full">
            <h3 className="text-[32px] font-bold tracking-tight text-ink mb-2">For teams</h3>
            <p className="text-[18px] font-medium text-ink-2 mb-4">Turn conversations into shared intelligence.</p>
            <p className="text-[15px] leading-relaxed text-ink-3 mb-10">
              Capture meetings and customer conversations, then keep decisions, actions, commitments and context connected across the organization.
            </p>

            <div className="flex-1 grid grid-cols-2 gap-x-6 gap-y-8 mb-12">
              <div>
                <h4 className="text-[11px] font-bold tracking-wider text-ink uppercase mb-3">Capture</h4>
                <ul className="text-[13px] text-ink-2 space-y-2">
                  <li>team meetings</li>
                  <li>customer calls</li>
                  <li>project reviews</li>
                  <li>interviews</li>
                  <li>imported recordings</li>
                </ul>
              </div>
              <div>
                <h4 className="text-[11px] font-bold tracking-wider text-ink uppercase mb-3">Understand</h4>
                <ul className="text-[13px] text-ink-2 space-y-2">
                  <li>speaker separation</li>
                  <li>recap & MoM</li>
                  <li>decisions</li>
                  <li>risks</li>
                  <li>open questions</li>
                </ul>
              </div>
              <div>
                <h4 className="text-[11px] font-bold tracking-wider text-ink uppercase mb-3">Act</h4>
                <ul className="text-[13px] text-ink-2 space-y-2">
                  <li>owners</li>
                  <li>deadlines</li>
                  <li>follow-ups</li>
                  <li>commitments</li>
                  <li>blockers</li>
                </ul>
              </div>
              <div>
                <h4 className="text-[11px] font-bold tracking-wider text-ink uppercase mb-3">Recall</h4>
                <ul className="text-[13px] text-ink-2 space-y-2">
                  <li>search across conversations</li>
                  <li>shared memory</li>
                  <li>project history</li>
                  <li>customer context</li>
                  <li>decision history</li>
                </ul>
              </div>
            </div>

            {/* Desktop Mockup Example */}
            <div className="bg-canvas border border-line rounded-2xl p-6 mb-12 relative overflow-hidden flex flex-col gap-4">
              <div className="text-[10px] font-bold tracking-wider text-indigo mb-2 flex items-center gap-2">
                PRODUCT REVIEW
                <div className="flex-1 h-px bg-indigo/10" />
              </div>
              
              <div className="bg-card border border-indigo/20 rounded-lg p-3">
                <span className="text-[9px] font-bold tracking-wider text-indigo uppercase mb-1 block">Decision</span>
                <p className="text-[12px] font-medium text-ink">Launch Friday</p>
              </div>
              <div className="bg-amber-wash border border-amber/30 rounded-lg p-3">
                <span className="text-[9px] font-bold tracking-wider text-amber uppercase mb-1 block">Action</span>
                <p className="text-[12px] font-medium text-ink mb-1">Finish regression testing</p>
                <span className="text-[10px] font-medium text-amber">Michael · Thursday</span>
              </div>
              <div className="bg-amber-wash border border-amber/30 rounded-lg p-3">
                <span className="text-[9px] font-bold tracking-wider text-amber uppercase mb-1 block">Commitment</span>
                <p className="text-[12px] font-medium text-ink">Update customer</p>
                <span className="text-[10px] font-medium text-amber">Sarah</span>
              </div>
              <div className="bg-card border border-rose/20 rounded-lg p-3">
                <span className="text-[9px] font-bold tracking-wider text-rose uppercase mb-1 block">Recurring Blocker</span>
                <p className="text-[12px] font-medium text-ink">Security approval</p>
              </div>
            </div>

            <div className="mt-auto pt-6 border-t border-line text-center">
              <Link href="/teams" className="inline-block px-6 py-3 rounded-xl bg-card border border-line text-ink text-[14px] font-semibold hover:border-indigo transition-colors w-full mb-3">
                Explore Scripra for teams
              </Link>
              <p className="text-[12px] text-ink-3">Turn meetings into decisions, actions and shared memory.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
