import { afterEach, describe, expect, it } from "vitest";

import { getCurrentSlug } from "../src/util/slug";

function stubPage(dataset: Record<string, string>, pathname: string) {
  (globalThis as unknown as { document: unknown }).document = { body: { dataset } };
  (globalThis as unknown as { window: unknown }).window = { location: { pathname } };
}

afterEach(() => {
  delete (globalThis as Record<string, unknown>).document;
  delete (globalThis as Record<string, unknown>).window;
});

describe("getCurrentSlug", () => {
  it("uses the slug stamped on <body>, not the one implied by the URL", () => {
    // Some hosts normalise the case of pretty URLs, so the address bar and the
    // slug the content index is keyed by do not have to agree.
    stubPage({ slug: "Notes/Prices" }, "/notes/prices");

    expect(getCurrentSlug()).toBe("Notes/Prices");
  });

  it("keeps non-ASCII slugs intact even though the URL is percent-encoded", () => {
    stubPage({ slug: "Notes/Ubuntu-Über-Alles" }, "/notes/ubuntu-%C3%9Cber-alles");

    expect(getCurrentSlug()).toBe("Notes/Ubuntu-Über-Alles");
  });

  it("treats an empty data-slug as missing and falls back to the URL", () => {
    stubPage({ slug: "" }, "/features/Callouts");

    expect(getCurrentSlug()).toBe("features/Callouts");
  });

  it("falls back to the URL when <body> carries no slug", () => {
    stubPage({}, "/features/Callouts");

    expect(getCurrentSlug()).toBe("features/Callouts");
  });

  it("strips the base path from the URL fallback", () => {
    stubPage({ basepath: "/repository" }, "/repository/features/Callouts");

    expect(getCurrentSlug()).toBe("features/Callouts");
  });
});
