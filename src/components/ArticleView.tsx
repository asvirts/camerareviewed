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
  const readMinutes = Math.max(5, Math.round(article.wordCount / 220));

  return (
    <article className="article-page">
      <Breadcrumbs items={crumbs} />
      <aside className="disclosure">
        <div className="disclosure-badge">FIELD NOTICE</div>
        <p>
          <strong>Affiliate disclosure.</strong> CameraReviewed is owned by {OWNER_NAME}. If a
          button below goes to Amazon, it is an affiliate link: we may earn a commission, and you do
          not pay extra. Product cards are unverified placeholders.{" "}
          <a href="/affiliate-disclosure/">Full disclosure</a>.
        </p>
      </aside>

      <header className="article-header">
        <div className="article-kicker-row">
          <a className="kicker kicker-pill" href={category.path}>
            {category.name}
          </a>
          <span className="article-kind-badge">
            {article.kind === "roundup" ? "ROUNDUP BRIEFING" : "TECHNICAL GUIDE"}
          </span>
          <span className="article-stat-pill">
            {readMinutes} MIN READ &middot; {article.sources.length} CITED SOURCES
          </span>
        </div>

        <h1>{article.h1}</h1>
        <p className="summary">{article.summary}</p>

        <div className="byline-bar">
          <div className="byline-item">
            <span className="byline-label">PUBLISHED BY</span>
            <a href={AUTHOR_PATH}>{OWNER_NAME}</a>
          </div>
          <div className="byline-item">
            <span className="byline-label">LAST UPDATED</span>
            <time dateTime={article.updated}>{formatDate(article.updated)}</time>
          </div>
          <div className="byline-item">
            <span className="byline-label">METHODOLOGY</span>
            <a href="/editorial-policy/">Source-cited draft (No lab scores)</a>
          </div>
        </div>
      </header>

      <HeroImage id={article.slug} alt={article.heroAlt} priority />

      <div className="article-body-grid">
        <aside className="article-sidebar">
          <div className="sidebar-sticky">
            <nav className="toc" aria-label="Table of contents">
              <div className="toc-header">
                <h2>On this page</h2>
                <span className="toc-count">{toc.length} SECTIONS</span>
              </div>
              <ol>
                {toc.map((item) => (
                  <li key={item.id} className={item.depth === 3 ? "depth-3" : undefined}>
                    <a href={`#${item.id}`}>{item.text}</a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="sidebar-dossier-card">
              <p className="sidebar-dossier-title">VERIFICATION RULE</p>
              <p>
                Every hardware card on this page is marked <strong>TODO</strong> until {OWNER_NAME}{" "}
                verifies the current model and ASIN against the linked manufacturer specification
                sheet.
              </p>
              <p className="sidebar-dossier-links">
                <a href="#candidates">Jump to candidates &darr;</a>
                <a href="#sources">Primary sources ({article.sources.length}) &darr;</a>
              </p>
            </div>
          </div>
        </aside>

        <div className="article-main-col">
          <aside className="takeaways" id="takeaways">
            <div className="takeaways-header">
              <span className="takeaways-code">EXECUTIVE BRIEFING</span>
              <h2>Key takeaways</h2>
            </div>
            <ul>
              {article.takeaways.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>

          <div className="prose" dangerouslySetInnerHTML={{ __html: article.html }} />

          <section className="article-section" id="comparison">
            <div className="section-heading-bar">
              <span className="section-code">SECTION // MATRIX</span>
              <h2>Comparison table</h2>
            </div>
            <ComparisonTable caption={article.comparisonCaption} rows={article.comparison} />
            <p className="note">
              Price tiers are labels for Andrew to replace with current prices. They are not quotes.
              Resolution cells say &ldquo;verify&rdquo; unless a cited manufacturer page states a
              number for that exact model.
            </p>
          </section>

          <section className="article-section" id="candidates">
            <div className="section-heading-bar">
              <span className="section-code">SECTION // HARDWARE CANDIDATES</span>
              <h2>Models to verify</h2>
            </div>
            <div className="product-list">
              {article.products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </section>

          <section className="faq article-section" id="faq">
            <div className="section-heading-bar">
              <span className="section-code">SECTION // COMMON QUESTIONS</span>
              <h2>Questions people ask</h2>
            </div>
            <div className="faq-list">
              {article.faqs.map((faq) => (
                <details key={faq.q}>
                  <summary>{faq.q}</summary>
                  <div className="faq-answer">
                    <p>{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </section>

          <section className="article-section" id="sources">
            <div className="section-heading-bar">
              <span className="section-code">SECTION // BIBLIOGRAPHY &amp; PRIMARY DOCS</span>
              <h2>Sources</h2>
            </div>
            <ol className="source-list">
              {article.sources.map((source, idx) => (
                <li key={source.url}>
                  <span className="source-num">[{String(idx + 1).padStart(2, "0")}]</span>
                  <div className="source-content">
                    <span className="source-publisher">{source.publisher}</span>
                    <a href={source.url} rel="noopener noreferrer" target="_blank">
                      {source.title}
                    </a>
                  </div>
                </li>
              ))}
            </ol>
            <p className="note">
              Pages change. If a cited page disagrees with this draft, the cited page wins until
              Andrew updates the guide. See <a href="/editorial-policy/">how we choose</a>.
            </p>
          </section>

          <section className="article-section" id="related">
            <div className="section-heading-bar">
              <span className="section-code">SECTION // FURTHER READING</span>
              <h2>Related guides</h2>
            </div>
            <div className="card-grid">
              {related.map((item, idx) => (
                <a className="guide-card" key={item.path} href={item.path}>
                  <div className="guide-card-top">
                    <span className="guide-card-index">
                      {String(idx + 1).padStart(2, "0")} //{" "}
                      {item.kind === "roundup" ? "ROUNDUP" : "FIELD GUIDE"}
                    </span>
                  </div>
                  <h3>{item.h1}</h3>
                  <p className="guide-card-summary">{item.summary}</p>
                  <div className="guide-card-footer">
                    <span className="guide-card-cta" aria-hidden="true">
                      Read briefing &rarr;
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
