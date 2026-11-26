---
"@quartz-community/graph": patch
---

A graph at rest no longer runs a `requestAnimationFrame` loop: PixiJS's system ticker (pointer-over checks, the renderer's scheduled tasks) ran at 60 frames a second for as long as a graph was on the page, also after its layout settled and after the global graph closed. It is advanced on the frames the graph renders (while the layout runs, a node is dragged, or on zoom and hover), and a graph removed from the page without a cleanup stops.
