/* =====================================================================
   THE TIMELINE GAME — rules

   Ten coins each. One event on the table to start. Draw three. Take it
   in turns to place a coin in the right position relative to everything
   already down.

     Right  → a point, and you draw a replacement.
     Wrong  → the coin is discarded. No point, no draw, and your hand is
              one smaller than it was.

   Which means the only thing that can kill you is being wrong. Get every
   placement right and your hand never shrinks until you have played all
   ten. Run your hand down to nothing by being wrong and you lose on the
   spot, whatever the score.

   That asymmetry is the whole game. Points decide a game that both
   players survive; almost nothing else matters if you don't.

   Kept separate from the screen so the rules can be tested without a
   browser, which is how the same-year and empty-pile edge cases got
   found rather than shipped.
   ===================================================================== */

const TG_HAND = 3;
const TG_COINS = 10;

/* AI uncertainty, in years. The opponent does not "decide to be wrong" —
   it estimates each coin's date with noise and plays its best guess, so
   it fails exactly where a person fails: on gaps that are too tight to
   call. Wide gaps it gets right, because wide gaps are easy.

   This also makes the two difficulty settings mean something honest.
   Matching your knowledge gives it your collection and a human-sized
   wobble. Full History gives it every coin in the app and a much steadier
   hand — it is not cheating, it has simply read everything. */
const TG_SIGMA = { match: 45, full: 8 };

function tgRand(seed) {
  let h = (seed >>> 0) || 1;
  return () => { h ^= h << 13; h ^= h >>> 17; h ^= h << 5; return ((h >>> 0) % 1000000) / 1000000; };
}
function tgShuffle(arr, rnd) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
/* Box-Muller, so AI error is normally distributed rather than uniform —
   mostly close, occasionally badly out, which is what being half-sure
   about a date actually feels like. */
function tgNoise(rnd, sigma) {
  const u = Math.max(rnd(), 1e-9), v = rnd();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v) * sigma;
}

/* Every coin that can be played: it must have been earned and must carry
   a single-year statement. */
function playableCoins(cards) {
  return Object.keys(cards || {})
    .filter((id) => CHARACTERS[id] && CHARACTERS[id].timeline)
    .map((id) => ({ id, ...CHARACTERS[id].timeline, name: CHARACTERS[id].name, tier: cards[id], kind: CHARACTERS[id].kind || "person" }));
}
/* The Full History opponent's pool: everything the app knows, whether or
   not the player has met it. */
function allCoins() {
  return Object.keys(CHARACTERS)
    .filter((id) => CHARACTERS[id].timeline)
    .map((id) => ({ id, ...CHARACTERS[id].timeline, name: CHARACTERS[id].name, tier: "gold", kind: CHARACTERS[id].kind || "person" }));
}

/* Where a coin may legally go. Slot i means "between the coin at i-1 and
   the coin at i". Ties are accepted on either side, because two things
   that happened in the same year have no order to get wrong. */
function tgSlotOk(placed, slot, year) {
  const before = slot > 0 ? placed[slot - 1].year : null;
  const after = slot < placed.length ? placed[slot].year : null;
  return (before === null || before <= year) && (after === null || year <= after);
}
function tgCorrectSlot(placed, year) {
  for (let i = 0; i <= placed.length; i++) if (tgSlotOk(placed, i, year)) return i;
  return placed.length;
}

/* Set up a game. `mine` and `theirs` are the ten coins each side brings;
   the starting event is drawn from whichever pool is larger so that the
   opening card is not always one of the player's own. */
function tgNewGame({ mine, theirs, seed, aiMode }) {
  const rnd = tgRand(seed || Date.now());
  const seedPool = (theirs.length >= mine.length ? theirs : mine);
  const opener = seedPool[Math.floor(rnd() * seedPool.length)];
  const strip = (list) => list.filter((c) => c.id !== opener.id);

  const p1 = tgShuffle(strip(mine), rnd);
  const p2 = tgShuffle(strip(theirs), rnd);
  return {
    seed: seed || 0,
    aiMode: aiMode || "match",
    placed: [{ ...opener, by: "start" }],
    players: [
      { who: "you", hand: p1.slice(0, TG_HAND), pile: p1.slice(TG_HAND), discard: [], points: 0, lost: false, done: false },
      { who: "ai",  hand: p2.slice(0, TG_HAND), pile: p2.slice(TG_HAND), discard: [], points: 0, lost: false, done: false },
    ],
    turn: 0,
    log: [],
    over: false,
    result: null,
  };
}

/* One placement. Returns a NEW state — the screen keeps the old one for
   the "here is what just happened" panel. */
function tgPlace(state, coinId, slot) {
  const st = JSON.parse(JSON.stringify(state));
  const p = st.players[st.turn];
  const idx = p.hand.findIndex((c) => c.id === coinId);
  if (idx === -1 || st.over || p.lost || p.done) return state;
  const coin = p.hand[idx];
  const ok = tgSlotOk(st.placed, slot, coin.year);

  p.hand.splice(idx, 1);
  if (ok) {
    st.placed.splice(slot, 0, { ...coin, by: p.who });
    p.points += 1;
    if (p.pile.length) p.hand.push(p.pile.shift());
  } else {
    p.discard.push(coin);
  }

  st.log.unshift({ who: p.who, coin, ok, correctSlot: ok ? slot : tgCorrectSlot(st.placed, coin.year) });

  /* An empty hand ends your game. HOW it emptied decides whether that is
     a defeat or a clean sweep: a wrong answer that takes your last coin
     is a loss on the spot, while placing your tenth coin correctly with
     nothing left to draw is a perfect run. */
  if (!p.hand.length) {
    if (p.discard.length) { p.lost = true; }
    else { p.done = true; }
  }

  const [a, b] = st.players;
  if (a.lost || b.lost) {
    st.over = true;
    st.result = a.lost && b.lost ? "draw" : a.lost ? "ai" : "you";
    st.reason = "hand";
  } else if ((a.done || a.lost) && (b.done || b.lost)) {
    st.over = true;
    st.result = a.points === b.points ? "draw" : a.points > b.points ? "you" : "ai";
    st.reason = "points";
  } else {
    /* Skip a player who has finished. */
    let next = 1 - st.turn;
    if (st.players[next].done || st.players[next].lost) next = st.turn;
    st.turn = next;
  }
  return st;
}

/* The opponent's move: estimate each coin's year, play the one it is
   most confident about, into the slot that estimate implies. */
function tgAiMove(state) {
  const p = state.players[1];
  if (!p.hand.length) return null;
  const sigma = TG_SIGMA[state.aiMode] || TG_SIGMA.match;
  const rnd = tgRand((state.seed || 1) + state.placed.length * 7919 + p.hand.length);

  let best = null;
  for (const coin of p.hand) {
    const guess = coin.year + tgNoise(rnd, sigma);
    const slot = tgCorrectSlot(state.placed, guess);
    /* How much room the chosen slot has. A wide gap is a safe play, so
       the opponent leads with those and saves the tight ones — which is
       what a decent human player does too. */
    const before = slot > 0 ? state.placed[slot - 1].year : guess - 1000;
    const after = slot < state.placed.length ? state.placed[slot].year : guess + 1000;
    const room = Math.max(1, after - before);
    if (!best || room > best.room) best = { coinId: coin.id, slot, room };
  }
  return best;
}
