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

            {/* Enterprise Mockup UI */}
            <div className="relative w-full rounded-[32px] bg-indigo-[0.03] border border-indigo/10 p-6 md:p-8 overflow-hidden shadow-sm group mt-12">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg0MHY0MEgwVjB6bTM5IDM5VjFoLTM4djM4aDM4eiIgZmlsbD0iIzAwMCIgZmlsbC1vcGFjaXR5PSIwLjA0IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none" />
              <div className="absolute top-5 right-5 text-[11px] font-mono tracking-[0.2em] text-teal/50 font-bold pointer-events-none">SECURITY_CONTROLS</div>
              
              <div className="relative z-10 bg-white rounded-2xl shadow-[0_12px_40px_rgb(0,0,0,0.08)] border border-line flex flex-col overflow-hidden transition-transform duration-500 group-hover:-translate-y-1">
                <div className="px-5 py-3.5 border-b border-line bg-white backdrop-blur-md flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="bg-indigo-wash text-indigo px-3 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase border border-indigo/20">Workspace Admin</span>
                  </div>
                </div>
                
                <div className="p-5 bg-white flex flex-col gap-4">
                  <div className="border border-indigo/10 rounded-xl p-4 bg-white shadow-sm flex items-center justify-between hover:border-indigo/40 transition-colors">
                    <div>
                      <p className="text-indigo-deep text-[14px] font-bold mb-1">Require SSO / SAML</p>
                      <p className="text-ink-3 text-[13px]">Enforce Okta or Google login for all members</p>
                    </div>
                    <div className="w-12 h-7 rounded-full bg-teal flex items-center p-1 shadow-inner">
                      <div className="w-5 h-5 bg-white rounded-full shadow-sm ml-auto" />
                    </div>
                  </div>
                  
                  <div className="border border-indigo/10 rounded-xl p-4 bg-white shadow-sm flex items-center justify-between hover:border-indigo/40 transition-colors">
                    <div>
                      <p className="text-indigo-deep text-[14px] font-bold mb-1">Data Retention Policy</p>
                      <p className="text-ink-3 text-[13px]">Auto-delete audio and transcripts</p>
                    </div>
                    <div className="bg-indigo-wash text-indigo px-3.5 py-1.5 rounded-md text-[13px] font-bold border border-indigo/20">
                      90 Days
                    </div>
                  </div>

                  <div className="border border-indigo/10 rounded-xl p-4 bg-white shadow-sm flex items-center justify-between hover:border-indigo/40 transition-colors">
                    <div>
                      <p className="text-indigo-deep text-[14px] font-bold mb-1">Export Audit Logs</p>
                      <p className="text-ink-3 text-[13px]">Download activity history (CSV)</p>
                    </div>
                    <div className="w-9 h-9 rounded-lg border border-indigo/20 flex items-center justify-center text-indigo hover:bg-indigo-wash transition-colors cursor-pointer shadow-sm">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
