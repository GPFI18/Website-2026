import type { Metadata } from "next";

import { PageHero } from "@/components/PageHero";
import SiteForm from "@/components/SiteForm";
import { IconPoint } from "@/components/ui";

export const metadata: Metadata = {
  title: "Register for an Event",
  description:
    "Our closed-door strategy sessions bring together attorneys, educators, policymakers, security experts, technologists, and community leaders to turn expertise into action.",
};

const points = [
  {
    icon: "M3 4h18v18H3z M16 2v4M8 2v4M3 10h18",
    title: "Working sessions, not lectures",
    body: "Every event is built to produce real outcomes and next steps.",
  },
  {
    icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
    title: "Expert-led",
    body: "Convened with subject-matter experts across law, security, and media.",
  },
  {
    icon: "M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zM2 12h20",
    title: "In-person & virtual",
    body: "We'll follow up with details once we confirm your registration.",
  },
];

export default function EventsPage() {
  return (
    <>
      <PageHero
        mode="field"
        eyebrow="Events"
        title="Register for Our Next Think Tank Event"
        lede="Our closed-door strategy sessions bring together attorneys, educators, policymakers, security experts, technologists, and community leaders to turn expertise into action. Reserve your place."
      />

      <section className="bg-white px-8 pb-24 pt-20 lg:pb-[100px]">
        <div className="mx-auto grid max-w-[1080px] items-start gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
          <div data-reveal>
            <h2 className="font-display m-0 mb-[22px] text-[24px]/[1.2] font-bold text-navy-800">
              What to expect
            </h2>
            <div className="flex flex-col gap-5">
              {points.map((point) => (
                <IconPoint key={point.title} {...point} />
              ))}
            </div>
          </div>

          <SiteForm
            kind="event"
            heading="Reserve your place"
            intro="Register your interest and we'll send you details for the next session."
          />
        </div>
      </section>
    </>
  );
}
