#!/usr/bin/env python3
"""builtbyswami carousel generator (4:5, 1080x1350).
Usage: python3 carousel.py spec.json
spec: {"tag","prefix","slides":[{type:cover|list|take,...}]}
"""
import sys, json
from PIL import Image, ImageDraw, ImageFont
try:
    import icons as _icons
except Exception:
    _icons = None

BG = (18, 20, 24)
CYAN = (34, 211, 238)
WHITE = (240, 243, 246)
MUTED = (150, 158, 168)
DARK = (10, 12, 15)
W, H = 1080, 1350
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

def base(tag, idx, total):
    img = Image.new("RGBA", (W, H), BG + (255,))
    d = ImageDraw.Draw(img)
    d.rectangle((0, 0, W, 10), fill=CYAN)
    m = 80
    pf = font(28, "SemiBold")
    tw = d.textlength(tag.upper(), font=pf)
    d.rounded_rectangle((m, 90, m + tw + 48, 90 + 50), radius=25, fill=CYAN)
    d.text((m + 24, 115), tag.upper(), font=pf, fill=DARK, anchor="lm")
    # slide counter
    cf = font(28, "SemiBold")
    d.text((W - m, 115), f"{idx}/{total}", font=cf, fill=MUTED, anchor="rm")
    return img, d, m

def wordmark(d):
    fnt = font(34, "SemiBold")
    y = H - 76
    d.ellipse((80, y - 6, 80 + 30, y + 24), fill=CYAN)
    d.text((122, y + 9), "@builtbyswami", font=fnt, fill=WHITE, anchor="lm")

def cover(tag, s, idx, total):
    img, d, m = base(tag, idx, total)
    tf = font(96, "Bold")
    lines = wrap(d, s["title"], tf, W - m*2)
    y = 430
    for ln in lines:
        d.text((m, y), ln, font=tf, fill=WHITE, anchor="lm"); y += 116
    if s.get("sub"):
        sf = font(44, "Medium")
        y += 24
        for ln in wrap(d, s["sub"], sf, W - m*2):
            d.text((m, y), ln, font=sf, fill=CYAN, anchor="lm"); y += 58
    icon = s.get("icon")
    if _icons and icon:
        _icons.render(img, icon, W - 250, H - 470, 180)
    sw = font(40, "SemiBold")
    d.text((m, H - 200), "Swipe →", font=sw, fill=MUTED, anchor="lm")
    wordmark(d)
    return img

def listslide(tag, s, idx, total):
    img, d, m = base(tag, idx, total)
    tf = font(60, "Bold")
    y = 230
    for ln in wrap(d, s["title"], tf, W - m*2):
        d.text((m, y), ln, font=tf, fill=WHITE, anchor="lm"); y += 74
    y += 40
    itf = font(42, "Medium")
    for it in s["items"]:
        d.ellipse((m, y + 12, m + 18, y + 30), fill=CYAN)
        lines = wrap(d, it, itf, W - m*2 - 50)
        yy = y
        for ln in lines:
            d.text((m + 44, yy), ln, font=itf, fill=WHITE, anchor="lm"); yy += 52
        y = yy + 34
    wordmark(d)
    return img

def take(tag, s, idx, total):
    img, d, m = base(tag, idx, total)
    qf = font(120, "Bold")
    d.text((m, 240), "“", font=qf, fill=CYAN, anchor="lm")
    tf = font(70, "Bold")
    y = 400
    for ln in wrap(d, s["statement"], tf, W - m*2):
        d.text((m, y), ln, font=tf, fill=WHITE, anchor="lm"); y += 88
    if s.get("cta"):
        cf = font(44, "SemiBold")
        d.rounded_rectangle((m, H - 320, W - m, H - 210), radius=20, fill=CYAN)
        d.text((W/2, H - 265), s["cta"], font=cf, fill=DARK, anchor="mm")
    wordmark(d)
    return img

def main():
    spec = json.load(open(sys.argv[1]))
    tag, prefix, slides = spec["tag"], spec["prefix"], spec["slides"]
    total = len(slides)
    for i, s in enumerate(slides, 1):
        t = s["type"]
        if t == "cover":
            img = cover(tag, s, i, total)
        elif t == "list":
            img = listslide(tag, s, i, total)
        else:
            img = take(tag, s, i, total)
        out = f"{prefix}_slide{i}.png"
        img.convert("RGB").save(out)
        print("saved", out)

if __name__ == "__main__":
    main()
