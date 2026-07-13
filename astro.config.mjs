// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

/**
 * Deployment target: GitHub Pages (project site).
 *   site: https://nikole370.github.io
 *   base: /nikole-garcia-portfolio
 *
 * If a custom domain is added later, set `site` to that domain and
 * change `base` to "/" (also update site.ts -> siteUrl).
 */
export default defineConfig({
  site: "https://nikole370.github.io",
  base: "/nikole-garcia-portfolio",
  integrations: [sitemap()],
  build: {
    inlineStylesheets: "auto",
  },
});
