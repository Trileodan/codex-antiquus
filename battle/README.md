# Field of Battle

A deterministic tactical card battle, built to the Tactical Battle Game
Build Brief. It lives in its own folder and runs in two places: as the
**Battle** tab of the learning app, where it can see your collection, and
as a standalone page here, where it cannot. The same files serve both.

## Launching it

**Inside the app:** open Codex Antiquus and press **Battle** in the
navigation. This is the real one — the deck builder shows what you have
unlocked and locks the rest.

**On its own, no server needed:** double-click
**`dist/field-of-battle.html`**. `build.py` inlines the CSS, the vendored
libraries and every module into that one file, so it opens straight from
disk like any web page. Re-run `python3 build.py` after changing anything.
Every card is available there, because there is no save to read.

**The developer way:** double-click **`play-battle.bat`** in the project
root. It starts a local server and opens the game, so edits show up on
refresh without rebuilding. Leave the black console window open while you
play — closing it stops the server.

`serve.bat` opens the learning app at `http://localhost:8000`, where the
Battle tab is the mounted version. `play-battle.bat` serves the standalone
page at `http://localhost:8000/battle/`.

This page cannot be opened by double-clicking `battle/index.html`.
Babel fetches the module scripts over XHR and browsers block that on
`file://` — the page detects it and says so rather than failing silently.

    node battle/tools/test-battle.js     75 rules tests + 200 playouts

## Why it is separate, and how it slots in later

The brief asks for reuse of the existing project (§37) and for a game that
can grow to hundreds of cards (§28). Those pull in opposite directions if
the battle game is bolted into `index.html`: that file loads twenty-odd
script tags in a fixed order with no build step, and every battle module
added to it is loaded by every reader who only wanted to read about Cato.

So the split is by *runtime*, not by repository. This module shares the
design tokens (`../css/styles.css`), the vendored React and Babel
(`../vendor/`), the favicon and the no-build architecture.

**It is now mounted.** `index.html` loads these same eleven files after
its own and before `js/app.js`, which renders `<BattleApp />` for the
`battle` screen. Two lines made that possible:

  * `js/ui/app.js` calls `createRoot` only if a `#battle-root` element
    exists. The standalone page has one; the learning app does not, so the
    module waits to be rendered as a child.
  * `css/battle.css` drops `min-height:100vh` and its own background under
    `.hcg-root`, because inside the app the shell owns the page.

The module still reads nothing from the learning app *directly*. The one
seam is `js/data/collection.js`, which looks for `CHARACTERS`,
`computeCards` and `loadSave` at call time and reports `"collection"` or
`"sandbox"` accordingly. Everything downstream asks it, not the app.

## Card data is a separate layer, deliberately

A history character card carries six scholarly attributes on a 0–99 scale
— power, intellect, influence, creativity, wealth, fame. A battle card
needs Speed, Lives, one Attack power, the arcs it can attack through, and
per-edge Defence, all on a 0–5 scale. Neither can be derived from the
other, and §31 of the brief is explicit that military fame must not
simply become higher statistics.

**Attack is a single number; direction lives in `arcs`.** A card hits just
as hard whichever way it strikes — what differs is which edges it can
strike through at all. A legionary is `["front"]`. A Scythian horse archer
is all four. A ship of the line would be `["left","right"]` and nothing
fore or aft; a tank would be all four. Defence stays per-edge, because
being caught from behind has to hurt. On the board the arcs are drawn as
red lines along those edges, so a glance tells you where a card is
dangerous and where it is not.

The two are joined by `charId`. A battle card names the history character
it represents; when that character is unlocked in the learning app, the
battle card becomes legal in a deck. Battle values stay hand-authored, so
a card can be strong because of what it *does* rather than because the
person was famous — and a non-military figure can be a good card without
being given invented combat statistics.

## Architecture

    js/data/      terrain, statuses, abilities, cards, battlefields
    js/engine/    state.js   plain state and read-only queries
                  rules.js   legality, mutations, and the effect vocabulary
    js/ui/        board.js   grid, tokens, card detail
                  app.js     screens and interaction
    tools/        test-battle.js

`js/engine/` never mentions React and never mentions a character. State is
plain JSON, which is what makes the headless test run, and what will make
replays, an AI opponent and network play tractable later.

### Two rules the code enforces structurally

**No ability is hardcoded to a name.** A card lists ability ids; an
ability lists effects drawn from a fixed vocabulary in `EFFECTS`. Hannibal
ignores terrain because his card carries `alpine-crossing`, whose effect
is `{ type: "ignoreTerrain" }` — grep the engine for "Hannibal" and there
are no hits. A genuinely new behaviour means adding one entry to `EFFECTS`,
after which every future card can use it.

**No battlefield is hardcoded.** `BATTLEFIELDS` holds compact character
grids; width, height and terrain are decoded from the data. A 10×12 map
with six fortresses needs no code change at all.

## Adding content

*A card* — add an entry to `BATTLE_CARDS`. Reuse existing ability ids, or
add a new ability whose effects use existing types.

*A terrain type* — add an entry to `TERRAIN` and a character to
`TERRAIN_KEY`. Movement cost, line of sight, defence modifier and tags are
all read generically.

*A battlefield* — add an entry to `BATTLEFIELDS`. It may carry its own
`deployFrom` to override the deployment zones for that map alone.

*A status* — add an entry to `STATUSES`. Modifiers and restrictions are
applied by `effectiveStats`, so nothing else needs touching.

*A new kind of effect* — add one function to `EFFECTS` in `rules.js`.
That is the only place the engine should ever need to grow.

## What is implemented

Phases 1–5 of the brief, and most of Phase 6. Grid, Commander placement,
orthogonal movement with terrain costs, facing, directional attack and
defence, deterministic combat, Lives, two Actions with one Move, turns and
rounds, fortresses with persistent ownership and VP, Command generation and
cap, deployment from the home row or beside a living Commander,
deployment sickness, draw-discard-recycle, abilities with
cooldowns, statuses, summoning, healing, ranged attacks with line of sight,
both victory conditions, full card inspection, legal-square highlighting,
a battle log and a debug panel.

Not yet built: animations, a deck builder (four preset decks stand in),
and the naval mode — which §30 asks to be kept possible rather than built,
and is, since facing, speed and directional attack are already generic.

## Prototype content

Seven Commanders, thirteen Troops, eight Specials, four battlefields —
within the ranges §32 asks for, and chosen to exercise every system:
directional combat, healing, terrain interaction, ranged attacks,
cooldowns, hidden units, status effects, summoned units, Commander
abilities and fortress interaction. Every number in them is a prototype
value, as §33 requires.

## What the opponent found out about the game

`js/engine/ai.js` plays both sides in the test harness, which is the first
time anything has played this game properly. Three things fell out. None
of them is fixed, because each is a design decision rather than a bug.

**Attacks mostly bounce.** Over 274 adjacent enemy pairs across twelve
games:

| what happened when two enemies stood next to each other | share |
|---|---|
| the attacker's arc covered that edge and the attack **landed** | 14% |
| the arc covered it but the **defence held** | 56% |
| out of arc, though turning would have fixed it | 12% |
| out of arc and hopeless | 19% |

`damage = attack > defence` is strict and binary, and most troops have
2-3 defence on the front against 1-3 attack, so a frontal assault is
almost always wasted. The opponent worked this out and stopped attacking:
only 8% of everything it did was an attack, against 27% deploying and 10%
capturing. It wins on fortresses and points instead. That may be exactly
right -- flanking is meant to be the game -- but a player who walks up and
swings four times for nothing will conclude the combat is broken rather
than that they are doing it wrong. Options, if it wants changing: let ties
go to the attacker; give a blocked attack some consolation (a push, a
forced turn); or lower the defence numbers.

**One preset deck is much stronger than the others.** Sixty games, each
pairing played five times from both sides, alternating battlefields:

| deck | games won |
|---|---|
| The Barcids | 22/30 (73%) |
| The Horde | 15/30 (50%) |
| The Dynasty | 12/30 (40%) |
| The Legion | 11/30 (37%) |

Five games per cell is thin, so treat 50 and 40 as the same number -- but
73 against 37 is not noise. Hannibal ignoring terrain is worth more than
anything the Legion has.

**Three cards are never worth playing.** In 24 games the opponent never
once played Sun Tzu, Herodotus or Marcus Agrippa. Sun Tzu and Herodotus
have the same effect -- look at the hand, draw a card -- for 3 Command and
2, so Sun Tzu is strictly worse than Herodotus and neither is worth the
Command. Agrippa only clears Hidden, so it correctly sits idle when
nothing is hidden; that one is a counter-card doing its job.

Three more cards were never played until the evaluation learned to see
them, which is worth recording as a method note: Pheidippides grants an
Action, and Mesmerised stops a card moving, and both leave the board
looking identical. An opponent that scores only what it can point at will
never buy tempo or denial. Once *surplus Actions* and *a shackled card is
worth less* were added, Pheidippides went from never played to one of the
most played cards in the set. The lesson generalises: a card that is
invisible to the evaluation is not a weak card, and the two must not be
confused.

Games run 10 to 15 rounds. Against the brief's 5-8 minutes that is
comfortable at machine speed and the thing to watch when people play.

## Deviations from the Build Brief

The brief's §40 asks that its core rules not be changed quietly, so the
one change made since is recorded here.

**Fortresses are no longer forward deployment points** (§8 and §17 allowed
deploying beside a fortress you control; §40 listed it as intentional).
Deployment is now the home row or a square beside a living Commander.

The reason is that fortress deployment made a captured fortress
self-reinforcing: take it once and you could feed cards into it from
nowhere, so holding ground cost nothing after the first turn. Without it,
reinforcing the far side of the board means either marching there or
pushing a Commander forward — and a Commander forward is a Commander that
can be killed, which is the game's other losing condition. In 200 random
playouts, battles decided by Commander elimination rose from 35 to 45 out
of 200 after the change, which is the pressure working as intended.

The zones are data (`rules.deployFrom`), so putting it back is one word,
and a single battlefield can opt into it without affecting the rest.
