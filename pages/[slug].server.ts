import { defineHandler, defineHead, type InferProps } from "void";
import { getSlugPage, primaryCategory, relatedArticles, slugParams } from "../src/lib/content";
import { articleGraph, categoryGraph } from "../src/lib/schema";
import { buildHead } from "../src/lib/seo";
import type { SeoMeta } from "../src/lib/types";

export const prerender = true;

export function getPrerenderPaths() {
  return slugParams();
}

function seoFor(slug: string): SeoMeta {
  const page = getSlugPage(slug);
  if (!page) throw new Error(`No content for /${slug}/`);
  if (page.kind === "article") {
    const category = primaryCategory(page.article);
    return {
      path: page.article.path,
      title: page.article.title,
      description: page.article.description,
      h1: page.article.h1,
      ogType: "article",
      imageId: page.article.slug,
      imageAlt: page.article.heroAlt,
      preloadHero: true,
      noindex: false,
      published: page.article.published,
      updated: page.article.updated,
      crumbs: [
        { name: "Home", path: "/" },
        { name: category.name, path: category.path },
        { name: page.article.h1, path: page.article.path },
      ],
      jsonLd: articleGraph(page.article, category.name, category.path),
    };
  }
  return {
    path: page.category.path,
    title: page.category.title,
    description: page.category.description,
    h1: page.category.h1,
    ogType: "website",
    imageId: page.category.slug,
    imageAlt: `${page.category.h1}. CameraReviewed illustration, not a product photo.`,
    preloadHero: true,
    noindex: false,
    crumbs: [
      { name: "Home", path: "/" },
      { name: page.category.name, path: page.category.path },
    ],
    jsonLd: categoryGraph(page.category),
  };
}

export const loader = defineHandler((c) => {
  const slug = c.req.param("slug");
  if (!slug) throw new Error("Missing slug");
  const page = getSlugPage(slug);
  if (!page) throw new Error(`No content for /${slug}/`);
  if (page.kind === "article") {
    return {
      page,
      related: relatedArticles(page.article),
      category: primaryCategory(page.article),
      seo: seoFor(slug),
    };
  }
  return {
    page,
    related: [],
    category: page.category,
    seo: seoFor(slug),
  };
});

export type Props = InferProps<typeof loader>;

export const head = defineHead<Props>((_c, props) => buildHead(props.seo));
