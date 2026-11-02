import { AFFILIATE_REL, amazonHref } from "../lib/amazon";
import type { Product } from "../lib/types";

export function ProductCard({ product }: { product: Product }) {
  const href = amazonHref(product.asin, product.searchQuery);
  const linkLabel = product.asin
    ? `View ${product.name} on Amazon`
    : `Amazon search placeholder for ${product.name}`;
  return (
    <article className="product-card" id={product.id}>
      <p className="todo">
        TODO for Andrew: verify this model, every spec cell, and replace the empty ASIN before
        treating the link as a recommendation.
      </p>
      <h3>{product.name}</h3>
      <p>{product.summary}</p>
      <img
        src="/images/illustrations/candidate-640.webp"
        width={640}
        height={360}
        alt="Line illustration of a generic camera and a storage card. Not a photo of this product."
        loading="lazy"
        decoding="async"
      />
      <dl className="specs">
        <dt>Subscription required</dt>
        <dd>{product.subscription}</dd>
        <dt>Local storage</dt>
        <dd>{product.localStorage}</dd>
        <dt>Resolution</dt>
        <dd>{product.resolution}</dd>
        <dt>Power</dt>
        <dd>{product.power}</dd>
        <dt>Price tier</dt>
        <dd>{product.priceTier}</dd>
      </dl>
      <p>
        <a className="button" href={href} rel={AFFILIATE_REL} target="_blank">
          {linkLabel}
          <span className="sr-only"> (affiliate link, opens in a new tab)</span>
        </a>
      </p>
      <p className="note">
        Check the claim against{" "}
        <a href={product.sourceUrl} rel="noopener noreferrer" target="_blank">
          {product.sourceLabel}
        </a>
        . Price tier is a placeholder, not a live price.
      </p>
    </article>
  );
}
