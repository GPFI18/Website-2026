"use client";

import { useEffect, useRef } from "react";

/**
 * A statistic that counts up to `value` over 900ms the first time it scrolls
 * into view, preserving thousands separators.
 *
 * The final figure is what renders — on the server, without JavaScript, and
 * under reduced motion — so the number is never missing or wrong. The count-up
 * is a purely visual flourish applied by writing to the DOM node directly,
 * which also avoids a render per frame.
 */
export default function StatCounter({
  value,
  suffix = "",
  className,
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const final = value.toLocaleString("en-US") + suffix;
    let raf = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        let start: number | null = null;
        const step = (now: number) => {
          if (start === null) start = now;
          const p = Math.min((now - start) / 900, 1);
          el.textContent =
            Math.round(p * value).toLocaleString("en-US") + suffix;
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.5 },
    );

    // Start from zero only once we know the animation will run.
    el.textContent = "0" + suffix;
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      el.textContent = final;
    };
  }, [value, suffix]);

  return (
    <div ref={ref} className={className}>
      {value.toLocaleString("en-US")}
      {suffix}
    </div>
  );
}
