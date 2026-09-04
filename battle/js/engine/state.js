/* =====================================================================
   GAME STATE
   Plain JSON-serialisable state plus read-only queries. Nothing in this
   file mutates a battle and nothing in it knows about React — which is
   what makes replays, an AI opponent and network play possible later.
   ===================================================================== */

const DIRS = ["N", "E", "S", "W"];
const DELTA = { N: [0, -1], E: [1, 0], S: [0, 1], W: [-1, 0] };
const SIDES = ["front", "right", "rear", "left"];

/* Which side of `facing` is being approached from `dir`. */
function sideFacing(facing, dir) {
  return SIDES[(DIRS.indexOf(dir) - DIRS.indexOf(facing) + 4) % 4];
}
/* Orthogonal direction from a to b, or null if not orthogonal. */
function dirBetween(ax, ay, bx, by) {
  if (ax === bx && ay === by) return null;
  if (ax === bx) return by < ay ? "N" : "S";
  if (ay === by) return bx < ax ? "W" : "E";
  return null;
}
const inBounds = (s, x, y) => x >= 0 && y >= 0 && x < s.width && y < s.height;
const terrainAt = (s, x, y) => TERRAIN[s.terrain[y][x]];
const unitAt = (s, x, y) => Object.values(s.units).find((u) => u.x === x && u.y === y) || null;
const fortressAt = (s, x, y) => s.fortresses.find((f) => f.x === x && f.y === y) || null;
const cardOf = (u) => BATTLE_CARDS[u.cardId];
const livingCommanders = (s, p) =>
  Object.values(s.units).filter((u) => u.owner === p && cardOf(u).type === "commander");
const opponent = (p) => (p === 0 ? 1 : 0);

/* --------------------------------------------------------------------
   Effective statistics.
   Base card values, then terrain, then statuses, then auras from any
   ability on the board. The engine reads ability EFFECT TYPES, never
   character names.
   -------------------------------------------------------------------- */
function abilitiesOf(unit) {
  return (cardOf(unit).abilities || []).map((id) => ABILITIES[id]).filter(Boolean);
}

function hasAdjacentAlly(s, u) {
  return DIRS.some((d) => {
    const o = unitAt(s, u.x + DELTA[d][0], u.y + DELTA[d][1]);
    return o && o.owner === u.owner;
  });
}

function effectiveStats(s, u) {
  const c = cardOf(u);
  const out = {
    speed: c.speed || 0,
    range: c.range || 1,
    /* Attack is a single power. `arcs` is which edges it may strike
       through, relative to facing — that is what makes a phalanx different
       from a horse archer without needing four separate numbers. */
    attack: c.attack || 0,
    arcs: (c.arcs || ["front"]).slice(),
    defence: Object.assign({ front: 0, left: 0, right: 0, rear: 0 }, c.defence),
    ignoreTerrain: false, canHide: true, noMove: false, noActions: false, hidden: false,
  };
  const bump = (obj, spec) => {
    if (!spec) return;
    if (spec.all != null) SIDES.forEach((k) => { obj[k] += spec.all; });
    SIDES.forEach((k) => { if (spec[k] != null) obj[k] += spec[k]; });
  };
  const addArcs = (list) => { for (const a of list || []) if (!out.arcs.includes(a)) out.arcs.push(a); };

  /* terrain the unit is standing on */
  const t = terrainAt(s, u.x, u.y);
  if (t.defence) SIDES.forEach((k) => { out.defence[k] += t.defence; });

  /* statuses on the unit */
  for (const st of u.statuses || []) {
    const def = STATUSES[st.id];
    if (!def) continue;
    if (def.attack) out.attack += def.attack;
    if (def.arcs) addArcs(def.arcs);
    if (def.defence) SIDES.forEach((k) => { out.defence[k] += def.defence; });
    if (def.noMove) out.noMove = true;
    if (def.noActions) out.noActions = true;
    if (def.hidden) out.hidden = true;
    if (def.blocksHidden) out.canHide = false;
  }

  /* the unit's own passives */
  for (const ab of abilitiesOf(u)) {
    if (ab.trigger !== "passive") continue;
    for (const e of ab.effects) {
      if (e.type === "ignoreTerrain") out.ignoreTerrain = true;
      if (e.type === "aura" && e.scope === "self") {
        let ok = true;
        if (e.requires === "adjacentAlly") ok = hasAdjacentAlly(s, u);
        if (e.requires === "ownFortress") {
          const f = fortressAt(s, u.x, u.y);
          ok = !!f && f.owner === u.owner;
        }
        if (ok) {
          bump(out.defence, e.defence);
          if (e.attack) out.attack += e.attack;
          addArcs(e.arcs);
          if (e.speed) out.speed += e.speed;
        }
      }
    }
  }

  /* friendly auras from anywhere on the board */
  for (const other of Object.values(s.units)) {
    if (other.owner !== u.owner || other.uid === u.uid) continue;
    for (const ab of abilitiesOf(other)) {
      if (ab.trigger !== "passive") continue;
      for (const e of ab.effects) {
        if (e.type !== "aura" || e.scope !== "friendly") continue;
        const f = e.filter || {};
        if (f.type && cardOf(u).type !== f.type) continue;
        if (f.minSpeed != null && (cardOf(u).speed || 0) < f.minSpeed) continue;
        if (e.speed) out.speed += e.speed;
        if (e.attack) out.attack += e.attack;
        addArcs(e.arcs);
        bump(out.defence, e.defence);
      }
    }
  }

  SIDES.forEach((k) => { out.defence[k] = Math.max(0, out.defence[k]); });
  out.attack = Math.max(0, out.attack);
  return out;
}

/* Command ceiling, raised by any commandCap passive in play. */
function commandCap(s, p) {
  let cap = s.rules.commandCap;
  for (const u of Object.values(s.units)) {
    if (u.owner !== p) continue;
    for (const ab of abilitiesOf(u)) {
      if (ab.trigger !== "passive") continue;
      for (const e of ab.effects) if (e.type === "commandCap") cap += e.amount;
    }
  }
  return cap;
}

/* Deploy cost after any deployDiscount passive. */
function deployCost(s, p, cardId) {
  const card = BATTLE_CARDS[cardId];
  let cost = card.cost || 0;
  for (const u of Object.values(s.units)) {
    if (u.owner !== p) continue;
    for (const ab of abilitiesOf(u)) {
      if (ab.trigger !== "passive") continue;
      for (const e of ab.effects) {
        if (e.type !== "deployDiscount") continue;
        const f = e.filter || {};
        if (f.type && card.type !== f.type) continue;
        cost -= e.amount;
      }
    }
  }
  return Math.max(1, cost);
}

/* Can the opposing player see this unit's square? */
function isVisibleTo(s, u, viewer) {
  if (u.owner === viewer) return true;
  return !effectiveStats(s, u).hidden;
}

/* --------------------------------------------------------------------
   Battle creation
   -------------------------------------------------------------------- */
const DEFAULT_RULES = {
  handSize: 4, openingHand: 4, drawPerTurn: 1, maxHand: 4,
  commandCap: 8, commandEarly: 1, commandLate: 2, lateFromRound: 6,
  secondPlayerBonusCommand: 1,
  actionsPerTurn: 2, movesPerTurn: 1,
  vpToWin: 20, vpPerFortress: 1,
};

let _uid = 0;
const nextUid = () => `u${++_uid}`;

function createBattle(battlefieldId, deckA, deckB, opts) {
  opts = opts || {};
  const bf = decodeBattlefield(BATTLEFIELDS[battlefieldId]);
  const rules = Object.assign({}, DEFAULT_RULES, opts.rules || {});
  const state = {
    battlefieldId: bf.id, battlefieldName: bf.name,
    width: bf.width, height: bf.height, terrain: bf.terrain,
    fortresses: bf.fortresses.map((f) => ({ x: f.x, y: f.y, owner: null })),
    deployRows: bf.deployRows,
    units: {}, rules,
    players: [makePlayer(deckA, 0, rules), makePlayer(deckB, 1, rules)],
    current: 0, round: 1, phase: "deploy", log: [], winner: null, winBy: null,
    pendingDeploy: [0, 0],
  };
  state.players[1].command += rules.secondPlayerBonusCommand;
  logMsg(state, `Battle begins on ${bf.name}.`);
  return state;
}

function makePlayer(deck, index, rules) {
  const commanders = deck.filter((id) => BATTLE_CARDS[id].type === "commander");
  const rest = deck.filter((id) => BATTLE_CARDS[id].type !== "commander");
  return {
    index, command: 0, vp: 0,
    commanderQueue: commanders.slice(),
    draw: shuffle(rest.slice()), hand: [], discard: [], defeated: [],
    peeked: false,
  };
}

function shuffle(a, rnd) {
  const r = rnd || Math.random;
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function logMsg(s, text) { s.log.push({ round: s.round, player: s.current, text }); }

/* --------------------------------------------------------------------
   Deck validation
   -------------------------------------------------------------------- */
const DECK_RULES = { size: 12, commanders: 2 };

function validateDeck(deck) {
  const errs = [];
  if (deck.length !== DECK_RULES.size) errs.push(`A deck holds exactly ${DECK_RULES.size} cards (this one has ${deck.length}).`);
  const cards = deck.map((id) => BATTLE_CARDS[id]);
  if (cards.some((c) => !c)) { errs.push("Deck contains an unknown card id."); return errs; }
  const cmd = cards.filter((c) => c.type === "commander").length;
  if (cmd !== DECK_RULES.commanders) errs.push(`A deck holds exactly ${DECK_RULES.commanders} Commanders (this one has ${cmd}).`);
  const counts = {};
  for (const c of cards) {
    counts[c.id] = (counts[c.id] || 0) + 1;
    if (c.token) errs.push(`${c.name} is summoned only and cannot be put in a deck.`);
  }
  for (const id in counts) {
    const c = BATTLE_CARDS[id];
    const max = c.unique ? 1 : (c.maxCopies || 3);
    if (counts[id] > max) errs.push(`${c.name}: ${counts[id]} copies, limit is ${max}.`);
  }
  return errs;
}
