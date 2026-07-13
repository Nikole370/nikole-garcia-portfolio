# Content review checklist

Run through this before publishing (and after any content change). Items marked **PENDING** are known placeholders shipped in v1.

## Pending inputs from Nikole

- [ ] **PENDING — CV**: add `public/cv/Nikole_Garcia_CV.pdf`, then set `cv.available: true` in `src/config/site.ts`. Until then the CV button is hidden (no broken link is published).
- [ ] **PENDING — Project covers**: the three files in `public/images/projects/*.svg` are stylized placeholders. Replace with approved screenshots (NYC 311 and Retail: real dashboard captures; EcoLima: sanitized capture with no user data, tokens or internal URLs visible). Keep ~16:9, update `cover` width/height/alt in `src/data/projects.ts` if the format changes.
- [ ] **PENDING — EcoLima demo video (optional)**: when the 60–120 s video exists, set `videoUrl` in the EcoLima entry of `src/data/projects.ts` (or `ecolima.demoVideoUrl` in `site.ts`). The "Watch demo" button appears automatically. Its absence does not block launch.
- [ ] **PENDING — OG image**: `public/og.png` is a generated placeholder; replace with a branded 1200×630 image when available (optional).
- [ ] Final domain: if a custom domain is adopted, update `astro.config.mjs`, `src/config/site.ts` and `public/robots.txt`.

## Content accuracy & honesty

- [ ] Every metric on the site exists in the source repo README/docs (NYC 311: ~20.8M rows tied to the 2026-04-18 snapshot; Retail: S/ 163.0M, +22.1%, 89.4%, 41.4%, S/ 19.2M gap; EcoLima: 2 districts of real data).
- [ ] EcoLima is presented as **work in progress**, co-authored, with simulated-data caveats intact. No metric from simulated data is presented as real-world validation.
- [ ] Role statements separate individual work from team work; support contributions are not phrased as ownership.
- [ ] No inflated seniority ("senior", "expert", "led the team") anywhere.
- [ ] No empty phrases ("passionate about technology", etc.).

## Privacy & security

- [ ] No credentials, tokens, connection strings or environment variable names anywhere in the repo.
- [ ] No internal/staging URLs (the EcoLima Azure app and API URLs are deliberately **not** published; demo is "access on request").
- [ ] No personal data beyond the configured email; no phone number.
- [ ] EcoLima screenshots (when added) are sanitized: no logged-in user info, no URLs in the browser bar, no API keys in dev tools.

## Links

- [ ] All external links open (Tableau ×2, GitHub Pages story, 5 GitHub repos, LinkedIn).
- [ ] Tableau links load the correct viz (they require JavaScript — check in a real browser).
- [ ] EcoLima repo links: repos are currently public. If they become private, replace the links with a "Private repository" label + contact CTA in `src/data/projects.ts`.
- [ ] `mailto:` links use the current address from `src/config/site.ts`.
- [ ] No internal 404s: run `npm run build && npm run preview` and click through every page including `/404`.

## Responsive & accessibility

- [ ] Renders correctly at 320 px, 768 px, 1024 px and 1440 px widths.
- [ ] Keyboard-only pass: skip link works, all interactive elements reachable, focus visible everywhere.
- [ ] Light and dark themes both meet contrast (spot-check text on tinted backgrounds).
- [ ] Images have meaningful alt text (or empty alt when decorative).
- [ ] Reduced-motion preference respected (no scroll-smooth/transitions).
- [ ] Heading hierarchy is sequential on every page (one h1 per page).

## SEO & metadata

- [ ] Title/description unique per page; canonical URLs correct with the `/nikole-garcia-portfolio/` base.
- [ ] Open Graph + Twitter card tags present; `og.png` resolves.
- [ ] `sitemap-index.xml` generated and referenced in `robots.txt`.
- [ ] JSON-LD (Person on all pages; ItemList on home; CreativeWork on case studies) validates in the Rich Results test.

## Quality gates

- [ ] `npm run verify` passes (typecheck + tests + build).
- [ ] Lighthouse on the production build: ≥90 in Performance, Accessibility, Best Practices, SEO (embeds are avoided on the listing, so this should hold).
