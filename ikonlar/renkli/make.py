"""Renkli, düz geometrik kategori ikonları (v2): her biri kategoriyi anlatan nesne + İstanbul'a özgü bir motif.
Dil: zemin daire + daireden taşan ana nesne + yer yer yıldız patlaması (süs noktası yok).
Her ikonun 32 px ve altı için sade bir küçük sürümü var. 120×120 grid.
Kullanım: python make.py <çıktı klasörü> <html yolu>"""
import os, sys, math
OUT, HTML = sys.argv[1], sys.argv[2]
B, N, P, Y, O, W = "#1E6BF0", "#1B2440", "#F7A8CB", "#FFC530", "#F2542D", "#FFFFFF"
B2 = "#1554C4"

def burst(cx, cy, r1, r2, n=10, fill=O):
    pts = []
    for i in range(n * 2):
        r = r1 if i % 2 == 0 else r2
        a = math.pi * i / n - math.pi / 2
        pts.append(f"{cx + r * math.cos(a):.1f},{cy + r * math.sin(a):.1f}")
    return f'<polygon points="{" ".join(pts)}" fill="{fill}"/>'
def dot(cx, cy, r, f): return f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{f}"/>'
def heart(cx, cy, s, f):
    return (f'<path transform="translate({cx} {cy}) scale({s})" fill="{f}" '
            'd="M0 6 C-6 1 -10 -2 -10 -6 A5 5 0 0 1 0 -7 A5 5 0 0 1 10 -6 C10 -2 6 1 0 6 Z"/>')
def waves(y, color, x0=22, n=5, w=5):
    return (f'<path d="M{x0} {y} ' + " ".join(["q7 -6 14 0"] + ["t14 0"] * (n - 1)) +
            f'" fill="none" stroke="{color}" stroke-width="{w}" stroke-linecap="round"/>')

# Yarısı damla yarısı şimşek: damla iki ayrı yarım olarak çizilir (clipPath/id yok, sayfada çoğaltılabilir)
def split_drop(t, r, m, cy, bolt):
    half = lambda x, sw: f"M60 {t} C60 {t} {x} {cy} {x} {m} A{r} {r} 0 0 {sw} 60 {m + r} Z"
    return (f'<path d="{half(60 - r, 0)}" fill="{B}"/><path d="{half(60 + r, 1)}" fill="{Y}"/>'
            f'<path d="{bolt}" fill="{W}"/>')

TICKET = "M24 36 H96 A8 8 0 0 1 104 44 V56 A8 8 0 0 0 104 72 V84 A8 8 0 0 1 96 92 H24 A8 8 0 0 1 16 84 V72 A8 8 0 0 0 16 56 V44 A8 8 0 0 1 24 36 Z"
BUBBLE = "M24 20 H100 A10 10 0 0 1 110 30 V80 A10 10 0 0 1 100 90 H44 L26 106 L30 90 H24 A10 10 0 0 1 14 80 V30 A10 10 0 0 1 24 20 Z"

ICONS = {
 # Ulaşım: Şehir Hatları vapuru, dalgaların üstünde
 "ulasim": ("Ulaşım & Trafik", "Şehir Hatları vapuru", f'''
{dot(60,62,42,B)}
{waves(94, W)}
<rect x="63" y="28" width="11" height="20" fill="{Y}"/><rect x="63" y="28" width="11" height="6" fill="{N}"/>
<rect x="38" y="46" width="44" height="12" rx="2" fill="{W}"/>
<rect x="26" y="57" width="70" height="14" fill="{W}"/>
{''.join(f'<rect x="{x}" y="61" width="6" height="6" fill="{B}"/>' for x in (32,42,52,62,72,82))}
<path d="M14 70 H106 L96 84 H24 Z" fill="{N}"/>
<rect x="20" y="70" width="80" height="3" fill="{O}"/>
'''),

 # Su & Enerji: yarısı damla yarısı şimşek, altında küçük Bozdoğan Kemeri
 "enerji": ("Su & Enerji", "Yarı damla yarı şimşek, Bozdoğan Kemeri", f'''
{dot(60,58,40,P)}
<rect x="24" y="96" width="72" height="16" fill="{O}"/>
{''.join(f'<path d="M{x} 112 v-6 a6 6 0 0 1 12 0 v6 z" fill="{N}"/>' for x in (30,54,78))}
{split_drop(8, 30, 64, 44, "M66 36 L46 68 H59 L52 90 L76 56 H63 L70 36 Z")}
'''),

 # Sosyal Destek: kalbi tutan iki el
 "sosyal": ("Sosyal Destek", "Kalbi tutan iki el", f'''
{dot(60,60,42,B)}
{heart(60,50,2.5,P)}
<path d="M6 74 C22 66 40 68 52 76 C58 80 60 84 60 88 V102 C44 104 24 100 10 94 Z" fill="{Y}"/>
<path d="M114 74 C98 66 80 68 68 76 C62 80 60 84 60 88 V102 C76 104 96 100 110 94 Z" fill="{O}"/>
<path d="M38 74 C36 64 42 58 48 62 L54 80 Z" fill="{Y}"/>
<path d="M82 74 C84 64 78 58 72 62 L66 80 Z" fill="{O}"/>
{burst(100,20,9,4,8,Y)}'''),

 # Eğitim & Gençlik: açık kitabın üstünde mezuniyet kepi, püskülün ucunda lale
 "egitim": ("Eğitim & Gençlik", "Kitap ve kep, lale püskül", f'''
{dot(60,56,40,Y)}
<path d="M60 82 L16 72 V104 L60 112 Z" fill="{B}"/>
<path d="M60 82 L104 72 V104 L60 112 Z" fill="{B2}"/>
<path d="M24 82 L50 87 M24 91 L50 96 M70 87 L96 82 M70 96 L96 91" stroke="{W}" stroke-width="3" stroke-linecap="round"/>
<path d="M36 48 V64 Q60 76 84 64 V48 Z" fill="#2E3A5E"/>
<path d="M60 24 L106 40 L60 56 L14 40 Z" fill="{N}"/>
<path d="M60 40 L94 46 V62" fill="none" stroke="{O}" stroke-width="3" stroke-linecap="round"/>
<path d="M88 60 L91 65 L94 58 L97 65 L100 60 V69 A6 6 0 0 1 88 69 Z" fill="{O}"/>
'''),

 # Kültür, Spor & Etkinlik: üstünde Galata silueti olan bilet
 "kultur": ("Kültür, Spor & Etkinlik", "Galata basılı bilet", f'''
{dot(60,62,42,P)}
{burst(98,22,14,7,10,O)}
<g transform="rotate(-10 60 64)">
<path d="{TICKET}" fill="{Y}"/>
<path d="M80 42 V86" stroke="{N}" stroke-width="3" stroke-dasharray="4 4"/>
<path d="M48 40 L39 56 H57 Z" fill="{N}"/>
<rect x="37" y="56" width="22" height="4" fill="{N}"/>
<rect x="41" y="60" width="14" height="22" fill="{N}"/>
{''.join(f'<rect x="{x}" y="64" width="3" height="5" fill="{Y}"/>' for x in (44,49))}
<rect x="35" y="82" width="26" height="5" fill="{N}"/>
{burst(92,64,7,3.5,8,O)}
</g>
'''),

 # Sağlık & Acil: stetoskopun çevrelediği artı
 "saglik": ("Sağlık & Acil", "Stetoskop ve artı", f'''
{dot(60,60,42,N)}
<path d="M34 14 V36 A26 26 0 0 0 86 36 V14" fill="none" stroke="{Y}" stroke-width="7" stroke-linecap="round"/>
{dot(34,13,5,W)}{dot(86,13,5,W)}
<path d="M60 62 V84 A14 14 0 0 0 88 84 V80" fill="none" stroke="{Y}" stroke-width="7" stroke-linecap="round"/>
{dot(88,76,13,O)}{dot(88,76,5,W)}
<path d="M54 20 h12 v9 h9 v12 h-9 v9 h-12 v-9 h-9 v-12 h9 z" fill="{P}"/>
'''),

 # Şehir & Katılım: söz balonunun içinde Kız Kulesi
 "sehir": ("Şehir & Katılım", "Söz balonunda Kız Kulesi", f'''
<path d="{BUBBLE}" fill="{B}"/>
<path d="M64 20 V28" stroke="{W}" stroke-width="2.5"/>
<path d="M57 36 a7 7 0 0 1 14 0 Z" fill="{W}"/>
<rect x="56" y="36" width="16" height="30" fill="{W}"/>
{''.join(f'<rect x="61" y="{y}" width="6" height="7" rx="3" fill="{B}"/>' for y in (42,54))}
<rect x="38" y="52" width="18" height="14" fill="{W}"/>
<rect x="42" y="56" width="4" height="5" fill="{B}"/><rect x="49" y="56" width="4" height="5" fill="{B}"/>
<path d="M30 74 Q34 64 46 66 H76 Q88 64 92 74 Z" fill="{O}"/>
{waves(82, W, x0=26, n=5, w=4)}
'''),

 # Eğlence: antenli televizyon, ekranda oynat düğmesi
 "kesfet": ("Eğlence", "Televizyon ve oynat düğmesi", f'''
{dot(60,62,42,Y)}
<path d="M60 34 L40 12 M60 34 L84 10" stroke="{N}" stroke-width="4" stroke-linecap="round"/>
<rect x="53" y="30" width="14" height="7" rx="2" fill="{N}"/>
<path d="M30 96 L24 110 H32 L38 96 Z M90 96 L96 110 H88 L82 96 Z" fill="{N}"/>
<rect x="12" y="36" width="96" height="62" rx="14" fill="{B}"/>
<rect x="20" y="44" width="66" height="46" rx="8" fill="{N}"/>
<path d="M45 55 L67 67 L45 79 Z" fill="{W}"/>
{dot(97,55,5,Y)}{dot(97,70,5,O)}
<path d="M92 82 H102 M92 87 H102" stroke="{W}" stroke-width="2.5" stroke-linecap="round"/>
'''),
}

# Küçük sürüm (32 px ve altı): vurgu noktaları, dalgalar, pencereler, süsler yok; ana nesne büyük
SMALL = {
 "ulasim": f'''{dot(60,60,46,B)}
<rect x="62" y="22" width="16" height="22" fill="{Y}"/><rect x="62" y="22" width="16" height="7" fill="{N}"/>
<rect x="22" y="44" width="76" height="22" fill="{W}"/>
<path d="M8 64 H112 L98 90 H22 Z" fill="{N}"/>''',
 "enerji": f'''{dot(60,60,46,P)}
{split_drop(4, 36, 72, 46, "M68 36 L42 76 H58 L50 104 L80 62 H64 L72 36 Z")}''',
 "sosyal": f'''{dot(60,60,46,B)}
{heart(60,46,3.2,P)}
<path d="M4 72 C22 64 42 66 54 76 C58 80 60 84 60 88 V108 C42 110 20 104 6 96 Z" fill="{Y}"/>
<path d="M116 72 C98 64 78 66 66 76 C62 80 60 84 60 88 V108 C78 110 100 104 114 96 Z" fill="{O}"/>''',
 "egitim": f'''{dot(60,60,46,Y)}
<path d="M60 84 L12 72 V106 L60 116 Z" fill="{B}"/>
<path d="M60 84 L108 72 V106 L60 116 Z" fill="{B2}"/>
<path d="M32 46 V66 Q60 80 88 66 V46 Z" fill="#2E3A5E"/>
<path d="M60 18 L114 38 L60 58 L6 38 Z" fill="{N}"/>''',
 "kultur": f'''{dot(60,60,46,P)}
<g transform="rotate(-10 60 64)"><path d="M20 30 H100 A8 8 0 0 1 108 38 V52 A10 10 0 0 0 108 76 V90 A8 8 0 0 1 100 98 H20 A8 8 0 0 1 12 90 V76 A10 10 0 0 0 12 52 V38 A8 8 0 0 1 20 30 Z" fill="{Y}"/>
<path d="M60 34 L48 54 H72 Z" fill="{N}"/><rect x="44" y="54" width="32" height="7" fill="{N}"/>
<rect x="51" y="61" width="18" height="24" fill="{N}"/><rect x="44" y="84" width="32" height="8" fill="{N}"/></g>''',
 "saglik": f'''{dot(60,60,46,N)}
<path d="M30 10 V36 A30 30 0 0 0 90 36 V10" fill="none" stroke="{Y}" stroke-width="11" stroke-linecap="round"/>
<path d="M60 66 V88 A14 14 0 0 0 88 88 V84" fill="none" stroke="{Y}" stroke-width="11" stroke-linecap="round"/>
{dot(90,78,16,O)}
<path d="M52 14 h16 v12 h12 v16 h-12 v12 h-16 v-12 h-12 v-16 h12 z" fill="{P}"/>''',
 "sehir": f'''<path d="M18 16 H102 A12 12 0 0 1 114 28 V82 A12 12 0 0 1 102 94 H48 L24 114 L30 94 H18 A12 12 0 0 1 6 82 V28 A12 12 0 0 1 18 16 Z" fill="{B}"/>
<path d="M53 38 a11 11 0 0 1 22 0 Z" fill="{W}"/>
<rect x="52" y="38" width="24" height="36" fill="{W}"/>
<rect x="28" y="54" width="24" height="20" fill="{W}"/>
<path d="M18 84 Q24 70 40 72 H82 Q98 70 104 84 Z" fill="{O}"/>''',
 "kesfet": f'''{dot(60,60,46,Y)}
<path d="M60 34 L38 8 M60 34 L82 8" stroke="{N}" stroke-width="7" stroke-linecap="round"/>
<rect x="6" y="34" width="108" height="70" rx="16" fill="{B}"/>
<rect x="16" y="44" width="76" height="50" rx="10" fill="{N}"/>
<path d="M42 54 L70 69 L42 84 Z" fill="{W}"/>''',
}

def svgdoc(title, body):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120" role="img" '
            f'aria-label="{title.replace("&", "&amp;")}">{body}\n</svg>\n')

os.makedirs(os.path.join(OUT, "kucuk"), exist_ok=True)
cards = []
for k, (title, motif, body) in ICONS.items():
    svg = svgdoc(title, body)
    open(os.path.join(OUT, f"kategori-{k}.svg"), "w", encoding="utf-8").write(svg)
    open(os.path.join(OUT, "kucuk", f"kategori-{k}-kucuk.svg"), "w", encoding="utf-8").write(svgdoc(title, SMALL[k]))
    cards.append((k, title, motif, svg))

esc = lambda s: s.replace("&", "&amp;")
short = lambda t: esc(t.split(" &")[0].split(",")[0])
big = "".join(f'<figure>{s}<figcaption><b>{esc(t)}</b><span>{m}</span></figcaption></figure>' for k, t, m, s in cards)
phone = "".join(f'<div class="cc"><span class="tile">{s}</span><b>{short(t)}</b></div>' for k, t, m, s in cards)
sp = lambda s, z: f"<span style=width:{z}px;height:{z}px>{s}</span>"
sizes = "".join(f'<div class="sz"><b>{short(t)}</b><div class="pair"><div>{sp(s,32)}{sp(s,24)}<i>Detaylı</i></div>'
                f'<div>{sp(svgdoc(t,SMALL[k]),32)}{sp(svgdoc(t,SMALL[k]),24)}<i>Küçük sürüm</i></div></div></div>' for k, t, m, s in cards)
page = f'''<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Renkli Kategori İkonları</title>
<link href="https://fonts.googleapis.com/css2?family=Mulish:wght@400;700;800&display=swap" rel="stylesheet">
<style>
body{{margin:0;font-family:Mulish,system-ui,sans-serif;background:#BFE1F7;color:#1B2440}}
main{{max-width:1040px;margin:0 auto;padding:40px 16px 64px}}
h1{{font-size:28px;margin:0 0 6px}} p.lead,.note{{margin:0 0 32px;max-width:640px;line-height:1.5}} .note{{margin:-4px 0 16px}}
h2{{font-size:18px;margin:40px 0 16px}}
.grid{{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:20px}}
figure{{margin:0;display:flex;flex-direction:column;align-items:center;gap:12px;padding:20px 8px}}
figure svg{{width:140px;height:140px}}
figcaption{{text-align:center;display:flex;flex-direction:column;gap:2px;font-size:14px}} figcaption span{{opacity:.7}}
.phone{{background:#fff;border-radius:24px;padding:20px;max-width:380px;display:grid;grid-template-columns:repeat(4,1fr);gap:16px 8px}}
.cc{{display:flex;flex-direction:column;align-items:center;gap:6px;font-size:12px;text-align:center}}
.cc .tile{{width:56px;height:56px}} .cc svg{{width:100%;height:100%}}
.sizes{{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:20px;background:#fff;border-radius:24px;padding:20px}}
.sz{{display:flex;flex-direction:column;gap:8px;font-size:13px}} .pair{{display:flex;gap:20px}} .pair>div{{display:flex;align-items:flex-end;gap:8px;flex-wrap:wrap}}
.pair i{{font-style:normal;font-size:11px;opacity:.65;width:100%}} .sz svg{{width:100%;height:100%;display:block}}
</style></head><body><main>
<h1>Renkli kategori ikonları</h1>
<p class="lead">Düz, geometrik dil: zemin daire, daireden taşan ana nesne, yer yer yıldız patlaması. Her ikon kategoriyi anlatan bir nesneyi İstanbul'a özgü bir motifle birleştiriyor. Örnek olarak hazırlandı, prototipe eklenmedi.</p>
<div class="grid">{big}</div>
<h2>Ana Sayfa'daki boyutta (56 px)</h2><div class="phone">{phone}</div>
<h2>Küçük boyut: 32 ve 24 px</h2><p class="note">32 px ve altında küçük sürüm kullanılır: yıldız patlamaları, dalgalar, pencereler ve süsler çıkarıldı, ana nesne büyütüldü.</p><div class="sizes">{sizes}</div>
</main></body></html>'''
open(HTML, "w", encoding="utf-8").write(page)
print("ok", len(ICONS))
