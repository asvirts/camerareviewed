import { authorGraph, homeGraph, webPageGraph } from "./schema";
import { assertDescription, pageTitle, staticPageById } from "./site";
import type { SeoMeta } from "./types";

export function staticSeo(
  id: string,
  options?: { noindex?: boolean; preloadHero?: boolean; profile?: boolean },
): SeoMeta {
  const page = staticPageById(id);
  assertDescription(page.description, id);
  const title = pageTitle(page.title);
  return {
    path: page.path,
    title,
    description: page.description,
    h1: page.h1,
    ogType: "website",
    imageId: id,
    imageAlt: `${page.h1}. CameraReviewed illustration, not a product photo.`,
    preloadHero: options?.preloadHero ?? false,
    noindex: options?.noindex ?? false,
    crumbs: page.crumbs,
    jsonLd: options?.profile
      ? authorGraph(page.description)
      : id === "home"
        ? homeGraph()
        : webPageGraph({
            path: page.path,
            name: page.h1,
            description: page.description,
            crumbs: page.crumbs,
          }),
  };
}
