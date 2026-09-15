import type { Metadata } from "next";

import { PageHero } from "@/components/PageHero";
import SiteForm from "@/components/SiteForm";
import { IconPoint } from "@/components/ui";

export const metadata: Metadata = {
  title: "Become a Partner",
  description:
    "Organizations, community groups, faith leaders, and professionals amplify our impact. Partner with us to bring research, strategy, and coalition-building to your network.",
};

const points = [
  {
    icon: "M4 18v-4a2 2 0 0 1 2-2h3M20 18v-4a2 2 0 0 0-2-2h-3M9 12V8a3 3 0 0 1 6 0v4M8 21h8",
    title: "Organizational partner",
    body: "Coordinate joint initiatives, research, and advocacy.",
  },
  {
    icon: "M12 2l2.4 7.4H22l-6 4.6 2.3 7.4-6.3-4.6L5.7 21.4 8 14 2 9.4h7.6z",
    title: "Community affiliate",
    body: "Represent our mission and programming in your region.",
  },
  {
    icon: "M12 20V10M18 20V4M6 20v-4",
    title: "Expert contributor",
    body: "Lend your expertise to one of our six strategy think tanks.",
  },
];

export default function PartnerPage() {
  return (
    <>
      <PageHero
        mode="network"
        eyebrow="Partnerships"
        title="Become a Partner"
        lede="Organizations, community groups, faith leaders, and professionals amplify our impact. Partner with us to bring research, strategy, and coalition-building to your network."
      />

      <section className="bg-white px-8 pb-24 pt-20 lg:pb-[100px]">
        <div className="mx-auto grid max-w-[1080px] items-start gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
          <div data-reveal>
            <h2 className="font-display m-0 mb-[22px] text-[24px]/[1.2] font-bold text-navy-800">
              Ways to partner
            </h2>
            <div className="flex flex-col gap-5">
              {points.map((point) => (
                <IconPoint key={point.title} {...point} />
              ))}
            </div>
          </div>

          <SiteForm
            kind="partner"
            heading="Start the conversation"
            intro="Tell us about you or your organization and we'll be in touch."
          />
        </div>
      </section>
    </>
  );
}
