import type { Metadata } from "next";
import Image from "next/image";

import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/ui";
import {
  coalitionProgram,
  desks,
  internProgram,
  programs,
} from "@/content/projects";

export const metadata: Metadata = {
  title: "Our Projects",
  description:
    "Nine programs, each tackling a specific front in the fight against Islamist extremism — from the classroom to the city council to the digital battlefield.",
};

function ProgramCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div
      data-reveal
      className="flex flex-col items-start gap-5 rounded-[14px] border border-line border-l-4 border-l-gold-500 bg-gray-50 px-8 py-9 sm:flex-row sm:gap-[34px] sm:px-10 sm:py-[38px]"
    >
      <div className="font-display shrink-0 text-[44px]/[1] font-extrabold text-[#878f9c]">
        {number}
      </div>
      <div>
        <h2 className="font-display m-0 mb-3 text-[clamp(20px,3vw,24px)]/[1.2] font-bold tracking-[-0.01em] text-navy-800">
          {title}
        </h2>
        <p className="m-0 max-w-[760px] text-[16px]/[1.72] text-ink-muted">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        mode="lattice"
        eyebrow="Our Projects"
        title="Nine programs. Real-world outcomes."
        lede="These aren't panels that produce reports and disband. Each program tackles a specific front in the fight against Islamist extremism, from the classroom to the city council to the digital battlefield. Each one delivers legal strategies, policy initiatives, communication frameworks, and action models communities can put to work immediately."
      />

      <section className="bg-white px-8 pb-16 pt-20">
        <div className="mx-auto flex max-w-[1080px] flex-col gap-5">
          {programs.map((program) => (
            <ProgramCard key={program.number} {...program} />
          ))}
        </div>
      </section>

      {/* Program 08 reads as one unit with the desk grid below it — the desks
          are its content, not a separate section. */}
      <section className="bg-white px-8 pb-24 lg:pb-[104px]">
        <div className="mx-auto max-w-[1080px]">
          <div
            data-reveal
            className="overflow-hidden rounded-[14px] border border-line border-l-4 border-l-gold-500"
          >
            <div className="flex flex-col items-start gap-5 bg-[radial-gradient(120%_160%_at_85%_-30%,#164081,#0a1e42_60%,#060f22)] px-8 py-9 sm:flex-row sm:gap-[30px] sm:px-[38px] sm:py-[34px]">
              <div className="font-display shrink-0 text-[44px]/[1] font-extrabold text-gold-500/55">
                {coalitionProgram.number}
              </div>
              <div>
                <h2 className="font-display m-0 mb-2.5 text-[clamp(20px,3vw,25px)]/[1.2] font-bold tracking-[-0.01em] text-white">
                  {coalitionProgram.title}
                </h2>
                <p className="m-0 max-w-[720px] text-[14.5px]/[1.65] text-white/82">
                  {coalitionProgram.description}
                </p>
              </div>
            </div>

            <div className="grid gap-px bg-white sm:grid-cols-2 lg:grid-cols-4">
              {desks.map((desk) => (
                <div
                  key={desk.slug}
                  className="flex items-start gap-[13px] bg-white px-[18px] pb-[22px] pt-5 shadow-[0_0_0_1px_#e6e9ef] transition-colors duration-[250ms] hover:bg-gray-50"
                >
                  <Image
                    src={`/assets/desks/${desk.slug}.png`}
                    alt={desk.name}
                    width={50}
                    height={50}
                    className="h-[50px] w-[50px] shrink-0 rounded-full border-2 border-line object-cover object-center"
                  />
                  <div className="min-w-0">
                    <div className="font-display mb-[7px] text-[10px]/[1] font-extrabold uppercase tracking-[0.16em] text-blue-600">
                      {desk.region}
                    </div>
                    <div className="font-display mb-[5px] text-[13.5px]/[1.25] font-bold text-navy-800">
                      {desk.name}
                    </div>
                    <div className="text-[11.5px]/[1.5] text-ink-soft">
                      {desk.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <ProgramCard {...internProgram} />
          </div>
        </div>
      </section>

      <CtaBand
        heading="Want to bring a strategy session to your community?"
        primary={{ label: "Get in Touch", href: "/contact" }}
      />
    </>
  );
}
