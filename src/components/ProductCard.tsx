import { AFFILIATE_REL, amazonHref } from "../lib/amazon";
import type { Product } from "../lib/types";

export function ProductCard({ product, index }: { product: Product; index?: number }) {
  const href = amazonHref(product.asin, product.searchQuery);
  const linkLabel = product.asin
    ? `View ${product.name} on Amazon`
    : `Amazon search placeholder for ${product.name}`;
  const badgeNumber = typeof index === "number" ? String(index + 1).padStart(2, "0") : "CANDIDATE";

  return (
    <article className="product-card" id={product.id}>
      <div className="product-card-banner">
        <span className="product-card-code">CANDIDATE DOSSIER // {badgeNumber}</span>
        <span className="product-card-status">
          {product.asin ? "ASIN VERIFIED" : "PENDING ASIN VERIFICATION"}
        </span>
      </div>
      <div className="product-card-inner">
        <p className="todo">
          <strong>Field verification notice:</strong> TODO for Andrew: verify this model, every spec
          cell, and replace the empty ASIN before treating the link as a recommendation.
        </p>
        <h3>{product.name}</h3>
        <p className="product-summary">{product.summary}</p>
        <div className="product-body-grid">
          <div className="product-visual-col">
            <picture>
              <source type="image/avif" srcSet="/images/illustrations/candidate-640.avif" />
              <img
                src="/images/illustrations/candidate-640.webp"
                width={640}
                height={360}
                alt="Line illustration of a generic camera and a storage card. Not a photo of this product."
                loading="lazy"
                decoding="async"
              />
            </picture>
          </div>
          <div className="product-specs-col">
            <div className="specs-header">SPECIFICATION CHECKLIST</div>
            <dl className="specs">
              <div className="spec-row">
                <dt>Subscription required</dt>
                <dd>{product.subscription}</dd>
              </div>
              <div className="spec-row">
                <dt>Local storage</dt>
                <dd>{product.localStorage}</dd>
              </div>
              <div className="spec-row">
                <dt>Resolution</dt>
                <dd>{product.resolution}</dd>
              </div>
              <div className="spec-row">
                <dt>Power</dt>
                <dd>{product.power}</dd>
              </div>
              <div className="spec-row">
                <dt>Price tier</dt>
                <dd>{product.priceTier}</dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="product-card-actions">
          <a className="button" href={href} rel={AFFILIATE_REL} target="_blank">
            <span>{linkLabel}</span>
            <span className="button-arrow" aria-hidden="true">
              &#8599;
            </span>
            <span className="sr-only"> (affiliate link, opens in a new tab)</span>
          </a>
          <p className="note product-source-note">
            Primary citation:{" "}
            <a href={product.sourceUrl} rel="noopener noreferrer" target="_blank">
              {product.sourceLabel}
            </a>
            . Price tier is a placeholder, not a live price.
          </p>
        </div>
      </div>
    </article>
  );
}
