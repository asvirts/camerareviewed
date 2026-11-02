# CameraReviewed

Independent guides to home security cameras and video doorbells, aimed at gear that can record without a monthly fee. The site is a Void app (pages mode, static prerender) built with Vite+. It deploys to Cloudflare with `void deploy`. Andrew Virts owns it.

## Requirements

- Node.js 24.22+ or 26.12+ (Void 1.5 refuses older Node).
- The `vp` CLI from Vite+. Install it once:

```sh
curl -fsSL https://vite.plus | bash
```

Open a new shell, or run `. "$HOME/.config/vite-plus/env"`, then `vp --version`.

## Commands

From the repo root:

```sh
vp install     # dependencies (pnpm via Vite+)
vp dev         # http://127.0.0.1:5173
vp check       # format and lint
vp test        # title length, word count, schema, redirects
vp build       # prerender dist/client
```

`vp build` is Vite+’s build, not `npm run build`. After a build, `node scripts/serve-static.mjs` serves `dist/client` on port 4321 with Brotli and the production headers.

Void’s codegen runs on `postinstall` (`void prepare`). If types in `.void/` are missing, run `vp exec void prepare`.

## Amazon tag and other public build values

Links are baked into the HTML. Set them in the environment that runs `vp build` or `void deploy`. A shell variable wins over `.env`.

```sh
# .env  (this is the only dotenv filename Void allows)
AMAZON_TAG=
GOOGLE_SITE_VERIFICATION=
BING_SITE_VERIFICATION=
CF_WEB_ANALYTICS_TOKEN=
```

`AMAZON_TAG` is your Amazon Associates tag, for example `camerareviewed-20`. Leave it empty and product links still open Amazon, without `?tag=`. Do not use `void secret put` for this. A fully static site does not read Worker secrets at request time.

Do not add `.env.example` or `.env.local`. Void 1.5 stops if any dotenv file other than `.env` is present.

`GOOGLE_SITE_VERIFICATION` and `BING_SITE_VERIFICATION` are the token values only (the `content` of the meta tag). `CF_WEB_ANALYTICS_TOKEN` stays empty until launch. Turning analytics on also means editing the Content-Security-Policy in `void.config.ts` so `script-src` allows `https://static.cloudflareinsights.com` and `connect-src` allows `https://cloudflareinsights.com`.

## Add an article

1. Create `content/articles/<slug>.md`. Copy frontmatter from an existing guide. Required fields include `slug`, `h1`, `title` (brand suffix is added when it still fits in 60 characters), `description` (70–155 characters), `summary`, `published`, `updated`, `primaryKeyword` (must appear in the H1), `kind` (`roundup` or `guide`), `categories`, `related`, `takeaways`, `products`, `comparison`, `comparisonCaption`, `faqs`, `sources`, and `heroAlt`.
2. The body starts after the closing `---`. Use `##` and `###` only. The template owns the H1. Guides must stay at or above 1,500 words. Do not write “we tested” or “we installed”.
3. `products[].asin` stays `""` until you have verified the model. The card shows a TODO and uses an Amazon search URL.
4. Point `related` and `categories` at slugs that exist (`content/categories/`).
5. Run `node scripts/generate-images.mjs` so `public/images/hero/<slug>-*.avif|webp` and `public/images/og/<slug>.jpg` exist.
6. `vp test` and `vp build`. The new URL is `/<slug>/`.

Category hubs are `content/categories/<slug>.md`. The nav list is `navItems` in `src/lib/site.ts`.

The backlog is `CONTENT_PLAN.md`. How each SEO rule is implemented is `SEO_CHECKLIST.md`. What is unfinished is `PROGRESS.md`.

## Deploy to your Cloudflare account

This repo was initialized with deployment skipped, so your machine must connect the project once. Do this from a checkout that has Node 24.22+ or 26.12+ and a browser for the login.

1. `vp install`
2. Create `.env` if you want a tag or verification tokens in the HTML you are about to publish.
3. Connect the CLI to your Cloudflare account:

```sh
vp exec void connect --platform cloudflare
```

Void opens a browser, asks which account to use, and saves the choice.

4. Deploy:

```sh
vp exec void deploy --platform cloudflare
```

The first successful deploy prints the `workers.dev` URL. Later deploys are `vp exec void deploy` (or `void` on your PATH via `./node_modules/.bin`). The command builds, then uploads. Because pages are prerendered and there is no API, database, or cron, Void treats this as a static site. `void.config.ts` sets the Worker name to `camerareviewed` and `compatibility_date` to `2026-11-02`.

5. Put `camerareviewed.com` on the same Cloudflare account as a zone. If the registrar is somewhere else, change the domain’s nameservers to the ones Cloudflare shows for that zone.
6. Attach the hostnames. Wildcard hostnames are not supported; add each one:

```sh
vp exec void domain add camerareviewed.com
vp exec void domain add www.camerareviewed.com
vp exec void domain status camerareviewed.com
vp exec void domain list
```

On a direct Cloudflare deploy, `void domain add` writes a custom-domain route and syncs that route. Cloudflare creates the DNS record and the certificate when the zone is on the account. `void domain status` tells you whether the route is in `void.config.ts`. Certificate state is in the Cloudflare dashboard, not in that command. If the first deploy times out while DNS is still moving, check the hostname in the dashboard and run `void deploy` again once `https://camerareviewed.com/__void/ready` answers.

7. `void.config.ts` already 301s `https://www.camerareviewed.com/*` to `https://camerareviewed.com/:splat`. The www hostname has to be added before that rule does anything. HTTP is redirected to HTTPS with a 308 (`routing.alwaysUseHttps`).
8. Trailing slashes: canonicals are `https://camerareviewed.com/page/`. `assets.html_handling` is `force-trailing-slash`, so Cloudflare serves `page.html` at `/page/` and redirects `/page` to `/page/`. That built-in redirect is a 307. `/page.html` is a separate 301 to `/page/` from `redirectRules()` in `src/lib/feeds.ts`. Do not add a `public/_redirects` line from `/page` to `/page/`. It loops with Void’s own slash handling and `vp build` fails prerender.

## After the domain answers

1. Google Search Console: add the domain property, choose the HTML tag method, put only the token in `GOOGLE_SITE_VERIFICATION`, rebuild and deploy, then confirm. Submit `https://camerareviewed.com/sitemap.xml`.
2. Bing Webmaster Tools: same idea with `BING_SITE_VERIFICATION` (the `msvalidate.01` content value). Submit the same sitemap.
3. Cloudflare dashboard → Web Analytics → add the site, copy the beacon token into `CF_WEB_ANALYTICS_TOKEN`, update the CSP as described above, rebuild, and deploy. Check Lighthouse again after the beacon is on; a third-party script can move the performance score.
4. Create the mailbox in `CONTACT_EMAIL` (`src/lib/site.ts`, currently `hello@camerareviewed.com`) or change it before you send the site to search engines.
5. Replace the placeholder bio on `/author/andrew-virts/` with your own words. Do not invent a lab or years as an installer.
6. Product cards are TODO until you verify the model, the spec cells, and the ASIN.

`SEO_CHECKLIST.md` records the Lighthouse run from the first build. Run it again if you change CSS, images, or the template.
