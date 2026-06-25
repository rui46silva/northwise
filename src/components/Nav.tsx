"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { siteConfig } from "@/lib/site";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="container-page flex items-center justify-between py-5">
        <a href="#main" aria-label={`${siteConfig.name} home`} className="shrink-0">
          <Logo className="h-9 w-9" />
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
          {siteConfig.nav.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition hover:text-white ${
                i === 0 ? "text-white" : "text-slate-300"
              }`}
            >
              {i === 0 ? <span className="bracket">{item.label}</span> : item.label}
            </a>
          ))}
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
            {siteConfig.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-base font-medium text-slate-200 transition hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </a>
            ))}
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
