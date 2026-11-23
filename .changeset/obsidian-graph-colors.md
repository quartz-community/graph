---
"@quartz-community/graph": patch
---

Graph colours follow Obsidian themes. Like Obsidian's graph, the graph reads its node, link, tag and label colours from hidden `.graph-view.color-*` elements, so `--graph-node`, `--graph-line`, `--graph-node-tag`, `--graph-text` and themes' rules on those classes apply (with @quartz-themes/core, nodes, links and tags matched Obsidian in under half of 74 themes; now all but one OS-dependent theme). Without an Obsidian theme the colours stay Quartz's. Colours computed as `oklch()`, `color()` or `color-mix()` are converted for PixiJS, which couldn't draw them.
