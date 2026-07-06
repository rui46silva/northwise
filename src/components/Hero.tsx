"use client";

import Image from "next/image";
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
    <section className="relative isolate flex min-h-screen items-center overflow-hidden pb-[22vh] pt-24">
      {/* Space background: brand horizon photo */}
      <div className="hero-space" aria-hidden="true">
        <Image
          src="/background-northwise.png"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={85}
        />
        <div className="hero-fade" />
      </div>

      <div className="container-page relative">
        <div className="mx-auto w-fit max-w-full text-center">
          <p
            style={boxStyle}
            className="eyebrow mx-auto max-w-full animate-fade-up [text-shadow:0_1px_16px_rgba(1,6,20,0.7)]"
          >
            Web Development Studio / Northern Portugal
          </p>

          <h1
            ref={titleRef}
            className="mx-auto mt-6 w-fit max-w-full animate-fade-up text-5xl font-semibold leading-[1.05] sm:text-6xl md:text-7xl"
          >
            Direction over noise.
          </h1>

          <div style={boxStyle} className="mx-auto max-w-full">
            <p className="mt-7 animate-fade-up text-justify text-lg leading-relaxed text-slate-100 [text-shadow:0_2px_18px_rgba(1,6,20,0.85)]">
              Northwise builds strategic websites, landing pages and high-impact
              web experiences for businesses that need clarity, performance and
              growth.
            </p>

            <div className="mt-10 flex animate-fade-up flex-col justify-center gap-3 sm:flex-row">
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
