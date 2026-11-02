import { parseArticle, parseCategory } from "./parse";
import type { Article, ArticleCard, Category } from "./types";

const articleModules = import.meta.glob("../../content/articles/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

const categoryModules = import.meta.glob("../../content/categories/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

function loadArticles(): Article[] {
  const articles = Object.entries(articleModules).map(([file, raw]) => parseArticle(raw, file));
  const slugs = new Set<string>();
  for (const article of articles) {
    if (slugs.has(article.slug)) throw new Error(`Duplicate article slug: ${article.slug}`);
    slugs.add(article.slug);
  }
  const categories = new Set(loadCategories().map((category) => category.slug));
  for (const article of articles) {
    for (const category of article.categories) {
      if (!categories.has(category))
        throw new Error(`${article.slug} uses unknown category ${category}`);
    }
    for (const related of article.related) {
      if (!slugs.has(related))
        throw new Error(`${article.slug} related slug does not exist: ${related}`);
      if (related === article.slug) throw new Error(`${article.slug} cannot relate to itself`);
    }
  }
  return articles.sort((a, b) => a.h1.localeCompare(b.h1));
}

function loadCategories(): Category[] {
  const categories = Object.entries(categoryModules).map(([file, raw]) => parseCategory(raw, file));
  const slugs = new Set<string>();
  for (const category of categories) {
    if (slugs.has(category.slug)) throw new Error(`Duplicate category slug: ${category.slug}`);
    slugs.add(category.slug);
  }
  return categories.sort((a, b) => a.name.localeCompare(b.name));
}

const articles = loadArticles();
const categories = loadCategories();

export function listArticles(): Article[] {
  return articles;
}

export function listCategories(): Category[] {
  return categories;
}

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

export function toCard(article: Article): ArticleCard {
  return {
    slug: article.slug,
    h1: article.h1,
    title: article.title,
    description: article.description,
    summary: article.summary,
    path: article.path,
    updated: article.updated,
    kind: article.kind,
    categories: article.categories,
  };
}

export function articlesInCategory(slug: string): ArticleCard[] {
  return articles.filter((article) => article.categories.includes(slug)).map(toCard);
}

export function relatedArticles(article: Article): ArticleCard[] {
  return article.related.map((slug) => {
    const match = getArticle(slug);
    if (!match) throw new Error(`Missing related article ${slug}`);
    return toCard(match);
  });
}

export function primaryCategory(article: Article): Category {
  const category = getCategory(article.categories[0] ?? "");
  if (!category) throw new Error(`${article.slug} has no primary category`);
  return category;
}

export type SlugPage =
  | { kind: "article"; article: Article }
  | { kind: "category"; category: Category; articles: ArticleCard[] };

export function getSlugPage(slug: string): SlugPage | null {
  const article = getArticle(slug);
  if (article) return { kind: "article", article };
  const category = getCategory(slug);
  if (category) return { kind: "category", category, articles: articlesInCategory(category.slug) };
  return null;
}

export function slugParams(): { slug: string }[] {
  return [
    ...articles.map((article) => article.slug),
    ...categories.map((category) => category.slug),
  ].map((slug) => ({ slug }));
}
