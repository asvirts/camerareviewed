/** Site-wide constants. Article prose lives in content/, not here. */

export const SITE_NAME = "CameraReviewed";
export const SITE_ORIGIN = "https://camerareviewed.com";
export const SITE_UPDATED = "2026-11-02";
export const CONTACT_EMAIL = "hello@camerareviewed.com";
export const OWNER_NAME = "Andrew Virts";
export const AUTHOR_PATH = "/author/andrew-virts/";

export const TITLE_LIMIT = 60;
export const DESCRIPTION_LIMIT = 155;

export type Crumb = {
  name: string;
  path: string;
};

export type StaticPage = {
  id: string;
  path: string;
  /** Title before the brand suffix. The rendered <title> must stay within 60 characters. */
  title: string;
  description: string;
  h1: string;
  crumbs: Crumb[];
};

export const staticPages: StaticPage[] = [
  {
    id: "home",
    path: "/",
    title: "Home Security Cameras, No Monthly Fee",
    description:
      "Independent buying guides for home security cameras and video doorbells, focused on gear that can record without a monthly cloud plan.",
    h1: "Security cameras that can record without a monthly fee",
    crumbs: [{ name: "Home", path: "/" }],
  },
  {
    id: "articles",
    path: "/articles/",
    title: "Security Camera Guides",
    description:
      "Every CameraReviewed guide: no-subscription cameras, outdoor kits, Wi-Fi-free recording, Ring plans, and wired doorbell installation.",
    h1: "Security camera and doorbell guides",
    crumbs: [
      { name: "Home", path: "/" },
      { name: "Guides", path: "/articles/" },
    ],
  },
  {
    id: "about",
    path: "/about/",
    title: "About this site",
    description:
      "CameraReviewed is Andrew Virts’s independent site about home security cameras and video doorbells, with a bias toward no-monthly-fee recording.",
    h1: "About CameraReviewed",
    crumbs: [
      { name: "Home", path: "/" },
      { name: "About", path: "/about/" },
    ],
  },
  {
    id: "editorial-policy",
    path: "/editorial-policy/",
    title: "How We Choose Cameras",
    description:
      "How CameraReviewed picks topics, reads spec sheets, handles affiliate links, and corrects mistakes. We do not publish hands-on scores we did not earn.",
    h1: "How we choose what to publish",
    crumbs: [
      { name: "Home", path: "/" },
      { name: "How we choose", path: "/editorial-policy/" },
    ],
  },
  {
    id: "author",
    path: AUTHOR_PATH,
    title: "Andrew Virts, Publisher",
    description:
      "Andrew Virts publishes CameraReviewed. This bio is a placeholder he can edit. The site does not claim lab tests that have not been done.",
    h1: "Andrew Virts",
    crumbs: [
      { name: "Home", path: "/" },
      { name: "About", path: "/about/" },
      { name: "Andrew Virts", path: AUTHOR_PATH },
    ],
  },
  {
    id: "affiliate-disclosure",
    path: "/affiliate-disclosure/",
    title: "Affiliate Disclosure",
    description:
      "CameraReviewed may earn a commission on Amazon affiliate links. Links are labeled, open in a new tab, and never change the price you pay.",
    h1: "Affiliate disclosure",
    crumbs: [
      { name: "Home", path: "/" },
      { name: "Affiliate disclosure", path: "/affiliate-disclosure/" },
    ],
  },
  {
    id: "privacy",
    path: "/privacy/",
    title: "Privacy Policy",
    description:
      "What CameraReviewed collects, how Amazon affiliate links use cookies, and how to ask Andrew Virts about a privacy question.",
    h1: "Privacy policy",
    crumbs: [
      { name: "Home", path: "/" },
      { name: "Privacy policy", path: "/privacy/" },
    ],
  },
  {
    id: "contact",
    path: "/contact/",
    title: "Contact the publisher",
    description:
      "How to send a correction, a tip, or a privacy request to Andrew Virts at CameraReviewed. The mailbox is hello@camerareviewed.com.",
    h1: "Contact",
    crumbs: [
      { name: "Home", path: "/" },
      { name: "Contact", path: "/contact/" },
    ],
  },
];

export const navItems: { href: string; label: string }[] = [
  { href: "/articles/", label: "Guides" },
  { href: "/outdoor-cameras/", label: "Outdoor" },
  { href: "/indoor-cameras/", label: "Indoor" },
  { href: "/video-doorbells/", label: "Doorbells" },
  { href: "/no-subscription/", label: "No monthly fee" },
];

export function canonicalPath(path: string): string {
  if (path === "/" || path === "") return "/";
  const withLead = path.startsWith("/") ? path : `/${path}`;
  const noQuery = withLead.split("?")[0]?.split("#")[0] ?? "/";
  return noQuery.endsWith("/") ? noQuery : `${noQuery}/`;
}

export function absoluteUrl(path: string): string {
  const canonical = canonicalPath(path);
  return canonical === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${canonical}`;
}

export function pageTitle(unbranded: string): string {
  const branded = `${unbranded} | ${SITE_NAME}`;
  if (branded.length <= TITLE_LIMIT) return branded;
  if (unbranded.length <= TITLE_LIMIT) return unbranded;
  throw new Error(`Title exceeds ${TITLE_LIMIT} characters (${unbranded.length}): ${unbranded}`);
}

export function assertDescription(description: string, label: string): void {
  if (description.length > DESCRIPTION_LIMIT) {
    throw new Error(
      `${label} description is ${description.length} characters; limit is ${DESCRIPTION_LIMIT}.`,
    );
  }
  if (description.length < 70) {
    throw new Error(
      `${label} description is only ${description.length} characters; write a specific summary.`,
    );
  }
}

export function staticPageById(id: string): StaticPage {
  const page = staticPages.find((entry) => entry.id === id);
  if (!page) throw new Error(`Unknown static page: ${id}`);
  return page;
}
