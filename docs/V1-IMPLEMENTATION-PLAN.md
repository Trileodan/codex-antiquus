# Codex Antiquus — V1 implementation plan

Status: initial read-only code audit completed 2026-10-15. This document lives only on `develop/codex-v1`; `main` is not changed.

## Product principles (agreed)
- Primarily a personal history-learning app, with a path to public use later.
- Three independent reading pathways: Empires, Campaigns, People. No prerequisite locks forcing a different pathway.
- Mobile-first narrative slides; Atlas has responsive full-screen controls.
- One subject medal, not one per lesson. Curated unique knowledge sections count once across paths.
- Bronze, Silver, Gold require both coverage and demonstrated mastery; Diamond requires successful delayed recall at least seven days later.
- One Year Drop completion per day maintains a streak; maximum five daily; only studied knowledge.
- GitHub publishing through a draft/preview/review workflow.
- Existing app should evolve, not be replaced wholesale.
- Personal cloud synchronization desired, but direct ChatGPT-to-backend writing is unverified and must not be promised as operational.

## Initial repository audit
- `index.html` loads separate JSX files through Babel in the browser; no production bundler. The README explicitly notes performance overhead.
- `js/engine.js` uses `codex-antiquus-save-v3` in localStorage. `chaptersDone`, `beatMax`, bookmarks, quizzes and recall data are coupled to existing IDs.
- `js/app.js` manages screen navigation and saves. The current promotion quiz records a Gold pass.
- `js/quiz.js` gates Gold on full authored content and a quiz, with a 24-hour failure lock; this conflicts with the new flexible coverage/mastery scheme.
- `js/screens-yeardrop.js` already includes a recall-oriented Year Drop and a recent-history store; preserve useful question logic, add agreed daily limits/streak.
- `js/globe.js` implements a draggable SVG orthographic globe, including touch and keyboard controls. Retain as baseline and evaluate mobile ergonomics and time filtering.
- `tools/validate.js` contains extensive integrity checks and simulated progression. Preserve and extend before changing unlocking.
- `docs/DECISIONS.md` and `docs/HANDOFF.md` record earlier product decisions, including prerequisite war gates and character mint rules, which have now been superseded by the agreed October 2026 design. Do not delete these historical documents; note conflicts explicitly.

## Safe implementation sequence
1. **Baseline:** obtain source snapshot and run existing `node tools/validate.js`, then smoke-test desktop and mobile. Capture baseline results.
2. **Content schema:** introduce stable IDs for subject, knowledge section, pathway, lesson and assessment. Record source classifications internally; avoid duplicate knowledge credit.
3. **Progress migration:** create versioned migration from save-v3 to the new save format. Do not overwrite old save; preserve legacy data and provide export/import.
4. **Vertical slice:** Roman Republic overview + Cannae campaign + Hannibal biography, with overlapping curated sections and one Cannae medal.
5. **Reader/navigation:** mobile-first independent paths, bookmarks, search and related content; remove hard war prerequisites.
6. **Assessment:** implement coverage AND mastery as separate conditions; design Bronze/Silver/Gold checks and delayed Diamond.
7. **Year Drops:** add five-per-day cap, one-completion streak, due reviews, and offline-capable grading.
8. **Atlas:** preserve existing globe; connect dated, published subject records and timeline controls; mark approximate locations.
9. **Sync:** validate an authorized ChatGPT progress-write mechanism before choosing and implementing a backend. Maintain local-first operation regardless.
10. **Preview and release:** validate and review on a development preview before any merge to `main`.

## Explicit unresolved rules
- Per-subject coverage section weights and pass standards; use sample Cannae sections to calibrate, not global arbitrary percentages.
- Diamond demotion behavior after later recall failure.
- Year Drop answer direction and typed-answer grading tolerance.
- Cloud provider and supported ChatGPT-to-app write mechanism.
- Precise public-account requirements, deferred until personal sync works.

## Non-negotiable safety checks
- No direct commits to `main` during development.
- Do not silently reset or invalidate existing user progress.
- Do not remove existing historical content during the vertical slice.
- No claimed live sync until a real end-to-end test passes.
- Run automated integrity tests and manual mobile smoke tests before requesting publication.
