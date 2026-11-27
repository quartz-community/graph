import { describe, expect, it } from "vitest";
import Graph from "../src/components/Graph";
import script from "./__mocks__/scriptMock";

/** The parsed data-cfg of the local and the global graph container. */
function configs(opts?: Parameters<typeof Graph>[0]) {
  const found: Record<string, Record<string, unknown>> = {};
  const walk = (node: unknown) => {
    if (Array.isArray(node)) return node.forEach(walk);
    if (!node || typeof node !== "object") return;
    const props = (node as { props?: Record<string, unknown> }).props ?? {};
    if (typeof props["data-cfg"] === "string") {
      found[props.class as string] = JSON.parse(props["data-cfg"] as string);
    }
    walk(props.children);
  };
  walk(Graph(opts)({ cfg: { locale: "en-US" } } as never));
  return { local: found["graph-container"]!, global: found["global-graph-container"]! };
}

describe("Graph component", () => {
  it("renders the default local and global graph settings for the script", () => {
    const { local, global } = configs();
    expect(local).toMatchObject({ depth: 1, showTags: true, removeTags: [], enableRadial: false });
    expect(global).toMatchObject({ depth: -1, focusOnHover: true, enableRadial: true });
  });

  it("merges options over each graph's defaults", () => {
    const { local, global } = configs({
      localGraph: { depth: 2, removeTags: ["x"] },
      globalGraph: { showTags: false },
    });
    expect(local).toMatchObject({ depth: 2, removeTags: ["x"], drag: true, scale: 1.1 });
    expect(global).toMatchObject({ depth: -1, showTags: false, scale: 0.9 });
  });

  it("attaches the graph script as is", () => {
    expect(Graph().afterDOMLoaded).toBe(script);
  });
});
