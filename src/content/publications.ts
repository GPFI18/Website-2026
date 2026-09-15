/**
 * The publication library: five categories and the current inventory.
 *
 * Two categories are deliberately empty and render a placeholder. There is no
 * external-submission path anywhere on this page — the client removed it, and
 * it should not be reintroduced.
 */

export type CategoryKey =
  | "curriculum"
  | "investigation"
  | "brief"
  | "analysis"
  | "article";

export type Category = {
  key: CategoryKey;
  label: string;
  accent: string;
  blurb: string;
};

export const categories: Category[] = [
  {
    key: "curriculum",
    label: "Curriculum Reviews",
    accent: "#0b4aa2",
    blurb:
      "Reviews of what American classrooms teach about Jewish identity, Israel, and antisemitism, and what they leave out.",
  },
  {
    key: "investigation",
    label: "Investigative Reports",
    accent: "#0b4aa2",
    blurb:
      "Long-form investigations into extremist networks, funding streams, and institutional capture.",
  },
  {
    key: "brief",
    label: "Research Briefs",
    accent: "#0b4aa2",
    blurb:
      "Evidence-based briefs that dismantle the propaganda of the antizionist movement.",
  },
  {
    key: "analysis",
    label: "Analysis & Commentary",
    accent: "#8a6d24",
    blurb: "Perspective and argument on the forces shaping public discourse.",
  },
  {
    key: "article",
    label: "Articles",
    accent: "#8a6d24",
    blurb: "Reporting from our team and invited contributors.",
  },
];

export type Publication = {
  category: CategoryKey;
  type: string;
  topic: string;
  title: string;
  author: string;
  description: string;
  /** Where the card goes — an internal route or an external/document URL. */
  href: string;
  /** Overrides the default "Read →" / "Download →" call to action. */
  cta?: string;
  external?: boolean;
  cover?: string;
  /** Source document offered as a download on the detail page. */
  file?: string;
};

export const publications: Publication[] = [
  {
    category: "investigation",
    type: "Investigative Report",
    topic: "K-12 Education",
    title: "Legislative Brief K-12, Final with Appendices",
    author: "Global Peace for Israel · Ali Marks",
    description:
      "A legislative brief on ideological capture and antisemitism in American K-12 education, with full appendices documenting the findings submitted to lawmakers.",
    href: "/contact",
    cta: "Request a copy",
    cover: "/assets/covers/legislative-brief-k12.png",
  },
  {
    category: "brief",
    type: "Research Brief",
    topic: "Antisemitism · History",
    title: "APR, Antizionism & the Nakba",
    author: "Global Peace for Israel",
    description:
      "Three connected briefs: how “anti-Palestinian racism” embeds antisemitic narratives inside a civil rights framework, how antizionism functions as today's Jew-hatred, and how an Arab war of annihilation was inverted into a story of Jewish criminality.",
    href: "/publications/apr-antizionism-nakba",
    file: "/assets/publications/apr-antizionism-nakba.docx",
    cover: "/assets/covers/apr-antizionism-nakba.png",
  },
  {
    category: "brief",
    type: "Research Brief",
    topic: "Terrorism",
    title:
      "“Palestinian Resistance”: The Rebrand of Terrorism Into Acceptable Jihad",
    author: "Global Peace for Israel",
    description:
      "How jihadist violence is laundered into the language of “liberation,” and why Western institutions repeat it.",
    href: "/publications/palestinian-resistance",
    file: "/assets/publications/palestinian-resistance.pdf",
    cover: "/assets/covers/palestinian-resistance.png",
  },
  {
    category: "article",
    type: "Article",
    topic: "Foreign Influence",
    title: "The AIPAC Conspiracy and Qatari Influence in the US",
    author: "Global Peace for Israel · Liam Olshevitz",
    description:
      "Examining the conspiracy theories built around AIPAC alongside the documented record of Qatari funding and influence operations inside American institutions.",
    href: "/assets/publications/aipac-qatari-influence.pdf",
    external: true,
    cover: "/assets/covers/aipac-qatari-influence.png",
  },
  {
    category: "article",
    type: "Article",
    topic: "Extremist Networks",
    title:
      "After the Shooting: Scrutiny Returns to the Islamic Center of San Diego and Its Links to Terrorism and Islamic Extremism",
    author: "Global Peace for Israel",
    description:
      "A long-running pattern of extremist controversies, inflammatory rhetoric, and documented associations tied to the institution and figures around it.",
    href: "/news/islamic-center-san-diego",
    cover: "/assets/covers/islamic-center-san-diego.png",
  },
  {
    category: "article",
    type: "Article",
    topic: "Public Record",
    title: "A Pattern in Plain Sight: The Public Record of Rama Duwaji",
    author: "Global Peace for Israel & Dr. Sandra Alfonsi",
    description:
      "What the public record shows, assembled from her own published work and statements.",
    href: "/publications/rama-duwaji",
    file: "/assets/publications/rama-duwaji.pdf",
    cover: "/assets/covers/rama-duwaji.png",
  },
  {
    category: "article",
    type: "Article",
    topic: "K-12 Education",
    title: "Curriculum of Erasure",
    author: "Global Peace for Israel · Ali Marks",
    description:
      "How Jewish identity, Israel, and the history of antisemitism are minimized, distorted, or erased across American K-12 curricula, and what can be done about it.",
    href: "/publications/curriculum-of-erasure",
    cover: "/assets/reports/curriculum-of-erasure.jpeg",
    file: "/assets/publications/curriculum-of-erasure.pdf",
  },
  {
    category: "article",
    type: "Article",
    topic: "Online Extremism",
    title:
      "Charlie Kirk's Assassination, the Online Antisemitism Spike, and the Rise of Woke-Right Anti-Israel Propaganda",
    author: "Global Peace for Israel · Samantha Nassimi",
    description:
      "Kirk's assassination did not create online antisemitism. It gave antisemitic influencers, foreign propaganda networks, and anti-Israel factions a viral event to exploit. Documents the spike, the woke-right ecosystem behind it, and the networks amplifying it.",
    href: "/publications/charlie-kirk-antisemitism-spike",
    file: "/assets/publications/charlie-kirk-antisemitism-spike.pdf",
    cover: "/assets/covers/charlie-kirk-antisemitism-spike.png",
  },
];

export function publicationsIn(key: CategoryKey) {
  return publications.filter((p) => p.category === key);
}
