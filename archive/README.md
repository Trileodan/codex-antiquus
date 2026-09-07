# Archive — things taken out of the app, kept intact

Nothing in here is deleted. Each folder is a complete, working feature
that was removed from the live app for a reason, with the reason and the
way back written down.

## battle/ — Field of Battle

A deterministic tactical card battle for two players or against an
opponent the app plays itself, built to the Tactical Battle Game Build
Brief. Complete, tested and working when it was archived: 125 tests
passing, an AI with three difficulty levels, a deck builder that read the
collection, and a mounted Battle tab inside the learning app.

**Why it was taken out.** The app is a history learning tool, and the
game had become the larger half of it. Coins now record how well you
know a subject rather than what the subject could do in a fight, and a
battle system needs statistics that the coins no longer carry.

**What it cost to remove.** Almost nothing was thrown away. The battle
module never had dependencies pointing into it — the learning app did not
know it existed, and the seam ran the other way through
`battle/js/data/collection.js`. Removing it was three script tags, a nav
entry and a screen branch.

**How to bring it back.**

1. `git mv archive/battle battle` and `git mv archive/play-battle.bat .`
2. In `index.html`, restore the stylesheet link and the eleven module
   script tags — they must come *before* `js/app.js`. The commit that
   removed them is the reference; `git log --diff-filter=D` will find it.
3. In `js/app.js`, restore the `battle` entry in `NAV` and the screen
   branch that renders `<BattleApp />`.
4. Battle cards need per-card statistics. They lived on the battle cards
   themselves (`battle/js/data/cards.js` and `cards-collection.js`), not
   on the learning app's characters, so they are still here and still
   correct. What is gone is the six invented attribute scores that used to
   sit on the learning app's cards, and the battle module never read those.
5. `python3 build.py` bundles `battle/index.html` again if you restore the
   line in `build.py`.

`battle/README.md` has the architecture, the design decisions and the
three balance findings the AI turned up by playing the game against
itself — including that 56% of adjacent attacks bounce off the defence.
Read that before changing any numbers.
