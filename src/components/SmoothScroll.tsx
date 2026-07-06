"use client";

import { useEffect } from "react";

/**
 * Eased smooth-scrolling for in-page anchor links, offset for the fixed nav.
 * Falls back to an instant jump for reduced-motion users.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) {
        return;
      }
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link) return;

      const hash = link.getAttribute("href");
      if (!hash || hash.length < 2) return;

      const target = document.querySelector<HTMLElement>(hash);
      if (!target) return;

      e.preventDefault();

      const header = document.querySelector("header");
      const offset = (header?.getBoundingClientRect().height ?? 72) + 16;
      const destination =
        target.getBoundingClientRect().top + window.scrollY - offset;

      if (reduce) {
        window.scrollTo(0, destination);
        history.pushState(null, "", hash);
        return;
      }

      const startY = window.scrollY;
      const distance = destination - startY;
      const duration = Math.min(900, Math.max(450, Math.abs(distance) * 0.5));
      const startTime = performance.now();
      const easeInOutCubic = (t: number) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      const step = (now: number) => {
        const p = Math.min((now - startTime) / duration, 1);
        window.scrollTo(0, startY + distance * easeInOutCubic(p));
        if (p < 1) {
          requestAnimationFrame(step);
        } else {
          history.pushState(null, "", hash);
        }
      };
      requestAnimationFrame(step);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
