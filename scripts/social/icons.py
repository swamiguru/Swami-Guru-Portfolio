#!/usr/bin/env python3
"""Simple brand line-art icons for builtbyswami cards (drawn in PIL, no assets)."""
CYAN = (34, 211, 238)
WHITE = (240, 243, 246)
BG = (18, 20, 24)
PANELC = (26, 30, 36)
RING = (44, 52, 62)

def panel(d, cx, cy, r):
    d.rounded_rectangle((cx-r, cy-r, cx+r, cy+r), radius=int(r*0.30), fill=PANELC, outline=RING, width=3)

def _dot(d, x, y, r, col):
    d.ellipse((x-r, y-r, x+r, y+r), fill=col)

def chat(d, cx, cy, s):
    # speech bubble with three dots (messaging / WhatsApp)
    w, h = s*1.9, s*1.4
    x0, y0 = cx-w/2, cy-h/2-s*0.15
    d.rounded_rectangle((x0, y0, x0+w, y0+h), radius=int(s*0.42), outline=CYAN, width=10)
    d.polygon([(x0+s*0.55, y0+h-3), (x0+s*0.30, y0+h+s*0.45), (x0+s*1.05, y0+h-3)], fill=CYAN)
    cyd = y0+h/2
    for dx in (-s*0.45, 0, s*0.45):
        _dot(d, cx+dx, cyd, 11, WHITE)

def disc(d, cx, cy, s):
    # optical disc (PlayStation physical discs)
    d.ellipse((cx-s, cy-s, cx+s, cy+s), outline=CYAN, width=11)
    d.ellipse((cx-s*0.62, cy-s*0.62, cx+s*0.62, cy+s*0.62), outline=RING, width=4)
    d.ellipse((cx-s*0.30, cy-s*0.30, cx+s*0.30, cy+s*0.30), outline=CYAN, width=8, fill=BG)
    # highlight arc
    d.arc((cx-s*0.82, cy-s*0.82, cx+s*0.82, cy+s*0.82), start=210, end=270, fill=WHITE, width=8)

def search(d, cx, cy, s):
    # magnifying glass (search operators)
    r = s*0.72
    ox, oy = cx-s*0.22, cy-s*0.22
    d.ellipse((ox-r, oy-r, ox+r, oy+r), outline=CYAN, width=12)
    import math
    a = math.radians(45)
    x1, y1 = ox+math.cos(a)*r, oy+math.sin(a)*r
    x2, y2 = ox+math.cos(a)*(r+s*0.7), oy+math.sin(a)*(r+s*0.7)
    d.line((x1, y1, x2, y2), fill=CYAN, width=16)

def chip(d, cx, cy, s):
    # CPU / chip (laptop chips)
    b = s*0.85
    d.rounded_rectangle((cx-b, cy-b, cx+b, cy+b), radius=int(s*0.14), outline=CYAN, width=10)
    ib = s*0.42
    d.rounded_rectangle((cx-ib, cy-ib, cx+ib, cy+ib), radius=int(s*0.10), outline=WHITE, width=6)
    pin = s*0.22
    for i in (-0.5, 0, 0.5):
        px = cx+i*b*1.1
        d.line((px, cy-b, px, cy-b-pin), fill=CYAN, width=9)   # top
        d.line((px, cy+b, px, cy+b+pin), fill=CYAN, width=9)   # bottom
        py = cy+i*b*1.1
        d.line((cx-b, py, cx-b-pin, py), fill=CYAN, width=9)   # left
        d.line((cx+b, py, cx+b+pin, py), fill=CYAN, width=9)   # right

def incognito(d, cx, cy, s):
    # hat + glasses (privacy / incognito)
    # brim
    d.ellipse((cx-s*1.05, cy-s*0.5, cx+s*1.05, cy-s*0.12), fill=CYAN)
    # crown
    d.rounded_rectangle((cx-s*0.6, cy-s*0.95, cx+s*0.6, cy-s*0.28), radius=int(s*0.22), fill=CYAN)
    # glasses
    gy = cy+s*0.45
    gr = s*0.34
    d.ellipse((cx-s*0.78-gr, gy-gr, cx-s*0.78+gr, gy+gr), outline=WHITE, width=10, fill=BG)
    d.ellipse((cx+s*0.78-gr, gy-gr, cx+s*0.78+gr, gy+gr), outline=WHITE, width=10, fill=BG)
    d.line((cx-s*0.44, gy-4, cx+s*0.44, gy-4), fill=WHITE, width=10)

def phone(d, cx, cy, s):
    w, h = s*1.15, s*1.9
    d.rounded_rectangle((cx-w/2, cy-h/2, cx+w/2, cy+h/2), radius=int(s*0.24), outline=CYAN, width=10)
    d.line((cx-s*0.18, cy-h/2+s*0.16, cx+s*0.18, cy-h/2+s*0.16), fill=CYAN, width=8)
    _dot(d, cx, cy+h/2-s*0.22, 10, CYAN)

def robot(d, cx, cy, s):
    d.rounded_rectangle((cx-s*0.85, cy-s*0.55, cx+s*0.85, cy+s*0.75), radius=int(s*0.22), outline=CYAN, width=10)
    _dot(d, cx-s*0.35, cy+s*0.05, 15, CYAN)
    _dot(d, cx+s*0.35, cy+s*0.05, 15, CYAN)
    d.line((cx, cy-s*0.55, cx, cy-s*0.95), fill=CYAN, width=8)
    _dot(d, cx, cy-s*1.02, 11, CYAN)

def bulb(d, cx, cy, s):
    d.ellipse((cx-s*0.7, cy-s*0.9, cx+s*0.7, cy+s*0.5), outline=CYAN, width=11)
    d.rounded_rectangle((cx-s*0.3, cy+s*0.42, cx+s*0.3, cy+s*0.8), radius=6, outline=CYAN, width=9)

ICONS = {
    "chat": chat, "whatsapp": chat, "message": chat,
    "disc": disc, "playstation": disc, "gaming": disc, "game": disc, "console": disc,
    "search": search, "x": search,
    "chip": chip, "laptop": chip, "cpu": chip, "processor": chip,
    "incognito": incognito, "privacy": incognito, "security": incognito,
    "phone": phone, "iphone": phone, "android": phone,
    "robot": robot, "ai": robot,
    "tip": bulb, "bulb": bulb,
}

def pick(name):
    return ICONS.get((name or "").lower())
