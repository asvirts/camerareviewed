import { Breadcrumbs } from "../../src/components/Breadcrumbs";
import { formatDate } from "../../src/lib/dates";
import { CONTACT_EMAIL, SITE_UPDATED } from "../../src/lib/site";
import type { Props } from "./index.server";

export default function ContactPage({ seo }: Props) {
  return (
    <>
      <Breadcrumbs items={seo.crumbs} />
      <h1>{seo.h1}</h1>
      <p className="byline">
        Updated <time dateTime={SITE_UPDATED}>{formatDate(SITE_UPDATED)}</time>
      </p>
      <div className="prose">
        <p>
          Email is the contact path. There is no form, because a form that cannot deliver mail is
          worse than a visible address.
        </p>
        <p>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
        <p className="todo">
          TODO for Andrew: create this mailbox, or change CONTACT_EMAIL in src/lib/site.ts to an
          address you actually read, before you send the site to search engines.
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
    </>
  );
}
