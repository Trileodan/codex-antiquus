/* =====================================================================
   YEAR DROP

   The app's other exercise is multiple choice, which tests recognition.
   This tests recall, which is a different and harder thing: a year is
   put in front of you with no options and no prompt, and you say what
   you know.

   Nothing is marked. There is no way to mark it — the answer is
   whatever is in your head — and pretending otherwise would turn it
   back into a quiz. You answer, then you reveal, then you say honestly
   whether you had it. That self-report is what feeds the coins.

   Years are drawn only from chapters already finished, because the
   exercise is revision and being asked about something never studied is
   just a blank.
   ===================================================================== */

/* Which years can be asked about, and what each one is anchored to. */
function studiedYears(chaptersDone) {
  const out = [];
  for (const id of Object.keys(chaptersDone || {})) {
    if (!chaptersDone[id]) continue;
    const ch = CHAPTER_BY_ID[id], span = CHAPTER_SPANS[id];
    if (!ch || !span) continue;
    const [from, to] = span;
    /* A chapter covering four centuries is a poor question — "tell me
       about 2000 BC" when the chapter was about 2055 to 1650 is unfair.
       Wide chapters contribute their endpoints; narrow ones their middle. */
    const years = (to - from) > 120 ? [from, to] : [Math.round((from + to) / 2)];
    for (const y of years) out.push({ year: y, chapterId: id, title: ch.title, set: ch.set });
  }
  /* One entry per year, so a year covered by two chapters is not asked twice. */
  const byYear = {};
  for (const e of out) if (!byYear[e.year]) byYear[e.year] = e;
  return Object.values(byYear).sort((a, b) => a.year - b.year);
}

function YearDropScreen({ save, cards, onHome, onOpenChapter, onOpenChar }) {
  const pool = useMemo(() => studiedYears(save.chaptersDone), [save.chaptersDone]);
  const [n, setN] = useState(0);
  const [shown, setShown] = useState(false);
  const [note, setNote] = useState("");

  const pick = pool.length ? pool[n % pool.length] : null;
  const chapter = pick && CHAPTER_BY_ID[pick.chapterId];

  function next() {
    setShown(false); setNote("");
    setN(pool.length > 1 ? (n + 1 + Math.floor(Math.random() * (pool.length - 1))) % pool.length : 0);
  }

  if (!pool.length) return <div className="max-w-2xl mx-auto px-4 py-10 hcg-fade">
    <Crumbs items={[{ label: "Home", onClick: onHome }, { label: "Year Drop" }]} />
    <h1 className="hcg-display mt-3 mb-2" style={{ fontSize: 26 }}>Year Drop</h1>
    <p style={{ color: "var(--parchment-dim)", lineHeight: 1.7 }}>
      Finish a chapter first. Year Drop only asks about periods you have already read, because being asked
      about something you have never studied is not a test of anything.
    </p>
  </div>;

  /* The key points from that chapter are what the app knows; they are
     what gets revealed, in the order they were read. */
  const keys = (chapter.beats || []).map((b) => b.key).filter(Boolean);
  const world = worldAround(pick.year, null, 3);

  return <div className="max-w-2xl mx-auto px-4 py-8 hcg-fade">
    <Crumbs items={[{ label: "Home", onClick: onHome }, { label: "Year Drop" }]} />
    <h1 className="hcg-display mt-3 mb-1" style={{ fontSize: 26 }}>Year Drop</h1>
    <p style={{ color: "var(--parchment-dim)", marginBottom: 20, lineHeight: 1.65 }}>
      A year you have studied, with nothing attached to it. Say what you know — out loud, or in the box —
      before you look. Nothing here is marked, because the only person who can tell whether you had it is you.
    </p>

    <div className="hcg-panel rounded-lg p-6 text-center" style={{ borderColor: "var(--gold)" }}>
      <div className="hcg-tab" style={{ color: "var(--parchment-dim)" }}>TELL ME WHAT YOU KNOW</div>
      <div className="hcg-display" style={{ fontSize: 52, color: "var(--gold-glow)", lineHeight: 1.15, margin: "6px 0 2px" }}>
        {yearLabel(pick.year)}
      </div>
      <div className="hcg-mono" style={{ fontSize: 11, color: "var(--parchment-dim)" }}>
        {pool.length} year{pool.length === 1 ? "" : "s"} in your range
      </div>
    </div>

    {!shown && <div className="mt-4">
      <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={4}
        placeholder="Optional. Writing it down first makes it much harder to convince yourself afterwards that you knew."
        style={{ width: "100%", background: "var(--panel-2)", border: "1px solid var(--hair)", borderRadius: 6,
                 color: "var(--parchment)", padding: 12, fontSize: 15, lineHeight: 1.6, fontFamily: "inherit" }} />
      <button onClick={() => setShown(true)} className="hcg-btn mt-3 w-full px-4 py-3 rounded"
        style={{ background: "var(--bronze)", color: "#1B1710", fontSize: 14 }}>Show me</button>
    </div>}

    {shown && <div className="hcg-fade mt-5">
      <div className="hcg-tab mb-2" style={{ color: "var(--gold-glow)" }}>WHAT THIS YEAR SITS IN</div>
      <button onClick={() => onOpenChapter(chapter)} className="hcg-panel rounded-lg p-4 w-full text-left hover:brightness-110">
        <div className="hcg-mono" style={{ fontSize: 10.5, color: "var(--parchment-dim)" }}>{SETS[pick.set].name} · {chapter.era}</div>
        <div className="hcg-display" style={{ fontSize: 17, marginTop: 2 }}>{chapter.title}</div>
      </button>
      <div className="flex flex-col gap-2 mt-3">
        {keys.map((k, i) => <div key={i} className="hcg-panel-2 rounded p-3" style={{ fontSize: 14.5, lineHeight: 1.6 }}>{k}</div>)}
      </div>

      {world.length > 0 && <div className="mt-7">
        <div className="hcg-tab mb-1" style={{ color: "var(--verdigris)" }}>MEANWHILE</div>
        <p style={{ color: "var(--parchment-dim)", fontSize: 13.5, marginBottom: 10, lineHeight: 1.6 }}>
          Elsewhere in the world, around the same time. None of these people had heard of each other.
        </p>
        <div className="flex flex-col gap-2">
          {world.map((e, i) => <div key={i} className="rounded p-3" style={{ background: "var(--panel-2)", border: "1px solid var(--hair)" }}>
            <div className="hcg-mono flex items-center gap-2" style={{ fontSize: 10.5, color: "var(--verdigris)" }}>
              <span>{yearLabel(e.year)}</span><span style={{ color: "var(--hair)" }}>·</span><span>{e.region.toUpperCase()}</span>
              {e.gap > 0 && <span style={{ color: "var(--parchment-dim)" }}>{e.gap} year{e.gap === 1 ? "" : "s"} {e.year > pick.year ? "later" : "earlier"}</span>}
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
