---
"@quartz-community/graph": patch
---

The graph scales to large sites. On a site with 3,000 notes and 33,000 links, the global graph opens in 0.5 s instead of 2.5 s, its longest main-thread block is about 0.1 s instead of 0.8 s, and it stops using the CPU once the layout settles (it used a full core for as long as it was open).

- Links are drawn as one path instead of one PixiJS object per link.
- The graph is rendered only when something changes (layout, hover, drag, zoom), not on every frame.
- Node sizes come from link counts computed once, instead of rescanning every link for every node.
- The local graph's neighbourhood search uses an adjacency list.
- Labels are created when they're first shown, and only for nodes on screen.
- d3 and PixiJS load as exact, integrity-checked versions, and PixiJS as its minified build (200 KB instead of 2.5 MB to parse, on every page).
