---
"@quartz-community/graph": patch
---

Seed the graph from the slug Quartz stamps on `<body data-slug>` instead of deriving it from `location.pathname`. The URL is not authoritative: hosts may normalise the case of pretty URLs (Netlify lowercases them) and `location.pathname` is always percent-encoded, so any note whose slug contains an uppercase or non-ASCII character was looked up under a key the content index does not have. The graph then seeded its search with a node that does not exist and rendered a single unconnected dot.
