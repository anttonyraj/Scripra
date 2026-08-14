export default function EnterpriseSection() {
  const controls = [
    { title: "Access Control", desc: "Manage who can view and share specific conversations." },
    { title: "Data Retention", desc: "Set automatic deletion policies for transcripts and audio." },
    { title: "Audit Logs", desc: "Track organizational usage and data access." },
    { title: "Administration", desc: "Centralized workspace and billing management." }
  ];

  return (
    <section className="py-32 bg-canvas">
      <div className="max-w-[1080px] mx-auto px-6">
        
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="lg:w-1/2">
            <h2 className="text-[clamp(36px,5vw,52px)] font-bold tracking-[-0.03em] text-ink leading-[1.05] mb-6">
              Conversation intelligence for your organization.
            </h2>
            <p className="text-[18px] text-ink-2 leading-[1.6]">
              Scripra is designed to support enterprise-grade administration, security and data controls as the platform matures.
            </p>
          </div>
          
          <div className="lg:w-1/2 w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
            {controls.map((control, i) => (
              <div key={i} className="bg-panel border border-line rounded-xl p-6 shadow-sm">
                <div className="w-8 h-8 rounded bg-raise border border-line flex items-center justify-center text-indigo mb-4">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </div>
                <h3 className="text-[16px] font-bold text-ink mb-2">{control.title}</h3>
                <p className="text-[14px] text-ink-2 leading-[1.5]">{control.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
