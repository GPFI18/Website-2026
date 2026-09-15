# Global Peace for Israel — Website 2026

The public site for **Global Peace For Israel Corp.**, built from the 2026 design
handoff. Next.js (App Router) + TypeScript + Tailwind CSS v4, deployed on Vercel.

---

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in the Resend values when you have them
npm run dev                  # http://localhost:3000
```

Other scripts:

| Command | What it does |
|---|---|
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build (all pages prerender to static HTML) |
| `npm start` | Serve the production build locally |
| `npm run typecheck` | TypeScript, no emit |
| `npm run lint` | Next's ESLint config |

---

## Environment variables

Copy `.env.example` to `.env.local` locally, and set the same keys in the Vercel
project (Settings → Environment Variables).

| Variable | Required | Purpose |
|---|---|---|
| `RESEND_API_KEY` | For live forms | Sends form submissions. **Without it the site still builds and runs** — submissions are logged to the server console instead of emailed, and the visitor still sees the success message. |
| `CONTACT_TO_EMAIL` | No | Where submissions are delivered. Defaults to `info@globalpeaceforisrael.com`. |
| `CONTACT_FROM_EMAIL` | For live forms | The sender address, on a domain verified in Resend (e.g. `website@globalpeaceforisrael.com`). |
| `NEXT_PUBLIC_SITE_URL` | For production | Canonical URL used by metadata, Open Graph tags and the sitemap. |

To switch the forms on: create a Resend account, verify
`globalpeaceforisrael.com` as a sending domain, generate an API key, and set the
three values above in Vercel.

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx            Shell: fonts, header, footer, motion layer, JSON-LD
│   ├── globals.css           Design tokens, base styles, shared component classes
│   ├── page.tsx              Home
│   ├── actions.ts            The one server action behind all four forms
│   ├── about|team|projects|publications|news|gallery/
│   ├── join|events|partner|contact/
│   ├── publications/[slug]/  Seven article and brief detail pages
│   ├── news/[slug]/          News article detail
│   ├── sitemap.ts robots.ts not-found.tsx
├── components/
│   ├── Header.tsx Footer.tsx MotionLayer.tsx
│   ├── HeroCanvas.tsx        The eight ambient hero canvas modes
│   ├── PageHero.tsx ArticleBody.tsx ui.tsx
│   ├── PublicationsBrowser.tsx GalleryGrid.tsx
│   ├── SiteForm.tsx StatCounter.tsx
├── content/                  All copy and data (see below)
├── lib/                      Form definitions, validation, email delivery
└── fonts/                    Self-hosted Montserrat and Inter subsets
public/assets/                Images and publication source documents
```

### Where the content lives

Nothing is hardcoded in page components. To change what the site says, edit:

| File | Contents |
|---|---|
| `src/content/site.ts` | Address, phone, email, social and donate URLs, navigation |
| `src/content/team.ts` | The ten-person roster and the home page preview |
| `src/content/projects.ts` | Nine programs, eight coalition desks, six think tanks |
| `src/content/publications.ts` | Five categories and the publication inventory |
| `src/content/articles.ts` | Long-form article and brief bodies |
| `src/content/article-data.ts` | Charlie Kirk charts and sources, Duwaji references |
| `src/content/news.ts` | The news index |
| `src/content/states.ts` | US state list for form dropdowns |

Adding a publication is one entry in `publications.ts`; if it needs its own page,
add the body to `articles.ts` and its slug to `PUBLICATION_SLUGS` in
`src/app/publications/[slug]/page.tsx`.

**The article text is real published editorial. Reproduce it verbatim — do not
edit or paraphrase it.**

---

## Design system

All tokens live in the `@theme` block at the top of `src/app/globals.css`, named
to match the design handoff (`navy-800`, `gold-500`, `ink-muted`, and so on).
Change a colour there and it changes everywhere. Typography, container widths and
the shared easing curve are tokens too.

Shared component classes — `.gpi-card`, `.btn-gold`, `.btn-outline`, `.btn-solid`,
`.gpi-prose`, `.footer-link` — are also defined there rather than repeated across
components.

### Motion

`MotionLayer` (mounted once in the layout) provides the scroll progress bar,
scroll reveals with an 80ms sibling stagger, the gold heading rules, and the
back-to-top button. `HeroCanvas` renders the per-page ambient canvas. Every
animation is suppressed under `prefers-reduced-motion: reduce`.

Mark any element `data-reveal` to have it fade and rise into view.

---

## Deployment

The repo is a standard Next.js app and needs no special Vercel configuration
beyond the environment variables above. Push to `main` and Vercel builds and
deploys; pull requests get preview deployments.

Every route prerenders to static HTML at build time, so the site is served from
the CDN edge with no server rendering on the hot path. Form submissions are the
only server work, and they run as a server action.

Before pointing the domain at it, set `NEXT_PUBLIC_SITE_URL` so metadata,
Open Graph tags and `sitemap.xml` use the real hostname.

---

## Notable decisions

These differ from a literal transcription of the prototypes, and each is
deliberate:

- **Fonts are self-hosted**, not loaded from Google Fonts at runtime. The latin
  subsets of Montserrat and Inter ship with the app (about 200 KB total), which
  removes a third-party request from every page load.
- **The Team page hero uses the `roster` canvas.** The handoff README described a
  `usmap` mode that fetched US geography from Natural Earth via d3 and topojson
  at runtime; the shipped prototype used `roster` there instead. Following the
  prototype removes the site's last runtime CDN dependency.
- **The news cover image is hosted locally.** The prototype hotlinked the old
  site's Squarespace CDN.
- **Images were compressed.** The hero photograph shipped at 8736×4896 and 10 MB;
  it is now 2400px wide and under 500 KB, with portraits and covers similarly
  capped. `next/image` handles responsive sizes and AVIF/WebP from there.
- **Two metadata greys were darkened** — `ink-faint` and `ink-lightest` — and the
  gold accent used as small text swapped for `gold-800`. The handoff values fell
  below the 4.5:1 contrast minimum. The shift is imperceptible at those sizes.
- **Forms validate before the spam timing trap**, so someone using browser
  autofill sees real errors rather than a success message for a submission that
  was never sent.

---

## Still outstanding

Carried over from the design handoff, plus what this build added:

1. **`Curriculum of Erasure` body copy is placeholder.** The page shows a visible
   "Draft summary" notice until the real report text is supplied. Replace the
   entry in `articles.ts` and set `placeholder: false`.
2. **Desk portraits are low-resolution** — they were cropped from a single
   composite graphic. Request higher-resolution originals before launch.
3. **The podcast logo is a luminance key from a photograph.** A vector or
   transparent original would be cleaner.
4. **Publication covers are generated placeholders**, except
   `Curriculum of Erasure`. Replace with real cover art when available.
5. **Verify the hero photograph's licence** (Adobe Stock 1912264114) covers web
   use at launch.
6. **Two empty publication categories** — Curriculum Reviews and Analysis &
   Commentary — currently render a placeholder. Confirm that is wanted rather
   than hiding them.
7. **Two brief pages are not linked from Publications**
   (`antizionism-todays-jew-hatred`, `the-nakba-narrative`), since their content
   was folded into the combined APR brief. They are reachable by URL and linked
   from each other. Confirm whether they should stay.
8. **Forms need a Resend key** before submissions are delivered anywhere.
9. **"Download PDF" on the curriculum report** points at
   `curriculum-of-erasure.pdf`; confirm that file is the full report.
