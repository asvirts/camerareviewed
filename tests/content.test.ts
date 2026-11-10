import { readFileSync } from "node:fs";
import { describe, expect, it } from "vite-plus/test";
import { amazonHref } from "../src/lib/amazon";
import { listArticles, listCategories, primaryCategory } from "../src/lib/content";
import { indexableUrls, redirectRules, staticRedirectLines } from "../src/lib/feeds";
import { articleGraph, homeGraph } from "../src/lib/schema";
import {
  DESCRIPTION_LIMIT,
  SITE_ORIGIN,
  TITLE_LIMIT,
  pageTitle,
  staticPages,
} from "../src/lib/site";
describe("search metadata", () => {
  it("keeps titles and descriptions inside the limits", () => {
    const titles = new Set<string>();
    const descriptions = new Set<string>();
    for (const page of staticPages) {
      const title = pageTitle(page.title);
      expect(title.length).toBeLessThanOrEqual(TITLE_LIMIT);
      expect(page.description.length).toBeLessThanOrEqual(DESCRIPTION_LIMIT);
      expect(page.description.length).toBeGreaterThanOrEqual(70);
      expect(titles.has(title)).toBe(false);
      expect(descriptions.has(page.description)).toBe(false);
      titles.add(title);
      descriptions.add(page.description);
    }
    for (const article of listArticles()) {
      expect(article.title.length).toBeLessThanOrEqual(TITLE_LIMIT);
      expect(article.description.length).toBeLessThanOrEqual(DESCRIPTION_LIMIT);
      expect(article.h1.toLowerCase()).toContain(article.primaryKeyword.toLowerCase());
      expect(article.wordCount).toBeGreaterThanOrEqual(1500);
      expect(titles.has(article.title)).toBe(false);
      expect(descriptions.has(article.description)).toBe(false);
      titles.add(article.title);
      descriptions.add(article.description);
    }
    for (const category of listCategories()) {
      expect(category.title.length).toBeLessThanOrEqual(TITLE_LIMIT);
      expect(category.h1.toLowerCase()).toContain(category.primaryKeyword.toLowerCase());
      expect(titles.has(category.title)).toBe(false);
      titles.add(category.title);
    }
  });

  it("publishes eight guides and four hubs with no orphan links", () => {
    expect(listArticles()).toHaveLength(8);
    expect(listCategories()).toHaveLength(4);
    const paths = new Set(indexableUrls().map((page) => page.path));
    expect(paths.has("/indoor-cameras/")).toBe(true);
    for (const article of listArticles()) {
      expect(paths.has(article.path)).toBe(true);
      const html = article.html;
      const links = [...html.matchAll(/href="(\/[^"]+)"/g)].map((match) => match[1]);
      for (const link of links) {
        const pathOnly = link.split("#")[0] ?? link;
        if (pathOnly.startsWith("/images/")) continue;
        expect(paths.has(pathOnly), `${article.slug} -> ${pathOnly}`).toBe(true);
      }
    }
  });

  it("uses 301 redirects for slashless variants and keeps schema free of ratings", () => {
    const rules = redirectRules();
    const lines = staticRedirectLines();
    for (const page of indexableUrls()) {
      if (page.path === "/") continue;
      const bare = page.path.slice(0, -1);
      expect(lines).toContain(`${bare}.html ${page.path} 301`);
    }
    expect(rules["https://www.camerareviewed.com/*"]?.status).toBe(301);
    const home = JSON.stringify(homeGraph());
    expect(home).toContain("Organization");
    expect(home).toContain("WebSite");
    expect(home).not.toContain('"Product"');
    const article = listArticles().find((entry) => entry.kind === "roundup");
    expect(article).toBeDefined();
    if (!article) return;
    const graph = JSON.stringify(
      articleGraph(article, primaryCategory(article).name, primaryCategory(article).path),
    );
    expect(graph).toContain("BlogPosting");
    expect(graph).toContain("datePublished");
    expect(graph).toContain("dateModified");
    expect(graph).toContain("BreadcrumbList");
    expect(graph).toContain("FAQPage");
    expect(graph).toContain("ItemList");
    expect(graph).not.toContain("AggregateRating");
    expect(graph).not.toContain('"@type":"Product"');
    expect(graph).not.toContain('"@type":"Review"');
  });

  it("builds affiliate links from one tag and leaves the tag off when empty", () => {
    const href = amazonHref("", "wired doorbell");
    expect(href.startsWith("https://www.amazon.com/s?")).toBe(true);
    expect(href).not.toContain("tag=");
    expect(SITE_ORIGIN).toBe("https://camerareviewed.com");
    const raw = readFileSync(new URL("../src/lib/amazon.ts", import.meta.url), "utf8");
    expect(raw).toContain("publicEnv.amazonTag");
  });
});
