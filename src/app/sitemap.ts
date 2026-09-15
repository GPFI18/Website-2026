import type { MetadataRoute } from "next";

import { articles } from "@/content/articles";
import { news } from "@/content/news";
import { site } from "@/content/site";

/** Static routes plus every generated article and news page. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    { path: "/", priority: 1 },
    { path: "/about", priority: 0.9 },
    { path: "/team", priority: 0.8 },
    { path: "/projects", priority: 0.8 },
    { path: "/publications", priority: 0.9 },
    { path: "/news", priority: 0.8 },
    { path: "/gallery", priority: 0.6 },
    { path: "/join", priority: 0.7 },
    { path: "/events", priority: 0.7 },
    { path: "/partner", priority: 0.7 },
    { path: "/contact", priority: 0.7 },
  ];

  const newsSlugs = new Set(news.map((n) => n.slug));

  const articleRoutes = Object.keys(articles).map((slug) => ({
    path: newsSlugs.has(slug) ? `/news/${slug}` : `/publications/${slug}`,
    priority: 0.6,
  }));

  return [...staticRoutes, ...articleRoutes].map(({ path, priority }) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority,
  }));
}
