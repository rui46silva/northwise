import { SectionHeading } from "./SectionHeading";

const careItems = [
  { title: "Monitoring", body: "Uptime, performance and error tracking so issues are caught before your users notice." },
  { title: "Updates & security", body: "Dependencies, patches and backups kept current — your platform stays safe and stable." },
  { title: "Performance tuning", body: "Continuous Core Web Vitals work to keep pages fast as your content grows." },
  { title: "Content & iteration", body: "Ongoing changes, new pages and improvements without the agency runaround." },
];

export function Care() {
  return (
    <section id="care" className="scroll-mt-24 border-t border-white/5 py-24 md:py-32">
      <div className="container-page grid items-start gap-14 lg:grid-cols-2">
        <SectionHeading
          eyebrow="Care"
          title="We don't disappear after launch."
          description="A website is a living thing. Northwise offers ongoing partnership to keep yours fast, secure and evolving — so your investment keeps compounding."
        />

        <div className="grid gap-5 sm:grid-cols-2">
          {careItems.map((item, i) => (
            <div
              key={item.title}
              className="card reveal"
              style={{ ["--reveal-delay" as string]: `${(i % 2) * 90}ms` }}
            >
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
