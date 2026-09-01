# History CCG — repo layout and publishing

Working title in the app: **Codex Antiquus**.
GitHub-ready files live in `Desktop\History CCG`.

## Files

| Path | Purpose |
| --- | --- |
| `index.html` | Shell — loads every module in a fixed order |
| `css/styles.css` | Design tokens and component styles |
| `js/constants.js` | Tiers, stats, source keys, Worlds, Sets |
| `js/data/chapters-rome.js` | Roman Republic — 21 chapters |
| `js/data/chapters-carthage.js` | Carthage — 9 chapters |
| `js/data/chapters-egypt.js` | Ptolemaic Egypt — 8 chapters |
| `js/data/chapters-greece.js` | Ancient Greece — 10 chapters |
| `js/data/wars.js` | War entries: battles, tactics, tactical lineage |
| `js/data/characters.js` | 21 cards |
| `js/data/characters-extra.js` | 7 more from the Carthage/Egypt/Wars syllabi |
| `js/data/characters-greece.js` | 8 more from the Greece syllabus |
| `js/data/atlas.js` | Regions, eras, Set geography and date ranges |
| `js/engine.js` | Save, unlock rules, war gating, progress metrics |
| `js/icons.js` | Inline SVG icons (no icon library) |
| `js/ui.js` | Shared components, card modal, chapter reader |
| `js/screens.js` | Home, World, Set, Collection |
| `js/screens-new.js` | Wars, Atlas, Progress |
| `js/app.js` | Root state machine and routing |
| `tools/validate.js` | Data integrity check + simulated playthrough — run after any content edit |
| `tools/fetch-vendor.ps1` / `.sh` | One-time download of React, ReactDOM and Babel into `vendor/` |
| `tools/tailwind.config.js`, `tools/tailwind-input.css` | Inputs for the static Tailwind build |
| `vendor/tailwind.css` | Tailwind 3.4 compiled against this repo |
| `vendor/*.js` | React 18.2.0, ReactDOM 18.2.0, Babel Standalone 7.23.5 |
| `build.py` | Bundles everything into one double-clickable file |
| `docs/DECISIONS.md` | Architecture decisions and known gaps |
| `docs/HANDOFF.md` | Read first when picking the project up fresh |
| `.nojekyll`, `.gitignore`, `LICENSE`, `README.md` | Repo plumbing (MIT) |

**Load order in `index.html` matters.** Data files populate `CHAPTERS` and
`CHARACTERS`; `engine.js` builds indexes from them; the UI reads those indexes.
A new data file needs its `<script>` tag added *before* `engine.js`, and it must
carry `type="text/babel" data-presets="react"` like every other module — a plain
`<script>` executes ahead of all the Babel-transformed ones and breaks the order.

## Running it

Browsers block sibling script loading over `file://`, so the multi-file version
needs a server:

```
cd "History CCG"
python3 -m http.server 8000     → http://localhost:8000
```

For a double-clickable version: `python3 build.py` → `dist/codex-antiquus.html`.
Re-run it after content edits; `dist/` is gitignored.

## Publishing

Published at **https://trileodan.github.io/codex-antiquus/** from
**https://github.com/Trileodan/codex-antiquus**, `main` branch, `/ (root)`,
Deploy from a branch. Push to `main` to update it.

No service worker any more, so no cache version to bump. Tailwind is a
committed static stylesheet. React, ReactDOM and Babel come from `vendor/` if
present and fall back to cdnjs if not, so the deployed site works either way —
run `tools/fetch-vendor.ps1` and commit the result if you want it to work with
no connection at all. Google Fonts is the one remaining network dependency.

## Content model

**Chapters** are one 5–10 minute sitting: `beats[]` (title, text, one key
point), then `check[]` (2–4 questions, two-thirds to pass). Marked complete only
when the checkpoint is passed.

**Cards** mint when *every* chapter in `requires[tier]` is complete. Most need
two or more; higher tiers usually need a different Set. 14 of the 38 study
chapters mint nothing, deliberately. `goldName` renames a card at Gold
(Octavian → Augustus, Scipio → Scipio Africanus). `mythic: true` flags legendary
figures rather than blending them into the record.

**Wars** are chapters with `kind: "war"`, so the reader, bookmarks, checkpoints
and minting all work unchanged. `gate[]` names one chapter per side; a war stays
sealed until both sides have been studied up to its start year. Battles appear
only in war entries. Battle beats add `name`/`year`/`place`/`forces`, plus
`tactics` and `lineage[]` — later commanders who reused the idea, each flagged
`cited: true/false` for whether they demonstrably named the source.

**Claims** carry one of six classifications: Established, Probable, Contested,
Interpretation, Traditional / Legendary, Unknown. Source keys must exist in
`SOURCES`.

**Progress** is localStorage only, under `codex-antiquus-save-v3`. Chapter IDs
are the save schema — bump the key in `engine.js` when restructuring content.
Bookmarks store a chapter + beat index; lifting one recaps the last three key
points learned.

## Current state

52 chapters (48 study + 4 wars), 191 parts, 135 questions, 36 cards, 177 sourced
claims, ~31,000 words, ~7 hours of reading. Four Sets written; eleven more
mapped on the Atlas as *Planned* with real date ranges.

Adding a set = a new `chapters-*.js` file, its `<script>` tag in `index.html`
before `engine.js`, a `SETS` entry, a `SET_ATLAS` entry, and spans in
`CHAPTER_SPANS`. No UI changes needed. `node tools/validate.js` checks all five.
