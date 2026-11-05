# CameraReviewed progress

Handoff for the next agent. Owner: Andrew Virts. Domain: camerareviewed.com. Stack is Void (`void` 1.5.0) + Vite+ (`vp` 1.4.0) + React, `output: 'static'`, Cloudflare via `void deploy`. Do not switch the site to Astro or Next.js. Do not open a pull request unless Andrew asks. Commit and push to `main`.

Last verified on this machine on November 5, 2026, for `/wireless-security-camera-system-without-monthly-fee/`:

- `vp check` passed (format and lint).
- `vp test`: `tests/content.test.ts`, 4 tests passed. The count assertion is seven guides.
- `vp build` exited 0 and wrote `dist/client/wireless-security-camera-system-without-monthly-fee.html` (slashless filename, trailing-slash canonical in the HTML). `dist/client/assets/islands-client-*.js` is still 0 bytes.
- `node scripts/serve-static.mjs` returned 200 for that URL with Brotli and the security headers. The home briefing, the no-subscription hub, the outdoor hub, and the related guides link to it, and those links open the new page.
- Lighthouse 12.8.2, mobile, headless Chrome, against `scripts/serve-static.mjs` on the prerendered files (Brotli, security headers). The first two rows are the November 2 run. The wireless-system row is November 5:

| Page                                                    | Performance | Accessibility | Best Practices | SEO | LCP  | CLS | TBT |
| ------------------------------------------------------- | ----------- | ------------- | -------------- | --- | ---- | --- | --- |
| `/`                                                     | 100         | 100           | 100            | 100 | 0.9s | 0   | 0ms |
| `/security-cameras-without-subscription/`               | 100         | 100           | 100            | 100 | 0.9s | 0   | 0ms |
| `/wireless-security-camera-system-without-monthly-fee/` | 100         | 100           | 100            | 100 | 1.2s | 0   | 0ms |

INP was not in the lab trace. There is no page JavaScript (`dist/client/assets/islands-client-*.js` is 0 bytes and is not referenced). The same Lighthouse rows are in `SEO_CHECKLIST.md`.

## Done

- Void app, pages mode, island pages (no client JS), `output: 'static'` in `void.config.ts`.
- React 19, `@void/react`, Vite+ (`vite` aliased to `@voidzero-dev/vite-plus-core`). `pnpm-lock.yaml` is the lockfile. `postinstall` runs `void prepare`.
- Routes, all prerendered:
  - `/` home
  - `/articles/` guide index
  - `/outdoor-cameras/`, `/indoor-cameras/`, `/video-doorbells/`, `/no-subscription/`
  - `/about/`, `/editorial-policy/`, `/author/andrew-virts/`, `/affiliate-disclosure/`, `/privacy/`, `/contact/`
  - `/404` rendered as `404.html` (`noindex`)
  - Seven guides at the root, trailing-slash canonicals:
    - `/security-cameras-without-subscription/`
    - `/outdoor-security-cameras-without-subscription/`
    - `/security-cameras-without-wifi/`
    - `/ring-subscription/`
    - `/install-ring-video-doorbell/`
    - `/best-video-doorbell-without-monthly-fee/`
    - `/wireless-security-camera-system-without-monthly-fee/`
- Articles are Markdown + YAML frontmatter in `content/articles/`. Hubs are `content/categories/*.md`. Parsed by `src/lib/parse.ts` (title ≤60, description ≤155, H1 contains the keyword, 1500+ words, H2 and H3, no “we tested” / “we installed”).
- Article template (`src/components/ArticleView.tsx`): disclosure above the H1, byline, updated date, takeaways, TOC, prose, `ComparisonTable`, `ProductCard` (TODO + empty ASIN, `rel="sponsored nofollow noopener"`, new tab), FAQ, sources, related guides.
- `vp build` treats a page as a guide only when the HTML contains `<strong>Affiliate disclosure.</strong>`. The disclosure page’s image alt also contains “Affiliate disclosure.” and is not a guide.
- JSON-LD: Organization + WebSite + Person on the home page; BlogPosting (author, datePublished, dateModified), BreadcrumbList, FAQPage on guides; ItemList on `kind: roundup` only. No Product, Review, or AggregateRating.
- `AMAZON_TAG`, `GOOGLE_SITE_VERIFICATION`, `BING_SITE_VERIFICATION`, and `CF_WEB_ANALYTICS_TOKEN` are read at build time in `config/defines.ts` and inlined. Empty tag omits `?tag=`. Void rejects any dotenv file other than `.env` (do not add `.env.example`).
- `public/robots.txt`, generated `public/sitemap.xml` and `public/feed.xml` (also rewritten into `dist/client` when the SEO plugin runs).
- Security headers and cache rules in `void.config.ts`. Hashed `/assets/*` ask for `immutable`. `worker.compatibility_date` is `2026-11-02`. Worker name `camerareviewed`. `routing.alwaysUseHttps` is on (308). `cloudflare.assets.html_handling` is `force-trailing-slash` (Cloudflare’s own redirect for `/page` → `/page/` is a 307, not a 301). `routing.notFound` is `404-page`.
- 301s that are safe during prerender: `/index.html` → `/`, `/author` and `/author/` → `/author/andrew-virts/`, `www.camerareviewed.com` → apex, and `/*.html` plus `/page/index.html` → the trailing-slash canonical. Implemented in `redirectRules()` in `src/lib/feeds.ts`.
- Hero images are AVIF + WebP at 640 and 1280 (`public/images/hero/`). OG JPEGs are `public/images/og/<id>.jpg` (1200×630). Regenerated by `node scripts/generate-images.mjs` (needs `sharp`, already a devDependency).
- `scripts/serve-static.mjs` serves `dist/client` with Brotli, the security headers, a 301 from `/page` to `/page/`, and `404.html`.

## Do not do these

- Do not put a `public/_redirects` that sends `/about` to `/about/`. Void’s worker also 301s a trailing slash back to the slashless route. Together they loop and prerender dies with `fetch failed`. That failure mode was hit and then removed.
- Do not add `.env.example`. Void 1.5 refuses to boot if any dotenv file other than `.env` exists (`void/env supports one local file: .env`).
- Do not claim hands-on tests. Product cards stay TODO until Andrew verifies the model and fills `asin`.
- Do not deploy. Andrew deploys from his own Cloudflare account.

## Docs now in the repo

- `README.md` — setup, `vp` commands, adding an article, `AMAZON_TAG`, and the Cloudflare deploy plus Search Console / Bing / Web Analytics steps.
- `CONTENT_PLAN.md` — the 20-item backlog from the Keyword Planner export.
- `SEO_CHECKLIST.md` — each acceptance criterion, the Lighthouse table, and the 307-vs-301 warning.

## Left

1. Andrew deploys from his own machine. Steps are in the README. Do not deploy from an agent. Init used `--deploy none`, so the first commands are `void connect --platform cloudflare` and `void deploy --platform cloudflare`, then `void domain add` for `camerareviewed.com` and `www.camerareviewed.com`.
2. After DNS works: Search Console and Bing tokens, submit `https://camerareviewed.com/sitemap.xml`, then Cloudflare Web Analytics (and the CSP edit in the README). The mailbox in `CONTACT_EMAIL` and the author bio are still placeholders.
3. Product cards stay TODO until Andrew verifies models and ASINs. The next unpublished article is item 3 in `CONTENT_PLAN.md` (Arlo without a subscription). Items 1 and 2 are published. Item 2 is `/wireless-security-camera-system-without-monthly-fee/`. Item 10 is folded into the doorbell guide, not a second URL. Item 12 (a single wireless outdoor camera) is still a later URL and is not the same page as the wireless system. Indoor has a hub and no article yet; that is intentional. `run1.csv` is still not in the repo.
4. `vp check` passed earlier in the session, before these docs. Re-run it after the next code edit. `pnpm exec tsc --noEmit` passes. `vp check` does not typecheck unless `lint.options.typeCheck` is enabled.
5. No pull request. Keep pushing to `main`.

## How to run

```sh
. "$HOME/.config/vite-plus/env"   # if vp is not on PATH
cd /workspace
vp install
vp dev          # http://127.0.0.1:5173
vp test
vp check
vp build
node scripts/serve-static.mjs   # http://127.0.0.1:4321 serves dist/client
```

Node for Void is 24.22+ or 26.12+. The Vite+ installer on this machine provides Node 26. The system Node 22 prints `EBADENGINE` for the Void CLI but the app still built.
