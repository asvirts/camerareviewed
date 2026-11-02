import { Breadcrumbs } from "../../src/components/Breadcrumbs";
import { formatDate } from "../../src/lib/dates";
import { CONTACT_EMAIL, SITE_UPDATED } from "../../src/lib/site";
import type { Props } from "./index.server";

export default function ContactPage({ seo }: Props) {
  return (
    <div className="desk-page">
      <Breadcrumbs items={seo.crumbs} />
      <header className="desk-header">
        <div className="category-kicker-row">
          <p className="kicker kicker-pill">Corrections &amp; Mail</p>
          <span className="article-stat-pill">
            UPDATED <time dateTime={SITE_UPDATED}>{formatDate(SITE_UPDATED)}</time>
          </span>
        </div>
        <h1>{seo.h1}</h1>
        <nav className="desk-subnav" aria-label="Desk pages">
          <a href="/about/">About</a>
          <a href="/editorial-policy/">How we choose</a>
          <a href="/author/andrew-virts/">Andrew Virts</a>
          <a href="/affiliate-disclosure/">Affiliate disclosure</a>
          <a href="/privacy/">Privacy</a>
          <a href="/contact/" aria-current="page">
            Contact
          </a>
        </nav>
      </header>
      <div className="prose desk-prose">
        <p>
          Email is the contact path. There is no form, because a form that cannot deliver mail is
          worse than a visible address.
        </p>
        <p className="contact-mail-callout">
          <span className="contact-mail-label">DIRECT DESK MAILBOX</span>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
        <p className="todo">
          <strong>Setup reminder:</strong> TODO for Andrew: create this mailbox, or change
          CONTACT_EMAIL in src/lib/site.ts to an address you actually read, before you send the site
          to search engines.
        </p>
        <h2>A useful correction</h2>
        <ul>
          <li>The page URL.</li>
          <li>The sentence that is wrong.</li>
          <li>The manufacturer or regulator page that disagrees with it.</li>
        </ul>
        <h2>What we cannot do by email</h2>
        <p>
          We do not book installers, unlock a camera account, or recover Ring footage. Those
          requests belong with the company that sold the device. We also do not accept payment to
          change a product card.
        </p>
      </div>
    </div>
  );
}
