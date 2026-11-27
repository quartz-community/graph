import { simplifySlug } from "@quartz-community/utils";

// The graph's nodes and links from the content index (used by the graph script, which then lays
// them out and draws them).

/** The parts of a content index entry the graph uses. */
export interface GraphContentEntry {
  title?: string;
  links?: string[];
  tags?: string[];
}

export interface GraphDataOptions {
  /** How many links away from the current page to show; negative for the whole site. */
  depth: number;
  /** Add a node per tag, linked to its pages. */
  showTags?: boolean;
  /** Tags left out of the graph (as in the content index, e.g. `x`). */
  removeTags?: string[];
}

export interface GraphEdge {
  source: string;
  target: string;
}

export interface GraphNodeData {
  /** The page's simple slug (`folder/` for a folder page), or `tags/<tag>`. */
  id: string;
  /** The page's title, or `#tag`. */
  text: string;
  tags: string[];
}

export interface GraphData {
  nodes: GraphNodeData[];
  links: GraphEdge[];
  /** Links per node (a link counts for both ends). */
  degree: Map<string, number>;
}

/** The content index keyed by simple slug (`folder/index` → `folder/`), as links refer to pages. */
export function contentBySlug<T>(dataRaw: Record<string, T>): Map<string, T> {
  const data = new Map<string, T>();
  for (const key in dataRaw) data.set(simplifySlug(key as never), dataRaw[key]!);
  return data;
}

/**
 * Every link between pages that exist (and, with `showTags`, from each page to its tags except
 * `removeTags`), the neighbours of each node, and the tag nodes.
 */
export function collectEdges(
  data: Map<string, GraphContentEntry>,
  { showTags = false, removeTags = [] }: Omit<GraphDataOptions, "depth"> = {},
): { links: GraphEdge[]; adjacency: Map<string, string[]>; tags: Set<string> } {
  const links: GraphEdge[] = [];
  const tags = new Set<string>();
  // Neighbours of each node, for the local graph's breadth-first search.
  const adjacency = new Map<string, string[]>();
  const addEdge = (source: string, target: string) => {
    links.push({ source, target });
    if (!adjacency.has(source)) adjacency.set(source, []);
    if (!adjacency.has(target)) adjacency.set(target, []);
    adjacency.get(source)!.push(target);
    adjacency.get(target)!.push(source);
  };

  data.forEach((details, source) => {
    for (const link of details.links || []) {
      const dest = simplifySlug(link as never);
      if (data.has(dest)) addEdge(source, dest);
    }
    if (showTags) {
      for (const tag of details.tags || []) {
        if (removeTags.indexOf(tag) === -1) {
          const tagSlug = simplifySlug(("tags/" + tag) as never);
          tags.add(tagSlug);
          addEdge(source, tagSlug);
        }
      }
    }
  });
  return { links, adjacency, tags };
}

/**
 * The nodes at most `depth` links (in either direction) from `slug`, breadth-first, `slug`
 * first.
 */
export function neighbourhood(
  adjacency: Map<string, string[]>,
  slug: string,
  depth: number,
): Set<string> {
  const found = new Set<string>();
  let queue = [slug];
  const seen = new Set([slug]);
  for (let d = 0; d <= depth && queue.length > 0; d++) {
    const nextQueue: string[] = [];
    for (const cur of queue) {
      found.add(cur);
      for (const adjacent of adjacency.get(cur) || []) {
        if (!seen.has(adjacent)) {
          seen.add(adjacent);
          nextQueue.push(adjacent);
        }
      }
    }
    queue = nextQueue;
  }
  return found;
}

/** The nodes and links to draw for the page `slug` (a simple slug, `index` for the home page). */
export function buildGraphData(
  data: Map<string, GraphContentEntry>,
  slug: string,
  options: GraphDataOptions,
): GraphData {
  const { links, adjacency, tags } = collectEdges(data, options);

  let shown: Set<string>;
  if (options.depth >= 0) {
    shown = neighbourhood(adjacency, slug, options.depth);
  } else {
    shown = new Set(data.keys());
    tags.forEach((tag) => shown.add(tag));
  }

  const nodes: GraphNodeData[] = [];
  shown.forEach((url) => {
    const isTag = url.startsWith("tags/");
    nodes.push({
      id: url,
      text: isTag ? "#" + url.substring(5) : data.get(url)?.title || url,
      tags: isTag ? [] : data.get(url)?.tags || [],
    });
  });

  const graphLinks = links.filter((link) => shown.has(link.source) && shown.has(link.target));

  // Links per node, counted once (the radius used to rescan every link per node).
  const degree = new Map<string, number>();
  for (const { source, target } of graphLinks) {
    degree.set(source, (degree.get(source) || 0) + 1);
    degree.set(target, (degree.get(target) || 0) + 1);
  }
  return { nodes, links: graphLinks, degree };
}
