import { SectionHeading } from "./SectionHeading";

const steps = [
  {
    n: "01",
    title: "Discover",
    body: "We start with your goals, audience and constraints — not with a template. Clarity before pixels.",
  },
  {
    n: "02",
    title: "Direct",
    body: "Strategy, structure and priorities. We cut the noise and decide what actually moves the needle.",
  },
  {
    n: "03",
    title: "Design",
    body: "Interface and experience designed around the message, the user and the conversion.",
  },
  {
    n: "04",
    title: "Develop",
    body: "Clean, performant, SEO-ready code. Built, optimized and tested for the real world.",
  },
  {
    n: "05",
    title: "Deliver & iterate",
    body: "Launch, measure, improve. We use analytics to keep refining long after go-live.",
  },
];

export function Process() {
  return (
    <section id="process" className="scroll-mt-24 border-t border-white/5 py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="Process"
          title="Direction over noise."
          description="A clear, deliberate way of working. Every decision earns its place — nothing ships just because it looks busy."
        />

        <ol className="reveal mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 md:grid-cols-5">
          {steps.map((step) => (
            <li key={step.n} className="bg-ink-950 p-7">
              <span className="font-display text-2xl font-semibold text-brand-400">
                {step.n}
              </span>
              <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
