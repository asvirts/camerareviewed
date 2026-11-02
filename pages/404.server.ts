import { defineHandler, defineHead, type InferProps } from "void";
import { buildHead } from "../src/lib/seo";
import { pageTitle } from "../src/lib/site";
import type { SeoMeta } from "../src/lib/types";

const seo: SeoMeta = {
  path: "/404/",
  title: pageTitle("Page not found"),
  description:
    "That URL is not a CameraReviewed guide. Use the guide index or the category hubs to find a page.",
  h1: "That page is not on CameraReviewed",
  ogType: "website",
  imageId: "home",
  imageAlt: "CameraReviewed illustration.",
  preloadHero: false,
  noindex: true,
  crumbs: [
    { name: "Home", path: "/" },
    { name: "Not found", path: "/404/" },
  ],
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Page not found",
    url: "https://camerareviewed.com/404/",
  },
};

export const loader = defineHandler(() => ({ seo }));

export type Props = InferProps<typeof loader>;

export const head = defineHead<Props>((_c, props) => buildHead(props.seo));
