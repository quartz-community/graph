import { describe, expect, it } from "vitest";
import {
  buildGraphData,
  collectEdges,
  contentBySlug,
  neighbourhood,
  type GraphContentEntry,
} from "../src/components/scripts/graphData";

/** A content index entry as Quartz writes it (links are simple slugs, every entry has tags). */
function entry(slug: string, title: string, links: string[], tags: string[] = []) {
  return { slug, filePath: `${slug}.md`, title, links, tags, content: "" };
}

// A→B, B→C, D→A; A is tagged x. B also links to a page that doesn't exist.
const contentIndex: Record<string, GraphContentEntry> = {
  a: entry("a", "A", ["b"], ["x"]),
  b: entry("b", "B", ["c", "missing"]),
  c: entry("c", "C", []),
  d: entry("d", "D", ["a"]),
};
const data = contentBySlug(contentIndex);

const ids = (graph: ReturnType<typeof buildGraphData>) => graph.nodes.map((n) => n.id).sort();

describe("buildGraphData", () => {
  it("shows the pages one link away (either direction) at depth 1", () => {
    const graph = buildGraphData(data, "a", { depth: 1 });
    expect(ids(graph)).toEqual(["a", "b", "d"]);
    expect(graph.links).toEqual([
      { source: "a", target: "b" },
      { source: "d", target: "a" },
    ]);
  });

  it("adds the pages two links away at depth 2", () => {
    const graph = buildGraphData(data, "a", { depth: 2 });
    expect(ids(graph)).toEqual(["a", "b", "c", "d"]);
    expect(graph.links).toHaveLength(3);
  });

  it("shows only the page at depth 0", () => {
    const graph = buildGraphData(data, "c", { depth: 0 });
    expect(ids(graph)).toEqual(["c"]);
    expect(graph.links).toEqual([]);
  });

  it("shows every page and tag at depth -1 with showTags", () => {
    const graph = buildGraphData(data, "c", { depth: -1, showTags: true });
    expect(ids(graph)).toEqual(["a", "b", "c", "d", "tags/x"]);
    expect(graph.nodes.find((n) => n.id === "tags/x")).toEqual({
      id: "tags/x",
      text: "#x",
      tags: [],
    });
    expect(graph.links).toContainEqual({ source: "a", target: "tags/x" });
  });

  it("leaves out removeTags", () => {
    const graph = buildGraphData(data, "a", { depth: -1, showTags: true, removeTags: ["x"] });
    expect(ids(graph)).toEqual(["a", "b", "c", "d"]);
    expect(graph.links.some((l) => l.target.startsWith("tags/"))).toBe(false);
  });

  it("counts each node's links", () => {
    const graph = buildGraphData(data, "a", { depth: 1 });
    expect(graph.degree.get("a")).toBe(2);
    expect(graph.degree.get("b")).toBe(1);
    expect(graph.degree.get("d")).toBe(1);
    // links to nodes outside the neighbourhood (B→C) don't count
    expect(buildGraphData(data, "a", { depth: 2 }).degree.get("b")).toBe(2);
    // the tag's link does
    expect(buildGraphData(data, "a", { depth: 1, showTags: true }).degree.get("a")).toBe(3);
  });

  it("names pages by title and carries their tags", () => {
    const graph = buildGraphData(data, "a", { depth: 0 });
    expect(graph.nodes).toEqual([{ id: "a", text: "A", tags: ["x"] }]);
  });

  it("keys the home page and folder pages as links refer to them", () => {
    const site = contentBySlug({
      index: entry("index", "Home", ["notes/"]),
      "notes/index": entry("notes/index", "Notes", ["notes/a"]),
      "notes/a": entry("notes/a", "", ["/"]),
    });
    expect([...site.keys()]).toEqual(["/", "notes/", "notes/a"]);
    const graph = buildGraphData(site, "/", { depth: 1 });
    expect(graph.nodes).toEqual([
      { id: "/", text: "Home", tags: [] },
      { id: "notes/", text: "Notes", tags: [] },
      // without a title: the slug
      { id: "notes/a", text: "notes/a", tags: [] },
    ]);
  });
});

describe("collectEdges / neighbourhood", () => {
  it("drops links to pages that don't exist", () => {
    const { links, adjacency } = collectEdges(data);
    expect(links).toEqual([
      { source: "a", target: "b" },
      { source: "b", target: "c" },
      { source: "d", target: "a" },
    ]);
    expect(adjacency.get("a")).toEqual(["b", "d"]);
    expect(adjacency.has("missing")).toBe(false);
  });

  it("walks breadth-first from the page, nearest first", () => {
    const { adjacency } = collectEdges(data, { showTags: true });
    expect([...neighbourhood(adjacency, "c", 3)]).toEqual(["c", "b", "a", "tags/x", "d"]);
    expect([...neighbourhood(adjacency, "c", 1)]).toEqual(["c", "b"]);
  });
});
