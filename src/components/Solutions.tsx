import { SectionHeading } from "./SectionHeading";

const solutions = [
  {
    title: "Business Websites",
    body: "A clear, professional website that presents your business properly and builds trust — delivered in weeks, built to last years.",
    tag: "01",
  },
  {
    title: "Landing Pages",
    body: "One page, one goal: turning visitors into contacts. Ideal for campaigns, product launches and validating a new idea fast.",
    tag: "02",
  },
  {
    title: "Web Design",
    body: "Clean, conversion-focused design shaped around your brand — not a recycled template your competitors are also using.",
    tag: "03",
  },
  {
    title: "SEO & Performance",
    body: "Technical SEO and speed built in from day one, so you show up on Google and load instantly on any device.",
    tag: "04",
  },
  {
    title: "Analytics & Leads",
    body: "Google Analytics, event tracking and a lead form wired straight to your inbox — you always know what's working.",
    tag: "05",
  },
  {
    title: "Care & Maintenance",
    body: "Launch is the start, not the end. Updates, backups and improvements at a predictable cost — no surprises, no runaround.",
    tag: "06",
  },
];

export function Solutions() {
  return (
    <section id="solutions" className="scroll-mt-24 border-t border-white/5 py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="Solutions"
          title="What we build"
          description="A focused set of services for businesses that want a web presence that performs — not just one that exists."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s, i) => (
            <article
              key={s.title}
              className="card group reveal"
              style={{ ["--reveal-delay" as string]: `${(i % 3) * 80}ms` }}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-brand-400">[{s.tag}]</span>
                <span className="h-2 w-2 rounded-full bg-brand-500/40 transition group-hover:bg-brand-400" />
              </div>
              <h3 className="mt-6 text-xl font-semibold">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{s.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
