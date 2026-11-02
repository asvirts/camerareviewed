import {
  AUTHOR_PATH,
  OWNER_NAME,
  SITE_NAME,
  SITE_ORIGIN,
  absoluteUrl,
  staticPageById,
  type Crumb,
} from "./site";
import type { Article, Category } from "./types";

function organization(): Record<string, unknown> {
  return {
    "@type": "Organization",
    "@id": `${SITE_ORIGIN}/#organization`,
    name: SITE_NAME,
    url: `${SITE_ORIGIN}/`,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_ORIGIN}/images/logo.png`,
      width: 512,
      height: 512,
    },
    founder: {
      "@type": "Person",
      name: OWNER_NAME,
      url: absoluteUrl(AUTHOR_PATH),
    },
  };
}

function person(): Record<string, unknown> {
  return {
    "@type": "Person",
    "@id": `${absoluteUrl(AUTHOR_PATH)}#person`,
    name: OWNER_NAME,
    url: absoluteUrl(AUTHOR_PATH),
    jobTitle: "Publisher",
    worksFor: { "@id": `${SITE_ORIGIN}/#organization` },
  };
}

function website(): Record<string, unknown> {
  return {
    "@type": "WebSite",
    "@id": `${SITE_ORIGIN}/#website`,
    name: SITE_NAME,
    url: `${SITE_ORIGIN}/`,
    inLanguage: "en-US",
    publisher: { "@id": `${SITE_ORIGIN}/#organization` },
  };
}

function breadcrumb(crumbs: Crumb[]): Record<string, unknown> {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function homeGraph(): Record<string, unknown> {
  const home = staticPageById("home");
  return {
    "@context": "https://schema.org",
    "@graph": [
      organization(),
      person(),
      website(),
      {
        "@type": "WebPage",
        "@id": `${SITE_ORIGIN}/#webpage`,
        url: `${SITE_ORIGIN}/`,
        name: home.h1,
        description: home.description,
        isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
        about: { "@id": `${SITE_ORIGIN}/#organization` },
        inLanguage: "en-US",
      },
    ],
  };
}

export function webPageGraph(input: {
  path: string;
  name: string;
  description: string;
  crumbs: Crumb[];
  type?: string;
}): Record<string, unknown> {
  const url = absoluteUrl(input.path);
  return {
    "@context": "https://schema.org",
    "@graph": [
      organization(),
      website(),
      {
        "@type": input.type ?? "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: input.name,
        description: input.description,
        isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
        inLanguage: "en-US",
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      { ...breadcrumb(input.crumbs), "@id": `${url}#breadcrumb` },
    ],
  };
}

export function authorGraph(description: string): Record<string, unknown> {
  const url = absoluteUrl(AUTHOR_PATH);
  const crumbs = staticPageById("author").crumbs;
  return {
    "@context": "https://schema.org",
    "@graph": [
      organization(),
      person(),
      website(),
      {
        "@type": "ProfilePage",
        "@id": `${url}#webpage`,
        url,
        name: OWNER_NAME,
        description,
        isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
        mainEntity: { "@id": `${url}#person` },
        inLanguage: "en-US",
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      { ...breadcrumb(crumbs), "@id": `${url}#breadcrumb` },
    ],
  };
}

export function articleGraph(
  article: Article,
  categoryName: string,
  categoryPath: string,
): Record<string, unknown> {
  const url = absoluteUrl(article.path);
  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: categoryName, path: categoryPath },
    { name: article.h1, path: article.path },
  ];
  const graph: Record<string, unknown>[] = [
    organization(),
    person(),
    website(),
    {
      "@type": "BlogPosting",
      "@id": `${url}#article`,
      mainEntityOfPage: url,
      headline: article.h1,
      description: article.description,
      datePublished: article.published,
      dateModified: article.updated,
      inLanguage: "en-US",
      author: { "@id": `${absoluteUrl(AUTHOR_PATH)}#person` },
      publisher: { "@id": `${SITE_ORIGIN}/#organization` },
      image: `${SITE_ORIGIN}/images/og/${article.slug}.jpg`,
      url,
      articleSection: categoryName,
      breadcrumb: { "@id": `${url}#breadcrumb` },
    },
    { ...breadcrumb(crumbs), "@id": `${url}#breadcrumb` },
    {
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: article.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      })),
    },
  ];
  if (article.kind === "roundup") {
    graph.push({
      "@type": "ItemList",
      "@id": `${url}#picks`,
      name: article.h1,
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: article.products.length,
      itemListElement: article.products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: product.name,
        description: product.summary,
        url: `${url}#${product.id}`,
      })),
    });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}

export function categoryGraph(category: Category): Record<string, unknown> {
  return webPageGraph({
    path: category.path,
    name: category.h1,
    description: category.description,
    type: "CollectionPage",
    crumbs: [
      { name: "Home", path: "/" },
      { name: category.name, path: category.path },
    ],
  });
}
