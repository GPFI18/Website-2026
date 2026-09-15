import type { Metadata } from "next";
import Image from "next/image";

import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/ui";
import { team } from "@/content/team";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "A network of IDF veterans, researchers, journalists, lawyers, advocates, and operational specialists, supported by an advisory and research board of subject-matter experts and PhD-level scholars.",
};

export default function TeamPage() {
  return (
    <>
      <PageHero
        mode="roster"
        eyebrow="Our Team"
        title={
          <>
            Veterans, researchers &amp; advocates.
          </>
        }
        lede="A network of IDF veterans, researchers, journalists, lawyers, advocates, and operational specialists, supported by an advisory and research board of subject-matter experts and PhD-level scholars. We work at the intersection of research, education, advocacy, and strategic intelligence to promote truth, counter misinformation, and advance human rights across the United States, Israel, and allied nations."
      />

      <section className="bg-white px-8 py-20 lg:pb-[100px] lg:pt-20">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-[26px]">
          {team.map((person, i) => (
            <article
              key={person.slug}
              data-reveal
              className={[
                "flex flex-col overflow-hidden rounded-2xl border border-line bg-gray-50",
                i % 2 ? "md:flex-row-reverse" : "md:flex-row",
              ].join(" ")}
            >
              <div className="relative min-h-[320px] shrink-0 bg-[#dbe4f0] md:min-h-[380px] md:w-[320px]">
                <Image
                  src={person.image}
                  alt={person.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  className="object-cover object-top"
                />
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-[5px] bg-gold-500"
                />
              </div>
              <div className="flex-1 self-center px-8 py-10 md:px-[46px] md:py-11">
                <h2 className="font-display m-0 mb-1.5 text-[clamp(21px,3vw,27px)]/[1.15] font-bold tracking-[-0.01em] text-navy-800">
                  {person.name}
                </h2>
                <p className="mb-5 text-[12.5px]/[1.3] font-bold uppercase tracking-[0.14em] text-blue-600">
                  {person.title}
                </p>
                <p className="m-0 text-[15.5px]/[1.72] text-ink-muted">
                  {person.bio}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CtaBand
        heading="Want to put this expertise to work in your community?"
        body="Bring a strategy session to your city, partner with us, or join a chapter near you."
        primary={{ label: "Get in Touch", href: "/contact" }}
        secondary={{ label: "Join a Chapter", href: "/join" }}
      />
    </>
  );
}
