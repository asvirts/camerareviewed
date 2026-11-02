import { formatDate } from "../lib/dates";
import { AUTHOR_PATH, OWNER_NAME } from "../lib/site";
import type { Article, ArticleCard, Category } from "../lib/types";
import { Breadcrumbs } from "./Breadcrumbs";
import { ComparisonTable } from "./ComparisonTable";
import { HeroImage } from "./HeroImage";
import { ProductCard } from "./ProductCard";

export function ArticleView({
  article,
  category,
  related,
}: {
  article: Article;
  category: Category;
  related: ArticleCard[];
}) {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: category.name, path: category.path },
    { name: article.h1, path: article.path },
  ];
  const toc = [
    { id: "takeaways", text: "Key takeaways", depth: 2 as const },
    ...article.headings,
    { id: "comparison", text: "Comparison table", depth: 2 as const },
    { id: "candidates", text: "Models to verify", depth: 2 as const },
    { id: "faq", text: "Questions people ask", depth: 2 as const },
    { id: "sources", text: "Sources", depth: 2 as const },
    { id: "related", text: "Related guides", depth: 2 as const },
  ];
  return (
    <article>
      <Breadcrumbs items={crumbs} />
      <aside className="disclosure">
        <p>
          <strong>Affiliate disclosure.</strong> CameraReviewed is owned by {OWNER_NAME}. If a
          button below goes to Amazon, it is an affiliate link: we may earn a commission, and you do
          not pay extra. Product cards are unverified placeholders.{" "}
          <a href="/affiliate-disclosure/">Full disclosure</a>.
        </p>
      </aside>
      <p className="kicker">{category.name}</p>
      <h1>{article.h1}</h1>
      <p className="byline">
        By <a href={AUTHOR_PATH}>{OWNER_NAME}</a>
        <span aria-hidden="true"> · </span>
        <time dateTime={article.updated}>Updated {formatDate(article.updated)}</time>
      </p>
      <p className="summary">{article.summary}</p>
      <HeroImage id={article.slug} alt={article.heroAlt} priority />
      <aside className="takeaways" id="takeaways">
        <h2>Key takeaways</h2>
        <ul>
          {article.takeaways.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </aside>
      <nav className="toc" aria-label="Table of contents">
        <h2>On this page</h2>
        <ol>
          {toc.map((item) => (
            <li key={item.id} className={item.depth === 3 ? "depth-3" : undefined}>
              <a href={`#${item.id}`}>{item.text}</a>
            </li>
          ))}
        </ol>
      </nav>
      <div className="prose" dangerouslySetInnerHTML={{ __html: article.html }} />
      <section id="comparison">
        <h2>Comparison table</h2>
        <ComparisonTable caption={article.comparisonCaption} rows={article.comparison} />
        <p className="note">
          Price tiers are labels for Andrew to replace with current prices. They are not quotes.
          Resolution cells say “verify” unless a cited manufacturer page states a number for that
          exact model.
        </p>
      </section>
      <section id="candidates">
        <h2>Models to verify</h2>
        <div className="product-list">
          {article.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      <section className="faq" id="faq">
        <h2>Questions people ask</h2>
        {article.faqs.map((faq) => (
          <details key={faq.q}>
            <summary>{faq.q}</summary>
            <p>{faq.a}</p>
          </details>
        ))}
      </section>
      <section id="sources">
        <h2>Sources</h2>
        <ol className="source-list">
          {article.sources.map((source) => (
            <li key={source.url}>
              {source.publisher}:{" "}
              <a href={source.url} rel="noopener noreferrer" target="_blank">
                {source.title}
              </a>
            </li>
          ))}
        </ol>
        <p className="note">
          Pages change. If a cited page disagrees with this draft, the cited page wins until Andrew
          updates the guide. See <a href="/editorial-policy/">how we choose</a>.
        </p>
      </section>
      <section id="related">
        <h2>Related guides</h2>
        <div className="card-grid">
          {related.map((item) => (
            <a className="guide-card" key={item.path} href={item.path}>
              <p className="kicker">{item.kind === "roundup" ? "Roundup" : "Guide"}</p>
              <h3>{item.h1}</h3>
              <p>{item.summary}</p>
            </a>
          ))}
        </div>
      </section>
    </article>
  );
}
