/**
 * Central site configuration.
 *
 * Every personal link, contact detail and pending placeholder lives here so
 * content can be corrected without touching components.
 *
 * Items marked TODO are pending input from Nikole — see CONTENT_REVIEW.md.
 */

export const site = {
  /** Production URL (GitHub Pages project site). TODO: update if a custom domain is added. */
  url: "https://nikole370.github.io",
  /** Base path on GitHub Pages. Set to "" if a custom domain is used. */
  base: "/nikole-garcia-portfolio",

  name: "Nikole García Chávez",
  /** Short name used in the header / footer. */
  shortName: "Nikole García",
  role: "Computer Science student & Junior Software Developer",
  location: "Lima, Peru",

  /** One-line positioning used in the hero and meta description. */
  tagline:
    "Data Analytics, BI and junior Data Engineering — documented pipelines, executive dashboards, and honest methodology.",

  description:
    "Portfolio of Nikole García Chávez, Computer Science student and junior software developer in Lima, Peru, focused on BI / SQL / reporting, Data Analytics and junior Data Engineering.",

  /** Default language of this version. Architecture is ready for an /es/ version later. */
  lang: "en",

  links: {
    github: "https://github.com/Nikole370",
    linkedin: "https://www.linkedin.com/in/nikole-garc%C3%ADa-ch%C3%A1vez/",
    tableau: "https://public.tableau.com/app/profile/nikole.garcia",
    email: "nisgarcha@gmail.com",
  },

  cv: {
    /** Served from public/cv/. TODO: add the real PDF, then set available: true. */
    path: "/cv/Nikole_Garcia_CV.pdf",
    available: false,
  },

  ecolima: {
    /**
     * TODO: optional 60–120s demo video URL (YouTube/Vimeo unlisted is fine).
     * Leave null to hide the "Watch demo" CTA. Its absence does not block launch.
     */
    demoVideoUrl: null as string | null,
    /** Shown on the EcoLima case study — the deployed app requires login. */
    demoNotice: "Authenticated demo — access available on request.",
  },
} as const;

/** mailto: link built from the configured address. */
export const mailto = `mailto:${site.links.email}`;

/**
 * Prefix an internal path with the configured base path.
 * Use for every internal href/src so the site works on GitHub Pages.
 */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
