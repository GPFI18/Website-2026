import Image from "next/image";
import Link from "next/link";

import { ArticleHero } from "@/components/PageHero";
import { CopyrightRule, CtaBand, DownloadButton } from "@/components/ui";
import type { Article } from "@/content/articles";

/**
 * The shared layout for every long-form page: dark hero, optional callout,
 * the body, then whatever extras that article carries (charts, sources,
 * references), sibling links, a download, and a closing CTA band.
 */
export default function ArticleBody({
  article,
  backHref = "/publications",
  backLabel = "All publications",
  leadImage,
  children,
}: {
  article: Article;
  backHref?: string;
  backLabel?: string;
  /** A full-bleed image pulled up into the top of the body. */
  leadImage?: { src: string; alt: string };
  /** Charts, source lists, reference panels — rendered under the body. */
  children?: React.ReactNode;
}) {
  return (
    <>
      <ArticleHero
        kicker={article.kicker ?? "Publication"}
        title={article.title}
        backHref={backHref}
        backLabel={backLabel}
        byline={
          article.byline ? (
            <span className="flex items-center gap-3">
              {article.avatar ? (
                <Image
                  src={article.avatar}
                  alt=""
                  width={38}
                  height={38}
                  className="h-[38px] w-[38px] rounded-full object-cover object-top"
                />
              ) : null}
              <span>
                By{" "}
                <strong className="font-semibold text-white">
                  {article.byline.replace(/^the /, "")}
                </strong>
              </span>
            </span>
          ) : null
        }
      />

      {leadImage ? (
        <div className="bg-white px-8">
          <div className="relative mx-auto -mt-9 aspect-16/9 max-w-[1000px] overflow-hidden rounded-[14px] shadow-[0_20px_44px_-18px_rgba(10,30,66,0.5)]">
            <Image
              src={leadImage.src}
              alt={leadImage.alt}
              fill
              priority
              sizes="(max-width: 1064px) 100vw, 1000px"
              className="object-cover"
            />
          </div>
        </div>
      ) : null}

      <section className="bg-white px-8 pb-10 pt-[60px]">
        <div className="mx-auto max-w-[768px]">
          {article.placeholder ? (
            <div
              role="note"
              className="mb-9 rounded-[10px] border border-[#e4d3a5] bg-[#fdf6e6] px-6 py-5 text-[14px]/[1.6] text-[#6e561a]"
            >
              <strong className="font-semibold">Draft summary.</strong> The
              framing below is written from the report&apos;s title and theme.
              It will be replaced with the full report text once supplied.
            </div>
          ) : null}

          {article.callout ? (
            <p className="m-0 mb-9 border-l-4 border-gold-500 pl-[22px] text-[clamp(18px,2.6vw,21px)]/[1.6] font-semibold text-navy-800">
              {article.callout}
            </p>
          ) : null}

          <div
            className="gpi-prose"
            dangerouslySetInnerHTML={{ __html: article.html }}
          />

          {children}

          <CopyrightRule />
        </div>
      </section>

      {article.siblings.length ? (
        <section className="bg-white px-8 pb-20">
          <div className="mx-auto flex max-w-[768px] flex-wrap gap-4">
            {article.siblings.map((sib) => (
              <Link
                key={sib.href}
                href={sib.href}
                className="min-w-[240px] flex-1 rounded-xl border border-line px-6 py-[22px] transition-colors hover:border-line-hover"
                style={{ textAlign: sib.dir === "next" ? "right" : "left" }}
              >
                <div className="mb-[9px] text-[11px]/[1] font-semibold uppercase tracking-[0.1em] text-ink-faint">
                  {sib.dir === "next" ? "Next →" : "← Previous"}
                </div>
                <div className="font-display text-[15px]/[1.35] font-bold text-navy-800">
                  {sib.label}
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {article.download ? (
        <section className="bg-white px-8 pb-14">
          <div className="mx-auto max-w-[768px] border-t border-line pt-8">
            <DownloadButton
              href={article.download}
              label={
                article.download.endsWith(".docx")
                  ? "Download the document"
                  : "Download PDF"
              }
            />
          </div>
        </section>
      ) : null}

      <CtaBand
        heading={article.ctaHeading ?? "Truth is a weapon. Help us wield it."}
        body={
          article.ctaBody ??
          "Support the research, briefings, and coalition work that confront this campaign head-on."
        }
        secondary={{ label: "Get Involved", href: "/contact" }}
      />
    </>
  );
}
