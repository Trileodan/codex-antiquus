/* =====================================================================
   GLOBE — an orthographic projection, written out rather than imported

   The brief asked for a spinnable globe. This is one: a sphere you drag
   to rotate, with hotspots placed by real latitude and longitude and
   filtered by the Atlas time slider.

   No three.js. An orthographic projection is about twenty lines of
   trigonometry, and a 600 KB dependency to draw a circle would undo the
   vendoring work and the no-build-step design at once. Everything here
   is inline SVG.
   ===================================================================== */

const GLOBE_R = 46;                 /* sphere radius in viewBox units */
const GLOBE_C = 50;                 /* centre */
const DEG = Math.PI / 180;

/* Orthographic: the visible hemisphere is the one facing the camera.
   Returns null for anything on the far side, which is how the sphere
   occludes itself without any depth buffer. */
function project(lon, lat, rotLon, rotLat) {
  const l = (lon - rotLon) * DEG, p = lat * DEG, p0 = rotLat * DEG;
  const cosc = Math.sin(p0) * Math.sin(p) + Math.cos(p0) * Math.cos(p) * Math.cos(l);
  if (cosc < 0) return null;
  return [
    GLOBE_C + GLOBE_R * Math.cos(p) * Math.sin(l),
    GLOBE_C - GLOBE_R * (Math.cos(p0) * Math.sin(p) - Math.sin(p0) * Math.cos(p) * Math.cos(l)),
  ];
}

/* A ring that leaves the visible hemisphere must be closed *along the
   limb*, not by a straight chord across the sphere — otherwise Eurasia
   grows a diagonal line to the far edge whenever you spin it away.

   So: resample the ring finely, find where it crosses the horizon, and
   walk the circle's edge from the exit point round to the next entry.
   That is what makes a filled landmass get cut cleanly by the horizon. */

function resample(ring, stepDeg) {
  const out = [];
  for (let i = 0; i < ring.length; i++) {
    const [lon1, lat1] = ring[i], [lon2, lat2] = ring[(i + 1) % ring.length];
    const n = Math.max(1, Math.ceil(Math.max(Math.abs(lon2 - lon1), Math.abs(lat2 - lat1)) / stepDeg));
    for (let k = 0; k < n; k++)
      out.push([lon1 + (lon2 - lon1) * k / n, lat1 + (lat2 - lat1) * k / n]);
  }
  return out;
}

const angleOf = (pt) => Math.atan2(pt[1] - GLOBE_C, pt[0] - GLOBE_C);

function limbWalk(from, to) {
  let d = angleOf(to) - angleOf(from);
  while (d > Math.PI) d -= 2 * Math.PI;
  while (d < -Math.PI) d += 2 * Math.PI;
  const steps = Math.max(1, Math.ceil(Math.abs(d) / 0.15));
  let out = "";
  for (let i = 1; i <= steps; i++) {
    const a = angleOf(from) + d * i / steps;
    out += "L" + (GLOBE_C + GLOBE_R * Math.cos(a)).toFixed(2) + " "
               + (GLOBE_C + GLOBE_R * Math.sin(a)).toFixed(2) + " ";
  }
  return out;
}

/* Push a point to the rim, used for the approximate horizon crossing. */
function toRim(pt) {
  const a = angleOf(pt);
  return [GLOBE_C + GLOBE_R * Math.cos(a), GLOBE_C + GLOBE_R * Math.sin(a)];
}

function ringPath(ring, rotLon, rotLat, filled) {
  const pts = resample(ring, 3).map(([lon, lat]) => project(lon, lat, rotLon, rotLat));
  let d = "", pen = false, exitPt = null, firstPt = null;

  for (const pt of pts) {
    if (pt) {
      if (!pen) {
        if (filled && exitPt) d += limbWalk(exitPt, toRim(pt));
        else d += "M" + pt[0].toFixed(2) + " " + pt[1].toFixed(2) + " ";
        if (!firstPt) firstPt = pt;
        pen = true;
      }
      d += "L" + pt[0].toFixed(2) + " " + pt[1].toFixed(2) + " ";
    } else if (pen) {
      pen = false;
      exitPt = null;
      /* remember where we left, so the next entry can be joined along the rim */
      const lastMatch = d.trimEnd().split("L").pop();
      if (lastMatch) {
        const [x, y] = lastMatch.trim().split(/\s+/).map(Number);
        if (Number.isFinite(x) && Number.isFinite(y)) exitPt = toRim([x, y]);
      }
    }
  }
  if (filled && d) d += "Z";
  return d;
}

function graticule(rotLon, rotLat) {
  const out = [];
  for (let lat = -60; lat <= 60; lat += 30) {
    const ring = [];
    for (let lon = -180; lon <= 180; lon += 5) ring.push([lon, lat]);
    out.push(ringPath(ring, rotLon, rotLat, false));
  }
  for (let lon = -180; lon < 180; lon += 30) {
    const ring = [];
    for (let lat = -85; lat <= 85; lat += 5) ring.push([lon, lat]);
    out.push(ringPath(ring, rotLon, rotLat, false));
  }
  return out.filter(Boolean);
}

/* Drag to spin, pinch to zoom. Pointer events cover mouse and touch
   together, and the globe is keyboard- and button-operable because a map
   you can only use by dragging is a map some people cannot use at all.

   Direction: you are grabbing the globe, not steering a camera. Drag
   right and the land under your finger goes right, which means the
   centre longitude decreases. Drag down and the north pole comes
   towards you, which means the centre latitude increases. */

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const pointerDist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
const ZOOM_MIN = 1, ZOOM_MAX = 6;

function useGlobeControls(initial) {
  const [rot, setRot] = useState(initial);
  const [zoom, setZoom] = useState(1);
  const pointers = useRef(new Map());
  const gesture = useRef(null);

  function beginGesture() {
    const pts = [...pointers.current.values()];
    if (pts.length === 1) gesture.current = { mode: "rotate", x: pts[0].x, y: pts[0].y, lon: rot.lon, lat: rot.lat };
    else if (pts.length >= 2) gesture.current = { mode: "pinch", dist: pointerDist(pts[0], pts[1]) || 1, zoom };
    else gesture.current = null;
  }

  const onDown = (e) => {
    if (e.currentTarget.setPointerCapture) e.currentTarget.setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    beginGesture();
  };
  const onMove = (e) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const pts = [...pointers.current.values()], g = gesture.current;
    if (!g) return;
    if (g.mode === "pinch" && pts.length >= 2) {
      setZoom(clamp(g.zoom * (pointerDist(pts[0], pts[1]) / g.dist), ZOOM_MIN, ZOOM_MAX));
    } else if (g.mode === "rotate" && pts.length === 1) {
      const dx = pts[0].x - g.x, dy = pts[0].y - g.y;
      const k = 0.45 / zoom;               /* finer control the closer you are */
      setRot({ lon: g.lon - dx * k, lat: clamp(g.lat + dy * k, -85, 85) });
    }
  };
  const onUp = (e) => { pointers.current.delete(e.pointerId); beginGesture(); };

  /* A trackpad pinch arrives as a wheel event with ctrlKey set. A plain
     two-finger scroll is left alone so the page still scrolls. */
  const onWheel = (e) => {
    if (!e.ctrlKey) return;
    e.preventDefault();
    setZoom((z) => clamp(z * (e.deltaY > 0 ? 0.92 : 1.08), ZOOM_MIN, ZOOM_MAX));
  };

  const nudge = (dLon, dLat) => setRot((r) => ({
    lon: r.lon + dLon, lat: clamp(r.lat + dLat, -85, 85),
  }));
  const stepZoom = (f) => setZoom((z) => clamp(z * f, ZOOM_MIN, ZOOM_MAX));

  return { rot, setRot, zoom, setZoom, nudge, stepZoom,
           handlers: { onPointerDown: onDown, onPointerMove: onMove,
                       onPointerUp: onUp, onPointerCancel: onUp, onWheel } };
}

function Globe({ year, places, onPick, selected }) {
  const { rot, setRot, zoom, setZoom, nudge, stepZoom, handlers } = useGlobeControls({ lon: 25, lat: 28 });
  const grat = useMemo(() => graticule(rot.lon, rot.lat), [rot.lon, rot.lat]);

  const shown = places.filter((p) => year >= p.from && year <= p.to);
  const plotted = shown.map((p) => ({ p, xy: project(p.lon, p.lat, rot.lon, rot.lat) }))
                       .filter((h) => h.xy);

  return (
    <div>
      <svg viewBox="0 0 100 100" className="hcg-globe" style={{ width: "100%", touchAction: "none" }}
           role="img" aria-label={`Globe centred on ${Math.round(rot.lat)}° latitude, ${Math.round(rot.lon)}° longitude`}
           {...handlers}>
        <defs>
          <radialGradient id="globe-shade" cx="38%" cy="32%" r="72%">
            <stop offset="0%" stopColor="#2A2216" />
            <stop offset="70%" stopColor="#1D1913" />
            <stop offset="100%" stopColor="#14110C" />
          </radialGradient>
          <clipPath id="globe-clip">
            <circle cx={GLOBE_C} cy={GLOBE_C} r={GLOBE_R} />
          </clipPath>
        </defs>

        <g transform={`translate(${GLOBE_C * (1 - zoom)} ${GLOBE_C * (1 - zoom)}) scale(${zoom})`}>
        <circle cx={GLOBE_C} cy={GLOBE_C} r={GLOBE_R} fill="url(#globe-shade)"
                stroke="var(--hair)" strokeWidth=".5" vectorEffect="non-scaling-stroke" />
        <g clipPath="url(#globe-clip)">
        {grat.map((d, i) => <path key={`g${i}`} d={d} fill="none" stroke="#312A20" strokeWidth=".25" vectorEffect="non-scaling-stroke" />)}

        {COASTLINE.land.map((ring, i) => (
          <path key={`l${i}`} d={ringPath(ring, rot.lon, rot.lat, true)}
                fill="rgba(176,141,87,.20)" stroke="var(--bronze)" strokeWidth=".35"
                strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        ))}
        {COASTLINE.seas.map((ring, i) => (
          <path key={`s${i}`} d={ringPath(ring, rot.lon, rot.lat, true)}
                fill="#1D1913" stroke="var(--bronze)" strokeWidth=".25" vectorEffect="non-scaling-stroke" />
        ))}
        </g>

        {plotted.map(({ p, xy }) => {
          const on = selected === p.id;
          const c = PLACE_TONE[p.kind] || "var(--parchment-dim)";
          return (
            <g key={p.id} onPointerDown={(e) => e.stopPropagation()}
               onClick={() => onPick(p)} style={{ cursor: "pointer" }}>
              {on && <circle cx={xy[0]} cy={xy[1]} r={3.4 / zoom} fill="none" stroke={c} strokeWidth=".4" vectorEffect="non-scaling-stroke" opacity=".8" />}
              <circle cx={xy[0]} cy={xy[1]} r={(on ? 1.5 : p.kind === "set" ? 1.25 : 0.95) / zoom}
                      fill={p.locked ? "transparent" : c} stroke={c} strokeWidth=".4"
                      vectorEffect="non-scaling-stroke" />
              {/* An invisible disc four times the size of the dot. A 1px
                  hotspot is a fine thing to look at and impossible to hit
                  with a fingertip, and the two jobs do not have to be done
                  by the same circle. */}
              <circle cx={xy[0]} cy={xy[1]} r={4.5 / zoom} fill="transparent" stroke="none" />
              <title>{p.name}</title>
            </g>
          );
        })}
        </g>
      </svg>

      <div className="flex items-center gap-2 mt-2 flex-wrap">
        <button onClick={() => nudge(-25, 0)} className="hcg-btn hcg-panel text-xs px-2.5 py-1 rounded" aria-label="Rotate west">←</button>
        <button onClick={() => nudge(0, 12)} className="hcg-btn hcg-panel text-xs px-2.5 py-1 rounded" aria-label="Rotate north">↑</button>
        <button onClick={() => nudge(0, -12)} className="hcg-btn hcg-panel text-xs px-2.5 py-1 rounded" aria-label="Rotate south">↓</button>
        <button onClick={() => nudge(25, 0)} className="hcg-btn hcg-panel text-xs px-2.5 py-1 rounded" aria-label="Rotate east">→</button>
        <button onClick={() => { setRot({ lon: 25, lat: 28 }); setZoom(1); }} className="hcg-btn hcg-panel text-xs px-3 py-1 rounded">Recentre</button>
        <span style={{ width: 8 }} />
        <button onClick={() => stepZoom(1 / 1.4)} disabled={zoom <= ZOOM_MIN}
                className="hcg-btn hcg-panel text-xs px-2.5 py-1 rounded" aria-label="Zoom out">−</button>
        <button onClick={() => stepZoom(1.4)} disabled={zoom >= ZOOM_MAX}
                className="hcg-btn hcg-panel text-xs px-2.5 py-1 rounded" aria-label="Zoom in">+</button>
        {zoom > 1.02 && <span className="hcg-mono" style={{ fontSize: 10, color: "var(--parchment-dim)" }}>×{zoom.toFixed(1)}</span>}
        <span className="hcg-mono" style={{ fontSize: 10, color: "var(--parchment-dim)", marginLeft: "auto" }}>
          {plotted.length} of {shown.length} on this face
        </span>
      </div>
    </div>
  );
}
