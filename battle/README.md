# Field of Battle

A deterministic tactical card battle, built to the Tactical Battle Game
Build Brief. It lives here as a self-contained module: it reads nothing
from the learning app at runtime and the learning app does not know it
exists, so it can be developed and broken without risk to the 63 chapters
next door.

## Launching it

**The simple way, no server needed:** double-click
**`dist/field-of-battle.html`**. `build.py` inlines the CSS, the vendored
libraries and every module into that one file, so it opens straight from
disk like any web page. Re-run `python3 build.py` after changing anything.

**The developer way:** double-click **`play-battle.bat`** in the project
root. It starts a local server and opens the game, so edits show up on
refresh without rebuilding. Leave the black console window open while you
play — closing it stops the server.

`serve.bat` still opens the learning app; it now takes an optional path,
and `play-battle.bat` is a one-line wrapper that calls it with `battle/`.
Either way the address is `http://localhost:8000/battle/`.

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
(`../vendor/`), the favicon and the no-build architecture. What it does
not share is a page. Mounting it into the main app later means adding its
script tags to a route that only loads when a player opens the battle
screen, and rendering `<BattleApp />` instead of calling `createRoot` at
the bottom of `js/ui/app.js`. Nothing else has to change.

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

*A battlefield* — add an entry to `BATTLEFIELDS`.

*A status* — add an entry to `STATUSES`. Modifiers and restrictions are
applied by `effectiveStats`, so nothing else needs touching.

*A new kind of effect* — add one function to `EFFECTS` in `rules.js`.
That is the only place the engine should ever need to grow.

## What is implemented

Phases 1–5 of the brief, and most of Phase 6. Grid, Commander placement,
orthogonal movement with terrain costs, facing, directional attack and
defence, deterministic combat, Lives, two Actions with one Move, turns and
rounds, fortresses with persistent ownership and VP, Command generation and
cap, deployment from home row / beside a Commander / beside a controlled
fortress, deployment sickness, draw-discard-recycle, abilities with
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
