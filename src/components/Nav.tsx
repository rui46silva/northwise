"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { siteConfig } from "@/lib/site";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: mark the nav item whose section is currently in view.
  useEffect(() => {
    const ids = siteConfig.nav.map((item) => item.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      // Bias the "active" band toward the upper-middle of the viewport.
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="container-page flex items-center justify-between py-5">
        <a href="#main" aria-label={`${siteConfig.name} home`} className="shrink-0">
          <Logo className="h-9" />
        </a>

        {/* Desktop pill nav */}
        <nav
          aria-label="Primary"
          className={`hidden items-center gap-1 rounded-full border px-2 py-2 backdrop-blur-md transition md:flex ${
            scrolled
              ? "border-white/10 bg-ink-900/70"
              : "border-white/10 bg-white/[0.04]"
          }`}
        >
          {siteConfig.nav.map((item) => {
            const isActive = activeId === item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                data-active={isActive}
                aria-current={isActive ? "true" : undefined}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition hover:text-white ${
                  isActive ? "bg-white/10 text-white" : "text-slate-300"
                }`}
              >
                <span className="bracket">{item.label}</span>
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a href="#start" className="hidden btn-primary md:inline-flex">
            <span className="bracket">Start a project.</span>
          </a>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white md:hidden"
          >
            <span className="sr-only">Menu</span>
            <div className="space-y-1.5">
              <span
                className={`block h-0.5 w-5 bg-current transition ${open ? "translate-y-2 rotate-45" : ""}`}
              />
              <span className={`block h-0.5 w-5 bg-current transition ${open ? "opacity-0" : ""}`} />
              <span
                className={`block h-0.5 w-5 bg-current transition ${open ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="container-page md:hidden">
          <nav
            aria-label="Mobile"
            className="flex flex-col gap-1 rounded-2xl border border-white/10 bg-ink-900/95 p-3 backdrop-blur-md"
          >
            {siteConfig.nav.map((item) => {
              const isActive = activeId === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  data-active={isActive}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-4 py-3 text-base font-medium transition hover:bg-white/5 hover:text-white ${
                    isActive ? "bg-white/5 text-white" : "text-slate-200"
                  }`}
                >
                  <span className="bracket">{item.label}</span>
                </a>
              );
            })}
            <a
              href="#start"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2"
            >
              <span className="bracket">Start a project.</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
