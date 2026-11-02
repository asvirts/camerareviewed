import { parse as parseYaml } from "yaml";
import { assertIsoDate } from "./dates";
import { renderMarkdown } from "./markdown";
import { absoluteUrl, assertDescription, canonicalPath, pageTitle } from "./site";
import { countWords } from "./text";
import type { Article, ArticleKind, Category, ComparisonRow, Faq, Product, Source } from "./types";

const BANNED = [
  /we tested/i,
  /our testing/i,
  /hands-on test/i,
  /in our lab/i,
  /out of 5/i,
  /we installed/i,
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function requiredString(record: Record<string, unknown>, key: string, label: string): string {
  const value = record[key];
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${label} is missing a non-empty "${key}" string.`);
  }
  return value.trim();
}

function stringList(record: Record<string, unknown>, key: string, label: string): string[] {
  const value = record[key];
  if (
    !Array.isArray(value) ||
    value.length === 0 ||
    value.some((item) => typeof item !== "string" || item.trim() === "")
  ) {
    throw new Error(`${label} field "${key}" must be a non-empty list of strings.`);
  }
  return value.map((item) => item.trim());
}

function httpsUrl(value: string, label: string): string {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error(`${label} is not a URL: ${value}`);
  }
  if (url.protocol !== "https:") throw new Error(`${label} must use https: ${value}`);
  return url.toString();
}

function rejectBanned(text: string, label: string): void {
  for (const pattern of BANNED) {
    if (pattern.test(text)) throw new Error(`${label} contains a banned claim matching ${pattern}`);
  }
}

function splitFrontmatter(
  raw: string,
  label: string,
): { data: Record<string, unknown>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) throw new Error(`${label} needs YAML frontmatter between --- fences.`);
  const parsed: unknown = parseYaml(match[1] ?? "");
  if (!isRecord(parsed)) throw new Error(`${label} frontmatter must be a YAML mapping.`);
  return { data: parsed, body: (match[2] ?? "").trim() };
}

function sourcesOf(value: unknown, label: string): Source[] {
  if (!Array.isArray(value) || value.length < 2) {
    throw new Error(`${label} needs at least two sources.`);
  }
  return value.map((item, index) => {
    if (!isRecord(item)) throw new Error(`${label} source ${index + 1} must be a mapping.`);
    const itemLabel = `${label} source ${index + 1}`;
    return {
      title: requiredString(item, "title", itemLabel),
      url: httpsUrl(requiredString(item, "url", itemLabel), itemLabel),
      publisher: requiredString(item, "publisher", itemLabel),
    };
  });
}

function faqsOf(value: unknown, label: string): Faq[] {
  if (!Array.isArray(value) || value.length < 3) {
    throw new Error(`${label} needs at least three FAQs.`);
  }
  return value.map((item, index) => {
    if (!isRecord(item)) throw new Error(`${label} FAQ ${index + 1} must be a mapping.`);
    const itemLabel = `${label} FAQ ${index + 1}`;
    return {
      q: requiredString(item, "q", itemLabel),
      a: requiredString(item, "a", itemLabel),
    };
  });
}

function productsOf(value: unknown, label: string): Product[] {
  if (!Array.isArray(value) || value.length < 1) {
    throw new Error(`${label} needs at least one product candidate.`);
  }
  return value.map((item, index) => {
    if (!isRecord(item)) throw new Error(`${label} product ${index + 1} must be a mapping.`);
    const itemLabel = `${label} product ${index + 1}`;
    const asin = typeof item.asin === "string" ? item.asin.trim() : "";
    if (asin !== "" && !/^[A-Z0-9]{10}$/.test(asin)) {
      throw new Error(`${itemLabel} ASIN must be empty or 10 letters/digits.`);
    }
    return {
      id: requiredString(item, "id", itemLabel),
      name: requiredString(item, "name", itemLabel),
      summary: requiredString(item, "summary", itemLabel),
      subscription: requiredString(item, "subscription", itemLabel),
      localStorage: requiredString(item, "localStorage", itemLabel),
      resolution: requiredString(item, "resolution", itemLabel),
      power: requiredString(item, "power", itemLabel),
      priceTier: requiredString(item, "priceTier", itemLabel),
      asin,
      searchQuery: requiredString(item, "searchQuery", itemLabel),
      sourceUrl: httpsUrl(requiredString(item, "sourceUrl", itemLabel), itemLabel),
      sourceLabel: requiredString(item, "sourceLabel", itemLabel),
    };
  });
}

function comparisonOf(value: unknown, label: string): ComparisonRow[] {
  if (!Array.isArray(value) || value.length < 2) {
    throw new Error(`${label} needs at least two comparison rows.`);
  }
  return value.map((item, index) => {
    if (!isRecord(item)) throw new Error(`${label} comparison row ${index + 1} must be a mapping.`);
    const itemLabel = `${label} comparison row ${index + 1}`;
    return {
      name: requiredString(item, "name", itemLabel),
      subscription: requiredString(item, "subscription", itemLabel),
      localStorage: requiredString(item, "localStorage", itemLabel),
      resolution: requiredString(item, "resolution", itemLabel),
      power: requiredString(item, "power", itemLabel),
      priceTier: requiredString(item, "priceTier", itemLabel),
    };
  });
}

export function parseArticle(raw: string, label: string): Article {
  const { data, body } = splitFrontmatter(raw, label);
  const slug = requiredString(data, "slug", label);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(`${label} slug must be lowercase words separated by hyphens.`);
  }
  const h1 = requiredString(data, "h1", label);
  const title = pageTitle(requiredString(data, "title", label));
  const description = requiredString(data, "description", label);
  assertDescription(description, slug);
  const primaryKeyword = requiredString(data, "primaryKeyword", label);
  if (!h1.toLowerCase().includes(primaryKeyword.toLowerCase())) {
    throw new Error(`${slug} H1 must contain the primary keyword "${primaryKeyword}".`);
  }
  const kind = requiredString(data, "kind", label);
  if (kind !== "roundup" && kind !== "guide")
    throw new Error(`${slug} kind must be roundup or guide.`);
  const published = requiredString(data, "published", label);
  const updated = requiredString(data, "updated", label);
  assertIsoDate(published, `${slug} published`);
  assertIsoDate(updated, `${slug} updated`);
  if (updated < published) throw new Error(`${slug} updated date is before published.`);
  const takeaways = stringList(data, "takeaways", slug);
  const faqs = faqsOf(data.faqs, slug);
  const products = productsOf(data.products, slug);
  const comparison = comparisonOf(data.comparison, slug);
  const sources = sourcesOf(data.sources, slug);
  const categories = stringList(data, "categories", slug);
  const related = stringList(data, "related", slug);
  const summary = requiredString(data, "summary", label);
  const heroAlt = requiredString(data, "heroAlt", label);
  const comparisonCaption = requiredString(data, "comparisonCaption", label);
  rejectBanned(
    `${h1}\n${body}\n${summary}\n${takeaways.join("\n")}\n${faqs.map((faq) => `${faq.q} ${faq.a}`).join("\n")}`,
    slug,
  );
  if (/^#\s/m.test(body) || /\n#\s/.test(body)) {
    throw new Error(`${slug} body must not contain an H1.`);
  }
  const rendered = renderMarkdown(body);
  if (
    !rendered.headings.some((heading) => heading.depth === 2) ||
    !rendered.headings.some((heading) => heading.depth === 3)
  ) {
    throw new Error(`${slug} needs both H2 and H3 headings in the body.`);
  }
  const wordCount = countWords(
    [
      body,
      summary,
      takeaways.join(" "),
      faqs.map((faq) => `${faq.q} ${faq.a}`).join(" "),
      products.map((product) => product.summary).join(" "),
    ].join("\n"),
  );
  if (wordCount < 1500)
    throw new Error(`${slug} has ${wordCount} words; guides need at least 1500.`);
  return {
    slug,
    h1,
    title,
    description,
    summary,
    published,
    updated,
    primaryKeyword,
    kind: kind as ArticleKind,
    categories,
    related,
    takeaways,
    products,
    comparison,
    comparisonCaption,
    faqs,
    sources,
    heroAlt,
    body,
    html: rendered.html,
    headings: rendered.headings,
    path: canonicalPath(`/${slug}/`),
    wordCount,
  };
}

export function parseCategory(raw: string, label: string): Category {
  const { data, body } = splitFrontmatter(raw, label);
  const slug = requiredString(data, "slug", label);
  const h1 = requiredString(data, "h1", label);
  const primaryKeyword = requiredString(data, "primaryKeyword", label);
  if (!h1.toLowerCase().includes(primaryKeyword.toLowerCase())) {
    throw new Error(`${slug} H1 must contain the primary keyword "${primaryKeyword}".`);
  }
  const description = requiredString(data, "description", label);
  assertDescription(description, slug);
  const title = pageTitle(requiredString(data, "title", label));
  rejectBanned(body, slug);
  const rendered = renderMarkdown(body);
  const wordCount = countWords(body);
  if (wordCount < 220)
    throw new Error(
      `${slug} hub intro has ${wordCount} words; write a real category introduction.`,
    );
  return {
    slug,
    name: requiredString(data, "name", label),
    nav: requiredString(data, "nav", label),
    title,
    description,
    h1,
    primaryKeyword,
    body,
    html: rendered.html,
    path: canonicalPath(`/${slug}/`),
    wordCount,
  };
}

export function articleCanonical(article: Article): string {
  return absoluteUrl(article.path);
}
