"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { primaryNav, site } from "@/content/site";

/**
 * Sticky site header.
 *
 * Past 40px of scroll it "sticks": the ground darkens, vertical padding tightens
 * and the logo scales down — the compression the prototype's polish.js applied
 * via a `data-gpi-stuck` attribute.
 *
 * Nav items carry `whitespace-nowrap` and the row wraps as whole items. That is
 * deliberate: letting flex compress the labels split them mid-word and pushed
 * the Donate button out of the header at tablet widths.
 */
export default function Header() {
  const pathname = usePathname();
  const [stuck, setStuck] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isCurrent = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      data-stuck={stuck ? "" : undefined}
      className={[
        "sticky top-0 z-50 border-b border-white/9 backdrop-blur-[10px] transition-[background,box-shadow,padding] duration-300",
        stuck
          ? "bg-[rgba(5,12,26,0.96)] shadow-[0_10px_34px_-18px_rgba(0,0,0,0.8)]"
          : "bg-[rgba(7,17,36,0.92)]",
      ].join(" ")}
    >
      <div
        className={[
          "mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-8 transition-[padding] duration-300",
          stuck ? "py-[9px]" : "py-[14px]",
        ].join(" ")}
      >
        <Link href="/" className="flex shrink-0 items-center gap-[13px]">
          <Image
            src="/assets/logo.png"
            alt=""
            width={46}
            height={46}
            priority
            className={[
              "h-[46px] w-[46px] object-contain transition-transform duration-300",
              stuck ? "scale-[0.86]" : "",
            ].join(" ")}
          />
          <span className="font-display text-[15px]/[1.05] font-extrabold tracking-[0.02em] text-white">
            GLOBAL PEACE
            <br />
            <span className="text-[10.5px] font-semibold tracking-[0.34em] text-blue-300">
              FOR&nbsp;ISRAEL
            </span>
          </span>
          <span className="sr-only">{site.name} — home</span>
        </Link>

        {/* Desktop navigation */}
        <nav
          aria-label="Primary"
          className="hidden flex-wrap items-center justify-end gap-4 text-[13px]/[1] font-semibold lg:flex"
        >
          {primaryNav.map((item) => {
            const current = isCurrent(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current ? "page" : undefined}
                className={[
                  "group relative whitespace-nowrap py-1 transition-colors",
                  current ? "text-white" : "text-white/86 hover:text-white",
                ].join(" ")}
              >
                {item.label}
                <span
                  aria-hidden
                  className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-gold-400 transition-transform duration-[320ms] ease-gpi group-hover:scale-x-100"
                />
              </Link>
            );
          })}
          <a
            href={site.external.donate}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap rounded-[5px] bg-gold-500 px-5 py-[10px] font-bold tracking-[0.02em] text-[#1a1200] transition-transform duration-200 hover:-translate-y-0.5 hover:text-[#1a1200]"
          >
            Donate
          </a>
        </nav>

        {/* Mobile trigger */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[7px] border border-white/20 text-white lg:hidden"
        >
          <span className="sr-only">
            {menuOpen ? "Close menu" : "Open menu"}
          </span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            aria-hidden
          >
            {menuOpen ? (
              <>
                <path d="M6 6l12 12" />
                <path d="M18 6L6 18" />
              </>
            ) : (
              <>
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      <nav
        id="mobile-nav"
        aria-label="Primary"
        hidden={!menuOpen}
        className="border-t border-white/10 bg-[rgba(5,12,26,0.98)] px-8 pb-7 pt-5 lg:hidden"
      >
        <ul className="flex flex-col gap-1 text-[15px] font-semibold">
          {primaryNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setMenuOpen(false)}
                aria-current={isCurrent(item.href) ? "page" : undefined}
                className={[
                  "block py-2.5",
                  isCurrent(item.href) ? "text-white" : "text-white/80",
                ].join(" ")}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <a
          href={site.external.donate}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMenuOpen(false)}
          className="mt-4 block rounded-[5px] bg-gold-500 py-3 text-center font-bold text-[#1a1200] hover:text-[#1a1200]"
        >
          Donate
        </a>
      </nav>
    </header>
  );
}
