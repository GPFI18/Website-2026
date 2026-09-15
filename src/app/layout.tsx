import type { Metadata } from "next";
import localFont from "next/font/local";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MotionLayer from "@/components/MotionLayer";
import { site } from "@/content/site";

import "./globals.css";

/**
 * Montserrat and Inter, self-hosted.
 *
 * The prototypes pulled these from Google Fonts at runtime. Shipping the latin
 * subsets with the app removes a third-party request from every page load —
 * faster first paint, no data leaving to a CDN, and no dependency on an
 * external host staying up.
 */
const montserrat = localFont({
  src: [
    { path: "../fonts/montserrat-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/montserrat-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../fonts/montserrat-latin-700-normal.woff2", weight: "700", style: "normal" },
    { path: "../fonts/montserrat-latin-800-normal.woff2", weight: "800", style: "normal" },
    { path: "../fonts/montserrat-latin-900-normal.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-montserrat",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const inter = localFont({
  src: [
    { path: "../fonts/inter-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/inter-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/inter-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../fonts/inter-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — A U.S. National Strategy & Coalition-Building Organization`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — A U.S. National Strategy & Coalition-Building Organization`,
    description: site.description,
    url: site.url,
    images: [{ url: "/assets/hero-flags.jpeg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
    images: ["/assets/hero-flags.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/assets/logo.png",
    apple: "/assets/logo.png",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  logo: `${site.url}/assets/logo.png`,
  description: site.description,
  email: site.email,
  telephone: site.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${site.address.line1} ${site.address.line2}`,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.zip,
    addressCountry: "US",
  },
  sameAs: [
    site.external.instagram,
    site.external.facebook,
    site.external.podcast,
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-md focus:bg-white focus:px-4 focus:py-3 focus:font-semibold focus:text-navy-800"
        >
          Skip to content
        </a>
        <MotionLayer />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </body>
    </html>
  );
}
