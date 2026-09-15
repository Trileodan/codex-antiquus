/* =====================================================================
   APP ROOT
   ===================================================================== */

function App() {
  const [save, setSave] = useState(loadSave);
  const [screen, setScreen] = useState(() => {
    const s = loadSave();
    return (!s.patron && !Object.keys(s.chaptersDone || {}).length) ? "begin" : "home";
  });
  const [setId, setSetId] = useState(null);
  const [campaignId, setCampaignId] = useState(null);
  const [chapter, setChapter] = useState(null);
  const [startBeat, setStartBeat] = useState(0);
  const [openChar, setOpenChar] = useState(null);
  const [mints, setMints] = useState([]);
  const [quizCoin, setQuizCoin] = useState(null);
  const [game, setGame] = useState(null);
  const [studyTab, setStudyTab] = useState("empires");
  const [personId, setPersonId] = useState(null);
  const [toast, setToast] = useState(null);
  const toastT = useRef(null);
  const cameFromCampaign = useRef(false);

  const cards = useMemo(() => computeCards(save.chaptersDone, save.patron, save), [save.chaptersDone, save.patron, save.quiz]);
  useEffect(() => { persist(save); }, [save]);

  function fireToast(msg) { setToast(msg); clearTimeout(toastT.current); toastT.current = setTimeout(() => setToast(null), 3000); }

  function openChapter(ch, fromCampaign) {
    cameFromCampaign.current = !!fromCampaign;
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
    /* If you came in from a campaign, that is where you want to be put
       back — the next reason is the thing worth reading. */
    if (cameFromCampaign.current) return "campaign";
    return isGated(ch) ? "wars" : "set";
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

  /* Promotion quiz result. A pass mints Gold; a failure stamps the time,
     which is what the 24h lock reads. `attempts` is bumped either way so
     a retry draws a different set of questions rather than the same four. */
  function quizResult(coinId, passed) {
    setSave((s) => {
      const prev = (s.quiz && s.quiz[coinId]) || {};
      const entry = passed
        ? { passed: true, passedAt: prev.passedAt || Date.now(), attempts: (prev.attempts || 0) + 1 }
        : { failedAt: Date.now(), attempts: (prev.attempts || 0) + 1 };
      return { ...s, quiz: { ...(s.quiz || {}), [coinId]: entry } };
    });
    if (passed) fireToast(`${CHARACTERS[coinId].name} promoted to Gold.`);
  }

  /* A Year Drop answer that scored highly enough to count. It is
     recorded against every coin whose single-year statement sits near
     that year, because naming Zama is evidence about Zama, Scipio and
     Hannibal at once. Only coins already at Gold can use it, but the
     evidence is stored for all of them so a later promotion inherits
     the history rather than starting cold. */
  function recordRecall(year, result) {
    const now = Date.now();
    setSave((s) => {
      const rec = { ...(s.recall || {}) };
      for (const id of result.coins) {
        const prev = rec[id] || { hits: 0, best: 0 };
        rec[id] = { hits: prev.hits + 1, lastAt: now, best: Math.max(prev.best, result.score) };
      }
      return { ...s, recall: rec };
    });
    const promoted = result.coins.filter((id) => {
      const st = coinState(CHARACTERS[id], save.chaptersDone, save);
      return st && st.tier === "gold";
    });
    if (promoted.length) fireToast(`Retained recall recorded on ${promoted.length} coin${promoted.length === 1 ? "" : "s"}.`);
  }

  function completeChapter(chapterId) {
    const before = computeCards(save.chaptersDone, null, save);
    const nextDone = { ...save.chaptersDone, [chapterId]: true };
    const after = computeCards(nextDone, null, save);
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
    else if (ch.revealsSets) fireToast(`Discovered: ${ch.revealsSets.map((x) => SETS[x].name).join(", ")}`);

    if (newMints.length) setMints(newMints);
    else if (!newWars.length && !ch.revealsSets) fireToast("Chapter complete. No card yet — keep going.");
  }

  function goChapterFromCard(ch) { setOpenChar(null); openChapter(ch); }

  function resetAll() {
    if (!window.confirm("Wipe all progress, cards and bookmarks?")) return;
    setSave({ ...BLANK_SAVE }); setScreen("begin"); fireToast("Progress cleared.");
  }

  /* Master Brief v3 §1 fixes the primary navigation at six items:
     Study, Atlas, Progress, Collection, Year Drop, Time Line.

     Campaigns and Crossings used to be top-level and are now libraries
     inside Study, which is what §1 asks for — Study holds exactly three,
     Empires, Campaigns and People. Eight tabs also never fitted across a
     phone; the strip has been horizontally scrolling since it was six. */
  const NAV = [
    { id: "study", label: "Study", icon: ScrollIcon },
    { id: "atlas", label: "Atlas", icon: MapIcon },
    { id: "progress", label: "Progress", icon: ChartIcon },
    { id: "collection", label: "Collection", icon: LayersIcon },
    { id: "yeardrop", label: "Year Drop", icon: ClockIcon },
    { id: "timeline", label: "Time Line", icon: SwordsIcon },
  ];

  return <div className="hcg-root">
    {toast && <div className="hcg-toast fixed top-3 left-1/2 z-[60] hcg-panel rounded-full px-4 py-2 flex items-center gap-2"
      style={{ borderColor: "var(--gold-glow)", maxWidth: "92vw" }}>
      <Star size={13} color="var(--gold-glow)" /><span style={{ fontSize: 13.5 }}>{toast}</span></div>}

    <div className="px-4 py-3" style={{ borderBottom: "1px solid var(--hair)" }}>
      <div className="flex items-center justify-between gap-3 max-w-3xl mx-auto">
        <button onClick={() => screen !== "begin" && setScreen("home")} className="flex items-center gap-2" style={{ color: "var(--gold-glow)" }}>
          <HomeIcon size={15} /><span className="hcg-display" style={{ fontSize: 13.5 }}>CODEX ANTIQUUS</span></button>
        <div className="flex items-center gap-3">
          {save.bookmark && screen !== "reader" && <button onClick={() => setScreen("resume")} title="Bookmarked chapter" aria-label="Bookmarked chapter">
            <BookmarkIcon size={15} filled color="var(--gold-glow)" /></button>}
          <span className="hcg-mono" style={{ fontSize: 11, color: "var(--parchment-dim)" }}>{Object.keys(cards).length}/{ALL_CHARACTER_IDS.length}</span>
          <button onClick={resetAll} className="hcg-mono" style={{ fontSize: 10, color: "var(--hair)" }} title="Reset progress">RESET</button>
        </div>
      </div>
      {/* Six tabs do not fit across a phone, so the strip scrolls — which
          left the selected tab off the edge after a tap. Scroll it back
          into view whenever the screen changes. */}
      {screen !== "reader" && screen !== "begin" && <div className="flex gap-1 mt-2 max-w-3xl mx-auto overflow-x-auto">
        {NAV.map((n) => <button key={n.id} onClick={() => setScreen(n.id)}
          ref={(el) => { if (el && screen === n.id && el.scrollIntoView) el.scrollIntoView({ block: "nearest", inline: "center" }); }}
          className="hcg-tab flex items-center gap-1.5 px-3 py-1.5 rounded whitespace-nowrap"
          style={{ color: screen === n.id ? "#1B1710" : "var(--parchment-dim)",
            background: screen === n.id ? "var(--bronze-glow)" : "transparent", border: "1px solid var(--hair)" }}>
          <n.icon size={12} /> {n.label}</button>)}
      </div>}
    </div>

    {screen === "home" && <HomeScreen save={save} cards={cards}
      onEnterWorld={() => { setStudyTab("empires"); setScreen("study"); }} onResume={() => setScreen("resume")}
      onCollection={() => setScreen("collection")} onWars={() => setScreen("wars")}
      onAtlas={() => setScreen("atlas")} onProgress={() => setScreen("progress")} />}

    {screen === "begin" && <BeginScreen onChoose={(id) => {
      setSave((s) => ({ ...s, patron: id }));
      setSetId(id); setScreen("set");
      fireToast(`${CHARACTERS[SETS[id].patron].name} joins your collection.`);
    }} />}

    {screen === "study" && <div className="hcg-fade">
      {/* Study holds exactly the three libraries §1 specifies. They are
          lenses over one library of entries, not three copies of it. */}
      <div className="max-w-2xl mx-auto px-4 pt-6">
        <div className="flex gap-1">
          {[{ id: "empires", label: "Empires" }, { id: "campaigns", label: "Campaigns" }, { id: "people", label: "People" }]
            .map((t) => <button key={t.id} onClick={() => setStudyTab(t.id)}
              className="hcg-tab flex-1 px-3 py-2 rounded"
              style={{ color: studyTab === t.id ? "#1B1710" : "var(--parchment-dim)",
                       background: studyTab === t.id ? "var(--bronze-glow)" : "transparent",
                       border: "1px solid var(--hair)" }}>{t.label}</button>)}
        </div>
      </div>
      {studyTab === "empires" && <WorldScreen save={save} onHome={() => setScreen("home")} onResume={() => setScreen("resume")}
        onEnterSet={(id) => { setSetId(id); setScreen("set"); }} />}
      {studyTab === "campaigns" && <CampaignsScreen save={save} onHome={() => setScreen("home")}
        onOpenCampaign={(id) => { setCampaignId(id); setScreen("campaign"); }}
        onOpenChapter={openChapter} />}
      {studyTab === "people" && <PeopleScreen save={save} cards={cards} onHome={() => setScreen("home")}
        onOpenPerson={(id) => { setPersonId(id); setScreen("person"); }} />}
    </div>}

    {screen === "person" && personId && <PersonScreen personId={personId} save={save} cards={cards}
      onBack={() => setScreen("study")} onOpenChapter={openChapter} onOpenChar={setOpenChar} />}

    {screen === "set" && setId && CHAPTERS_BY_SET[setId] && <SetScreen setId={setId} save={save} cards={cards}
      onHome={() => setScreen("home")} onWorld={() => { setStudyTab("empires"); setScreen("study"); }}
      onOpenChapter={openChapter} onResume={() => setScreen("resume")} onOpenChar={setOpenChar} />}

    {/* Crossings is no longer a nav item — §1 allows six — but the screen
        stays, because finishing a war chapter returns here and the
        Campaigns tab links into it. */}
    {screen === "wars" && <WarsScreen save={save} onHome={() => { setStudyTab("campaigns"); setScreen("study"); }} onOpenChapter={openChapter} />}

    {screen === "atlas" && <AtlasScreen save={save} cards={cards} onHome={() => setScreen("home")}
      onEnterSet={(id) => { setSetId(id); setScreen("set"); }}
      onOpenChapter={openChapter} onOpenChar={setOpenChar} />}

    {screen === "progress" && <ProgressScreen save={save} cards={cards} onHome={() => setScreen("home")} onOpenChar={setOpenChar} />}

    {screen === "timeline" && !game && <GameSetupScreen save={save} cards={cards} onHome={() => setScreen("home")}
      onStart={(cfg) => setGame(tgNewGame(cfg))} />}

    {screen === "timeline" && game && <TimelineGameScreen game={game}
      onMove={(coinId, slot) => setGame((g) => tgPlace(g, coinId, slot))}
      onAgain={() => setGame(null)}
      onHome={() => { setGame(null); setScreen("home"); }} />}

    {screen === "collection" && <CollectionScreen save={save} cards={cards} onHome={() => setScreen("home")} onOpenChar={setOpenChar} />}



    {screen === "campaign" && campaignId && <CampaignScreen campaignId={campaignId} save={save}
      onHome={() => setScreen("home")} onBack={() => { setStudyTab("campaigns"); setScreen("study"); }} onOpenChapter={(ch) => openChapter(ch, true)} />}

    {screen === "yeardrop" && <YearDropScreen save={save} cards={cards} onHome={() => setScreen("home")}
      onOpenChapter={openChapter} onOpenChar={setOpenChar} onRecall={recordRecall} />}


    {screen === "reader" && chapter && <Reader chapter={chapter} save={save} startBeat={startBeat}
      onExit={exitReader} onBookmark={handleBookmark} onBeat={handleBeat} onComplete={completeChapter} />}

    {screen === "resume" && save.bookmark && <ResumeScreen save={save}
      onContinue={() => { const ch = CHAPTER_BY_ID[save.bookmark.chapterId]; setSetId(ch.set); setChapter(ch); setStartBeat(save.bookmark.beatIndex); setSave((s) => ({ ...s, bookmark: null })); setScreen("reader"); }}
      onDiscard={() => { const ch = CHAPTER_BY_ID[save.bookmark.chapterId]; setSetId(ch.set); setChapter(ch); setStartBeat(0); setSave((s) => ({ ...s, bookmark: null })); setScreen("reader"); }} />}

    {screen === "resume" && !save.bookmark && <div className="max-w-xl mx-auto px-4 py-16 text-center hcg-fade">
      <p style={{ color: "var(--parchment-dim)" }}>No bookmark right now. Start a chapter and use <b style={{ color: "var(--gold-glow)" }}>Bookmark &amp; stop</b> whenever you need to break off.</p>
      <button onClick={() => setScreen("home")} className="hcg-btn mt-5 text-xs px-4 py-2 rounded" style={{ background: "var(--bronze)", color: "#1B1710" }}>Back home</button>
    </div>}

    {openChar && <CharacterModal charId={openChar} cards={cards} chaptersDone={save.chaptersDone} save={save}
      onClose={() => setOpenChar(null)} onOpenChar={setOpenChar} onGoChapter={goChapterFromCard}
      onTakeQuiz={(id) => setQuizCoin(id)} />}

    {quizCoin && <QuizModal coinId={quizCoin} save={save} onClose={() => setQuizCoin(null)} onResult={quizResult} />}

    {mints.length > 0 && <MintModal mints={mints} cards={cards} onClose={() => setMints([])} onOpen={(id) => { setMints([]); setOpenChar(id); }} />}

    <div className="text-center py-8" style={{ fontSize: 11.5, color: "var(--hair)" }}>
      Prototype · seed content · progress saved in this browser
    </div>
  </div>;
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
