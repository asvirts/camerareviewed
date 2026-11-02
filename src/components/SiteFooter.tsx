import { CONTACT_EMAIL, SITE_NAME, navItems } from "../lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <h2>{SITE_NAME}</h2>
          <p>
            Independent guides to home security cameras and video doorbells, written for people who
            would rather not pay a monthly fee to look at their own footage. Owned by Andrew Virts.
          </p>
          <p>
            Some pages link to Amazon. If you buy through those links, we may earn a commission.{" "}
            <a href="/affiliate-disclosure/">Affiliate disclosure</a>.
          </p>
        </div>
        <div>
          <h2>Guides</h2>
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>The desk</h2>
          <ul>
            <li>
              <a href="/about/">About</a>
            </li>
            <li>
              <a href="/editorial-policy/">How we choose</a>
            </li>
            <li>
              <a href="/author/andrew-virts/">Andrew Virts</a>
            </li>
            <li>
              <a href="/contact/">Contact</a>
            </li>
            <li>
              <a href="/privacy/">Privacy</a>
            </li>
            <li>
              <a href="/feed.xml">RSS</a>
            </li>
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
