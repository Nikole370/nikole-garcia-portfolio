/**
 * Basic content-integrity tests. Run with `npm test`
 * (uses Node's built-in test runner with TypeScript type stripping).
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

import { projects } from "../src/data/projects.ts";
import { capabilities } from "../src/data/capabilities.ts";

test("every project has the required case-study fields", () => {
  for (const p of projects) {
    for (const field of [
      "slug",
      "title",
      "tagline",
      "authorship",
      "role",
      "context",
      "problem",
    ] as const) {
      assert.ok(
        typeof p[field] === "string" && p[field].trim().length > 0,
        `${p.slug}: missing ${field}`,
      );
    }
    assert.ok(p.process.length >= 3, `${p.slug}: process too short`);
    assert.ok(p.decisions.length >= 2, `${p.slug}: needs key decisions`);
    assert.ok(p.results.length >= 2, `${p.slug}: needs results`);
    assert.ok(p.limitations.length >= 2, `${p.slug}: needs limitations`);
    assert.ok(p.stack.length >= 3, `${p.slug}: needs a stack`);
    assert.ok(p.links.length >= 1, `${p.slug}: needs links`);
    assert.ok(p.cover.src.startsWith("/images/"), `${p.slug}: bad cover path`);
    assert.ok(p.cover.alt.length > 10, `${p.slug}: cover alt text too short`);
  }
});

test("project slugs are unique and URL-safe", () => {
  const slugs = projects.map((p) => p.slug);
  assert.equal(new Set(slugs).size, slugs.length, "duplicate slugs");
  for (const slug of slugs) {
    assert.match(slug, /^[a-z0-9-]+$/, `slug not URL-safe: ${slug}`);
  }
});

test("all link hrefs are https or mailto (no broken schemes, no http)", () => {
  for (const p of projects) {
    for (const link of p.links) {
      assert.ok(
        link.href.startsWith("https://") || link.href.startsWith("mailto:"),
        `${p.slug}: suspicious link ${link.href}`,
      );
    }
  }
});

test("capability groups have items and evidence", () => {
  assert.equal(capabilities.length, 3);
  for (const g of capabilities) {
    assert.ok(g.items.length >= 3, `${g.title}: too few items`);
    assert.ok(g.evidence.length > 10, `${g.title}: missing evidence line`);
  }
});

test("no lorem ipsum or unresolved TODO markers in page source", () => {
  const walk = (dir: string): string[] =>
    readdirSync(dir).flatMap((name) => {
      const full = join(dir, name);
      return statSync(full).isDirectory() ? walk(full) : [full];
    });

  const files = walk("src").filter((f) => /\.(astro|ts|css)$/.test(f));
  for (const file of files) {
    const content = readFileSync(file, "utf8").toLowerCase();
    assert.ok(!content.includes("lorem ipsum"), `lorem ipsum in ${file}`);
    // TODOs are allowed only in the central config, where they mark
    // documented pending inputs (CV, video, domain).
    if (!file.includes("config")) {
      assert.ok(!content.includes("todo:"), `unresolved TODO in ${file}`);
    }
  }
});
