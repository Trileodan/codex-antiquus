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
  /* ---- Sets untouched by Master Brief v3 -------------------------- */
  "crisis-bronze-age": [-1200, -1150], "emp-principate": [-27, 14], "emp-army": [-27, 200],
  "emp-cult": [-27, 250], "emp-julio-claudians": [14, 68], "emp-69": [68, 69],
  "emp-flavians": [69, 96], "emp-adoptive": [96, 180], "emp-trajan": [98, 117],
  "emp-hadrian": [117, 138], "emp-life": [100, 200], "emp-marcus": [161, 192],
  "emp-severans": [193, 235], "emp-crisis": [235, 284], "emp-diocletian": [284, 305],
  "emp-constantine": [306, 337], "emp-church": [337, 400], "emp-barbarians": [370, 410],
  "emp-fall": [410, 476], "war-britain": [43, 84], "founding": [-800, -750],
  "kings": [-753, -509], "republic-born": [-509, -495], "how-republic-worked": [-509, -49],
  "struggle-orders": [-494, -287], "punic-1": [-264, -241], "punic-2": [-218, -216],
  "punic-3": [-209, -146], "greece": [-200, -146], "gracchi": [-133, -121],
  "marius-sulla": [-107, -78], "spartacus-pompey": [-73, -62], "caesar-rise": [-100, -62],
  "triumvirate": [-60, -56], "gaul": [-58, -50], "rubicon": [-49, -48],
  "egypt": [-48, -46], "dictator": [-46, -44], "antony-octavian": [-44, -42],
  "actium": [-41, -30], "augustus": [-27, -27], "carth-dido": [-814, -800],
  "carth-place": [-800, -264], "carth-sicily": [-580, -265], "carth-hanno": [-520, -480],
  "carth-after-first": [-264, -237], "carth-truceless": [-241, -237], "carth-spain": [-237, -218],
  "carth-italy": [-218, -206], "carth-zama": [-202, -151], "carth-end": [-149, -146],
  "war-greco-persian": [-499, -449], "war-punic-1": [-264, -241], "war-punic-2": [-218, -201],
  "war-punic-3": [-149, -146], "war-actium": [-32, -30],

  /* ---- Master Brief v3 Sets ---------------------------------------
     The brief supplies segment titles but no date ranges, and these
     drive the Progress coverage bands and the Year Drop pool. So they
     are inferred from each segment's subject: metadata, not prose. */
  "brit-island-before-written-history": [-8000, -800], "brit-stonehenge-monument-world": [-3000, -1500],
  "brit-bronze-gives-way-iron": [-800, -55], "brit-caesar-looks-across-channel": [-55, -54],
  "brit-ad-43-claudius-invades": [43, 51], "brit-boudica-burns-roman-britain": [60, 61],
  "brit-roads-towns-villas": [50, 400], "brit-hadrian-draws-line": [122, 211],
  "brit-410-rome-leaves-sort": [383, 450], "grk-minoans-palaces-on-crete": [-2000, -1450],
  "grk-mycenae-warrior-kings": [-1600, -1100], "grk-after-palaces": [-1100, -700],
  "grk-sparta-builds-military-society": [-700, -500], "grk-athens-experiments-democracy": [-594, -508],
  "grk-marathon": [-499, -490], "grk-thermopylae-salamis": [-480, -479],
  "grk-athenian-empire": [-478, -431], "grk-peloponnesian-war": [-431, -404],
  "grk-thebes-macedon": [-404, -338], "ptol-ptolemy-takes-egypt": [-323, -282],
  "ptol-alexandria-new-kind-capital": [-331, -246], "ptol-greek-king-egyptian-pharaoh": [-305, -30],
  "ptol-syrian-wars": [-274, -168], "ptol-rosetta-stone": [-196, -196],
  "ptol-rome-enters-room": [-168, -80], "ptol-dynasty-at-war-itself": [-145, -51],
  "ptol-cleopatra-caesar": [-51, -44], "ptol-actium-end": [-31, -30],
  "egy-nile-before-egypt": [-5000, -3100], "egy-scorpion-narmer": [-3200, -3000],
  "egy-djoser-first-great-pyramid": [-2670, -2650], "egy-sneferu-learns-how-build": [-2613, -2589],
  "egy-giza": [-2589, -2500], "egy-when-old-kingdom-breaks": [-2181, -2055],
  "egy-middle-kingdom": [-2055, -1650], "egy-hyksos": [-1650, -1550],
  "egy-hatshepsut-king-queen": [-1479, -1458], "egy-akhenaten-breaks-pattern": [-1353, -1336],
  "egy-tutankhamun-famous-because-he": [-1341, -1323], "egy-ramesses-ii-kadesh": [-1279, -1213],
  "egy-ramesses-iii-sea-peoples": [-1186, -1155], "egy-from-libyans-persians": [-1069, -332],
  "per-medes-persians-iranian-plateau": [-700, -559], "per-cyrus-great": [-559, -530],
  "per-cambyses-takes-egypt": [-530, -522], "per-darius-organises-machine": [-522, -486],
  "per-ionian-revolt-marathon": [-499, -490], "per-xerxes-invades-greece": [-486, -465],
  "per-persia-after-xerxes": [-465, -359], "per-darius-iii-alexander": [-336, -330],
  "per-persia-after-persia": [-330, -150], "chn-shang-kings-bronze-oracle": [-1600, -1046],
  "chn-zhou-mandate-heaven": [-1046, -771], "chn-confucius": [-551, -479],
  "chn-warring-states": [-475, -221], "chn-qin-becomes-war-machine": [-356, -221],
  "chn-221-bc-first-emperor": [-221, -210], "chn-terracotta-army-immortality": [-246, -210],
  "chn-qin-collapses": [-210, -206], "chn-202-bc-liu-bang": [-206, -195],
  "chn-emperor-wu-looks-outward": [-141, -87], "mes-what-mesoamerica-means": [-2000, 1521],
  "mes-olmec-centres": [-1400, -400], "mes-teotihuacan-city-gods": [1, 650],
  "mes-maya-city-states": [250, 900], "mes-classic-maya-transformation": [750, 950],
  "mes-toltec-tula-memory": [900, 1150], "mes-mexica-arrive": [1250, 1325],
  "mes-aztec-empire": [1428, 1519], "mes-cortes-enters-political-world": [1519, 1520],
  "mes-1521-tenochtitlan-falls": [1521, 1521],
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

/* Master Brief v3 supplies segment titles but no era strings, and the
   Set list and reader both print one. Rather than invent a date line per
   segment, derive it from the span that already exists — same numbers,
   one source of truth, and it stays correct if a span is edited. */
function chapterEra(c) {
  if (c.era) return c.era;
  const sp = CHAPTER_SPANS[c.id];
  if (!sp) return "";
  const [a, b] = sp;
  return a === b ? yearLabel(a) : `${yearLabel(a)} – ${yearLabel(b)}`;
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
