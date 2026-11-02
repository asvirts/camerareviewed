import { Breadcrumbs } from "../../../src/components/Breadcrumbs";
import { HeroImage } from "../../../src/components/HeroImage";
import { formatDate } from "../../../src/lib/dates";
import { CONTACT_EMAIL, SITE_UPDATED } from "../../../src/lib/site";
import type { Props } from "./index.server";

export default function AuthorPage({ seo }: Props) {
  return (
    <div className="desk-page">
      <Breadcrumbs items={seo.crumbs} />
      <header className="desk-header">
        <div className="category-kicker-row">
          <p className="kicker kicker-pill">Publisher</p>
          <span className="article-stat-pill">
            BIO UPDATED <time dateTime={SITE_UPDATED}>{formatDate(SITE_UPDATED)}</time>
          </span>
        </div>
        <h1>{seo.h1}</h1>
        <nav className="desk-subnav" aria-label="Desk pages">
          <a href="/about/">About</a>
          <a href="/editorial-policy/">How we choose</a>
          <a href="/author/andrew-virts/" aria-current="page">
            Andrew Virts
          </a>
          <a href="/affiliate-disclosure/">Affiliate disclosure</a>
          <a href="/privacy/">Privacy</a>
          <a href="/contact/">Contact</a>
        </nav>
      </header>
      <HeroImage
        id="author"
        alt="Illustration of a nameplate and a pencil. Not a photograph of Andrew Virts."
        priority
      />
      <div className="prose desk-prose">
        <p className="todo">
          <strong>Editorial placeholder:</strong> Placeholder bio. Andrew: replace this page with
          your own words. Do not leave a fictional r&eacute;sum&eacute; here. The file is
          pages/author/andrew-virts/index.island.tsx.
        </p>
        <p>
          Andrew Virts publishes CameraReviewed. This biography does not list years as an installer,
          a lab, or a certification, because he has not written those claims. Until he does, the
          honest description is that he owns the site and is responsible for what it says.
        </p>
        <h2>What the byline means right now</h2>
        <p>
          A guide with his name on it is a research draft. It should show its sources, a visible
          updated date, and a disclosure if it contains affiliate links. It should not read as if a
          reviewer lived with the camera for a month.
        </p>
        <h2>What he is accountable for</h2>
        <ul>
          <li>Choosing which questions the site answers.</li>
          <li>Replacing TODO product cards before they are treated as recommendations.</li>
          <li>Correcting a page when a cited source changes.</li>
          <li>Keeping the affiliate relationship visible.</li>
        </ul>
        <h2>How to reach him</h2>
        <p>
          Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Use the subject
          &ldquo;correction&rdquo; and include the page URL. The{" "}
          <a href="/contact/">contact page</a> explains what to send. The{" "}
          <a href="/editorial-policy/">editorial policy</a> explains what the site will and will not
          claim.
        </p>
      </div>
    </div>
  );
}
