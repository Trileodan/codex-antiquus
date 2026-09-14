/* =====================================================================
   THE TIMELINE GAME — screens

   Three states: pick your ten, play, result. The rules live in
   js/data/timeline-game.js; nothing here decides anything.

   The board is VERTICAL, not horizontal. A horizontal timeline is the
   obvious design and it is wrong on a phone: ten entries at 390px wide
   either scroll sideways (so you cannot see what you are placing
   between) or shrink until the labels are unreadable. Vertical scrolls
   the way phones already scroll, gives every entry a full line of text,
   and makes the gap you are aiming at a wide, obvious target.
   ===================================================================== */

function GameSetupScreen({ save, cards, onHome, onStart }) {
  const pool = useMemo(() => playableCoins(cards).sort((a, b) => a.year - b.year), [cards]);
  const [picked, setPicked] = useState([]);
  const [mode, setMode] = useState("match");

  const enough = pool.length >= TG_COINS;
  const full = picked.length >= TG_COINS;

  function toggle(id) {
    setPicked((p) => p.includes(id) ? p.filter((x) => x !== id) : (p.length >= TG_COINS ? p : [...p, id]));
  }
  function autoPick() {
    const rnd = tgRand(Date.now() >>> 0);
    setPicked(tgShuffle(pool, rnd).slice(0, TG_COINS).map((c) => c.id));
  }
  function start() {
    const mine = picked.map((id) => pool.find((c) => c.id === id));
    const aiPool = mode === "full" ? allCoins() : pool;
    const rnd = tgRand((Date.now() ^ 0x5bf03635) >>> 0);
    const theirs = tgShuffle(aiPool, rnd).slice(0, TG_COINS);
    onStart({ mine, theirs, aiMode: mode, seed: (Date.now() >>> 0) });
  }

  return <div className="max-w-2xl mx-auto px-4 py-8 hcg-fade">
    <Crumbs items={[{ label: "Home", onClick: onHome }, { label: "Timeline" }]} />
    <h1 className="hcg-display mt-3 mb-1" style={{ fontSize: 26 }}>Timeline</h1>
    <p style={{ color: "var(--parchment-dim)", marginBottom: 18, lineHeight: 1.7 }}>
      Ten coins each. One event starts on the table. Place yours in the right position relative to
      everything already down — right earns a point and a replacement coin, wrong throws the coin away
      and your hand gets smaller. <b style={{ color: "var(--gold-glow)" }}>Empty your hand by being wrong and you lose on the spot</b>,
      whatever the score.
    </p>

    {!enough && <div className="hcg-panel rounded-lg p-5" style={{ borderColor: "var(--bronze-glow)" }}>
      <div className="hcg-tab mb-2" style={{ color: "var(--bronze-glow)" }}>NOT ENOUGH COINS YET</div>
      <p style={{ lineHeight: 1.7, color: "#DFD3B9" }}>
        You have {pool.length} playable coin{pool.length === 1 ? "" : "s"} and need {TG_COINS}. Finish a
        few more chapters — every coin you earn is another thing you can be asked to place.
      </p>
    </div>}

    {enough && <>
      <div className="hcg-panel-2 rounded-lg p-4 mb-4">
        <div className="hcg-tab mb-2" style={{ color: "var(--parchment-dim)" }}>OPPONENT</div>
        <div className="bt-grid2 grid grid-cols-2 gap-2">
          {[{ id: "match", t: "Match my knowledge", d: `Plays from the same ${pool.length} coins you have earned, and is about as sure of its dates as a careful reader.` },
            { id: "full", t: "Full History", d: `Every coin in the app — all ${allCoins().length} — and it knows them well. It is not cheating. It has read everything.` }].map((o) =>
            <button key={o.id} onClick={() => setMode(o.id)} className="rounded p-3 text-left"
              style={{ border: "1px solid " + (mode === o.id ? "var(--gold-glow)" : "var(--hair)"), minWidth: 0,
                       background: mode === o.id ? "rgba(198,160,74,.10)" : "var(--panel-2)" }}>
              <div className="hcg-display" style={{ fontSize: 15 }}>{o.t}</div>
              <div style={{ fontSize: 12.5, color: "var(--parchment-dim)", lineHeight: 1.5, marginTop: 3 }}>{o.d}</div>
            </button>)}
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
        <div className="hcg-tab" style={{ color: picked.length === TG_COINS ? "var(--gold-glow)" : "var(--parchment-dim)" }}>
          YOUR TEN · {picked.length} / {TG_COINS}
        </div>
        <div className="flex gap-2">
          <button onClick={autoPick} className="hcg-btn px-3 py-1.5 rounded" style={{ border: "1px solid var(--hair)", color: "var(--parchment-dim)", fontSize: 12 }}>Pick for me</button>
          {picked.length > 0 && <button onClick={() => setPicked([])} className="hcg-btn px-3 py-1.5 rounded" style={{ border: "1px solid var(--hair)", color: "var(--parchment-dim)", fontSize: 12 }}>Clear</button>}
        </div>
      </div>
      <p style={{ fontSize: 13, color: "var(--parchment-dim)", marginBottom: 10, lineHeight: 1.6 }}>
        Choose carefully. Ten coins clustered in one century are far harder to order than ten spread across
        three thousand years.
      </p>

      <div className="flex flex-col gap-1.5 mb-4">
        {pool.map((c) => {
          const on = picked.includes(c.id);
          return <button key={c.id} onClick={() => toggle(c.id)} className="rounded px-3 py-2.5 text-left flex items-center gap-3"
            style={{ border: "1px solid " + (on ? "var(--gold-glow)" : "var(--hair)"),
                     background: on ? "rgba(198,160,74,.10)" : "var(--panel-2)", opacity: !on && full ? 0.45 : 1 }}>
            <Coin tier={c.tier} size={26} />
            <span className="flex-1 min-w-0" style={{ fontSize: 14, lineHeight: 1.45 }}>{c.label}</span>
            <span className="hcg-mono" style={{ fontSize: 10.5, color: "var(--parchment-dim)" }}>{COIN_KIND_LABEL[c.kind] || "Person"}</span>
          </button>;
        })}
      </div>

      <button onClick={start} disabled={picked.length !== TG_COINS}
        className="hcg-btn w-full px-4 py-3 rounded"
        style={{ background: picked.length === TG_COINS ? "var(--bronze)" : "var(--panel-2)",
                 color: picked.length === TG_COINS ? "#1B1710" : "var(--parchment-dim)",
                 border: "1px solid var(--hair)", fontSize: 14 }}>
        {picked.length === TG_COINS ? "Start" : `Pick ${TG_COINS - picked.length} more`}
      </button>
    </>}
  </div>;
}

function TimelineGameScreen({ game, onMove, onAgain, onHome }) {
  const [sel, setSel] = useState(null);
  const you = game.players[0], ai = game.players[1];
  const yourTurn = game.turn === 0 && !game.over;
  const last = game.log[0] || null;

  useEffect(() => { setSel(null); }, [game.placed.length, game.turn]);

  /* The opponent moves on a short delay so the reader can see what
     happened rather than having the board change under their hand. */
  useEffect(() => {
    if (game.over || game.turn !== 1) return;
    const t = setTimeout(() => {
      const m = tgAiMove(game);
      if (m) onMove(m.coinId, m.slot);
    }, 900);
    return () => clearTimeout(t);
  }, [game]);

  function Slot({ i }) {
    if (!yourTurn || sel === null) return <div style={{ height: 6 }} />;
    return <button onClick={() => onMove(sel, i)} className="w-full rounded my-1 py-2 hcg-mono"
      style={{ border: "1px dashed var(--gold-glow)", color: "var(--gold-glow)", fontSize: 10.5, background: "rgba(198,160,74,.06)" }}>
      PLACE HERE
    </button>;
  }

  return <div className="max-w-2xl mx-auto px-4 py-6 hcg-fade">
    <Crumbs items={[{ label: "Home", onClick: onHome }, { label: "Timeline" }]} />

    <div className="flex items-center gap-2 mt-3 mb-3 flex-wrap">
      {[you, ai].map((p, n) => <div key={n} className="hcg-panel-2 rounded px-3 py-2 flex-1" style={{ minWidth: 0,
        borderColor: game.turn === n && !game.over ? "var(--gold-glow)" : "var(--hair)" }}>
        <div className="hcg-tab" style={{ color: "var(--parchment-dim)" }}>{n === 0 ? "YOU" : game.aiMode === "full" ? "FULL HISTORY" : "OPPONENT"}</div>
        <div className="flex items-baseline gap-2">
          <span className="hcg-display" style={{ fontSize: 20, color: "var(--gold-glow)" }}>{p.points}</span>
          <span className="hcg-mono" style={{ fontSize: 10.5, color: "var(--parchment-dim)" }}>
            {p.lost ? "OUT" : p.done ? "FINISHED" : `${p.hand.length} in hand · ${p.pile.length} left`}
          </span>
        </div>
      </div>)}
    </div>

    {last && <div className="rounded px-3 py-2 mb-3" style={{ fontSize: 13, lineHeight: 1.55,
      border: "1px solid " + (last.ok ? "var(--verdigris)" : "var(--rust, #8a3b2a)"),
      background: last.ok ? "rgba(90,140,110,.12)" : "rgba(138,59,42,.12)" }}>
      <b>{last.who === "you" ? "You" : "Opponent"}</b> {last.ok ? "placed" : "misplaced"} “{last.coin.label}” — {yearLabel(last.coin.year)}.
      {!last.ok && " Discarded."}
    </div>}

    {game.over && <div className="hcg-panel rounded-lg p-4 mb-4" style={{ borderColor: "var(--gold-glow)" }}>
      <div className="hcg-display" style={{ fontSize: 22, color: "var(--gold-glow)", marginBottom: 4 }}>
        {game.result === "you" ? "You win." : game.result === "ai" ? "You lose." : "A draw."}
      </div>
      <p style={{ lineHeight: 1.65, color: "#DFD3B9", fontSize: 14 }}>
        {game.reason === "hand"
          ? (game.result === "you"
              ? "Your opponent ran out of coins. Points did not come into it."
              : "You ran out of coins in hand. Points did not come into it.")
          : `Both of you placed everything you could. ${you.points} to ${ai.points}.`}
      </p>
      <div className="flex gap-2 mt-3">
        <button onClick={onAgain} className="hcg-btn flex-1 px-4 py-3 rounded" style={{ background: "var(--bronze)", color: "#1B1710", fontSize: 14 }}>Play again</button>
        <button onClick={onHome} className="hcg-btn px-4 py-3 rounded" style={{ border: "1px solid var(--hair)", color: "var(--parchment-dim)", fontSize: 13 }}>Done</button>
      </div>
    </div>}

    <div className="hcg-tab mb-1" style={{ color: "var(--parchment-dim)" }}>THE TABLE · EARLIEST FIRST</div>
    <div className="mb-5">
      <Slot i={0} />
      {game.placed.map((c, i) => <div key={c.id}>
        <div className="hcg-panel-2 rounded px-3 py-2.5 flex items-center gap-3" style={{
          borderColor: c.by === "start" ? "var(--verdigris)" : c.by === "you" ? "var(--gold-glow)" : "var(--hair)" }}>
          <span className="hcg-mono" style={{ fontSize: 11.5, color: "var(--gold-glow)", minWidth: 62 }}>{yearLabel(c.year)}</span>
          <span className="flex-1 min-w-0" style={{ fontSize: 14, lineHeight: 1.45 }}>{c.label}</span>
          {c.by !== "start" && <span className="hcg-mono" style={{ fontSize: 9.5, color: "var(--parchment-dim)" }}>{c.by === "you" ? "YOU" : "OPP"}</span>}
        </div>
        <Slot i={i + 1} />
      </div>)}
    </div>

    {!game.over && <>
      <div className="hcg-tab mb-2" style={{ color: yourTurn ? "var(--gold-glow)" : "var(--parchment-dim)" }}>
        {yourTurn ? (sel === null ? "YOUR HAND · PICK A COIN" : "NOW CHOOSE WHERE IT GOES") : "OPPONENT IS THINKING"}
      </div>
      <div className="flex flex-col gap-1.5">
        {you.hand.map((c) => <button key={c.id} onClick={() => yourTurn && setSel(sel === c.id ? null : c.id)}
          className="rounded px-3 py-3 text-left flex items-center gap-3"
          style={{ border: "1px solid " + (sel === c.id ? "var(--gold-glow)" : "var(--hair)"),
                   background: sel === c.id ? "rgba(198,160,74,.12)" : "var(--panel-2)", opacity: yourTurn ? 1 : 0.55 }}>
          <Coin tier={c.tier} size={28} />
          <span className="flex-1 min-w-0" style={{ fontSize: 14.5, lineHeight: 1.45 }}>{c.label}</span>
        </button>)}
      </div>
      {you.discard.length > 0 && <div className="hcg-mono mt-3" style={{ fontSize: 10.5, color: "var(--parchment-dim)" }}>
        DISCARDED: {you.discard.map((c) => c.label).join(" · ")}
      </div>}
    </>}
  </div>;
}
