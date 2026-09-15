import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ArticleBody from "@/components/ArticleBody";
import { articles } from "@/content/articles";
import {
  charlieKirkCharts,
  charlieKirkSources,
  duwajiReferences,
} from "@/content/article-data";

/** Every long-form page except the San Diego investigation, which lives under /news. */
const PUBLICATION_SLUGS = [
  "apr-antizionism-nakba",
  "palestinian-resistance",
  "antizionism-todays-jew-hatred",
  "the-nakba-narrative",
  "rama-duwaji",
  "charlie-kirk-antisemitism-spike",
  "curriculum-of-erasure",
] as const;

export function generateStaticParams() {
  return PUBLICATION_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) return {};

  const description =
    article.callout ??
    article.html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").slice(0, 180);

  return {
    title: article.title,
    description,
    openGraph: {
      type: "article",
      title: article.title,
      description,
    },
  };
}

/** Side panel used for the source and reference lists. */
function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-[50px] rounded-[14px] border border-line bg-gray-50 px-[34px] py-[30px]">
      <h2 className="m-0 mb-[18px] text-[13px]/[1] font-bold uppercase tracking-[0.14em] text-blue-600">
        {title}
      </h2>
      {children}
    </div>
  );
}

export default async function PublicationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles[slug];
  if (!article || !PUBLICATION_SLUGS.includes(slug as never)) notFound();

  return (
    <ArticleBody article={article}>
      {slug === "charlie-kirk-antisemitism-spike" ? (
        <>
          <h2 className="font-display mb-6 mt-[52px] text-[25px]/[1.25] font-bold tracking-[-0.01em] text-navy-800">
            Documented figures
          </h2>
          <div className="flex flex-col gap-[26px]">
            {charlieKirkCharts.map((chart) => (
              <figure
                key={chart.title}
                className="m-0 rounded-[14px] border border-line bg-white px-[30px] py-7"
              >
                <div className="font-display mb-1.5 text-[15.5px]/[1.35] font-bold text-navy-800">
                  {chart.title}
                </div>
                <div className="mb-[22px] text-[13.5px]/[1.6] text-ink-faint">
                  {chart.subtitle}
                </div>
                <div className="flex flex-col gap-4">
                  {chart.rows.map((row) => (
                    <div key={row.label}>
                      <div className="mb-[7px] flex justify-between gap-3.5 text-[13px]/[1.4] font-medium text-ink-muted">
                        <span>{row.label}</span>
                        <span className="whitespace-nowrap font-bold text-navy-800">
                          {row.display}
                        </span>
                      </div>
                      <div
                        className="h-2.5 overflow-hidden rounded-full bg-gray-100"
                        role="img"
                        aria-label={`${row.label}: ${row.display}`}
                      >
                        <div
                          className="h-full rounded-full bg-[linear-gradient(90deg,#0b4aa2,#7fb2ee)]"
                          style={{
                            width: `${Math.round((row.value / chart.max) * 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <figcaption className="mt-5 border-t border-gray-100 pt-4 text-[13px]/[1.65] text-ink-soft">
                  {chart.note}
                </figcaption>
              </figure>
            ))}
          </div>

          <Panel title="Source list for the report">
            <ol className="m-0 flex list-decimal flex-col gap-[11px] pl-5">
              {charlieKirkSources.map((source) => (
                <li
                  key={source}
                  className="text-[14px]/[1.65] text-ink-muted"
                  dangerouslySetInnerHTML={{ __html: source }}
                />
              ))}
            </ol>
          </Panel>
        </>
      ) : null}

      {slug === "rama-duwaji" ? (
        <Panel title="References">
          <div className="flex flex-col gap-[9px] break-words text-[13px]/[1.55]">
            {duwajiReferences.map((url) => (
              <a
                key={url}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-link text-blue-600"
              >
                {url}
              </a>
            ))}
          </div>
        </Panel>
      ) : null}
    </ArticleBody>
  );
}
