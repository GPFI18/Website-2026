import type { Metadata } from "next";

import { PageHero } from "@/components/PageHero";
import PublicationsBrowser from "@/components/PublicationsBrowser";
import { CtaBand } from "@/components/ui";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Publications",
  description:
    "Curriculum reviews, investigative reports, research briefs, and articles from Global Peace for Israel — evidence-based work on extremist networks, antisemitism, and institutional capture.",
};

export default function PublicationsPage() {
  return (
    <>
      <PageHero
        mode="streaks"
        eyebrow="Publications"
        title="Research that names the threat."
        lede="Curriculum reviews, investigative reports, research briefs, analysis, and articles. Every publication is labelled with its author."
      />

      <PublicationsBrowser />

      <CtaBand
        heading="Independent research takes resources."
        body="Every report and brief we publish is funded by people who believe the truth is worth documenting."
        primary={{
          label: "Support the Research",
          href: site.external.donate,
          external: true,
        }}
        secondary={{ label: "Request a Briefing", href: "/contact" }}
      />
    </>
  );
}
