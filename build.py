#!/usr/bin/env python3
"""Bundle Codex Antiquus into one double-clickable file.

    python3 build.py            ->  dist/codex-antiquus.html

Browsers refuse to load sibling scripts over file://, so the multi-file tree
needs a server. This inlines the CSS and every JS module into a single
document that opens straight from disk.

Anything present in vendor/ is inlined too. Whatever is missing keeps its CDN
<script> tag, so the bundle always runs — it just needs a connection for the
parts that were not vendored. Run tools/fetch-vendor.ps1 (or .sh) first for a
genuinely offline file.

dist/ is gitignored. Re-run this after any content change.
"""

import re
import shutil
from pathlib import Path

ROOT = Path(__file__).parent
DIST = ROOT / "dist"
OUT = DIST / "codex-antiquus.html"

SRC = (ROOT / "index.html").read_text(encoding="utf-8")


def read(rel):
    return (ROOT / rel).read_text(encoding="utf-8").strip("\n")


# --- stylesheets -----------------------------------------------------------
# <link rel="stylesheet" href="x.css"> -> <style> ... </style>, in place, so
# the cascade order of the source document is preserved exactly.

def inline_css(m):
    href = m.group(1)
    path = ROOT / href
    if not path.exists():
        print(f"  ! {href} missing, left as a link")
        return m.group(0)
    print(f"  + {href}")
    return f"<style>\n/* ==== {href} ==== */\n{read(href)}\n</style>"


out = re.sub(r'<link rel="stylesheet" href="([^"]+)" />', inline_css, SRC)

# --- vendored libraries ----------------------------------------------------
# Each library is a local <script src="vendor/x.js"> followed by a
# document.write CDN fallback. If the local file exists, inline it and drop the
# fallback. If it does not, drop the dead local tag and keep the CDN one.

VENDOR = re.compile(
    r'<script src="(vendor/[^"]+)"></script>\n'
    r'<script>window\.\w+ \|\| document\.write\(\'(<script src="[^"]+">)\\x3C/script>\'\);</script>'
)


def inline_vendor(m):
    href, cdn_tag = m.group(1), m.group(2)
    path = ROOT / href
    if path.exists():
        print(f"  + {href}")
        return f"<script>\n/* ==== {href} ==== */\n{read(href)}\n</script>"
    print(f"  ! {href} missing, falling back to the CDN")
    return f"{cdn_tag}</script>"


out = VENDOR.sub(inline_vendor, out)

# --- application modules ---------------------------------------------------
# Every js module collapses into one text/babel block, keeping the
# /* ==== path ==== */ markers so the bundle can always be split apart again.

MODULE = re.compile(r'<script type="text/babel" data-presets="react" src="(js/[^"]+)"></script>')
modules = MODULE.findall(out)
if not modules:
    raise SystemExit("no js modules found in index.html — has the script tag format changed?")

blocks = []
for rel in modules:
    print(f"  + {rel}")
    blocks.append(f"/* ==== {rel} ==== */\n{read(rel)}")

bundle = '<script type="text/babel" data-presets="react">\n' + "\n\n".join(blocks) + "\n</script>"

first = MODULE.search(out)
out = out[: first.start()] + bundle + MODULE.sub("", out[first.start():]).lstrip("\n")
out = re.sub(r"\n{3,}", "\n\n", out)

# --- write -----------------------------------------------------------------
DIST.mkdir(exist_ok=True)
OUT.write_text(out, encoding="utf-8", newline="\n")

kb = len(out.encode("utf-8")) / 1024
print(f"\n{OUT.relative_to(ROOT)}  —  {kb:.0f} KB, {len(out.splitlines())} lines")
if 'src="https://' in out:
    print("Still loading some libraries from a CDN. Run tools/fetch-vendor.sh (or .ps1) to vendor them.")
else:
    print("Fully self-contained apart from the Google Fonts stylesheet.")
