# nikole-garcia-portfolio

Professional portfolio website of **Nikole García Chávez** — Data Analytics, BI and junior Data Engineering. Built with [Astro](https://astro.build) + TypeScript, deployed to GitHub Pages.

Production URL (after enabling Pages): `https://nikole370.github.io/nikole-garcia-portfolio/`

## Requirements

- Node.js 20+ (22 recommended — CI uses 22)
- npm 10+

## Getting started

```bash
npm install       # install dependencies
npm run dev       # dev server at http://localhost:4321/nikole-garcia-portfolio/
```

Note: because the site is configured for GitHub Pages, the dev server serves it under the `/nikole-garcia-portfolio/` base path.

## Scripts

| Command           | What it does                                          |
| ----------------- | ----------------------------------------------------- |
| `npm run dev`     | Start the dev server                                  |
| `npm run check`   | Typecheck (`astro check`)                             |
| `npm test`        | Content-integrity tests (Node test runner)            |
| `npm run build`   | Production build into `dist/`                         |
| `npm run preview` | Serve the production build locally                    |
| `npm run verify`  | check + test + build (same order as CI)               |

## Where content lives

All copy is data, not markup — edit these files, never the components:

| File                       | Contents                                             |
| -------------------------- | ---------------------------------------------------- |
| `src/config/site.ts`       | Name, links, email, CV path/flag, EcoLima video slot |
| `src/data/projects.ts`     | The three case studies (full copy + links)           |
| `src/data/capabilities.ts` | Capability groups                                    |
| `src/data/about.ts`        | About section paragraphs                             |

To add a Spanish version later: create `projects.es.ts` / `about.es.ts` with the same shapes, add pages under `src/pages/es/`, and switch the data import on the locale. No component changes needed.

## Deployment (GitHub Pages)

The repo ships with `.github/workflows/deploy.yml`, which typechecks, tests, builds and deploys on every push to `main`.

One-time setup:

1. Push this repository to `https://github.com/Nikole370/nikole-garcia-portfolio`.
2. On GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Push to `main` (or run the workflow manually from the Actions tab).
4. The site publishes at `https://nikole370.github.io/nikole-garcia-portfolio/`.

Custom domain later? Set `site` in `astro.config.mjs` to the domain, change `base` to `"/"`, update `site.url`/`site.base` in `src/config/site.ts` and `Sitemap:` in `public/robots.txt`, then configure the domain in the Pages settings.

## Pending content

See [`CONTENT_REVIEW.md`](CONTENT_REVIEW.md) for the pre-publish checklist and the exact list of placeholders to fill (CV PDF, approved screenshots, optional EcoLima demo video).

## Project structure

```
├── .github/workflows/deploy.yml   # CI: check + test + build + deploy to Pages
├── public/
│   ├── cv/                        # place Nikole_Garcia_CV.pdf here
│   ├── images/projects/           # project covers (placeholder SVGs for now)
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── config/site.ts             # central config: links, contact, placeholders
│   ├── data/                      # all copy: projects, capabilities, about
│   ├── layouts/Base.astro         # <head>, SEO/OG, JSON-LD, theme bootstrap
│   ├── components/                # Header, Footer, ProjectCard
│   ├── pages/                     # index, projects/[slug], 404
│   └── styles/global.css          # design system (light/dark, WCAG-aware)
└── tests/content.test.ts          # content-integrity tests
```
