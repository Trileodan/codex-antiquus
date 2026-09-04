/* =====================================================================
   BOARD
   Presentation only. Every legality decision comes from the engine —
   this file asks what is legal and draws it, so an illegal action is
   never offered rather than being rejected after the fact.
   ===================================================================== */

const TERR_MARK = { plains: "", desert: "dst", forest: "for", swamp: "swp",
  hills: "hil", mountain: "MTN", river: "RIV", bridge: "brg" };

const SQ_TONE = {
  plains: "var(--sq-plains)", desert: "var(--sq-desert)", forest: "var(--sq-forest)",
  swamp: "var(--sq-swamp)", hills: "var(--sq-hills)", mountain: "var(--sq-mountain)",
  river: "var(--sq-river)", bridge: "var(--sq-bridge)",
};

function FortressMark({ owner }) {
  const c = owner == null ? "#5A5344" : owner === 0 ? "var(--p0)" : "var(--p1)";
  return <div className="bt-fort">
    <svg width="70%" height="70%" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6">
      <path d="M4 20V9l3-2 2 2 3-3 3 3 2-2 3 2v11z" />
      <path d="M4 20h16" strokeWidth="2" />
    </svg>
  </div>;
}

function initialsOf(name) {
  const w = name.replace(/[^A-Za-z ]/g, " ").split(" ").filter((s) => s.length > 1);
  const strong = w.filter((s) => s[0] === s[0].toUpperCase());
  return (strong.length ? strong : w).map((s) => s[0]).slice(0, 2).join("") || name[0];
}

function UnitToken({ state, unit, hiddenToViewer }) {
  const card = BATTLE_CARDS[unit.cardId];
  const cmdr = card.type === "commander";
  if (hiddenToViewer) {
    return <div className={`bt-unit ${unit.owner === 0 ? "p0" : "p1"}`} style={{ opacity: .35, borderStyle: "dashed" }}>?</div>;
  }
  return <div className={`bt-unit ${unit.owner === 0 ? "p0" : "p1"} ${cmdr ? "cmdr" : ""} ${unit.sick ? "sick" : ""}`}
              title={`${card.name} — ${unit.lives}/${unit.maxLives} Lives`}>
    <div className={`bt-face ${unit.facing}`} />
    <div>{initialsOf(card.name)}</div>
    <div className="pips">
      {Array.from({ length: unit.maxLives }, (_, i) =>
        <div key={i} className={`pip ${i >= unit.lives ? "lost" : ""}`} />)}
    </div>
  </div>;
}

function Board({ state, viewer, selected, marks, onSquare }) {
  const cells = [];
  for (let y = 0; y < state.height; y++) {
    for (let x = 0; x < state.width; x++) {
      const t = state.terrain[y][x];
      const f = fortressAt(state, x, y);
      const u = unitAt(state, x, y);
      const key = `${x},${y}`;
      const m = marks[key];
      const hide = u && !isVisibleTo(state, u, viewer);
      cells.push(
        <div key={key}
             className={`bt-sq ${m || ""} ${m ? "clickable" : ""} ${selected && u && u.uid === selected ? "sel" : ""}`}
             style={{ background: SQ_TONE[t] }}
             title={`${sq(x, y)} — ${TERRAIN[t].name}${TERRAIN[t].move == null ? " (impassable)" : ` (move ${TERRAIN[t].move}${TERRAIN[t].defence ? `, defence ${TERRAIN[t].defence > 0 ? "+" : ""}${TERRAIN[t].defence}` : ""})`}`}
             onClick={() => onSquare(x, y)}>
          {TERR_MARK[t] && <span className="terr">{TERR_MARK[t]}</span>}
          {x === 0 && <span className="coord">{y + 1}</span>}
          {y === 0 && x > 0 && <span className="coord">{String.fromCharCode(65 + x)}</span>}
          {f && <FortressMark owner={f.owner} />}
          {u && <UnitToken state={state} unit={u} hiddenToViewer={hide} />}
        </div>);
    }
  }
  const used = [...new Set(state.terrain.flat())];
  return <div>
    <div className="bt-board" style={{ gridTemplateColumns: `repeat(${state.width}, 1fr)` }}>{cells}</div>
    <div className="bt-legend">
      {used.map((t) => <span key={t} className="it">
        <span className="sw" style={{ background: SQ_TONE[t] }} />
        {TERRAIN[t].name}
        {TERRAIN[t].move == null ? " — impassable"
          : ` — move ${TERRAIN[t].move}${TERRAIN[t].defence ? `, def ${TERRAIN[t].defence > 0 ? "+" : ""}${TERRAIN[t].defence}` : ""}`}
      </span>)}
    </div>
  </div>;
}

function DirPad({ onPick, label }) {
  return <div>
    {label && <div className="bt-label" style={{ marginBottom: 6 }}>{label}</div>}
    <div className="bt-dirpad">
      <span /><button onClick={() => onPick("N")}>▲</button><span />
      <button onClick={() => onPick("W")}>◀</button><span />
      <button onClick={() => onPick("E")}>▶</button>
      <span /><button onClick={() => onPick("S")}>▼</button><span />
    </div>
  </div>;
}

/* Card detail — every public value the brief requires a player to see. */
function CardDetail({ state, unit, cardId }) {
  const card = BATTLE_CARDS[cardId || (unit && unit.cardId)];
  if (!card) return null;
  const st = unit ? effectiveStats(state, unit) : null;
  const dirRow = (label, base, eff) =>
    <div className="bt-mono" style={{ display: "flex", gap: 8 }}>
      <span style={{ width: 58, color: "var(--parchment-dim)" }}>{label}</span>
      {SIDES.map((k) => {
        const b = (base && base[k]) || 0, e = eff ? eff[k] : b;
        return <span key={k} style={{ width: 52 }}>
          {k[0].toUpperCase()}{k.slice(1, 2)} <b style={{ color: e > b ? "var(--verdigris)" : e < b ? "var(--rust)" : "var(--parchment)" }}>{e}</b>
        </span>;
      })}
    </div>;
  return <div>
    <div className="hcg-display" style={{ fontSize: 15, color: "var(--gold-glow)" }}>{card.name}</div>
    <div className="bt-mono" style={{ color: "var(--parchment-dim)", marginBottom: 6 }}>
      {card.type.toUpperCase()} · {card.era}{card.unique ? " · UNIQUE" : ""}
    </div>
    {card.type !== "special" && <div style={{ marginBottom: 6 }}>
      {dirRow("Attack", card.attack, st && st.attack)}
      {dirRow("Defence", card.defence, st && st.defence)}
      <div className="bt-mono" style={{ color: "var(--parchment-dim)", marginTop: 3 }}>
        Speed {st ? st.speed : card.speed} · Range {st ? st.range : card.range} · Lives {unit ? `${unit.lives}/${unit.maxLives}` : card.lives}
        {unit ? ` · Actions ${unit.actionsLeft}` : ` · Cost ${card.cost}`}
      </div>
    </div>}
    {card.type === "special" && <div className="bt-mono" style={{ color: "var(--parchment-dim)", marginBottom: 6 }}>Cost {card.cost} Command</div>}
    {unit && (unit.statuses || []).length > 0 && <div style={{ margin: "4px 0" }}>
      {unit.statuses.map((s2, i) => <span key={i} className="bt-chip" style={{ color: "var(--gold-glow)" }}>
        {STATUSES[s2.id].name} · {s2.turns}</span>)}
    </div>}
    {(card.abilities || []).map((id) => {
      const ab = ABILITIES[id];
      const cd = unit && unit.cooldowns[id];
      return <div key={id} style={{ marginTop: 6, paddingTop: 6, borderTop: "1px solid var(--hair)" }}>
        <div className="bt-mono" style={{ color: "var(--bronze-glow)" }}>
          {ab.name} · {ab.trigger}{ab.cooldown ? ` · cooldown ${ab.cooldown}` : ""}{cd ? ` · ${cd} to go` : ""}
        </div>
        <div style={{ fontSize: 13, lineHeight: 1.45 }}>{ab.text}</div>
      </div>;
    })}
    <div style={{ fontSize: 12.5, lineHeight: 1.5, color: "var(--parchment-dim)", marginTop: 8 }}>{card.description}</div>
  </div>;
}
