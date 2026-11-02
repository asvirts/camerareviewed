import { Breadcrumbs } from "../../src/components/Breadcrumbs";
import { formatDate } from "../../src/lib/dates";
import { CONTACT_EMAIL, SITE_UPDATED } from "../../src/lib/site";
import type { Props } from "./index.server";

export default function PrivacyPage({ seo }: Props) {
  return (
    <>
      <Breadcrumbs items={seo.crumbs} />
      <h1>{seo.h1}</h1>
      <p className="byline">
        Updated <time dateTime={SITE_UPDATED}>{formatDate(SITE_UPDATED)}</time>
      </p>
      <div className="prose">
        <p>
          This policy describes the first version of camerareviewed.com. It is a plain-language
          notice, not a lawyer’s opinion. Andrew should have it reviewed before the site takes real
          traffic.
        </p>
        <h2>What this site is</h2>
        <p>
          CameraReviewed is a static site. Pages are HTML files. There is no account, no comment
          form that stores a message, and no shopping cart. You can read every guide without telling
          us your name.
        </p>
        <h2>Hosting</h2>
        <p>
          The site is meant to be hosted on Cloudflare. Cloudflare processes technical data such as
          IP address and request logs to deliver and protect the site. Their own policy describes
          that processing.
        </p>
        <h2>Analytics</h2>
        <p>
          Cloudflare Web Analytics is off until a token is set at build time. When Andrew turns it
          on, that beacon is a first-party-style measurement tool from Cloudflare. It should be
          mentioned again in this policy on the day it ships. Google Search Console and Bing
          Webmaster Tools, if Andrew verifies the site, receive search data about queries, not an
          account you create here.
        </p>
        <h2>Affiliate links</h2>
        <p>
          If you follow an Amazon link, you leave this site. Amazon may set cookies and measure that
          the visit came from CameraReviewed. That is how an affiliate commission is attributed. We
          do not receive your Amazon password or your full payment card number through that click.
        </p>
        <h2>Email</h2>
        <p>
          If you email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>, we will have
          whatever you put in the message. Use it for corrections and privacy questions. We do not
          sell that mail.
        </p>
        <h2>Children</h2>
        <p>
          The site is written for adults buying household equipment. It is not directed at children.
        </p>
      </div>
    </>
  );
}
