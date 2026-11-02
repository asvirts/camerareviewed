import { formatDate } from "../lib/dates";
import type { ArticleCard } from "../lib/types";

export function GuideList({ articles }: { articles: ArticleCard[] }) {
  if (articles.length === 0) {
    return <p>No guides in this category yet. The editorial plan lists what comes next.</p>;
  }
  return (
    <div className="card-grid">
      {articles.map((article) => (
        <a className="guide-card" key={article.path} href={article.path}>
          <p className="kicker">
            Updated <time dateTime={article.updated}>{formatDate(article.updated)}</time>
          </p>
          <h3>{article.h1}</h3>
          <p>{article.summary}</p>
        </a>
      ))}
    </div>
  );
}
