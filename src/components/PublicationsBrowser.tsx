"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import {
  categories,
  publicationsIn,
  type CategoryKey,
  type Publication,
} from "@/content/publications";

function ctaLabel(pub: Publication) {
  if (pub.cta) return `${pub.cta} →`;
  return /\.(pdf|docx)$/.test(pub.href) ? "Download →" : "Read →";
}

function Card({ pub, accent }: { pub: Publication; accent: string }) {
  const inner = (
    <>
      {pub.cover ? (
        <div className="flex h-[210px] items-start justify-center overflow-hidden bg-navy-800">
          <Image
            src={pub.cover}
            alt=""
            width={600}
            height={420}
            className="block h-full w-full object-cover object-top"
          />
        </div>
      ) : (
        <div
          className="h-2"
          style={{
            background: `linear-gradient(90deg, ${accent}, #c6a052)`,
          }}
        />
      )}

      <div className="flex flex-1 flex-col px-[30px] pb-7 pt-[30px]">
        <div className="mb-[15px] flex flex-wrap items-center gap-[9px]">
          <span className="inline-flex items-center rounded-[4px] bg-blue-50 px-2.5 py-1.5 text-[10px]/[1] font-bold uppercase tracking-[0.1em] text-blue-600">
            GPFI
          </span>
          <span
            className="text-[10px]/[1] font-bold uppercase tracking-[0.12em]"
            style={{ color: accent }}
          >
            {pub.type}
          </span>
          <span className="text-[11.5px]/[1] font-medium text-ink-lightest">
            {pub.topic}
          </span>
        </div>

        <h3 className="font-display m-0 mb-3 text-[clamp(18px,2.4vw,21px)]/[1.28] font-bold tracking-[-0.01em] text-navy-800">
          {pub.title}
        </h3>
        <p className="m-0 mb-[22px] flex-1 text-[14.5px]/[1.65] text-ink-soft">
          {pub.description}
        </p>

        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <span className="text-[12.5px]/[1.4] font-medium text-ink-faint">
            By {pub.author}
          </span>
          <span className="text-[13.5px]/[1] font-bold text-blue-600">
            {ctaLabel(pub)}
          </span>
        </div>
      </div>
    </>
  );

  const className =
    "gpi-card flex flex-col rounded-2xl hover:shadow-[0_24px_48px_-24px_rgba(10,30,66,0.4)]";

  return pub.external ? (
    <a href={pub.href} target="_blank" rel="noopener noreferrer" className={className} data-reveal>
      {inner}
    </a>
  ) : (
    <Link href={pub.href} className={className} data-reveal>
      {inner}
    </Link>
  );
}

/**
 * The publication library: a sticky filter bar over five category blocks.
 *
 * Empty categories deliberately render a placeholder rather than disappearing,
 * so the shape of the library is legible even before it fills out.
 */
export default function PublicationsBrowser() {
  const [filter, setFilter] = useState<CategoryKey | "all">("all");

  return (
    <>
      <div className="sticky top-[74px] z-40 border-b border-line bg-gray-50 px-8 py-3.5">
        <div className="mx-auto flex max-w-[1120px] flex-wrap items-center gap-2.5">
          <div className="mr-2 flex items-center gap-2 text-[12px]/[1.4] font-medium text-ink-soft">
            <span className="h-2 w-2 shrink-0 rounded-full bg-blue-600" />
            Published by Global Peace for Israel.
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter publications">
            <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>
              All
            </FilterChip>
            {categories.map((c) => (
              <FilterChip
                key={c.key}
                active={filter === c.key}
                onClick={() => setFilter(c.key)}
              >
                {c.label}
              </FilterChip>
            ))}
          </div>
        </div>
      </div>

      <section className="bg-white px-8 pb-24 pt-16">
        <div className="mx-auto max-w-[1120px]">
          {categories
            .filter((c) => filter === "all" || filter === c.key)
            .map((category) => {
              const items = publicationsIn(category.key);
              return (
                <section key={category.key} className="mb-[74px] last:mb-0">
                  <div
                    className="mb-8 flex flex-wrap items-end gap-4 border-b-2 pb-4"
                    style={{ borderColor: category.accent }}
                  >
                    <div className="flex-1">
                      <h2 className="font-display m-0 mb-2 text-[clamp(22px,3.4vw,28px)]/[1.2] font-bold tracking-[-0.01em] text-navy-800">
                        {category.label}
                      </h2>
                      <p className="m-0 max-w-[620px] text-[14.5px]/[1.6] text-ink-soft">
                        {category.blurb}
                      </p>
                    </div>
                    <div className="whitespace-nowrap pb-1.5 text-[13px]/[1] font-semibold text-ink-faint">
                      {items.length}{" "}
                      {items.length === 1 ? "publication" : "publications"}
                    </div>
                  </div>

                  {items.length ? (
                    <div className="grid gap-[26px] sm:grid-cols-2 lg:grid-cols-3">
                      {items.map((pub) => (
                        <Card key={pub.title} pub={pub} accent={category.accent} />
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-2xl border-[1.5px] border-dashed border-[#d8dee8] bg-[#f7f9fc] px-10 py-9">
                      <h3 className="font-display m-0 mb-2 text-[18px]/[1.3] font-bold text-navy-800">
                        Nothing published here yet
                      </h3>
                      <p className="m-0 max-w-[560px] text-[14.5px]/[1.65] text-ink-soft">
                        New work in this category will appear here as it is
                        published.
                      </p>
                    </div>
                  )}
                </section>
              );
            })}
        </div>
      </section>
    </>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        "rounded-full border px-[17px] py-[9px] text-[12.5px]/[1] font-semibold transition-colors duration-150",
        active
          ? "border-blue-600 bg-blue-600 text-white"
          : "border-line-input bg-white text-ink-muted hover:border-line-hover",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
