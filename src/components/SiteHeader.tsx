import { SITE_NAME, navItems } from "../lib/site";

export function SiteHeader({ current }: { current?: string }) {
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <a className="wordmark" href="/">
          <span className="rec" aria-hidden="true" />
          {SITE_NAME}
        </a>
        <div>
          <input className="nav-toggle" id="nav-toggle" type="checkbox" />
          <label className="nav-toggle-label" htmlFor="nav-toggle">
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
