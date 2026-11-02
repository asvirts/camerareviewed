import { formatDate } from "../lib/dates";
import type { ArticleCard } from "../lib/types";

const categoryLabel: Record<string, string> = {
  "no-subscription": "No Monthly Fee",
  "outdoor-cameras": "Outdoor",
  "indoor-cameras": "Indoor",
  "video-doorbells": "Doorbells",
};

export function GuideList({ articles }: { articles: ArticleCard[] }) {
  if (articles.length === 0) {
    return (
      <div className="empty-guide-state">
        <p className="empty-guide-code">STATUS // PENDING EDITORIAL DRAFT</p>
        <p>No guides in this category yet. The editorial plan lists what comes next.</p>
      </div>
    );
  }
  return (
    <div className="card-grid">
      {articles.map((article, index) => (
        <a className="guide-card" key={article.path} href={article.path}>
          <div className="guide-card-top">
            <span className="guide-card-index">
              {String(index + 1).padStart(2, "0")} //{" "}
              {article.kind === "roundup" ? "ROUNDUP" : "FIELD GUIDE"}
            </span>
            <span className="guide-card-date">
              Updated <time dateTime={article.updated}>{formatDate(article.updated)}</time>
            </span>
          </div>
          <h3>{article.h1}</h3>
          <p className="guide-card-summary">{article.summary}</p>
          <div className="guide-card-footer">
            <div className="guide-card-tags">
              {article.categories.map((cat) => (
                <span className="guide-tag" key={cat}>
                  {categoryLabel[cat] ?? cat}
                </span>
              ))}
            </div>
            <span className="guide-card-cta" aria-hidden="true">
              Read briefing &rarr;
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}
