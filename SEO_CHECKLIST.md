# SEO checklist

Each line is an acceptance criterion and where this repo meets it. Re-check after a content change with `vp test`, `vp build`, and Lighthouse against `node scripts/serve-static.mjs`.

## Render and speed

- **Static HTML for every page.** `void.config.ts` sets `output: 'static'`. `vp build` writes one HTML file per route under `dist/client/` (`about.html` for `/about/`). View source contains the article text. Island pages ship no component JavaScript; `dist/client/assets/islands-client-*.js` is 0 bytes and the HTML does not load it.
- **Core Web Vitals.** Mobile Lighthouse 12.8.2, local static server with Brotli. The first two rows are 2 Nov 2026. The wireless-system row is 5 Nov 2026. The Arlo row is 10 Nov 2026:

  | URL                                                     | Performance | Accessibility | Best Practices | SEO | LCP  | CLS | TBT |
  | ------------------------------------------------------- | ----------- | ------------- | -------------- | --- | ---- | --- | --- |
  | `/`                                                     | 100         | 100           | 100            | 100 | 0.9s | 0   | 0ms |
  | `/security-cameras-without-subscription/`               | 100         | 100           | 100            | 100 | 0.9s | 0   | 0ms |
  | `/wireless-security-camera-system-without-monthly-fee/` | 100         | 100           | 100            | 100 | 1.2s | 0   | 0ms |
  | `/arlo-without-subscription/`                           | 100         | 100           | 100            | 100 | 1.2s | 0   | 0ms |

  The wireless-system row is a separate mobile run on 5 Nov 2026, same Lighthouse 12.8.2 and `scripts/serve-static.mjs` setup. The first two rows are still the 2 Nov 2026 run. The Arlo row is a separate mobile run on 10 Nov 2026, same Lighthouse and server.

  Lab INP is not reported because the trace does not click. There is no hydration work. LCP is under 2.5s and CLS is under 0.1.

## Titles, headings, URLs

- **Unique title ≤ 60 and description ≤ 155**, from frontmatter for guides and hubs, from `src/lib/site.ts` for the other pages. `pageTitle()` appends ` | CameraReviewed` only when the result still fits. `tests/content.test.ts` asserts the limits and uniqueness. `vp build` runs the same parser, so a too-long description fails the build.
- **One H1 containing the primary keyword.** The template renders `h1`. Markdown may not contain a `#` heading (`parse.ts` throws). Category H1s are checked the same way.
- **H2/H3.** Guides must include both. The template adds H2s for takeaways, comparison, candidates, FAQ, sources, and related guides.
- **Trailing-slash canonicals.** Every indexable canonical is `https://camerareviewed.com/<path>/` (`absoluteUrl` in `src/lib/site.ts`). The `<link rel="canonical">` is in the prerendered head.
- **Redirects.**
  - `www.camerareviewed.com` → apex is a 301 in `redirectRules()` (`void.config.ts`).
  - `/index.html` → `/` is a 301.
  - `/author` and `/author/` → `/author/andrew-virts/` are 301s.
  - `/page.html` and `/page/index.html` → `/page/` are 301s.
  - `/page` → `/page/` is Cloudflare `assets.html_handling: force-trailing-slash`. That feature’s status is **307**, not 301. Do not “fix” it with `public/_redirects` sending `/page` to `/page/`. Void also 301s a trailing slash back to the slashless route during prerender, and the two rules loop (`fetch failed`, pages never written).
- **`lang="en-US"`** is set in `void.config.ts` `head.htmlAttrs` and is on the prerendered `<html>`.

## Schema

- Home: Organization, WebSite, and Person in one `@graph` (`homeGraph` in `src/lib/schema.ts`). No `SearchAction`.
- Guides: `BlogPosting` with author Andrew Virts, `datePublished`, `dateModified`, publisher Organization, image.
- Inner pages: `BreadcrumbList`.
- Guides with FAQs: `FAQPage`.
- `kind: roundup` only: `ItemList` of on-page anchors. No `Product`, `Review`, or `AggregateRating`. The build verifier and the unit test both reject those types.
- JSON-LD is in the initial HTML (`<script type="application/ld+json">`). `<` is escaped as `\u003c`.

## E-E-A-T, links, affiliates

- Author page `/author/andrew-virts/` is a placeholder bio Andrew can edit (`pages/author/andrew-virts/index.island.tsx`). Bylines link to it. The bio does not invent credentials.
- `/editorial-policy/` is how topics, specs, TODOs, and corrections work.
- Guides cite manufacturer pages, Ring’s plan and hardwiring docs, FTC endorsement guidance, and the 2021 CISA Reolink advisory (dated, not treated as a current vulnerability claim).
- Updated dates are visible and in the sitemap `lastmod`.
- About and contact exist. Contact is a mailto to `hello@camerareviewed.com` (set `CONTACT_EMAIL` in `src/lib/site.ts` if that mailbox is wrong). There is no form that pretends to submit.
- Topic clusters: guides link to each other and to hubs; hubs link back; footer and header list the hubs. Indoor has no article yet; the hub says so and links to the pillar.
- Affiliate links: `rel="sponsored nofollow noopener"`, `target="_blank"`, disclosure box above the H1 on every guide. Empty `AMAZON_TAG` omits the query parameter. Tag is the build-time env var in `config/defines.ts`.

## Images and technical files

- Heroes: `<picture>` AVIF then WebP, `width`/`height` 1280×720, preload on the LCP image, lazy illustration on product cards. Alt text says they are illustrations, not product photos.
- Per-page OG JPEG and Twitter `summary_large_image` (`src/lib/seo.ts`, files in `public/images/og/`).
- `public/sitemap.xml` includes `lastmod`. `public/robots.txt` points at `https://camerareviewed.com/sitemap.xml`. `public/feed.xml` is RSS 2.0. The build regenerates sitemap and feed from the articles.
- `404.html` is prerendered, served with status 404 by `scripts/serve-static.mjs` and by `routing.notFound: 404-page`. It is `noindex` and not in the sitemap.
- Security headers live in `void.config.ts` (`CSP`, `nosniff`, `Referrer-Policy`, `DENY`, `Permissions-Policy`, `COOP`, `HSTS`).
- Compression: Cloudflare compresses responses on deploy. The local check server (`scripts/serve-static.mjs`) sends Brotli when the client asks.
- Hashed `/assets/*` request `Cache-Control: public, max-age=31536000, immutable`. Void also documents that it forces that policy on fingerprinted files. HTML stays `max-age=0, must-revalidate`.
- One URL per page. Canonicals agree. The indoor hub is the only thin cluster page, and it is linked from the nav so it is not an orphan.

## Content

- The eight guides clear 1,500 words in `parse.ts` (body, summary, takeaways, FAQs, product summaries). They open with the answer, then H2s, lists, a comparison table, and sources.
- No “we tested”, “we installed”, or star scores. `parse.ts` rejects those phrases. Product names are candidates.

## Still outside the repo

- Search Console, Bing, and Cloudflare Web Analytics tokens are unset on purpose. The README says which env vars to set.
- Re-run Lighthouse after any CSS, image, or template change. The numbers above are from the first prerendered build on 2 Nov 2026 (mobile, Brotli, `scripts/serve-static.mjs`).
