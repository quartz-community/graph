---
"@quartz-community/graph": patch
---

d3 and PixiJS load when a graph is first drawn, not on every page load. The local graph draws as it is about to scroll into view; on phones, where it sits below the article, pages no longer fetch and parse the libraries (about 0.5 MB) until the reader reaches it. The global graph loads them when opened. A graph hidden by the layout is never drawn.
