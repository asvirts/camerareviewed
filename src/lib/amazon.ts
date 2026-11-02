import { publicEnv } from "./public-env";

/** One Amazon Associates tag for the whole site. Empty until Andrew sets AMAZON_TAG. */
export function amazonTag(): string {
  return publicEnv.amazonTag.trim();
}

export function amazonHref(asin: string, searchQuery: string): string {
  const tag = amazonTag();
  const url =
    asin.length > 0
      ? new URL(`https://www.amazon.com/dp/${asin}`)
      : new URL("https://www.amazon.com/s");
  if (asin.length === 0) url.searchParams.set("k", searchQuery);
  if (tag.length > 0) url.searchParams.set("tag", tag);
  return url.toString();
}

export const AFFILIATE_REL = "sponsored nofollow noopener";
