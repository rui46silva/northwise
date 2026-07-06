"use client";

import { useEffect, useRef, useState } from "react";
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
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  // Draw the timeline as the section scrolls through the viewport.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      return;
    }
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        // 0 when the section top passes 75% of the viewport,
        // 1 when the section bottom passes 35% of the viewport.
        const traveled = vh * 0.75 - rect.top;
        const range = vh * 0.4 + rect.height;
        setProgress(Math.min(Math.max(traveled / range, 0), 1));
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(raf);
    };
  }, []);

  const activeIndex = Math.round(progress * (steps.length - 1));

  return (
    <section
      ref={sectionRef}
      id="process"
      className="scroll-mt-24 border-t border-white/5 py-24 md:py-32"
    >
      <div className="container-page">
        <SectionHeading
          eyebrow="Process"
          title="Direction over noise."
          description="A clear, deliberate way of working. Every decision earns its place — nothing ships just because it looks busy."
        />

        {/* Scroll-drawn timeline (desktop) */}
        <div className="relative mt-14 mb-6 hidden h-0.5 md:block" aria-hidden="true">
          <div className="absolute inset-0 rounded-full bg-white/10" />
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-brand-600 to-brand-400"
            style={{ width: `${progress * 100}%` }}
          />
          {steps.map((s, i) => {
            const active = i <= activeIndex;
            return (
              <span
                key={s.n}
                className={`absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full ring-4 ring-ink-950 transition-colors duration-300 ${
                  active ? "bg-brand-400" : "bg-white/20"
                }`}
                style={{
                  left: `${(i / (steps.length - 1)) * 100}%`,
                  marginLeft: i === 0 ? 0 : i === steps.length - 1 ? -12 : -6,
                }}
              />
            );
          })}
        </div>

        <ol className="reveal grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 md:grid-cols-5">
          {steps.map((step, i) => {
            const active = i <= activeIndex;
            return (
              <li key={step.n} className="bg-ink-950 p-7">
                <span
                  className={`font-display text-2xl font-semibold transition-colors duration-300 ${
                    active ? "text-brand-400" : "text-slate-600"
                  }`}
                >
                  {step.n}
                </span>
                <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{step.body}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
