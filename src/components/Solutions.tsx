import { SectionHeading } from "./SectionHeading";

const solutions = [
  {
    title: "Web Development",
    body: "Fast, accessible and scalable websites and apps built on modern foundations — engineered to last, not just to launch.",
    tag: "01",
  },
  {
    title: "Web Design",
    body: "Interfaces with intent. Clean, conversion-focused design that reflects your brand and removes friction for your users.",
    tag: "02",
  },
  {
    title: "Landing Pages",
    body: "High-performance pages engineered around a single goal: turning the right visitors into qualified leads.",
    tag: "03",
  },
  {
    title: "Custom Web Platforms",
    body: "Tailored web applications, portals and internal tools that fit how your business actually works.",
    tag: "04",
  },
  {
    title: "SEO & Performance",
    body: "Technical SEO, Core Web Vitals and analytics built in from day one — so you get found and stay fast.",
    tag: "05",
  },
  {
    title: "Care & Maintenance",
    body: "We don't disappear after launch. Ongoing monitoring, updates and improvements keep your platform sharp.",
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
          {solutions.map((s) => (
            <article key={s.title} className="card group">
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
