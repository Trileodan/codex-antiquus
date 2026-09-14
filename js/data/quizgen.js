/* =====================================================================
   THE PROMOTION QUIZ

   Gold is the only tier in this app that is not handed out for reading.
   When every chapter that teaches a coin has been studied, the coin is
   flagged READY TO PROMOTE and sits at Silver until its quiz is passed.
   Fail and it locks for twenty-four hours.

   The lock is the only place in the app where time gates anything, and
   it exists for one reason: without a cost, a multiple-choice quiz is
   just a button you press repeatedly until it opens. A day's wait makes
   guessing more expensive than going back and reading.

   WHERE THE QUESTIONS COME FROM
   Each coin already carries hand-written, dated, classified claims, and
   the chapters that teach it carry checkpoints. The quiz is assembled
   from both, so all 82 existing coins had a working quiz the day this
   shipped rather than waiting on six hundred new questions. A coin may
   override the whole thing by declaring its own `quiz: [...]`.

   The three generated question types are deliberately the three skills
   this app claims to teach:
     · what is the classification of this claim
     · in what year did this happen
     · a checkpoint from a chapter that taught it
   ===================================================================== */

const QUIZ_LEN = 4;
const QUIZ_PASS = 1.0;   /* every question. Gold should be hard. */

/* Deterministic shuffle so a quiz does not reshuffle under the reader
   mid-attempt, and so a retry after the 24h lock is a fresh draw. */
function quizRand(seedStr) {
  let h = 2166136261;
  for (let i = 0; i < seedStr.length; i++) { h ^= seedStr.charCodeAt(i); h = Math.imul(h, 16777619); }
  return () => { h ^= h << 13; h ^= h >>> 17; h ^= h << 5; return ((h >>> 0) % 100000) / 100000; };
}
function quizShuffle(arr, rnd) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

/* A classification question, which is the single most characteristic
   thing this app tests. Distractors are the other five labels. */
function claimQuestion(claim, c, rnd) {
  const wrong = quizShuffle(CLASSIFICATIONS.filter((x) => x !== claim.classification), rnd).slice(0, 3);
  const options = quizShuffle([claim.classification, ...wrong], rnd);
  return {
    q: `How does the app classify this? “${claim.text}”`,
    options, correct: options.indexOf(claim.classification),
    explain: `${claim.classification}. Sources: ${(claim.sources || []).map((k) => SOURCES[k] || k).join("; ")}`,
  };
}

/* A date question, built only where the coin has a clean single year, so
   that the wrong answers are plausible rather than absurd. */
function yearQuestion(c, rnd) {
  const t = c.timeline;
  if (!t || typeof t.year !== "number") return null;
  const y = t.year;
  const spread = Math.max(6, Math.round(Math.abs(y) * 0.02));
  const offs = quizShuffle([spread, -spread, spread * 3, -spread * 3, spread * 7, -spread * 7], rnd).slice(0, 3);
  const wrong = offs.map((o) => (y + o === 0 ? y + o + 1 : y + o));
  const options = quizShuffle([y, ...wrong], rnd);
  return {
    q: `In what year: ${t.label}?`,
    options: options.map(yearLabel), correct: options.indexOf(y),
    explain: `${yearLabel(y)}.`,
  };
}

/* Build the quiz for one coin. */
function buildQuiz(c, attempt) {
  const rnd = quizRand(`${c.id}|${attempt || 0}`);
  if (Array.isArray(c.quiz) && c.quiz.length) {
    return quizShuffle(c.quiz, rnd).slice(0, QUIZ_LEN).map((q) => ({ ...q }));
  }
  const pool = [];
  const yq = yearQuestion(c, rnd);
  if (yq) pool.push(yq);
  for (const cl of quizShuffle(c.claims || [], rnd)) {
    if (cl.text && cl.classification) pool.push(claimQuestion(cl, c, rnd));
    if (pool.length >= 8) break;
  }
  /* Checkpoints from the chapters that taught it. */
  const chapterQs = [];
  for (const chId of coinChapters(c)) {
    const ch = CHAPTER_BY_ID[chId];
    for (const q of (ch && ch.check) || []) chapterQs.push(q);
  }
  for (const q of quizShuffle(chapterQs, rnd)) {
    pool.push(shuffledQuestion(`${c.id}-q`, pool.length, q));
    if (pool.length >= 12) break;
  }
  return pool.slice(0, QUIZ_LEN);
}
