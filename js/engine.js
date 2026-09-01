/* =====================================================================
   ENGINE
   Derived indexes, save/load, unlock rules, war gating and the
   progression metrics behind the Progress screen.
   Loads after all data files.
   ===================================================================== */

const ALL_CHARACTER_IDS = Object.keys(CHARACTERS);
const CHAPTER_BY_ID = CHAPTERS.reduce((a, c) => { a[c.id] = c; return a; }, {});
const CHAPTERS_BY_SET = CHAPTERS.reduce((a, c) => { (a[c.set] = a[c.set] || []).push(c); return a; }, {});
const WAR_CHAPTERS = CHAPTERS.filter((c) => c.kind === "war");
const STUDY_CHAPTERS = CHAPTERS.filter((c) => c.kind !== "war");

/* Explicit time spans, used for the coverage timeline on the Progress
   screen. Kept as data rather than parsed out of the era strings, which
   are written for humans and not for regexes. */
const CHAPTER_SPANS = {
  founding: [-800, -750], kings: [-753, -509], "republic-born": [-509, -495],
  "how-republic-worked": [-509, -49], "struggle-orders": [-494, -287],
  "punic-1": [-264, -241], "punic-2": [-218, -216], "punic-3": [-209, -146],
  greece: [-200, -146], gracchi: [-133, -121], "marius-sulla": [-107, -78],
  "spartacus-pompey": [-73, -62], "caesar-rise": [-100, -62], triumvirate: [-60, -56],
  gaul: [-58, -50], rubicon: [-49, -48], egypt: [-48, -46], dictator: [-46, -44],
  "antony-octavian": [-44, -42], actium: [-41, -30], augustus: [-27, -27],
  "carth-dido": [-814, -800], "carth-place": [-800, -500], "carth-sicily": [-580, -265],
  "carth-hanno": [-520, -480], "carth-after-first": [-264, -237], "carth-truceless": [-241, -237],
  "carth-spain": [-237, -219], "carth-zama": [-202, -183], "carth-end": [-149, -146],
  "egy-alexander": [-332, -331], "egy-ptolemy1": [-323, -282], "egy-ptolemy2": [-282, -246],
  "egy-syrian-wars": [-274, -168], "egy-canopus-rosetta": [-238, -196],
  "egy-rome-protector": [-168, -51], "egy-cleopatra-caesar": [-51, -44], "egy-end": [-44, -30],
  "grk-polis": [-800, -700], "grk-colonies": [-750, -580], "grk-sparta": [-700, -500],
  "grk-athens-reform": [-594, -508], "grk-persia": [-499, -479], "grk-empire": [-478, -431],
  "grk-pericles": [-461, -429], "grk-pelop": [-431, -404], "grk-socrates": [-399, -399],
  "grk-philip": [-359, -338],
  "per-cyrus": [-559, -530], "per-babylon": [-539, -539], "per-cambyses": [-530, -522],
  "per-darius": [-522, -486], "per-empire": [-522, -486], "per-religion": [-550, -330],
  "per-persepolis": [-518, -330], "per-west": [-499, -479], "per-after": [-479, -359],
  "per-fall": [-334, -330],
  "war-greco-persian": [-499, -449],
  "war-punic-1": [-264, -241], "war-punic-2": [-218, -201], "war-punic-3": [-149, -146],
  "war-actium": [-32, -30],
};

/* ------------------------------ save --------------------------------- */
const SAVE_KEY = "codex-antiquus-save-v3";
const BLANK_SAVE = { chaptersDone: {}, beatMax: {}, bookmark: null, recentKeys: [], keyCount: 0 };

function loadSave() {
  try {
    const raw = window.localStorage.getItem(SAVE_KEY);
    if (!raw) return { ...BLANK_SAVE };
    return { ...BLANK_SAVE, ...JSON.parse(raw) };
  } catch (e) { return { ...BLANK_SAVE }; }
}
function persist(save) {
  try { window.localStorage.setItem(SAVE_KEY, JSON.stringify(save)); } catch (e) { /* private mode: session only */ }
}

/* ---------------------------- unlocking ------------------------------ */
// A tier is minted only when EVERY chapter it requires is complete.
function computeCards(chaptersDone) {
  const out = {};
  for (const id of ALL_CHARACTER_IDS) {
    const c = CHARACTERS[id];
    let earned = null;
    for (const tier of TIER_ORDER) {
      const req = c.requires[tier];
      if (!req) break;
      if (req.every((ch) => chaptersDone[ch])) earned = tier; else break;
    }
    if (earned) out[id] = earned;
  }
  return out;
}

function unlockedSets(chaptersDone) {
  const out = { "roman-republic": true, wars: true };
  for (const ch of CHAPTERS) {
    if (chaptersDone[ch.id] && ch.unlocksSets) ch.unlocksSets.forEach((s) => { out[s] = true; });
  }
  return out;
}

function setProgress(setId, chaptersDone) {
  const chs = CHAPTERS_BY_SET[setId] || [];
  const done = chs.filter((c) => chaptersDone[c.id]).length;
  return { done, total: chs.length, pct: chs.length ? Math.round((done / chs.length) * 100) : 0 };
}

/* War gating: a war opens only when BOTH sides have been studied up to
   the war's start date. This is the rule from the brief, applied
   without exception — including where it seals content already written. */
function warGate(war, chaptersDone) {
  const items = (war.gate || []).map((g) => {
    const ch = CHAPTER_BY_ID[g.chapter];
    return { ...g, chapterTitle: ch ? ch.title : g.chapter, setName: ch ? SETS[ch.set].name : "", done: !!chaptersDone[g.chapter] };
  });
  return { open: items.every((i) => i.done), items };
}

function displayName(c, tier) { return tier === "gold" && c.goldName ? c.goldName : c.name; }
function initials(name) {
  return name.replace(/[^A-Za-z& ]/g, "").split(" ").filter(Boolean).map((w) => w[0]).slice(0, 2).join("");
}

function nextTierInfo(c, cards, chaptersDone) {
  const cur = cards[c.id] || null;
  const idx = cur ? TIER_RANK[cur] + 1 : 0;
  const next = TIER_ORDER[idx];
  if (!next || !c.requires[next]) return null;
  return { tier: next, missing: c.requires[next].filter((ch) => !chaptersDone[ch]) };
}

/* --------------------------- progression ----------------------------- */
/* Everything the Progress screen needs. The brief asks to see what has
   been learned without a Duolingo-style path, so this reports coverage
   across time and geography rather than position along a track. */
function buildProgress(save, cards) {
  const done = save.chaptersDone;
  const doneIds = Object.keys(done).filter((id) => CHAPTER_BY_ID[id]);

  const covered = doneIds.map((id) => CHAPTER_SPANS[id]).filter(Boolean);
  const centuries = {};
  covered.forEach((sp) => {
    for (let y = Math.floor(sp[0] / 100) * 100; y <= sp[1]; y += 100) centuries[y] = true;
  });

  const regions = {};
  REGIONS.forEach((r) => { regions[r.id] = { done: 0, total: 0 }; });
  Object.keys(SET_ATLAS).forEach((sid) => {
    const r = SET_ATLAS[sid].region;
    const chs = CHAPTERS_BY_SET[sid] || [];
    regions[r].total += chs.length;
    regions[r].done += chs.filter((c) => done[c.id]).length;
  });

  const tiers = { bronze: 0, silver: 0, gold: 0 };
  Object.values(cards).forEach((t) => { tiers[t] += 1; });

  const warsOpen = WAR_CHAPTERS.filter((w) => warGate(w, done).open).length;
  const warsDone = WAR_CHAPTERS.filter((w) => done[w.id]).length;
  const covStarts = covered.map((c) => c[0]);
  const covEnds = covered.map((c) => c[1]);

  return {
    chaptersDone: doneIds.length, chaptersTotal: CHAPTERS.length,
    studyDone: STUDY_CHAPTERS.filter((c) => done[c.id]).length, studyTotal: STUDY_CHAPTERS.length,
    warsOpen, warsDone, warsTotal: WAR_CHAPTERS.length,
    cards: Object.keys(cards).length, cardsTotal: ALL_CHARACTER_IDS.length, tiers,
    keyCount: save.keyCount || 0, centuries, regions,
    earliest: covStarts.length ? Math.min.apply(null, covStarts) : null,
    latest: covEnds.length ? Math.max.apply(null, covEnds) : null,
    minutes: doneIds.reduce((a, id) => a + (CHAPTER_BY_ID[id].minutes || 0), 0),
  };
}
