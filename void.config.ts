import { defineConfig } from "void/config";
import { redirectRules } from "./src/lib/feeds";

const securityHeaders = [
  "Content-Security-Policy: default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; img-src 'self' data:; font-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self'; connect-src 'self'; upgrade-insecure-requests",
  "X-Content-Type-Options: nosniff",
  "Referrer-Policy: strict-origin-when-cross-origin",
  "X-Frame-Options: DENY",
  "Permissions-Policy: camera=(), microphone=(), geolocation=()",
  "Cross-Origin-Opener-Policy: same-origin",
  "Strict-Transport-Security: max-age=31536000; includeSubDomains; preload",
];

export default defineConfig({
  output: "static",
  worker: {
    compatibility_date: "2026-11-02",
  },
  cloudflare: {
    name: "camerareviewed",
    observability: {
      enabled: true,
      traces: { enabled: true },
    },
    assets: {
      html_handling: "force-trailing-slash",
      not_found_handling: "404-page",
    },
  },
  head: {
    htmlAttrs: { lang: "en-US" },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#f3efe6" },
    ],
    link: [
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      {
        rel: "alternate",
        href: "https://camerareviewed.com/feed.xml",
        type: "application/rss+xml",
        title: "CameraReviewed",
      },
    ],
  },
  routing: {
    alwaysUseHttps: true,
    notFound: "404-page",
    headers: {
      "/*": [...securityHeaders, "Cache-Control: public, max-age=0, must-revalidate"],
      "/images/*": ["Cache-Control: public, max-age=604800"],
      "/favicon.svg": ["Cache-Control: public, max-age=604800"],
      "/apple-touch-icon.png": ["Cache-Control: public, max-age=604800"],
      "/assets/*": ["Cache-Control: public, max-age=31536000, immutable"],
    },
    redirects: redirectRules(),
  },
});
