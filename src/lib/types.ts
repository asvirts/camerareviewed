import type { Heading } from "./markdown";
import type { Crumb } from "./site";

export type Source = {
  title: string;
  url: string;
  publisher: string;
};

export type Faq = {
  q: string;
  a: string;
};

export type Product = {
  id: string;
  name: string;
  summary: string;
  subscription: string;
  localStorage: string;
  resolution: string;
  power: string;
  priceTier: string;
  asin: string;
  searchQuery: string;
  sourceUrl: string;
  sourceLabel: string;
};

export type ComparisonRow = {
  name: string;
  subscription: string;
  localStorage: string;
  resolution: string;
  power: string;
  priceTier: string;
};

export type ArticleKind = "roundup" | "guide";

export type Article = {
  slug: string;
  h1: string;
  title: string;
  description: string;
  summary: string;
  published: string;
  updated: string;
  primaryKeyword: string;
  kind: ArticleKind;
  categories: string[];
  related: string[];
  takeaways: string[];
  products: Product[];
  comparison: ComparisonRow[];
  comparisonCaption: string;
  faqs: Faq[];
  sources: Source[];
  heroAlt: string;
  body: string;
  html: string;
  headings: Heading[];
  path: string;
  wordCount: number;
};

export type ArticleCard = {
  slug: string;
  h1: string;
  title: string;
  description: string;
  summary: string;
  path: string;
  updated: string;
  kind: ArticleKind;
  categories: string[];
};

export type Category = {
  slug: string;
  name: string;
  nav: string;
  title: string;
  description: string;
  h1: string;
  primaryKeyword: string;
  body: string;
  html: string;
  path: string;
  wordCount: number;
};

export type SeoMeta = {
  path: string;
  title: string;
  description: string;
  h1: string;
  ogType: "website" | "article";
  imageId: string;
  imageAlt: string;
  preloadHero: boolean;
  noindex: boolean;
  published?: string;
  updated?: string;
  crumbs: Crumb[];
  jsonLd: Record<string, unknown>;
};
