#!/usr/bin/env python3
"""builtbyswami brand card generator.
Usage: python3 make_card.py "<PILLAR>" "<HOOK>" "<SUBTITLE or ''>" <out.png> [hook|ig|news]
"""
import sys
from PIL import Image, ImageDraw, ImageFont
try:
    import icons as _icons
except Exception:
    _icons = None

BG = (18, 20, 24)
PANEL = (24, 27, 32)
CYAN = (34, 211, 238)
WHITE = (240, 243, 246)
MUTED = (150, 158, 168)
DARK = (10, 12, 15)

FONT_DIR = "/usr/share/fonts/truetype/google-fonts/"
DEJAVU = "/usr/share/fonts/truetype/dejavu/"

def font(size, weight="Bold"):
    try:
        return ImageFont.truetype(FONT_DIR + f"Poppins-{weight}.ttf", size)
    except Exception:
        return ImageFont.truetype(DEJAVU + "DejaVuSans-Bold.ttf", size)

def wrap(draw, text, fnt, max_w):
    words, lines, cur = text.split(), [], ""
    for w in words:
        t = (cur + " " + w).strip()
        if draw.textlength(t, font=fnt) <= max_w:
            cur = t
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines

def rounded(draw, xy, r, fill):
    draw.rounded_rectangle(xy, radius=r, fill=fill)

def pill(draw, x, y, text, fnt):
    tw = draw.textlength(text, font=fnt)
    pad_x, h = 26, 54
    rounded(draw, (x, y, x + tw + pad_x * 2, y + h), 27, CYAN)
    draw.text((x + pad_x, y + h/2), text, font=fnt, fill=DARK, anchor="lm")
    return y + h

def wordmark(draw, W, H):
    fnt = font(38, "SemiBold")
    y = H - 78
    draw.ellipse((80, y - 6, 80 + 34, y + 28), fill=CYAN)
    draw.text((128, y + 11), "@builtbyswami", font=fnt, fill=WHITE, anchor="lm")

def draw_icon(img, icon, W, H):
    if not (_icons and icon):
        return
    _icons.render(img, icon, W - 250, H - 250, 175)

def make(pillar, hook, sub, out, mode, icon=None):
    if mode == "ig":
        W, H = 1080, 1350
    elif mode == "hook":
        W, H = 1080, 1080
    else:
        W, H = 1080, 1080
    img = Image.new("RGBA", (W, H), BG + (255,))
    d = ImageDraw.Draw(img)
    # subtle top accent bar
    d.rectangle((0, 0, W, 10), fill=CYAN)
    margin = 80
    # pill tag
    pill_font = font(30, "SemiBold")
    py = pill(d, margin, 150, pillar.upper(), pill_font)
    # accent short bar under pill
    d.rectangle((margin, py + 40, margin + 90, py + 50), fill=CYAN)
    # hook text
    hook_size = 92 if len(hook) < 40 else (76 if len(hook) < 70 else 60)
    hf = font(hook_size, "Bold")
    max_w = W - margin * 2
    lines = wrap(d, hook, hf, max_w)
    y = py + 96
    for ln in lines:
        d.text((margin, y), ln, font=hf, fill=WHITE, anchor="lm")
        y += int(hook_size * 1.22)
    # subtitle
    if sub:
        sf = font(40, "Medium")
        for ln in wrap(d, sub, sf, max_w):
            y += 20
            d.text((margin, y), ln, font=sf, fill=MUTED, anchor="lm")
            y += 46
    draw_icon(img, icon, W, H)
    wordmark(ImageDraw.Draw(img), W, H)
    img.convert("RGB").save(out)
    print("saved", out)

if __name__ == "__main__":
    pillar = sys.argv[1]
    hook = sys.argv[2]
    sub = sys.argv[3] if len(sys.argv) > 3 else ""
    out = sys.argv[4] if len(sys.argv) > 4 else "card.png"
    mode = sys.argv[5] if len(sys.argv) > 5 else "news"
    icon = sys.argv[6] if len(sys.argv) > 6 else None
    make(pillar, hook, sub, out, mode, icon)
