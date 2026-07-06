"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Magnetic } from "./Magnetic";

export function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const spaceRef = useRef<HTMLDivElement>(null);
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

  // Subtle parallax: the background drifts slower than the page as you scroll.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = spaceRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate3d(0, ${window.scrollY * 0.18}px, 0)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const boxStyle = boxWidth ? { width: `${boxWidth}px` } : undefined;

  return (
    <section className="relative isolate flex min-h-screen items-center overflow-hidden pb-[22vh] pt-24">
      {/* Space background: brand horizon photo */}
      <div ref={spaceRef} className="hero-space will-change-transform" aria-hidden="true">
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
              <Magnetic className="w-full sm:w-auto">
                <a href="#start" className="btn-primary w-full sm:w-auto">
                  <span className="bracket">Start a project.</span>
                </a>
              </Magnetic>
              <Magnetic className="w-full sm:w-auto">
                <a href="#solutions" className="btn-ghost w-full sm:w-auto">
                  Explore solutions
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
