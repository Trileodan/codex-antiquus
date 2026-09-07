#!/usr/bin/env python3
"""Bundle Codex Antiquus into double-clickable single files.

    python3 build.py     ->  dist/codex-antiquus.html   (the learning app)

Browsers refuse to load sibling scripts over file://, so the multi-file tree
needs a server. This inlines the CSS and every JS module into a single
document that opens straight from disk.

Anything present in vendor/ is inlined too. Whatever is missing keeps its CDN
<script> tag, so the bundle always runs — it just needs a connection for the
parts that were not vendored. Run tools/fetch-vendor.ps1 (or .sh) first for a
genuinely offline file.

Every href is resolved relative to the page being bundled, so battle/index.html
reaching back to ../vendor/ and ../css/ works the same way as the root page.

dist/ is gitignored. Re-run this after any content change.
"""

import re
from pathlib import Path

ROOT = Path(__file__).parent
DIST = ROOT / "dist"

CSS = re.compile(r'<link rel="stylesheet" href="([^"]+)" />')
VENDOR = re.compile(
    r'<script src="((?:\.\./)?vendor/[^"]+)"></script>\n'
    r'<script>window\.\w+ \|\| document\.write\(\'(<script src="[^"]+">)\\x3C/script>\'\);</script>'
)
ICON = re.compile(r'<link rel="icon"([^>]*?)href="([^"]+)"([^>]*)/>')
MANIFEST = re.compile(r'<link rel="manifest" href="[^"]+" />\n')
# text/babel is unique to the application's own modules, so the src can be any
# path: index.html loads js/ and battle/js/, battle/index.html only js/.
MODULE = re.compile(r'<script type="text/babel" data-presets="react" src="([^"]+)"></script>')


def bundle(page_rel, out_name):
    page = ROOT / page_rel
    base = page.parent
    src = page.read_text(encoding="utf-8")
    print(f"\n{page_rel}")

    def read(href):
        return (base / href).resolve().read_text(encoding="utf-8").strip("\n")

    def exists(href):
        return (base / href).resolve().exists()

    # --- stylesheets: inlined in place, so cascade order is preserved -------
    def inline_css(m):
        href = m.group(1)
        if not exists(href):
            print(f"  ! {href} missing, left as a link")
            return m.group(0)
        print(f"  + {href}")
        return f"<style>\n/* ==== {href} ==== */\n{read(href)}\n</style>"

    out = CSS.sub(inline_css, src)

    # --- favicons: data URIs, since the file may be opened from anywhere ----
    def inline_icon(m):
        href = m.group(2)
        if not exists(href):
            return m.group(0)
        import base64
        data = (base / href).resolve().read_bytes()
        mime = "image/x-icon" if href.endswith(".ico") else "image/png"
        print(f"  + {href}")
        return m.group(0).replace(f'href="{href}"',
                                  f'href="data:{mime};base64,{base64.b64encode(data).decode()}"')

    out = ICON.sub(inline_icon, out)
    out = MANIFEST.sub("", out)

    # --- vendored libraries: inline the local copy, drop the CDN fallback ---
    def inline_vendor(m):
        href, cdn_tag = m.group(1), m.group(2)
        if exists(href):
            print(f"  + {href}")
            return f"<script>\n/* ==== {href} ==== */\n{read(href)}\n</script>"
        print(f"  ! {href} missing, falling back to the CDN")
        return f"{cdn_tag}</script>"

    out = VENDOR.sub(inline_vendor, out)

    # --- application modules: one text/babel block, markers kept so the -----
    #     bundle can always be split back apart
    modules = MODULE.findall(out)
    if not modules:
        raise SystemExit(f"no js modules found in {page_rel} — has the script tag format changed?")
    blocks = []
    for rel in modules:
        print(f"  + {rel}")
        blocks.append(f"/* ==== {rel} ==== */\n{read(rel)}")
    block = '<script type="text/babel" data-presets="react">\n' + "\n\n".join(blocks) + "\n</script>"
    first = MODULE.search(out)
    out = out[: first.start()] + block + MODULE.sub("", out[first.start():]).lstrip("\n")
    out = re.sub(r"\n{3,}", "\n\n", out)

    DIST.mkdir(exist_ok=True)
    target = DIST / out_name
    target.write_text(out, encoding="utf-8", newline="\n")
    kb = len(out.encode("utf-8")) / 1024
    cdn = 'src="https://' in out
    print(f"  -> dist/{out_name}  {kb:.0f} KB, {len(out.splitlines())} lines"
          + ("  (some libraries still load from a CDN)" if cdn else ""))
    return cdn


any_cdn = bundle("index.html", "codex-antiquus.html")
# The battle page is archived (see archive/README.md). Restore this line
# alongside the script tags in index.html to bring it back.
# any_cdn |= bundle("archive/battle/index.html", "field-of-battle.html")

print()
if any_cdn:
    print("Run tools/fetch-vendor.sh (or .ps1) to vendor the remaining libraries.")
else:
    print("The bundle is self-contained apart from the Google Fonts stylesheet.")
