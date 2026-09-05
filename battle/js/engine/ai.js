/* =====================================================================
   THE OPPONENT

   A player that is not a person. It uses exactly the same functions the
   board does — legalMoves, legalAttacks, legalDeploys, doAbility — so it
   can never do anything a person could not, and a rule change reaches it
   without being reimplemented here.

   The method is deliberately shallow. It lists every legal action, plays
   each one on a copy of the state, scores the position that results, and
   keeps the best. Then it does it again, until nothing left is worth
   doing. No tree search: a turn is two Actions per unit on an 8x8 board,
   and the thing that makes a move good or bad in this game — whether it
   leaves a soft edge pointing at somebody — is visible one ply deep.

   Nothing here imports React or touches the DOM, so the whole opponent
   runs inside the test harness, which is how the balance numbers in
   tools/test-battle.js are produced.
   ===================================================================== */

/* --------------------------------------------------------------------
   Cloning. State is plain JSON by design (see js/engine/state.js), so a
   copy is a stringify away. The log is dropped: it grows without bound
   during a search and nothing scores it.
   -------------------------------------------------------------------- */
function cloneState(s) {
  const log = s.log;
  s.log = [];
  const copy = JSON.parse(JSON.stringify(s));
  s.log = log;
  return copy;
}

/* --------------------------------------------------------------------
   What a card is worth.

   Not its Command cost: cost is what it takes to put on the board, and
   what matters here is what losing it would mean. A Commander is worth
   far more than its stats because losing both ends the game, and a card
   already down to its last Life is worth less than a fresh one.
   -------------------------------------------------------------------- */
const AI_WEIGHTS = {
  troop: 10,          // a troop on the board
  commander: 46,      // a commander — losing both is an instant loss
  perLife: 6,         // each Life still held
  attack: 2.0,        // offensive power actually on the field
  defence: 0.8,       // total armour, all four edges
  fortress: 14,       // holding one, which also ticks a victory point a round
  vp: 3.2,            // a victory point banked
  command: 1.1,       // Command in the pool, which is future units
  handCard: 1.4,      // a card in hand is an option
  canHit: 3.0,        // an enemy we could strike next turn
  exposed: 4.2,       // one of ours an enemy could strike, weighted by how soft the edge is
  towardFortress: 0.9, // pressure on a fortress we do not hold
  commanderRisk: 16,  // a commander standing where it can be hit
};

function aiUnitValue(s, u) {
  const c = cardOf(u);
  const st = effectiveStats(s, u);
  const base = c.type === "commander" ? AI_WEIGHTS.commander : AI_WEIGHTS.troop;
  const armour = st.defence.front + st.defence.left + st.defence.right + st.defence.rear;
  return base
    + u.lives * AI_WEIGHTS.perLife
    + st.attack * AI_WEIGHTS.attack
    + armour * AI_WEIGHTS.defence;
}

/* Could `a` strike `t` if it were `a`'s turn? previewAttack already knows
   about arcs, facing and per-edge defence; this only adds reach and line
   of sight, because legalAttacks refuses to answer for the idle player. */
function aiCouldHit(s, a, t) {
  const st = effectiveStats(s, a);
  const d = dirBetween(a.x, a.y, t.x, t.y);
  if (!d) return null;
  const dist = Math.abs(t.x - a.x) + Math.abs(t.y - a.y);
  if (dist > st.range) return null;
  if (dist > 1 && !hasLineOfSight(s, a.x, a.y, t.x, t.y)) return null;
  const p = previewAttack(s, a, t);
  return p.inArc && p.damage ? p : null;
}

/* --------------------------------------------------------------------
   The evaluation. Positive is good for `p`.
   -------------------------------------------------------------------- */
function aiEvaluate(s, p, weights) {
  const w = weights || AI_WEIGHTS;
  if (s.winner != null) return s.winner === p ? 1e6 : -1e6;
  const foe = opponent(p);
  let score = 0;

  const mine = [], theirs = [];
  for (const u of Object.values(s.units)) (u.owner === p ? mine : theirs).push(u);

  for (const u of mine) score += aiUnitValue(s, u);
  for (const u of theirs) score -= aiUnitValue(s, u);

  /* Losing both Commanders ends it, so the second one is worth more than
     the first. Without this the opponent trades its last Commander off
     for material and hands over the game. */
  const myCmd = livingCommanders(s, p).length, theirCmd = livingCommanders(s, foe).length;
  if (myCmd === 1) score -= w.commander * 0.8;
  if (theirCmd === 1) score += w.commander * 0.8;

  for (const f of s.fortresses) {
    if (f.owner === p) score += w.fortress;
    else if (f.owner === foe) score -= w.fortress;
  }
  score += (s.players[p].vp - s.players[foe].vp) * w.vp;
  score += (s.players[p].command - s.players[foe].command) * w.command;
  score += (s.players[p].hand.length - s.players[foe].hand.length) * w.handCard;

  /* Threat, both ways. An attack lands only when attack beats the defence
     of the edge it arrives at, so this is really a facing term: the same
     two units score differently depending on which way they are turned. */
  for (const a of mine) for (const t of theirs) if (aiCouldHit(s, a, t)) score += w.canHit;
  for (const a of theirs) for (const t of mine) {
    if (!aiCouldHit(s, a, t)) continue;
    score -= w.exposed;
    if (cardOf(t).type === "commander") score -= w.commanderRisk;
  }

  /* Something has to want the fortresses, or both sides sit at home and
     the game is decided by the clock. */
  for (const f of s.fortresses) {
    if (f.owner === p) continue;
    let nearest = 99;
    for (const u of mine) nearest = Math.min(nearest, Math.abs(u.x - f.x) + Math.abs(u.y - f.y));
    if (nearest < 99) score += (s.width - Math.min(nearest, s.width)) * w.towardFortress;
  }
  return score;
}

/* --------------------------------------------------------------------
   Every legal action, as data. Each carries a `run(state)` that performs
   it, so scoring a candidate and playing it for real are the same code.
   -------------------------------------------------------------------- */
function aiLegalActions(s) {
  const p = s.current, pl = s.players[p];
  const out = [];

  for (const u of Object.values(s.units)) {
    if (u.owner !== p) continue;
    const uid = u.uid;

    for (const a of legalAttacks(s, uid))
      out.push({ kind: "attack", uid, targetUid: a.targetUid,
                 label: `${cardOf(u).name} attacks`,
                 run: (st) => doAttack(st, uid, a.targetUid) });

    if (canCapture(s, uid))
      out.push({ kind: "capture", uid, label: `${cardOf(u).name} takes the fortress`,
                 run: (st) => doCapture(st, uid) });

    /* A move and the facing it ends on are one decision, not two: landing
       on the right square with the wrong edge forward is usually worse
       than not moving at all. */
    for (const m of legalMoves(s, uid)) for (const f of DIRS)
      out.push({ kind: "move", uid, x: m.x, y: m.y, facing: f,
                 label: `${cardOf(u).name} moves`,
                 run: (st) => doMove(st, uid, m.x, m.y, f) });

    if (canRotate(s, uid)) for (const f of DIRS) {
      if (f === u.facing) continue;
      out.push({ kind: "rotate", uid, facing: f, label: `${cardOf(u).name} turns`,
                 run: (st) => doRotate(st, uid, f) });
    }

    for (const t of triggeredAbilities(s, uid)) {
      if (!t.ready) continue;
      const ab = ABILITIES[t.id];
      if (needsTarget(ab)) {
        for (const tg of eligibleTargets(s, ab, p, u))
          out.push({ kind: "ability", uid, abilityId: t.id, target: { uid: tg.uid },
                     label: `${cardOf(u).name} uses ${ab.name}`,
                     run: (st) => doAbility(st, uid, t.id, { uid: tg.uid }) });
      } else {
        out.push({ kind: "ability", uid, abilityId: t.id, target: null,
                   label: `${cardOf(u).name} uses ${ab.name}`,
                   run: (st) => doAbility(st, uid, t.id, null) });
      }
    }
  }

  for (let i = 0; i < pl.hand.length; i++) {
    const cardId = pl.hand[i], card = BATTLE_CARDS[cardId];
    if (!card) continue;
    if (card.type === "special") {
      if (pl.command < card.cost) continue;
      const effects = (card.abilities || []).flatMap((id) => ABILITIES[id].effects);
      const pseudo = { effects };
      if (needsTarget(pseudo)) {
        for (const tg of eligibleTargets(s, pseudo, p, null))
          out.push({ kind: "special", handIndex: i, target: { uid: tg.uid },
                     label: `plays ${card.name}`,
                     run: (st) => doSpecial(st, i, { uid: tg.uid }) });
      } else {
        out.push({ kind: "special", handIndex: i, target: null, label: `plays ${card.name}`,
                   run: (st) => doSpecial(st, i, null) });
      }
      continue;
    }
    for (const c of legalDeploys(s, cardId)) for (const f of DIRS)
      out.push({ kind: "deploy", handIndex: i, x: c.x, y: c.y, facing: f,
                 label: `deploys ${card.name}`,
                 run: (st) => doDeploy(st, i, c.x, c.y, f) });
  }
  return out;
}

/* --------------------------------------------------------------------
   Difficulty.

   Not a handicap on the rules — the opponent always plays legally and
   always sees the whole board. What changes is how carefully it looks:
   whether it weighs the danger it is putting its own cards in, whether
   it checks what the reply would be, and how often it takes something
   other than the best move it found.
   -------------------------------------------------------------------- */
const AI_LEVELS = {
  cautious: {
    name: "Cautious",
    blurb: "Sees the board but not the consequences. It will walk a soft flank into your line.",
    weights: Object.assign({}, AI_WEIGHTS, { exposed: 0.6, commanderRisk: 3, canHit: 1.2 }),
    reply: false, slack: 0.45, minGain: 0.5,
  },
  steady: {
    name: "Steady",
    blurb: "Takes the best move it can see, and knows which way its cards are facing.",
    weights: AI_WEIGHTS,
    reply: false, slack: 0.12, minGain: 0.5,
  },
  ruthless: {
    name: "Ruthless",
    blurb: "Checks what you could do back before it commits. It will not offer you a rear edge.",
    weights: Object.assign({}, AI_WEIGHTS, { exposed: 5.5, commanderRisk: 22 }),
    reply: true, slack: 0, minGain: 0.25,
  },
};

/* What is the best single thing the opponent could do to us from here?
   One ply of reply, used only by the hardest level and only on the few
   candidates already worth considering, because it is the expensive part. */
function aiBestReply(s, p, weights) {
  const probe = cloneState(s);
  probe.current = opponent(p);
  for (const u of Object.values(probe.units)) {
    if (u.owner !== probe.current) continue;
    u.actionsLeft = probe.rules.actionsPerTurn;
    u.movedThisTurn = false;
    u.sick = false;
  }
  let worst = 0;
  const before = aiEvaluate(probe, p, weights);
  for (const a of aiLegalActions(probe)) {
    if (a.kind !== "attack" && a.kind !== "capture") continue;   // only the damaging replies
    const next = cloneState(probe);
    const r = a.run(next);
    if (!r || r.ok === false) continue;
    worst = Math.min(worst, aiEvaluate(next, p, weights) - before);
  }
  return worst;
}

/* --------------------------------------------------------------------
   One action. Returns null when the opponent judges the turn finished.
   The UI calls this on a timer so the board can be watched; the test
   harness calls it in a loop.
   -------------------------------------------------------------------- */
function aiChooseAction(s, level, rnd) {
  const cfg = AI_LEVELS[level] || AI_LEVELS.steady;
  const rand = rnd || Math.random;
  const p = s.current;
  const actions = aiLegalActions(s);
  if (!actions.length) return null;

  const base = aiEvaluate(s, p, cfg.weights);
  const scored = [];
  for (const a of actions) {
    const next = cloneState(s);
    const r = a.run(next);
    if (!r || r.ok === false) continue;
    scored.push({ action: a, gain: aiEvaluate(next, p, cfg.weights) - base, next });
  }
  if (!scored.length) return null;
  scored.sort((x, y) => y.gain - x.gain);

  /* The reply check is worth its cost only near the top of the list. */
  if (cfg.reply) {
    for (const c of scored.slice(0, 6)) c.gain += aiBestReply(c.next, p, cfg.weights);
    scored.sort((x, y) => y.gain - x.gain);
  }

  const best = scored[0];
  if (best.gain < cfg.minGain) return null;    // nothing left worth an Action

  /* Slack: sometimes take a move that is nearly as good, so the same deck
     on the same battlefield does not play out identically every time. */
  if (cfg.slack > 0) {
    const cut = best.gain - Math.abs(best.gain) * cfg.slack - 1;
    const pool = scored.filter((c) => c.gain >= cut && c.gain >= cfg.minGain);
    if (pool.length > 1 && rand() < cfg.slack) return pool[Math.floor(rand() * pool.length)].action;
  }
  return best.action;
}

/* Which cards to throw away when the hand is over the limit. The ones it
   cannot afford, then the most expensive, since Command is the constraint. */
function aiDiscardChoice(s) {
  const pl = s.players[s.current];
  const need = pl.hand.length - s.rules.maxHand;
  if (need <= 0) return [];
  const ranked = pl.hand.map((id, i) => {
    const c = BATTLE_CARDS[id];
    const afford = pl.command >= (c.type === "special" ? c.cost : deployCost(s, s.current, id));
    return { i, keep: (afford ? 10 : 0) - c.cost + (c.type === "special" ? 1 : 0) };
  }).sort((a, b) => a.keep - b.keep);
  return ranked.slice(0, need).map((r) => r.i).sort((a, b) => b - a);
}

/* Commanders, at the start. Home row only, so this is a choice of column:
   spread them out, and prefer a column that leads to a fortress. */
function aiPlaceCommanders(s, p, level) {
  const cfg = AI_LEVELS[level] || AI_LEVELS.steady;
  while (s.phase === "deploy" && s.players[p].commanderQueue.length) {
    const cardId = s.players[p].commanderQueue[0];
    const squares = legalCommanderSquares(s, p);
    if (!squares.length) break;
    let bestSq = squares[0], bestScore = -Infinity;
    for (const c of squares) {
      let sc = 0;
      for (const f of s.fortresses) sc += (s.width - Math.abs(f.x - c.x)) * 1.4;
      for (const u of Object.values(s.units))
        if (u.owner === p) sc -= Math.max(0, 4 - Math.abs(u.x - c.x)) * 3;   // do not stack them
      sc -= Math.abs(c.x - (s.width - 1) / 2) * 0.4;                          // centre, mildly
      if (sc > bestScore) { bestScore = sc; bestSq = c; }
    }
    placeCommander(s, p, cardId, bestSq.x, bestSq.y);
  }
  return { ok: true };
}

/* A whole turn, for headless use. The UI does not call this — it steps
   through aiChooseAction so the board can be watched. */
function aiTakeTurn(s, level, rnd) {
  const taken = [];
  for (let guard = 0; guard < 60; guard++) {
    if (s.phase !== "main" || s.winner != null) break;
    const a = aiChooseAction(s, level, rnd);
    if (!a) break;
    const r = a.run(s);
    if (!r || r.ok === false) break;
    taken.push(a);
  }
  if (s.phase === "main" && s.winner == null) endTurn(s, aiDiscardChoice(s));
  return taken;
}
