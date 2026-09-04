/* =====================================================================
   BATTLE APP
   The UI never decides what is legal. It asks the engine, draws the
   answer, and calls a mutation. Anything not offered cannot be done.
   ===================================================================== */

const PRESET_DECKS = {
  "legion": { name: "The Legion", blurb: "Caesar's tempo and Leonidas holding the middle. Cheap infantry, deployed forward, taking fortresses early.",
    cards: ["caesar","leonidas","legionnaire","legionnaire","legionnaire","phalangite","velite","numidian-cavalry","spartan-hoplite","nightingale","cicero","pheidippides"] },
  "barcid":  { name: "The Barcids", blurb: "Hannibal ignores the map and Alexander reaches further than anyone expects. Terrain-heavy battlefields favour this one heavily.",
    cards: ["hannibal","alexander","immortal","immortal","cretan-archer","scythian-archer","sacred-band","jack-ripper","boudica","van-gogh","archimedes","sun-tzu"] },
  "horde":   { name: "The Horde", blurb: "Genghis makes every rider a square faster and Napoleon makes them all cheaper. Wide, fast, and thin where it is hit.",
    cards: ["genghis","napoleon","numidian-cavalry","numidian-cavalry","numidian-cavalry","scythian-archer","scythian-archer","velite","boudica","pheidippides","herodotus","agrippa"] },
  "dynasty": { name: "The Dynasty", blurb: "Cleopatra banks Command that nobody else can, and spends it on a slow, armoured line that is very hard to shift off a fortress.",
    cards: ["cleopatra","leonidas","spartan-hoplite","spartan-hoplite","immortal","immortal","phalangite","cretan-archer","legionnaire","nightingale","archimedes","cicero"] },
};

function needsTarget(ab) {
  return (ab.effects || []).some((e) =>
    ["enemyUnit", "friendlyDamaged", "friendlyUnit", "friendlyInRange"].includes(e.target));
}
function eligibleTargets(state, ab, owner, source) {
  const out = [];
  for (const u of Object.values(state.units)) {
    for (const e of ab.effects || []) {
      if (e.target === "enemyUnit" && u.owner !== owner) out.push(u);
      if (e.target === "friendlyDamaged" && u.owner === owner && u.lives < u.maxLives) out.push(u);
      if (e.target === "friendlyUnit" && u.owner === owner) out.push(u);
      if (e.target === "friendlyInRange" && u.owner === owner && source &&
          Math.abs(u.x - source.x) + Math.abs(u.y - source.y) <= (e.range || 99)) out.push(u);
    }
  }
  return [...new Set(out)];
}

function BattleApp() {
  const [screen, setScreen] = React.useState("setup");
  const [bf, setBf] = React.useState("open-country");
  const [deckA, setDeckA] = React.useState("legion");
  const [deckB, setDeckB] = React.useState("barcid");
  const [st, setSt] = React.useState(null);
  const [, bump] = React.useReducer((n) => n + 1, 0);
  const [sel, setSel] = React.useState(null);
  const [mode, setMode] = React.useState(null);
  const [pending, setPending] = React.useState(null);
  const [msg, setMsg] = React.useState("");
  const [discards, setDiscards] = React.useState([]);
  const [discarding, setDiscarding] = React.useState(false);
  const [debug, setDebug] = React.useState(false);
  /* Drag state lives with the other hooks: React requires every hook to run
     on every render, and this component returns early for the setup screen. */
  const dragRef = React.useRef(null);
  const overRef = React.useRef(null);
  const [dragOver, setDragOver] = React.useState(null);

  const refresh = () => { bump(); };
  const say = (t) => { setMsg(t); if (t) setTimeout(() => setMsg(""), 3200); };
  const clear = () => { setSel(null); setMode(null); setPending(null); };

  function start() {
    const s = createBattle(bf, PRESET_DECKS[deckA].cards, PRESET_DECKS[deckB].cards);
    setSt(s); clear(); setScreen("battle");
  }

  if (screen === "setup" || !st) return <SetupScreen {...{ bf, setBf, deckA, setDeckA, deckB, setDeckB, start }} />;

  const me = st.current;
  const pl = st.players[me];
  const selUnit = sel && st.units[sel];

  /* ---- which squares are clickable, and why ---- */
  const marks = {};
  if (st.phase === "deploy") {
    const p = st.players[0].commanderQueue.length ? 0 : 1;
    for (const c of legalCommanderSquares(st, p)) marks[`${c.x},${c.y}`] = "dep";
  } else if (pending) {
    marks[`${pending.x},${pending.y}`] = "tgt";
  } else if (mode && mode.kind === "deploy") {
    for (const c of legalDeploys(st, pl.hand[mode.handIndex])) marks[`${c.x},${c.y}`] = "dep";
  } else if (mode && mode.kind === "target") {
    for (const u of mode.targets) marks[`${u.x},${u.y}`] = "tgt";
  } else if (selUnit && selUnit.owner === me) {
    for (const m of legalMoves(st, sel)) marks[`${m.x},${m.y}`] = "move";
    for (const a of legalAttacks(st, sel)) marks[`${a.x},${a.y}`] = "atk";
  }
  for (const u of Object.values(st.units)) {
    const k = `${u.x},${u.y}`;
    if (!marks[k] && u.owner === me && st.phase === "main") marks[k] = "";
  }

  /* Interaction: a tap opens a card, a drag acts with it.
       tap a card              -> select it, showing stats and abilities
       drag a card to a square -> move there, then choose a facing
       drag a card onto an enemy -> attack it
     Pointer capture is released on pointerdown so that pointerup lands on
     the square under the finger rather than the one it started on, which
     is what touch would otherwise do. */
  function onDown(x, y, e) {
    if (st.phase !== "main" || pending) return;
    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch (_) {}
    const u = unitAt(st, x, y);
    dragRef.current = { x, y, uid: u && u.owner === me ? u.uid : null, moved: false };
    overRef.current = null; setDragOver(null);
  }

  function onEnter(x, y) {
    const d = dragRef.current;
    if (!d || !d.uid) return;
    if (x === d.x && y === d.y) { overRef.current = null; setDragOver(null); return; }
    d.moved = true; overRef.current = { x, y }; setDragOver({ x, y });
  }

  function onUp(x, y) {
    const d = dragRef.current; dragRef.current = null;
    const over = overRef.current; overRef.current = null; setDragOver(null);
    if (!d) { handleTap(x, y); return; }
    const dest = (d.moved && over) ? over : { x, y };
    if (dest.x === d.x && dest.y === d.y) { handleTap(x, y); return; }
    if (!d.uid) { handleTap(dest.x, dest.y); return; }
    resolveDrag(d.uid, dest.x, dest.y);
  }

  function resolveDrag(uid, x, y) {
    setSel(uid); setMode(null);
    const atk = legalAttacks(st, uid).find((a) => a.x === x && a.y === y);
    if (atk) {
      const r = doAttack(st, uid, atk.targetUid);
      if (!r.ok) say(r.error);
      else say(`${r.damage ? "Hit" : "Blocked"} — attack ${atk.attack} against ${atk.defenceSide} defence ${atk.defence}.`);
      refresh(); return;
    }
    if (legalMoves(st, uid).some((m) => m.x === x && m.y === y)) {
      setPending({ kind: "move", uid, x, y }); return;
    }
    say("That card cannot reach or attack there.");
  }

  function handleTap(x, y) {
    if (st.phase === "over") return;
    const u = unitAt(st, x, y);

    if (st.phase === "deploy") {
      const p = st.players[0].commanderQueue.length ? 0 : 1;
      const cardId = st.players[p].commanderQueue[0];
      const r = placeCommander(st, p, cardId, x, y);
      if (!r.ok) say(r.error); refresh(); return;
    }
    if (mode && mode.kind === "deploy") {
      if (marks[`${x},${y}`] === "dep") setPending({ kind: "deploy", handIndex: mode.handIndex, x, y });
      return;
    }
    if (mode && mode.kind === "target") {
      if (!u || !mode.targets.some((t) => t.uid === u.uid)) return;
      const r = mode.run({ uid: u.uid });
      if (!r.ok) say(r.error); else clear();
      refresh(); return;
    }
    if (u) { setSel(u.uid); setMode(null); return; }
    if (sel && marks[`${x},${y}`] === "move") { setPending({ kind: "move", uid: sel, x, y }); return; }
    setSel(null);
  }

  function commitFacing(dir) {
    let r;
    if (pending.kind === "move") r = doMove(st, pending.uid, pending.x, pending.y, dir);
    else if (pending.kind === "rotate") r = doRotate(st, pending.uid, dir);
    else r = doDeploy(st, pending.handIndex, pending.x, pending.y, dir);
    if (!r.ok) say(r.error);
    setPending(null); setMode(null); refresh();
  }

  function playHand(i) {
    const card = BATTLE_CARDS[pl.hand[i]];
    if (card.type === "special") {
      const ab = ABILITIES[card.abilities[0]];
      if (pl.command < card.cost) return say("Not enough Command.");
      if (needsTarget(ab)) {
        const targets = eligibleTargets(st, ab, me, null);
        if (!targets.length) return say("No legal target for that card.");
        setSel(null);
        setMode({ kind: "target", targets, run: (t) => doSpecial(st, i, t) });
        return;
      }
      const r = doSpecial(st, i, null);
      if (!r.ok) say(r.error); else clear();
      refresh(); return;
    }
    if (!legalDeploys(st, pl.hand[i]).length) return say("Nowhere legal to deploy that, or not enough Command.");
    setSel(null); setMode({ kind: "deploy", handIndex: i });
  }

  function useAbility(id) {
    const ab = ABILITIES[id];
    if (needsTarget(ab)) {
      const targets = eligibleTargets(st, ab, me, selUnit);
      if (!targets.length) return say("No legal target.");
      setMode({ kind: "target", targets, run: (t) => doAbility(st, sel, id, t) });
      return;
    }
    const r = doAbility(st, sel, id, null);
    if (!r.ok) say(r.error);
    refresh();
  }

  /* Ending a turn is two steps when the hand is over the limit. Cards are
     played by clicking them; discarding is a separate, explicit mode, so
     the hand never stops being usable. */
  function finishTurn() {
    const over = Math.max(0, pl.hand.length - st.rules.maxHand);
    if (over && !discarding) { setDiscarding(true); clear(); return; }
    if (over && discards.length !== over) return say(`Choose ${over - discards.length} more card(s) to discard.`);
    const r = endTurn(st, discards);
    if (!r.ok) return say(r.error);
    setDiscards([]); setDiscarding(false); clear(); refresh();
  }

  const over = Math.max(0, pl.hand.length - st.rules.maxHand);

  return <div className="bt-root"><div className="bt-wrap">
    <Header st={st} onQuit={() => { setSt(null); setScreen("setup"); }} debug={debug} setDebug={setDebug} />
    {msg && <div className="bt-panel" style={{ borderColor: "var(--rust)", marginBottom: 10, padding: "7px 12px" }}>{msg}</div>}

    <div className="bt-grid2">
      <div>
        <Board state={st} viewer={me} selected={sel} marks={marks}
               rosette={pending ? { x: pending.x, y: pending.y } : null}
               onDown={onDown} onEnter={onEnter} onUp={onUp}
               onFacing={commitFacing} onCancelFacing={() => setPending(null)}
               dragOver={dragOver} />
        {st.phase === "main" && <div className="bt-mono" style={{ color: "var(--parchment-dim)", fontSize: 11.5, marginTop: 8, lineHeight: 1.6 }}>
          Tap a card to see its stats and abilities · drag it onto a square to move, or onto an enemy to attack ·
          the bright edge of a card is its front · the two numbers on each edge are that edge's
          <b style={{ color: "var(--gold-glow)" }}> attack</b> and <b style={{ color: "#9FD4C0" }}>defence</b>
        </div>}
        {st.phase === "deploy" && <div className="bt-panel" style={{ marginTop: 10 }}>
          <div className="bt-label">Deployment</div>
          <div style={{ marginTop: 4 }}>
            Player {(st.players[0].commanderQueue.length ? 0 : 1) + 1}, place{" "}
            <b style={{ color: "var(--gold-glow)" }}>
              {BATTLE_CARDS[(st.players[0].commanderQueue.length ? st.players[0] : st.players[1]).commanderQueue[0]].name}
            </b>{" "}on a highlighted square of your home row.
          </div>
        </div>}
        {st.phase === "main" && <HandRow {...{ st, pl, me, playHand, mode, over, discards, setDiscards, discarding, setDiscarding }} />}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {pending && <div className="bt-panel" style={{ borderColor: "var(--gold)" }}>
          <div className="bt-label">
            {pending.kind === "rotate" ? "Turning on the spot" : pending.kind === "move" ? "Moving" : "Deploying"}
          </div>
          <div style={{ marginTop: 4, fontSize: 13 }}>Choose a facing using the arrows on the highlighted square.</div>
        </div>}

        {mode && mode.kind === "target" && <div className="bt-panel" style={{ borderColor: "var(--silver-glow)" }}>
          <div className="bt-label">Choose a target</div>
          <button className="bt-btn sm" style={{ marginTop: 8 }} onClick={clear}>Cancel</button>
        </div>}

        {st.phase === "main" && <div className="bt-panel">
          <Score st={st} />
          <button className="bt-btn primary" style={{ width: "100%", marginTop: 10 }} onClick={finishTurn}>
            {discarding ? `Discard ${discards.length}/${over} and end turn` : `End Player ${me + 1}'s turn`}
          </button>
          {discarding && <button className="bt-btn sm" style={{ width: "100%", marginTop: 6 }}
            onClick={() => { setDiscarding(false); setDiscards([]); }}>Keep playing</button>}
        </div>}

        {selUnit && <div className="bt-panel">
          <CardDetail state={st} unit={selUnit} />
          {selUnit.owner === me && st.phase === "main" && <div style={{ marginTop: 10, display: "flex", gap: 6, flexWrap: "wrap" }}>
            {canCapture(st, sel) && <button className="bt-btn sm" onClick={() => { const r = doCapture(st, sel); if (!r.ok) say(r.error); refresh(); }}>Capture fortress</button>}
            {canRotate(st, sel) && <button className="bt-btn sm"
              onClick={() => setPending({ kind: "rotate", uid: sel, x: selUnit.x, y: selUnit.y })}>Turn to face…</button>}
            {triggeredAbilities(st, sel).map((a) =>
              <button key={a.id} className="bt-btn sm" disabled={!a.ready} onClick={() => useAbility(a.id)}>
                {a.name}{a.cooldown ? ` (${a.cooldown})` : ""}
              </button>)}
          </div>}
        </div>}

        {debug && <DebugPanel st={st} refresh={refresh} />}

        <div className="bt-panel">
          <div className="bt-label" style={{ marginBottom: 6 }}>Battle log</div>
          <div className="bt-log">
            {st.log.slice(-60).reverse().map((l, i) =>
              <div key={i}><span className="bt-mono" style={{ color: "var(--parchment-dim)" }}>R{l.round}</span> {l.text}</div>)}
          </div>
        </div>
      </div>
    </div>

    {st.phase === "over" && <div className="bt-panel" style={{ marginTop: 14, borderColor: "var(--gold)" }}>
      <div className="hcg-display" style={{ fontSize: 20, color: "var(--gold-glow)" }}>
        Player {st.winner + 1} wins {st.winBy === "commanders" ? "— both enemy Commanders are down." : `on victory points, ${st.players[st.winner].vp} to ${st.players[opponent(st.winner)].vp}.`}
      </div>
      <button className="bt-btn primary" style={{ marginTop: 10 }} onClick={() => { setSt(null); setScreen("setup"); }}>New battle</button>
    </div>}
  </div></div>;
}

function Header({ st, onQuit, debug, setDebug }) {
  return <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 12, flexWrap: "wrap" }}>
    <div className="hcg-display" style={{ fontSize: 20, color: "var(--gold-glow)" }}>Field of Battle</div>
    <div className="bt-mono" style={{ color: "var(--parchment-dim)" }}>
      {st.battlefieldName} · Round {st.round} · Player {st.current + 1}
    </div>
    <div style={{ flex: 1 }} />
    <label className="bt-mono" style={{ color: "var(--parchment-dim)", cursor: "pointer" }}>
      <input type="checkbox" checked={debug} onChange={(e) => setDebug(e.target.checked)} /> debug
    </label>
    <button className="bt-btn sm" onClick={onQuit}>Quit</button>
  </div>;
}

function Score({ st }) {
  return <div>
    {[0, 1].map((p) => {
      const forts = st.fortresses.filter((f) => f.owner === p).length;
      const cmd = livingCommanders(st, p).length;
      return <div key={p} style={{ display: "flex", gap: 10, alignItems: "baseline",
        color: p === st.current ? "var(--gold-glow)" : "var(--parchment)", padding: "2px 0" }}>
        <span className="bt-label" style={{ width: 66, flex: "0 0 auto", whiteSpace: "nowrap" }}>Player {p + 1}</span>
        <span className="bt-mono" style={{ width: 46, flex: "0 0 auto" }}>{st.players[p].vp} VP</span>
        <span className="bt-mono" style={{ color: "var(--parchment-dim)", whiteSpace: "nowrap" }}>
          {st.players[p].command}/{commandCap(st, p)} cmd · {forts} fort{forts === 1 ? "" : "s"} · {cmd} cmdr · {st.players[p].draw.length} deck
        </span>
      </div>;
    })}
  </div>;
}

function HandRow({ st, pl, me, playHand, mode, over, discards, setDiscards, discarding }) {
  return <div className="bt-panel" style={{ marginTop: 10 }}>
    <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 8 }}>
      <div className="bt-label">Player {me + 1}'s hand</div>
      <div className="bt-mono" style={{ color: "var(--parchment-dim)" }}>
        {pl.command} Command · {pl.hand.length} cards
        {discarding
          ? <b style={{ color: "var(--rust)" }}> · choose {over - discards.length} to discard</b>
          : over > 0 && <span style={{ color: "var(--parchment-dim)" }}> · you will discard {over} when you end the turn</span>}
      </div>
    </div>
    <div className="bt-hand">
      {pl.hand.map((id, i) => {
        const c = BATTLE_CARDS[id];
        const cost = c.type === "special" ? c.cost : deployCost(st, me, id);
        const poor = pl.command < cost;
        const picked = discards.includes(i);
        return <div key={i} className={`bt-card ${mode && mode.kind === "deploy" && mode.handIndex === i ? "on" : ""} ${poor ? "unaffordable" : ""}`}
          style={picked ? { borderColor: "var(--rust)", opacity: .6 } : null}
          onClick={() => discarding
            ? setDiscards(picked ? discards.filter((d) => d !== i) : [...discards, i].slice(0, over))
            : playHand(i)}>
          <div className="nm">{c.name}</div>
          <div className="ty">{c.type} · {cost} cmd</div>
          {c.type !== "special" && <div className="ty" style={{ marginTop: 3 }}>
            spd {c.speed} · atk {c.attack.front} · def {c.defence.front}/{c.defence.rear}
          </div>}
        </div>;
      })}
      {!pl.hand.length && <div style={{ color: "var(--parchment-dim)" }}>No cards in hand.</div>}
    </div>
  </div>;
}

function DebugPanel({ st, refresh }) {
  const p = st.current;
  const act = (fn) => { fn(); refresh(); };
  return <div className="bt-panel" style={{ borderColor: "var(--verdigris)" }}>
    <div className="bt-label" style={{ marginBottom: 6 }}>Debug — player {p + 1}</div>
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
      <button className="bt-btn sm" onClick={() => act(() => st.players[p].command += 3)}>+3 Command</button>
      <button className="bt-btn sm" onClick={() => act(() => st.players[p].vp += 5)}>+5 VP</button>
      <button className="bt-btn sm" onClick={() => act(() => drawCards(st, p, 1))}>Draw</button>
      <button className="bt-btn sm" onClick={() => act(() => { for (const u of Object.values(st.units)) { u.actionsLeft = st.rules.actionsPerTurn; u.movedThisTurn = false; u.sick = false; } })}>Refresh actions</button>
      <button className="bt-btn sm" onClick={() => act(() => { for (const u of Object.values(st.units)) if (u.owner === p) for (const k in u.cooldowns) u.cooldowns[k] = 0; })}>Clear cooldowns</button>
      <button className="bt-btn sm" onClick={() => act(() => { for (const f of st.fortresses) f.owner = p; })}>Take all forts</button>
    </div>
  </div>;
}

function SetupScreen({ bf, setBf, deckA, setDeckA, deckB, setDeckB, start }) {
  const field = decodeBattlefield(BATTLEFIELDS[bf]);
  const Pick = ({ value, set, label }) => <div className="bt-panel" style={{ flex: 1, minWidth: 240 }}>
    <div className="bt-label" style={{ marginBottom: 8 }}>{label}</div>
    {Object.entries(PRESET_DECKS).map(([k, d]) =>
      <div key={k} onClick={() => set(k)} style={{ cursor: "pointer", padding: "6px 8px", borderRadius: 4, marginBottom: 4,
        border: `1px solid ${value === k ? "var(--gold)" : "var(--hair)"}`, background: value === k ? "var(--panel-2)" : "transparent" }}>
        <div className="hcg-display" style={{ fontSize: 13, color: value === k ? "var(--gold-glow)" : "var(--parchment)" }}>{d.name}</div>
        <div style={{ fontSize: 12.5, lineHeight: 1.45, color: "var(--parchment-dim)" }}>{d.blurb}</div>
      </div>)}
  </div>;
  return <div className="bt-root"><div className="bt-wrap">
    <div className="hcg-display" style={{ fontSize: 26, color: "var(--gold-glow)" }}>Field of Battle</div>
    <p style={{ color: "var(--parchment-dim)", maxWidth: 640, lineHeight: 1.6 }}>
      A tactical battle for two players at one screen. Twelve cards, two of them Commanders, on an
      eight-by-eight field with four fortresses. Combat is decided by facing and position, never by dice.
    </p>
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", margin: "14px 0" }}>
      <Pick value={deckA} set={setDeckA} label="Player 1 deck" />
      <Pick value={deckB} set={setDeckB} label="Player 2 deck" />
      <div className="bt-panel" style={{ flex: 1, minWidth: 240 }}>
        <div className="bt-label" style={{ marginBottom: 8 }}>Battlefield</div>
        {Object.values(BATTLEFIELDS).map((b) =>
          <div key={b.id} onClick={() => setBf(b.id)} style={{ cursor: "pointer", padding: "6px 8px", borderRadius: 4, marginBottom: 4,
            border: `1px solid ${bf === b.id ? "var(--gold)" : "var(--hair)"}`, background: bf === b.id ? "var(--panel-2)" : "transparent" }}>
            <div className="hcg-display" style={{ fontSize: 13, color: bf === b.id ? "var(--gold-glow)" : "var(--parchment)" }}>{b.name}</div>
            <div style={{ fontSize: 12.5, lineHeight: 1.45, color: "var(--parchment-dim)" }}>{b.blurb}</div>
          </div>)}
      </div>
    </div>
    <div className="bt-mono" style={{ color: "var(--parchment-dim)", marginBottom: 10 }}>
      {field.width}×{field.height} · {field.fortresses.length} fortresses
    </div>
    <button className="bt-btn primary" onClick={start}>Begin the battle</button>
  </div></div>;
}

ReactDOM.createRoot(document.getElementById("battle-root")).render(<BattleApp />);
