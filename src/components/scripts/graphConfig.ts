// A graph container's settings (its `data-cfg`) as the graph script reads them. The component
// writes every option with its default; a value is replaced only when it is missing, so an
// explicit `0` (`centerForce: 0`, `repelForce: 0`) or `false` is kept.

export interface GraphConfig {
  drag: boolean;
  zoom: boolean;
  depth: number;
  scale: number;
  repelForce: number;
  centerForce: number;
  linkDistance: number;
  fontSize: number;
  opacityScale: number;
  removeTags: string[];
  showTags: boolean;
  focusOnHover: boolean;
  enableRadial: boolean;
}

const isNumber = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value);
const number = (value: unknown, fallback: number) => (isNumber(value) ? value : fallback);
const boolean = (value: unknown, fallback: boolean) =>
  typeof value === "boolean" ? value : fallback;

export function readGraphConfig(raw: Record<string, unknown> | null | undefined): GraphConfig {
  const config = raw ?? {};
  const scale = config.scale;
  return {
    drag: boolean(config.drag, true),
    zoom: boolean(config.zoom, true),
    depth: number(config.depth, 1),
    // labels are drawn at 1 / scale: a scale of 0 or less would hide them
    scale: isNumber(scale) && scale > 0 ? scale : 1,
    repelForce: number(config.repelForce, 0.5),
    centerForce: number(config.centerForce, 0.3),
    linkDistance: number(config.linkDistance, 30),
    fontSize: number(config.fontSize, 0.6),
    opacityScale: number(config.opacityScale, 1),
    removeTags: Array.isArray(config.removeTags) ? (config.removeTags as string[]) : [],
    showTags: boolean(config.showTags, true),
    focusOnHover: boolean(config.focusOnHover, false),
    enableRadial: boolean(config.enableRadial, false),
  };
}
