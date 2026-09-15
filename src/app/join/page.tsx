import type { Metadata } from "next";

import { PageHero } from "@/components/PageHero";
import SiteForm from "@/components/SiteForm";
import { IconPoint } from "@/components/ui";

export const metadata: Metadata = {
  title: "Join a Chapter",
  description:
    "Global Peace for Israel chapters unite citizens committed to confronting Islamic extremism, exposing foreign influence operations, combating antisemitism, and defending democratic values.",
};

const points = [
  {
    icon: "M3 9l9-5 9 5-9 5-9-5zM7 11v5c0 1 2 3 5 3s5-2 5-3v-5",
    title: "Educate",
    body: "Local events, briefings, and training grounded in our research.",
  },
  {
    icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
    title: "Engage",
    body: "Meet neighbors who share your values and want to act.",
  },
  {
    icon: "M13 2L3 14h9l-1 8 10-12h-9z",
    title: "Act",
    body: "Advocacy and initiatives that make a measurable local impact.",
  },
];

export default function JoinPage() {
  return (
    <>
      <PageHero
        mode="field"
        eyebrow="Get Involved"
        title="Join a Chapter"
        lede="Change begins at the local level. Find your people, and put your values to work in your own community."
      />

      <section className="bg-white px-8 pb-24 pt-20 lg:pb-[100px] lg:pt-[84px]">
        <div className="mx-auto grid max-w-[1120px] items-start gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-[60px]">
          <div data-reveal>
            <p className="m-0 mb-6 text-[17px]/[1.78] text-ink-body md:text-[18px]">
              Global Peace for Israel Chapters unite citizens committed to
              confronting Islamic extremism, exposing foreign influence
              operations, combating antisemitism, and defending the democratic
              values that free societies depend on. Our chapters turn research
              into action through education, community engagement, advocacy, and
              strategic partnerships.
            </p>
            <p className="m-0 mb-6 text-[17px]/[1.78] text-ink-muted">
              By joining a chapter, you become part of a growing network of
              like-minded people who care about protecting their communities and
              making a meaningful impact. Whether you want to meet others who
              share your values, support local initiatives, attend educational
              events, or simply get involved, there is a place for you.
            </p>

            <div className="my-[34px] rounded-[14px] bg-[linear-gradient(135deg,#0a1e42,#07162f)] px-[30px] py-[26px]">
              <div className="font-display m-0 text-[clamp(20px,3vw,24px)]/[1.25] font-extrabold text-gold-400">
                Change begins at the local level.
              </div>
              <p className="m-0 mt-3 text-[15px]/[1.65] text-white/82">
                Together, our chapters strengthen communities, raise awareness,
                inspire action, and promote freedom and democracy, one city at a
                time.
              </p>
            </div>

            <div className="mt-[30px] flex flex-col gap-4">
              {points.map((point) => (
                <IconPoint key={point.title} {...point} size={38} />
              ))}
            </div>
          </div>

          <SiteForm
            kind="join"
            heading="Sign up to join"
            intro="Tell us where you are and we'll connect you with your nearest chapter."
            footnote="We respect your privacy. Your information is never shared or sold."
            sticky
          />
        </div>
      </section>
    </>
  );
}
