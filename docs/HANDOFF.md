# Handoff — start here in a new conversation

You are picking up an in-progress project. Read this, then `README.md`, then
`docs/DECISIONS.md` before changing anything.

---

## What this is

**Codex Antiquus** — a history-learning and collectible-card web app. You work
through the ancient world in short chapters; character cards are minted from
what you finish and can demonstrate, not from names you skim past.

Two specification documents drove the build. If they aren't attached to the new
conversation, re-upload them:

- `History_Card_Game_Full_Claude_Build_Spec.pdf` — the original product spec
- `History_App_Prompt.docx` — the second brief that added wars, the expanded
  Carthage and Egypt syllabi, and the Atlas

Both said to work independently and not stop for minor decisions. That still
applies.

---

## Where it stands

| | |
| --- | --- |
| Chapters | 42 — 38 study, 4 wars |
| Parts (beats) | 161 |
| Checkpoint questions | 105 |
| Character cards | 28 |
| Sourced claims | 139 |
| Words of content | ~25,000 |
| Reading time | ~5.5 hours |

**Sets written:** Roman Republic (21 chapters), Carthage (9), Ptolemaic Egypt (8).
**Wars written:** First, Second and Third Punic Wars, and Actium.
**Sets mapped but not written:** thirteen more, visible on the Atlas as *Planned*
with real date ranges — Ancient Egypt, Persia, Archaic and Classical Greece,
the Hellenistic world, the Roman Empire, Ancient Britain, Mesopotamia, the
Indus Valley, Ancient India, Ancient China, Mesoamerica.

Everything validates: `node tools/validate.js` passes, and its simulated
playthrough reaches all 42 chapters and mints all 28 cards in 3 unlock passes.

---

## Design rules that are not obvious from the code

These came out of conversation and would be easy to break by accident.

**Cards are expensive on purpose.** They mint only when *every* chapter in
`requires[tier]` is complete. Most need two or more chapters; higher tiers
usually need a different Set entirely. Fourteen of the 38 study chapters mint
nothing at all. The brief was explicit: *"I don't want to be unlocking a new
card every entry."* Don't make unlocking more generous without being asked.

**Wars are gated on both sides, without exception.** A war opens only when both
societies have been studied up to the year it began. This seals content that is
already written — the Syrian Wars, the Diadochi wars and the Greco-Persian Wars
all sit locked in `PENDING_WARS` because the Seleucid, Macedonian, Greek and
Persian Sets don't exist. That is the rule working, not a bug. Don't "fix" it.

**Battles live only in war entries.** The Rome and Carthage chapters brief each
war and hand off. Cannae's double envelopment, the corvus, Xanthippus at Tunis
and Scipio's elephant lanes are each described once.

**Tactical lineage distinguishes influence from acknowledgement.** Every battle
carries a `lineage[]` of later commanders who reused the idea, flagged
`cited: true` only where they demonstrably named the source. Schlieffen wrote a
book called *Cannae* — `cited: true`. Scipio almost certainly learned
envelopment at Cannae but no ancient source records him saying so —
`cited: false`, with the reasoning in the note.

**Myth is tagged, never blended.** Romulus and Remus share one card flagged
`mythic: true`. So does Queen Elissa/Dido. Their claims are classified
Traditional / Legendary. Mark flagged that mixing mythology into history felt
wrong and may want these reworked later.

**Six classifications, applied honestly.** Established, Probable, Contested,
Interpretation, Traditional / Legendary, Unknown. Used on the Tophet urns,
Cleopatra's asp, the salting of Carthage (a modern invention, flagged as such)
and the end date of the Republic (Interpretation — a definitional argument).

**Hostile sources are flagged.** Almost everything surviving about Carthage was
written by Rome, and the app says so repeatedly rather than once.

**Progress is coverage, not a path.** Centuries covered, region coverage, cards
by tier. No streak, no daily target, no score. Mark specifically didn't want a
Duolingo-style track.

**Gold renames some cards.** Octavian becomes Augustus; Scipio becomes Scipio
Africanus. Handled by `goldName`.

---

## Open questions Mark hasn't answered

1. **Alexander's card.** He currently unlocks at Bronze through Egypt alone,
   with a note saying a fuller card arrives with the Macedon and Persia Sets.
   This is a pattern decision that will repeat for every figure spanning
   multiple Sets — it may be better to keep such figures locked until their own
   Set exists. Not yet decided.
2. **Romulus and Remus.** Mark said the shared mythic card felt strange and
   *"I may change it into something else in future."*
3. **Whether the Atlas should become a real globe.** See below.

---

## Next steps, roughly in order of value

0. **Finish the vendoring — one command.** Tailwind is done: `vendor/tailwind.css`
   is a real 17 KB stylesheet compiled from this repo, replacing the runtime CDN
   script and its production warning. React, ReactDOM and Babel still need
   fetching once:

   ```powershell
   powershell -ExecutionPolicy Bypass -File tools\fetch-vendor.ps1
   ```

   Until then `index.html` falls back to cdnjs and the app works normally, it
   just needs a connection. See *Vendoring is half done* in `DECISIONS.md`.
1. **Write more Sets.** Ancient Greece already unlocks from the Rome syllabus
   but has no chapters — it currently reads "Discovered — chapters in
   development," which is honest but unsatisfying. Ancient Egypt and Persia
   would each unlock a sealed war.
2. **The globe.** The brief asked for a spinnable globe you pick a region from.
   The Atlas implements exactly that navigation model — region, then a time
   slider from 3000 BC to 2026 — using a flat SVG region map. A real globe is
   `three.js` plus boundary data sitting on top of the same data model.
3. **Spaced repetition.** Chapters can be re-read but mint nothing new. Genuine
   retention needs review scheduling that resurfaces key points from chapters
   finished weeks ago. `recentKeys` and `keyCount` in the save file are the
   beginning of the data this needs.
4. **Migrate off in-browser Babel** if content volume makes transformation slow.
   Vite; the data files port unchanged because they're plain objects.

---

## Working conventions

- Give directional specs and let Claude execute without pausing for minor
  decisions. That's how the previous sessions ran and it worked.
- Run `node tools/validate.js` after any content change. It catches broken
  chapter references, unreachable cards, bad source keys and out-of-range
  answer indices in under a second — and then simulates a full playthrough
  through the real engine functions to prove nothing is stranded.
- Re-run `python3 build.py` after content changes if you use the single-file
  version. `dist/` is gitignored.
- Bump `SAVE_KEY` in `js/engine.js` when restructuring chapter IDs — they are
  the save schema, and old saves will break silently otherwise.

---

## Setting up the new session

Use **Claude Cowork** in the Claude Desktop app — "Work in a project or folder"
in the prompt bar, then pick your `History CCG` folder — or
**Claude Code**, where you `cd` into the folder. Both edit the files in place.
Claude Code also handles git commits and pushes.

Point the new session at this file, `README.md` and `docs/DECISIONS.md` before
asking for changes.

**A warning learned the hard way.** For a while this folder contained only the
bundled `codex-antiquus.html` and the docs — the source tree the docs described
did not exist, because the sessions that wrote it ran in the web chat and could
only hand back downloads. It was recoverable only because `build.py` leaves
`/* ==== js/x.js ==== */` markers in the bundle. Keep the tree itself under
version control; a bundle is an output, not a backup.
