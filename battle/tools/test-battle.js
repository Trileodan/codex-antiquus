/* =====================================================================
   Headless rules tests + random playouts.
       node battle/tools/test-battle.js
   Loads the data and engine files in a vm exactly as the browser does,
   so the thing being tested is the thing that ships.
   ===================================================================== */
const fs = require("fs"), path = require("path"), vm = require("vm");
const ROOT = path.join(__dirname, "..");
const FILES = [
  "js/data/terrain.js", "js/data/statuses.js", "js/data/abilities.js",
  "js/data/cards.js", "js/data/battlefields.js",
  "js/engine/state.js", "js/engine/rules.js",
];
const sandbox = { console, Math, Object, Array, String, Number, JSON };
vm.createContext(sandbox);
for (const f of FILES) vm.runInContext(fs.readFileSync(path.join(ROOT, f), "utf8"), sandbox, { filename: f });

const NAMES = ["TERRAIN","STATUSES","ABILITIES","BATTLE_CARDS","BATTLEFIELDS","DIRS","DELTA","SIDES",
  "sideFacing","dirBetween","inBounds","terrainAt","unitAt","fortressAt","cardOf","livingCommanders",
  "effectiveStats","commandCap","deployCost","createBattle","validateDeck","decodeBattlefield",
  "legalCommanderSquares","placeCommander","legalMoves","doMove","legalAttacks","previewAttack","doAttack",
  "canCapture","doCapture","legalDeploys","doDeploy","doSpecial","doAbility","triggeredAbilities",
  "endTurn","beginTurn","checkVictory","spawn","damageUnit","hasLineOfSight","DECK_RULES","shuffle"];
const E = vm.runInContext(`({${NAMES.map(n=>`${n}: typeof ${n}==="undefined"?undefined:${n}`).join(",")}})`, sandbox);

let pass = 0, fail = 0;
const ok = (cond, msg) => { if (cond) { pass++; } else { fail++; console.log("  FAIL  " + msg); } };
const section = (t) => console.log("\n" + t);

/* ---------- geometry ---------- */
section("Facing and sides");
ok(E.sideFacing("N", "N") === "front", "attacked from the way you face is a front hit");
ok(E.sideFacing("N", "S") === "rear", "attacked from behind is a rear hit");
ok(E.sideFacing("N", "E") === "right", "east of a north-facing unit is its right");
ok(E.sideFacing("E", "N") === "left", "north of an east-facing unit is its left");
ok(E.dirBetween(0, 0, 0, 3) === "S", "direction south");
ok(E.dirBetween(0, 0, 2, 2) === null, "diagonals are not orthogonal");

/* ---------- decks ---------- */
section("Deck validation");
const DECK_A = ["caesar","leonidas","legionnaire","legionnaire","legionnaire","phalangite",
                "velite","numidian-cavalry","spartan-hoplite","nightingale","cicero","pheidippides"];
const DECK_B = ["hannibal","alexander","immortal","immortal","cretan-archer","scythian-archer",
                "sacred-band","jack-ripper","boudica","van-gogh","archimedes","sun-tzu"];
ok(E.validateDeck(DECK_A).length === 0, "a legal deck validates: " + E.validateDeck(DECK_A));
ok(E.validateDeck(DECK_B).length === 0, "second legal deck validates: " + E.validateDeck(DECK_B));
ok(E.validateDeck(DECK_A.slice(0, 11)).length > 0, "an 11-card deck is rejected");
ok(E.validateDeck(["caesar","legionnaire", ...DECK_A.slice(2)]).length > 0, "one Commander is rejected");
ok(E.validateDeck(["caesar","caesar","leonidas", ...DECK_A.slice(3)]).length > 0, "a duplicated unique is rejected");
ok(E.validateDeck(["caesar","leonidas","war-elephant-token", ...DECK_A.slice(3)]).length > 0, "a token cannot be decked");

/* ---------- setup ---------- */
function fresh(bf) {
  const s = E.createBattle(bf || "open-country", DECK_A, DECK_B);
  E.placeCommander(s, 0, "caesar", 2, 0);
  E.placeCommander(s, 0, "leonidas", 5, 0);
  E.placeCommander(s, 1, "hannibal", 2, 7);
  E.placeCommander(s, 1, "alexander", 5, 7);
  return s;
}
section("Setup and command economy");
let s = fresh();
ok(s.phase === "main", "battle starts once four Commanders are placed");
ok(Object.keys(s.units).length === 4, "four Commanders on the board");
ok(s.players[0].hand.length === 5, "player 1 opens with 4 and draws 1");
ok(s.players[1].command === 1, "player 2 holds the first-player compensation");
ok(s.players[0].command === 2, "two living Commanders generate 2 Command in round 1");

/* ---------- movement and terrain ---------- */
section("Movement");
const caesar = Object.values(s.units).find((u) => u.cardId === "caesar");
caesar.x = 0; caesar.y = 0;                       // column 0 is plains all the way down
let moves = E.legalMoves(s, caesar.uid);
ok(moves.some((m) => m.x === 0 && m.y === 2), "Caesar (Speed 2) can reach two plains squares");
ok(!moves.some((m) => m.x === 0 && m.y === 3), "…and no further");
const slow = E.spawn(s, 0, "legionnaire", 7, 0, "S", { sick: false });   // Speed 1, empty corner
ok(!E.legalMoves(s, slow.uid).some((m) => m.x === 6 && m.y === 1),
   "movement is orthogonal — a Speed-1 unit cannot step diagonally");
ok(E.legalMoves(s, slow.uid).some((m) => m.x === 6 && m.y === 0), "…but can step sideways");
ok(!E.legalMoves(s, caesar.uid).some((m) => m.x === 2 && m.y === 2),
   "forest costs 2, so a Speed-2 unit cannot cross it and keep going");

const mp = E.createBattle("mountain-pass", DECK_A, DECK_B);
E.placeCommander(mp, 0, "caesar", 3, 0); E.placeCommander(mp, 0, "leonidas", 4, 0);
E.placeCommander(mp, 1, "hannibal", 3, 7); E.placeCommander(mp, 1, "alexander", 4, 7);
const mpCaesar = Object.values(mp.units).find((u) => u.cardId === "caesar");
ok(!E.legalMoves(mp, mpCaesar.uid).some((m) => m.x === 3 && m.y === 1), "mountains are impassable");

section("Terrain-ignoring passive");
mp.current = 1;
E.beginTurn(mp);
const hann = Object.values(mp.units).find((u) => u.cardId === "hannibal");
hann.x = 1; hann.y = 7;                            // (1,6) and (1,5) are both hills
const hStats = E.effectiveStats(mp, hann);
ok(hStats.ignoreTerrain === true, "Hannibal's Alpine Crossing is read off the ability, not his name");
ok(E.legalMoves(mp, hann.uid).some((m) => m.x === 1 && m.y === 5),
   "…so two hills cost him 2 and he crosses both");
const alex = Object.values(mp.units).find((u) => u.cardId === "alexander");
alex.x = 6; alex.y = 7;                            // (6,6) and (6,5) are the mirrored hills
ok(E.effectiveStats(mp, alex).speed === 3, "Alexander is one point faster");
ok(!E.legalMoves(mp, alex.uid).some((m) => m.x === 6 && m.y === 5),
   "…and still cannot cross two hills, because he pays the terrain cost");

/* ---------- combat and facing ---------- */
section("Directional combat");
s = fresh();
const atk = E.spawn(s, 0, "legionnaire", 3, 3, "S", { sick: false });
const def = E.spawn(s, 1, "legionnaire", 3, 4, "N", { sick: false });
s.current = 0; atk.actionsLeft = 2; atk.sick = false;
let prev = E.previewAttack(s, atk, def);
ok(prev.attackSide === "front" && prev.defenceSide === "front", "head-on is front vs front");
ok(prev.attack === 2 && prev.defence === 2, "Legionnaire front 2 attack vs front 2 defence");
ok(prev.damage === 0, "equal values are blocked — attack must exceed defence");

def.facing = "S";
prev = E.previewAttack(s, atk, def);
ok(prev.defenceSide === "rear" && prev.defence === 0, "a unit facing away is struck in the rear");
ok(prev.damage === 1, "…and a rear hit gets through");

section("Combat resolution and lives");
const r = E.doAttack(s, atk.uid, def.uid);
ok(r.ok && r.killed === true, "a 1-Life Troop dies to one successful hit");
ok(!s.units[def.uid], "the defeated unit leaves the board");
ok(s.players[1].defeated.includes("legionnaire"), "and goes to the defeated zone, not the discard pile");
ok(atk.actionsLeft === 1, "the attack cost one Action");

section("Commanders take two hits");
s = fresh();
const target = Object.values(s.units).find((u) => u.cardId === "hannibal");
ok(target.lives === 2, "a Commander starts on 2 Lives");
E.damageUnit(s, target, 1, null);
ok(target.lives === 1 && s.units[target.uid], "one hit does not remove a Commander");
E.damageUnit(s, target, 1, null);
ok(!s.units[target.uid], "the second hit does");
ok(s.winner === null, "one Commander down is not a loss");
E.damageUnit(s, Object.values(s.units).find((u) => u.cardId === "alexander"), 2, null);
ok(s.winner === 0 && s.winBy === "commanders", "losing both Commanders loses the battle immediately");

/* ---------- ranged ---------- */
section("Ranged attacks and line of sight");
s = fresh();
const archer = E.spawn(s, 0, "cretan-archer", 3, 2, "S", { sick: false });
const mark = E.spawn(s, 1, "legionnaire", 3, 5, "S", { sick: false });
s.current = 0; archer.actionsLeft = 2;
ok(E.legalAttacks(s, archer.uid).some((a) => a.targetUid === mark.uid), "range 3 reaches three squares away");
const blocker = E.spawn(s, 1, "legionnaire", 3, 4, "N", { sick: false });
ok(!E.legalAttacks(s, archer.uid).some((a) => a.targetUid === mark.uid), "a unit in the lane blocks the shot");
ok(E.legalAttacks(s, archer.uid).some((a) => a.targetUid === blocker.uid), "…but the blocker itself is a legal target");

/* ---------- fortresses and points ---------- */
section("Fortresses");
s = fresh();
const f0 = s.fortresses[0];
const holder = E.spawn(s, 0, "legionnaire", f0.x, f0.y, "S", { sick: false });
s.current = 0; holder.actionsLeft = 2;
ok(E.canCapture(s, holder.uid), "a unit standing on an unowned fortress may capture");
E.doCapture(s, holder.uid);
ok(f0.owner === 0, "capture transfers ownership");
ok(!E.canCapture(s, holder.uid), "you cannot capture your own fortress");
holder.x = 0; holder.y = 0;
ok(f0.owner === 0, "ownership persists after the unit walks away");
const vp0 = s.players[0].vp;
s.current = 1; E.endTurn(s, []);
ok(s.players[0].vp === vp0 + 1, "each controlled fortress pays 1 VP at the end of the round");
ok(s.round === 2, "the round advances after player 2's turn");

section("Victory on points");
s = fresh();
s.players[0].vp = 19; s.fortresses[0].owner = 0;
s.current = 1; E.endTurn(s, []);
ok(s.winner === 0 && s.winBy === "points", "reaching 20 victory points wins");

/* ---------- deployment ---------- */
section("Deployment");
s = fresh();
s.players[0].command = 8;
s.players[0].hand = ["legionnaire", "nightingale"];
const spots = E.legalDeploys(s, "legionnaire");
ok(spots.some((c) => c.y === 0), "the home row is a legal deployment zone");
ok(spots.some((c) => c.x === 2 && c.y === 1), "so is a square adjacent to a living Commander");
ok(E.legalDeploys(s, "nightingale").length === 0, "Specials never enter the battlefield");
const d = E.doDeploy(s, 0, 7, 0, "S");            // home row, away from either Commander
ok(d.ok, "deploy succeeds: " + (d.error || ""));
ok(s.players[0].command === 6, "deploying paid the card's Command cost");
ok(s.units[d.uid].sick === true, "a newly deployed card arrives with Deployment Sickness");
ok(E.legalMoves(s, d.uid).length === 0, "deployment sickness prevents acting on the turn it arrives");
ok(E.legalAttacks(s, d.uid).length === 0, "…including attacking");

section("Celeritas: a passive that changes another card's deployment");
s = fresh();
s.players[0].command = 8;
s.players[0].hand = ["legionnaire", "legionnaire"];
const far = E.doDeploy(s, 0, 7, 0, "S");           // home row, far from Caesar at (2,0)
ok(s.units[far.uid].sick === true, "a card deployed away from Caesar has deployment sickness");
const near = E.doDeploy(s, 0, 2, 1, "S");          // orthogonally adjacent to Caesar
ok(s.units[near.uid].sick === false, "a card deployed beside Caesar may act at once");
ok(E.legalMoves(s, near.uid).length > 0, "…and has legal moves on the turn it arrives");

/* ---------- abilities ---------- */
section("Abilities, cooldowns and summoning");
s = fresh();
s.current = 1; E.beginTurn(s);
const hb = Object.values(s.units).find((u) => u.cardId === "hannibal");
const before = Object.keys(s.units).length;
hb.x = 0; hb.y = 7;                                // (0,6) is plains, so no terrain modifier
const ab = E.doAbility(s, hb.uid, "war-elephant", null);
ok(ab.ok, "Hannibal summons a War Elephant: " + (ab.error || ""));
ok(Object.keys(s.units).length === before + 1, "the elephant is on the board");
ok(hb.cooldowns["war-elephant"] === 5, "the ability goes on a 5-round cooldown");
ok(E.doAbility(s, hb.uid, "war-elephant", null).ok === false, "and cannot be used again while cooling down");
const eleph = Object.values(s.units).find((u) => u.cardId === "war-elephant-token");
ok(E.effectiveStats(s, eleph).defence.rear === 2, "the elephant is armoured on every side");

section("Status effects");
s = fresh();
s.current = 0;
s.players[0].command = 8;
s.players[0].hand = ["van-gogh"];
const victim = Object.values(s.units).find((u) => u.cardId === "hannibal");
const sp = E.doSpecial(s, 0, { uid: victim.uid });
ok(sp.ok, "van Gogh resolves: " + (sp.error || ""));
ok(E.effectiveStats(s, victim).noMove === true, "the target is Mesmerised and cannot Move");
ok(s.players[0].discard.includes("van-gogh"), "a Special goes to the discard pile and can be drawn again");
s.current = 1; E.beginTurn(s);
ok(E.legalMoves(s, victim.uid).length === 0, "a Mesmerised unit has no legal moves");
ok(E.legalAttacks(s, victim.uid) !== null, "but is not prevented from attacking");

section("Phalanx aura reads adjacency, not a name");
s = fresh();
const leo = Object.values(s.units).find((u) => u.cardId === "leonidas");
const aloneDef = E.effectiveStats(s, leo).defence.front;
E.spawn(s, 0, "legionnaire", leo.x, leo.y + 1, "S", { sick: false });
ok(E.effectiveStats(s, leo).defence.front === aloneDef + 2, "Leonidas gains +2 front defence with an ally beside him");

/* ---------- random playouts ---------- */
section("Random playouts");
function randomAI(s, rng) {
  const p = s.current, pl = s.players[p];
  let guard = 0;
  while (guard++ < 60) {
    const mine = Object.values(s.units).filter((u) => u.owner === p && u.actionsLeft > 0 && !u.sick);
    const acts = [];
    for (const u of mine) {
      for (const a of E.legalAttacks(s, u.uid)) acts.push({ k: "atk", u, a });
      if (E.canCapture(s, u.uid)) acts.push({ k: "cap", u });
      for (const m of E.legalMoves(s, u.uid)) acts.push({ k: "mov", u, m });
    }
    for (let i = 0; i < pl.hand.length; i++) {
      const c = BATTLE_CARDS_ref[pl.hand[i]];
      if (c.type === "special") continue;
      for (const sp2 of E.legalDeploys(s, pl.hand[i])) acts.push({ k: "dep", i, sp: sp2 });
    }
    if (!acts.length) break;
    const pick = acts.sort((x, y) => rank(y) - rank(x))[0];
    if (pick.k === "atk") E.doAttack(s, pick.u.uid, pick.a.targetUid);
    else if (pick.k === "cap") E.doCapture(s, pick.u.uid);
    else if (pick.k === "mov") E.doMove(s, pick.u.uid, pick.m.x, pick.m.y, DIRS_ref[Math.floor(rng() * 4)]);
    else E.doDeploy(s, pick.i, pick.sp.x, pick.sp.y, p === 0 ? "S" : "N");
    if (s.phase === "over") return;
  }
  function rank(a) {
    if (a.k === "atk") return a.a.damage ? 100 : 5;
    if (a.k === "cap") return 90;
    if (a.k === "dep") return 40;
    return 10 + rng() * 10;
  }
}
const BATTLE_CARDS_ref = E.BATTLE_CARDS, DIRS_ref = E.DIRS;
let done = 0, byCmd = 0, byPts = 0, rounds = [], errors = 0;
for (let g = 0; g < 200; g++) {
  let seed = g * 7919 + 13;
  const rng = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
  const bfIds = Object.keys(E.BATTLEFIELDS);
  const st = E.createBattle(bfIds[g % bfIds.length], DECK_A, DECK_B);
  try {
    const c0 = E.legalCommanderSquares(st, 0), c1 = E.legalCommanderSquares(st, 1);
    E.placeCommander(st, 0, "caesar", c0[0].x, c0[0].y);
    E.placeCommander(st, 0, "leonidas", c0[3].x, c0[3].y);
    E.placeCommander(st, 1, "hannibal", c1[0].x, c1[0].y);
    E.placeCommander(st, 1, "alexander", c1[3].x, c1[3].y);
    let turns = 0;
    while (st.phase === "main" && turns++ < 400) {
      randomAI(st, rng);
      if (st.phase === "over") break;
      const pl = st.players[st.current];
      const over = Math.max(0, pl.hand.length - st.rules.maxHand);
      E.endTurn(st, Array.from({ length: over }, (_, i) => i));
    }
    if (st.phase === "over") { done++; rounds.push(st.round); st.winBy === "commanders" ? byCmd++ : byPts++; }
  } catch (err) { errors++; if (errors === 1) console.log("  FAIL  playout threw: " + err.message); }
}
ok(errors === 0, `${errors} playouts threw an exception`);
ok(done >= 190, `${done}/200 playouts reached a victory condition`);
const avg = rounds.reduce((a, b) => a + b, 0) / (rounds.length || 1);
console.log(`  ${done}/200 finished — ${byPts} on points, ${byCmd} on Commanders, average ${avg.toFixed(1)} rounds`);

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
