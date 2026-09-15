import Image from "next/image";
import Link from "next/link";

import {
  footerExplore,
  footerInvolved,
  site,
  type NavItem,
} from "@/content/site";

function FooterLinks({ items }: { items: NavItem[] }) {
  return (
    <div className="flex flex-col gap-[11px] text-[13.5px]/[1.2] font-medium">
      {items.map((item) =>
        item.external ? (
          <a
            key={item.href}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link w-fit"
          >
            {item.label}
          </a>
        ) : (
          <Link key={item.href} href={item.href} className="footer-link w-fit">
            {item.label}
          </Link>
        ),
      )}
    </div>
  );
}

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 text-[12px]/[1] font-bold uppercase tracking-[0.14em] text-white">
      {children}
    </h2>
  );
}

export default function Footer() {
  return (
    <footer className="bg-navy-900 px-8 pb-[30px] pt-[60px] text-white/70">
      <div className="mx-auto grid max-w-[1280px] gap-10 border-b border-white/10 pb-11 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.1fr]">
        <div>
          <Link href="/" className="mb-4 flex items-center gap-3">
            <Image
              src="/assets/logo.png"
              alt=""
              width={44}
              height={44}
              className="h-11 w-11 object-contain"
            />
            <span className="font-display text-[14px]/[1.1] font-extrabold text-white">
              GLOBAL PEACE
              <br />
              <span className="text-[10px] font-semibold tracking-[0.3em] text-blue-300">
                FOR ISRAEL
              </span>
            </span>
          </Link>
          <p className="mb-[18px] max-w-[290px] text-[13.5px]/[1.65]">
            {site.tagline}
          </p>
          <div className="flex gap-3">
            <a
              href={site.external.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Global Peace for Israel on Instagram"
              className="flex h-[38px] w-[38px] items-center justify-center rounded-[9px] border border-white/20 transition-colors hover:border-white/45"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#7fb2ee"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" />
              </svg>
            </a>
            <a
              href={site.external.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Global Peace for Israel on Facebook"
              className="flex h-[38px] w-[38px] items-center justify-center rounded-[9px] border border-white/20 transition-colors hover:border-white/45"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#7fb2ee" aria-hidden>
                <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H7v3h3v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1z" />
              </svg>
            </a>
          </div>
        </div>

        <div>
          <ColumnHeading>Explore</ColumnHeading>
          <FooterLinks items={footerExplore} />
        </div>

        <div>
          <ColumnHeading>Get Involved</ColumnHeading>
          <div className="flex flex-col gap-[11px] text-[13.5px]/[1.2] font-medium">
            {footerInvolved.map((item) => (
              <Link key={item.href} href={item.href} className="footer-link w-fit">
                {item.label}
              </Link>
            ))}
            <a
              href={site.external.donate}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link w-fit font-semibold text-gold-400 hover:text-gold-400"
            >
              Donate
            </a>
          </div>
        </div>

        <div>
          <ColumnHeading>Contact</ColumnHeading>
          <address className="mb-3 text-[13.5px]/[1.7] not-italic">
            {site.address.line1}
            <br />
            {site.address.line2}
            <br />
            {site.address.city}, {site.address.state} {site.address.zip}
          </address>
          <p className="text-[13.5px]/[1.7]">
            <a href={`mailto:${site.email}`} className="text-blue-300 hover:text-white">
              {site.email}
            </a>
            <br />
            <a href={site.phoneHref} className="text-white/70 hover:text-white">
              {site.phone}
            </a>
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[1280px] pt-6 text-[12.5px]/[1.5] text-white/55">
        {site.copyright}
      </div>
    </footer>
  );
}
