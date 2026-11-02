import type { HeadDescriptor } from "void";
import { publicEnv } from "./public-env";
import { SITE_NAME, SITE_ORIGIN, absoluteUrl } from "./site";
import { jsonLd } from "./text";
import type { SeoMeta } from "./types";

const HERO_SIZES = "(min-width: 840px) 720px, 100vw";

export function buildHead(seo: SeoMeta): HeadDescriptor {
  const url = absoluteUrl(seo.path);
  const image = `${SITE_ORIGIN}/images/og/${seo.imageId}.jpg`;
  const meta: NonNullable<HeadDescriptor["meta"]> = [
    { name: "description", content: seo.description },
    {
      name: "robots",
      content: seo.noindex ? "noindex, follow" : "index, follow, max-image-preview:large",
    },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:locale", content: "en_US" },
    { property: "og:type", content: seo.ogType },
    { property: "og:title", content: seo.title },
    { property: "og:description", content: seo.description },
    { property: "og:url", content: url },
    { property: "og:image", content: image },
    { property: "og:image:alt", content: seo.imageAlt },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: seo.title },
    { name: "twitter:description", content: seo.description },
    { name: "twitter:image", content: image },
    { name: "twitter:image:alt", content: seo.imageAlt },
  ];
  if (seo.published) meta.push({ property: "article:published_time", content: seo.published });
  if (seo.updated) meta.push({ property: "article:modified_time", content: seo.updated });
  if (publicEnv.googleSiteVerification) {
    meta.push({ name: "google-site-verification", content: publicEnv.googleSiteVerification });
  }
  if (publicEnv.bingSiteVerification) {
    meta.push({ name: "msvalidate.01", content: publicEnv.bingSiteVerification });
  }
  const link: NonNullable<HeadDescriptor["link"]> = [{ rel: "canonical", href: url }];
  if (seo.preloadHero) {
    const base = `/images/hero/${seo.imageId}`;
    link.push({
      rel: "preload",
      href: `${base}-1280.avif`,
      as: "image",
      type: "image/avif",
      imagesrcset: `${base}-640.avif 640w, ${base}-1280.avif 1280w`,
      imagesizes: HERO_SIZES,
      fetchpriority: "high",
    });
  }
  const script: NonNullable<HeadDescriptor["script"]> = [
    { type: "application/ld+json", innerHTML: jsonLd(seo.jsonLd) },
  ];
  if (publicEnv.cfWebAnalyticsToken) {
    script.push({
      defer: "true",
      src: "https://static.cloudflareinsights.com/beacon.min.js",
      "data-cf-beacon": JSON.stringify({ token: publicEnv.cfWebAnalyticsToken }),
    });
  }
  return { title: seo.title, meta, link, script };
}

export { HERO_SIZES };
