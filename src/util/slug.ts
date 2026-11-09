import { getBasePath, getFullSlugFromUrl } from "@quartz-community/utils";
import type { FullSlug } from "@quartz-community/utils";

/**
 * The slug of the page currently being viewed.
 *
 * Quartz stamps the canonical slug on `<body data-slug>`, and that is the key
 * the content index is built from. The address bar is not a substitute for it:
 * a host may normalise the case of pretty URLs (Netlify lowercases them), and
 * `location.pathname` is always percent-encoded, so a note at `Notes/Prices`
 * or one with non-ASCII characters in its slug would not be found in the index.
 * The graph then seeds its search with a node that does not exist and renders a
 * single unconnected dot.
 *
 * The URL is kept as a fallback for pages that carry no `data-slug`.
 */
export function getCurrentSlug(): FullSlug {
  const stamped = typeof document === "undefined" ? undefined : document.body?.dataset?.slug;
  if (stamped) return stamped as FullSlug;

  let slug: string = getFullSlugFromUrl();
  const base = getBasePath().replace(/^\//, "");
  if (base && slug.startsWith(base)) {
    slug = slug.slice(base.length);
    if (slug.startsWith("/")) slug = slug.slice(1);
  }
  return slug as FullSlug;
}
