/* =====================================================================
   PEOPLE — the fourth lens

   Master Brief v3 §1: "People — character pages that assemble a person's
   life from linked canonical events."

   The important word is ASSEMBLE. §2 is explicit that a person page must
   "link into Set and Campaign segments, not maintain separate
   contradictory retellings", and §0 forbids new Claude prose. So there
   is no biography written here. Every line on a person page already
   exists somewhere else in the app:

     the life overview   the coin's own tier text
     the sequence        the chapters that teach them, in date order
     the relationships   the coin's connections
     the uncertainties   the coin's claims, with their classifications

   A Campaign follows a story and a Set follows a civilisation. This
   follows one person through both, which is the one view neither of the
   others can give — and it needs no new history to do it.
   ===================================================================== */

/* Everyone the app can build a page for: a person coin with somewhere to
   put them in time. */
function peopleList() {
  return Object.keys(CHARACTERS)
    .filter((id) => (CHARACTERS[id].kind || "person") === "person")
    .map((id) => CHARACTERS[id])
    .sort((a, b) => {
      const ay = a.timeline ? a.timeline.year : 9999;
      const by = b.timeline ? b.timeline.year : 9999;
      return ay - by;
    });
}

/* The chapters that teach this person, in the order they happened —
   which is the person's life as the app actually holds it. */
function lifeSequence(c) {
  return coinChapters(c)
    .map((id) => ({ ch: CHAPTER_BY_ID[id], span: CHAPTER_SPANS[id] || [0, 0] }))
    .filter((x) => x.ch)
    .sort((a, b) => a.span[0] - b.span[0]);
}

function PeopleScreen({ save, cards, onHome, onOpenPerson }) {
  const [q, setQ] = useState("");
  const people = useMemo(peopleList, []);
  const shown = people.filter((c) => !q.trim() || c.name.toLowerCase().includes(q.trim().toLowerCase()));
  const met = shown.filter((c) => cards[c.id]);
  const unmet = shown.filter((c) => !cards[c.id]);

  return <div className="max-w-2xl mx-auto px-4 py-8 hcg-fade">
    <h1 className="hcg-display mb-1" style={{ fontSize: 26 }}>People</h1>
    <p style={{ color: "var(--parchment-dim)", marginBottom: 16, lineHeight: 1.7 }}>
      One person, followed through every Set and Campaign they appear in. A Campaign follows a story;
      this follows a life across all of them.
    </p>

    <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name"
      style={{ width: "100%", background: "var(--panel-2)", border: "1px solid var(--hair)", borderRadius: 6,
               color: "var(--parchment)", padding: "10px 12px", fontSize: 15, marginBottom: 16, fontFamily: "inherit" }} />

    {met.length > 0 && <>
      <div className="hcg-tab mb-2" style={{ color: "var(--gold-glow)" }}>MET · {met.length}</div>
      <div className="flex flex-col gap-1.5 mb-6">
        {met.map((c) => <PersonRow key={c.id} c={c} tier={cards[c.id]} onOpen={onOpenPerson} />)}
      </div>
    </>}

    {unmet.length > 0 && <>
      <div className="hcg-tab mb-2" style={{ color: "var(--parchment-dim)" }}>NOT YET MET · {unmet.length}</div>
      <div className="flex flex-col gap-1.5">
        {unmet.map((c) => <PersonRow key={c.id} c={c} tier={null} onOpen={onOpenPerson} />)}
      </div>
    </>}
  </div>;
}

function PersonRow({ c, tier, onOpen }) {
  return <button onClick={() => onOpen(c.id)} disabled={!tier}
    className={`rounded px-3 py-2.5 text-left flex items-center gap-3 ${tier ? "hcg-panel-2 hover:brightness-110" : ""}`}
    style={{ border: "1px solid var(--hair)", opacity: tier ? 1 : .5, cursor: tier ? "pointer" : "default" }}>
    <Coin tier={tier} size={26} />
    <span className="flex-1 min-w-0">
      <span style={{ fontSize: 14.5 }}>{tier ? c.name : "? ? ?"}</span>
      {tier && <span className="hcg-mono" style={{ fontSize: 10.5, color: "var(--parchment-dim)", marginLeft: 8 }}>{c.years}</span>}
    </span>
    {tier && <span className="hcg-mono" style={{ fontSize: 10, color: "var(--parchment-dim)" }}>
      {(c.sets || []).length > 1 ? `${c.sets.length} SETS` : ""}</span>}
  </button>;
}

function PersonScreen({ personId, save, cards, onBack, onOpenChapter, onOpenChar }) {
  const c = CHARACTERS[personId];
  const tier = cards[personId] || null;
  const st = coinState(c, save.chaptersDone, save);
  const life = useMemo(() => lifeSequence(c), [personId]);
  if (!c) return null;

  const visibleClaims = tier ? (c.claims || []).filter((cl) => TIER_RANK[cl.at] <= TIER_RANK[tier]) : [];
  const uncertain = visibleClaims.filter((cl) =>
    ["Contested", "Interpretation", "Traditional / Legendary", "Unknown"].includes(cl.classification));

  return <div className="max-w-2xl mx-auto px-4 py-8 hcg-fade">
    <Crumbs items={[{ label: "People", onClick: onBack }, { label: c.name }]} />

    <div className="flex items-start gap-4 mt-3 mb-4">
      <Coin tier={tier} size={56} />
      <div className="flex-1 min-w-0">
        <h1 className="hcg-display" style={{ fontSize: 24 }}>{c.name}</h1>
        <div className="hcg-mono" style={{ fontSize: 11.5, color: "var(--parchment-dim)", marginTop: 2 }}>
          {c.years}{st ? ` · ${st.studied} of ${st.total} entries read` : ""}
        </div>
        {c.timeline && <div style={{ fontSize: 14, color: "var(--gold-glow)", marginTop: 6, lineHeight: 1.5 }}>
          {yearLabel(c.timeline.year)} — {c.timeline.label}
        </div>}
      </div>
    </div>

    {/* The life overview is the coin's own tier text, not a second biography. */}
    {tier && c.tiers[tier] && <div className="hcg-panel rounded-lg p-4 mb-5">
      <div className="hcg-tab mb-1" style={{ color: "var(--gold-glow)" }}>{c.tiers[tier].label.toUpperCase()}</div>
      <p style={{ lineHeight: 1.7, color: "#DFD3B9", fontSize: 14.5 }}>{c.tiers[tier].blurb}</p>
    </div>}

    <div className="hcg-tab mb-2" style={{ color: "var(--parchment-dim)" }}>THE LIFE, IN ORDER</div>
    <p style={{ fontSize: 13, color: "var(--parchment-dim)", marginBottom: 10, lineHeight: 1.6 }}>
      Every entry in the app that teaches this person, earliest first. They are the same entries as in their Sets —
      one copy, read from a different angle.
    </p>
    <div className="flex flex-col gap-1.5 mb-6">
      {life.map(({ ch, span }) => {
        const done = !!save.chaptersDone[ch.id];
        return <button key={ch.id} onClick={() => onOpenChapter(ch)}
          className="hcg-panel-2 rounded px-3 py-2.5 text-left flex items-center gap-3 hover:brightness-110">
          <span className="hcg-mono" style={{ fontSize: 10.5, color: done ? "var(--verdigris)" : "var(--parchment-dim)", minWidth: 64 }}>
            {yearLabel(span[0])}
          </span>
          <span className="flex-1 min-w-0" style={{ fontSize: 14 }}>{ch.title}</span>
          <span className="hcg-mono" style={{ fontSize: 9.5, color: "var(--parchment-dim)" }}>
            {SETS[ch.set] ? SETS[ch.set].name : "Crossings"}</span>
        </button>;
      })}
    </div>

    {(c.connections || []).length > 0 && <>
      <div className="hcg-tab mb-2" style={{ color: "var(--parchment-dim)" }}>CONNECTED TO</div>
      <div className="flex flex-wrap gap-1.5 mb-6">
        {c.connections.map((cn, i) => {
          const other = cn.charId && CHARACTERS[cn.charId];
          const open = other && cards[cn.charId];
          return <button key={i} onClick={() => open && onOpenChar(cn.charId)} disabled={!open}
            className="hcg-mono rounded px-2 py-1" style={{
              fontSize: 11, border: "1px solid var(--hair)",
              color: open ? "var(--gold-glow)" : "var(--parchment-dim)", cursor: open ? "pointer" : "default" }}>
            {other ? other.name : cn.name}{cn.relation ? ` · ${cn.relation}` : ""}
          </button>;
        })}
      </div>
    </>}

    {/* The myths and uncertainties panel §7 asks for — assembled from the
        claims this coin already carries, filtered to the ones that are
        not settled. Nothing new is asserted. */}
    {uncertain.length > 0 && <>
      <div className="hcg-tab mb-2" style={{ color: "var(--rust, var(--bronze-glow))" }}>WHAT IS NOT SETTLED</div>
      <div className="flex flex-col gap-2 mb-6">
        {uncertain.map((cl, i) => <div key={i} className="hcg-panel-2 rounded p-3">
          <div className="hcg-mono mb-1" style={{ fontSize: 10, color: CLASS_COLOR[cl.classification] || "var(--parchment-dim)" }}>
            {cl.classification.toUpperCase()}{cl.date ? ` · ${cl.date}` : ""}
          </div>
          <div style={{ fontSize: 14, lineHeight: 1.6 }}>{cl.text}</div>
        </div>)}
      </div>
    </>}

    {!tier && <div className="hcg-panel-2 rounded p-4" style={{ color: "var(--parchment-dim)", lineHeight: 1.7 }}>
      You have not met this person yet. Their page fills in as you read the entries above.
    </div>}
  </div>;
}
