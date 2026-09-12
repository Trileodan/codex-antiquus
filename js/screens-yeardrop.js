/* =====================================================================
   YEAR DROP

   Brief sections 3 and 4. The checkpoints test recognition, which is
   the easy half. This tests orientation: a year, with nothing attached
   to it, and the question "what do you know?"

   The important rule from the brief, and the thing this got wrong
   first time round: the year does NOT have to be one you were taught.
   215 BC is a good question precisely because nothing happened in it
   that this app covers. A good answer is

       "Cannae was 216, so this is a year after. Hannibal should still
        be loose in southern Italy. Qin unified China in 221, so that
        is about six years old."

   which names nothing from 215 BC at all and is exactly the reasoning
   the app exists to build. So the pool is years NEAR what you have
   studied rather than years in it, and the reveal shows the anchors on
   either side rather than a single chapter.

   Nothing is scored. There is no way to score it — the answer is
   whatever is in your head — and pretending otherwise would turn it
   back into a quiz.
   ===================================================================== */

/* Every year the app can say something about, with what it is anchored
   to. Wide chapters contribute their endpoints, narrow ones their middle. */
function anchorYears(chaptersDone) {
  const out = [];
  for (const id of Object.keys(chaptersDone || {})) {
    if (!chaptersDone[id]) continue;
    const ch = CHAPTER_BY_ID[id], span = CHAPTER_SPANS[id];
    if (!ch || !span) continue;
    const [from, to] = span;
    const years = (to - from) > 120 ? [from, to] : [Math.round((from + to) / 2)];
    for (const y of years) out.push({ year: y, chapterId: id, title: ch.title, set: ch.set, era: ch.era });
  }
  const byYear = {};
  for (const e of out) if (!byYear[e.year]) byYear[e.year] = e;
  return Object.values(byYear).sort((a, b) => a.year - b.year);
}

/* ---------------------------------------------------------------------
   Picking the year.

   The first version of this picked one of the anchors above and then
   drifted a few years off it, which sounds reasonable and is badly
   broken in practice. Anchors come from chapter spans, a narrow chapter
   contributes only its midpoint, and the very first chapter most
   readers finish is the founding of Carthage — span 814 to 800 BC,
   midpoint 807. With three or four chapters done the whole pool is
   three or four numbers, two of which are within fifteen years of each
   other, so Year Drop opened on "807ish" again and again.

   So the pool is no longer a handful of points. It is every year inside
   everything you have studied, plus a margin at each end, merged into
   continuous ranges and sampled uniformly by length. Study one chapter
   and you get a small window; study thirty and you get most of three
   thousand years. Recent draws are held off so the same stretch does
   not come up twice running.
   --------------------------------------------------------------------- */

const DROP_MARGIN = 25;   /* years either side of a studied span that are still fair game */
const DROP_MEMORY = 6;    /* how many recent years to remember */
const DROP_APART  = 12;   /* how far a new year must be from a remembered one */
const DROP_RECENT_KEY = "codex-antiquus-yeardrop-recent";

/* Every year the reader could reasonably be asked about, as merged
   ranges. The margin is what makes an untaught year askable: finish the
   chapter covering 218–216 BC and 215 BC comes into range, which is
   exactly the question the brief wants asked. */
function studiedRanges(chaptersDone) {
  const spans = [];
  for (const id of Object.keys(chaptersDone || {})) {
    if (!chaptersDone[id]) continue;
    const s = CHAPTER_SPANS[id];
    if (!s) continue;
    spans.push([s[0] - DROP_MARGIN, s[1] + DROP_MARGIN]);
  }
  spans.sort((a, b) => a[0] - b[0]);
  const merged = [];
  for (const s of spans) {
    const last = merged[merged.length - 1];
    if (last && s[0] <= last[1] + 1) last[1] = Math.max(last[1], s[1]);
    else merged.push([s[0], s[1]]);
  }
  return merged;
}

/* Uniform across the union of the ranges, weighted by length, so a long
   studied stretch is proportionally more likely than a short one. There
   is no year zero, so it is skipped. */
function pickYear(ranges, r) {
  const total = ranges.reduce((n, [a, b]) => n + (b - a + 1), 0);
  if (!total) return null;
  let t = Math.floor(r() * total);
  for (const [a, b] of ranges) {
    const len = b - a + 1;
    if (t < len) { const y = a + t; return y === 0 ? 1 : y; }
    t -= len;
  }
  const [a] = ranges[ranges.length - 1];
  return a;
}

function loadRecent() {
  try { const v = JSON.parse(window.localStorage.getItem(DROP_RECENT_KEY) || "[]"); return Array.isArray(v) ? v : []; }
  catch (e) { return []; }
}
function pushRecent(year) {
  try {
    const v = [year, ...loadRecent().filter((y) => y !== year)].slice(0, DROP_MEMORY);
    window.localStorage.setItem(DROP_RECENT_KEY, JSON.stringify(v));
  } catch (e) { /* private mode: the in-memory list still works for this session */ }
}

/* Rejection sampling. If the reader has studied so little that every
   year in range is close to a recent one, the first draw is used rather
   than looping forever — a repeat beats a blank screen. */
function dropYear(ranges, recent, rnd) {
  const r = rnd || Math.random;
  if (!ranges.length) return null;
  const avoid = recent || [];
  let first = null;
  for (let i = 0; i < 60; i++) {
    const y = pickYear(ranges, r);
    if (y === null) return null;
    if (first === null) first = y;
    if (!avoid.some((p) => Math.abs(p - y) < DROP_APART)) return y;
  }
  return first;
}

/* What the app can offer as orientation: the nearest thing before and
   the nearest thing after. */
function anchorsAround(year, anchors) {
  const before = [...anchors].filter((a) => a.year <= year).sort((a, b) => b.year - a.year)[0] || null;
  const after = [...anchors].filter((a) => a.year > year).sort((a, b) => a.year - b.year)[0] || null;
  return { before, after };
}

const DROP_PROMPTS = [
  "What has just happened?",
  "Who is alive?",
  "What has not happened yet?",
  "What is happening in Rome?",
  "What is happening in China?",
  "Which empire controls Egypt?",
  "Is anybody at war?",
  "What would somebody here be worried about?",
];

function YearDropScreen({ save, cards, onHome, onOpenChapter, onOpenChar }) {
  const anchors = useMemo(() => anchorYears(save.chaptersDone), [save.chaptersDone]);
  const ranges  = useMemo(() => studiedRanges(save.chaptersDone), [save.chaptersDone]);
  const [seed, setSeed] = useState(0);
  const [shown, setShown] = useState(false);
  const [note, setNote] = useState("");

  const year = useMemo(() => {
    if (!ranges.length) return null;
    const y = dropYear(ranges, loadRecent());
    if (y !== null) pushRecent(y);
    return y;
  }, [ranges, seed]);
  const prompts = useMemo(() => {
    const p = [...DROP_PROMPTS].sort(() => Math.random() - 0.5).slice(0, 3);
    return p;
  }, [seed]);

  function next() { setShown(false); setNote(""); setSeed(seed + 1); }

  if (!anchors.length || year === null) return <div className="max-w-2xl mx-auto px-4 py-10 hcg-fade">
    <Crumbs items={[{ label: "Home", onClick: onHome }, { label: "Year Drop" }]} />
    <h1 className="hcg-display mt-3 mb-2" style={{ fontSize: 26 }}>Year Drop</h1>
    <p style={{ color: "var(--parchment-dim)", lineHeight: 1.7 }}>
      Finish a chapter first. Year Drop works by dropping you somewhere near what you already know and asking
      you to find your feet — which needs somewhere to reason from.
    </p>
  </div>;

  const { before, after } = anchorsAround(year, anchors);
  const world = worldAround(year, null, 3);
  const exact = anchors.find((a) => a.year === year);

  return <div className="max-w-2xl mx-auto px-4 py-8 hcg-fade">
    <Crumbs items={[{ label: "Home", onClick: onHome }, { label: "Year Drop" }]} />
    <h1 className="hcg-display mt-3 mb-1" style={{ fontSize: 26 }}>Year Drop</h1>
    <p style={{ color: "var(--parchment-dim)", marginBottom: 20, lineHeight: 1.7 }}>
      A year, with nothing attached to it. It is often <b style={{ color: "var(--gold-glow)" }}>not</b> a year you
      were taught — that is deliberate. Getting your bearings from the years either side is the skill; naming
      an event that happened in this exact year is not.
    </p>

    <div className="hcg-panel rounded-lg p-6 text-center" style={{ borderColor: "var(--gold)" }}>
      <div className="hcg-tab" style={{ color: "var(--parchment-dim)" }}>TELL ME WHAT YOU KNOW</div>
      <div className="hcg-display" style={{ fontSize: 52, color: "var(--gold-glow)", lineHeight: 1.15, margin: "6px 0 2px" }}>
        {yearLabel(year)}
      </div>
      <div className="hcg-mono" style={{ fontSize: 11, color: "var(--parchment-dim)" }}>
        {exact ? "you have studied this year directly" : "you have not been taught this year — work it out"}
      </div>
    </div>

    {!shown && <div className="mt-4">
      <div className="hcg-panel-2 rounded p-3 mb-3">
        <div className="hcg-tab mb-2" style={{ color: "var(--parchment-dim)" }}>THINGS TO ASK YOURSELF</div>
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14.5, lineHeight: 1.8, color: "#DFD3B9" }}>
          {prompts.map((p, i) => <li key={i}>{p}</li>)}
        </ul>
      </div>
      <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={4}
        placeholder="Optional. Writing it down first makes it much harder to convince yourself afterwards that you knew."
        style={{ width: "100%", background: "var(--panel-2)", border: "1px solid var(--hair)", borderRadius: 6,
                 color: "var(--parchment)", padding: 12, fontSize: 15, lineHeight: 1.6, fontFamily: "inherit" }} />
      <button onClick={() => setShown(true)} className="hcg-btn mt-3 w-full px-4 py-3 rounded"
        style={{ background: "var(--bronze)", color: "#1B1710", fontSize: 14 }}>Show me the anchors</button>
    </div>}

    {shown && <div className="hcg-fade mt-5">
      <div className="hcg-tab mb-2" style={{ color: "var(--gold-glow)" }}>WHERE YOU ARE</div>
      <div className="flex flex-col gap-2">
        {before && <AnchorRow a={before} year={year} side="before" onOpenChapter={onOpenChapter} />}
        {!before && <div className="hcg-panel-2 rounded p-3" style={{ fontSize: 14, color: "var(--parchment-dim)" }}>
          Nothing you have studied comes before this. You are at the edge of your own map.
        </div>}
        {after && <AnchorRow a={after} year={year} side="after" onOpenChapter={onOpenChapter} />}
        {!after && <div className="hcg-panel-2 rounded p-3" style={{ fontSize: 14, color: "var(--parchment-dim)" }}>
          Nothing you have studied comes after this — this is the far end of what you know.
        </div>}
      </div>

      {/* The model answer is the whole teaching point: it names nothing
          from the year in question and is still a good answer. It needs
          only ONE anchor to be worth showing — requiring both meant it
          vanished at the edges of what the reader knows, which is
          exactly where they most need to see how the reasoning goes. */}
      {(before || after) && <div className="hcg-mono" style={{ fontSize: 12, color: "var(--parchment-dim)", marginTop: 10, lineHeight: 1.7 }}>
        A good answer sounds like: <span style={{ color: "#DFD3B9" }}>
          {before && before.year === year
            ? `"This is the year of ${before.title.toLowerCase()}`
            : before
              ? `"${before.title} was ${yearLabel(before.year)}, so this is ${Math.abs(year - before.year)} year${Math.abs(year - before.year) === 1 ? "" : "s"} after that`
              : `"${after.title} is ${Math.abs(after.year - year)} year${Math.abs(after.year - year) === 1 ? "" : "s"} away and has not happened yet`}
          {before && after ? ` — and ${after.title.toLowerCase()} has not happened yet."` : `."`}
        </span> Naming nothing from this exact year is fine — that is the point.
      </div>}

      {world.length > 0 && <div className="mt-7">
        <div className="hcg-tab mb-1" style={{ color: "var(--verdigris)" }}>MEANWHILE</div>
        <p style={{ color: "var(--parchment-dim)", fontSize: 13.5, marginBottom: 10, lineHeight: 1.6 }}>
          Elsewhere in the world, around the same time. None of these people had heard of each other.
        </p>
        <div className="flex flex-col gap-2">
          {world.map((e, i) => <div key={i} className="rounded p-3" style={{ background: "var(--panel-2)", border: "1px solid var(--hair)" }}>
            <div className="hcg-mono flex items-center gap-2 flex-wrap" style={{ fontSize: 10.5, color: "var(--verdigris)" }}>
              <span>{yearLabel(e.year)}</span><span style={{ color: "var(--hair)" }}>·</span><span>{e.region.toUpperCase()}</span>
              {e.gap > 0 && <span style={{ color: "var(--parchment-dim)" }}>{e.gap} year{e.gap === 1 ? "" : "s"} {e.year > year ? "later" : "earlier"}</span>}
            </div>
            <div style={{ fontSize: 14.5, lineHeight: 1.6, marginTop: 3 }}>{e.what}</div>
          </div>)}
        </div>
      </div>}

      <div className="flex gap-2 mt-6">
        <button onClick={next} className="hcg-btn flex-1 px-4 py-3 rounded" style={{ background: "var(--bronze)", color: "#1B1710", fontSize: 14 }}>Another year</button>
        <button onClick={onHome} className="hcg-btn px-4 py-3 rounded" style={{ border: "1px solid var(--hair)", color: "var(--parchment-dim)", fontSize: 13 }}>Done</button>
      </div>
    </div>}
  </div>;
}

function AnchorRow({ a, year, side, onOpenChapter }) {
  const ch = CHAPTER_BY_ID[a.chapterId];
  const gap = Math.abs(a.year - year);
  return <button onClick={() => onOpenChapter(ch)} className="hcg-panel rounded-lg p-4 w-full text-left hover:brightness-110">
    <div className="hcg-mono flex items-center gap-2 flex-wrap" style={{ fontSize: 10.5, color: "var(--parchment-dim)" }}>
      <span style={{ color: "var(--gold-glow)" }}>{yearLabel(a.year)}</span>
      <span style={{ color: "var(--hair)" }}>·</span>
      <span>{gap === 0 ? "this very year" : `${gap} year${gap === 1 ? "" : "s"} ${side === "before" ? "earlier" : "later"}`}</span>
      <span style={{ color: "var(--hair)" }}>·</span>
      <span>{SETS[a.set] ? SETS[a.set].name : "Crossings"}</span>
    </div>
    <div className="hcg-display" style={{ fontSize: 17, marginTop: 3 }}>{a.title}</div>
    {ch && (ch.beats || [])[0] && (ch.beats[0].key) &&
      <div style={{ fontSize: 13.5, color: "var(--parchment-dim)", lineHeight: 1.6, marginTop: 5 }}>{ch.beats[0].key}</div>}
  </button>;
}
