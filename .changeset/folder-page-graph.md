---
"@quartz-community/graph": patch
---

The local graph on folder index pages shows the folder's connections instead of a single node (#14, thanks @kalinof). The graph now takes the current page from `<body data-slug>`, which the SPA router updates, and falls back to the URL, stripping the base path only at a path-segment boundary.
