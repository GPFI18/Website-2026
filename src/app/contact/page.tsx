import type { Metadata } from "next";

import { PageHero } from "@/components/PageHero";
import SiteForm from "@/components/SiteForm";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Partner with us, bring a strategy session to your community, or lend your expertise. We'd like to hear from you.",
};

function DetailRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-[15px]">
      <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[10px] border-[1.5px] border-blue-500">
        {icon}
      </div>
      <div>
        <div className="mb-[7px] text-[12px]/[1] font-bold uppercase tracking-[0.1em] text-ink-faint">
          {label}
        </div>
        <div className="text-[15px]/[1.6] font-medium text-[#334]">
          {children}
        </div>
      </div>
    </div>
  );
}

function Icon({ d, fill }: { d: string; fill?: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#1f74d0"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d={d} />
      {fill ? null : null}
    </svg>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        mode="flagwave"
        eyebrow="Contact Us"
        title="Join the coalition."
        lede="Partner with us, bring a strategy session to your community, or lend your expertise. We'd like to hear from you."
      />

      <section className="bg-white px-8 pb-24 pt-20 lg:pb-[100px]">
        <div className="mx-auto grid max-w-[1080px] items-start gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-14">
          <div data-reveal>
            <h2 className="font-display m-0 mb-[26px] text-[24px]/[1.2] font-bold text-navy-800">
              Get in touch
            </h2>

            <div className="flex flex-col gap-6">
              <DetailRow
                label="Location"
                icon={
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1f74d0"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                }
              >
                <address className="not-italic">
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                  <br />
                  {site.address.city}, {site.address.state} {site.address.zip}
                </address>
              </DetailRow>

              <DetailRow
                label="Email"
                icon={
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1f74d0"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="M3 7l9 6 9-6" />
                  </svg>
                }
              >
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </DetailRow>

              <DetailRow
                label="Phone"
                icon={
                  <Icon d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
                }
              >
                <a href={site.phoneHref}>{site.phone}</a>
              </DetailRow>

              <DetailRow
                label="Follow"
                icon={
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1f74d0"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" />
                  </svg>
                }
              >
                <a
                  href={site.external.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @globalpeaceforisrael
                </a>
              </DetailRow>
            </div>

            <a
              href={site.external.donate}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-[34px] block rounded-xl border border-[#e5d5a8] bg-gold-50 px-6 py-5 transition-colors hover:border-gold-500"
            >
              <div className="font-display mb-[5px] text-[16px]/[1.3] font-bold text-[#6e561a]">
                Support our mission →
              </div>
              <div className="text-[13.5px]/[1.55] text-[#6e561a]">
                Your donation fuels strategy, law, education, and truth.
              </div>
            </a>
          </div>

          <SiteForm kind="contact" />
        </div>
      </section>
    </>
  );
}
