#!/usr/bin/env node
/* =====================================================================
   CODEX ANTIQUUS — data integrity check
   Run after any content edit:   node tools/validate.js

   Loads the data layer the way index.html does — constants, data files,
   engine — inside a sandbox with a React stub, then checks the things
   content edits actually break. It does not test the interface.
   ===================================================================== */

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
const LOAD_ORDER = [
  "js/constants.js",
  "js/data/chapters-rome.js",
  "js/data/chapters-carthage.js",
  "js/data/chapters-egypt.js",
  "js/data/chapters-greece.js",
  "js/data/chapters-persia.js", "js/data/chapters-britain.js", "js/data/chapters-empire.js",
  "js/data/wars.js",
  "js/data/characters.js",
  "js/data/characters-extra.js",
  "js/data/characters-greece.js",
  "js/data/characters-persia.js", "js/data/characters-britain.js", "js/data/characters-empire.js",
  "js/data/atlas.js",
  "js/data/coastline.js",
  "js/data/places.js",
  "js/engine.js",
];

const errors = [];
const warnings = [];
const fail = (m) => errors.push(m);
const warn = (m) => warnings.push(m);

/* ------------------------------------------------------------------ */
/* Load the data layer                                                 */
/* ------------------------------------------------------------------ */

const noop = () => {};
const sandbox = {
  React: { useState: noop, useEffect: noop, useMemo: noop, useRef: noop, useCallback: noop },
  window: { localStorage: { getItem: () => null, setItem: noop } },
  console,
};
vm.createContext(sandbox);

for (const rel of LOAD_ORDER) {
  const file = path.join(ROOT, rel);
  if (!fs.existsSync(file)) { fail(`missing source file: ${rel}`); continue; }
  try {
    vm.runInContext(fs.readFileSync(file, "utf8"), sandbox, { filename: rel });
  } catch (e) {
    fail(`${rel} failed to load: ${e.message}`);
  }
}
if (errors.length) { report(); process.exit(1); }

/* `const` at the top level of a vm script lands in the context's lexical
   scope, not on the sandbox object, so hand the bindings out explicitly. */
const NAMES = ["CHAPTERS", "CHARACTERS", "SETS", "SOURCES", "WORLDS", "TIER_ORDER",
  "STAT_KEYS", "CHAPTER_SPANS", "CHAPTER_BY_ID", "PENDING_WARS", "SET_ATLAS",
  "PLACES", "COASTLINE", "PLACE_TONE", "COASTLINE_SOURCE",
  "actsOf", "actOpen", "chapterOpen", "CHAPTERS_BY_SET",
  "REGIONS", "ERAS", "CLASS_COLOR",
  "computeCards", "unlockedSets", "warGate", "setProgress", "buildProgress", "BLANK_SAVE"];
const data = vm.runInContext(`({ ${NAMES.map((n) => `${n}: typeof ${n} === "undefined" ? undefined : ${n}`).join(", ")} })`, sandbox);
for (const n of NAMES) if (data[n] === undefined) fail(`${n} is not defined after loading the data layer`);
if (errors.length) { report(); process.exit(1); }

const {
  CHAPTERS, CHARACTERS, SETS, SOURCES, WORLDS, TIER_ORDER, STAT_KEYS,
  CHAPTER_SPANS, CHAPTER_BY_ID, PENDING_WARS, SET_ATLAS, REGIONS, ERAS, CLASS_COLOR,
  PLACES, COASTLINE, PLACE_TONE, COASTLINE_SOURCE,
  actsOf, actOpen, chapterOpen, CHAPTERS_BY_SET,
  computeCards, unlockedSets, warGate, setProgress, buildProgress, BLANK_SAVE,
} = data;

const CLASSIFICATIONS = Object.keys(CLASS_COLOR);
const chapterIds = new Set(CHAPTERS.map((c) => c.id));

/* ------------------------------------------------------------------ */
/* Chapters                                                            */
/* ------------------------------------------------------------------ */

const seen = new Set();
for (const c of CHAPTERS) {
  const where = `chapter "${c.id}"`;
  if (seen.has(c.id)) fail(`${where}: duplicate chapter id`);
  seen.add(c.id);

  if (!c.set) fail(`${where}: no set`);
  else if (!SETS[c.set]) fail(`${where}: set "${c.set}" is not in SETS`);

  if (!c.title) fail(`${where}: no title`);
  if (!Array.isArray(c.beats) || !c.beats.length) fail(`${where}: no beats`);
  else c.beats.forEach((b, i) => {
    if (!b.key) warn(`${where}: beat ${i + 1} ("${b.title || "untitled"}") has no key point`);
    if (!Array.isArray(b.text) || !b.text.length) fail(`${where}: beat ${i + 1} has no text`);
  });

  if (!Array.isArray(c.check) || !c.check.length) fail(`${where}: no checkpoint`);
  else c.check.forEach((q, i) => {
    if (!Array.isArray(q.options) || q.options.length < 2)
      fail(`${where}: question ${i + 1} has fewer than two options`);
    else if (!Number.isInteger(q.correct) || q.correct < 0 || q.correct >= q.options.length)
      fail(`${where}: question ${i + 1} correct index ${q.correct} is outside 0..${q.options.length - 1}`);
    if (!q.explain) warn(`${where}: question ${i + 1} has no explanation`);
  });

  (c.revealsSets || []).forEach((s) => {
    if (!SETS[s]) fail(`${where}: revealsSets names "${s}", which is not in SETS`);
  });

  /* Reading time drifts as prose is expanded. ~170 wpm for dense narrative
     history, plus a minute for the checkpoint. */
  /* A war beat's forces / tactics / lineage blocks are prose the reader reads
     on the same screen as text[], so they count. Leaving them out made every
     war entry look half its real length. */
  const prose = (b) => [
    ...(b.text || []),
    b.forces || "",
    b.tactics || "",
    ...(b.lineage || []).map((l) => `${l.who || ""} ${l.what || ""} ${l.note || ""}`),
  ].join(" ");
  const words = (c.beats || []).reduce((n, b) => n + prose(b).trim().split(/\s+/).filter(Boolean).length, 0);
  const expect = Math.max(3, Math.round(words / 170) + 1);
  if (Math.abs((c.minutes || 0) - expect) > 2)
    warn(`${where}: says ${c.minutes} min but reads as about ${expect} (${words} words)`);

  if (!CHAPTER_SPANS[c.id])
    fail(`${where}: no CHAPTER_SPANS entry — it will not count toward coverage on the Progress screen`);
  else {
    const [from, to] = CHAPTER_SPANS[c.id];
    if (typeof from !== "number" || typeof to !== "number") fail(`${where}: CHAPTER_SPANS entry is not a pair of years`);
    else if (from > to) fail(`${where}: CHAPTER_SPANS runs backwards (${from} → ${to})`);
  }
}

for (const id of Object.keys(CHAPTER_SPANS))
  if (!chapterIds.has(id)) warn(`CHAPTER_SPANS has "${id}", which is not a chapter`);

/* ------------------------------------------------------------------ */
/* Which Sets can actually be reached                                  */
/* ------------------------------------------------------------------ */

/* "wars" is a system pseudo-Set: it holds the war chapters, has no world
   and no Atlas geography, and unlockedSets() always returns it as open. */
const SYSTEM_SETS = new Set(["wars"]);

const reachableSets = new Set([...SYSTEM_SETS]);
for (const id of Object.keys(SETS)) if (SETS[id].foundation) reachableSets.add(id);
let grew = true;
while (grew) {
  grew = false;
  for (const c of CHAPTERS) {
    if (!reachableSets.has(c.set)) continue;
    for (const s of c.revealsSets || []) if (!reachableSets.has(s)) { reachableSets.add(s); grew = true; }
  }
}
for (const id of Object.keys(SETS)) {
  const req = SETS[id].requiresSets || [];
  for (const r of req) if (!SETS[r]) fail(`set "${id}": requiresSets names "${r}", which is not in SETS`);
}
const reachableChapters = new Set(CHAPTERS.filter((c) => reachableSets.has(c.set) || c.kind === "war").map((c) => c.id));

for (const setId of Object.keys(SETS)) {
  if (SYSTEM_SETS.has(setId)) continue;
  const set = SETS[setId];
  const n = CHAPTERS.filter((c) => c.set === setId).length;
  if (n && !reachableSets.has(setId))
    fail(`set "${setId}" has ${n} chapters but nothing unlocks it`);
  if (!WORLDS.some((w) => w.id === set.world)) fail(`set "${setId}": world "${set.world}" is not in WORLDS`);
}

/* ------------------------------------------------------------------ */
/* Characters                                                          */
/* ------------------------------------------------------------------ */

for (const [id, c] of Object.entries(CHARACTERS)) {
  const where = `card "${id}"`;
  if (c.id !== id) fail(`${where}: id field is "${c.id}", does not match its key`);
  if (!c.name) fail(`${where}: no name`);

  const tiers = Object.keys(c.tiers || {});
  const reqs = Object.keys(c.requires || {});
  if (!tiers.length) fail(`${where}: no tiers`);

  for (const t of tiers) if (!reqs.includes(t)) fail(`${where}: has a ${t} tier with no requires[${t}]`);
  for (const t of reqs) if (!tiers.includes(t)) fail(`${where}: has requires[${t}] with no ${t} tier`);
  for (const t of tiers) if (!TIER_ORDER.includes(t)) fail(`${where}: unknown tier "${t}"`);

  // Tiers must be contiguous from bronze — computeCards stops at the first gap.
  const ranked = TIER_ORDER.filter((t) => tiers.includes(t));
  const expected = TIER_ORDER.slice(0, ranked.length);
  if (ranked.join() !== expected.join())
    fail(`${where}: tiers ${ranked.join("+")} skip a rank — computeCards stops at the first missing tier`);

  for (const [tier, req] of Object.entries(c.requires || {})) {
    if (!Array.isArray(req) || !req.length) { fail(`${where}: requires[${tier}] is empty`); continue; }
    for (const ch of req) {
      if (!chapterIds.has(ch)) fail(`${where}: requires[${tier}] names chapter "${ch}", which does not exist`);
      else if (!reachableChapters.has(ch)) fail(`${where}: requires[${tier}] needs chapter "${ch}", in a Set nothing unlocks`);
    }
  }

  for (const [tier, t] of Object.entries(c.tiers || {})) {
    if (!t.stats) { fail(`${where}: ${tier} tier has no stats`); continue; }
    for (const [k, v] of Object.entries(t.stats)) {
      if (!STAT_KEYS.includes(k)) fail(`${where}: ${tier} stat "${k}" is not a known stat`);
      if (!Number.isFinite(v) || v < 1 || v > 100) fail(`${where}: ${tier} stat ${k} = ${v}, outside 1–100`);
    }
    for (const k of STAT_KEYS) if (!(k in t.stats)) fail(`${where}: ${tier} tier is missing the "${k}" stat`);
  }

  for (const s of c.sets || []) if (!SETS[s]) fail(`${where}: sets names "${s}", which is not in SETS`);

  (c.claims || []).forEach((cl, i) => {
    const w = `${where}: claim ${i + 1}`;
    if (!cl.text) fail(`${w}: no text`);
    if (!CLASSIFICATIONS.includes(cl.classification))
      fail(`${w}: classification "${cl.classification}" is not one of the six`);
    if (!Array.isArray(cl.sources) || !cl.sources.length) fail(`${w}: no sources`);
    else cl.sources.forEach((s) => { if (!SOURCES[s]) fail(`${w}: source key "${s}" is not in SOURCES`); });
    if (cl.at && !tiers.includes(cl.at)) fail(`${w}: shown at tier "${cl.at}", which this card does not have`);
  });

  (c.connections || []).forEach((cn, i) => {
    if (cn.charId && !CHARACTERS[cn.charId])
      fail(`${where}: connection ${i + 1} points at card "${cn.charId}", which does not exist`);
  });

  if (c.goldName && !tiers.includes("gold")) warn(`${where}: has a goldName but no gold tier`);
}

/* ------------------------------------------------------------------ */
/* Wars                                                                */
/* ------------------------------------------------------------------ */

for (const w of CHAPTERS.filter((c) => c.kind === "war")) {
  const where = `war "${w.id}"`;
  if (!Array.isArray(w.sides) || w.sides.length < 2) fail(`${where}: needs at least two sides`);
  if (!Array.isArray(w.gate) || !w.gate.length) { fail(`${where}: no gate — it would open immediately`); continue; }

  const gateSets = new Set();
  for (const g of w.gate) {
    if (!chapterIds.has(g.chapter)) { fail(`${where}: gate names chapter "${g.chapter}", which does not exist`); continue; }
    if (!reachableChapters.has(g.chapter)) fail(`${where}: gate needs chapter "${g.chapter}", in a Set nothing unlocks`);
    gateSets.add(CHAPTER_BY_ID[g.chapter].set);
  }
  if (gateSets.size < 2) fail(`${where}: gate covers only ${gateSets.size} Set(s) — a war must be gated on both sides`);
}

/* Battle diagrams: a phase that names a unit which does not exist renders
   nothing at all and says nothing about it, so check every reference. */
const DIAG_TONES = ["gold", "silver", "rust", "verdigris", "bronze", "dim"];
const TERRAIN_TONES = ["sea", "high", "ground"];

for (const w of CHAPTERS.filter((c) => c.kind === "war")) {
  for (const b of w.beats || []) {
    if (!b.diagram) continue;
    const where = `war "${w.id}" battle "${b.title || b.name}" diagram`;
    const d = b.diagram;

    if (!Array.isArray(d.units) || !d.units.length) { fail(`${where}: no units`); continue; }
    if (!Array.isArray(d.phases) || !d.phases.length) { fail(`${where}: no phases`); continue; }

    const ids = new Set();
    for (const u of d.units) {
      if (!u.id) fail(`${where}: a unit has no id`);
      else if (ids.has(u.id)) fail(`${where}: duplicate unit id "${u.id}"`);
      ids.add(u.id);
      if (!DIAG_TONES.includes(u.tone)) fail(`${where}: unit "${u.id}" has unknown tone "${u.tone}"`);
      for (const k of ["x", "y", "w", "h"])
        if (!Number.isFinite(u[k])) fail(`${where}: unit "${u.id}" has no numeric ${k}`);
      // Labels are drawn centred inside the block and do not wrap or clip.
      if (u.label && u.label.length > 12)
        fail(`${where}: unit "${u.id}" label "${u.label}" is ${u.label.length} chars — over 12 overflows the block`);
    }

    for (const t of d.terrain || []) {
      if (!TERRAIN_TONES.includes(t.tone)) fail(`${where}: terrain has unknown tone "${t.tone}"`);
      if (t.label && t.label.length > 26)
        fail(`${where}: terrain label "${t.label}" is ${t.label.length} chars — over 26 collides with units`);
    }

    d.phases.forEach((ph, n) => {
      if (!ph.caption) fail(`${where}: phase ${n + 1} has no caption`);
      for (const id of Object.keys(ph.at || {}))
        if (!ids.has(id)) fail(`${where}: phase ${n + 1} moves unit "${id}", which is not in units`);
      for (const a of ph.arrows || [])
        if (!a.d) fail(`${where}: phase ${n + 1} has an arrow with no path`);
    });
  }
}

for (const p of PENDING_WARS || []) {
  if (!p.blockedBy) fail(`pending war "${p.name || p.id}": no blockedBy — the Wars screen would show it sealed with no explanation`);
  if (!Array.isArray(p.sides) || p.sides.length < 2) fail(`pending war "${p.name || p.id}": needs at least two sides`);
}

/* ------------------------------------------------------------------ */
/* Foundations and patrons                                             */
/* ------------------------------------------------------------------ */

const foundations = Object.keys(SETS).filter((id) => SETS[id].foundation);
if (!foundations.length) fail("no Set is marked `foundation` — nothing would be playable from a blank save");

for (const id of foundations) {
  const where = `foundation Set "${id}"`;
  const chs = CHAPTERS_BY_SET[id] || [];
  if (!chs.length) fail(`${where}: marked as an entry point but has no chapters`);
  if (SETS[id].sealedHint) fail(`${where}: has a sealedHint, but a foundation is never sealed`);
  if (SETS[id].status !== "open") fail(`${where}: status is "${SETS[id].status}" — a foundation must be open`);

  const patron = SETS[id].patron;
  if (!patron) { fail(`${where}: no patron card to grant when it is chosen`); continue; }
  if (!CHARACTERS[patron]) { fail(`${where}: patron "${patron}" is not a card`); continue; }
  if (!(CHARACTERS[patron].sets || []).includes(id))
    fail(`${where}: patron "${patron}" does not belong to this Set`);
  if (!CHARACTERS[patron].requires.bronze)
    fail(`${where}: patron "${patron}" has no bronze tier to be granted at`);
}

/* Granting a patron must not hand out anything beyond that one card. */
for (const id of foundations) {
  const granted = computeCards({}, id);
  const ids = Object.keys(granted);
  if (ids.length !== 1 || ids[0] !== SETS[id].patron || granted[ids[0]] !== "bronze")
    fail(`choosing "${id}" from a blank save grants ${JSON.stringify(granted)} — it should grant exactly its patron at bronze`);
}

/* Act order must not strand anything: the first act of every Set has to be
   open from cold, or that Set can never be started. */
for (const id of Object.keys(SETS)) {
  const acts = actsOf(id);
  if (!acts.length) continue;
  if (!actOpen(id, acts[0], {})) fail(`set "${id}": its first act "${acts[0]}" is not open from a blank save`);
  for (const a of acts.slice(1))
    if (actOpen(id, a, {})) warn(`set "${id}": act "${a}" is open from a blank save — act order may not be doing anything`);
}

/* ------------------------------------------------------------------ */
/* Globe hotspots                                                      */
/* ------------------------------------------------------------------ */
/* A pin whose ref no longer resolves navigates nowhere and says
   nothing about why, so every reference is checked here. */

const PLACE_KINDS = Object.keys(PLACE_TONE);
const seenPlace = new Set();
for (const pl of PLACES) {
  const where = `place "${pl.id}"`;
  if (seenPlace.has(pl.id)) fail(`${where}: duplicate id`);
  seenPlace.add(pl.id);
  if (!pl.name) fail(`${where}: no name`);
  if (!PLACE_KINDS.includes(pl.kind)) fail(`${where}: unknown kind "${pl.kind}"`);
  if (!Number.isFinite(pl.lon) || pl.lon < -180 || pl.lon > 180) fail(`${where}: longitude ${pl.lon} out of range`);
  if (!Number.isFinite(pl.lat) || pl.lat < -90 || pl.lat > 90) fail(`${where}: latitude ${pl.lat} out of range`);
  if (!Number.isFinite(pl.from) || !Number.isFinite(pl.to)) fail(`${where}: from/to must be years`);
  else if (pl.from > pl.to) fail(`${where}: lifespan runs backwards (${pl.from} → ${pl.to})`);
  if (pl.ref) {
    if (pl.ref.set && !SETS[pl.ref.set]) fail(`${where}: refers to Set "${pl.ref.set}", which does not exist`);
    if (pl.ref.chapter && !CHAPTER_BY_ID[pl.ref.chapter]) fail(`${where}: refers to chapter "${pl.ref.chapter}", which does not exist`);
    if (pl.ref.char && !CHARACTERS[pl.ref.char]) fail(`${where}: refers to card "${pl.ref.char}", which does not exist`);
  }
}
for (const c of Object.keys(CHARACTERS))
  if (!PLACES.some((p) => p.ref && p.ref.char === c)) warn(`card "${c}" has no hotspot on the globe`);
for (const w of CHAPTERS.filter((c) => c.kind === "war"))
  if (!PLACES.some((p) => p.kind === "war" && p.ref && p.ref.chapter === w.id)) fail(`war "${w.id}" has no hotspot on the globe`);

/* Coastline sanity: a stray coordinate pair puts a continent inside out. */
for (const [n, ring] of (COASTLINE.land || []).concat(COASTLINE.seas || []).entries()) {
  if (ring.length < 3) fail(`coastline ring ${n} has fewer than 3 points`);
  for (const [lon, lat] of ring)
    if (!Number.isFinite(lon) || !Number.isFinite(lat) || Math.abs(lon) > 180 || Math.abs(lat) > 90)
      fail(`coastline ring ${n} has an out-of-range point [${lon}, ${lat}]`);
}

/* ------------------------------------------------------------------ */
/* Atlas                                                               */
/* ------------------------------------------------------------------ */

const regionIds = new Set((REGIONS || []).map((r) => r.id));
for (const setId of Object.keys(SETS)) {
  if (SYSTEM_SETS.has(setId)) continue;
  const a = SET_ATLAS[setId];
  if (!a) { fail(`set "${setId}": no SET_ATLAS entry — it will not appear on the Atlas`); continue; }
  if (!regionIds.has(a.region)) fail(`set "${setId}": atlas region "${a.region}" is not in REGIONS`);
  if (!Number.isFinite(a.from) || !Number.isFinite(a.to)) fail(`set "${setId}": atlas period is not a pair of years`);
  else if (a.from > a.to) fail(`set "${setId}": atlas period runs backwards (${a.from} → ${a.to})`);
}
for (const setId of Object.keys(SET_ATLAS || {}))
  if (!SETS[setId]) warn(`SET_ATLAS has "${setId}", which is not in SETS`);


/* ------------------------------------------------------------------ */
/* Simulated playthrough                                               */
/* ------------------------------------------------------------------ */
/* Runs the real engine functions rather than re-deriving the rules.
   Starts from a blank save, repeatedly studies everything currently
   open, and stops when nothing further unlocks. Anything unreachable
   at the end is content no player can ever get to.                    */

let playthrough = "not run";
{
  const done = {};
  let pass = 0;
  for (;;) {
    pass += 1;
    if (pass > 50) { fail("playthrough did not settle after 50 passes — check revealsSets for a cycle"); break; }

    const open = unlockedSets(done);
    let studied = 0;

    for (const ch of CHAPTERS) {
      if (done[ch.id]) continue;
      if (ch.kind !== "war" && !open[ch.set]) continue;
      if (!chapterOpen(ch, done)) continue;      /* act order, and war gates */
      done[ch.id] = true;
      studied += 1;
    }
    if (!studied) break;
  }

  const cards = computeCards(done);

  if (Object.keys(computeCards({})).length)
    fail("some cards mint from a blank save — a card requires nothing");

  for (const ch of CHAPTERS)
    if (!done[ch.id]) fail(`chapter "${ch.id}" (${SETS[ch.set] ? SETS[ch.set].name : ch.set}) is never reachable in a full playthrough`);

  for (const id of Object.keys(CHARACTERS)) {
    const top = TIER_ORDER.filter((t) => CHARACTERS[id].requires[t]).pop();
    if (!cards[id]) fail(`card "${id}" never mints, even with every chapter complete`);
    else if (cards[id] !== top) fail(`card "${id}" tops out at ${cards[id]} but defines a ${top} tier`);
  }

  for (const w of CHAPTERS.filter((c) => c.kind === "war"))
    if (!warGate(w, done).open) fail(`war "${w.id}" never opens, even with every chapter complete`);

  // The metrics behind the Progress screen must survive both extremes.
  for (const [label, save] of [["a blank save", { ...BLANK_SAVE, chaptersDone: {} }],
                               ["a completed save", { ...BLANK_SAVE, chaptersDone: done, keyCount: 161 }]]) {
    try {
      const p = buildProgress(save, computeCards(save.chaptersDone));
      if (!p || typeof p !== "object") fail(`buildProgress returned nothing for ${label}`);
    } catch (e) {
      fail(`buildProgress threw on ${label}: ${e.message}`);
    }
  }

  for (const setId of Object.keys(SETS)) {
    const p = setProgress(setId, done);
    if (p.total && p.pct !== 100) fail(`set "${setId}" only reaches ${p.pct}% with every chapter complete`);
  }

  const minted = Object.keys(cards).length;
  const byTier = TIER_ORDER.map((t) => `${Object.values(cards).filter((v) => v === t).length} ${t}`).join(", ");
  playthrough = `${pass} unlock passes, all ${CHAPTERS.length} chapters reachable, ${minted} cards minted (${byTier})`;
}

/* ------------------------------------------------------------------ */

function report() {
  for (const w of warnings) console.log(`  warn   ${w}`);
  for (const e of errors) console.log(`  ERROR  ${e}`);
}

const stats = CHAPTERS.length
  ? `${CHAPTERS.length} chapters (${CHAPTERS.filter((c) => c.kind !== "war").length} study, ${CHAPTERS.filter((c) => c.kind === "war").length} wars), ` +
    `${CHAPTERS.reduce((n, c) => n + (c.beats || []).length, 0)} parts, ` +
    `${CHAPTERS.reduce((n, c) => n + (c.check || []).length, 0)} questions, ` +
    `${Object.keys(CHARACTERS).length} cards, ` +
    `${Object.values(CHARACTERS).reduce((n, c) => n + (c.claims || []).length, 0)} claims`
  : "no chapters";

const battles = CHAPTERS.filter((c) => c.kind === "war").flatMap((c) => c.beats || []).filter((b) => b.name);
const diagrammed = battles.filter((b) => b.diagram).length;
const diagLine = `${diagrammed}/${battles.length} battles have a diagram`;
const unused = 0;

console.log(`\nCodex Antiquus — ${stats}`);
console.log(`Playthrough    — ${playthrough}`);
console.log(`Diagrams       — ${diagLine}`);
console.log(`Entry          — ${foundations.length} foundation Sets: ${foundations.map((f) => SETS[f].name).join(", ")}`);
console.log(`Globe          — ${PLACES.length} hotspots, ${COASTLINE.land.length} landmasses (${COASTLINE_SOURCE || "schematic"})\n`);
report();

if (errors.length) {
  console.log(`\n${errors.length} error(s), ${warnings.length} warning(s).\n`);
  process.exit(1);
}
console.log(`OK — no errors${warnings.length ? `, ${warnings.length} warning(s)` : ""}.\n`);
