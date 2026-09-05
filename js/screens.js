/* =========================== SCREENS ================================ */

/* ======================= WHERE TO BEGIN ============================= */
/* Shown once, from a blank save. History has no single starting point,
   so the app stopped pretending Rome was it. Every foundation Set opens
   on its own terms; picking one grants its patron at Bronze. */

function BeginScreen({ onChoose }) {
  const foundations = Object.keys(SETS).filter((id) => SETS[id].foundation && (CHAPTERS_BY_SET[id] || []).length);

  return <div className="max-w-3xl mx-auto px-4 py-10 hcg-fade">
    <div className="hcg-tab mb-2" style={{ color: "var(--bronze-glow)" }}>BEGIN</div>
    <h1 className="hcg-display mb-2" style={{ fontSize: 28 }}>Whose side are you on?</h1>
    <p style={{ color: "var(--parchment-dim)", marginBottom: 6, maxWidth: "44rem" }}>
      Pick the society you want to start with. This is not a difficulty setting and it closes nothing off —
      every one of these stands on its own, and you can open any of the others whenever you like.
    </p>
    <p style={{ color: "var(--parchment-dim)", marginBottom: 22, maxWidth: "44rem" }}>
      What it does decide is <i>whose account you hear first</i>, which in this period matters more than it sounds.
      Read Carthage before Rome and the Punic Wars are a different story.
    </p>

    <div className="flex flex-col gap-3">
      {foundations.map((id) => {
        const s = SETS[id], a = SET_ATLAS[id], p = CHARACTERS[s.patron];
        const n = (CHAPTERS_BY_SET[id] || []).length;
        return <button key={id} onClick={() => onChoose(id)}
          className="hcg-panel rounded-lg p-5 text-left hover:brightness-110">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="hcg-display" style={{ fontSize: 19 }}>{s.name}</span>
            <span className="hcg-mono" style={{ fontSize: 10, color: "var(--parchment-dim)" }}>
              {yearLabel(a.from)} – {yearLabel(a.to)} · {n} chapters
            </span>
          </div>
          <div style={{ fontSize: 14, color: "var(--parchment-dim)", marginTop: 4 }}>{s.tagline}</div>
          <div className="flex items-center gap-2.5 mt-3.5">
            <Medallion tier="bronze" label={initials(p.name)} size={34} mythic={p.mythic} />
            <div>
              <div className="hcg-mono" style={{ fontSize: 9, color: "var(--bronze-glow)" }}>YOUR PATRON</div>
              <div style={{ fontSize: 14 }}>{p.name} <span style={{ color: "var(--parchment-dim)" }}>joins you at Bronze</span></div>
            </div>
            <ChevRight size={16} color="var(--parchment-dim)" style={{ marginLeft: "auto" }} />
          </div>
        </button>;
      })}
    </div>

    <p className="hcg-mono" style={{ fontSize: 10.5, color: "var(--parchment-dim)", marginTop: 20 }}>
      Wars stay sealed until you have studied both sides, whichever order you meet them in.
    </p>
  </div>;
}



function ResumeRibbon({ save, onResume }) {
  if (!save.bookmark) return null;
  const ch = CHAPTER_BY_ID[save.bookmark.chapterId];
  return <button onClick={onResume} className="hcg-panel w-full rounded-lg p-4 flex items-center gap-3 text-left hover:brightness-110 mb-6" style={{ borderColor: "var(--bronze)" }}>
    <BookmarkIcon size={20} filled color="var(--gold-glow)" />
    <div className="flex-1 min-w-0">
      <div className="hcg-tab" style={{ color: "var(--gold-glow)" }}>BOOKMARKED</div>
      <div style={{ fontSize: 15 }}>{ch.title}</div>
      <div className="hcg-mono" style={{ fontSize: 11, color: "var(--parchment-dim)" }}>{SETS[ch.set].name} · part {save.bookmark.beatIndex + 1} of {ch.beats.length}</div>
    </div>
    <ChevRight size={18} color="var(--parchment-dim)" />
  </button>;
}

function HomeScreen({ save, cards, onEnterWorld, onResume, onCollection, onWars, onAtlas, onProgress }) {
  const nav = { warsOpen: WAR_CHAPTERS.filter((w) => warGate(w, save.chaptersDone).open).length };
  const world = WORLDS[0];
  const open = unlockedSets(save.chaptersDone);
  const chaptersDoneCount = Object.keys(save.chaptersDone).length;
  const totalChapters = CHAPTERS.length;
  const cardCount = Object.keys(cards).length;
  const golds = Object.values(cards).filter((t) => t === "gold").length;
  return <div className="max-w-3xl mx-auto px-4 py-10 hcg-fade">
    <div className="text-center mb-9">
      <div className="hcg-tab" style={{ color: "var(--bronze-glow)", marginBottom: 8 }}>A HISTORY LEARNING &amp; COLLECTIBLE CARD GAME</div>
      <h1 className="hcg-display" style={{ fontSize: 34 }}>Codex Antiquus</h1>
      <p style={{ color: "var(--parchment-dim)", marginTop: 8, maxWidth: 520, marginLeft: "auto", marginRight: "auto" }}>
        Work through history in short chapters. Cards are struck from what you finish and can prove — never from a name you skimmed past.
      </p>
    </div>

    <ResumeRibbon save={save} onResume={onResume} />

    <div className="grid grid-cols-3 gap-3 mb-8">
      {[["Chapters", `${chaptersDoneCount} / ${totalChapters}`], ["Cards", `${cardCount} / ${ALL_CHARACTER_IDS.length}`], ["Gold", `${golds}`]].map(([l, v]) => (
        <div key={l} className="hcg-panel rounded-lg p-3 text-center">
          <div className="hcg-display" style={{ fontSize: 20, color: "var(--gold-glow)" }}>{v}</div>
          <div className="hcg-tab" style={{ color: "var(--parchment-dim)" }}>{l.toUpperCase()}</div>
        </div>))}
    </div>

    <div className="hcg-tab mb-3" style={{ color: "var(--parchment-dim)" }}>WORLDS</div>
    <div className="flex flex-col gap-3 mb-6">
      {WORLDS.map((w) => {
        const active = w.status === "active";
        const setsOpen = active ? w.sets.filter((s) => open[s] && (CHAPTERS_BY_SET[s] || []).length).length : 0;
        return <button key={w.id} disabled={!active} onClick={onEnterWorld}
          className={`text-left rounded-lg p-5 flex items-center gap-4 ${active ? "hcg-panel hover:brightness-110" : "hcg-lockedcard"}`}
          style={{ opacity: active ? 1 : .5, cursor: active ? "pointer" : "default" }}>
          <div style={{ width: 44, height: 44, borderRadius: 999, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
            background: active ? "radial-gradient(circle at 34% 28%, var(--gold-glow), var(--bronze))" : "var(--locked)" }}>
            {!active && <Lock size={17} color="#8b8371" />}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap"><span className="hcg-display" style={{ fontSize: 17 }}>{w.name}</span>
              {!active && <span className="hcg-mono" style={{ fontSize: 9.5, color: "var(--parchment-dim)" }}>FUTURE WORLD</span>}</div>
            <div style={{ fontSize: 13.5, color: "var(--parchment-dim)", marginTop: 2 }}>{w.blurb}</div>
            {active && <div className="hcg-mono" style={{ fontSize: 11.5, color: "var(--gold-glow)", marginTop: 6 }}>{setsOpen} Sets open · {w.sets.length} mapped</div>}
          </div>
          {active && <ChevRight size={20} color="var(--parchment-dim)" />}
        </button>;
      })}
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {[[SwordsIcon, "Crossings", `${nav.warsOpen} of ${WAR_CHAPTERS.length} unlocked`, onWars],
        [MapIcon, "Atlas", "Navigate by place and year", onAtlas],
        [ChartIcon, "Progress", "What you've covered so far", onProgress],
        [LayersIcon, "Collection", "Every card, earned and unearned", onCollection]].map(([Icon, label, sub, fn]) => (
        <button key={label} onClick={fn} className="hcg-panel rounded-lg p-4 flex items-center gap-3 hover:brightness-110">
          <Icon size={18} color="var(--gold-glow)" />
          <div className="flex-1 text-left"><div style={{ fontSize: 15 }}>{label}</div>
            <div className="hcg-mono" style={{ fontSize: 11, color: "var(--parchment-dim)" }}>{sub}</div></div>
          <ChevRight size={18} color="var(--parchment-dim)" />
        </button>))}
    </div>
  </div>;
}

function WorldScreen({ save, onHome, onEnterSet, onResume }) {
  const world = WORLDS[0];
  const open = unlockedSets(save.chaptersDone);
  return <div className="max-w-3xl mx-auto px-4 py-8 hcg-fade">
    <Crumbs items={[{ label: "Home", onClick: onHome }, { label: world.name }]} />
    <h1 className="hcg-display mt-3 mb-1" style={{ fontSize: 26 }}>{world.name}</h1>
    <p style={{ color: "var(--parchment-dim)", marginBottom: 20 }}>{world.blurb}</p>
    <ResumeRibbon save={save} onResume={onResume} />
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {world.sets.map((sid) => {
        const set = SETS[sid]; const isOpen = !!open[sid]; const p = setProgress(sid, save.chaptersDone);
        const hasContent = (CHAPTERS_BY_SET[sid] || []).length > 0;
        const clickable = isOpen && hasContent;
        return <button key={sid} disabled={!clickable} onClick={() => clickable && onEnterSet(sid)}
          className={`text-left rounded-lg p-4 ${clickable ? "hcg-panel hover:brightness-110" : "hcg-lockedcard"}`}
          style={{ opacity: clickable ? 1 : .62, cursor: clickable ? "pointer" : "default" }}>
          <div className="flex items-center justify-between gap-2">
            <span className="hcg-display" style={{ fontSize: 16 }}>{set.name}</span>
            {!isOpen && <Lock size={14} color="#8b8371" />}
            {isOpen && !hasContent && <span className="hcg-mono" style={{ fontSize: 9, color: "var(--verdigris)" }}>OPENED</span>}
          </div>
          <div style={{ fontSize: 13, color: "var(--parchment-dim)", margin: "4px 0 10px" }}>{set.tagline}</div>
          {clickable ? <>
            <Bar pct={p.pct} height={7} />
            <div className="hcg-mono" style={{ fontSize: 11, color: "var(--parchment-dim)", marginTop: 5 }}>{p.done} / {p.total} chapters · {p.pct}%</div>
          </> : <div className="hcg-mono" style={{ fontSize: 11, color: isOpen ? "var(--verdigris)" : "var(--parchment-dim)" }}>
            {set.status === "planned" ? "Planned — not yet written" : isOpen ? "Discovered — chapters in development" : (set.sealedHint || "Locked")}</div>}
        </button>;
      })}
    </div>
  </div>;
}

function SetScreen({ setId, save, cards, onHome, onWorld, onOpenChapter, onResume, onOpenChar }) {
  const set = SETS[setId]; const chs = CHAPTERS_BY_SET[setId] || [];
  const p = setProgress(setId, save.chaptersDone);
  const roster = ALL_CHARACTER_IDS.filter((id) => CHARACTERS[id].sets.includes(setId));
  const acts = chs.reduce((a, c) => { (a[c.act] = a[c.act] || []).push(c); return a; }, {});

  return <div className="max-w-3xl mx-auto px-4 py-8 hcg-fade">
    <Crumbs items={[{ label: "Home", onClick: onHome }, { label: "Ancient World", onClick: onWorld }, { label: set.name }]} />
    <h1 className="hcg-display mt-3 mb-1" style={{ fontSize: 26 }}>{set.name}</h1>
    <p style={{ color: "var(--parchment-dim)", marginBottom: 14 }}>{set.tagline}</p>
    <div className="mb-6"><Bar pct={p.pct} />
      <div className="hcg-mono" style={{ fontSize: 11, color: "var(--parchment-dim)", marginTop: 5 }}>{p.done} of {p.total} chapters complete</div></div>

    <ResumeRibbon save={save} onResume={onResume} />

    {Object.keys(acts).map((act, ai) => {
      const openAct = actOpen(setId, act, save.chaptersDone);
      const prevAct = Object.keys(acts)[ai - 1];
      return <div key={act} className="mb-7">
      <div className="flex items-center gap-2 mb-3">
        <div className="hcg-tab" style={{ color: openAct ? "var(--bronze-glow)" : "var(--locked)" }}>{act.toUpperCase()}</div>
        {!openAct && <span className="hcg-mono" style={{ fontSize: 9, color: "var(--parchment-dim)" }}>
          FINISH {prevAct.toUpperCase()} FIRST</span>}
      </div>
      <div className="flex flex-col gap-2">
        {acts[act].map((ch) => {
          const done = !!save.chaptersDone[ch.id];
          const partway = !done && save.beatMax[ch.id] !== undefined;
          const bm = save.bookmark && save.bookmark.chapterId === ch.id;
          return <button key={ch.id} disabled={!openAct} onClick={() => openAct && onOpenChapter(ch)}
            className={`rounded-lg p-4 text-left flex items-center gap-3 ${openAct ? "hcg-panel hover:brightness-110" : "hcg-lockedcard"}`}
            style={{ opacity: openAct ? 1 : .55, cursor: openAct ? "pointer" : "default" }}>
            <div style={{ width: 26, height: 26, borderRadius: 999, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
              background: done ? "var(--verdigris)" : "transparent", border: done ? "none" : "1px solid var(--hair)" }}>
              {done ? <CheckIcon size={14} color="#1B1710" /> : bm ? <BookmarkIcon size={12} filled color="var(--gold-glow)" /> : <span className="hcg-mono" style={{ fontSize: 10, color: "var(--parchment-dim)" }}>{chs.indexOf(ch) + 1}</span>}
            </div>
            <div className="flex-1 min-w-0">
              <div style={{ fontSize: 15.5 }}>{ch.title}</div>
              <div className="hcg-mono" style={{ fontSize: 10.5, color: "var(--parchment-dim)", marginTop: 2 }}>
                {ch.era} · {ch.minutes} min{partway ? ` · part ${save.beatMax[ch.id] + 1} of ${ch.beats.length}` : ""}{ch.revealsSets ? " · points somewhere new" : ""}
              </div>
            </div>
            {openAct ? <ChevRight size={16} color="var(--parchment-dim)" /> : <Lock size={14} color="var(--locked)" />}
          </button>;
        })}
      </div>
    </div>;
    })}

    <div className="hcg-tab mb-3" style={{ color: "var(--parchment-dim)" }}>FIGURES IN THIS SET · {roster.filter((id) => cards[id]).length}/{roster.length}</div>
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
      {roster.map((id) => <CardTile key={id} id={id} tier={cards[id] || null} onOpen={onOpenChar} />)}
    </div>
  </div>;
}

function CardTile({ id, tier, onOpen, showSet }) {
  const c = CHARACTERS[id]; const nm = displayName(c, tier);
  return <button onClick={() => onOpen(id)} className={`rounded-lg p-3 flex flex-col items-center gap-2 text-center ${tier ? "hcg-panel-2 hover:brightness-125" : "hcg-lockedcard hover:brightness-110"}`}>
    <Medallion tier={tier} label={initials(nm)} size={48} mythic={c.mythic} />
    <div style={{ fontSize: 12, lineHeight: 1.25, color: tier ? "var(--parchment)" : "var(--parchment-dim)" }}>{tier ? nm : "? ? ?"}</div>
    <TierBadge tier={tier} small />
    {showSet && <div className="hcg-mono" style={{ fontSize: 9, color: "var(--parchment-dim)" }}>{SETS[c.sets[0]].name}</div>}
  </button>;
}

function CollectionScreen({ save, cards, onHome, onOpenChar }) {
  const groups = [["bronze", "Bronze"], ["silver", "Silver"], ["gold", "Gold"]];
  const counts = groups.map(([k]) => Object.values(cards).filter((t) => t === k).length);
  return <div className="max-w-3xl mx-auto px-4 py-8 hcg-fade">
    <Crumbs items={[{ label: "Home", onClick: onHome }, { label: "Collection" }]} />
    <h1 className="hcg-display mt-3 mb-1" style={{ fontSize: 26 }}>The collection</h1>
    <p style={{ color: "var(--parchment-dim)", marginBottom: 18 }}>
      {Object.keys(cards).length} of {ALL_CHARACTER_IDS.length} figures discovered. Tap any card — locked ones show exactly which chapters would earn them.
    </p>
    <div className="grid grid-cols-3 gap-3 mb-8">
      {groups.map(([k, l], i) => <div key={k} className="hcg-panel rounded-lg p-3 text-center">
        <div className="hcg-display" style={{ fontSize: 20, color: TIER_GLOW[k] }}>{counts[i]}</div>
        <div className="hcg-tab" style={{ color: "var(--parchment-dim)" }}>{l.toUpperCase()}</div></div>)}
    </div>
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
      {ALL_CHARACTER_IDS.map((id) => <CardTile key={id} id={id} tier={cards[id] || null} onOpen={onOpenChar} showSet />)}
    </div>
  </div>;
}
