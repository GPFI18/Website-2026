/**
 * Organization facts and site-wide navigation.
 *
 * Every address, phone number and external URL on the site resolves from here.
 * These values are the client's real details — change them in one place.
 */

export const site = {
  name: "Global Peace for Israel",
  legalName: "Global Peace For Israel Corp.",
  tagline:
    "A U.S. national strategy and coalition-building organization defending truth, security, and civil society.",
  description:
    "Global Peace for Israel is a U.S. national strategy and coalition-building organization exposing Islamist and jihadist networks, defending Western democratic values, and equipping leaders to protect truth, security, and civil society.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://globalpeaceforisrael.com",
  copyright: "Copyright © 2026 Global Peace for Israel. All Rights Reserved.",

  address: {
    line1: "12955 Biscayne Blvd.",
    line2: "Ste. 200 #106",
    city: "Miami",
    state: "FL",
    zip: "33181",
  },

  email: "info@globalpeaceforisrael.com",
  phone: "310-310-5069",
  phoneHref: "tel:+13103105069",

  external: {
    donate:
      "https://www.zeffy.com/fundraising/donate-to-make-a-difference-2948",
    instagram: "https://www.instagram.com/globalpeaceforisrael/",
    facebook: "https://www.facebook.com/people/Global-Peace-For-Israel/",
    podcast:
      "https://youtube.com/@globalpeaceunfiltered?si=XwqNFHrtQifuPqeK",
    videoId: "VBqBbMeIFdc",
  },
} as const;

export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

/** Primary header navigation, in order. The Donate button is rendered separately. */
export const primaryNav: NavItem[] = [
  { label: "About Us", href: "/about" },
  { label: "Our Team", href: "/team" },
  { label: "Publications", href: "/publications" },
  { label: "News", href: "/news" },
  { label: "Our Projects", href: "/projects" },
  { label: "Gallery", href: "/gallery" },
  { label: "Join a Chapter", href: "/join" },
  { label: "Contact", href: "/contact" },
];

export const footerExplore: NavItem[] = [
  { label: "About Us", href: "/about" },
  { label: "Our Team", href: "/team" },
  { label: "Our Projects", href: "/projects" },
  { label: "Publications", href: "/publications" },
  { label: "News", href: "/news" },
  { label: "Photo Gallery", href: "/gallery" },
  { label: "Podcast", href: site.external.podcast, external: true },
];

export const footerInvolved: NavItem[] = [
  { label: "Join a Chapter", href: "/join" },
  { label: "Register for an Event", href: "/events" },
  { label: "Become a Partner", href: "/partner" },
  { label: "Contact", href: "/contact" },
];
