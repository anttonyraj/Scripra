export default function SolutionsSection() {
  return (
    <section id="solutions" className="py-24 px-6 bg-canvas border-t border-line">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[clamp(32px,4vw,46px)] font-bold tracking-[-0.03em] leading-[1.05] mb-4 text-ink">
            Scripra fits the conversation.
          </h2>
          <p className="text-[17px] text-ink-2 max-w-[600px] mx-auto">
            From quick ideas to executive board meetings, Scripra adapts to how you and your team work.
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          
          <div className="bg-panel border border-line rounded-2xl p-8 hover:border-indigo transition-colors group">
            <div className="w-10 h-10 rounded-xl bg-indigo-wash text-indigo flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                <line x1="12" x2="12" y1="19" y2="22"/>
              </svg>
            </div>
            <h3 className="text-[18px] font-bold text-ink mb-3">Personal productivity</h3>
            <p className="text-[14px] text-ink-2 leading-relaxed">
              Capture voice notes, ideas, reminders, and personal meetings. Turn unstructured thoughts into searchable memory.
            </p>
          </div>

          <div className="bg-panel border border-line rounded-2xl p-8 hover:border-indigo transition-colors group">
            <div className="w-10 h-10 rounded-xl bg-indigo-wash text-indigo flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                <line x1="16" x2="16" y1="2" y2="6"/>
                <line x1="8" x2="8" y1="2" y2="6"/>
                <line x1="3" x2="21" y1="10" y2="10"/>
              </svg>
            </div>
            <h3 className="text-[18px] font-bold text-ink mb-3">Meetings</h3>
            <p className="text-[14px] text-ink-2 leading-relaxed">
              Generate perfect recaps, Minutes of Meeting (MoM), extract decisions, and track action items automatically.
            </p>
          </div>

          <div className="bg-panel border border-line rounded-2xl p-8 hover:border-indigo transition-colors group">
            <div className="w-10 h-10 rounded-xl bg-indigo-wash text-indigo flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
              </svg>
            </div>
            <h3 className="text-[18px] font-bold text-ink mb-3">Education</h3>
            <p className="text-[14px] text-ink-2 leading-relaxed">
              Turn lectures and study sessions into transcripts, summaries, core concepts, and long-term study memory.
            </p>
          </div>

          <div className="bg-panel border border-line rounded-2xl p-8 hover:border-indigo transition-colors group">
            <div className="w-10 h-10 rounded-xl bg-indigo-wash text-indigo flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <h3 className="text-[18px] font-bold text-ink mb-3">Customer conversations</h3>
            <p className="text-[14px] text-ink-2 leading-relaxed">
              Track customer needs, objections, commitments, and follow-ups across the entire sales cycle.
            </p>
          </div>

          <div className="bg-panel border border-line rounded-2xl p-8 hover:border-indigo transition-colors group">
            <div className="w-10 h-10 rounded-xl bg-indigo-wash text-indigo flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6"/>
                <polyline points="8 6 2 12 8 18"/>
              </svg>
            </div>
            <h3 className="text-[18px] font-bold text-ink mb-3">Engineering & product</h3>
            <p className="text-[14px] text-ink-2 leading-relaxed">
              Capture technical discussions, architecture decisions, recurring blockers, and feature requests.
            </p>
          </div>

          <div className="bg-panel border border-line rounded-2xl p-8 hover:border-indigo transition-colors group">
            <div className="w-10 h-10 rounded-xl bg-indigo-wash text-indigo flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </div>
            <h3 className="text-[18px] font-bold text-ink mb-3">Leadership</h3>
            <p className="text-[14px] text-ink-2 leading-relaxed">
              Align the organization by tracking high-level decisions, commitments, and surfacing recurring risks.
            </p>
          </div>

        </div>

        {/* Who Uses Scripra */}
        <div className="border-t border-line pt-20">
          <div className="text-center mb-12">
            <h3 className="text-[24px] font-bold tracking-tight text-ink">Built for professionals and learners</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            
            <div className="flex flex-col gap-2">
              <span className="text-[13px] font-bold text-ink">Students</span>
              <p className="text-[12px] text-ink-3 leading-relaxed">Turn lectures into transcripts, summaries, and searchable notes.</p>
            </div>
            
            <div className="flex flex-col gap-2">
              <span className="text-[13px] font-bold text-ink">Consultants</span>
              <p className="text-[12px] text-ink-3 leading-relaxed">Capture client discussions, decisions and follow-ups perfectly.</p>
            </div>
            
            <div className="flex flex-col gap-2">
              <span className="text-[13px] font-bold text-ink">Founders</span>
              <p className="text-[12px] text-ink-3 leading-relaxed">Capture investor meetings, ideas and critical commitments.</p>
            </div>
            
            <div className="flex flex-col gap-2">
              <span className="text-[13px] font-bold text-ink">Researchers</span>
              <p className="text-[12px] text-ink-3 leading-relaxed">Record interviews and easily retrieve patterns and themes later.</p>
            </div>
            
            <div className="flex flex-col gap-2">
              <span className="text-[13px] font-bold text-ink">Journalists</span>
              <p className="text-[12px] text-ink-3 leading-relaxed">Capture interviews and trace quotes back to the source audio.</p>
            </div>
            
            <div className="flex flex-col gap-2">
              <span className="text-[13px] font-bold text-ink">Professionals</span>
              <p className="text-[12px] text-ink-3 leading-relaxed">Turn everyday meetings and voice notes into tasks and memory.</p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
