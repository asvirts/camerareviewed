import { ArticleView } from "../src/components/ArticleView";
import { Breadcrumbs } from "../src/components/Breadcrumbs";
import { GuideList } from "../src/components/GuideList";
import { HeroImage } from "../src/components/HeroImage";
import { listArticles } from "../src/lib/content";
import { navItems } from "../src/lib/site";
import type { Props } from "./[slug].server";

export default function SlugPage({ page, related, category }: Props) {
  if (page.kind === "article") {
    return <ArticleView article={page.article} category={category} related={related} />;
  }
  const hubItems = navItems.filter((item) => item.href !== "/articles/");
  return (
    <div className="category-page">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: page.category.name, path: page.category.path },
        ]}
      />
      <header className="category-header">
        <div className="category-kicker-row">
          <p className="kicker">Category</p>
          <span className="article-stat-pill">
            TOPIC HUB &middot; {page.articles.length}{" "}
            {page.articles.length === 1 ? "GUIDE" : "GUIDES"}
          </span>
        </div>
        <h1>{page.category.h1}</h1>
        <p className="summary">{page.category.description}</p>
        <nav className="category-switcher" aria-label="Category hubs">
          {hubItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="category-switch-pill"
              aria-current={item.href === page.category.path ? "page" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>
      <HeroImage
        id={page.category.slug}
        alt={`${page.category.h1}. Illustration, not a product photo.`}
        priority
      />
      <div className="category-body-grid">
        <div className="prose" dangerouslySetInnerHTML={{ __html: page.category.html }} />
        <aside className="category-sidebar-card">
          <p className="sidebar-dossier-title">HOW THIS HUB WORKS</p>
          <p>
            Category hubs group buying and setup questions by hardware constraint. Every linked
            guide cites manufacturer documentation and marks specific hardware candidates{" "}
            <strong>TODO</strong> until verified.
          </p>
          <p className="sidebar-dossier-links">
            <a href="/editorial-policy/">How we choose &rarr;</a>
            <a href="/articles/">All {listArticles().length} guides &rarr;</a>
          </p>
        </aside>
      </div>
      <section className="article-section">
        <div className="section-heading-bar">
          <span className="section-code">HUB INDEX // PUBLISHED DRAFTS</span>
          <h2>Guides in this category</h2>
        </div>
        <GuideList articles={page.articles} />
      </section>
    </div>
  );
}
