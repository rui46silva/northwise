import { SectionHeading } from "./SectionHeading";

const articles = [
  {
    category: "Strategy",
    title: "Why most websites fail before a line of code is written",
    body: "The cost of skipping direction — and how clarity up front saves months later.",
  },
  {
    category: "Performance",
    title: "Core Web Vitals as a growth lever, not a checkbox",
    body: "How speed quietly shapes rankings, conversions and trust.",
  },
  {
    category: "Design",
    title: "Conversion is a design decision",
    body: "Removing noise from a page is harder — and more valuable — than adding to it.",
  },
];

export function Thinking() {
  return (
    <section id="thinking" className="scroll-mt-24 border-t border-white/5 py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="Thinking"
          title="How we see the web"
          description="Notes on building clearer, faster, more effective web experiences. Less noise, more direction."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {articles.map((a, i) => (
            <article
              key={a.title}
              className="card reveal flex flex-col"
              style={{ ["--reveal-delay" as string]: `${(i % 3) * 80}ms` }}
            >
              <span className="eyebrow">{a.category}</span>
              <h3 className="mt-4 text-lg font-semibold leading-snug">{a.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">{a.body}</p>
              <span className="mt-6 text-sm font-medium text-brand-400">Coming soon →</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
