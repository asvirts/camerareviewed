import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { defineConfig, loadEnv, type Plugin } from "vite";
import { voidPlugin } from "void";
import { voidReact } from "@void/react/plugin";
import { publicDefine } from "./config/defines";
import { absoluteUrl } from "./src/lib/site";
import {
  feedXml,
  indexableUrls,
  sitemapXml,
  staticRedirectLines,
  writeSeoFiles,
} from "./src/lib/feeds";

function htmlPath(dist: string, urlPath: string): string | null {
  if (urlPath === "/") {
    const index = path.join(dist, "index.html");
    return existsSync(index) ? index : null;
  }
  const bare = urlPath.replace(/^\//, "").replace(/\/$/, "");
  const flat = path.join(dist, `${bare}.html`);
  const nested = path.join(dist, bare, "index.html");
  if (existsSync(flat)) return flat;
  if (existsSync(nested)) return nested;
  return null;
}

function verifyStaticOutput(dist: string): void {
  const pages = indexableUrls();
  const failures: string[] = [];
  for (const page of pages) {
    const file = htmlPath(dist, page.path);
    if (!file) {
      failures.push(`missing HTML for ${page.path}`);
      continue;
    }
    const html = readFileSync(file, "utf8");
    if (!html.includes('lang="en-US"')) failures.push(`${page.path} missing lang=en-US`);
    const h1s = html.match(/<h1[\s>]/g) ?? [];
    if (h1s.length !== 1) failures.push(`${page.path} has ${h1s.length} h1 tags`);
    const canonical = absoluteUrl(page.path);
    if (!html.includes(`rel="canonical" href="${canonical}"`)) {
      failures.push(`${page.path} missing canonical ${canonical}`);
    }
    if (/we tested|our testing|hands-on test|in our lab/i.test(html)) {
      failures.push(`${page.path} contains a fabricated test claim`);
    }
    if (/"@type":"Product"|"@type":"Review"|"@type":"AggregateRating"/.test(html)) {
      failures.push(`${page.path} contains rating schema`);
    }
    const isArticle =
      page.path !== "/" && !html.includes("Category</p>") && html.includes("Affiliate disclosure.");
    if (isArticle) {
      const disclosure = html.indexOf("Affiliate disclosure.");
      const h1 = html.indexOf("<h1");
      if (disclosure === -1 || disclosure > h1)
        failures.push(`${page.path} disclosure is not above the h1`);
      if (!html.includes("BlogPosting")) failures.push(`${page.path} missing BlogPosting`);
      if (!html.includes('rel="sponsored nofollow noopener"')) {
        failures.push(`${page.path} missing sponsored affiliate rel`);
      }
    }
  }
  const notFound = htmlPath(dist, "/404/");
  if (!notFound) failures.push("missing 404 page");
  else if (!readFileSync(notFound, "utf8").includes("noindex")) failures.push("404 is indexable");
  if (!existsSync(path.join(dist, "sitemap.xml"))) failures.push("missing sitemap.xml");
  if (!existsSync(path.join(dist, "robots.txt"))) failures.push("missing robots.txt");
  if (!existsSync(path.join(dist, "feed.xml"))) failures.push("missing feed.xml");
  if (failures.length > 0) {
    throw new Error(`Static SEO check failed:\n- ${failures.join("\n- ")}`);
  }
}

function seoFilesPlugin(): Plugin {
  return {
    name: "camerareviewed-seo-files",
    buildStart() {
      writeSeoFiles();
    },
    configureServer() {
      writeSeoFiles();
    },
    buildApp: {
      order: "post",
      async handler() {
        const dist = path.resolve("dist/client");
        if (!existsSync(path.join(dist, "index.html"))) return;
        mkdirSync(dist, { recursive: true });
        writeFileSync(path.join(dist, "sitemap.xml"), sitemapXml());
        writeFileSync(path.join(dist, "feed.xml"), feedXml());
        writeFileSync(path.join(dist, "_redirects"), staticRedirectLines());
        verifyStaticOutput(dist);
        const assets = path.resolve(".cloudflare/output/v0/workers/default/assets");
        if (existsSync(assets)) {
          cpSync(dist, assets, { recursive: true });
        }
      },
    },
  };
}

export default defineConfig(({ mode }) => ({
  define: publicDefine(loadEnv(mode, process.cwd(), "")),
  plugins: [
    seoFilesPlugin(),
    ...(mode === "test" ? [] : [voidPlugin(), voidReact({ react: { compiler: true } })]),
  ],
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
  },
}));
