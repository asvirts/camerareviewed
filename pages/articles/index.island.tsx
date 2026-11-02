import { Breadcrumbs } from "../../src/components/Breadcrumbs";
import { GuideList } from "../../src/components/GuideList";
import { HeroImage } from "../../src/components/HeroImage";
import { navItems } from "../../src/lib/site";
import type { Props } from "./index.server";

export default function ArticlesPage({ seo, articles }: Props) {
  const hubItems = navItems.filter((item) => item.href !== "/articles/");
  return (
    <div className="articles-index-page">
      <Breadcrumbs items={seo.crumbs} />
      <header className="category-header">
        <div className="category-kicker-row">
          <p className="kicker kicker-pill">Index</p>
          <span className="article-stat-pill">
            {articles.length} PUBLISHED BRIEFINGS &middot; RESEARCH DRAFTS
          </span>
        </div>
        <h1>{seo.h1}</h1>
        <p className="lede">
          Five drafts are live. Each one answers a buying or setup question, links to the pages it
          depends on, and marks product names Andrew still has to verify. Start with the
          subscription guide if you are choosing hardware. Start with the Ring pages if you already
          own a doorbell.
        </p>
        <nav className="category-switcher" aria-label="Filter by topic hub">
          <span className="category-switcher-label">TOPIC HUBS:</span>
          {hubItems.map((item) => (
            <a key={item.href} href={item.href} className="category-switch-pill">
              {item.label}
            </a>
          ))}
        </nav>
      </header>
      <HeroImage
        id="articles"
        alt="Illustration of a stack of notes and a small camera. Not a product photo."
        priority
      />
      <section className="article-section">
        <div className="section-heading-bar">
          <span className="section-code">COMPLETE ARCHIVE // 01&ndash;05</span>
          <h2>Published guides</h2>
        </div>
        <GuideList articles={articles} />
      </section>
    </div>
  );
}
