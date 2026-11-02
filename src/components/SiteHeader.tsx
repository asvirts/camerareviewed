import { SITE_NAME, navItems } from "../lib/site";

export function SiteHeader({ current }: { current?: string }) {
  return (
    <header className="site-header">
      <div className="masthead-strip">
        <div className="wrap masthead-strip-inner">
          <span className="masthead-tag">
            <span className="masthead-dot" aria-hidden="true" />
            INDEPENDENT HARDWARE DESK · LOCAL STORAGE &amp; NO-FEE SECURITY
          </span>
          <div className="masthead-links">
            <a href="/editorial-policy/">Methodology</a>
            <span aria-hidden="true">/</span>
            <a href="/affiliate-disclosure/">Disclosure</a>
            <span aria-hidden="true">/</span>
            <a href="/author/andrew-virts/">Andrew Virts</a>
          </div>
        </div>
      </div>
      <div className="wrap header-inner">
        <a className="wordmark" href="/">
          <span className="wordmark-mark" aria-hidden="true">
            <span className="rec" />
          </span>
          <span className="wordmark-text">
            <span className="wordmark-title">{SITE_NAME}</span>
            <span className="wordmark-sub">Field Research &amp; Buying Guides</span>
          </span>
        </a>
        <div className="nav-wrap">
          <input className="nav-toggle" id="nav-toggle" type="checkbox" />
          <label className="nav-toggle-label" htmlFor="nav-toggle">
            <span className="nav-toggle-bars" aria-hidden="true" />
            Menu
          </label>
          <nav aria-label="Primary">
            <ul className="nav-list">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} aria-current={current === item.href ? "page" : undefined}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
