import type { Metadata } from "next";

import { PageHero } from "@/components/PageHero";
import PublicationsBrowser from "@/components/PublicationsBrowser";
import { CtaBand } from "@/components/ui";

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
        title="Research, reports &amp; investigations."
        lede="Evidence-based work on extremist networks, antisemitism, foreign influence, and what American classrooms teach — published in full, and free to read."
      />

      <PublicationsBrowser />

      <CtaBand
        heading="Truth is a weapon. Help us wield it."
        body="Support the research, briefings, and coalition work behind every publication here."
        secondary={{ label: "Get Involved", href: "/contact" }}
      />
    </>
  );
}
