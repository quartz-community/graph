import { describe, expect, it } from "vitest";
import { getCurrentGraphSlug, resolveGraphSlug } from "../src/components/scripts/currentSlug";

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

  it("uses Quartz's browser URL and base-path utilities for the fallback", () => {
    const previousWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
    const previousDocument = Object.getOwnPropertyDescriptor(globalThis, "document");

    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: { location: { pathname: "/archive/hermes/overview/" } },
    });
    Object.defineProperty(globalThis, "document", {
      configurable: true,
      value: { body: { dataset: { basepath: "/archive" } } },
    });

    try {
      expect(getCurrentGraphSlug()).toBe("hermes/overview");
    } finally {
      if (previousWindow) Object.defineProperty(globalThis, "window", previousWindow);
      else Reflect.deleteProperty(globalThis, "window");
      if (previousDocument) Object.defineProperty(globalThis, "document", previousDocument);
      else Reflect.deleteProperty(globalThis, "document");
    }
  });
});
