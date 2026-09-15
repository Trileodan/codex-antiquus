#!/usr/bin/env python3
"""
Generate Set chapter files from Master Brief v3.

The brief's hierarchy maps onto the app's existing presentation model,
which §0 says to keep:

    brief Chapter   ->  app `act`      (the grouping band on a Set page)
    brief Segment   ->  app chapter    (the thing you tap into)
    brief SLIDE n   ->  app beat       (one swipeable part)

Generated rather than hand-transcribed on purpose: 320 slides retyped by
hand is 320 chances to quietly reword the canonical prose, which is the
one thing §0 forbids. The prose is copied byte-for-byte from the brief.
"""
import json, re, sys, unicodedata

SETS = {
 "Ancient Britain":   ("ancient-britain",  "brit"),
 "Ancient Greece":    ("ancient-greece",   "grk"),
 "Ptolemaic Egypt":   ("ptolemaic-egypt",  "ptol"),
 "Ancient Egypt":     ("ancient-egypt",    "egy"),
 "Persia":            ("persia",           "per"),
 "Ancient China":     ("ancient-china",    "chn"),
 "Mesoamerica":       ("mesoamerica",      "mes"),
}
CAMPAIGNS = { "Bronze Age Collapse": ("crisis-bronze-age", "bac") }

def slug(s, n=4):
    s = unicodedata.normalize("NFKD", s).encode("ascii","ignore").decode()
    words = re.findall(r"[A-Za-z0-9]+", s.lower())
    drop = {"the","a","an","of","and","in","to","is","it","its","not","just","then","with","for"}
    keep = [w for w in words if w not in drop] or words
    return "-".join(keep[:n])

def js(s):
    return '"' + s.replace("\\","\\\\").replace('"','\\"') + '"'

def minutes(words):
    return max(3, round(words/170) + 1)

def emit(setname, meta, data, out):
    set_id, prefix = meta
    lines = []
    lines.append("/* =====================================================================")
    lines.append(f"   {setname.upper()} — generated from Master Brief v3")
    lines.append("")
    lines.append("   Every line of prose below is the brief's, copied exactly. Slide text")
    lines.append("   is not edited, retitled or resequenced: v3 §0 makes the supplied")
    lines.append("   prose and its ordering canonical.")
    lines.append("")
    lines.append("   Slides carry no titles and no checkpoint questions because the brief")
    lines.append("   supplies neither, and inventing them would put Claude prose back in")
    lines.append("   through the side door. Recall lives in Year Drop instead (§1).")
    lines.append("")
    lines.append(f"   Source: {setname} — "
                 f"{len(data['chapters'])} chapters, "
                 f"{sum(len(c['segments']) for c in data['chapters'])} segments, "
                 f"{sum(len(g['slides']) for c in data['chapters'] for g in c['segments'])} slides.")
    if data.get("scope"):
        lines.append("")
        for chunk in re.findall(r".{1,68}(?:\s|$)", "Scope: " + data["scope"]):
            lines.append("   " + chunk.rstrip())
    lines.append("   ===================================================================== */")
    lines.append("")
    lines.append("CHAPTERS.push(")

    used = set()
    for chap in data["chapters"]:
        for seg in chap["segments"]:
            base = f"{prefix}-{slug(seg['name'])}"
            cid, n = base, 2
            while cid in used:
                cid = f"{base}-{n}"; n += 1
            used.add(cid)
            words = sum(len(s.split()) for s in seg["slides"])
            tags = [t.strip() for t in seg.get("tags","").split(";") if t.strip()]
            lines.append("{")
            lines.append(f"  id: {js(cid)}, set: {js(set_id)}, act: {js(chap['name'])},")
            lines.append(f"  title: {js(seg['name'])}, minutes: {minutes(words)},")
            if tags:
                lines.append(f"  tags: [{', '.join(js(t) for t in tags)}],")
            lines.append("  beats: [")
            for s in seg["slides"]:
                lines.append(f"    {{ text: [{js(s)}] }},")
            lines.append("  ],")
            lines.append("},")
    lines.append(");")
    open(out, "w", encoding="utf-8").write("\n".join(lines) + "\n")
    return used

if __name__ == "__main__":
    src = json.load(open(sys.argv[1]))
    for entry in src:
        name = entry["name"]
        if name in SETS:
            ids = emit(name, SETS[name], entry, f"js/data/chapters-{SETS[name][1]}.js")
            print(f"{name:<22} -> js/data/chapters-{SETS[name][1]}.js  ({len(ids)} chapters)")
