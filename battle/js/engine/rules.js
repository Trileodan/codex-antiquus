/* =====================================================================
   RULES
   Legality queries and the mutations that follow from them. Every
   mutation returns { ok, error } so the UI can refuse an illegal action
   before it is taken rather than reporting an error afterwards.
   ===================================================================== */

/* ---------------- deployment phase (Commanders) ------------------- */

function legalCommanderSquares(s, p) {
  const row = s.deployRows[p];
  const out = [];
  for (let x = 0; x < s.width; x++) {
    if (!terrainAt(s, x, row).move) continue;
    if (unitAt(s, x, row)) continue;
    out.push({ x, y: row });
  }
  return out;
}

function placeCommander(s, p, cardId, x, y) {
  if (s.phase !== "deploy") return { ok: false, error: "Commanders are placed before the battle begins." };
  const q = s.players[p].commanderQueue;
  if (!q.includes(cardId)) return { ok: false, error: "That Commander is not waiting to be placed." };
  if (!legalCommanderSquares(s, p).some((c) => c.x === x && c.y === y))
    return { ok: false, error: "Commanders must start on an empty square of your home row." };
  q.splice(q.indexOf(cardId), 1);
  spawn(s, p, cardId, x, y, p === 0 ? "S" : "N", { sick: false });
  logMsg(s, `${BATTLE_CARDS[cardId].name} takes the field.`);
  if (s.players[0].commanderQueue.length === 0 && s.players[1].commanderQueue.length === 0) {
    s.phase = "main"; s.current = 0; s.round = 1;
    for (const pl of s.players) drawCards(s, pl.index, s.rules.openingHand);
    beginTurn(s);
  }
  return { ok: true };
}

function spawn(s, p, cardId, x, y, facing, opts) {
  opts = opts || {};
  const card = BATTLE_CARDS[cardId];
  const u = {
    uid: nextUid(), owner: p, cardId, x, y, facing: facing || (p === 0 ? "S" : "N"),
    lives: card.lives || 1, maxLives: card.lives || 1,
    /* A card with Deployment Sickness has no Actions until its owner's next
       turn. One that arrives without it (Celeritas, and anything like it
       later) must arrive with a full allowance, or the passive does nothing. */
    actionsLeft: opts.sick === false ? s.rules.actionsPerTurn : 0,
    movedThisTurn: false, sick: opts.sick !== false,
    statuses: [], cooldowns: {},
  };
  s.units[u.uid] = u;
  fire(s, u, "onDeploy");
  return u;
}

/* ---------------- turn flow --------------------------------------- */

function beginTurn(s) {
  const p = s.current, pl = s.players[p];
  const per = s.round >= s.rules.lateFromRound ? s.rules.commandLate : s.rules.commandEarly;
  const gain = livingCommanders(s, p).length * per;
  pl.command = Math.min(commandCap(s, p), pl.command + gain);

  for (const u of Object.values(s.units)) {
    if (u.owner !== p) continue;
    u.actionsLeft = s.rules.actionsPerTurn;
    u.movedThisTurn = false;
    u.sick = false;
    u.statuses = (u.statuses || []).filter((st) => {
      if (STATUSES[st.id].expires !== "ownerTurnStart") return true;
      st.turns -= 1;
      return st.turns > 0;
    });
    for (const k in u.cooldowns) if (u.cooldowns[k] > 0) u.cooldowns[k] -= 1;
  }
  drawCards(s, p, s.rules.drawPerTurn);
}

function drawCards(s, p, n) {
  const pl = s.players[p];
  for (let i = 0; i < n; i++) {
    if (!pl.draw.length) {
      if (!pl.discard.length) break;
      pl.draw = shuffle(pl.discard.slice()); pl.discard = [];
      logMsg(s, `Player ${p + 1} reshuffles the discard pile.`);
    }
    pl.hand.push(pl.draw.pop());
  }
}

function endTurn(s, discards) {
  const pl = s.players[s.current];
  if (pl.hand.length > s.rules.maxHand) {
    const need = pl.hand.length - s.rules.maxHand;
    if (!discards || discards.length !== need)
      return { ok: false, error: `Discard down to ${s.rules.maxHand} cards (${need} to go).` };
    for (const idx of discards.slice().sort((a, b) => b - a)) pl.discard.push(pl.hand.splice(idx, 1)[0]);
  }
  if (s.current === 1) {
    for (const f of s.fortresses) if (f.owner != null) s.players[f.owner].vp += s.rules.vpPerFortress;
    for (const u of Object.values(s.units)) {
      u.statuses = (u.statuses || []).filter((st) => {
        if (STATUSES[st.id].expires !== "roundEnd") return true;
        st.turns -= 1; return st.turns > 0;
      });
    }
    const a = s.players[0].vp, b = s.players[1].vp;
    logMsg(s, `End of round ${s.round}. Victory points: ${a} – ${b}.`);
    if (checkVictory(s)) return { ok: true };
    s.round += 1; s.current = 0;
  } else {
    s.current = 1;
  }
  beginTurn(s);
  return { ok: true };
}

function checkVictory(s) {
  for (const p of [0, 1]) {
    if (livingCommanders(s, p).length === 0 && s.phase === "main") {
      s.winner = opponent(p); s.winBy = "commanders"; s.phase = "over";
      logMsg(s, `Player ${p + 1} has lost both Commanders. Player ${opponent(p) + 1} wins.`);
      return true;
    }
  }
  for (const p of [0, 1]) {
    if (s.players[p].vp >= s.rules.vpToWin) {
      s.winner = p; s.winBy = "points"; s.phase = "over";
      logMsg(s, `Player ${p + 1} reaches ${s.players[p].vp} victory points and wins.`);
      return true;
    }
  }
  return false;
}

/* ---------------- movement ---------------------------------------- */

function legalMoves(s, uid) {
  const u = s.units[uid];
  if (!u || u.owner !== s.current || u.sick) return [];
  const st = effectiveStats(s, u);
  if (st.noActions || st.noMove || u.movedThisTurn || u.actionsLeft < 1) return [];
  const budget = st.speed;
  const seen = { [`${u.x},${u.y}`]: 0 };
  const out = [];
  const queue = [{ x: u.x, y: u.y, spent: 0 }];
  while (queue.length) {
    const cur = queue.shift();
    for (const d of DIRS) {
      const nx = cur.x + DELTA[d][0], ny = cur.y + DELTA[d][1];
      if (!inBounds(s, nx, ny)) continue;
      const t = terrainAt(s, nx, ny);
      if (t.move == null) continue;
      if (unitAt(s, nx, ny)) continue;
      const cost = st.ignoreTerrain ? 1 : t.move;
      const spent = cur.spent + cost;
      if (spent > budget) continue;
      const key = `${nx},${ny}`;
      if (seen[key] != null && seen[key] <= spent) continue;
      seen[key] = spent;
      out.push({ x: nx, y: ny, cost: spent });
      queue.push({ x: nx, y: ny, spent });
    }
  }
  const best = {};
  for (const m of out) {
    const k = `${m.x},${m.y}`;
    if (!best[k] || best[k].cost > m.cost) best[k] = m;
  }
  return Object.values(best);
}

function doMove(s, uid, x, y, facing) {
  const u = s.units[uid];
  const legal = legalMoves(s, uid).find((m) => m.x === x && m.y === y);
  if (!legal) return { ok: false, error: "That square is out of reach." };
  u.x = x; u.y = y;
  if (facing && DIRS.includes(facing)) u.facing = facing;
  u.movedThisTurn = true; u.actionsLeft -= 1;
  logMsg(s, `${cardOf(u).name} moves to ${sq(x, y)} facing ${facing || u.facing}.`);
  return { ok: true };
}

const sq = (x, y) => `${String.fromCharCode(65 + x)}${y + 1}`;

/* ---------------- rotation ----------------------------------------
   Turning on the spot is its own Action. It is not a Move, so a unit that
   has already moved can still turn to face a threat, and a unit that turns
   first can still move afterwards.
   ------------------------------------------------------------------- */

function canRotate(s, uid) {
  const u = s.units[uid];
  if (!u || u.owner !== s.current || u.sick || u.actionsLeft < 1) return false;
  return !effectiveStats(s, u).noActions;
}

function doRotate(s, uid, facing) {
  const u = s.units[uid];
  if (!canRotate(s, uid)) return { ok: false, error: "That card cannot turn right now." };
  if (!DIRS.includes(facing)) return { ok: false, error: "Not a direction." };
  if (u.facing === facing) return { ok: false, error: "Already facing that way." };
  u.facing = facing; u.actionsLeft -= 1;
  logMsg(s, `${cardOf(u).name} turns to face ${facing}.`);
  return { ok: true };
}

/* ---------------- combat ------------------------------------------ */

function hasLineOfSight(s, ax, ay, bx, by) {
  const d = dirBetween(ax, ay, bx, by);
  if (!d) return false;
  let x = ax + DELTA[d][0], y = ay + DELTA[d][1];
  while (!(x === bx && y === by)) {
    if (unitAt(s, x, y)) return false;
    if (terrainAt(s, x, y).blocksLos) return false;
    x += DELTA[d][0]; y += DELTA[d][1];
  }
  return true;
}

function legalAttacks(s, uid) {
  const u = s.units[uid];
  if (!u || u.owner !== s.current || u.sick) return [];
  const st = effectiveStats(s, u);
  if (st.noActions || u.actionsLeft < 1) return [];
  const out = [];
  for (const t of Object.values(s.units)) {
    if (t.owner === u.owner) continue;
    const d = dirBetween(u.x, u.y, t.x, t.y);
    if (!d) continue;
    const dist = Math.abs(t.x - u.x) + Math.abs(t.y - u.y);
    if (dist > st.range) continue;
    if (dist > 1 && !hasLineOfSight(s, u.x, u.y, t.x, t.y)) continue;
    if (dist === 1 && terrainAt(s, t.x, t.y).move == null) continue;
    const p = previewAttack(s, u, t);
    if (!p.inArc) continue;          // the card cannot strike through that edge
    out.push(p);
  }
  return out;
}

function previewAttack(s, u, t) {
  const aStats = effectiveStats(s, u), dStats = effectiveStats(s, t);
  const dirToTarget = dirBetween(u.x, u.y, t.x, t.y);
  const attackSide = sideFacing(u.facing, dirToTarget);
  const incoming = dirBetween(t.x, t.y, u.x, u.y);
  const defenceSide = sideFacing(t.facing, incoming);
  const inArc = aStats.arcs.includes(attackSide);
  const attack = aStats.attack, defence = dStats.defence[defenceSide];
  return {
    targetUid: t.uid, x: t.x, y: t.y,
    attackSide, defenceSide, attack, defence, inArc,
    damage: inArc && attack > defence ? 1 : 0,
  };
}

function doAttack(s, uid, targetUid) {
  const u = s.units[uid];
  const p = legalAttacks(s, uid).find((a) => a.targetUid === targetUid);
  if (!p) return { ok: false, error: "No legal attack on that unit." };
  const t = s.units[targetUid];
  u.actionsLeft -= 1;
  logMsg(s, `${cardOf(u).name} attacks ${cardOf(t).name} through its ${p.attackSide} — attack ${p.attack} against ${p.defenceSide} defence ${p.defence}.`);
  if (!p.damage) { logMsg(s, `The attack is blocked.`); return { ok: true, damage: 0 }; }
  const killed = damageUnit(s, t, 1, u);
  return { ok: true, damage: 1, killed };
}

function damageUnit(s, t, amount, source) {
  t.lives -= amount;
  logMsg(s, `${cardOf(t).name} loses ${amount} Life (${Math.max(0, t.lives)} remaining).`);
  if (t.lives > 0) return false;
  logMsg(s, `${cardOf(t).name} is defeated.`);
  fire(s, t, "onDefeat");
  s.players[t.owner].defeated.push(t.cardId);
  delete s.units[t.uid];
  if (source && s.units[source.uid]) fire(s, source, "onKill");
  checkVictory(s);
  return true;
}

/* ---------------- fortresses -------------------------------------- */

function canCapture(s, uid) {
  const u = s.units[uid];
  if (!u || u.owner !== s.current || u.sick || u.actionsLeft < 1) return false;
  if (effectiveStats(s, u).noActions) return false;
  const f = fortressAt(s, u.x, u.y);
  return !!f && f.owner !== u.owner;
}

function doCapture(s, uid) {
  if (!canCapture(s, uid)) return { ok: false, error: "Nothing here to capture." };
  const u = s.units[uid];
  const f = fortressAt(s, u.x, u.y);
  f.owner = u.owner; u.actionsLeft -= 1;
  logMsg(s, `${cardOf(u).name} captures the fortress at ${sq(f.x, f.y)}.`);
  return { ok: true };
}

/* ---------------- deploying from hand ------------------------------ */

function legalDeploys(s, cardId) {
  const p = s.current, card = BATTLE_CARDS[cardId];
  if (!card || card.type === "special") return [];
  if (s.players[p].command < deployCost(s, p, cardId)) return [];
  const ok = {};
  const add = (x, y) => {
    if (!inBounds(s, x, y)) return;
    if (!terrainAt(s, x, y).move) return;
    if (unitAt(s, x, y)) return;
    ok[`${x},${y}`] = { x, y };
  };
  const from = s.rules.deployFrom || ["home", "commander"];
  if (from.includes("home")) {
    const row = s.deployRows[p];
    for (let x = 0; x < s.width; x++) add(x, row);
  }
  if (from.includes("commander")) {
    for (const u of livingCommanders(s, p)) for (const d of DIRS) add(u.x + DELTA[d][0], u.y + DELTA[d][1]);
  }
  if (from.includes("fortress")) {
    for (const f of s.fortresses) if (f.owner === p) for (const d of DIRS) add(f.x + DELTA[d][0], f.y + DELTA[d][1]);
  }
  return Object.values(ok);
}

function noSickness(s, p, x, y) {
  for (const u of Object.values(s.units)) {
    if (u.owner !== p) continue;
    for (const ab of abilitiesOf(u)) {
      if (ab.trigger !== "passive") continue;
      for (const e of ab.effects) {
        if (e.type !== "noDeploySickness") continue;
        if (Math.abs(u.x - x) + Math.abs(u.y - y) <= (e.radius || 1)) return true;
      }
    }
  }
  return false;
}

function doDeploy(s, handIndex, x, y, facing) {
  const p = s.current, pl = s.players[p];
  const cardId = pl.hand[handIndex];
  if (!cardId) return { ok: false, error: "No such card in hand." };
  if (!legalDeploys(s, cardId).some((c) => c.x === x && c.y === y))
    return { ok: false, error: "Not a legal deployment square." };
  const cost = deployCost(s, p, cardId);
  pl.command -= cost;
  pl.hand.splice(handIndex, 1);
  const u = spawn(s, p, cardId, x, y, facing, { sick: !noSickness(s, p, x, y) });
  logMsg(s, `Player ${p + 1} deploys ${BATTLE_CARDS[cardId].name} at ${sq(x, y)} for ${cost} Command.`);
  return { ok: true, uid: u.uid };
}

/* ---------------- abilities and specials --------------------------- */

function fire(s, unit, trigger) {
  for (const ab of abilitiesOf(unit)) {
    if (ab.trigger !== trigger) continue;
    applyEffects(s, ab.effects, { source: unit, owner: unit.owner });
    logMsg(s, `${cardOf(unit).name}: ${ab.name}.`);
  }
}

function triggeredAbilities(s, uid) {
  const u = s.units[uid];
  if (!u) return [];
  return abilitiesOf(u).filter((ab) => ab.trigger === "triggered").map((ab) => ({
    id: ab.id, name: ab.name, text: ab.text,
    ready: (u.cooldowns[ab.id] || 0) === 0 && u.actionsLeft >= (ab.costsAction ? 1 : 0)
           && !u.sick && !effectiveStats(s, u).noActions,
    cooldown: u.cooldowns[ab.id] || 0,
  }));
}

function doAbility(s, uid, abilityId, target) {
  const u = s.units[uid];
  if (!u || u.owner !== s.current) return { ok: false, error: "Not your unit." };
  const ab = ABILITIES[abilityId];
  if (!ab || !(cardOf(u).abilities || []).includes(abilityId)) return { ok: false, error: "That card has no such ability." };
  if ((u.cooldowns[abilityId] || 0) > 0) return { ok: false, error: `${ab.name} is cooling down for ${u.cooldowns[abilityId]} more round(s).` };
  if (ab.costsAction && u.actionsLeft < 1) return { ok: false, error: "No Actions left." };
  const res = applyEffects(s, ab.effects, { source: u, owner: u.owner, target });
  if (!res.ok) return res;
  if (ab.costsAction) u.actionsLeft -= 1;
  if (ab.cooldown) u.cooldowns[abilityId] = ab.cooldown;
  logMsg(s, `${cardOf(u).name} uses ${ab.name}.`);
  return { ok: true };
}

function doSpecial(s, handIndex, target) {
  const p = s.current, pl = s.players[p];
  const cardId = pl.hand[handIndex];
  const card = BATTLE_CARDS[cardId];
  if (!card || card.type !== "special") return { ok: false, error: "That is not a Special card." };
  if (pl.command < card.cost) return { ok: false, error: "Not enough Command." };
  const effects = (card.abilities || []).flatMap((id) => ABILITIES[id].effects);
  const res = applyEffects(s, effects, { owner: p, target });
  if (!res.ok) return res;
  pl.command -= card.cost;
  pl.hand.splice(handIndex, 1);
  pl.discard.push(cardId);
  logMsg(s, `Player ${p + 1} plays ${card.name}.`);
  return { ok: true };
}

/* ---------------- the effect vocabulary ----------------------------
   Every effect type the engine understands lives here. A new card
   reuses these; a genuinely new behaviour adds one entry and is then
   available to every future card.
   ------------------------------------------------------------------- */
function applyEffects(s, effects, ctx) {
  for (const e of effects) {
    const fn = EFFECTS[e.type];
    if (!fn) return { ok: false, error: `Unknown effect type "${e.type}".` };
    const r = fn(s, e, ctx);
    if (r && r.ok === false) return r;
  }
  return { ok: true };
}

function addStatus(s, u, id, rounds, clears) {
  if (clears) u.statuses = u.statuses.filter((st) => st.id !== clears);
  if (id === "hidden" && !effectiveStats(s, u).canHide) return;
  u.statuses = u.statuses.filter((st) => st.id !== id);
  u.statuses.push({ id, turns: rounds });
}

const EFFECTS = {
  ignoreTerrain: () => ({ ok: true }),
  aura: () => ({ ok: true }),
  commandCap: () => ({ ok: true }),
  deployDiscount: () => ({ ok: true }),
  noDeploySickness: () => ({ ok: true }),

  draw: (s, e, ctx) => { drawCards(s, ctx.owner, e.count || 1); return { ok: true }; },

  peek: (s, e, ctx) => { s.players[ctx.owner].peeked = true; return { ok: true }; },

  summon: (s, e, ctx) => {
    const u = ctx.source;
    const spots = DIRS.map((d) => ({ x: u.x + DELTA[d][0], y: u.y + DELTA[d][1] }))
      .filter((c) => inBounds(s, c.x, c.y) && terrainAt(s, c.x, c.y).move != null && !unitAt(s, c.x, c.y));
    if (!spots.length) return { ok: false, error: "No adjacent square free to summon onto." };
    const spot = ctx.target && spots.find((c) => c.x === ctx.target.x && c.y === ctx.target.y) || spots[0];
    spawn(s, ctx.owner, e.cardId, spot.x, spot.y, u.facing, { sick: true });
    logMsg(s, `${BATTLE_CARDS[e.cardId].name} is summoned at ${sq(spot.x, spot.y)}.`);
    return { ok: true };
  },

  status: (s, e, ctx) => {
    if (e.target === "self") { addStatus(s, ctx.source, e.status, e.rounds, e.clears); return { ok: true }; }
    if (e.target === "allEnemies") {
      for (const u of Object.values(s.units)) if (u.owner !== ctx.owner) addStatus(s, u, e.status, e.rounds, e.clears);
      return { ok: true };
    }
    const t = ctx.target && s.units[ctx.target.uid];
    if (!t) return { ok: false, error: "Choose a target." };
    if (e.target === "enemyUnit" && t.owner === ctx.owner) return { ok: false, error: "That target must be an enemy." };
    if (e.target === "friendlyInRange") {
      if (t.owner !== ctx.owner) return { ok: false, error: "That target must be friendly." };
      const d = Math.abs(t.x - ctx.source.x) + Math.abs(t.y - ctx.source.y);
      if (d > (e.range || 99)) return { ok: false, error: "Out of range." };
    }
    addStatus(s, t, e.status, e.rounds, e.clears);
    return { ok: true };
  },

  heal: (s, e, ctx) => {
    const t = ctx.target && s.units[ctx.target.uid];
    if (!t) return { ok: false, error: "Choose a damaged friendly card." };
    if (t.owner !== ctx.owner) return { ok: false, error: "That target must be friendly." };
    if (t.lives >= t.maxLives) return { ok: false, error: "That card has lost no Lives." };
    t.lives = Math.min(t.maxLives, t.lives + (e.amount || 1));
    logMsg(s, `${cardOf(t).name} recovers a Life.`);
    return { ok: true };
  },

  damage: (s, e, ctx) => {
    const t = ctx.target && s.units[ctx.target.uid];
    if (!t) return { ok: false, error: "Choose a target." };
    if (t.owner === ctx.owner) return { ok: false, error: "That target must be an enemy." };
    damageUnit(s, t, e.amount || 1, null);
    return { ok: true };
  },

  pull: (s, e, ctx) => {
    const u = ctx.source, t = ctx.target && s.units[ctx.target.uid];
    if (!t) return { ok: false, error: "Choose an enemy to pull." };
    if (t.owner === ctx.owner) return { ok: false, error: "That target must be an enemy." };
    const d = dirBetween(t.x, t.y, u.x, u.y);
    if (!d) return { ok: false, error: "The target must be in a straight line from this Commander." };
    if (Math.abs(t.x - u.x) + Math.abs(t.y - u.y) > (e.range || 3)) return { ok: false, error: "Out of range." };
    const nx = t.x + DELTA[d][0], ny = t.y + DELTA[d][1];
    if (!inBounds(s, nx, ny) || unitAt(s, nx, ny) || terrainAt(s, nx, ny).move == null)
      return { ok: false, error: "The square they would be pulled into is not free." };
    t.x = nx; t.y = ny;
    logMsg(s, `${cardOf(t).name} is drawn to ${sq(nx, ny)}.`);
    return { ok: true };
  },

  extraAction: (s, e, ctx) => {
    const t = e.target === "friendlyUnit" ? (ctx.target && s.units[ctx.target.uid]) : ctx.source;
    if (!t) return { ok: false, error: "Choose a friendly unit." };
    if (t.owner !== ctx.owner) return { ok: false, error: "That target must be friendly." };
    t.actionsLeft += 1;
    if (e.allowSecondMove) t.movedThisTurn = false;
    return { ok: true };
  },
};
