import { Breadcrumbs } from "../../src/components/Breadcrumbs";
import { HeroImage } from "../../src/components/HeroImage";
import { CONTACT_EMAIL, SITE_UPDATED } from "../../src/lib/site";
import { formatDate } from "../../src/lib/dates";
import type { Props } from "./index.server";

export default function AboutPage({ seo }: Props) {
  return (
    <div className="desk-page">
      <Breadcrumbs items={seo.crumbs} />
      <header className="desk-header">
        <div className="category-kicker-row">
          <p className="kicker kicker-pill">The Desk</p>
          <span className="article-stat-pill">
            UPDATED <time dateTime={SITE_UPDATED}>{formatDate(SITE_UPDATED)}</time>
          </span>
        </div>
        <h1>{seo.h1}</h1>
        <nav className="desk-subnav" aria-label="Desk pages">
          <a href="/about/" aria-current="page">
            About
          </a>
          <a href="/editorial-policy/">How we choose</a>
          <a href="/author/andrew-virts/">Andrew Virts</a>
          <a href="/affiliate-disclosure/">Affiliate disclosure</a>
          <a href="/privacy/">Privacy</a>
          <a href="/contact/">Contact</a>
        </nav>
      </header>
      <HeroImage
        id="about"
        alt="Illustration of a desk lamp and a notebook. Not a portrait."
        priority
      />
      <div className="prose desk-prose">
        <p>
          CameraReviewed is an independent site about home security cameras and video doorbells.
          Andrew Virts owns it. The bias is practical: a lot of people want to see the front door
          without adding another monthly bill, and the product pages that rank for that question are
          often the same brands&rsquo; own stores.
        </p>
        <p>
          This first version is a research desk, not a test lab. Guides summarize public
          manufacturer pages, regulator guidance, and the decisions a buyer has to make before the
          spec sheet is worth reading. Where a model is named, the card says TODO until Andrew
          checks that the current hardware still matches the citation.
        </p>
        <h2>What the site will not pretend</h2>
        <ul>
          <li>
            We do not publish star ratings, lab charts, or claims that a product was tried here.
          </li>
          <li>
            We do not sell installer appointments, and we do not write &ldquo;near me&rdquo; lead
            pages.
          </li>
          <li>We do not teach people how to hide a camera from someone who shares the house.</li>
        </ul>
        <h2>How the pages fit together</h2>
        <p>
          The <a href="/no-subscription/">no-subscription</a> hub is the center. Outdoor, indoor,
          and doorbell hubs hang off it. Individual guides link back to the hub and to each other
          when the question overlaps, such as a wired doorbell that still needs Wi-Fi for the app.
        </p>
        <p>
          Read <a href="/editorial-policy/">how we choose</a>, the{" "}
          <a href="/author/andrew-virts/">publisher bio</a>, and the{" "}
          <a href="/affiliate-disclosure/">affiliate disclosure</a> before you treat a link as
          advice. Corrections go to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </div>
    </div>
  );
}
