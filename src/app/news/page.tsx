import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PageHero } from "@/components/PageHero";
import { news } from "@/content/news";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "News",
  description:
    "Updates, events, and press coverage from our work countering extremism and defending democratic values.",
};

export default function NewsPage() {
  const [featured, ...rest] = news;

  return (
    <>
      <PageHero
        mode="streaks"
        eyebrow="News"
        title="The latest from the front lines."
        lede="Updates, events, and press coverage from our work countering extremism and defending democratic values."
      />

      {featured ? (
        <section className="bg-white px-8 pb-10 pt-[72px]">
          <div className="mx-auto max-w-[1120px]">
            <Link
              href={featured.href}
              data-reveal
              className="grid overflow-hidden rounded-2xl border border-line transition-[box-shadow,border-color] duration-[250ms] hover:border-line-hover hover:shadow-[0_26px_54px_-26px_rgba(10,30,66,0.4)] lg:grid-cols-[1.05fr_1fr]"
            >
              <div className="relative min-h-[240px] bg-navy-800 lg:min-h-[340px]">
                <Image
                  src={featured.cover}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                />
              </div>
              <div className="self-center px-8 py-10 lg:p-12">
                <div className="mb-4 flex items-center gap-2.5">
                  <span className="text-[11px]/[1] font-bold uppercase tracking-[0.12em] text-blue-600">
                    {featured.type}
                  </span>
                  <span className="text-[12.5px]/[1] font-medium text-ink-faint">
                    {featured.date}
                  </span>
                </div>
                <h2 className="font-display m-0 mb-3.5 text-[clamp(21px,3vw,26px)]/[1.26] font-bold tracking-[-0.01em] text-navy-800">
                  {featured.title}
                </h2>
                <p className="m-0 mb-[22px] text-[15.5px]/[1.7] text-ink-muted">
                  {featured.excerpt}
                </p>
                <span className="text-[14px]/[1] font-bold text-blue-600">
                  Read the full report →
                </span>
              </div>
            </Link>
          </div>
        </section>
      ) : null}

      <section className="bg-white px-8 pb-24 pt-3">
        {rest.length ? (
          <div className="mx-auto grid max-w-[1120px] gap-[26px] sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((item) => (
              <Link
                key={item.slug}
                href={item.href}
                data-reveal
                className="gpi-card block"
              >
                <div className="relative h-[158px] bg-[linear-gradient(135deg,#dbe4f0,#c3d3e8)]">
                  <Image
                    src={item.cover}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-[11px] flex items-center gap-2.5">
                    <span className="text-[10.5px]/[1] font-bold uppercase tracking-[0.12em] text-blue-600">
                      {item.type}
                    </span>
                    <span className="text-[12px]/[1] font-medium text-ink-faint">
                      {item.date}
                    </span>
                  </div>
                  <h3 className="font-display m-0 text-[17px]/[1.34] font-bold text-navy-800">
                    {item.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        ) : null}

        <p className="mx-auto mt-11 max-w-[1120px] text-center text-[13.5px]/[1.6] text-ink-faint">
          More investigations and updates coming soon. Follow us on{" "}
          <a
            href={site.external.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-link"
          >
            Instagram
          </a>{" "}
          for the latest.
        </p>
      </section>
    </>
  );
}
