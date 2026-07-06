"use client";

import { useEffect, useRef, useState } from "react";

type Stat = {
  /** number → animated count-up; string → shown as-is (e.g. "∞") */
  value: number | string;
  prefix?: string;
  suffix?: string;
  label: string;
};

const stats: Stat[] = [
  { value: 1, suffix: " day", label: "Typical reply time" },
  { value: 100, label: "Performance score we build toward" },
  { value: "∞", label: "Iterations after launch" },
  { value: 0, label: "Off-the-shelf templates" },
];

function CountUp({ to, duration = 1400 }: { to: number; duration?: number }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(to);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const p = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              setN(Math.round(eased * to));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  return <span ref={ref}>{n}</span>;
}

export function Stats() {
  return (
    <section className="border-t border-white/5 py-16 md:py-20">
      <div className="container-page">
        <dl className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="reveal text-center md:text-left"
              style={{ ["--reveal-delay" as string]: `${(i % 4) * 80}ms` }}
            >
              <dd className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                {s.prefix}
                {typeof s.value === "number" ? <CountUp to={s.value} /> : s.value}
                {s.suffix}
              </dd>
              <dt className="mt-3 text-sm leading-relaxed text-slate-400">
                {s.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
