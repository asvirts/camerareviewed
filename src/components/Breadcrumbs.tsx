import type { Crumb } from "../lib/site";

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={item.path}>
              {last ? (
                <span aria-current="page">{item.name}</span>
              ) : (
                <a href={item.path}>{item.name}</a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
