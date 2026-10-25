"""İzometrik kategori ikonları. Eksenler 120° (x ve y yataydan 30°), kısaltma yok.
Her ikon: kategori renginde zemin karosu + nesne + "Senin" küresi (magenta).
Yüz tonları: üst en açık, sol orta, sağ en koyu."""
import math, os, sys
OUT = sys.argv[1]
C30, S30 = math.cos(math.radians(30)), 0.5
CX, CY = 128, 150

def P(x, y, z):
    return (CX + (x - y) * C30, CY + (x + y) * S30 - z)

def mix(a, b, t):
    a = [int(a[i:i+2], 16) for i in (1, 3, 5)]; b = [int(b[i:i+2], 16) for i in (1, 3, 5)]
    return "#%02X%02X%02X" % tuple(round(a[i] + (b[i] - a[i]) * t) for i in range(3))

def poly(pts, fill):
    return '<polygon points="%s" fill="%s"/>' % (" ".join("%.1f,%.1f" % p for p in pts), fill)

def box(x0, x1, y0, y1, z0, z1, top, left, right):
    """Görünen üç yüz: üst (z1), sol (y1), sağ (x1)."""
    return (poly([P(x0, y1, z0), P(x1, y1, z0), P(x1, y1, z1), P(x0, y1, z1)], left) +
            poly([P(x1, y0, z0), P(x1, y1, z0), P(x1, y1, z1), P(x1, y0, z1)], right) +
            poly([P(x0, y0, z1), P(x1, y0, z1), P(x1, y1, z1), P(x0, y1, z1)], top))

def extrude(shape, y_front, depth, front, side, steps=None):
    """2B şekil (u, v) -> düzlem y=y_front, u=x, v=z. Arkaya (-y) doğru katmanlarla derinlik."""
    steps = steps or int(depth)
    out = [poly([P(u, y_front - depth + depth * i / steps, v) for u, v in shape], side) for i in range(steps)]
    out.append(poly([P(u, y_front, v) for u, v in shape], front))
    return "".join(out)

def sphere(x, y, z, r=13):
    cx, cy = P(x, y, z + r)
    sx, sy = P(x, y, z)
    return ('<ellipse cx="%.1f" cy="%.1f" rx="%.1f" ry="%.1f" fill="#000" fill-opacity=".12"/>' % (sx, sy, r * 0.95, r * 0.5) +
            '<circle cx="%.1f" cy="%.1f" r="%d" fill="#C8105E"/>' % (cx, cy, r) +
            '<circle cx="%.1f" cy="%.1f" r="%.1f" fill="#E2488A"/>' % (cx - r * .25, cy - r * .25, r * .62) +
            '<circle cx="%.1f" cy="%.1f" r="%.1f" fill="#F7B8D2"/>' % (cx - r * .4, cy - r * .42, r * .22))

def tile(c):
    sub = BASE_SUB
    return box(-64, 64, -64, 64, -14, 0, sub, mix(sub, c, .22), mix(sub, c, .38))

def tones(c):
    return mix(c, "#FFFFFF", .45), mix(c, "#FFFFFF", .12), mix(c, "#000000", .12)

def circle_pts(cx, cy, r, a0=0, a1=360, n=48):
    return [(cx + r * math.cos(math.radians(a0 + (a1 - a0) * i / n)), cy + r * math.sin(math.radians(a0 + (a1 - a0) * i / n))) for i in range(n + 1)]

# ---- 2B şekiller (u sağa, v yukarı) ----
def drop(h=104, w=40):
    """Damla: yuvarlak alt (merkez (0,w), yarıçap w) ve tepeye (0,h) teğet iki düz kenar."""
    phi = math.degrees(math.acos(w / (h - w)))
    arc = [(w * math.cos(math.radians(a)), w + w * math.sin(math.radians(a))) for a in [90 - phi - i * (360 - 2 * phi) / 40 for i in range(41)]]
    return [(0, h)] + arc

def heart(s=46):
    pts = []
    for i in range(73):
        t = math.radians(i * 5)
        x = 16 * math.sin(t) ** 3
        y = 13 * math.cos(t) - 5 * math.cos(2 * t) - 2 * math.cos(3 * t) - math.cos(4 * t)
        pts.append((x * s / 16, (y + 17) * s / 16 * 0.95))
    return pts

def ticket(w=92, h=60, r=10, n=11):
    hw = w / 2
    pts = [(-hw, 0), (hw, 0), (hw, h / 2 - n)]
    pts += [(hw - n * math.sin(math.radians(a)), h / 2 - n * math.cos(math.radians(a))) for a in range(0, 181, 15)]
    pts += [(hw, h), (-hw, h), (-hw, h / 2 + n)]
    pts += [(-hw + n * math.sin(math.radians(a)), h / 2 + n * math.cos(math.radians(a))) for a in range(0, 181, 15)]
    return pts

def plus(a=22, L=50, base=0):
    return [(-a, base), (a, base), (a, base + L - a), (L, base + L - a), (L, base + L + a), (a, base + L + a),
            (a, base + 2 * L), (-a, base + 2 * L), (-a, base + L + a), (-L, base + L + a), (-L, base + L - a), (-a, base + L - a)]

CATS = {"ulasim": "#1C5DA8", "enerji": "#2F6E1F", "sosyal": "#B00E54", "egitim": "#5B3FB5",
        "kultur": "#A85400", "saglik": "#0B7169", "sehir": "#454B57", "kesfet": "#7F6200"}
SUBS = {"ulasim": "#E6F0FB", "enerji": "#E6F3DE", "sosyal": "#FCE8F1", "egitim": "#EEE9FB",
        "kultur": "#FFF0E0", "saglik": "#E2F6F4", "sehir": "#ECEEF2", "kesfet": "#FFF7D6"}

def icon(k):
    global BASE_SUB
    c = CATS[k]; BASE_SUB = SUBS[k]; top, left, right = tones(c)
    g = tile(c)
    if k == "ulasim":  # otobüs: uzun kutu, camlar, tekerler
        g += box(-46, 46, -20, 20, 6, 62, top, left, right)
        dark = mix(c, "#000000", .45)
        g += poly([P(-38, 20, 36), P(30, 20, 36), P(30, 20, 54), P(-38, 20, 54)], dark)   # yan camlar
        g += poly([P(46, -14, 36), P(46, 14, 36), P(46, 14, 54), P(46, -14, 54)], dark)    # ön cam
        for xc in (-28, 28):
            g += poly([P(xc + 10 * math.cos(t), 20, 10 + 10 * math.sin(t)) for t in [i * math.pi / 12 for i in range(25)]], "#1F2430")
        g += sphere(-14, 0, 62)
    elif k == "enerji":  # damla, derinlikli
        bx, by = P(0, 0, 0)
        pts = [(bx + u, by - 6 - v) for u, v in drop(104, 40)]
        g += '<ellipse cx="%.1f" cy="%.1f" rx="44" ry="14" fill="#000" fill-opacity=".10"/>' % (bx, by)
        g += poly(pts, left)
        g += poly([(x, y) for x, y in pts if x >= bx - 0.01] + [(bx, by - 106)], right)
        g += '<path d="M%.1f %.1f q-14 22 -10 44" fill="none" stroke="#FFFFFF" stroke-opacity=".55" stroke-width="7" stroke-linecap="round"/>' % (bx - 20, by - 62)
        g += sphere(40, 40, 0, 12)
    elif k == "sosyal":  # kalp, derinlikli; küre önünde
        g += extrude(heart(), 10, 22, left, right)
        g += sphere(34, 44, 0, 12)
    elif k == "egitim":  # üst üste iki kitap
        page = "#FBF8F1"
        g += box(-48, 44, -34, 30, 0, 18, top, left, page)
        g += poly([P(44, -34, 0), P(44, 30, 0), P(44, 30, 3), P(44, -34, 3)], right)
        g += box(-40, 40, -28, 26, 18, 34, mix(c, "#FFFFFF", .6), mix(c, "#FFFFFF", .3), page)
        g += sphere(0, -2, 34, 14)
    elif k == "kultur":  # bilet, derinlikli
        g += extrude(ticket(), 10, 14, left, right)
        g += sphere(38, 42, 0, 11)
    elif k == "saglik":  # artı, derinlikli
        g += extrude(plus(), 12, 22, left, right)
        g += sphere(42, 40, 0, 11)
    elif k == "sehir":  # cami: gövde, kubbe, iki minare
        for mx, my in ((40, -48), (-48, 40)):
            g += box(mx, mx + 8, my, my + 8, 0, 92, top, left, right)
            tip = P(mx + 4, my + 4, 112)
            g += poly([P(mx, my + 8, 92), P(mx + 8, my + 8, 92), tip], left) + poly([P(mx + 8, my, 92), P(mx + 8, my + 8, 92), tip], right)
        g += box(-30, 30, -30, 30, 0, 34, top, left, right)
        cx, cy = P(0, 0, 34)
        r = 30
        g += '<path d="M%.1f %.1f A%d %d 0 0 1 %.1f %.1f Z" fill="%s"/>' % (cx - r, cy, r, r, cx + r, cy, left)
        g += '<path d="M%.1f %.1f A%d %d 0 0 1 %.1f %.1f L%.1f %.1f Z" fill="%s"/>' % (cx, cy - r, r, r, cx + r, cy, cx, cy, right)
        g += sphere(30, 48, 0, 10)
    elif k == "kesfet":  # yatay pusula diski, üst yüzde ibre
        r, h = 46, 14
        top_c = [P(r * math.cos(t), r * math.sin(t), h) for t in [i * math.pi / 24 for i in range(48)]]
        bot = [P(r * math.cos(t), r * math.sin(t), 0) for t in [i * math.pi / 24 for i in range(48)]]
        # yan yüzey: sol yarı ve sağ yarı
        side_l = [P(r * math.cos(t), r * math.sin(t), 0) for t in [math.pi / 4 + i * math.pi / 24 for i in range(13)]]
        side_r = [P(r * math.cos(t), r * math.sin(t), 0) for t in [-math.pi * 3 / 4 + i * math.pi / 24 for i in range(25)]]
        g += poly([P(r * math.cos(t), r * math.sin(t), 0) for t in [-math.pi / 4 + i * math.pi / 24 for i in range(25)]] +
                  [P(r * math.cos(t), r * math.sin(t), h) for t in [-math.pi / 4 + (24 - i) * math.pi / 24 for i in range(25)]], right)
        g += poly([P(r * math.cos(t), r * math.sin(t), 0) for t in [math.pi / 4 + i * math.pi / 24 for i in range(13)]] +
                  [P(r * math.cos(t), r * math.sin(t), h) for t in [math.pi / 4 + (12 - i) * math.pi / 24 for i in range(13)]], left)
        g += poly(top_c, top)
        g += poly([P(r * .8 * math.cos(t), r * .8 * math.sin(t), h) for t in [i * math.pi / 24 for i in range(48)]], "#FFFFFF")
        g += poly([P(-30, -30, h), P(-6, 6, h), P(6, -6, h)], mix(c, "#000000", .2))   # ibre kuzey yarısı
        g += poly([P(30, 30, h), P(-6, 6, h), P(6, -6, h)], left)
        g += sphere(0, 0, h, 10)
    return g

os.makedirs(OUT, exist_ok=True)
TITLES = {"ulasim": "Ulaşım", "enerji": "Su ve Enerji", "sosyal": "Sosyal Destek", "egitim": "Eğitim ve Gençlik",
          "kultur": "Kültür ve Spor", "saglik": "Sağlık ve Acil", "sehir": "Şehir", "kesfet": "Keşfet"}
for k in CATS:
    svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="t"><title id="t">%s</title>%s</svg>\n' % (TITLES[k], icon(k))
    open(os.path.join(OUT, "iso-%s.svg" % k), "w", encoding="utf-8").write(svg)
print("ok")
