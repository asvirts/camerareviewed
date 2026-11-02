import { Breadcrumbs } from "../src/components/Breadcrumbs";
import type { Props } from "./404.server";

export default function NotFoundPage({ seo }: Props) {
  return (
    <div className="desk-page not-found-page">
      <Breadcrumbs items={seo.crumbs} />
      <header className="desk-header">
        <div className="category-kicker-row">
          <p className="kicker kicker-pill">HTTP 404 // ROUTE NOT FOUND</p>
        </div>
        <h1>{seo.h1}</h1>
        <p className="lede">
          The address does not match a guide. Nothing was moved in secret; this first edition is
          small.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="/articles/">
            Browse the guides &rarr;
          </a>
          <a className="button button-secondary" href="/">
            Go back home
          </a>
        </div>
      </header>
    </div>
  );
}
