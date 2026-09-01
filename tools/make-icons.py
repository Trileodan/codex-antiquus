"""Regenerate icons/ and favicon.ico.

    python3 tools/make-icons.py        (needs Pillow: pip install pillow)

The mark is a laurel wreath around a CA monogram, gold on the app's ink
ground, matching css/styles.css --gold-glow / --bronze / --ink. Nothing here
depends on the Cinzel webfont: DejaVu Serif Bold is close enough at 40px and
is present on every Linux box, so the build is reproducible.

Two shapes are produced deliberately:
  * the full mark, for the home screen, where there is room for the wreath
  * the monogram alone, for 16 and 32px favicons, where the wreath is mush
"""
import math, os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf"
INK, INK2 = (22, 19, 16), (48, 39, 25)
BRONZE, BRONZE_DIM = (176, 141, 87), (96, 77, 48)
GOLD_HI, GOLD_LO = (246, 222, 124), (166, 124, 60)
M = 2048  # master size; everything is rendered here and downsampled


def ground(size):
    """Ink with the warm off-centre glow of .hcg-root."""
    g = Image.new("RGB", (size, size), INK)
    d = ImageDraw.Draw(g)
    cx, cy, R = size * 0.22, size * 0.02, size * 1.25
    for i in range(80, 0, -1):
        t = i / 80.0
        r, f = R * t, (1 - t) ** 1.7
        d.ellipse([cx - r, cy - r, cx + r, cy + r],
                  fill=tuple(int(INK[k] + (INK2[k] - INK[k]) * f) for k in range(3)))
    return g.filter(ImageFilter.GaussianBlur(size / 22))


def gold(size):
    g = Image.new("RGB", (1, size))
    for y in range(size):
        t = (y / (size - 1)) ** 0.85
        g.putpixel((0, y), tuple(int(GOLD_HI[k] + (GOLD_LO[k] - GOLD_HI[k]) * t) for k in range(3)))
    return g.resize((size, size)).convert("RGBA")


def apply_gold(im, mask, size):
    """Gold gradient through the mask, over a soft drop shadow."""
    sh = mask.filter(ImageFilter.GaussianBlur(size * 0.010)).point(lambda v: int(v * 0.6))
    im = Image.composite(Image.new("RGBA", (size, size), (0, 0, 0, 255)), im, sh)
    return Image.composite(gold(size), im, mask)


def frame(d, size, inset):
    pad = size * inset
    box = [pad, pad, size - pad - 1, size - pad - 1]
    r = size * 0.075
    d.rounded_rectangle(box, radius=r, outline=BRONZE, width=max(2, int(size * 0.016)))
    g = size * 0.034
    d.rounded_rectangle([box[0] + g, box[1] + g, box[2] - g, box[3] - g],
                        radius=r * 0.7, outline=BRONZE_DIM, width=max(1, int(size * 0.006)))


def letters(mask, size, fs, cy, txt="CA"):
    f = ImageFont.truetype(FONT, fs)
    md = ImageDraw.Draw(mask)
    ws = [md.textlength(c, font=f) for c in txt]
    track = fs * 0.03
    x = (size - (sum(ws) + track * (len(txt) - 1))) / 2
    bb = f.getbbox(txt)
    y = cy - (bb[3] - bb[1]) / 2 - bb[1]
    for c, w in zip(txt, ws):
        md.text((x, y), c, font=f, fill=255)
        x += w + track


def wreath(mask, size, R, cx, cy, n=9, ls=0.122, lw=0.055):
    """Two arcs of leaves, largest at the bottom, opening at the top."""
    L, W = int(size * ls), int(size * lw)
    base = Image.new("L", (L, W), 0)
    ImageDraw.Draw(base).ellipse([0, 0, L - 1, W - 1], fill=255)
    for side in (-1, 1):
        for i in range(n):
            t = i / (n - 1.0)
            a = math.radians(108 + t * 128)
            ang = a if side < 0 else math.pi - a
            px, py = cx + R * math.cos(ang), cy - R * math.sin(ang)
            deg = math.degrees(ang) + (108 if side < 0 else 72)
            lf = base.rotate(deg, expand=True, resample=Image.BICUBIC)
            sc = 0.72 + 0.28 * (1 - t)
            lf = lf.resize((max(1, int(lf.width * sc)), max(1, int(lf.height * sc))), Image.LANCZOS)
            mask.paste(lf, (int(px - lf.width / 2), int(py - lf.height / 2)), lf)
    d = ImageDraw.Draw(mask)
    w = max(2, int(size * 0.013))
    d.arc([cx - R, cy - R, cx + R, cy + R], start=-58, end=58, fill=255, width=w)
    d.arc([cx - R, cy - R, cx + R, cy + R], start=122, end=238, fill=255, width=w)


def full_mark(size, inset):
    im = ground(size).convert("RGBA")
    frame(ImageDraw.Draw(im), size, inset)
    m = Image.new("L", (size, size), 0)
    wreath(m, size, size * (0.5 - inset) * 0.74, size / 2, size * 0.53)
    letters(m, size, int(size * (0.5 - inset) * 0.70), size * 0.53)
    return apply_gold(im, m, size).convert("RGB")


def monogram(size, inset):
    im = ground(size).convert("RGBA")
    frame(ImageDraw.Draw(im), size, inset)
    m = Image.new("L", (size, size), 0)
    inner = size * (1 - 2 * inset) - 2 * size * 0.034
    letters(m, size, int(inner * 0.66), size * 0.505)
    return apply_gold(im, m, size).convert("RGB")


def main():
    icons = os.path.join(HERE, "icons")
    os.makedirs(icons, exist_ok=True)
    # 0.055 fills the tile; Android's adaptive crop needs the 0.165 safe zone
    big, safe = full_mark(M, 0.055), full_mark(M, 0.165)
    for n, name in ((512, "icon-512.png"), (192, "icon-192.png"), (180, "apple-touch-icon.png")):
        big.resize((n, n), Image.LANCZOS).save(os.path.join(icons, name))
    safe.resize((512, 512), Image.LANCZOS).save(os.path.join(icons, "icon-maskable-512.png"))
    mono = monogram(M, 0.055)
    sizes = [mono.resize((n, n), Image.LANCZOS) for n in (48, 32, 16)]
    sizes[1].save(os.path.join(icons, "favicon-32.png"))
    sizes[2].save(os.path.join(icons, "favicon-16.png"))
    sizes[0].save(os.path.join(HERE, "favicon.ico"), sizes=[(48, 48), (32, 32), (16, 16)])
    print("wrote icons/ and favicon.ico")


if __name__ == "__main__":
    main()
