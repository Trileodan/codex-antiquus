# Decisions and known gaps

A record of the choices that have long-term consequences, and an honest list of
what the brief asks for that is not built yet.

---

## Architecture

### No build step
React and Babel load as UMD globals and JSX is transformed in the browser. This
keeps the barrier to editing content at zero — you change a `.js` file and
reload. The cost is first paint: Babel transforms ~3,000 lines on every load.

**When to revisit:** if the app goes beyond prototype, or if content volume
makes in-browser transformation noticeably slow. The migration is Vite plus
`npm create vite@latest`, and the data files port unchanged because they are
plain objects.

### Multi-file source, single-file build
The repo is split into modules because a 340 KB single file is unpleasant to
edit and produces unreadable diffs. But browsers block `file://` script loading
across files, so `build.py` produces a bundled version for double-clicking.
Both are supported deliberately.

### Wars are chapters
A war entry is a chapter with `kind: "war"` and extra fields, not a separate
type. This means the reader, the checkpoint, the bookmark system, the mint
logic and the progress metrics all work on wars without modification. Battle
beats are ordinary beats with `name`, `year`, `place`, `forces`, `tactics` and
`lineage` attached.

**Consequence:** cards can require war chapters. Scipio's Gold needs the Second
Punic War entry; Agrippa exists only through Actium.

### localStorage, versioned
Progress is saved under `codex-antiquus-save-v3`. Chapter IDs are the save
schema, so restructuring content invalidates saves. Bump the key rather than
attempting migration until there are real users to migrate.

### No accounts, no backend
Everything is client-side. Progress is per-browser and does not sync. A real
product needs accounts; that is a backend decision, not a content one, and it
can wait.

---

## Content rules that shaped the structure

### Wars are gated on both sides
From the brief: you cannot open the First Punic War until you have studied Rome
*and* Carthage up to 264 BC. This is implemented as `gate`, an array naming one
chapter per side.

This rule is applied without exception, including where it is inconvenient. The
Syrian Wars, the Wars of the Diadochi and the Greco-Persian Wars are all
specified in `PENDING_WARS` and all sealed, because the Seleucid, Macedonian,
Archaic Greek and Persian Sets do not exist. They appear on the Wars screen with
the reason stated. Showing a locked entry with an honest explanation is better
than hiding the shape of the product.

### Battles live only in war entries
The Carthage and Rome syllabi now brief the Punic Wars and hand off. Cannae's
double envelopment, the corvus, Xanthippus at Tunis and Scipio's elephant lanes
are described once, in the war entry, not duplicated in two societies' chapters.

### Tactical lineage is flagged for citation
Each battle's `lineage` array names later commanders who used the same idea,
with `cited: true` only where the commander demonstrably named the source.
Schlieffen wrote a book called *Cannae* and said so; that is `cited: true`.
Scipio almost certainly learned envelopment at Cannae but no ancient source
records him saying it, so that is `cited: false` with the reasoning in the note.
The distinction between "influenced by" and "said he was influenced by" is
exactly the sort of thing the app should not blur.

### Six classifications, no exceptions
Established, Probable, Contested, Interpretation, Traditional / Legendary,
Unknown. Applied to Romulus, to the Tophet urns, to Cleopatra's asp, to the
salting of Carthage (a modern invention, flagged as such), and to the end date
of the Republic (Interpretation, because it is a definitional argument).

---

## Progression without a path

The brief asked for game-like progression but explicitly not a Duolingo-style
path. The Progress screen reports **coverage** instead of position:

- centuries covered, as a strip from 900 BC to AD 100
- region coverage bars across seven world regions
- cards by tier, wars unlocked versus studied
- a count of key points learned, and the most recent six

There is no streak, no daily target and no score. The intent is that opening it
tells you where you have actually been rather than how obedient you have been.

---

## Known gaps

### The globe is a flat map
The brief asks for a spinnable globe. The Atlas screen implements the same
navigation model — pick a region, scrub time from 3000 BC to 2026, see what
covers that moment — with an abstract SVG region map instead of a 3D globe.
A real globe is `three.js` plus geographic boundary data, which is a
presentation layer over exactly this data model. Worth doing, not urgent.

### Only three Sets have content
The Atlas maps sixteen Sets across seven regions and ten eras. Three are
written. The other thirteen — Ancient Egypt, Persia, Archaic and Classical
Greece, the Hellenistic world, the Roman Empire, Ancient Britain, Mesopotamia,
the Indus Valley, Ancient India, Ancient China, Mesoamerica — appear as
*Planned* with their real date ranges, so the Atlas shows the intended shape of
the product without faking availability.

### The time slider runs past the content
It goes to 2026 as specified. Everything after 27 BC returns "nothing covers
this moment yet," which is honest but not satisfying. It stays because the
navigation model needs to be right before it is populated.

### No spaced repetition
Chapters can be re-read but a completed chapter mints nothing new. Genuine
long-term retention needs review scheduling — surfacing key points from
chapters finished weeks ago. The `recentKeys` array and `keyCount` in the save
file are the beginnings of the data this would need.

### Content pipeline is manual
The original spec described a Researcher / Sceptic / Adjudicator / Educational
Editor pipeline. All content here was written by hand to those standards, and
the data structures match what such a pipeline would emit — claims carry
classification, sources and dates. Automating it is a separate project.

### Vendoring is half done
`vendor/tailwind.css` is committed: Tailwind 3.4 compiled against this repo's
markup. That replaced `cdn.tailwindcss.com`, which shipped a 120 KB script that
regenerated the same CSS in the browser on every load and printed a production
warning to the console. The static sheet is 17 KB and covers all 99 utility
classes the app uses; `tools/tailwind.config.js` rebuilds it.

React, ReactDOM and Babel are **not** committed. `tools/fetch-vendor.ps1` (and
`.sh`) downloads them into `vendor/` in one step, and until someone runs it
`index.html` falls back to cdnjs:

```html
<script src="vendor/react.production.min.js"></script>
<script>window.React || document.write('<script src="https://cdnjs...">\x3C/script>');</script>
```

So a fresh clone runs immediately with a connection, and becomes offline-capable
the moment the fetch script is run — no state where the app is broken. `build.py`
follows the same rule: it inlines whatever is in `vendor/` and leaves a CDN tag
for whatever is not, and says which at the end of the run.

They are not committed because the repo should not carry 3 MB of minified
third-party JavaScript that a one-line script can fetch.

**Before deploying, commit them anyway.** GitHub Pages serves the repo as-is —
there is no build step to run the fetch script — so an empty `vendor/` means
every visitor's browser requests three files that 404 and then falls back to
cdnjs. It works, but it puts three errors in the console of a public site and
makes the page depend on a third party staying up. Run `tools/fetch-vendor.ps1`
before the first push; `.gitignore` does not exclude them, so they go in with
the next commit.

**Remaining network dependency:** the Google Fonts stylesheet for Cinzel,
Crimson Pro and Space Mono. Vendoring those means committing woff2 files and
writing the `@font-face` rules by hand; the fallbacks in `css/styles.css` are
serif and monospace, so the app degrades legibly without them.

### Stylesheet order is deliberate
`css/styles.css` is linked *before* `vendor/tailwind.css`. The Tailwind play CDN
used to inject its stylesheet at runtime, which put it last in the cascade and
let utilities win ties against the `.hcg-*` component classes. Keeping that
order preserves the rendering the app was built against. Reversing it is safe
in principle and would change nothing visible today, but it is not worth
finding out during a content change.

### Validation covers data and rules, not UI
`node tools/validate.js` loads the data layer inside a `vm` context with a React
stub, then checks structure — chapter references, tier/`requires` symmetry,
source keys, classifications, stat ranges, answer indices, war gating, Atlas
geography, `CHAPTER_SPANS` coverage.

It then runs a **simulated playthrough** against the real `computeCards`,
`unlockedSets`, `warGate`, `setProgress` and `buildProgress` — blank save,
study everything open, repeat until nothing further unlocks. It asserts that no
card mints for free, that every chapter is reachable, that every card reaches
its top tier, that every war opens, and that `buildProgress` survives both the
empty and the completed save. Today: 3 unlock passes, 42/42 chapters, 28 cards
(14 bronze, 9 silver, 5 gold).

Testing the rules by running them beats re-deriving them in the validator,
which would just be a second implementation to keep in sync.

It still does not test the interface — no component tests, no end-to-end run.
The JSX modules are checked only for compilation. Run the validator before
every commit that touches content; it exits non-zero, so it drops into CI or a
pre-commit hook unchanged.

### The source tree was reconstructed from the bundle
For a while the folder held only `dist`-style output — one 348 KB
`codex-antiquus.html` — because the sessions that wrote it could only hand back
downloads. The tree was split back out of that file using the
`/* ==== js/x.js ==== */` markers `build.py` had left behind, and the result
was checked to be byte-identical to the bundle it came from. The previous
bundle is kept at `dist/codex-antiquus-previous-bundle.html` (gitignored) if a
comparison is ever needed.
