"use client";

import { useLayoutEffect, useRef, useState } from "react";

export function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [boxWidth, setBoxWidth] = useState<number>();

  // Match the eyebrow and body width to the rendered width of the title box.
  useLayoutEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const measure = () => setBoxWidth(el.getBoundingClientRect().width);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    // Web fonts can settle after first paint and change the title width.
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(measure).catch(() => {});
    }
    return () => ro.disconnect();
  }, []);

  const boxStyle = boxWidth ? { width: `${boxWidth}px` } : undefined;

  return (
    <section className="relative isolate overflow-hidden pb-28 pt-40 md:pb-40 md:pt-48">
      {/* Space background: starfield + glowing planet horizon */}
      <div className="starfield animate-glow-pulse" aria-hidden="true" />

      <div className="container-page relative">
        <div className="mx-auto w-fit max-w-full text-left">
          <p style={boxStyle} className="eyebrow max-w-full animate-fade-up">
            Web Development Studio / Northern Portugal
          </p>

          <h1
            ref={titleRef}
            className="mt-6 w-fit max-w-full animate-fade-up text-5xl font-semibold leading-[1.05] sm:text-6xl md:text-7xl"
          >
            Direction over noise.
          </h1>

          <div style={boxStyle} className="max-w-full">
            <p className="mt-7 animate-fade-up text-justify text-lg leading-relaxed text-slate-300">
              Northwise builds strategic websites, landing pages and high-impact
              web experiences for businesses that need clarity, performance and
              growth.
            </p>

            <div className="mt-10 flex animate-fade-up flex-col gap-3 sm:flex-row">
              <a href="#start" className="btn-primary w-full sm:w-auto">
                <span className="bracket">Start a project.</span>
              </a>
              <a href="#solutions" className="btn-ghost w-full sm:w-auto">
                Explore solutions
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
