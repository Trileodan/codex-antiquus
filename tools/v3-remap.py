#!/usr/bin/env python3
"""
Master Brief v3 replaced five Sets with new segment structures, so the
chapter ids changed. Everything that pointed at a chapter — coins,
campaigns, war gates, map hotspots, reading spans — has to follow.

The mapping is by SUBJECT, not by position. Where v3 has no equivalent
segment (the Druids, Socrates' trial, the Saite revival) the reference
is sent to the nearest surviving segment rather than dropped, so no coin
becomes unearnable. Those cases are listed at the end of the run.
"""
import re, sys, os

MAP = {
 # ---- Ancient Britain: 18 chapters -> 9 segments
 "brit-stones": "brit-stonehenge-monument-world",
 "brit-metal": "brit-bronze-gives-way-iron",
 "brit-hillforts": "brit-bronze-gives-way-iron",
 "brit-pytheas": "brit-island-before-written-history",
 "brit-druids": "brit-bronze-gives-way-iron",           # no druid segment in v3
 "brit-tribes": "brit-bronze-gives-way-iron",
 "brit-oppida": "brit-bronze-gives-way-iron",
 "brit-caesar": "brit-caesar-looks-across-channel",
 "brit-claudius": "brit-ad-43-claudius-invades",
 "brit-caratacus": "brit-ad-43-claudius-invades",
 "brit-boudica": "brit-boudica-burns-roman-britain",
 "brit-agricola": "brit-hadrian-draws-line",            # no Agricola segment in v3
 "brit-walls": "brit-hadrian-draws-line",
 "brit-life": "brit-roads-towns-villas",
 "brit-civil": "brit-roads-towns-villas",
 "brit-breakaway": "brit-410-rome-leaves-sort",
 "brit-constantine": "brit-410-rome-leaves-sort",
 "brit-end": "brit-410-rome-leaves-sort",
 # ---- Ancient Greece: 11 -> 10
 "grk-mycenae": "grk-mycenae-warrior-kings",
 "grk-polis": "grk-after-palaces",
 "grk-colonies": "grk-after-palaces",
 "grk-sparta": "grk-sparta-builds-military-society",
 "grk-athens-reform": "grk-athens-experiments-democracy",
 "grk-persia": "grk-thermopylae-salamis",
 "grk-empire": "grk-athenian-empire",
 "grk-pericles": "grk-athenian-empire",
 "grk-pelop": "grk-peloponnesian-war",
 "grk-socrates": "grk-peloponnesian-war",               # no Socrates segment in v3
 "grk-philip": "grk-thebes-macedon",
 # ---- Ptolemaic Egypt: 8 -> 9, and the prefix changes egy- -> ptol-
 "egy-alexander": "ptol-ptolemy-takes-egypt",
 "egy-ptolemy1": "ptol-ptolemy-takes-egypt",
 "egy-ptolemy2": "ptol-alexandria-new-kind-capital",
 "egy-syrian-wars": "ptol-syrian-wars",
 "egy-canopus-rosetta": "ptol-rosetta-stone",
 "egy-rome-protector": "ptol-rome-enters-room",
 "egy-cleopatra-caesar": "ptol-cleopatra-caesar",
 "egy-end": "ptol-actium-end",
 # ---- Ancient Egypt: 17 -> 14
 "egy-predynastic": "egy-nile-before-egypt",
 "egy-menes": "egy-scorpion-narmer",
 "egy-writing": "egy-scorpion-narmer",
 "egy-pyramids": "egy-djoser-first-great-pyramid",
 "egy-oldkingdom": "egy-giza",
 "egy-first-intermediate": "egy-when-old-kingdom-breaks",
 "egy-life": "egy-middle-kingdom",
 "egy-empire": "egy-hatshepsut-king-queen",
 "egy-akhenaten": "egy-akhenaten-breaks-pattern",
 "egy-kadesh": "egy-ramesses-ii-kadesh",
 "egy-sea-peoples": "egy-ramesses-iii-sea-peoples",
 "egy-decline": "egy-from-libyans-persians",
 "egy-kushites": "egy-from-libyans-persians",
 "egy-saite": "egy-from-libyans-persians",              # no Saite segment in v3
 "egy-persia": "egy-from-libyans-persians",
 # egy-middle-kingdom and egy-hyksos keep their ids in v3
 # ---- Persia: 10 -> 9
 "per-cyrus": "per-cyrus-great",
 "per-babylon": "per-cyrus-great",
 "per-cambyses": "per-cambyses-takes-egypt",
 "per-darius": "per-darius-organises-machine",
 "per-empire": "per-darius-organises-machine",
 "per-religion": "per-medes-persians-iranian-plateau",
 "per-persepolis": "per-darius-organises-machine",      # no Persepolis segment in v3
 "per-west": "per-xerxes-invades-greece",
 "per-after": "per-persia-after-xerxes",
 "per-fall": "per-darius-iii-alexander",
}

TARGETS = [
 "js/data/characters.js", "js/data/characters-extra.js", "js/data/characters-greece.js",
 "js/data/characters-persia.js", "js/data/characters-britain.js", "js/data/characters-empire.js",
 "js/data/characters-egypt-ancient.js", "js/data/coins-events.js",
 "js/data/campaigns.js", "js/data/wars.js", "js/data/places.js",
]

def main():
    # longest first so egy-ptolemy1 is not eaten by a shorter prefix
    keys = sorted(MAP, key=len, reverse=True)
    total = 0
    for path in TARGETS:
        if not os.path.exists(path):
            print("  missing:", path); continue
        s = open(path, encoding="utf-8").read()
        n = 0
        for k in keys:
            # only inside quotes, so prose mentioning an id is untouched
            pat = '"' + k + '"'
            c = s.count(pat)
            if c:
                s = s.replace(pat, '"' + MAP[k] + '"')
                n += c
        if n:
            open(path, "w", encoding="utf-8").write(s)
            print(f"  {path:<42} {n:>3} references remapped")
            total += n
    print("total remapped:", total)

    collapsed = {}
    for k, v in MAP.items():
        collapsed.setdefault(v, []).append(k)
    merged = {v: ks for v, ks in collapsed.items() if len(ks) > 1}
    print(f"\n{len(merged)} v3 segments now absorb more than one old chapter:")
    for v, ks in sorted(merged.items()):
        print(f"  {v}\n      <- {', '.join(sorted(ks))}")

main()
