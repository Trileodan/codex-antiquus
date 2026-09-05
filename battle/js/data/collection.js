/* =====================================================================
   COLLECTION
   What the player is allowed to put in a deck.

   The battle module runs in two situations and must work in both:

   MOUNTED — loaded inside the learning app, where CHARACTERS, loadSave
   and computeCards all exist. The collection is then the real one: a
   card is legal when its person has been minted at that tier or above.

   STANDALONE — opened on its own (battle/index.html, or the single-file
   build). There is no save and no character data, so everything is
   available and the UI says so. This is a sandbox for trying decks, not
   a way round the unlock rules.

   The battle engine never asks where a card came from. It is handed a
   list of legal ids and nothing else, which is what keeps the two halves
   separable.
   ===================================================================== */

const TIER_ABOVE = { bronze: 0, silver: 1, gold: 2 };

function collectionMode() {
  return (typeof CHARACTERS !== "undefined" && typeof computeCards === "function"
          && typeof loadSave === "function") ? "collection" : "sandbox";
}

/* { cardId: {owned, why} } for every battle card in the roster. */
function ownedCards() {
  const out = {};
  const mode = collectionMode();

  if (mode === "sandbox") {
    for (const id of Object.keys(BATTLE_CARDS)) {
      const c = BATTLE_CARDS[id];
      out[id] = { owned: !c.token, why: c.token ? "Summoned only — never in a deck." : "Sandbox: every card available." };
    }
    return out;
  }

  const save = loadSave();
  const minted = computeCards(save.chaptersDone || {}, save.patron);

  for (const id of Object.keys(BATTLE_CARDS)) {
    const c = BATTLE_CARDS[id];
    if (c.token) { out[id] = { owned: false, why: "Summoned only — never in a deck." }; continue; }
    if (!c.charId) { out[id] = { owned: true, why: "Not a historical figure the app teaches — always available." }; continue; }
    const have = minted[c.charId];
    const person = CHARACTERS[c.charId];
    const name = person ? person.name : c.charId;
    if (!have) {
      out[id] = { owned: false, why: `Unlock ${name} in the learning app to use this card.` };
    } else if (TIER_ABOVE[have] < TIER_ABOVE[c.tier || "bronze"]) {
      out[id] = { owned: false, why: `You hold ${name} at ${have}. This card needs ${c.tier}.` };
    } else {
      out[id] = { owned: true, why: `${name}, minted at ${have}.` };
    }
  }
  return out;
}

/* ---- saved decks ---------------------------------------------------- */
const DECK_KEY = "codex-battle-decks-v1";

function loadDecks() {
  try {
    const raw = localStorage.getItem(DECK_KEY);
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list : [];
  } catch (_) { return []; }
}

function saveDecks(list) {
  try { localStorage.setItem(DECK_KEY, JSON.stringify(list)); return true; }
  catch (_) { return false; }
}
