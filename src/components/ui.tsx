import Link from "next/link";

import { site } from "@/content/site";

/** A short uppercase label above a heading. */
export function Eyebrow({
  children,
  tone = "blue",
  className,
}: {
  children: React.ReactNode;
  tone?: "blue" | "gold" | "dark";
  className?: string;
}) {
  const colour =
    tone === "gold"
      ? "text-gold-400"
      : tone === "dark"
        ? "text-blue-600"
        : "text-blue-300";
  return (
    <div
      data-reveal
      className={`text-[12.5px]/[1] font-bold uppercase tracking-[0.24em] ${colour} ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

/** A bordered icon tile with a title and one line of supporting copy. */
export function IconPoint({
  icon,
  title,
  body,
  size = 40,
}: {
  icon: string;
  title: string;
  body: string;
  size?: number;
}) {
  return (
    <div className="flex items-start gap-[14px]">
      <div
        className="flex shrink-0 items-center justify-center rounded-[10px] border-[1.5px] border-blue-500"
        style={{ width: size, height: size }}
      >
        <svg
          width={size * 0.475}
          height={size * 0.475}
          viewBox="0 0 24 24"
          fill="none"
          stroke="#1f74d0"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d={icon} />
        </svg>
      </div>
      <div>
        <div className="font-display text-[15px]/[1.3] font-bold text-navy-800">
          {title}
        </div>
        <div className="text-[14px]/[1.55] text-ink-soft">{body}</div>
      </div>
    </div>
  );
}

/** The navy closing band used at the foot of most pages. */
export function CtaBand({
  heading,
  body,
  primary,
  secondary,
}: {
  heading: string;
  body?: string;
  primary?: { label: string; href: string; external?: boolean };
  secondary?: { label: string; href: string };
}) {
  const donate = primary ?? {
    label: "Donate Now",
    href: site.external.donate,
    external: true,
  };

  return (
    <section className="bg-navy-800 px-8 py-[70px] md:py-[88px]">
      <div className="mx-auto max-w-[820px] text-center">
        <h2
          data-reveal
          className="font-display m-0 mb-[18px] text-[clamp(26px,4vw,36px)]/[1.2] font-bold tracking-[-0.01em] text-white"
        >
          {heading}
        </h2>
        {body ? (
          <p
            data-reveal
            className="mx-auto mb-[30px] max-w-[560px] text-[16px]/[1.7] text-white/78"
          >
            {body}
          </p>
        ) : null}
        <div data-reveal className="flex flex-wrap justify-center gap-[14px]">
          {donate.external ? (
            <a
              href={donate.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
            >
              {donate.label}
            </a>
          ) : (
            <Link href={donate.href} className="btn-gold">
              {donate.label}
            </Link>
          )}
          {secondary ? (
            <Link href={secondary.href} className="btn-outline">
              {secondary.label}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/** The per-article copyright line shown under long-form bodies. */
export function CopyrightRule() {
  return (
    <div className="mt-12 border-t border-line pt-[26px] text-[12.5px]/[1.5] text-ink-lightest">
      {site.copyright}
    </div>
  );
}

/** Download button for a publication's source document. */
export function DownloadButton({
  href,
  label = "Download PDF",
}: {
  href: string;
  label?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2.5 rounded-md border-[1.5px] border-blue-600 px-[26px] py-[14px] text-[14px]/[1] font-bold text-blue-600 transition-colors hover:bg-blue-600 hover:text-white"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
      </svg>
      {label}
    </a>
  );
}
