"use client";

import { useEffect, useState } from "react";

/**
 * The site's shared motion layer.
 *
 * Replaces the prototype's DOM-mutating polish.js with one mounted component:
 *
 *   1. a scroll progress bar across the top of the viewport
 *   2. scroll reveals for anything marked `data-reveal`, staggered 80ms per
 *      sibling (capped at 480ms), with a failsafe that reveals everything after
 *      1.4s so nothing can be stranded invisible
 *   3. the gold accent rule under short section headings
 *   4. a back-to-top button past 520px of scroll
 *
 * All of it is inert under prefers-reduced-motion — the CSS reveals elements
 * outright in that case, and this component skips observing entirely.
 */
export default function MotionLayer() {
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
      setShowTop(window.scrollY > 520);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const reveal = (el: Element) => el.classList.add("is-revealed");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal(entry.target);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    const targets = Array.from(
      document.querySelectorAll("[data-reveal], .heading-accent"),
    );

    // Stagger siblings so a grid of cards arrives as a wave, not a block.
    const seen = new Map<Element, number>();
    for (const el of targets) {
      const parent = el.parentElement;
      if (parent) {
        const n = seen.get(parent) ?? 0;
        seen.set(parent, n + 1);
        (el as HTMLElement).style.setProperty(
          "--reveal-delay",
          `${Math.min(n * 80, 480)}ms`,
        );
      }
      observer.observe(el);
    }

    // Failsafe: anything the observer missed becomes visible anyway.
    const failsafe = window.setTimeout(() => targets.forEach(reveal), 1400);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]"
      >
        <div
          className="h-full bg-[linear-gradient(90deg,#0b4aa2,#7fb2ee_45%,#e9c877)] transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={[
          "fixed bottom-7 right-7 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-[0_14px_30px_-12px_rgba(10,30,66,0.7)] transition-all duration-300 hover:bg-gold-500 hover:text-[#1a1200]",
          showTop
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0",
        ].join(" ")}
      >
        <span className="sr-only">Back to top</span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M12 19V5" />
          <path d="M5 12l7-7 7 7" />
        </svg>
      </button>
    </>
  );
}
