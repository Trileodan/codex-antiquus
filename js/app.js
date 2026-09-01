/* =====================================================================
   APP ROOT
   ===================================================================== */

function App() {
  const [save, setSave] = useState(loadSave);
  const [screen, setScreen] = useState("home");
  const [setId, setSetId] = useState(null);
  const [chapter, setChapter] = useState(null);
  const [startBeat, setStartBeat] = useState(0);
  const [openChar, setOpenChar] = useState(null);
  const [mints, setMints] = useState([]);
  const [toast, setToast] = useState(null);
  const toastT = useRef(null);

  const cards = useMemo(() => computeCards(save.chaptersDone), [save.chaptersDone]);
  useEffect(() => { persist(save); }, [save]);

  function fireToast(msg) { setToast(msg); clearTimeout(toastT.current); toastT.current = setTimeout(() => setToast(null), 3000); }

  function openChapter(ch) {
    const bm = save.bookmark && save.bookmark.chapterId === ch.id ? save.bookmark.beatIndex : 0;
    setChapter(ch); setStartBeat(bm); setSetId(ch.set); setScreen("reader");
  }

  function handleBeat(chapterId, index, beat) {
    setSave((s) => {
      const prevMax = s.beatMax[chapterId];
      const keys = s.recentKeys.slice();
      const last = keys[keys.length - 1];
      const isNew = !last || last.key !== beat.key;
      if (isNew) keys.push({ key: beat.key, chapter: CHAPTER_BY_ID[chapterId].title, beat: beat.title });
      return {
        ...s,
        beatMax: { ...s.beatMax, [chapterId]: Math.max(prevMax === undefined ? -1 : prevMax, index) },
        recentKeys: keys.slice(-12),
        keyCount: (s.keyCount || 0) + (isNew && index > (prevMax === undefined ? -1 : prevMax) ? 1 : 0),
      };
    });
  }

  function backTarget(ch) {
    if (!ch) return "home";
    return ch.kind === "war" ? "wars" : "set";
  }

  function handleBookmark(chapterId, index) {
    setSave((s) => ({ ...s, bookmark: { chapterId, beatIndex: index, at: Date.now() } }));
    setScreen(backTarget(chapter));
    fireToast("Bookmark placed. Your last three key points will be waiting.");
  }

  function exitReader() {
    if (chapter && !save.chaptersDone[chapter.id]) {
      const idx = save.beatMax[chapter.id] || 0;
      setSave((s) => ({ ...s, bookmark: { chapterId: chapter.id, beatIndex: idx, at: Date.now() } }));
    }
    setScreen(backTarget(chapter));
  }

  function completeChapter(chapterId) {
    const before = computeCards(save.chaptersDone);
    const nextDone = { ...save.chaptersDone, [chapterId]: true };
    const after = computeCards(nextDone);
    const newMints = [];
    for (const id of ALL_CHARACTER_IDS) {
      if (after[id] && after[id] !== before[id]) newMints.push({ id, tier: after[id], from: before[id] || null });
    }
    const ch = CHAPTER_BY_ID[chapterId];

    // Did finishing this chapter open a war?
    const warsBefore = WAR_CHAPTERS.filter((w) => warGate(w, save.chaptersDone).open).map((w) => w.id);
    const warsAfter = WAR_CHAPTERS.filter((w) => warGate(w, nextDone).open);
    const newWars = warsAfter.filter((w) => warsBefore.indexOf(w.id) === -1);

    setSave((s) => ({ ...s, chaptersDone: nextDone, bookmark: s.bookmark && s.bookmark.chapterId === chapterId ? null : s.bookmark }));
    setScreen(backTarget(ch));

    if (newWars.length) fireToast(`War unlocked: ${newWars.map((w) => w.title).join(", ")} — both sides now studied.`);
    else if (ch.unlocksSets) fireToast(`New Set opened: ${ch.unlocksSets.map((x) => SETS[x].name).join(", ")}`);

    if (newMints.length) setMints(newMints);
    else if (!newWars.length && !ch.unlocksSets) fireToast("Chapter complete. No card yet — keep going.");
  }

  function goChapterFromCard(ch) { setOpenChar(null); openChapter(ch); }

  function resetAll() {
    if (!window.confirm("Wipe all progress, cards and bookmarks?")) return;
    setSave({ ...BLANK_SAVE }); setScreen("home"); fireToast("Progress cleared.");
  }

  const NAV = [
    { id: "world", label: "Study", icon: ScrollIcon },
    { id: "wars", label: "Wars", icon: SwordsIcon },
    { id: "atlas", label: "Atlas", icon: MapIcon },
    { id: "progress", label: "Progress", icon: ChartIcon },
    { id: "collection", label: "Cards", icon: LayersIcon },
  ];

  return <div className="hcg-root">
    {toast && <div className="hcg-toast fixed top-3 left-1/2 z-[60] hcg-panel rounded-full px-4 py-2 flex items-center gap-2"
      style={{ borderColor: "var(--gold-glow)", maxWidth: "92vw" }}>
      <Star size={13} color="var(--gold-glow)" /><span style={{ fontSize: 13.5 }}>{toast}</span></div>}

    <div className="px-4 py-3" style={{ borderBottom: "1px solid var(--hair)" }}>
      <div className="flex items-center justify-between gap-3 max-w-3xl mx-auto">
        <button onClick={() => setScreen("home")} className="flex items-center gap-2" style={{ color: "var(--gold-glow)" }}>
          <HomeIcon size={15} /><span className="hcg-display" style={{ fontSize: 13.5 }}>CODEX ANTIQUUS</span></button>
        <div className="flex items-center gap-3">
          {save.bookmark && screen !== "reader" && <button onClick={() => setScreen("resume")} title="Bookmarked chapter" aria-label="Bookmarked chapter">
            <BookmarkIcon size={15} filled color="var(--gold-glow)" /></button>}
          <span className="hcg-mono" style={{ fontSize: 11, color: "var(--parchment-dim)" }}>{Object.keys(cards).length}/{ALL_CHARACTER_IDS.length}</span>
          <button onClick={resetAll} className="hcg-mono" style={{ fontSize: 10, color: "var(--hair)" }} title="Reset progress">RESET</button>
        </div>
      </div>
      {screen !== "reader" && <div className="flex gap-1 mt-2 max-w-3xl mx-auto overflow-x-auto">
        {NAV.map((n) => <button key={n.id} onClick={() => setScreen(n.id)}
          className="hcg-tab flex items-center gap-1.5 px-3 py-1.5 rounded whitespace-nowrap"
          style={{ color: screen === n.id ? "#1B1710" : "var(--parchment-dim)",
            background: screen === n.id ? "var(--bronze-glow)" : "transparent", border: "1px solid var(--hair)" }}>
          <n.icon size={12} /> {n.label}</button>)}
      </div>}
    </div>

    {screen === "home" && <HomeScreen save={save} cards={cards}
      onEnterWorld={() => setScreen("world")} onResume={() => setScreen("resume")}
      onCollection={() => setScreen("collection")} onWars={() => setScreen("wars")}
      onAtlas={() => setScreen("atlas")} onProgress={() => setScreen("progress")} />}

    {screen === "world" && <WorldScreen save={save} onHome={() => setScreen("home")} onResume={() => setScreen("resume")}
      onEnterSet={(id) => { setSetId(id); setScreen("set"); }} />}

    {screen === "set" && setId && CHAPTERS_BY_SET[setId] && <SetScreen setId={setId} save={save} cards={cards}
      onHome={() => setScreen("home")} onWorld={() => setScreen("world")}
      onOpenChapter={openChapter} onResume={() => setScreen("resume")} onOpenChar={setOpenChar} />}

    {screen === "wars" && <WarsScreen save={save} onHome={() => setScreen("home")} onOpenChapter={openChapter} />}

    {screen === "atlas" && <AtlasScreen save={save} cards={cards} onHome={() => setScreen("home")}
      onEnterSet={(id) => { setSetId(id); setScreen("set"); }}
      onOpenChapter={openChapter} onOpenChar={setOpenChar} />}

    {screen === "progress" && <ProgressScreen save={save} cards={cards} onHome={() => setScreen("home")} onOpenChar={setOpenChar} />}

    {screen === "collection" && <CollectionScreen save={save} cards={cards} onHome={() => setScreen("home")} onOpenChar={setOpenChar} />}

    {screen === "reader" && chapter && <Reader chapter={chapter} save={save} startBeat={startBeat}
      onExit={exitReader} onBookmark={handleBookmark} onBeat={handleBeat} onComplete={completeChapter} />}

    {screen === "resume" && save.bookmark && <ResumeScreen save={save}
      onContinue={() => { const ch = CHAPTER_BY_ID[save.bookmark.chapterId]; setSetId(ch.set); setChapter(ch); setStartBeat(save.bookmark.beatIndex); setSave((s) => ({ ...s, bookmark: null })); setScreen("reader"); }}
      onDiscard={() => { const ch = CHAPTER_BY_ID[save.bookmark.chapterId]; setSetId(ch.set); setChapter(ch); setStartBeat(0); setSave((s) => ({ ...s, bookmark: null })); setScreen("reader"); }} />}

    {screen === "resume" && !save.bookmark && <div className="max-w-xl mx-auto px-4 py-16 text-center hcg-fade">
      <p style={{ color: "var(--parchment-dim)" }}>No bookmark right now. Start a chapter and use <b style={{ color: "var(--gold-glow)" }}>Bookmark &amp; stop</b> whenever you need to break off.</p>
      <button onClick={() => setScreen("home")} className="hcg-btn mt-5 text-xs px-4 py-2 rounded" style={{ background: "var(--bronze)", color: "#1B1710" }}>Back home</button>
    </div>}

    {openChar && <CharacterModal charId={openChar} cards={cards} chaptersDone={save.chaptersDone}
      onClose={() => setOpenChar(null)} onOpenChar={setOpenChar} onGoChapter={goChapterFromCard} />}

    {mints.length > 0 && <MintModal mints={mints} cards={cards} onClose={() => setMints([])} onOpen={(id) => { setMints([]); setOpenChar(id); }} />}

    <div className="text-center py-8" style={{ fontSize: 11.5, color: "var(--hair)" }}>
      Prototype · seed content · progress saved in this browser
    </div>
  </div>;
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
