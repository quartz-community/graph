import { simplifySlug } from "@quartz-community/utils";

export interface GraphSlugInput {
  canonicalSlug?: string;
  urlSlug: string;
  basePath: string;
}

export function resolveGraphSlug({ canonicalSlug, urlSlug, basePath }: GraphSlugInput): string {
  let slug = canonicalSlug || urlSlug;

  if (!canonicalSlug) {
    const base = basePath.replace(/^\//, "").replace(/\/$/, "");
    if (base && (slug === base || slug.startsWith(`${base}/`))) {
      slug = slug.slice(base.length);
      if (slug.startsWith("/")) slug = slug.slice(1);
    }
  }

  const simplified = simplifySlug(slug);
  return simplified === "" ? "index" : simplified;
}
