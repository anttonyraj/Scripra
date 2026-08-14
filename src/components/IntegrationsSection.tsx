export default function IntegrationsSection() {
  const integrations = [
    {
      category: "Meeting",
      items: [
        { name: "Zoom", status: "Coming soon" },
        { name: "Google Meet", status: "Coming soon" },
        { name: "Microsoft Teams", status: "Coming soon" }
      ]
    },
    {
      category: "Calendar",
      items: [
        { name: "Google Calendar", status: "Coming soon" },
        { name: "Outlook", status: "Coming soon" }
      ]
    },
    {
      category: "Work",
      items: [
        { name: "Slack", status: "Coming soon" },
        { name: "Jira", status: "Coming soon" }
      ]
    },
    {
      category: "CRM",
      items: [
        { name: "Salesforce", status: "Coming soon" },
        { name: "HubSpot", status: "Coming soon" }
      ]
    }
  ];

  return (
    <section className="py-32 bg-raise border-y border-line">
      <div className="max-w-[1080px] mx-auto px-6">
        
        <div className="text-center max-w-[700px] mx-auto mb-20">
          <h2 className="text-[clamp(36px,5vw,52px)] font-bold tracking-[-0.03em] text-ink leading-[1.05] mb-6">
            <span className="block text-ink">Conversations happen everywhere.</span>
            <span className="block text-indigo">Scripra should meet you there.</span>
          </h2>
          <p className="text-[18px] text-ink-2 leading-[1.6]">
            We are building native integrations to bring Scripra directly into the tools your team already uses every day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {integrations.map((group) => (
            <div key={group.category} className="flex flex-col gap-4">
              <div className="text-[12px] font-bold tracking-[0.15em] uppercase text-ink-3 border-b border-line pb-2 mb-2">
                {group.category}
              </div>
              <div className="flex flex-col gap-3">
                {group.items.map((item) => (
                  <div key={item.name} className="bg-panel border border-line rounded-xl p-4 flex items-center justify-between shadow-sm">
                    <span className="text-[14px] font-semibold text-ink">{item.name}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-ink-3 bg-raise px-2 py-1 rounded">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
