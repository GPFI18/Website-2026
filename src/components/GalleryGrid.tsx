"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/**
 * The photo archive.
 *
 * The load sequence is deliberate and worth preserving:
 *
 *   1. every image's dimensions are measured off-DOM before layout, with a
 *      1.4s timeout so one slow file can't hold up the grid;
 *   2. images are distributed into height-balanced flex columns,
 *      shortest-column-first — not CSS `column-count`, which reflowed visibly;
 *   3. each tile reserves its exact aspect ratio up front, so nothing shifts
 *      as pictures arrive;
 *   4. a shimmer skeleton fills the tile until its image decodes;
 *   5. tiles fade and rise in on a diagonal stagger.
 *
 * The lightbox cross-fades between slides, wraps at both ends, and supports
 * Escape / ← / → alongside the on-screen controls.
 */

const COUNT = 28;
const SOURCES = Array.from(
  { length: COUNT },
  (_, i) => `/assets/gallery/g${String(i + 1).padStart(2, "0")}.jpg`,
);

type Meta = { ratio: number };

function columnsFor(width: number) {
  if (width < 720) return 1;
  if (width < 1040) return 2;
  return 3;
}

export default function GalleryGrid() {
  const [meta, setMeta] = useState<Meta[] | null>(null);
  const [cols, setCols] = useState(3);
  const [loaded, setLoaded] = useState<boolean[]>(() =>
    new Array(COUNT).fill(false),
  );
  const [revealed, setRevealed] = useState<boolean[]>(() =>
    new Array(COUNT).fill(false),
  );
  const [lightbox, setLightbox] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  /* 1. Measure every image before laying anything out. */
  useEffect(() => {
    let cancelled = false;
    const ratios: Meta[] = SOURCES.map(() => ({ ratio: 4 / 3 }));
    let settled = 0;

    const finish = () => {
      if (cancelled) return;
      cancelled = true;
      setMeta(ratios);
    };

    const timer = window.setTimeout(finish, 1400);

    SOURCES.forEach((src, i) => {
      const img = new window.Image();
      img.onload = () => {
        ratios[i] = { ratio: img.naturalWidth / img.naturalHeight };
        if (++settled === COUNT) {
          window.clearTimeout(timer);
          finish();
        }
      };
      img.onerror = () => {
        if (++settled === COUNT) {
          window.clearTimeout(timer);
          finish();
        }
      };
      img.src = src;
    });

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  /* 6. Recompute the column count on resize, debounced, only when it changes. */
  useEffect(() => {
    const apply = () => setCols(columnsFor(window.innerWidth));
    apply();
    let t = 0;
    const onResize = () => {
      window.clearTimeout(t);
      t = window.setTimeout(apply, 180);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.clearTimeout(t);
    };
  }, []);

  /* 2. Height-balanced columns: each image joins whichever column is shortest. */
  const columns = useMemo(() => {
    const buckets: { index: number; ratio: number; row: number }[][] =
      Array.from({ length: cols }, () => []);
    if (!meta) return buckets;

    const heights = new Array(cols).fill(0);
    meta.forEach((m, index) => {
      let shortest = 0;
      for (let c = 1; c < cols; c++) {
        if (heights[c] < heights[shortest]) shortest = c;
      }
      buckets[shortest].push({
        index,
        ratio: m.ratio,
        row: buckets[shortest].length,
      });
      heights[shortest] += 1 / m.ratio;
    });
    return buckets;
  }, [meta, cols]);

  /* 5. Reveal tiles as they scroll in, on a diagonal stagger.
     Under reduced motion the observer is never set up; the CSS in globals.css
     shows every `.gallery-tile` outright instead, so there is no state to
     change here. */
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || !meta) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = Number(
            (entry.target as HTMLElement).dataset.index ?? -1,
          );
          if (index >= 0) {
            setRevealed((prev) => {
              if (prev[index]) return prev;
              const next = [...prev];
              next[index] = true;
              return next;
            });
          }
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "80px" },
    );

    grid.querySelectorAll("[data-index]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [meta, cols]);

  /* Lightbox keyboard controls. */
  const close = useCallback(() => setLightbox(null), []);
  const step = useCallback(
    (delta: number) =>
      setLightbox((i) => (i === null ? null : (i + delta + COUNT) % COUNT)),
    [],
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, close, step]);

  /* Preload the neighbours so slide changes cross-fade rather than flash. */
  useEffect(() => {
    if (lightbox === null) return;
    for (const d of [-1, 1]) {
      const img = new window.Image();
      img.src = SOURCES[(lightbox + d + COUNT) % COUNT];
    }
  }, [lightbox]);

  return (
    <>
      <div ref={gridRef} className="mx-auto flex max-w-[1280px] items-start gap-4">
        {columns.map((column, c) => (
          <div key={c} className="flex min-w-0 flex-1 flex-col gap-4">
            {column.map(({ index, ratio, row }) => (
              <button
                key={index}
                type="button"
                data-index={index}
                onClick={() => setLightbox(index)}
                style={{
                  aspectRatio: String(ratio),
                  transitionDelay: `${Math.min(row * 40 + c * 70, 420)}ms`,
                }}
                className={[
                  "gallery-tile relative w-full cursor-zoom-in overflow-hidden rounded-xl bg-gray-150",
                  "hover:shadow-[0_24px_48px_-22px_rgba(10,30,66,0.5)]",
                  revealed[index] ? "is-in" : "",
                ].join(" ")}
              >
                <span className="sr-only">
                  Open photograph {index + 1} of {COUNT}
                </span>
                {!loaded[index] ? (
                  <span
                    aria-hidden
                    className="gallery-skeleton absolute inset-0 transition-opacity duration-500"
                  />
                ) : null}
                {/* Intentionally a plain <img>: the grid needs the real decode
                    event per tile to drive the skeleton, and each tile already
                    reserves its exact ratio. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={SOURCES[index]}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  onLoad={() =>
                    setLoaded((prev) => {
                      if (prev[index]) return prev;
                      const next = [...prev];
                      next[index] = true;
                      return next;
                    })
                  }
                  className={[
                    "absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-600 ease-gpi",
                    loaded[index] ? "opacity-100" : "opacity-0",
                    "hover:scale-[1.045]",
                  ].join(" ")}
                />
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Photograph viewer"
        onClick={close}
        className={[
          "fixed inset-0 z-[200] flex items-center justify-center bg-[rgba(4,10,22,0.95)] backdrop-blur-[6px] transition-[opacity,visibility] duration-[320ms]",
          lightbox === null
            ? "invisible opacity-0"
            : "visible opacity-100",
        ].join(" ")}
      >
        {lightbox !== null ? (
          <>
            <LightboxButton
              onClick={close}
              label="Close"
              className="right-[26px] top-[22px] h-11 w-11 rounded-[10px]"
            >
              ×
            </LightboxButton>
            <LightboxButton
              onClick={() => step(-1)}
              label="Previous photograph"
              className="left-[26px] h-[52px] w-[52px] rounded-full"
            >
              ‹
            </LightboxButton>
            <LightboxButton
              onClick={() => step(1)}
              label="Next photograph"
              className="right-[26px] h-[52px] w-[52px] rounded-full"
            >
              ›
            </LightboxButton>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={lightbox}
              src={SOURCES[lightbox]}
              alt={`Photograph ${lightbox + 1} of ${COUNT}`}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[82vh] max-w-[82vw] rounded-[10px] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.8)] [animation:gpi-lb-in_.3s_var(--ease-gpi)]"
            />
            <div className="absolute bottom-[26px] text-[13px]/[1] font-semibold tracking-[0.1em] text-white/65">
              {lightbox + 1} / {COUNT}
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}

function LightboxButton({
  onClick,
  label,
  className,
  children,
}: {
  onClick: () => void;
  label: string;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`absolute z-10 border border-white/28 bg-transparent text-[22px]/[1] text-white transition-colors hover:border-white/60 ${className}`}
    >
      <span className="sr-only">{label}</span>
      <span aria-hidden>{children}</span>
    </button>
  );
}
