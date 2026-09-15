import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ArticleBody from "@/components/ArticleBody";
import { articles } from "@/content/articles";
import { news } from "@/content/news";

export function generateStaticParams() {
  return news.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = news.find((n) => n.slug === slug);
  if (!item) return {};

  return {
    title: item.title,
    description: item.excerpt,
    openGraph: {
      type: "article",
      title: item.title,
      description: item.excerpt,
      publishedTime: item.date,
      images: [{ url: item.cover }],
    },
  };
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = news.find((n) => n.slug === slug);
  const article = articles[slug];
  if (!item || !article) notFound();

  return (
    <ArticleBody
      article={article}
      backHref="/news"
      backLabel="All news"
      leadImage={{ src: item.cover, alt: "" }}
    />
  );
}
