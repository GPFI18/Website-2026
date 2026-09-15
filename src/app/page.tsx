import Image from "next/image";
import Link from "next/link";

import StatCounter from "@/components/StatCounter";
import { Eyebrow } from "@/components/ui";
import { thinkTanks } from "@/content/projects";
import { site } from "@/content/site";
import { teamPreview } from "@/content/team";

export default function HomePage() {
  return (
    <>
      {/* ============================ HERO ============================ */}
      <section className="relative overflow-hidden bg-navy-900">
        <Image
          src="/assets/hero-flags.jpeg"
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="object-cover object-center [filter:saturate(1.25)_brightness(1.35)_contrast(1.05)]"
        />
        {/* Diagonal scrim: dense at the left so the headline holds contrast,
            clear at the right so the flags stay visible. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(100deg,rgba(4,10,26,.72)_0%,rgba(6,15,34,.4)_34%,rgba(8,22,52,.08)_64%,rgba(10,30,66,0)_100%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(6,15,34,.34)_0%,transparent_32%,transparent_66%,rgba(6,15,34,.72)_100%)]"
        />

        {/* Logo crest */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-[2.5%] top-9 z-[1] hidden aspect-square w-[clamp(170px,19vw,400px)] [animation:gpiCrestIn_1.4s_var(--ease-gpi)_0.15s_both] [perspective:1100px] md:block"
        >
          <span className="absolute -inset-[14%] rounded-full bg-[radial-gradient(circle,rgba(127,178,238,.42),rgba(31,116,208,.12)_55%,transparent_72%)] blur-[18px] [animation:gpiCrestGlow_8s_ease-in-out_infinite]" />
          <span className="absolute inset-0 rounded-full border border-gold-400/45 [animation:gpiCrestRing_6s_ease-out_infinite]" />
          <span className="absolute inset-0 rounded-full border border-blue-300/40 [animation:gpiCrestRing_6s_ease-out_3s_infinite]" />
          <div className="absolute inset-0 [animation:gpiCrestFloat_11s_ease-in-out_infinite]">
            <Image
              src="/assets/logo.png"
              alt=""
              width={400}
              height={400}
              priority
              className="block h-full w-full object-contain drop-shadow-[0_24px_60px_rgba(0,0,0,0.72)]"
            />
          </div>
        </div>

        <div className="relative mx-auto max-w-[1280px] px-8 pb-[92px] pt-[104px]">
          <div
            data-reveal
            className="mb-[30px] text-[12.5px]/[1] font-bold uppercase tracking-[0.3em] text-blue-200 [text-shadow:0_2px_14px_rgba(0,0,0,.9)]"
          >
            A U.S. National Strategy &amp; Coalition-Building Organization
          </div>
          <h1
            data-reveal
            className="font-display m-0 mb-[30px] max-w-[min(940px,90%)] text-[clamp(38px,6.5vw,68px)]/[1.04] font-extrabold tracking-[-0.02em] text-white [text-shadow:0_4px_30px_rgba(2,8,20,.85)] lg:max-w-[min(940px,72%)]"
          >
            Stand with Israel.
            <br />
            Stand with Humanity.
            <br />
            Stand Against <span className="text-gold-400">Terrorism.</span>
          </h1>
          <p
            data-reveal
            className="m-0 mb-10 max-w-[680px] text-[17px]/[1.65] text-white/90 [text-shadow:0_2px_18px_rgba(2,8,20,.9)] md:text-[19px]"
          >
            Founded by combat veterans and frontline experts, Global Peace for
            Israel turns hard-earned operational experience into a coordinated
            national strategy: exposing Islamist and jihadist networks,
            defending Western democratic values, and equipping leaders with the
            tools to protect truth, security, and civil society. We don&apos;t
            wait for institutions to catch up. We act.
          </p>
          <div data-reveal className="flex flex-wrap gap-[15px]">
            <a
              href={site.external.donate}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
            >
              Donate Now
            </a>
            <Link href="/about" className="btn-outline">
              Our Mission
            </Link>
          </div>
        </div>

        {/* Stat bar */}
        <div className="relative mx-auto grid max-w-[1280px] grid-cols-2 border-t border-white/12 bg-[rgba(4,10,26,0.42)] backdrop-blur-[3px] lg:grid-cols-4">
          <Stat
            value={40}
            suffix="+"
            label="Chapters"
            className="border-b border-r border-white/10 lg:border-b-0"
          />
          <Stat
            value={4300}
            suffix="+"
            label="Members"
            className="border-b border-white/10 lg:border-b-0 lg:border-r"
          />
          <Stat
            value={6}
            label="Strategy Think Tanks"
            className="border-r border-white/10"
          />
          <div className="px-[22px] py-[30px] text-center">
            <div className="font-display text-[40px]/[1] font-extrabold text-gold-400">
              U.S.
            </div>
            <div className="mt-2 text-[12.5px]/[1.45] font-medium text-white/70">
              Based &amp; Focused
            </div>
          </div>
        </div>
      </section>

      {/* ============================ VIDEO ============================ */}
      <section className="border-b border-white/8 bg-navy-900 px-8 py-16">
        <div className="mx-auto grid max-w-[860px] items-center gap-12 md:grid-cols-[264px_1fr]">
          <div
            data-reveal
            className="mx-auto w-full max-w-[264px] overflow-hidden rounded-[14px] border border-white/14 bg-black leading-none shadow-[0_28px_60px_-28px_rgba(0,0,0,0.75)]"
          >
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${site.external.videoId}?rel=0`}
              title="Global Peace for Israel — who we are"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="block aspect-[9/16] w-full border-0 bg-black"
            />
          </div>
          <div>
            <div
              data-reveal
              className="mb-3.5 text-[11.5px]/[1] font-bold uppercase tracking-[0.24em] text-blue-300"
            >
              Watch
            </div>
            <h2
              data-reveal
              className="font-display m-0 mb-4 text-[clamp(24px,4vw,32px)]/[1.16] font-extrabold tracking-[-0.015em] text-white"
            >
              Who We Are, In Our Own Words
            </h2>
            <p
              data-reveal
              className="m-0 mb-[26px] max-w-[420px] text-[16px]/[1.7] text-white/75"
            >
              The mission, the threat, and the coalition we&apos;re building to
              meet it.
            </p>
            <div data-reveal className="flex flex-wrap gap-3">
              <Link
                href="/join"
                className="rounded-md bg-gold-500 px-[26px] py-[13px] text-[13.5px]/[1] font-bold text-[#1a1200] transition-transform hover:-translate-y-0.5 hover:text-[#1a1200]"
              >
                Join a Chapter
              </Link>
              <Link
                href="/about"
                className="rounded-md border-[1.5px] border-white/40 px-[26px] py-[13px] text-[13.5px]/[1] font-bold text-white transition-colors hover:border-white/70 hover:text-white"
              >
                Our Mission
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================== PODCAST =========================== */}
      <section className="relative overflow-hidden border-y border-white/7 bg-[radial-gradient(90%_120%_at_78%_40%,#1a1f6b_0%,#0d1440_38%,#070d24_72%,#050a18_100%)] px-8 py-[88px] lg:py-[104px]">
        <div
          aria-hidden
          className="pointer-events-none absolute right-[2%] top-1/2 h-[640px] w-[640px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(74,62,255,.4),rgba(74,62,255,0)_62%)] blur-[18px] [animation:gpiPodGlow_8s_ease-in-out_infinite]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-50 [background:repeating-linear-gradient(90deg,rgba(255,255,255,.028)_0_1px,transparent_1px_26px)]"
        />

        <div className="relative mx-auto grid max-w-[1180px] items-center gap-14 lg:grid-cols-[minmax(0,1.35fr)_minmax(190px,340px)]">
          <div data-reveal className="order-2 lg:order-1">
            <div className="mb-[22px] flex flex-wrap items-center gap-[11px]">
              <span className="text-[11.5px]/[1] font-bold uppercase tracking-[0.26em] text-pod-neon">
                The Podcast
              </span>
              <span className="inline-flex items-center gap-[7px] rounded-full bg-gold-400 px-[11px] py-1.5 text-[10px]/[1] font-bold uppercase tracking-[0.14em] text-[#1a1200]">
                <span className="h-[5px] w-[5px] rounded-full bg-[#1a1200] [animation:gpiPodBlink_1.8s_ease-in-out_infinite]" />
                Coming Soon
              </span>
            </div>

            <h2 className="font-display m-0 mb-2.5 text-[clamp(38px,4.6vw,58px)]/[1.02] font-extrabold tracking-[-0.025em] text-white">
              Global Peace
              <br />
              <span className="text-pod-neon">Unfiltered</span>
            </h2>

            <p className="m-0 mb-[34px] max-w-[520px] text-[17.5px]/[1.7] text-white/78">
              The conversations most institutions will not have on the record.
              Islamist and jihadist networks, foreign influence operations,
              antisemitism, and the defense of Western democratic values, with
              the people doing the work.
            </p>

            <div className="mb-9 flex flex-wrap gap-2.5">
              {[
                "Frontline interviews",
                "Investigations",
                "No talking points",
              ].map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-pod-neon/30 bg-pod-neon/[0.07] px-[15px] py-[9px] text-[12.5px]/[1] font-semibold text-white/72"
                >
                  {chip}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-[14px]">
              <a
                href={site.external.podcast}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold whitespace-nowrap rounded-[7px] px-[30px] py-[17px]"
              >
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="#1a1200"
                  aria-hidden
                >
                  <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15.2V8.8L15.5 12z" />
                </svg>
                Subscribe on YouTube
              </a>
              <span className="text-[13.5px]/[1.5] font-medium text-white/50">
                Episode one lands soon.
                <br />
                Subscribe and you will not miss it.
              </span>
            </div>
          </div>

          <div
            data-reveal
            className="relative order-1 aspect-square w-full max-w-[340px] justify-self-center lg:order-2"
          >
            <div
              aria-hidden
              className="absolute -inset-[6%] rounded-full border border-pod-neon/[0.16] [animation:gpiPodRing_7s_ease-in-out_infinite]"
            />
            <div
              aria-hidden
              className="absolute -inset-[16%] rounded-full border border-pod-neon/[0.09] [animation:gpiPodRing_7s_ease-in-out_1.4s_infinite]"
            />
            <Image
              src="/assets/podcast-logo.png"
              alt="Global Peace Unfiltered podcast logo"
              width={340}
              height={340}
              className="relative block h-full w-full object-contain drop-shadow-[0_0_40px_rgba(90,80,255,0.55)] [animation:gpiPodFloat_9s_ease-in-out_infinite]"
            />
          </div>
        </div>
      </section>

      {/* ========================= MISSION INTRO ======================== */}
      <section className="bg-white px-8 py-20 lg:py-24">
        <div className="mx-auto max-w-[1000px] text-center">
          <Eyebrow tone="dark" className="mb-[18px]">
            Who We Are
          </Eyebrow>
          <h2
            data-reveal
            className="font-display mx-auto m-0 mb-[26px] max-w-[820px] text-[clamp(28px,4.6vw,40px)]/[1.18] font-bold tracking-[-0.01em] text-navy-800"
          >
            Extremism is organized. Now the response is too.
          </h2>
          <p
            data-reveal
            className="mx-auto m-0 max-w-[800px] text-[17px]/[1.75] text-ink-muted md:text-[19px]"
          >
            For decades, Islamist ideology and jihadist influence networks have
            spread quietly through Western institutions. Campuses, classrooms,
            city councils, and media all became targets while good people waited
            for someone to respond. Global Peace for Israel is that response: a
            national strategy and coalition-building organization uniting the
            experts, resources, and frameworks needed to defend truth, security,
            and civil society. Our work operates at the intersection of{" "}
            <strong className="font-semibold text-navy-800">
              policy, education, media, technology, and grassroots mobilization
            </strong>
            , and it produces real, measurable outcomes.
          </p>
          <div data-reveal className="mt-[34px]">
            <Link
              href="/about"
              className="text-[15px]/[1] font-bold text-blue-600"
            >
              Learn more about our mission&nbsp;→
            </Link>
          </div>
        </div>
      </section>

      {/* ======================== SIX THINK TANKS ======================= */}
      <section className="border-y border-line bg-gray-50 px-8 py-20 lg:py-[92px]">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-[52px] text-center">
            <Eyebrow tone="dark" className="mb-4">
              Our Core Areas of Work
            </Eyebrow>
            <h2
              data-reveal
              className="font-display mx-auto m-0 mb-[18px] max-w-[760px] text-[clamp(27px,4.4vw,38px)]/[1.18] font-bold tracking-[-0.01em] text-navy-800"
            >
              A first-of-its-kind coalition, organized into six strategy think
              tanks.
            </h2>
            <p
              data-reveal
              className="mx-auto m-0 max-w-[730px] text-[17px]/[1.7] text-ink-soft"
            >
              In private, closed-door strategy sessions, we bring attorneys,
              educators, policymakers, security experts, technologists, and
              media professionals to the same table. That expertise becomes
              legal strategies, policy initiatives, communication frameworks,
              and action models communities can actually deploy.
            </p>
          </div>
          <div className="grid gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
            {thinkTanks.map((tank) => (
              <div
                key={tank.title}
                data-reveal
                className="gpi-card rounded-xl px-[26px] py-[30px]"
              >
                <div className="mb-5 flex h-[50px] w-[50px] items-center justify-center rounded-[11px] border-[1.5px] border-blue-500">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1f74d0"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d={tank.icon} />
                  </svg>
                </div>
                <h3 className="font-display m-0 mb-[11px] text-[18px]/[1.3] font-bold text-navy-800">
                  {tank.title}
                </h3>
                <p className="m-0 text-[14px]/[1.65] text-ink-soft">
                  {tank.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================== BRIDGE BUILDING ======================= */}
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#0a1e42,#07162f)] px-8 py-[100px]">
        <Image
          src="/assets/logo.png"
          alt=""
          aria-hidden
          width={560}
          height={560}
          className="pointer-events-none absolute -bottom-[160px] -left-[140px] hidden h-[560px] w-[560px] object-contain opacity-[0.06] mix-blend-screen md:block"
        />
        <div className="relative mx-auto max-w-[1080px] text-center">
          <Eyebrow tone="gold" className="mb-[18px]">
            Building Bridges With Allies
          </Eyebrow>
          <h2
            data-reveal
            className="font-display mx-auto m-0 mb-[26px] max-w-[860px] text-[clamp(28px,4.6vw,40px)]/[1.2] font-bold tracking-[-0.01em] text-white"
          >
            Uniting diverse communities around the foundational values of free
            societies.
          </h2>
          <p
            data-reveal
            className="mx-auto m-0 mb-10 max-w-[780px] text-[17px]/[1.75] text-white/80 md:text-[18px]"
          >
            Freedom of expression, equality under the law, pluralism, human
            dignity, and democratic governance. We build durable alliances
            across faiths, ethnic communities, and political backgrounds,
            grounded in shared Western values and national security.
          </p>
          <div
            data-reveal
            className="flex flex-wrap items-center justify-center gap-x-[34px] gap-y-3 text-[14px]/[1] font-semibold text-white/70"
          >
            <span>Freedom of Expression</span>
            <span className="text-gold-500">·</span>
            <span>Equality Under Law</span>
            <span className="text-gold-500">·</span>
            <span>Pluralism</span>
            <span className="text-gold-500">·</span>
            <span>Human Dignity</span>
          </div>
        </div>
      </section>

      {/* ====================== LEADERSHIP PREVIEW ====================== */}
      <section className="bg-white px-8 py-20 lg:py-[92px]">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-5">
            <div>
              <Eyebrow tone="dark" className="mb-4">
                Our Team
              </Eyebrow>
              <h2
                data-reveal
                className="font-display m-0 max-w-[640px] text-[clamp(27px,4.4vw,38px)]/[1.16] font-bold tracking-[-0.01em] text-navy-800"
              >
                IDF veterans, researchers, attorneys, educators &amp;
                strategists.
              </h2>
            </div>
            <Link
              data-reveal
              href="/team"
              className="whitespace-nowrap text-[15px]/[1] font-bold text-blue-600"
            >
              Meet the full team&nbsp;→
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-[22px] lg:grid-cols-4">
            {teamPreview.map((person) => (
              <div key={person.name} data-reveal>
                <div className="relative aspect-4/5 overflow-hidden rounded-xl bg-[#dbe4f0]">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-top saturate-[1.02]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(6,15,34,.72))]"
                  />
                  <div className="absolute inset-x-[18px] bottom-4">
                    <div className="font-display text-[16px]/[1.2] font-bold text-white">
                      {person.name}
                    </div>
                    <div className="mt-1 text-[11.5px]/[1.3] font-semibold tracking-[0.02em] text-gold-400">
                      {person.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================== FINAL CTA ========================== */}
      <section className="bg-gold-500 px-8 py-20 lg:py-24">
        <div className="mx-auto max-w-[920px] text-center">
          <h2
            data-reveal
            className="font-display m-0 mb-[22px] text-[clamp(28px,5vw,42px)]/[1.14] font-extrabold tracking-[-0.01em] text-[#1a1200]"
          >
            This is a silent war. We are building an army of leaders to face it.
          </h2>
          <p
            data-reveal
            className="mx-auto m-0 mb-[38px] max-w-[640px] text-[17px]/[1.65] text-[#1a1200]/80 md:text-[18px]"
          >
            Fought with strategy, law, education, and truth. Every contribution,
            partnership, and voice strengthens the front line. Stand with us.
          </p>
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

function Stat({
  value,
  suffix,
  label,
  className,
}: {
  value: number;
  suffix?: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={`px-[22px] py-[30px] text-center ${className ?? ""}`}>
      <StatCounter
        value={value}
        suffix={suffix}
        className="font-display text-[clamp(30px,5vw,40px)]/[1] font-extrabold tabular-nums text-gold-400"
      />
      <div className="mt-2 text-[12.5px]/[1.45] font-medium text-white/70">
        {label}
      </div>
    </div>
  );
}
