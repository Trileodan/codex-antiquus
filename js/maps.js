/* =====================================================================
   CHAPTER MAPS

   A map is authored as coordinates, not drawn as SVG. A beat carries a
   `map` object naming real longitudes and latitudes, and this file
   projects them, clips the existing coastline to the bounding box and
   draws the result — which is the same decision the battle diagrams
   made, and for the same reason: data can be checked and corrected, and
   hand-drawn SVG cannot.

   The coastline comes from js/data/coastline.js, the one the globe
   uses. It is schematic at this zoom and says so. Coastlines are drawn
   because they have barely moved in three thousand years; borders are
   drawn only where a chapter is specifically about one, and always as a
   line the text has just explained rather than as a fact of geography.

   Projection is equirectangular with the horizontal axis scaled by the
   cosine of the middle latitude, which keeps the Mediterranean looking
   like the Mediterranean instead of a letterbox.
   ===================================================================== */

const MAP_TONE = {
  route: "var(--gold-glow)", march: "var(--rust)", sea: "var(--silver-glow)",
  frontier: "var(--verdigris)", area: "var(--bronze)", enemy: "var(--rust)",
  place: "var(--parchment)",
};

function ChapterMap({ map }) {
  const [minLon, minLat, maxLon, maxLat] = map.bounds;
  const W = 100, midLat = (minLat + maxLat) / 2;
  const kx = Math.cos((midLat * Math.PI) / 180) || 1;
  const spanLon = (maxLon - minLon) * kx, spanLat = maxLat - minLat;
  const H = Math.max(38, Math.min(120, (spanLat / spanLon) * W));
  const px = (lon, lat) => [((lon - minLon) * kx / spanLon) * W, ((maxLat - lat) / spanLat) * H];
  const path = (pts, close) => pts.map((p, i) => `${i ? "L" : "M"}${px(p[0], p[1]).map((v) => v.toFixed(2)).join(" ")}`).join("") + (close ? "Z" : "");

  /* Only the landmasses that actually reach into the frame. */
  const inFrame = (ring) => ring.some(([lo, la]) => lo >= minLon - 12 && lo <= maxLon + 12 && la >= minLat - 8 && la <= maxLat + 8);
  const land = (COASTLINE.land || []).filter(inFrame);
  const seas = (COASTLINE.seas || []).filter(inFrame);

  return <figure style={{ margin: "18px 0" }}>
    <div className="hcg-panel rounded-lg" style={{ padding: 10, overflow: "hidden" }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block", background: "#141C24", borderRadius: 4 }}
           role="img" aria-label={map.caption || "map"}>
        <rect x="0" y="0" width={W} height={H} fill="#141C24" />
        {land.map((ring, i) => <path key={`l${i}`} d={path(ring, true)} fill="#241F16" stroke="#453D2C" strokeWidth="0.3" />)}
        {seas.map((ring, i) => <path key={`s${i}`} d={path(ring, true)} fill="#141C24" stroke="#3A4652" strokeWidth="0.25" />)}

        {(map.areas || []).map((a, i) => <g key={`a${i}`}>
          <path d={path(a.points, true)} fill={MAP_TONE[a.tone] || MAP_TONE.area} fillOpacity="0.30"
                stroke={MAP_TONE[a.tone] || MAP_TONE.area} strokeWidth="0.5" strokeOpacity="0.85" />
          {a.label && <text x={px(a.at ? a.at[0] : a.points[0][0], a.at ? a.at[1] : a.points[0][1])[0]}
                            y={px(a.at ? a.at[0] : a.points[0][0], a.at ? a.at[1] : a.points[0][1])[1]}
                            fill={MAP_TONE[a.tone] || MAP_TONE.area} fontSize="2.6" fontFamily="'Space Mono',monospace"
                            textAnchor="middle" opacity="0.9">{a.label}</text>}
        </g>)}

        {(map.lines || []).map((l, i) => <path key={`f${i}`} d={path(l.points)} fill="none"
          stroke={MAP_TONE[l.tone] || MAP_TONE.frontier} strokeWidth="0.7" strokeDasharray={l.dashed ? "1.6 1.2" : undefined} />)}

        {(map.routes || []).map((r, i) => <g key={`r${i}`}>
          <path d={path(r.points)} fill="none" stroke={MAP_TONE[r.tone] || MAP_TONE.route}
                strokeWidth="0.75" strokeDasharray={r.dashed ? "2 1.4" : undefined} strokeLinejoin="round" />
          {r.points.length > 1 && (() => {
            const a = px(...r.points[r.points.length - 2]), b = px(...r.points[r.points.length - 1]);
            const ang = Math.atan2(b[1] - a[1], b[0] - a[0]);
            const t = MAP_TONE[r.tone] || MAP_TONE.route;
            return <polygon points={`${b[0]},${b[1]} ${b[0] - 2.2 * Math.cos(ang - 0.4)},${b[1] - 2.2 * Math.sin(ang - 0.4)} ${b[0] - 2.2 * Math.cos(ang + 0.4)},${b[1] - 2.2 * Math.sin(ang + 0.4)}`} fill={t} />;
          })()}
        </g>)}

        {(map.places || []).map((p, i) => {
          const [x, y] = px(p.lon, p.lat);
          const t = MAP_TONE[p.tone] || MAP_TONE.place;
          const right = x < W * 0.72;
          return <g key={`p${i}`}>
            <circle cx={x} cy={y} r={p.big ? 1.3 : 0.85} fill={t} stroke="#141C24" strokeWidth="0.3" />
            <text x={right ? x + 2 : x - 2} y={y + 1} fill={t} fontSize="2.7" fontFamily="'Space Mono',monospace"
                  textAnchor={right ? "start" : "end"}>{p.name}</text>
          </g>;
        })}
      </svg>
    </div>
    {map.caption && <figcaption className="hcg-mono" style={{ fontSize: 11.5, color: "var(--parchment-dim)", marginTop: 6, lineHeight: 1.55 }}>
      {map.caption} <span style={{ color: "var(--hair)" }}>· coastline schematic</span>
    </figcaption>}
  </figure>;
}
