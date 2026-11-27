import { describe, expect, it } from "vitest";
import { readGraphConfig } from "../src/components/scripts/graphConfig";

describe("the graph script's settings", () => {
  it("keeps explicit zeros", () => {
    const config = readGraphConfig({
      repelForce: 0,
      centerForce: 0,
      linkDistance: 0,
      fontSize: 0,
      opacityScale: 0,
      depth: 0,
    });
    expect(config).toMatchObject({
      repelForce: 0,
      centerForce: 0,
      linkDistance: 0,
      fontSize: 0,
      opacityScale: 0,
      depth: 0,
    });
  });

  it("keeps explicit false", () => {
    const config = readGraphConfig({
      drag: false,
      zoom: false,
      showTags: false,
      focusOnHover: false,
      enableRadial: false,
    });
    expect(config).toMatchObject({
      drag: false,
      zoom: false,
      showTags: false,
      focusOnHover: false,
      enableRadial: false,
    });
  });

  it("keeps the values it is given", () => {
    const given = {
      drag: false,
      zoom: true,
      depth: -1,
      scale: 0.9,
      repelForce: 2,
      centerForce: 0.1,
      linkDistance: 50,
      fontSize: 1,
      opacityScale: 3,
      removeTags: ["x"],
      showTags: true,
      focusOnHover: true,
      enableRadial: true,
    };
    expect(readGraphConfig(given)).toEqual(given);
  });

  it("fills in missing values", () => {
    expect(readGraphConfig({})).toEqual({
      drag: true,
      zoom: true,
      depth: 1,
      scale: 1,
      repelForce: 0.5,
      centerForce: 0.3,
      linkDistance: 30,
      fontSize: 0.6,
      opacityScale: 1,
      removeTags: [],
      showTags: true,
      focusOnHover: false,
      enableRadial: false,
    });
    expect(readGraphConfig(undefined).centerForce).toBe(0.3);
    expect(readGraphConfig({ centerForce: null, removeTags: null }).centerForce).toBe(0.3);
  });

  it("keeps a scale above 0 (labels are drawn at 1 / scale)", () => {
    expect(readGraphConfig({ scale: 0 }).scale).toBe(1);
    expect(readGraphConfig({ scale: -1 }).scale).toBe(1);
    expect(readGraphConfig({ scale: 0.2 }).scale).toBe(0.2);
  });
});
