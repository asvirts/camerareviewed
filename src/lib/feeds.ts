import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { assertIsoDate, rfc822 } from "./dates";
import { parseArticle, parseCategory } from "./parse";
import { SITE_NAME, SITE_ORIGIN, SITE_UPDATED, absoluteUrl, staticPages } from "./site";
import { escapeXml } from "./text";
import type { Article, Category } from "./types";

function readDir(dir: string): { file: string; raw: string }[] {
  return readdirSync(dir)
    .filter((name) => name.endsWith(".md"))
    .sort()
    .map((name) => ({
      file: name,
      raw: readFileSync(join(dir, name), "utf8"),
    }));
}

export function readArticlesFromDisk(root = process.cwd()): Article[] {
  const dir = join(root, "content", "articles");
  return readDir(dir).map((entry) => parseArticle(entry.raw, entry.file));
}

export function readCategoriesFromDisk(root = process.cwd()): Category[] {
  const dir = join(root, "content", "categories");
  return readDir(dir).map((entry) => parseCategory(entry.raw, entry.file));
}

export type Indexable = {
  path: string;
  lastmod: string;
};

export function indexableUrls(root = process.cwd()): Indexable[] {
  const articles = readArticlesFromDisk(root);
  const categories = readCategoriesFromDisk(root);
  const pages: Indexable[] = [
    ...staticPages.map((page) => ({ path: page.path, lastmod: SITE_UPDATED })),
    ...categories.map((category) => ({ path: category.path, lastmod: SITE_UPDATED })),
    ...articles.map((article) => ({ path: article.path, lastmod: article.updated })),
  ];
  const seen = new Set<string>();
  for (const page of pages) {
    assertIsoDate(page.lastmod, page.path);
    if (seen.has(page.path)) throw new Error(`Duplicate canonical path: ${page.path}`);
    seen.add(page.path);
  }
  return pages.sort((a, b) => a.path.localeCompare(b.path));
}

export function sitemapXml(root = process.cwd()): string {
  const urls = indexableUrls(root)
    .map(
      (page) =>
        `  <url><loc>${escapeXml(absoluteUrl(page.path))}</loc><lastmod>${page.lastmod}</lastmod></url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export function feedXml(root = process.cwd()): string {
  const articles = readArticlesFromDisk(root).sort((a, b) => (a.updated < b.updated ? 1 : -1));
  const latest = articles[0]?.updated ?? SITE_UPDATED;
  const items = articles
    .map((article) => {
      const link = absoluteUrl(article.path);
      return `    <item>
      <title>${escapeXml(article.h1)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <pubDate>${rfc822(article.updated)}</pubDate>
      <description>${escapeXml(article.description)}</description>
    </item>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${escapeXml(`${SITE_ORIGIN}/`)}</link>
    <description>Home security camera and video doorbell guides, with a bias toward recording without a monthly fee.</description>
    <language>en-US</language>
    <lastBuildDate>${rfc822(latest)}</lastBuildDate>
${items}
  </channel>
</rss>
`;
}

/** 301s for slashless, .html, and index.html duplicates of each canonical URL. */
export function staticRedirectLines(root = process.cwd()): string {
  const lines = ["# Generated from content. Trailing-slash canonicals.", "/index.html / 301"];
  for (const page of indexableUrls(root)) {
    if (page.path === "/") continue;
    const bare = page.path.slice(0, -1);
    lines.push(`${bare} ${page.path} 301`);
    lines.push(`${bare}.html ${page.path} 301`);
    lines.push(`${page.path}index.html ${page.path} 301`);
  }
  lines.push("/author /author/andrew-virts/ 301");
  lines.push("/author/ /author/andrew-virts/ 301");
  lines.push("/author/index.html /author/andrew-virts/ 301");
  return `${lines.join("\n")}\n`;
}

export function writeSeoFiles(root = process.cwd()): void {
  const publicDir = join(root, "public");
  writeFileSync(join(publicDir, "sitemap.xml"), sitemapXml(root));
  writeFileSync(join(publicDir, "feed.xml"), feedXml(root));
}

/**
 * 301s that do not target the live slashless route. Redirecting `/about` to
 * `/about/` makes prerender loop, because Void also 301s a trailing slash back
 * to the route. Cloudflare `assets.html_handling: force-trailing-slash` is what
 * publishes `/about/` and redirects `/about` (Cloudflare's status for that
 * feature is 307). These rules cover the `.html` duplicates and the www host.
 */
export function redirectRules(root = process.cwd()): Record<string, { to: string; status: 301 }> {
  const rules: Record<string, { to: string; status: 301 }> = {
    "/index.html": { to: "/", status: 301 },
    "/author": { to: "/author/andrew-virts/", status: 301 },
    "/author/": { to: "/author/andrew-virts/", status: 301 },
    "/author/index.html": { to: "/author/andrew-virts/", status: 301 },
    "https://www.camerareviewed.com/": { to: "https://camerareviewed.com/", status: 301 },
    "https://www.camerareviewed.com/*": { to: "https://camerareviewed.com/:splat", status: 301 },
  };
  for (const page of indexableUrls(root)) {
    if (page.path === "/") continue;
    const bare = page.path.slice(0, -1);
    rules[`${bare}.html`] = { to: page.path, status: 301 };
    rules[`${page.path}index.html`] = { to: page.path, status: 301 };
  }
  return rules;
}
