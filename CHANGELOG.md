# Changelog

## 1.0.8

### Patch Changes

- 3efce6d: A graph at rest no longer runs a `requestAnimationFrame` loop: PixiJS's system ticker (pointer-over checks, the renderer's scheduled tasks) ran at 60 frames a second for as long as a graph was on the page, also after its layout settled and after the global graph closed. It is advanced on the frames the graph renders (while the layout runs, a node is dragged, or on zoom and hover), and a graph removed from the page without a cleanup stops.

## 1.0.7

### Patch Changes

- 67e7b42: The local graph on folder index pages shows the folder's connections instead of a single node (#14, thanks @kalinof). The graph now takes the current page from `<body data-slug>`, which the SPA router updates, and falls back to the URL, stripping the base path only at a path-segment boundary.

## 1.0.6

### Patch Changes

- 379cbd2: d3 and PixiJS load when a graph is first drawn, not on every page load. The local graph draws as it is about to scroll into view; on phones, where it sits below the article, pages no longer fetch and parse the libraries (about 0.5 MB) until the reader reaches it. The global graph loads them when opened. A graph hidden by the layout is never drawn.

## 1.0.5

### Patch Changes

- 4f80048: The graph scales to large sites. On a site with 3,000 notes and 33,000 links, the global graph opens in 0.5 s instead of 2.5 s, its longest main-thread block is about 0.1 s instead of 0.8 s, and it stops using the CPU once the layout settles (it used a full core for as long as it was open).

  - Links are drawn as one path instead of one PixiJS object per link.
  - The graph is rendered only when something changes (layout, hover, drag, zoom), not on every frame.
  - Node sizes come from link counts computed once, instead of rescanning every link for every node.
  - The local graph's neighbourhood search uses an adjacency list.
  - Labels are created when they're first shown, and only for nodes on screen.
  - d3 and PixiJS load as exact, integrity-checked versions, and PixiJS as its minified build (200 KB instead of 2.5 MB to parse, on every page).

## 1.0.4

### Patch Changes

- 043030d: Graph colours follow Obsidian themes. Like Obsidian's graph, the graph reads its node, link, tag and label colours from hidden `.graph-view.color-*` elements, so `--graph-node`, `--graph-line`, `--graph-node-tag`, `--graph-text` and themes' rules on those classes apply (with @quartz-themes/core, nodes, links and tags matched Obsidian in under half of 74 themes; now all but one OS-dependent theme). Without an Obsidian theme the colours stay Quartz's. Colours computed as `oklch()`, `color()` or `color-mix()` are converted for PixiJS, which couldn't draw them.

## 1.0.3

### Patch Changes

- 8729964: Uses Quartz's own `preact` instead of bundling a second copy (`noExternal` in the build overrode the externals). Components now share one Preact instance with Quartz and other plugins, so hooks and context work across them, and the bundle is smaller.

## 1.0.2

### Patch Changes

- d52a1d2: Bundles `@quartz-community/utils` 1.1.0: a short wikilink to an Obsidian folder note (`[[Topic]]` for `Topic/Topic.md`) reaches the folder page, and anchors to headings use the same slug as heading ids. `github-slugger` is no longer a dependency of this plugin.

## 1.0.1

### Patch Changes

- 4deeaaa: Use sentence case for the French graph title: "Vue graphique" instead of "Vue Graphique" (jackyzha0/quartz#2513).

## 1.0.0

### Major Changes

- Stable 1.0 release. All `@quartz-community/*` dependencies now use `^1.0.0` ranges.

  Pre-1.0 caret ranges pinned the minor version (`^0.2.1` means `>=0.2.1 <0.3.0`), so
  published fixes to shared packages could never be resolved by dependents. Moving the
  ecosystem to 1.0 makes caret ranges behave conventionally.

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Initial Quartz community plugin template.
