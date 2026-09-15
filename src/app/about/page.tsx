import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PageHero } from "@/components/PageHero";
import { Eyebrow } from "@/components/ui";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Global Peace for Israel was founded by combat veterans and frontline experts who have confronted Islamist extremism, jihadist terror, asymmetric warfare, and the real-world consequences of institutional silence.",
};

const values = [
  "Freedom of Expression",
  "Equality Under the Law",
  "Pluralism",
  "Human Dignity",
  "Democratic Governance",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        mode="converge"
        eyebrow="About Us"
        title="We are done waiting for institutions to catch up."
        lede="Global Peace for Israel was founded by combat veterans and frontline experts who have confronted Islamist extremism, jihadist terror, asymmetric warfare, and the real-world consequences of institutional silence."
      />

      {/* Narrative */}
      <section className="bg-white px-8 py-20 lg:py-[88px]">
        <div className="mx-auto max-w-[820px]">
          <p
            data-reveal
            className="m-0 mb-[30px] text-[18px]/[1.8] text-[#334] md:text-[19px]"
          >
            We have identified that Islamist infiltration and indoctrination is
            at a record high in every sector of Western society, advanced
            patiently and silently over the course of decades. We are done
            allowing jihadist ideology to be sanitized, rebranded, or normalized
            under the protection of the very democratic freedoms it seeks to
            destroy.
          </p>
          <p
            data-reveal
            className="m-0 mb-[26px] text-[17px]/[1.8] text-ink-muted"
          >
            Global Peace for Israel emerged as a strategic response to an
            escalating threat, built on the clear-eyed recognition that Western
            civilization is under serious assault from both foreign jihadist
            ideologies and Islamist operatives working openly within democratic
            societies, too often shielded by institutional silence, front
            groups, and distorted narratives.
          </p>
          <p data-reveal className="m-0 text-[17px]/[1.8] text-ink-muted">
            We saw a widening gap between truth and public discourse:
            educational systems compromised by Islamist bias, civic institutions
            too timid to name the threat, and community leaders left without the
            coordination, resources, or strategy to fight back. A demoralized
            society that can no longer tell the difference between truth and
            foreign-influenced propaganda, especially among the younger
            generation. We call this a silent World War, and we intend to win
            it.
          </p>
        </div>
      </section>

      {/* Pull quote */}
      <section className="bg-white px-8 pb-20 lg:pb-[88px]">
        <blockquote
          data-reveal
          className="relative mx-auto m-0 max-w-[960px] overflow-hidden rounded-[18px] bg-[linear-gradient(135deg,#0a1e42,#07162f)] px-8 py-12 sm:px-14 sm:py-16"
        >
          <Image
            src="/assets/logo.png"
            alt=""
            aria-hidden
            width={420}
            height={420}
            className="pointer-events-none absolute -bottom-[110px] -right-[90px] hidden h-[420px] w-[420px] object-contain opacity-[0.07] mix-blend-screen sm:block"
          />
          <p className="font-display relative m-0 text-[clamp(21px,3.2vw,30px)]/[1.4] font-bold text-white">
            &ldquo;We are a national strategy and coalition-building
            organization dedicated to strengthening Western democratic values,
            dismantling Islamist and jihadist networks, and equipping leaders
            with the tools to defend truth, security, and civil society.&rdquo;
          </p>
        </blockquote>
      </section>

      {/* What distinguishes us */}
      <section className="border-y border-line bg-gray-50 px-8 py-20 lg:py-[88px]">
        <div className="mx-auto max-w-[1080px]">
          <Eyebrow tone="dark" className="mb-4">
            What Distinguishes Us
          </Eyebrow>
          <h2
            data-reveal
            className="font-display m-0 mb-7 max-w-[760px] text-[clamp(26px,4.4vw,36px)]/[1.2] font-bold tracking-[-0.01em] text-navy-800"
          >
            A first-of-its-kind strategy coalition of experts, divided into six
            think tanks.
          </h2>
          <p
            data-reveal
            className="m-0 mb-10 max-w-[780px] text-[17px]/[1.75] text-ink-muted md:text-[18px]"
          >
            We convene private, closed-door strategy sessions that bring
            together influencers, educators, attorneys, policymakers, security
            experts, technologists, community leaders, media professionals, and
            activists. These are working environments designed to produce real
            outcomes: legal strategies, policy initiatives, communication
            frameworks, and replicable local action models to mobilize
            activists.
          </p>
          <div data-reveal className="flex flex-wrap gap-[15px]">
            <Link href="/projects" className="btn-solid">
              Explore Our Projects
            </Link>
            <Link
              href="/team"
              className="btn-quiet border-[1.5px] border-[#c3ccd9] px-[30px] py-[15px]"
            >
              Meet the Team
            </Link>
          </div>
        </div>
      </section>

      {/* Bridge values */}
      <section className="bg-white px-8 py-20 lg:py-[88px]">
        <div className="mx-auto max-w-[1000px] text-center">
          <Eyebrow tone="dark" className="mb-4 !text-gold-800">
            Bridge-Building Is Central to Our Mission
          </Eyebrow>
          <h2
            data-reveal
            className="font-display mx-auto m-0 mb-[42px] max-w-[820px] text-[clamp(25px,4.2vw,34px)]/[1.22] font-bold tracking-[-0.01em] text-navy-800"
          >
            We unite diverse communities around the foundational values of free
            societies.
          </h2>
          <div
            data-reveal
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
          >
            {values.map((value) => (
              <div
                key={value}
                className="rounded-xl border border-line px-3.5 py-[26px]"
              >
                <div className="font-display text-[14px]/[1.3] font-bold text-navy-800">
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-gold-500 px-8 py-20 lg:py-[88px]">
        <div className="mx-auto max-w-[860px] text-center">
          <h2
            data-reveal
            className="font-display m-0 mb-[22px] text-[clamp(27px,4.8vw,40px)]/[1.16] font-extrabold tracking-[-0.01em] text-[#1a1200]"
          >
            This is a silent war. We are building an army of leaders to face it.
          </h2>
          <div data-reveal className="flex flex-wrap justify-center gap-[15px]">
            <a
              href={site.external.donate}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-navy-800 px-9 py-[17px] text-[15px]/[1] font-bold text-white transition-transform hover:-translate-y-0.5 hover:text-white"
            >
              Donate Now
            </a>
            <Link
              href="/contact"
              className="rounded-md border-[1.5px] border-[#1a1200]/50 px-9 py-[17px] text-[15px]/[1] font-bold text-[#1a1200] transition-colors hover:border-[#1a1200] hover:text-[#1a1200]"
            >
              Get Involved
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
