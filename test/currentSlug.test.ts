import { describe, expect, it } from "vitest";
import { resolveGraphSlug } from "../src/components/scripts/currentSlug";

describe("resolveGraphSlug", () => {
  it("canonicalizes a Quartz folder-page body slug to the graph index key", () => {
    expect(
      resolveGraphSlug({
        canonicalSlug: "projects/example/index",
        urlSlug: "projects/example",
        basePath: "",
      }),
    ).toBe("projects/example/");
  });

  it("preserves a trailing-slash folder URL when body metadata is unavailable", () => {
    expect(
      resolveGraphSlug({
        canonicalSlug: undefined,
        urlSlug: "projects/example/",
        basePath: "",
      }),
    ).toBe("projects/example/");
  });

  it("preserves an ordinary page slug from body metadata", () => {
    expect(
      resolveGraphSlug({
        canonicalSlug: "hermes/overview",
        urlSlug: "hermes/overview",
        basePath: "",
      }),
    ).toBe("hermes/overview");
  });

  it("preserves an ordinary page slug through the URL fallback", () => {
    expect(
      resolveGraphSlug({
        canonicalSlug: undefined,
        urlSlug: "hermes/overview",
        basePath: "",
      }),
    ).toBe("hermes/overview");
  });

  it("strips the configured base path from the URL fallback", () => {
    expect(
      resolveGraphSlug({
        canonicalSlug: undefined,
        urlSlug: "archive/projects/example/",
        basePath: "/archive",
      }),
    ).toBe("projects/example/");
  });

  it("does not strip a similar URL path segment", () => {
    expect(
      resolveGraphSlug({
        canonicalSlug: undefined,
        urlSlug: "archives/projects/example/",
        basePath: "/archive",
      }),
    ).toBe("archives/projects/example/");
  });
});
