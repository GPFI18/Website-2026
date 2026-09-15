/**
 * News index.
 *
 * One published investigation today. Adding an entry here puts it in the index;
 * the featured panel always renders the first item.
 */

export type NewsItem = {
  slug: string;
  type: string;
  date: string;
  title: string;
  excerpt: string;
  cover: string;
  href: string;
};

export const news: NewsItem[] = [
  {
    slug: "islamic-center-san-diego",
    type: "Investigation",
    date: "June 3, 2026",
    title:
      "After the Shooting: Scrutiny Returns to the Islamic Center of San Diego and Its Links to Terrorism and Islamic Extremism",
    excerpt:
      "No house of worship should ever be a target of violence. Even so, renewed scrutiny is falling on a long-running pattern of extremist controversies, inflammatory rhetoric, and troubling associations tied to the institution.",
    // Hosted locally; the prototype hotlinked the old site's Squarespace CDN.
    cover: "/assets/covers/islamic-center-san-diego.png",
    href: "/news/islamic-center-san-diego",
  },
];
