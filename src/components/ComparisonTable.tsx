import type { ComparisonRow } from "../lib/types";

export function ComparisonTable({ caption, rows }: { caption: string; rows: ComparisonRow[] }) {
  return (
    <div className="table-card">
      <div className="table-header-bar">
        <span className="table-header-code">
          SPECIFICATION MATRIX // COMPARE STORAGE &amp; POWER
        </span>
        <span className="table-header-hint">Scroll horizontally on narrow screens &rarr;</span>
      </div>
      <div className="table-scroll" tabIndex={0} role="region" aria-label={caption}>
        <table>
          <caption>{caption}</caption>
          <thead>
            <tr>
              <th scope="col">Model or plan</th>
              <th scope="col">Subscription required</th>
              <th scope="col">Local storage</th>
              <th scope="col">Resolution</th>
              <th scope="col">Power</th>
              <th scope="col">Price tier</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name}>
                <th scope="row">{row.name}</th>
                <td>{row.subscription}</td>
                <td>{row.localStorage}</td>
                <td>{row.resolution}</td>
                <td>{row.power}</td>
                <td className="cell-price">{row.priceTier}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
