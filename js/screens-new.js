/* =====================================================================
   NEW SCREENS — Wars, Atlas, Progress
   ===================================================================== */

/* ------------------------------ WARS --------------------------------- */
function WarsScreen({ save, onHome, onOpenChapter }) {
  const done = save.chaptersDone;
  const groups = WAR_CHAPTERS.reduce((a, w) => { (a[w.act] = a[w.act] || []).push(w); return a; }, {});
  return <div className="max-w-3xl mx-auto px-4 py-8 hcg-fade">
    <Crumbs items={[{ label: "Home", onClick: onHome }, { label: "Wars" }]} />
    <h1 className="hcg-display mt-3 mb-1" style={{ fontSize: 26 }}>Wars</h1>
    <p style={{ color: "var(--parchment-dim)", marginBottom: 6 }}>
      Wars belong to both sides, so they live here rather than inside either society’s history. Battles appear only in this section.
    </p>
    <p style={{ color: "var(--parchment-dim)", fontSize: 14, marginBottom: 22 }}>
      A war stays sealed until you have studied <b style={{ color: "var(--gold-glow)" }}>both sides up to the year it began</b>. You can’t learn the Punic Wars from Rome alone.
    </p>

    {Object.keys(groups).map((act) => <div key={act} className="mb-7">
      <div className="hcg-tab mb-3" style={{ color: "var(--bronze-glow)" }}>{act.toUpperCase()}</div>
      <div className="flex flex-col gap-3">
        {groups[act].map((w) => {
          const gate = warGate(w, done);
          const complete = !!done[w.id];
          const battles = w.beats.filter((b) => b.name).length;
          return <div key={w.id} className={`rounded-lg p-4 ${gate.open ? "hcg-panel" : "hcg-lockedcard"}`}>
            <button disabled={!gate.open} onClick={() => gate.open && onOpenChapter(w)}
              className="w-full text-left flex items-start gap-3" style={{ cursor: gate.open ? "pointer" : "default" }}>
              <div style={{ width: 26, height: 26, borderRadius: 999, flexShrink: 0, marginTop: 2, display: "flex", alignItems: "center", justifyContent: "center",
                background: complete ? "var(--verdigris)" : "transparent", border: complete ? "none" : "1px solid var(--hair)" }}>
                {complete ? <CheckIcon size={14} color="#1B1710" /> : gate.open ? <SwordsIcon size={13} color="var(--rust)" /> : <Lock size={12} color="#8b8371" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="hcg-display" style={{ fontSize: 16.5 }}>{w.title}</div>
                <div className="hcg-mono" style={{ fontSize: 10.5, color: "var(--parchment-dim)", marginTop: 2 }}>
                  {w.era} · {battles} battles · {w.minutes} min
                </div>
                <div className="hcg-mono" style={{ fontSize: 11, color: "var(--parchment-dim)", marginTop: 4 }}>
                  {w.sides.map((s) => s.label).join("  vs  ")}
                </div>
              </div>
              {gate.open && <ChevRight size={16} color="var(--parchment-dim)" />}
            </button>

            {!gate.open && <div className="mt-3 pt-3" style={{ borderTop: "1px solid var(--hair)" }}>
              <div className="hcg-tab mb-2" style={{ color: "var(--parchment-dim)" }}>BOTH SIDES REQUIRED</div>
              <div className="flex flex-col gap-1.5">
                {gate.items.map((g, i) => <div key={i} className="flex items-center gap-2" style={{ fontSize: 13.5, color: g.done ? "var(--verdigris)" : "var(--parchment-dim)" }}>
                  {g.done ? <CheckIcon size={13} /> : <span style={{ width: 13, textAlign: "center" }}>○</span>}
                  <span className="hcg-mono" style={{ fontSize: 10, minWidth: 74 }}>{g.side}</span>
                  <span>{g.setName} — {g.chapterTitle}</span>
                </div>)}
              </div>
            </div>}
          </div>;
        })}
      </div>
    </div>)}

    <div className="hcg-tab mb-3" style={{ color: "var(--parchment-dim)" }}>SEALED — AWAITING THE OTHER SIDE</div>
    <div className="flex flex-col gap-2">
      {PENDING_WARS.map((w) => <div key={w.id} className="hcg-lockedcard rounded-lg p-4" style={{ opacity: .7 }}>
        <div className="flex items-center gap-2"><Lock size={13} color="#8b8371" />
          <span className="hcg-display" style={{ fontSize: 15 }}>{w.name}</span>
          <span className="hcg-mono" style={{ fontSize: 10, color: "var(--parchment-dim)" }}>{w.era}</span></div>
        <div style={{ fontSize: 13, color: "var(--parchment-dim)", marginTop: 5 }}>{w.blockedBy}</div>
      </div>)}
    </div>
  </div>;
}

/* ------------------------------ ATLAS -------------------------------- */
/* The brief asks for a spinnable globe. This is the same navigation
   model — pick a place, then scrub time — as a flat region map. A true
   3D globe is a presentation change on top of this data, not a
   different structure. */
const REGION_SHAPES = {
  "med-europe":   "M 300 128 L 356 118 L 392 132 L 400 156 L 372 176 L 322 172 L 296 152 Z",
  "north-africa": "M 268 176 L 372 178 L 400 196 L 392 246 L 300 250 L 258 214 Z",
  "west-asia":    "M 400 122 L 470 118 L 496 150 L 484 196 L 414 194 L 396 156 Z",
  "north-europe": "M 268 58 L 372 50 L 400 82 L 386 116 L 300 124 L 262 100 Z",
  "south-asia":   "M 496 150 L 560 152 L 578 190 L 548 232 L 500 208 L 486 176 Z",
  "east-asia":    "M 560 96 L 648 92 L 672 132 L 648 180 L 578 176 L 556 138 Z",
  "americas":     "M 60 96 L 140 88 L 164 140 L 140 232 L 84 236 L 52 168 Z",
};

function AtlasScreen({ save, onHome, onEnterSet }) {
  const [year, setYear] = useState(-250);
  const [region, setRegion] = useState(null);
  const open = unlockedSets(save.chaptersDone);
  const era = eraAt(year);
  const visible = setsAt(year, region);
  const regionProgress = useMemo(() => buildProgress(save, {}).regions, [save.chaptersDone]);

  return <div className="max-w-3xl mx-auto px-4 py-8 hcg-fade">
    <Crumbs items={[{ label: "Home", onClick: onHome }, { label: "Atlas" }]} />
    <h1 className="hcg-display mt-3 mb-1" style={{ fontSize: 26 }}>Atlas</h1>
    <p style={{ color: "var(--parchment-dim)", marginBottom: 18 }}>Pick a part of the world, then scrub time. Whatever was happening there and then appears below.</p>

    <div className="hcg-panel rounded-lg p-4 mb-5">
      <svg viewBox="0 0 720 280" style={{ width: "100%", height: "auto" }} role="img" aria-label="Region selector">
        <rect x="0" y="0" width="720" height="280" fill="#1B1710" rx="6" />
        {[...Array(9)].map((_, i) => <line key={i} x1="0" y1={i * 35} x2="720" y2={i * 35} stroke="#2B241B" strokeWidth="1" />)}
        {[...Array(21)].map((_, i) => <line key={i} x1={i * 36} y1="0" x2={i * 36} y2="280" stroke="#2B241B" strokeWidth="1" />)}
        {REGIONS.map((r) => {
          const sel = region === r.id;
          const touched = (regionProgress[r.id] || {}).done > 0;
          return <g key={r.id} onClick={() => setRegion(sel ? null : r.id)} style={{ cursor: "pointer" }}>
            <path d={REGION_SHAPES[r.id]} fill={sel ? "var(--bronze)" : touched ? "#4A3E2C" : "#2F281E"}
              stroke={sel ? "var(--gold-glow)" : "#4A4133"} strokeWidth={sel ? 2.5 : 1.5} />
          </g>;
        })}
        {REGIONS.map((r) => {
          const m = REGION_SHAPES[r.id].match(/M (\d+) (\d+)/);
          return <text key={r.id} x={Number(m[1]) + 34} y={Number(m[2]) + 46} fontFamily="Space Mono" fontSize="11"
            fill={region === r.id ? "#F6DE7C" : "#8b8371"} pointerEvents="none">{r.name}</text>;
        })}
      </svg>
      <div className="hcg-mono mt-2" style={{ fontSize: 11, color: "var(--parchment-dim)" }}>
        {region ? REGIONS.find((r) => r.id === region).blurb : "Showing every region — tap one to filter."}
      </div>
    </div>

    <div className="hcg-panel rounded-lg p-4 mb-6">
      <div className="flex items-baseline justify-between mb-3">
        <span className="hcg-display" style={{ fontSize: 20, color: "var(--gold-glow)" }}>{yearLabel(year)}</span>
        <span className="hcg-mono" style={{ fontSize: 11.5, color: "var(--parchment-dim)" }}>{era.name}</span>
      </div>
      <input type="range" min="-3000" max="2026" step="1" value={year} onChange={(e) => setYear(Number(e.target.value))}
        style={{ width: "100%", accentColor: "#D4AF37" }} aria-label="Year" />
      <div className="flex gap-1 mt-3 flex-wrap">
        {ERAS.map((e) => <button key={e.id} onClick={() => setYear(Math.round((e.from + e.to) / 2))}
          className="hcg-mono px-2 py-1 rounded" style={{ fontSize: 9.5,
            color: e.id === era.id ? "#1B1710" : "var(--parchment-dim)",
            background: e.id === era.id ? "var(--bronze-glow)" : "transparent",
            border: "1px solid var(--hair)" }}>{e.name}</button>)}
      </div>
    </div>

    <div className="hcg-tab mb-3" style={{ color: "var(--parchment-dim)" }}>
      {visible.length} {visible.length === 1 ? "SET" : "SETS"} COVER {yearLabel(year)}{region ? ` IN ${REGIONS.find((r) => r.id === region).name.toUpperCase()}` : ""}
    </div>
    {visible.length === 0 && <div className="hcg-panel-2 rounded-lg p-5 text-center" style={{ color: "var(--parchment-dim)", fontSize: 14 }}>
      Nothing covers this moment yet. The app currently runs from 814 BC to 27 BC around the Mediterranean; the rest of the map is scaffolding.
    </div>}
    <div className="flex flex-col gap-2">
      {visible.map((sid) => {
        const s = SETS[sid]; const a = SET_ATLAS[sid];
        const built = (CHAPTERS_BY_SET[sid] || []).length > 0;
        const isOpen = built && open[sid];
        const p = setProgress(sid, save.chaptersDone);
        return <button key={sid} disabled={!isOpen} onClick={() => isOpen && onEnterSet(sid)}
          className={`rounded-lg p-4 text-left flex items-center gap-3 ${isOpen ? "hcg-panel hover:brightness-110" : "hcg-lockedcard"}`}
          style={{ opacity: isOpen ? 1 : .62, cursor: isOpen ? "pointer" : "default" }}>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="hcg-display" style={{ fontSize: 15.5 }}>{s.name}</span>
              {!built && <span className="hcg-mono" style={{ fontSize: 9, color: "var(--parchment-dim)", border: "1px solid var(--hair)", borderRadius: 3, padding: "1px 5px" }}>PLANNED</span>}
              {built && !open[sid] && <span className="hcg-mono" style={{ fontSize: 9, color: "var(--parchment-dim)" }}>SEALED</span>}
            </div>
            <div className="hcg-mono" style={{ fontSize: 10.5, color: "var(--parchment-dim)", marginTop: 3 }}>
              {yearLabel(a.from)} – {yearLabel(a.to)}{built ? ` · ${p.done}/${p.total} chapters` : ""}
            </div>
          </div>
          {isOpen && <ChevRight size={16} color="var(--parchment-dim)" />}
        </button>;
      })}
    </div>
  </div>;
}

/* ----------------------------- PROGRESS ------------------------------ */
/* Not a path. Coverage: which centuries and which parts of the world you
   have actually been through, plus what it earned you. */
function ProgressScreen({ save, cards, onHome, onOpenChar }) {
  const p = buildProgress(save, cards);
  const CENT_FROM = -900, CENT_TO = 100;
  const centuries = [];
  for (let y = CENT_FROM; y < CENT_TO; y += 100) centuries.push(y);

  const recent = save.recentKeys.slice(-6).reverse();

  return <div className="max-w-3xl mx-auto px-4 py-8 hcg-fade">
    <Crumbs items={[{ label: "Home", onClick: onHome }, { label: "Progress" }]} />
    <h1 className="hcg-display mt-3 mb-1" style={{ fontSize: 26 }}>What you’ve learned</h1>
    <p style={{ color: "var(--parchment-dim)", marginBottom: 22 }}>
      No path and no streak. This is coverage — where in time and in the world you have actually been.
    </p>

    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
      {[["Chapters", `${p.chaptersDone}/${p.chaptersTotal}`], ["Key points", `${p.keyCount}`],
        ["Cards", `${p.cards}/${p.cardsTotal}`], ["Time read", `${Math.round(p.minutes / 60)}h ${p.minutes % 60}m`]].map(([l, v]) => (
        <div key={l} className="hcg-panel rounded-lg p-3 text-center">
          <div className="hcg-display" style={{ fontSize: 19, color: "var(--gold-glow)" }}>{v}</div>
          <div className="hcg-tab" style={{ color: "var(--parchment-dim)" }}>{l.toUpperCase()}</div>
        </div>))}
    </div>

    <div className="hcg-tab mb-2" style={{ color: "var(--parchment-dim)" }}>CENTURIES COVERED</div>
    <div className="hcg-panel rounded-lg p-4 mb-8">
      <div className="flex gap-1 items-end" style={{ height: 54 }}>
        {centuries.map((y) => {
          const lit = p.centuries[y];
          return <div key={y} title={yearLabel(y)} style={{ flex: 1, height: lit ? "100%" : "34%", borderRadius: 2,
            background: lit ? "linear-gradient(180deg, var(--gold-glow), var(--bronze))" : "#2B241B" }} />;
        })}
      </div>
      <div className="flex justify-between hcg-mono mt-2" style={{ fontSize: 10, color: "var(--parchment-dim)" }}>
        <span>900 BC</span><span>400 BC</span><span>AD 100</span>
      </div>
      <div style={{ fontSize: 13, color: "var(--parchment-dim)", marginTop: 8 }}>
        {p.earliest === null ? "Nothing covered yet — finish a chapter and this fills in."
          : `Your reading currently spans ${yearLabel(p.earliest)} to ${yearLabel(p.latest)}.`}
      </div>
    </div>

    <div className="hcg-tab mb-2" style={{ color: "var(--parchment-dim)" }}>THE WORLD</div>
    <div className="hcg-panel rounded-lg p-4 mb-8 flex flex-col gap-3">
      {REGIONS.map((r) => {
        const rr = p.regions[r.id];
        const pct = rr.total ? Math.round((rr.done / rr.total) * 100) : 0;
        return <div key={r.id} className="flex items-center gap-3">
          <div className="hcg-tab" style={{ width: 130, color: "var(--parchment-dim)" }}>{r.name}</div>
          <div className="flex-1"><Bar pct={pct} height={7} /></div>
          <div className="hcg-mono" style={{ width: 52, textAlign: "right", fontSize: 11, color: rr.total ? "var(--gold-glow)" : "var(--hair)" }}>
            {rr.total ? `${rr.done}/${rr.total}` : "—"}
          </div>
        </div>;
      })}
      <div style={{ fontSize: 12.5, color: "var(--parchment-dim)", fontStyle: "italic" }}>
        A dash means no chapters exist for that region yet.
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
      <div className="hcg-panel rounded-lg p-4">
        <div className="hcg-tab mb-3" style={{ color: "var(--parchment-dim)" }}>CARDS BY TIER</div>
        {["bronze", "silver", "gold"].map((t) => <div key={t} className="flex items-center gap-3 mb-2">
          <div className="hcg-tab" style={{ width: 54, color: TIER_GLOW[t] }}>{TIER_LABEL[t]}</div>
          <div className="flex-1"><Bar pct={(p.tiers[t] / p.cardsTotal) * 100} tone={t} height={7} /></div>
          <div className="hcg-mono" style={{ width: 22, textAlign: "right", fontSize: 12, color: TIER_GLOW[t] }}>{p.tiers[t]}</div>
        </div>)}
      </div>
      <div className="hcg-panel rounded-lg p-4">
        <div className="hcg-tab mb-3" style={{ color: "var(--parchment-dim)" }}>WARS</div>
        <div style={{ fontSize: 14, color: "var(--parchment-dim)", lineHeight: 1.8 }}>
          <div><b style={{ color: "var(--gold-glow)" }}>{p.warsOpen}</b> of {p.warsTotal} unlocked</div>
          <div><b style={{ color: "var(--gold-glow)" }}>{p.warsDone}</b> studied in full</div>
          <div style={{ fontSize: 12.5, marginTop: 6, fontStyle: "italic" }}>Wars open only when both sides have been studied up to the year they began.</div>
        </div>
      </div>
    </div>

    <div className="hcg-tab mb-2" style={{ color: "var(--parchment-dim)" }}>MOST RECENT KEY POINTS</div>
    <div className="flex flex-col gap-2">
      {recent.length ? recent.map((k, i) => <div key={i} className="hcg-panel-2 rounded p-3">
        <div style={{ fontSize: 14, lineHeight: 1.5 }}>{k.key}</div>
        <div className="hcg-mono" style={{ fontSize: 10, color: "var(--parchment-dim)", marginTop: 3 }}>{k.chapter} · {k.beat}</div>
      </div>) : <div className="hcg-panel-2 rounded p-4" style={{ color: "var(--parchment-dim)", fontSize: 14 }}>Nothing yet. Every part of a chapter ends with one.</div>}
    </div>
  </div>;
}
