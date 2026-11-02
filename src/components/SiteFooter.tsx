import { CONTACT_EMAIL, OWNER_NAME, SITE_NAME, SITE_UPDATED, navItems } from "../lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-wordmark">
              <span className="rec" aria-hidden="true" />
              <h2>{SITE_NAME}</h2>
            </div>
            <p className="footer-mission">
              Independent guides to home security cameras and video doorbells, written for people
              who would rather not pay a monthly fee to look at their own footage. Owned by{" "}
              {OWNER_NAME}.
            </p>
            <div className="footer-disclosure-box">
              <p>
                <strong>Material connection notice:</strong> Some pages link to Amazon. If you buy
                through those links, we may earn a commission at no extra cost to you.{" "}
                <a href="/affiliate-disclosure/">Read the affiliate disclosure</a>.
              </p>
            </div>
          </div>
          <div className="footer-col">
            <h2>Topic hubs</h2>
            <ul className="footer-links">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
            <h2 className="footer-subhead">Core guides</h2>
            <ul className="footer-links">
              <li>
                <a href="/security-cameras-without-subscription/">
                  Security cameras without a subscription
                </a>
              </li>
              <li>
                <a href="/outdoor-security-cameras-without-subscription/">
                  Outdoor cameras, no monthly fee
                </a>
              </li>
              <li>
                <a href="/security-cameras-without-wifi/">Cameras that work without Wi-Fi</a>
              </li>
              <li>
                <a href="/ring-subscription/">Do you need a Ring subscription?</a>
              </li>
              <li>
                <a href="/install-ring-video-doorbell/">How to install a wired Ring doorbell</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h2>The desk</h2>
            <ul className="footer-links">
              <li>
                <a href="/about/">About CameraReviewed</a>
              </li>
              <li>
                <a href="/editorial-policy/">How we choose</a>
              </li>
              <li>
                <a href="/author/andrew-virts/">Andrew Virts (Publisher)</a>
              </li>
              <li>
                <a href="/affiliate-disclosure/">Affiliate disclosure</a>
              </li>
              <li>
                <a href="/privacy/">Privacy policy</a>
              </li>
              <li>
                <a href="/contact/">Contact &amp; corrections</a>
              </li>
              <li>
                <a href="/feed.xml">RSS feed (XML)</a>
              </li>
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-colophon">
          <span>
            &copy; {SITE_UPDATED.slice(0, 4)} {SITE_NAME} &middot; Published by {OWNER_NAME}
          </span>
          <span>
            Edition rev. {SITE_UPDATED} &middot; Static HTML &middot; No fabricated lab scores
          </span>
        </div>
      </div>
    </footer>
  );
}
