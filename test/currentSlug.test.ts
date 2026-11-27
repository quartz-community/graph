import { describe, expect, it } from "vitest";
import { getCurrentGraphSlug, resolveGraphSlug } from "../src/components/scripts/currentSlug";

describe("resolveGraphSlug", () => {
  it("canonicalizes a Quartz folder-page body slug to the graph index key", () => {
    expect(
      resolveGraphSlug({
        canonicalSlug: "projects/example/index",
        urlSlug: "",
        basePath: "",
      }),
    ).toBe("projects/example/");
  });

  it("gives the home page's key for the index body slug", () => {
    expect(resolveGraphSlug({ canonicalSlug: "index", urlSlug: "", basePath: "" })).toBe("/");
  });

  it("preserves an ordinary page slug from body metadata", () => {
    expect(
      resolveGraphSlug({
        canonicalSlug: "hermes/overview",
        urlSlug: "",
        basePath: "",
      }),
    ).toBe("hermes/overview");
  });

  it("does not strip the base path from the body slug (it has none)", () => {
    // a page in a folder named like the base path
    expect(
      resolveGraphSlug({ canonicalSlug: "archive/notes", urlSlug: "", basePath: "/archive" }),
    ).toBe("archive/notes");
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
        urlSlug: "archive/notes/a",
        basePath: "/archive",
      }),
    ).toBe("notes/a");
  });

  it("gives the home page's key at the base path itself", () => {
    expect(resolveGraphSlug({ urlSlug: "archive", basePath: "/archive" })).toBe("/");
    expect(resolveGraphSlug({ urlSlug: "", basePath: "" })).toBe("/");
  });

  it("strips a nested base path", () => {
    expect(resolveGraphSlug({ urlSlug: "docs/v5/notes/a", basePath: "/docs/v5" })).toBe("notes/a");
  });

  it("strips a base path given with a trailing slash", () => {
    expect(resolveGraphSlug({ urlSlug: "archive/notes/a", basePath: "/archive/" })).toBe("notes/a");
  });

  it("does not strip a similar URL path segment", () => {
    expect(
      resolveGraphSlug({
        canonicalSlug: undefined,
        urlSlug: "archives/projects/example",
        basePath: "/archive",
      }),
    ).toBe("archives/projects/example");
  });

  // getFullSlugFromUrl drops the trailing slash of a folder URL (`/projects/example/` →
  // `projects/example`), so without a body slug a folder page doesn't find its graph node
  // (`projects/example/`). Quartz always sets the body slug, so this fallback rarely runs.
  it.fails("finds a folder page's node through the URL fallback", () => {
    expect(resolveGraphSlug({ urlSlug: "projects/example", basePath: "" })).toBe(
      "projects/example/",
    );
  });
});

describe("getCurrentGraphSlug", () => {
  function withBrowser(pathname: string, body: unknown, fn: () => void) {
    const previousWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
    const previousDocument = Object.getOwnPropertyDescriptor(globalThis, "document");
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: { location: { pathname } },
    });
    Object.defineProperty(globalThis, "document", { configurable: true, value: { body } });
    try {
      fn();
    } finally {
      if (previousWindow) Object.defineProperty(globalThis, "window", previousWindow);
      else Reflect.deleteProperty(globalThis, "window");
      if (previousDocument) Object.defineProperty(globalThis, "document", previousDocument);
      else Reflect.deleteProperty(globalThis, "document");
    }
  }

  it("uses the body slug Quartz sets", () => {
    withBrowser(
      "/archive/whatever/",
      { dataset: { slug: "notes/index", basepath: "/archive" } },
      () => expect(getCurrentGraphSlug()).toBe("notes/"),
    );
  });

  it("falls back to the URL without the base path", () => {
    withBrowser("/archive/hermes/overview/", { dataset: { basepath: "/archive" } }, () =>
      expect(getCurrentGraphSlug()).toBe("hermes/overview"),
    );
  });

  it("falls back to the URL before the body exists", () => {
    withBrowser("/hermes/overview", null, () =>
      expect(getCurrentGraphSlug()).toBe("hermes/overview"),
    );
  });
});
