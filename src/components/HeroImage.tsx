import { HERO_SIZES } from "../lib/seo";

export function HeroImage({
  id,
  alt,
  priority = false,
}: {
  id: string;
  alt: string;
  priority?: boolean;
}) {
  const base = `/images/hero/${id}`;
  return (
    <figure className="hero-frame">
      <picture>
        <source
          type="image/avif"
          srcSet={`${base}-640.avif 640w, ${base}-1280.avif 1280w`}
          sizes={HERO_SIZES}
        />
        <source
          type="image/webp"
          srcSet={`${base}-640.webp 640w, ${base}-1280.webp 1280w`}
          sizes={HERO_SIZES}
        />
        <img
          src={`${base}-1280.webp`}
          width={1280}
          height={720}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
        />
      </picture>
    </figure>
  );
}
