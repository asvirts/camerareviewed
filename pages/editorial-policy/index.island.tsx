import { Breadcrumbs } from "../../src/components/Breadcrumbs";
import { formatDate } from "../../src/lib/dates";
import { CONTACT_EMAIL, SITE_UPDATED } from "../../src/lib/site";
import type { Props } from "./index.server";

export default function EditorialPage({ seo }: Props) {
  return (
    <div className="desk-page">
      <Breadcrumbs items={seo.crumbs} />
      <header className="desk-header">
        <div className="category-kicker-row">
          <p className="kicker kicker-pill">Editorial Standards</p>
          <span className="article-stat-pill">
            UPDATED <time dateTime={SITE_UPDATED}>{formatDate(SITE_UPDATED)}</time>
          </span>
        </div>
        <h1>{seo.h1}</h1>
        <nav className="desk-subnav" aria-label="Desk pages">
          <a href="/about/">About</a>
          <a href="/editorial-policy/" aria-current="page">
            How we choose
          </a>
          <a href="/author/andrew-virts/">Andrew Virts</a>
          <a href="/affiliate-disclosure/">Affiliate disclosure</a>
          <a href="/privacy/">Privacy</a>
          <a href="/contact/">Contact</a>
        </nav>
      </header>
      <div className="prose desk-prose">
        <p>
          CameraReviewed publishes buying guides. Readers should be able to see how a page was made,
          what it refuses to claim, and how to get a mistake fixed. This page is that explanation.
          It is not a promise that every future article will be a laboratory review.
        </p>
        <h2>Topics</h2>
        <p>
          The first topic list comes from a Google Keyword Planner export saved with the project. We
          favored buyer-intent phrases, especially &ldquo;without a subscription,&rdquo; &ldquo;no
          monthly fee,&rdquo; and long-tail questions about a single brand&rsquo;s plan. We skipped
          local-service queries such as &ldquo;near me&rdquo; and installer leads. High-volume head
          terms are pillars. Lower-competition variants are the backlog in CONTENT_PLAN.md.
        </p>
        <h2>What a draft is allowed to say</h2>
        <ul>
          <li>It can explain a decision: local card, hub, NVR, or cloud.</li>
          <li>It can quote a manufacturer&rsquo;s current public page and link to it.</li>
          <li>It can name a product family as a candidate and mark it TODO.</li>
          <li>
            It cannot invent a hands-on result, a star score, or a price we did not read that day.
          </li>
        </ul>
        <h2>Product cards</h2>
        <p>
          A card is a placeholder until Andrew replaces the empty ASIN, rechecks the spec cells, and
          removes the TODO banner. Until then the Amazon button is a search link, not a claim that a
          particular listing is the right one. Affiliate links use{" "}
          <code>rel=&quot;sponsored nofollow noopener&quot;</code> and open in a new tab. The
          disclosure sits above the headline on every guide.
        </p>
        <h2>Updates and corrections</h2>
        <p>
          Each guide shows an updated date. That date changes when the page changes, not on a timer.
          Plan prices and firmware notes go stale. If you spot a conflict with a cited page, email{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> with the URL and the source. The
          cited page wins until the guide is edited.
        </p>
        <h2>What we will not cover</h2>
        <p>
          We do not publish instructions for concealing a camera from a roommate, partner, employee,
          or guest. Household cameras raise consent and local-law questions that a buying guide
          cannot settle. We also do not sell installation leads.
        </p>
        <p>
          The publisher bio is <a href="/author/andrew-virts/">Andrew Virts</a>. He can replace the
          placeholder text when he wants the byline to say something more specific about his own
          experience.
        </p>
      </div>
    </div>
  );
}
