import { Breadcrumbs } from "../../src/components/Breadcrumbs";
import { formatDate } from "../../src/lib/dates";
import { OWNER_NAME, SITE_UPDATED } from "../../src/lib/site";
import type { Props } from "./index.server";

export default function DisclosurePage({ seo }: Props) {
  return (
    <div className="desk-page">
      <Breadcrumbs items={seo.crumbs} />
      <header className="desk-header">
        <div className="category-kicker-row">
          <p className="kicker kicker-pill">FTC &amp; Associates Notice</p>
          <span className="article-stat-pill">
            UPDATED <time dateTime={SITE_UPDATED}>{formatDate(SITE_UPDATED)}</time>
          </span>
        </div>
        <h1>{seo.h1}</h1>
        <nav className="desk-subnav" aria-label="Desk pages">
          <a href="/about/">About</a>
          <a href="/editorial-policy/">How we choose</a>
          <a href="/author/andrew-virts/">Andrew Virts</a>
          <a href="/affiliate-disclosure/" aria-current="page">
            Affiliate disclosure
          </a>
          <a href="/privacy/">Privacy</a>
          <a href="/contact/">Contact</a>
        </nav>
      </header>
      <div className="prose desk-prose">
        <p>
          {OWNER_NAME} owns CameraReviewed. Some links to Amazon are affiliate links. If you buy
          through one, Amazon may pay this site a commission. You do not pay a higher price because
          of that. The relationship is a material connection, which is why it is stated in words and
          not only in a footer icon.
        </p>
        <h2>How the links are marked</h2>
        <ul>
          <li>Guides show a disclosure box above the headline, before any product button.</li>
          <li>
            Amazon links use <code>rel=&quot;sponsored nofollow noopener&quot;</code> and open in a
            new tab.
          </li>
          <li>
            The Associates tag comes from the AMAZON_TAG value baked in at build time. If that value
            is empty, the link still goes to Amazon and does not add a tag.
          </li>
        </ul>
        <h2>What a link is not</h2>
        <p>
          A product card in this first version is a placeholder. The yellow TODO line means Andrew
          has not verified the model, the spec cells, or the ASIN. A search link is not a
          recommendation of a specific listing. Prices on Amazon change. We do not control them.
        </p>
        <p>
          The Federal Trade Commission&rsquo;s endorsement guidance is the standard we are writing
          to. Read{" "}
          <a href="https://www.ftc.gov/business-guidance/resources/ftcs-endorsement-guides-what-people-are-asking">
            FTC&rsquo;s Endorsement Guides: What People Are Asking
          </a>{" "}
          and{" "}
          <a href="https://www.ftc.gov/business-guidance/resources/disclosures-101-social-media-influencers">
            Disclosures 101 for Social Media Influencers
          </a>
          . Amazon&rsquo;s Associates Program Operating Agreement has its own rules; Andrew should
          keep the site inside them before the tag goes live.
        </p>
      </div>
    </div>
  );
}
