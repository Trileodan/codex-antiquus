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

const ARROW = { N: "▲", E: "▶", S: "▼", W: "◀" };

function FortressMark({ owner }) {
  const c = owner == null ? "#5A5344" : owner === 0 ? "var(--p0)" : "var(--p1)";
  return <div className="bt-fort">
    <svg width="66%" height="66%" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6">
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

/* Edges, rotated into BOARD space, so nothing needs rotating in your head:
     a red line   = this card can attack through that edge
     a green digit = the Defence that applies to an attack arriving there
   Attack itself is one number for the whole card, shown in the middle. */
function EdgeInfo({ state, unit }) {
  const st = effectiveStats(state, unit);
  return DIRS.map((d) => {
    const side = sideFacing(unit.facing, d);
    const armed = st.arcs.includes(side);
    return <React.Fragment key={d}>
      {armed && <span className={`bt-arc ${d}`} title={`Can attack through its ${side}`} />}
      <span className={`bt-edge ${d}`} title={`Defence ${st.defence[side]} against an attack from the ${d}`}>
        {st.defence[side]}
      </span>
    </React.Fragment>;
  });
}

function UnitToken({ state, unit, hiddenToViewer }) {
  const card = BATTLE_CARDS[unit.cardId];
  if (hiddenToViewer) {
    return <div className={`bt-unit ${unit.owner === 0 ? "p0" : "p1"}`}
                style={{ opacity: .35, borderStyle: "dashed" }}>?</div>;
  }
  const cls = [
    "bt-unit", unit.owner === 0 ? "p0" : "p1",
    card.type === "commander" ? "cmdr" : "",
    unit.sick ? "sick" : "", `face-${unit.facing}`,
  ].join(" ");
  const st = effectiveStats(state, unit);
  return <div className={cls} title={`${card.name} — attack ${st.attack}, ${unit.lives}/${unit.maxLives} Lives, ${unit.actionsLeft} actions`}>
    <EdgeInfo state={state} unit={unit} />
    <div className="nm">{initialsOf(card.name)}</div>
    <div className="atk" title={`Attack ${st.attack}`}>{st.attack}</div>
    <div className="pips">
      {Array.from({ length: unit.maxLives }, (_, i) =>
        <div key={i} className={`pip ${i >= unit.lives ? "lost" : ""}`} />)}
    </div>
  </div>;
}

/* The facing chooser sits ON the square being decided, not in a panel. */
function FacingRosette({ onPick, onCancel }) {
  const stop = (e) => { e.stopPropagation(); };
  return <div className="bt-rosette" onPointerDown={stop} onPointerUp={stop}>
    {DIRS.map((d) =>
      <button key={d} className={`ro ${d}`} title={`Face ${d}`}
              onPointerUp={(e) => { e.stopPropagation(); onPick(d); }}>{ARROW[d]}</button>)}
    <button className="ro c" title="Cancel"
            onPointerUp={(e) => { e.stopPropagation(); onCancel(); }}>×</button>
  </div>;
}

function Board({ state, viewer, selected, marks, rosette, onDown, onEnter, onUp, onFacing, onCancelFacing, dragOver }) {
  const cells = [];
  for (let y = 0; y < state.height; y++) {
    for (let x = 0; x < state.width; x++) {
      const t = state.terrain[y][x];
      const f = fortressAt(state, x, y);
      const u = unitAt(state, x, y);
      const key = `${x},${y}`;
      const m = marks[key];
      const hide = u && !isVisibleTo(state, u, viewer);
      const isOver = dragOver && dragOver.x === x && dragOver.y === y;
      const terr = TERRAIN[t];
      cells.push(
        <div key={key}
             className={`bt-sq ${m || ""} ${m ? "clickable" : ""} ${isOver ? "over" : ""} ${selected && u && u.uid === selected ? "sel" : ""}`}
             style={{ background: SQ_TONE[t] }}
             title={`${sq(x, y)} — ${terr.name}${terr.move == null ? " (impassable)"
               : ` (move ${terr.move}${terr.defence ? `, defence ${terr.defence > 0 ? "+" : ""}${terr.defence}` : ""})`}`}
             onPointerDown={(e) => onDown(x, y, e)}
             onPointerEnter={() => onEnter(x, y)}
             onPointerUp={(e) => onUp(x, y, e)}>
          {x === 0 && <span className="coord">{y + 1}</span>}
          {y === 0 && x > 0 && <span className="coord">{String.fromCharCode(65 + x)}</span>}
          {TERR_MARK[t] && <span className="terr">{TERR_MARK[t]}</span>}
          {f && <FortressMark owner={f.owner} />}
          {u && <UnitToken state={state} unit={u} hiddenToViewer={hide} />}
          {rosette && rosette.x === x && rosette.y === y &&
            <FacingRosette onPick={onFacing} onCancel={onCancelFacing} />}
        </div>);
    }
  }
  const used = [...new Set(state.terrain.flat())];
  return <div>
    <div className="bt-board" style={{ gridTemplateColumns: `repeat(${state.width}, 1fr)` }}>{cells}</div>
    <div className="bt-legend">
      <span className="it"><span className="sw arc" /> can attack through that edge</span>
      <span className="it"><b className="k d">2</b> defence against an attack from there</span>
      <span className="it"><b className="k a">3</b> attack power, anywhere it can reach</span>
      {used.map((t) => <span key={t} className="it">
        <span className="sw" style={{ background: SQ_TONE[t] }} />
        {TERRAIN[t].name}
        {TERRAIN[t].move == null ? " — impassable"
          : ` — move ${TERRAIN[t].move}${TERRAIN[t].defence ? `, def ${TERRAIN[t].defence > 0 ? "+" : ""}${TERRAIN[t].defence}` : ""}`}
      </span>)}
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
      {unit ? ` · facing ${unit.facing}` : ""}
    </div>
    {card.type !== "special" && <div style={{ marginBottom: 6 }}>
      <div className="bt-mono" style={{ display: "flex", gap: 8 }}>
        <span style={{ width: 58, color: "var(--parchment-dim)" }}>Attack</span>
        <b style={{ color: "var(--gold-glow)" }}>{st ? st.attack : card.attack}</b>
        <span style={{ color: "var(--parchment-dim)" }}>
          through its {(st ? st.arcs : card.arcs || ["front"]).join(", ")}
        </span>
      </div>
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
