import Image from "next/image";
import Link from "next/link";

import HeroCanvas, { type HeroMode } from "./HeroCanvas";

/**
 * The inner-page hero: a navy radial ground, a decorative logo watermark, the
 * page's ambient canvas, and centered eyebrow / H1 / lede.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  mode,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  mode: HeroMode;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(130%_130%_at_76%_-22%,#164081,#0a1e42_56%,#060f22)] px-8 pb-[74px] pt-[84px]">
      <HeroCanvas mode={mode} />
      <Image
        src="/assets/logo.png"
        alt=""
        aria-hidden
        width={600}
        height={600}
        className="pointer-events-none absolute -right-[150px] -top-[110px] hidden h-[600px] w-[600px] object-contain opacity-[0.07] mix-blend-screen md:block"
      />
      <div className="relative mx-auto max-w-[900px] text-center">
        <div className="mb-[22px] text-[12.5px]/[1] font-bold uppercase tracking-[0.3em] text-blue-300">
          {eyebrow}
        </div>
        <h1 className="font-display m-0 mb-6 text-[clamp(34px,6vw,54px)]/[1.08] font-extrabold tracking-[-0.02em] text-white">
          {title}
        </h1>
        {lede ? (
          <p className="mx-auto max-w-[720px] text-[17.5px]/[1.7] text-white/82">
            {lede}
          </p>
        ) : null}
        {children}
      </div>
    </section>
  );
}

/**
 * The left-aligned hero used by article and brief detail pages: narrower,
 * opening with a back-link to the publications index.
 */
export function ArticleHero({
  kicker,
  title,
  byline,
  mode = "streaks",
  backHref = "/publications",
  backLabel = "All publications",
}: {
  kicker: string;
  title: string;
  byline?: React.ReactNode;
  mode?: HeroMode;
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(130%_130%_at_76%_-22%,#164081,#0a1e42_56%,#060f22)] px-8 pb-[66px] pt-[60px]">
      <HeroCanvas mode={mode} />
      <div className="relative mx-auto max-w-[768px]">
        <Link
          href={backHref}
          className="mb-7 inline-block text-[13px]/[1] font-semibold text-blue-300 hover:text-white"
        >
          ← {backLabel}
        </Link>
        <div className="mb-[18px] text-[11.5px]/[1] font-bold uppercase tracking-[0.22em] text-gold-400">
          {kicker}
        </div>
        <h1 className="font-display m-0 text-[clamp(30px,5vw,42px)]/[1.14] font-extrabold tracking-[-0.018em] text-white">
          {title}
        </h1>
        {byline ? (
          <div className="mt-6 text-[13.5px]/[1.6] text-white/72">{byline}</div>
        ) : null}
      </div>
    </section>
  );
}
