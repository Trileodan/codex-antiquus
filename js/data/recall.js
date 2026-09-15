/* =====================================================================
   YEAR DROP — RECALL TOKENS AND SCORING

   Master Brief v3 §1 and §7. The learner gets a year and a free-text
   box, writes whatever they associate with it, and the app reads what
   they wrote as cumulative evidence of cold recall.

   The brief is explicit about what this must NOT become:

     "It should not require one exact sentence."
     "Do not require all tokens; use them as cumulative evidence."
     "False positives should be avoided: a generic word such as 'Rome'
      alone is weak evidence."

   So this is deliberately not a quiz marker. It is an evidence meter.
   Writing "Zama" for 202 BC is strong evidence. Writing "Rome" is
   almost none — Rome is somewhere in nearly every century this app
   covers. The weights are the whole design.

   WHERE TOKENS COME FROM
   Two sources, merged. Most are DERIVED from data the app already holds
   — coin names and their timeline statements, chapter titles and tags,
   world events near the year — so every studied year has a working
   token set without 3,000 lines of hand-authoring. On top of that sit
   AUTHORED overrides for years that deserve better than derivation,
   including the six the brief supplies.

   Nothing here scores a person. It records what they retrieved.
   ===================================================================== */

const RECALL_STRONG = 3, RECALL_MEDIUM = 2, RECALL_WEAK = 1;
/* Enough to count as a genuine retrieval: one strong plus one weak, or
   two mediums. One generic word can never reach it on its own. */
const RECALL_PASS = 4;
/* How far either side of the year a token still counts. History does not
   respect an exact year, and the brief says not to require one. */
const RECALL_TOLERANCE = 30;

/* Authored token sets. The first six are the brief's own §7 examples,
   transcribed as given. `weak` exists to catch answers that are on the
   right continent but prove nothing. */
const RECALL_OVERRIDES = {
  "-202": { strong: ["zama", "scipio africanus", "liu bang", "gaozu"],
            medium: ["scipio", "hannibal", "second punic war", "han", "han dynasty", "numidia", "masinissa"],
            weak:   ["rome", "carthage", "china", "battle"] },
  "-221": { strong: ["qin shi huang", "first emperor", "unification", "shi huangdi"],
            medium: ["qin", "warring states", "zheng", "standardisation", "standardization"],
            weak:   ["china", "emperor"] },
  "-168": { strong: ["pydna", "perseus", "aemilius paullus", "eleusis", "popillius"],
            medium: ["macedon", "phalanx", "antiochus iv", "legion", "day of eleusis"],
            weak:   ["rome", "greece", "battle"] },
  "-480": { strong: ["thermopylae", "salamis", "leonidas"],
            medium: ["xerxes", "persia", "artemisia", "themistokles", "themistocles", "three hundred", "300"],
            weak:   ["athens", "sparta", "greece", "invasion"] },
  "-323": { strong: ["alexander", "babylon", "diadochi", "successors"],
            medium: ["roxana", "alexander iv", "ptolemy", "perdiccas", "death"],
            weak:   ["macedon", "empire", "greece"] },
  "-1177": { strong: ["bronze age collapse", "sea peoples", "ugarit"],
            medium: ["ramesses iii", "ramesses 3", "hittites", "hatti", "mycenae", "collapse"],
            weak:   ["egypt", "greece", "bronze"] },
  /* A few more where derivation alone would be thin. */
  "-216": { strong: ["cannae", "double envelopment"],
            medium: ["hannibal", "second punic war", "varro", "paullus", "encirclement"],
            weak:   ["rome", "carthage", "battle"] },
  "-146": { strong: ["destruction of carthage", "third punic war", "corinth", "scipio aemilianus"],
            medium: ["carthage", "byrsa", "mummius", "enslaved"],
            weak:   ["rome", "war"] },
  "-44": { strong: ["ides of march", "assassination", "brutus", "cassius"],
           medium: ["caesar", "julius caesar", "senate", "dictator", "conspiracy"],
           weak:   ["rome", "murder"] },
  "-31": { strong: ["actium", "agrippa"],
           medium: ["octavian", "antony", "cleopatra", "fleet", "ptolemaic"],
           weak:   ["rome", "egypt", "sea battle"] },
  "-490": { strong: ["marathon", "miltiades"],
            medium: ["darius", "athens", "plataea contingent", "hoplite"],
            weak:   ["persia", "greece", "battle"] },
  "-1046": { strong: ["mandate of heaven", "muye", "zhou"],
             medium: ["shang", "king wu", "conquest", "tianming"],
             weak:   ["china", "dynasty"] },
  "43": { strong: ["claudius", "medway", "invasion of britain"],
          medium: ["britain", "verica", "caratacus", "aulus plautius"],
          weak:   ["rome", "legion"] },
  "61": { strong: ["boudica", "iceni"],
          medium: ["londinium", "camulodunum", "verulamium", "suetonius paulinus", "revolt"],
          weak:   ["britain", "rome", "burned"] },
  "122": { strong: ["hadrian's wall", "hadrians wall", "hadrian"],
           medium: ["tyne", "solway", "frontier", "vallum"],
           weak:   ["britain", "wall", "rome"] },
};

/* ------------------------------------------------------------------ */
/* Deriving tokens for any year the app can drop                       */
/* ------------------------------------------------------------------ */

function rcNorm(s) {
  return (s || "").toLowerCase()
    .normalize("NFKD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ").trim();
}

/* Words too common to be evidence of anything. A learner who writes
   "war" has told us nothing about which war. */
const RECALL_STOP = new Set(rcNorm(
  "the a an and or of in on at to it is was were be been this that there here \
   war battle king queen emperor empire city state army people year years ago \
   ancient history rome roman greece greek egypt egyptian persia persian china \
   chinese happened something think know remember about during after before"
).split(" "));

/* Multi-word names score as one strong token; single words drop a tier,
   because a surname is far more specific than a country. */
function rcTier(phrase) {
  const n = rcNorm(phrase);
  if (!n) return null;
  const words = n.split(" ");
  if (words.length === 1 && RECALL_STOP.has(words[0])) return null;
  return { token: n, weight: words.length > 1 ? RECALL_STRONG : RECALL_MEDIUM };
}

/* Everything the app knows that sits near this year — restricted to what
   the learner has actually studied.

   That restriction is not politeness, it is correctness. Without it the
   hints listed segments from Sets they had never opened (Mesoamerica and
   Iron Age Britain both surfaced under 650 BC), which both spoils unread
   content and buries the useful hints in noise. The brief is explicit
   that Year Drop works on "material the learner has studied". */
function recallTokens(year, save) {
  const done = (save && save.chaptersDone) || null;
  const studied = (id) => !done || !!done[id];
  const out = new Map();
  const put = (phrase, weight) => {
    const t = rcTier(phrase);
    if (!t) return;
    const w = weight !== undefined ? weight : t.weight;
    if (!out.has(t.token) || out.get(t.token) < w) out.set(t.token, w);
  };

  /* 1. Authored overrides win outright. */
  const ov = RECALL_OVERRIDES[String(year)];
  if (ov) {
    (ov.strong || []).forEach((t) => put(t, RECALL_STRONG));
    (ov.medium || []).forEach((t) => put(t, RECALL_MEDIUM));
    (ov.weak || []).forEach((t) => put(t, RECALL_WEAK));
  }

  /* 2. Coins whose single-year statement lands near this year. Their
        names are strong; the nouns inside the statement are medium. */
  const coins = [];
  for (const id of Object.keys(CHARACTERS)) {
    const c = CHARACTERS[id], t = c.timeline;
    if (!t || typeof t.year !== "number") continue;
    if (Math.abs(t.year - year) > RECALL_TOLERANCE) continue;
    /* Only coins whose teaching chapters have been read. An unmet coin
       cannot be evidence of recall. */
    if (done && !coinChapters(c).some(studied)) continue;
    coins.push(id);
    put(c.name, RECALL_STRONG);
    for (const w of rcNorm(t.label).split(" ")) {
      if (w.length > 3 && !RECALL_STOP.has(w)) put(w, RECALL_WEAK);
    }
    for (const cn of c.connections || []) if (cn.name) put(cn.name, RECALL_MEDIUM);
  }

  /* 3. Chapters covering the year: titles and v3 tags. */
  for (const ch of CHAPTERS) {
    const sp = CHAPTER_SPANS[ch.id];
    if (!sp) continue;
    if (year < sp[0] - RECALL_TOLERANCE || year > sp[1] + RECALL_TOLERANCE) continue;
    if (!studied(ch.id)) continue;
    put(ch.title, RECALL_MEDIUM);
    for (const tag of ch.tags || []) put(tag, RECALL_MEDIUM);
  }

  /* 4. What else was happening — the Meanwhile material, which is exactly
        the kind of connection the brief wants rewarded. */
  for (const e of (typeof WORLD_EVENTS !== "undefined" ? WORLD_EVENTS : [])) {
    if (Math.abs(e.year - year) > RECALL_TOLERANCE) continue;
    put(e.region, RECALL_WEAK);
  }

  return { tokens: out, coins };
}

/* ------------------------------------------------------------------ */
/* Scoring what the learner wrote                                      */
/* ------------------------------------------------------------------ */

/* Tokens are tested by WEIGHT first, then by length.

   Weight-first matters more than it looks. Sorting by length alone let a
   long weak phrase eat the strong tokens inside it: "Thermopylae and
   Salamis" is a chapter title worth 2, and matching it first consumed
   the span containing "thermopylae" and "salamis", each worth 3, plus
   "xerxes" just past the end. A correct answer scored 2 and failed.

   Each stretch of text can only be claimed once, so an answer cannot be
   padded by repetition — but the strongest reading of a stretch wins. */
function scoreRecall(text, year, save) {
  const { tokens, coins } = recallTokens(year, save);
  const hay = " " + rcNorm(text) + " ";
  const found = [];
  let score = 0;
  const keys = [...tokens.keys()].sort((a, b) => {
    const dw = tokens.get(b) - tokens.get(a);
    return dw !== 0 ? dw : b.length - a.length;
  });
  const consumed = [];
  for (const k of keys) {
    const at = hay.indexOf(" " + k + " ");
    if (at === -1) continue;
    /* The match occupies hay[at+1 .. at+k.length]; the spaces on either
       side are shared with neighbouring tokens and must not be claimed,
       or the word immediately after is swallowed too. */
    const a = at + 1, b = at + 1 + k.length;
    if (consumed.some(([s, e]) => a < e && b > s)) continue;
    consumed.push([a, b]);
    const w = tokens.get(k);
    score += w;
    found.push({ token: k, weight: w });
  }
  found.sort((a, b) => b.weight - a.weight || a.token.localeCompare(b.token));
  const words = rcNorm(text).split(" ").filter(Boolean).length;
  return {
    score, found, coins, passed: score >= RECALL_PASS, words,
    /* What they could have said but did not — shown only after they have
       committed to an answer, and capped so it teaches rather than scolds. */
    missed: keys.filter((k) => !found.some((f) => f.token === k) && tokens.get(k) >= RECALL_MEDIUM)
                .sort((a, b) => tokens.get(b) - tokens.get(a)).slice(0, 8),
  };
}
