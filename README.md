# Codex Antiquus

[![validate](https://github.com/Trileodan/codex-antiquus/actions/workflows/validate.yml/badge.svg)](https://github.com/Trileodan/codex-antiquus/actions/workflows/validate.yml)

A history-learning and collectible-card web app. You work through the ancient
world in short chapters; character cards are minted from what you finish and
can demonstrate, not from names you skim past.

Currently built: **the Roman Republic, Carthage, Ptolemaic Egypt** and four
**wars**, with 28 character cards. Roughly 25,000 words of source-classified
content.

---

## Running it

**Do not double-click `index.html`.** It will show you a page explaining why,
but the short version is that it loads its JavaScript from fourteen separate
files, and Babel fetches those over XHR — which browsers block on `file://`.
There are two ways in.

### Just read it

Double-click **`dist/codex-antiquus.html`**. Everything is inlined into that one
file, so it opens straight from disk with no server. Re-run `python3 build.py`
after any content change to refresh it. `dist/` is gitignored.

### Edit and reload

Serve the folder, so `index.html` works and you get real files to edit:

**Windows:** double-click **`serve.bat`**. It finds Python or Node, starts a
server and opens the browser.

**Anything else:**

```bash
cd "History CCG"
python3 -m http.server 8000
# then open http://localhost:8000
```

Any static server works — `npx serve`, `php -S localhost:8000`, VS Code's Live
Server extension.

The app is plain React with in-browser Babel, so there is **no build step and
no dependencies to install** — change a `.js` file and reload.

---

## Vendored libraries

`vendor/` holds the third-party code, so the app does not depend on a CDN
being reachable.

| File | What it is | Status |
| --- | --- | --- |
| `vendor/tailwind.css` | Tailwind 3.4 compiled against this app's markup | **present** |
| `vendor/react.production.min.js` | React 18.2.0 UMD | fetch it |
| `vendor/react-dom.production.min.js` | ReactDOM 18.2.0 UMD | fetch it |
| `vendor/babel.min.js` | Babel Standalone 7.23.5 | fetch it |

Tailwind is committed because it is generated from this repo — 17 KB of real
CSS instead of the 120 KB runtime script that used to build it in the browser
on every page load, and no more *"cdn.tailwindcss.com should not be used in
production"* in the console. Rebuild it if you add utility classes the current
sheet does not cover:

```bash
npx tailwindcss@3 -c tools/tailwind.config.js -i tools/tailwind-input.css -o vendor/tailwind.css --minify
```

The other three are not committed. Fetch them once:

```powershell
powershell -ExecutionPolicy Bypass -File tools\fetch-vendor.ps1
```

```bash
tools/fetch-vendor.sh
```

Until you do, `index.html` falls back to cdnjs for them and the app still
works — it just needs a connection. Web fonts always come from Google Fonts;
they are the one remaining network dependency.

---

## Live site

**https://trileodan.github.io/codex-antiquus/**

Repository: **https://github.com/Trileodan/codex-antiquus**

GitHub Pages serves `index.html` — the multi-file version — from `main` at the
repository root. Pages needs no build step because there isn't one: the browser
loads the modules and transforms the JSX itself.

To publish a change: commit and push to `main`. The site rebuilds in a minute
or two. `.nojekyll` stops GitHub's Jekyll processor from ignoring the `js/`
directory.

Two things that work locally and break on Pages, worth remembering when adding
files:

- **Pages is case-sensitive, Windows is not.** A `<script src="js/Screens.js">`
  against a file named `screens.js` works on your machine and 404s live.
- **Paths must stay relative.** The site is served from `/codex-antiquus/`, so
  a leading slash resolves to the wrong place.

---

## Project structure

```
History CCG/
├── index.html                    Shell — loads everything in order
├── build.py                      Bundles into a single double-clickable file
├── serve.bat                     Windows: serve the folder and open a browser
├── css/styles.css                Design tokens and component styles
├── vendor/                       Third-party code (see above)
├── tools/
│   ├── validate.js               Data integrity check + simulated playthrough
│   ├── fetch-vendor.ps1|.sh      One-time download of React, ReactDOM, Babel
│   ├── tailwind.config.js        Content globs for the Tailwind build
│   └── tailwind-input.css        @tailwind directives for that build
├── docs/
│   ├── HANDOFF.md                Read first when picking this up fresh
│   ├── DECISIONS.md              Architecture decisions and known gaps
│   └── repo-and-publishing.md    File-by-file map and deployment notes
└── js/
    ├── constants.js              Tiers, stats, sources, Worlds, Sets
    ├── data/
    │   ├── chapters-rome.js      Roman Republic, 21 chapters
    │   ├── chapters-carthage.js  Carthage, 9 chapters
    │   ├── chapters-egypt.js     Ptolemaic Egypt, 8 chapters
    │   ├── wars.js               War entries, battles, tactics, lineage
    │   ├── characters.js         21 cards
    │   ├── characters-extra.js   7 more from the new syllabi
    │   └── atlas.js              Regions, eras, Set geography and periods
    ├── engine.js                 Save, unlock rules, war gating, metrics
    ├── icons.js                  Inline SVG icon set (no icon dependency)
    ├── ui.js                     Shared components, card modal, chapter reader
    ├── screens.js                Home, World, Set, Collection
    ├── screens-new.js            Wars, Atlas, Progress
    └── app.js                    Root state machine and routing
```

**Load order in `index.html` matters.** Data files populate `CHAPTERS` and
`CHARACTERS`; `engine.js` builds indexes from them; the UI reads those indexes.
If you add a data file, add its `<script>` tag before `engine.js` — and keep
`type="text/babel" data-presets="react"` on it, because a plain `<script>`
would run ahead of every Babel-transformed one and break the order.

---

## How progression works

- **Chapters** are one 5–10 minute sitting: 3–7 parts, each ending in a key
  point, then a checkpoint quiz. You need two-thirds to pass.
- **Cards** mint only when *every* chapter a tier requires is complete. Most
  need two or more, and higher tiers usually need a different Set. Fourteen of
  the 38 study chapters mint nothing at all — deliberately.
- **Wars** live in their own tab and stay sealed until **both sides** have been
  studied up to the year the war began. Battles appear only in war entries.
- **Bookmarks** save your position mid-chapter. Lifting one shows the last
  three key points you learned before you stopped. Leaving a chapter part-way
  bookmarks automatically.
- **Progress** is shown as coverage — which centuries and which regions you
  have actually been through — rather than as a path or a streak.

Progress is stored in `localStorage` under `codex-antiquus-save-v3`. Changing
chapter IDs invalidates old saves, so bump the version in `engine.js` when you
restructure content.

---

## Adding content

### A new chapter

Add an object to the relevant `js/data/chapters-*.js` file:

```js
{
  id: "unique-id", set: "roman-republic", act: "Section heading",
  title: "Chapter Title", era: "133 – 121 BC", minutes: 8,
  intro: "One line framing the chapter.",
  beats: [
    { title: "Part title",
      text: ["Paragraph. Use **bold** for key names and *italics* for Latin terms."],
      key: "The one thing to remember from this part." },
  ],
  check: [
    { q: "Question?", options: ["A", "B", "C", "D"], correct: 1,
      explain: "Why that answer is right." },
  ],
  unlocksSets: ["carthage"],   // optional
}
```

Then add a time span for it in `CHAPTER_SPANS` in `js/engine.js` so it counts
toward coverage on the Progress screen.

### A new card

Add to `CHARACTERS` in `js/data/characters.js`:

```js
"slug": {
  id: "slug", name: "Name", years: "100 – 44 BC", sets: ["roman-republic"],
  goldName: "Name After Promotion",       // optional, used at Gold
  mythic: true,                           // optional, flags legendary figures
  requires: { bronze: ["chapter-a", "chapter-b"], silver: ["chapter-c"] },
  tiers: { bronze: { label: "...", when: "62 BC", blurb: "...",
    stats: { power: 34, intellect: 82, influence: 48, creativity: 70, wealth: 12, fame: 30 } } },
  claims: [{ text: "...", classification: "Established", sources: ["plutarch"], date: "62 BC", at: "bronze" }],
  connections: [{ charId: "caesar", relation: "opposed" }, { name: "Rome", type: "place" }],
}
```

Every tier listed in `tiers` needs a matching entry in `requires`, and vice
versa. Stats run 1–100 and should use the full range: don't inflate them
because someone is famous.

### A new war

Add to `js/data/wars.js` with `kind: "war"`, a `sides` array, and a `gate`
array naming the chapter in each side's syllabus that reaches the war's start
date. Battle beats take four extra fields: `name`, `year`, `place`, `forces`,
plus `tactics` and a `lineage` array of later commanders who used the same
idea, each flagged `cited: true/false` for whether they demonstrably named it.

### A new Set or World

Add to `SETS` in `js/constants.js`, then give it a region and period in
`SET_ATLAS` in `js/data/atlas.js` so it appears on the Atlas. Sets with no
chapters render as *Planned* rather than being hidden.

---

## Checking your edits

```bash
node tools/validate.js
```

It loads the data layer the way `index.html` does, then checks it:

- every card requirement names a real chapter, in a Set something unlocks
- every tier has matching `requires`, and tiers do not skip a rank
- every claim carries one of the six classifications and a source key in `SOURCES`
- every stat is present and inside 1–100
- every checkpoint's `correct` index is inside its `options`
- every chapter has a `CHAPTER_SPANS` entry, or it silently misses the Progress screen
- every war is gated on at least two different Sets
- every Set has Atlas geography and a real region

Then it runs a **simulated playthrough** through the real engine functions —
starting from a blank save, studying everything open, and repeating until
nothing further unlocks. That is what catches content no player can reach:

```
Playthrough — 3 unlock passes, all 42 chapters reachable, 28 cards minted (14 bronze, 9 silver, 5 gold)
```

Run it after any content change. It takes under a second and exits non-zero on
any error.

It also runs automatically on every push, via `.github/workflows/validate.yml`
— which additionally checks that every path `index.html` references exists with
exactly the right capitalisation (the runner is Linux, like Pages; Windows is
not), that no path is absolute, that `.nojekyll` is present, and that
`build.py` still assembles. Those are the four ways this site can break on
Pages while working perfectly on your machine.

---

## Content rules

These are enforced by convention, not by code, and they matter more than the
code does:

- Never present legend, tradition or disputed claims as established fact. Every
  claim carries one of six classifications: Established, Probable, Contested,
  Interpretation, Traditional / Legendary, Unknown.
- Never fabricate a citation.
- Where scholars disagree, say so and say why.
- Card stats are a game representation derived from evidence, never evidence of
  historical importance.
- Flag hostile sources. Almost everything surviving about Carthage was written
  by Rome, and the app says so repeatedly.

---

## Licence

Code is MIT (see `LICENSE`). Historical content is original prose written for
this project.
