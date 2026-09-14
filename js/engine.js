/* =====================================================================
   ENGINE
   Derived indexes, save/load, unlock rules, war gating and the
   progression metrics behind the Progress screen.
   Loads after all data files.
   ===================================================================== */

const ALL_CHARACTER_IDS = Object.keys(CHARACTERS);
const CHAPTER_BY_ID = CHAPTERS.reduce((a, c) => { a[c.id] = c; return a; }, {});
const CHAPTERS_BY_SET = CHAPTERS.reduce((a, c) => { (a[c.set] = a[c.set] || []).push(c); return a; }, {});
/* Entries that belong to no single Set and are gated on several.
   A war is one kind; a collapse that ended half a dozen civilisations at
   once is another, and the gating, the screen and the reader are the
   same for both. GATED_KINDS is the list; everything else keys off it so
   that adding a third kind is one line. */
const GATED_KINDS = ["war", "crisis"];
const isGated = (c) => GATED_KINDS.includes(c.kind);
const WAR_CHAPTERS = CHAPTERS.filter(isGated);
const STUDY_CHAPTERS = CHAPTERS.filter((c) => c.kind !== "war");

/* Explicit time spans, used for the coverage timeline on the Progress
   screen. Kept as data rather than parsed out of the era strings, which
   are written for humans and not for regexes. */
const CHAPTER_SPANS = {
  "egy-predynastic": [-5000, -3100], "egy-menes": [-3150, -3050], "egy-writing": [-3200, -2600],
  "egy-pyramids": [-2670, -2500], "egy-oldkingdom": [-2686, -2181], "egy-first-intermediate": [-2181, -2055],
  "egy-middle-kingdom": [-2055, -1650], "egy-life": [-2000, -1100],
  "egy-hyksos": [-1650, -1550], "egy-empire": [-1479, -1425], "egy-akhenaten": [-1353, -1323],
  "egy-kadesh": [-1274, -1258], "egy-sea-peoples": [-1200, -1150], "egy-decline": [-1150, -1069],
  "egy-kushites": [-1069, -656], "egy-saite": [-664, -525], "egy-persia": [-525, -332],
  "grk-mycenae": [-1600, -800], "crisis-bronze-age": [-1200, -1150],
  "emp-principate": [-27, 14], "emp-army": [-27, 200], "emp-cult": [-27, 250],
  "emp-julio-claudians": [14, 68], "emp-69": [68, 69], "emp-flavians": [69, 96],
  "emp-adoptive": [96, 180], "emp-trajan": [98, 117], "emp-hadrian": [117, 138],
  "emp-life": [100, 200], "emp-marcus": [161, 192],
  "emp-severans": [193, 235], "emp-crisis": [235, 284], "emp-diocletian": [284, 305],
  "emp-constantine": [306, 337], "emp-church": [337, 400],
  "emp-barbarians": [370, 410], "emp-fall": [410, 476],
  "war-britain": [43, 84],
  founding: [-800, -750], kings: [-753, -509], "republic-born": [-509, -495],
  "how-republic-worked": [-509, -49], "struggle-orders": [-494, -287],
  "punic-1": [-264, -241], "punic-2": [-218, -216], "punic-3": [-209, -146],
  greece: [-200, -146], gracchi: [-133, -121], "marius-sulla": [-107, -78],
  "spartacus-pompey": [-73, -62], "caesar-rise": [-100, -62], triumvirate: [-60, -56],
  gaul: [-58, -50], rubicon: [-49, -48], egypt: [-48, -46], dictator: [-46, -44],
  "antony-octavian": [-44, -42], actium: [-41, -30], augustus: [-27, -27],
  "carth-dido": [-814, -800], "carth-place": [-800, -264], "carth-sicily": [-580, -265],
  "carth-hanno": [-520, -480], "carth-after-first": [-264, -237], "carth-truceless": [-241, -237],
  "carth-spain": [-237, -218], "carth-italy": [-218, -206], "carth-zama": [-202, -151], "carth-end": [-149, -146],
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
  "brit-stones": [-4000, -1500], "brit-metal": [-2200, -700], "brit-hillforts": [-800, -100],
  "brit-pytheas": [-450, -325], "brit-druids": [-300, 61],
  "brit-tribes": [-150, 43], "brit-oppida": [-100, 43],
  "brit-caesar": [-55, -54], "brit-claudius": [43, 47], "brit-caratacus": [43, 51],
  "brit-boudica": [60, 61], "brit-agricola": [77, 84],
  "brit-walls": [122, 211], "brit-life": [50, 400],
  "brit-civil": [193, 212], "brit-breakaway": [260, 296],
  "brit-constantine": [306, 383], "brit-end": [367, 450],
};

/* ------------------------------ save --------------------------------- */
const SAVE_KEY = "codex-antiquus-save-v3";
const BLANK_SAVE = {
  chaptersDone: {}, beatMax: {}, bookmark: null, recentKeys: [], keyCount: 0, patron: null,
  /* quiz[coinId] = { passed: true } | { failedAt: <epoch ms> }
     A coin at 100% coverage is "ready to promote"; passing its quiz mints
     Gold. Failing locks the quiz for QUIZ_LOCK_MS, which is the only
     place in this app where time is allowed to gate anything. It is
     deliberate: promotion to Gold should cost something to get wrong. */
  quiz: {},
  /* Results of timeline games, newest first. */
  games: [],
};

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

/* --------------------------------------------------------------------
   Checkpoint options are shuffled at render time.

   92% of the 228 questions in this app had been written with the right
   answer second. Nobody did that on purpose; it is what happens when you
   write a question, then a wrong answer, then the right one, then two
   more wrong ones. The effect is that the checkpoint stops testing
   anything, because the second option is always correct.

   The shuffle is seeded on the chapter and question, so the order is the
   same every time you meet that question — it does not jump around while
   you are reading it — but it is not the order it was authored in.
   -------------------------------------------------------------------- */
function seededOrder(seed, n) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) { h ^= seed.charCodeAt(i); h = Math.imul(h, 16777619); }
  const rnd = () => { h ^= h << 13; h ^= h >>> 17; h ^= h << 5; return ((h >>> 0) % 100000) / 100000; };
  const idx = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [idx[i], idx[j]] = [idx[j], idx[i]]; }
  return idx;
}

/* A question with its options in display order, and `correct` pointing at
   wherever the right one ended up. */
function shuffledQuestion(chapterId, qi, q) {
  const order = seededOrder(`${chapterId}#${qi}`, q.options.length);
  return { ...q, options: order.map((o) => q.options[o]), correct: order.indexOf(q.correct) };
}

/* ------------------------------ coins -------------------------------- */
/* THE COIN MODEL
   ---------------------------------------------------------------------
   A coin is any subject the app can teach: a person, an event, a battle,
   a war, an invention. Tiers are proportional to how much of what the
   app holds on that subject you have actually read.

     Bronze  you have met it — one teaching chapter studied
     Silver  half of what the app has on it
     Gold    all of it, AND you have passed its quiz

   A coin at full coverage whose quiz is unpassed sits at Silver and is
   flagged READY TO PROMOTE. That flag is the point: Gold is not handed
   out for turning pages, it is claimed.

   The older card files declare `requires: { bronze: [...], silver: [...],
   gold: [...] }`. Those arrays are now read as one pool of teaching
   chapters, so nothing had to be rewritten. New coins may simply declare
   `teaches: [...]` instead, which is clearer. */

const QUIZ_LOCK_MS = 24 * 60 * 60 * 1000;
const SILVER_AT = 0.5;

/* Every chapter that teaches about this coin, from either declaration. */
function coinChapters(c) {
  if (c._chapters) return c._chapters;
  let list;
  if (Array.isArray(c.teaches)) list = c.teaches.slice();
  else {
    const seen = new Set();
    list = [];
    for (const tier of TIER_ORDER) {
      for (const id of (c.requires && c.requires[tier]) || []) {
        if (!seen.has(id)) { seen.add(id); list.push(id); }
      }
    }
  }
  /* A chapter that does not exist cannot be studied, and leaving it in
     would make full coverage unreachable — which is how a coin becomes
     permanently un-goldable without anyone noticing. */
  list = list.filter((id) => CHAPTER_BY_ID[id]);
  try { Object.defineProperty(c, "_chapters", { value: list, enumerable: false }); } catch (e) { c._chapters = list; }
  return list;
}

function quizLockedUntil(save, coinId) {
  const q = (save && save.quiz && save.quiz[coinId]) || null;
  if (!q || q.passed || !q.failedAt) return 0;
  const until = q.failedAt + QUIZ_LOCK_MS;
  return until > Date.now() ? until : 0;
}
function quizPassed(save, coinId) {
  return !!(save && save.quiz && save.quiz[coinId] && save.quiz[coinId].passed);
}

/* Coverage and tier for one coin. Returns null when nothing is studied,
   because an unmet coin is not in the collection at all. */
function coinState(c, chaptersDone, save) {
  const chapters = coinChapters(c);
  if (!chapters.length) return null;
  const studied = chapters.filter((id) => chaptersDone[id]).length;
  if (!studied) return null;
  const pct = studied / chapters.length;
  const full = studied === chapters.length;
  const passed = quizPassed(save, c.id);
  let tier = "bronze";
  if (full && passed) tier = "gold";
  else if (pct >= SILVER_AT) tier = "silver";

  /* Some coins were written before tiers were proportional and stop at
     bronze or silver. Showing a tier with no text behind it is a blank
     screen, so the DISPLAYED tier is clamped to the highest one actually
     authored. Coverage is unaffected, so the moment the missing tier is
     written the coin moves up on its own with no migration. The validator
     lists every coin still in this state. */
  const top = TIER_ORDER.filter((t) => c.tiers && c.tiers[t]).pop() || "bronze";
  const capped = TIER_RANK[tier] > TIER_RANK[top];
  if (capped) tier = top;

  return {
    tier, studied, total: chapters.length, pct,
    full, capped,
    /* No point offering a quiz whose reward has not been written yet. */
    ready: full && !passed && !!(c.tiers && c.tiers.gold),
    lockedUntil: full && !passed ? quizLockedUntil(save, c.id) : 0,
    chapters,
  };
}

function computeCards(chaptersDone, patron, save) {
  const out = {};
  for (const id of ALL_CHARACTER_IDS) {
    const st = coinState(CHARACTERS[id], chaptersDone, save);
    if (st) out[id] = st.tier;
  }
  /* The patron of the Set you chose to begin with is granted at Bronze.
     It is the one coin in the app that is given rather than earned, once
     per playthrough, and it is deliberate: choosing where to start should
     feel like taking someone's side. A coin already earned higher keeps
     its tier. */
  if (patron && SETS[patron] && SETS[patron].patron && !out[SETS[patron].patron])
    out[SETS[patron].patron] = "bronze";
  return out;
}

/* Every coin currently at full coverage with its quiz outstanding. The
   Coins screen surfaces these; it is the app's only nag. */
function readyToPromote(chaptersDone, save) {
  const out = [];
  for (const id of ALL_CHARACTER_IDS) {
    const st = coinState(CHARACTERS[id], chaptersDone, save);
    if (st && st.ready && !st.lockedUntil) out.push(id);
  }
  return out;
}

/* Every Set whose opening chapter stands on its own is a `foundation` and
   needs no unlock at all. History is not a tree with Rome at the root —
   that was an accident of which Set happened to be written first.

   `revealsSets` is a signpost, not a gate: finishing "Rome Meets Carthage"
   marks Carthage as somewhere you have now encountered, but Carthage was
   always open. Genuine prerequisites use `requiresSets`, and there are
   very few of them — the Roman Empire needs the Republic, and that is
   about the size of it. */
function unlockedSets(chaptersDone) {
  const out = { wars: true };
  for (const id of Object.keys(SETS)) if (SETS[id].foundation) out[id] = true;
  for (const ch of CHAPTERS) {
    if (!chaptersDone[ch.id]) continue;
    (ch.revealsSets || []).forEach((s) => { out[s] = true; });
  }
  for (const id of Object.keys(SETS)) {
    const req = SETS[id].requiresSets;
    if (req && !req.every((r) => setProgress(r, chaptersDone).pct === 100)) delete out[id];
  }
  return out;
}

/* Which Sets you have merely been pointed at, and by what. */
function revealedBy(setId, chaptersDone) {
  return CHAPTERS.filter((c) => chaptersDone[c.id] && (c.revealsSets || []).includes(setId));
}

/* ------------------------- order within a Set ------------------------ */
/* The real risk of muddling was never which civilisation you pick, it is
   reading a society's end before its beginning. So order is enforced
   here, by act, rather than between Sets. Finish an act to open the next;
   within an act, read in whatever order you like. */

function actsOf(setId) {
  const out = [];
  for (const c of CHAPTERS_BY_SET[setId] || []) if (!out.includes(c.act)) out.push(c.act);
  return out;
}

function actOpen(setId, act, chaptersDone) {
  const acts = actsOf(setId);
  const i = acts.indexOf(act);
  if (i <= 0) return true;
  const prev = acts[i - 1];
  return (CHAPTERS_BY_SET[setId] || []).filter((c) => c.act === prev).every((c) => chaptersDone[c.id]);
}

function chapterOpen(ch, chaptersDone) {
  if (isGated(ch)) return warGate(ch, chaptersDone).open;
  return actOpen(ch.set, ch.act, chaptersDone);
}

function setProgress(setId, chaptersDone) {
  const chs = CHAPTERS_BY_SET[setId] || [];
  const done = chs.filter((c) => chaptersDone[c.id]).length;
  return { done, total: chs.length, pct: chs.length ? Math.round((done / chs.length) * 100) : 0 };
}

/* Gating: a shared entry opens only when EVERY side has been studied up
   to the point the entry begins. This is the rule from the brief,
   applied without exception — including where it seals content already
   written. The name is historical; it governs crises too. */
function warGate(war, chaptersDone) {
  const items = (war.gate || []).map((g) => {
    const ch = CHAPTER_BY_ID[g.chapter];
    return { ...g, chapterTitle: ch ? ch.title : g.chapter, setName: ch ? SETS[ch.set].name : "", done: !!chaptersDone[g.chapter] };
  });
  return { open: items.every((i) => i.done), items };
}

function displayName(c, tier) { return tier === "gold" && c.goldName ? c.goldName : c.name; }
function initials(name) {
  /* Drop punctuation, then lower-case connectives ("the", "of") and lone
     numerals, so "Cyrus the Great" reads CG rather than Ct and
     "Ptolemy I Soter" reads PS rather than PI. */
  const words = name.replace(/[^A-Za-z ]/g, " ").split(" ").filter((w) => w.length > 1);
  const strong = words.filter((w) => w[0] === w[0].toUpperCase());
  const use = strong.length ? strong : words;
  return use.map((w) => w[0]).slice(0, 2).join("") || name.slice(0, 1).toUpperCase();
}

/* What stands between this coin and its next tier. With proportional
   tiers this is no longer a fixed list of prerequisites but "how many
   more of the chapters that teach it", which is both easier to explain
   and harder to game. */
function nextTierInfo(c, cards, chaptersDone, save) {
  const st = coinState(c, chaptersDone, save);
  if (!st) {
    return { tier: "bronze", missing: coinChapters(c), need: 1 };
  }
  if (st.tier === "gold") return null;
  const unread = st.chapters.filter((id) => !chaptersDone[id]);
  if (st.full) return { tier: "gold", missing: [], need: 0, quiz: true, lockedUntil: st.lockedUntil };
  const silverNeed = Math.max(1, Math.ceil(st.total * SILVER_AT) - st.studied);
  if (st.tier === "bronze") return { tier: "silver", missing: unread, need: silverNeed };
  return { tier: "gold", missing: unread, need: unread.length, quiz: true };
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
