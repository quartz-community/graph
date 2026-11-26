// @ts-nocheck
import {
  removeAllChildren,
  getBasePath,
  getFullSlugFromUrl,
  simplifySlug,
  resolveBasePath,
} from "@quartz-community/utils";

(function () {
  function getSlugFromUrl() {
    var slug = getFullSlugFromUrl();
    var base = getBasePath();
    if (base && slug.startsWith(base.replace(/^\//, ""))) {
      slug = slug.slice(base.replace(/^\//, "").length);
      if (slug.startsWith("/")) slug = slug.slice(1);
    }
    return slug;
  }

  function loadScript(src, integrity) {
    var existing = document.querySelector('script[src="' + src + '"]');
    if (existing) return Promise.resolve();
    return new Promise(function (resolve, reject) {
      var script = document.createElement("script");
      script.src = src;
      script.integrity = integrity;
      script.crossOrigin = "anonymous";
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  // d3 and PixiJS load when a graph is first drawn (a local graph scrolled into
  // view, or the global graph opened), not on every page load: on phones the
  // local graph sits below the article.
  var librariesPromise = null;
  function loadLibraries() {
    if (!librariesPromise) {
      librariesPromise = Promise.all([
        // Exact versions (with their hashes), and PixiJS's minified build: the
        // unminified one is 2.5 MB of script to parse.
        loadScript(
          "https://cdn.jsdelivr.net/npm/d3@7.9.2/dist/d3.min.js",
          "sha384-LxfWGZyh6PaLjBRPf7NWiEYs9Mn0UQ6ZmqbLLZhxlOBBNWF2a2K0Pfc5efkrNnhQ",
        ),
        loadScript(
          "https://cdn.jsdelivr.net/npm/pixi.js@8.23.0/dist/pixi.min.js",
          "sha384-IGfYrdVH+mWT/lAfomOiw9gRIY0pOGCN3enQE3TBB6FWluTVVh4hlXDzNotZYUcv",
        ),
      ]).catch(function (err) {
        // Try again on the next render.
        librariesPromise = null;
        throw err;
      });
    }
    return librariesPromise;
  }

  function showLoadError(container) {
    container.textContent = "Graph could not load. Check your network connection.";
    container.style.display = "flex";
    container.style.alignItems = "center";
    container.style.justifyContent = "center";
    container.style.color = "var(--gray)";
    container.style.fontSize = "0.9rem";
  }

  initGraph();

  function initGraph() {
    // Set by renderGraph once the libraries have loaded.
    var d3;
    var PIXI;

    var localStorageKey = "graph-visited";

    function getVisited() {
      return new Set(JSON.parse(localStorage.getItem(localStorageKey) || "[]"));
    }

    function addToVisited(slug) {
      var visited = getVisited();
      visited.add(slug);
      localStorage.setItem(localStorageKey, JSON.stringify(Array.from(visited)));
    }

    // Resolves CSS color values containing calc()/var() that PixiJS cannot parse.
    // Uses a temp DOM element so the browser's CSS engine evaluates the expression.
    function resolveColor(value, fallback) {
      if (!value) return fallback;
      var el = document.createElement("div");
      el.style.color = value;
      el.style.position = "absolute";
      el.style.visibility = "hidden";
      document.body.appendChild(el);
      var resolved = parseRgb(getComputedStyle(el).color);
      el.remove();
      return resolved ? resolved.color : fallback;
    }

    // Obsidian's graph takes its colours from hidden `.graph-view.color-*`
    // elements, styled by `--graph-node`, `--graph-line`… or by a theme's rules
    // on those classes. Read them the same way, so Obsidian themes (e.g. via
    // @quartz-themes/core) colour this graph as they colour Obsidian's. Without
    // such a theme, graph.scss gives these classes Quartz's palette.
    var GRAPH_COLOR_CLASSES = {
      node: "color-fill",
      focused: "color-fill-focused",
      tag: "color-fill-tag",
      line: "color-line",
      lineHighlight: "color-line-highlight",
      text: "color-text",
    };

    // Computed colours can be oklch(), color(srgb …) or color-mix() results, which
    // PixiJS can't parse. Painting one pixel converts any CSS colour to sRGB.
    var colorCtx = null;
    function parseRgb(value) {
      if (!value) return null;
      if (!colorCtx) {
        var canvas = document.createElement("canvas");
        canvas.width = canvas.height = 1;
        colorCtx = canvas.getContext("2d", { willReadFrequently: true });
      }
      if (!colorCtx) return null;
      colorCtx.clearRect(0, 0, 1, 1);
      colorCtx.fillStyle = "rgba(0, 0, 0, 0)";
      colorCtx.fillStyle = value;
      colorCtx.fillRect(0, 0, 1, 1);
      var d = colorCtx.getImageData(0, 0, 1, 1).data;
      return { color: "rgb(" + d[0] + ", " + d[1] + ", " + d[2] + ")", alpha: d[3] / 255 };
    }

    function readGraphColors(container) {
      var holder = document.createElement("div");
      holder.setAttribute("aria-hidden", "true");
      holder.style.cssText = "position:absolute;width:0;height:0;overflow:hidden;visibility:hidden";
      var els = {};
      for (var key in GRAPH_COLOR_CLASSES) {
        var el = document.createElement("div");
        el.className = "graph-view " + GRAPH_COLOR_CLASSES[key];
        holder.appendChild(el);
        els[key] = el;
      }
      container.appendChild(holder);
      var out = {};
      for (var key in els) {
        var cs = getComputedStyle(els[key]);
        var c = parseRgb(cs.color);
        if (c) {
          var opacity = parseFloat(cs.opacity);
          if (!isNaN(opacity)) c.alpha *= opacity;
        }
        out[key] = c;
      }
      holder.remove();
      return out;
    }

    async function renderGraph(graph, fullSlug, renderGeneration) {
      var slug = simplifySlug(fullSlug);
      if (slug === "") slug = "index";
      var visited = getVisited();
      removeAllChildren(graph);

      if (renderGeneration !== undefined && renderGeneration !== currentRenderGeneration) {
        console.log("[Graph] Stale render, skipping");
        return function () {};
      }

      try {
        await loadLibraries();
      } catch (err) {
        console.error("[Graph] Failed to load libraries:", err);
        showLoadError(graph);
        return function () {};
      }
      d3 = window.d3;
      PIXI = window.PIXI;
      // A navigation while the libraries loaded makes this render stale.
      if (renderGeneration !== undefined && renderGeneration !== currentRenderGeneration) {
        return function () {};
      }

      var config = JSON.parse(graph.dataset["cfg"] || "{}");
      var enableDrag = config.drag;
      var enableZoom = config.zoom;
      var depth = config.depth;
      var scale = config.scale || 1;
      var repelForce = config.repelForce || 0.5;
      var centerForce = config.centerForce || 0.3;
      var linkDistance = config.linkDistance || 30;
      var fontSize = config.fontSize || 0.6;
      var opacityScale = config.opacityScale || 1;
      var removeTags = config.removeTags || [];
      var showTags = config.showTags;
      var focusOnHover = config.focusOnHover;
      var enableRadial = config.enableRadial;

      var data;
      try {
        var dataRaw = await fetchData;
        data = new Map();
        for (var key in dataRaw) {
          data.set(simplifySlug(key), dataRaw[key]);
        }
      } catch (err) {
        console.error("[Graph] Error loading data:", err);
        return function () {};
      }

      var width = graph.offsetWidth;
      var height = Math.max(graph.offsetHeight, 250);

      var links = [];
      var allTags = new Set();
      var validLinks = new Set(data.keys());
      // Neighbours of each node, for the local graph's breadth-first search.
      var adjacency = new Map();
      function addEdge(source, target) {
        links.push({ source: source, target: target });
        if (!adjacency.has(source)) adjacency.set(source, []);
        if (!adjacency.has(target)) adjacency.set(target, []);
        adjacency.get(source).push(target);
        adjacency.get(target).push(source);
      }

      data.forEach(function (details, source) {
        var outgoing = details.links || [];
        for (var i = 0; i < outgoing.length; i++) {
          var dest = simplifySlug(outgoing[i]);
          if (validLinks.has(dest)) {
            addEdge(source, dest);
          }
        }

        if (showTags) {
          var tags = details.tags || [];
          for (var i = 0; i < tags.length; i++) {
            var tag = tags[i];
            if (removeTags.indexOf(tag) === -1) {
              var tagSlug = simplifySlug("tags/" + tag);
              allTags.add(tagSlug);
              addEdge(source, tagSlug);
            }
          }
        }
      });

      var neighbourhood = new Set();
      if (depth >= 0) {
        var queue = [slug];
        var seen = new Set([slug]);
        for (var d = 0; d <= depth && queue.length > 0; d++) {
          var nextQueue = [];
          for (var qi = 0; qi < queue.length; qi++) {
            var cur = queue[qi];
            neighbourhood.add(cur);
            var adjacent = adjacency.get(cur) || [];
            for (var ai = 0; ai < adjacent.length; ai++) {
              if (!seen.has(adjacent[ai])) {
                seen.add(adjacent[ai]);
                nextQueue.push(adjacent[ai]);
              }
            }
          }
          queue = nextQueue;
        }
      } else {
        validLinks.forEach(function (id) {
          neighbourhood.add(id);
        });
        allTags.forEach(function (tag) {
          neighbourhood.add(tag);
        });
      }

      var nodes = [];
      var nodeMap = new Map();
      neighbourhood.forEach(function (url) {
        var isTag = url.startsWith("tags/");
        var text = isTag ? "#" + url.substring(5) : data.get(url)?.title || url;
        var nodeTags = isTag ? [] : data.get(url)?.tags || [];
        var node = {
          id: url,
          text: text,
          tags: nodeTags,
          x: Math.random() * width - width / 2,
          y: Math.random() * height - height / 2,
          vx: 0,
          vy: 0,
        };
        nodes.push(node);
        nodeMap.set(url, node);
      });

      var graphLinks = [];
      for (var i = 0; i < links.length; i++) {
        var link = links[i];
        if (neighbourhood.has(link.source) && neighbourhood.has(link.target)) {
          var sourceNode = nodeMap.get(link.source);
          var targetNode = nodeMap.get(link.target);
          if (sourceNode && targetNode) {
            graphLinks.push({ source: sourceNode, target: targetNode });
          }
        }
      }

      // Links per node, counted once (the radius used to rescan every link per node).
      var degree = new Map();
      for (var i = 0; i < graphLinks.length; i++) {
        var sid = graphLinks[i].source.id;
        var tid = graphLinks[i].target.id;
        degree.set(sid, (degree.get(sid) || 0) + 1);
        degree.set(tid, (degree.get(tid) || 0) + 1);
      }
      function nodeRadius(d) {
        return 2 + Math.sqrt(degree.get(d.id) || 0);
      }

      var styles = getComputedStyle(document.documentElement);
      var secondary = resolveColor(styles.getPropertyValue("--secondary").trim(), "#c792ea");
      var tertiary = resolveColor(styles.getPropertyValue("--tertiary").trim(), "#82aaff");
      var gray = resolveColor(styles.getPropertyValue("--gray").trim(), "#6c6c6c");
      var lightgray = resolveColor(styles.getPropertyValue("--lightgray").trim(), "#d4d4d4");
      var dark = resolveColor(styles.getPropertyValue("--dark").trim(), "#1a1a1a");
      var light = resolveColor(styles.getPropertyValue("--light").trim(), "#f5f5f5");
      var bodyFont = styles.getPropertyValue("--bodyFont").trim() || "inherit";

      var themed = readGraphColors(graph);
      var pick = function (key, fallback) {
        return themed[key] || { color: fallback, alpha: 1 };
      };
      var nodeFill = pick("node", gray);
      var focusedFill = pick("focused", secondary);
      var tagStroke = pick("tag", tertiary);
      var lineColor = pick("line", lightgray);
      var lineHighlight = pick("lineHighlight", gray);
      var labelColor = pick("text", dark);
      var visitedFill = { color: tertiary, alpha: 1 };

      var app = new PIXI.Application();
      await app.init({
        width: width,
        height: height,
        antialias: true,
        backgroundAlpha: 0,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
        eventMode: "static",
        // Rendered on demand (see requestRender), not on every frame: a graph at
        // rest costs nothing.
        autoStart: false,
      });
      app.ticker.stop();

      graph.appendChild(app.canvas);

      var stage = new PIXI.Container();
      app.stage.addChild(stage);

      var simulation = d3
        .forceSimulation(nodes)
        .force("charge", d3.forceManyBody().strength(-100 * repelForce))
        .force("center", d3.forceCenter().strength(centerForce))
        .force("link", d3.forceLink(graphLinks).distance(linkDistance))
        .force("collide", d3.forceCollide().radius(nodeRadius).iterations(3));

      if (enableRadial) {
        var radius = (Math.min(width, height) / 2) * 0.8;
        simulation.force("radial", d3.forceRadial(radius).strength(0.2));
      }

      // All links are drawn as one path per state (two Graphics objects), not one
      // Graphics object per link, so a large graph is a couple of draw batches.
      var linkGfx = new PIXI.Graphics();
      var activeLinkGfx = new PIXI.Graphics();
      linkGfx.eventMode = "none";
      activeLinkGfx.eventMode = "none";
      var nodesContainer = new PIXI.Container();
      var labelsContainer = new PIXI.Container();
      labelsContainer.eventMode = "none";
      stage.addChild(linkGfx);
      stage.addChild(activeLinkGfx);
      stage.addChild(nodesContainer);
      stage.addChild(labelsContainer);

      var nodeRenderData = [];
      var hoveredNodeId = null;
      var hoveredNeighbours = new Set();
      var dragStartTime = 0;
      var dragging = false;
      var currentTransform = d3.zoomIdentity;
      // Labels fade in when zoomed in (and show for the hovered node).
      var zoomLabelOpacity = 0;

      function nodeColor(d) {
        var isCurrent = d.id === slug;
        if (isCurrent) {
          return focusedFill;
        } else if (d.id.startsWith("tags/")) {
          return tagStroke;
        } else if (visited.has(d.id)) {
          return visitedFill;
        } else {
          return nodeFill;
        }
      }

      var renderQueued = false;
      var stopAnimation = false;
      function requestRender() {
        if (renderQueued || stopAnimation) return;
        renderQueued = true;
        requestAnimationFrame(renderFrame);
      }

      function updateHoverInfo(newHoveredId) {
        hoveredNodeId = newHoveredId;
        hoveredNeighbours = new Set();
        if (newHoveredId !== null) {
          hoveredNeighbours.add(newHoveredId);
          for (var i = 0; i < graphLinks.length; i++) {
            var l = graphLinks[i];
            if (l.source.id === newHoveredId || l.target.id === newHoveredId) {
              hoveredNeighbours.add(l.source.id);
              hoveredNeighbours.add(l.target.id);
            }
          }
        }
        requestRender();
      }

      // Text is rasterised into its own texture, so labels are created only when
      // first shown, instead of one per node up front.
      function ensureLabel(nodeData) {
        if (nodeData.label) return nodeData.label;
        var label = new PIXI.Text({
          text: nodeData.simulationData.text,
          style: {
            fontSize: fontSize * 15,
            fill: labelColor.color,
            fontFamily: bodyFont,
          },
          resolution: window.devicePixelRatio * 4,
        });
        label.anchor.set(0.5, 1.2);
        label.eventMode = "none";
        labelsContainer.addChild(label);
        nodeData.label = label;
        return label;
      }

      function drawLinks() {
        linkGfx.clear();
        activeLinkGfx.clear();
        var cx = width / 2;
        var cy = height / 2;
        var anyActive = false;
        for (var i = 0; i < graphLinks.length; i++) {
          var l = graphLinks[i];
          var active =
            hoveredNodeId !== null &&
            (l.source.id === hoveredNodeId || l.target.id === hoveredNodeId);
          var g = active ? activeLinkGfx : linkGfx;
          if (active) anyActive = true;
          g.moveTo(l.source.x + cx, l.source.y + cy);
          g.lineTo(l.target.x + cx, l.target.y + cy);
        }
        var dim = hoveredNodeId !== null ? 0.2 : 1;
        if (graphLinks.length > 0) {
          linkGfx.stroke({ width: 1, color: lineColor.color, alpha: dim * lineColor.alpha });
        }
        if (anyActive) {
          activeLinkGfx.stroke({
            width: 1,
            color: lineHighlight.color,
            alpha: lineHighlight.alpha,
          });
        }
      }

      function renderFrame() {
        renderQueued = false;
        if (stopAnimation) return;
        var cx = width / 2;
        var cy = height / 2;
        var k = currentTransform.k;
        // Visible area, in graph coordinates, for culling labels.
        var minX = -currentTransform.x / k;
        var minY = -currentTransform.y / k;
        var maxX = minX + width / k;
        var maxY = minY + height / k;
        var defaultScale = 1 / scale;

        for (var i = 0; i < nodeRenderData.length; i++) {
          var n = nodeRenderData[i];
          var d = n.simulationData;
          var x = d.x + cx;
          var y = d.y + cy;
          n.gfx.position.set(x, y);
          n.gfx.alpha =
            hoveredNodeId !== null && focusOnHover && !hoveredNeighbours.has(d.id) ? 0.2 : 1;

          var isHovered = d.id === hoveredNodeId;
          var labelAlpha = isHovered ? 1 : zoomLabelOpacity;
          var onScreen = x >= minX - 50 && x <= maxX + 50 && y >= minY - 20 && y <= maxY + 20;
          if (labelAlpha > 0 && onScreen) {
            var label = ensureLabel(n);
            label.visible = true;
            label.alpha = labelAlpha;
            label.position.set(x, y);
            label.scale.set(isHovered ? defaultScale * 1.1 : defaultScale);
          } else if (n.label) {
            n.label.visible = false;
          }
        }
        drawLinks();
        app.render();
      }

      for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        var isTagNode = node.id.startsWith("tags/");
        var color = nodeColor(node);

        var gfx = new PIXI.Graphics();
        gfx.circle(0, 0, nodeRadius(node));
        if (isTagNode) {
          gfx.fill({ color: light });
          gfx.stroke({ width: 2, color: color.color, alpha: color.alpha });
        } else {
          gfx.fill({ color: color.color, alpha: color.alpha });
        }

        gfx.eventMode = "static";
        gfx.cursor = "pointer";
        gfx.label = node.id;

        (function (n) {
          gfx.on("pointerover", function () {
            if (!dragging) updateHoverInfo(n.id);
          });
          gfx.on("pointerleave", function () {
            if (!dragging) updateHoverInfo(null);
          });
        })(node);

        nodesContainer.addChild(gfx);
        nodeRenderData.push({ simulationData: node, gfx: gfx, label: null });
      }

      if (enableDrag) {
        var dragSubject = function (event) {
          var mouseX = (event.x - currentTransform.x) / currentTransform.k;
          var mouseY = (event.y - currentTransform.y) / currentTransform.k;

          for (var i = 0; i < nodes.length; i++) {
            var n = nodes[i];
            var dx = mouseX - n.x - width / 2;
            var dy = mouseY - n.y - height / 2;
            var rad = nodeRadius(n) + 5;
            if (dx * dx + dy * dy < rad * rad) {
              return n;
            }
          }
          return null;
        };

        var dragStarted = function (event) {
          if (!event.active) simulation.alphaTarget(1).restart();
          event.subject.fx = event.subject.x;
          event.subject.fy = event.subject.y;
          var mouseSimX = (event.x - currentTransform.x) / currentTransform.k - width / 2;
          var mouseSimY = (event.y - currentTransform.y) / currentTransform.k - height / 2;
          event.subject.__dragOffset = {
            x: mouseSimX - event.subject.x,
            y: mouseSimY - event.subject.y,
          };
          dragStartTime = Date.now();
          dragging = true;
          updateHoverInfo(event.subject.id);
        };

        var dragDragged = function (event) {
          var mouseSimX = (event.x - currentTransform.x) / currentTransform.k - width / 2;
          var mouseSimY = (event.y - currentTransform.y) / currentTransform.k - height / 2;
          event.subject.fx = mouseSimX - event.subject.__dragOffset.x;
          event.subject.fy = mouseSimY - event.subject.__dragOffset.y;
        };

        var dragEnded = function (event) {
          if (!event.active) simulation.alphaTarget(0);
          event.subject.fx = null;
          event.subject.fy = null;
          dragging = false;
          updateHoverInfo(null);

          if (Date.now() - dragStartTime < 500) {
            var target = resolveBasePath(event.subject.id);
            window.location.href = target;
          }
        };

        var drag = d3
          .drag()
          .container(app.canvas)
          .subject(dragSubject)
          .on("start", dragStarted)
          .on("drag", dragDragged)
          .on("end", dragEnded);

        d3.select(app.canvas).call(drag);
      } else {
        for (var i = 0; i < nodeRenderData.length; i++) {
          (function (nodeData) {
            nodeData.gfx.on("click", function () {
              var target = resolveBasePath(nodeData.simulationData.id);
              window.location.href = target;
            });
          })(nodeRenderData[i]);
        }
      }

      if (enableZoom) {
        var zoomed = function (event) {
          currentTransform = event.transform;
          stage.scale.set(currentTransform.k, currentTransform.k);
          stage.position.set(currentTransform.x, currentTransform.y);
          zoomLabelOpacity = Math.max((currentTransform.k * opacityScale - 1) / 3.75, 0);
          requestRender();
        };

        var zoom = d3
          .zoom()
          .extent([
            [0, 0],
            [width, height],
          ])
          .scaleExtent([0.25, 4])
          .on("zoom", zoomed);

        d3.select(app.canvas).call(zoom);
      }

      simulation.on("tick", requestRender);
      simulation.restart();
      requestRender();
      return function () {
        stopAnimation = true;
        simulation.stop();
        try {
          app.destroy(true);
        } catch (_) {
          // PixiJS may throw if WebGL context was already lost.
        }
      };
    }

    var localCleanups = [];
    var globalCleanups = [];
    var currentRenderGeneration = 0;

    function cleanupLocal() {
      for (var i = 0; i < localCleanups.length; i++) {
        localCleanups[i]();
      }
      localCleanups = [];
    }

    function cleanupGlobal() {
      for (var i = 0; i < globalCleanups.length; i++) {
        globalCleanups[i]();
      }
      globalCleanups = [];
    }

    var globalContainers = [];
    var globalIcons = [];
    var documentClickHandler = null;
    var documentKeydownHandler = null;
    var iconClickHandler = null;

    function hideGlobalGraph() {
      cleanupGlobal();
      for (var i = 0; i < globalContainers.length; i++) {
        globalContainers[i].classList.remove("active");
        var sidebar = globalContainers[i].closest(".sidebar");
        if (sidebar) {
          sidebar.style.zIndex = "";
        }
      }
    }

    function anyGlobalGraphActive() {
      for (var i = 0; i < globalContainers.length; i++) {
        if (globalContainers[i].classList.contains("active")) {
          return true;
        }
      }
      return false;
    }

    function showGlobalGraph() {
      cleanupGlobal();
      var currentSlug = getSlugFromUrl();
      for (var i = 0; i < globalContainers.length; i++) {
        var container = globalContainers[i];
        container.classList.add("active");
        var sidebar = container.closest(".sidebar");
        if (sidebar) {
          sidebar.style.zIndex = "1";
        }

        var graphContainer = container.querySelector(".global-graph-container");
        if (graphContainer) {
          (function (gc) {
            renderGraph(gc, currentSlug, undefined)
              .then(function (cleanup) {
                globalCleanups.push(cleanup);
              })
              .catch(function (err) {
                console.error("[Graph] Global render error:", err);
              });
          })(graphContainer);
        }
      }
    }

    function toggleGlobalGraph() {
      if (anyGlobalGraphActive()) {
        hideGlobalGraph();
      } else {
        showGlobalGraph();
      }
    }

    function renderLocal() {
      cleanupLocal();
      var thisGeneration = ++currentRenderGeneration;
      var slug = getSlugFromUrl();
      addToVisited(slug);

      function render(container) {
        renderGraph(container, slug, thisGeneration)
          .then(function (cleanup) {
            if (thisGeneration === currentRenderGeneration) {
              localCleanups.push(cleanup);
            } else {
              cleanup();
            }
          })
          .catch(function (err) {
            console.error("[Graph] Local render error:", err);
          });
      }

      // Drawn when about to scroll into view; a hidden graph (e.g. a sidebar a
      // layout hides) is never drawn.
      var observer = new IntersectionObserver(
        function (entries) {
          for (var i = 0; i < entries.length; i++) {
            if (!entries[i].isIntersecting) continue;
            observer.unobserve(entries[i].target);
            render(entries[i].target);
          }
        },
        { rootMargin: "200px" },
      );
      localCleanups.push(function () {
        observer.disconnect();
      });
      var localContainers = document.querySelectorAll(".graph-container");
      for (var i = 0; i < localContainers.length; i++) {
        observer.observe(localContainers[i]);
      }
    }

    function handleNav(e) {
      var slug = e.detail ? e.detail.url : getSlugFromUrl();
      addToVisited(simplifySlug(slug));

      renderLocal();

      globalContainers = Array.from(document.querySelectorAll(".global-graph-outer"));

      if (iconClickHandler) {
        for (var i = 0; i < globalIcons.length; i++) {
          globalIcons[i].removeEventListener("click", iconClickHandler);
        }
      }

      globalIcons = Array.from(document.querySelectorAll(".global-graph-icon"));
      iconClickHandler = function () {
        toggleGlobalGraph();
      };
      for (var i = 0; i < globalIcons.length; i++) {
        globalIcons[i].addEventListener("click", iconClickHandler);
      }

      if (documentClickHandler) {
        document.removeEventListener("click", documentClickHandler);
      }
      documentClickHandler = function (e) {
        if (anyGlobalGraphActive()) {
          var inContainer = e.target.closest(".global-graph-container");
          var inIcon = e.target.closest(".global-graph-icon");
          if (!inContainer && !inIcon) {
            hideGlobalGraph();
          }
        }
      };
      document.addEventListener("click", documentClickHandler);

      if (documentKeydownHandler) {
        document.removeEventListener("keydown", documentKeydownHandler);
      }
      documentKeydownHandler = function (e) {
        if (e.key === "Escape") {
          if (anyGlobalGraphActive()) {
            hideGlobalGraph();
          }
          return;
        }

        if (e.key === "g" && (e.ctrlKey || e.metaKey) && !e.shiftKey) {
          e.preventDefault();
          toggleGlobalGraph();
        }
      };
      document.addEventListener("keydown", documentKeydownHandler);

      if (anyGlobalGraphActive()) {
        showGlobalGraph();
      }
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function () {
        handleNav({ detail: { url: getSlugFromUrl() } });
      });
    } else {
      handleNav({ detail: { url: getSlugFromUrl() } });
    }
    document.addEventListener("prenav", function () {
      cleanupLocal();
      cleanupGlobal();
    });
    document.addEventListener("nav", handleNav);
    document.addEventListener("render", handleNav);

    function handleThemeChange() {
      renderLocal();
      if (anyGlobalGraphActive()) {
        showGlobalGraph();
      }
    }
    document.addEventListener("themechange", handleThemeChange);
  }
})();
