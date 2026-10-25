"""8 kategori ikonu. Sistem: 256 tuval, 24 iç boşluk, 20 birim çizgi (yuvarlak uç/birleşim),
köşe yarıçapı 24, ve her ikonda tek dolu nokta (r 18-22) = "Senin": kullanıcının kendisi."""
import os, sys
OUT = sys.argv[1]
SW = 20
S = f'fill="none" stroke="currentColor" stroke-width="{SW}" stroke-linecap="round" stroke-linejoin="round"'
D = 'fill="currentColor"'
ICONS = {
 # rota: başlangıç halkasından kıvrılarak varış noktasına
 "ulasim": ("Ulaşım & Trafik", f'''<circle cx="73" cy="191" r="24" {S}/>
<path d="M73 167 V143 A40 40 0 0 1 113 103 H145 A40 40 0 0 0 185 63" {S}/>
<circle cx="185" cy="63" r="22" {D}/>'''),
 # damla, içinde nokta
 "enerji": ("Su & Enerji", f'''<path d="M128 36 C128 36 60 112 60 160 A68 68 0 0 0 196 160 C196 112 128 36 128 36 Z" {S}/>
<circle cx="128" cy="164" r="22" {D}/>'''),
 # kalp: içinde sahiplenilen nokta
 "sosyal": ("Sosyal Destek", f'''<path d="M128 208 C76 172 40 140 40 104 A46 46 0 0 1 128 88 A46 46 0 0 1 216 104 C216 140 180 172 128 208 Z" {S}/>
<circle cx="128" cy="136" r="22" {D}/>'''),
 # açık kitap, üstünde yükselen nokta
 "egitim": ("Eğitim & Gençlik", f'''<path d="M128 96 C104 80 72 76 40 80 V196 C72 192 104 196 128 212 C152 196 184 192 216 196 V80 C184 76 152 80 128 96 Z M128 96 V212" {S}/>
<circle cx="128" cy="44" r="20" {D}/>'''),
 # bilet: yan çentikler, ortada yer (koltuk) noktası
 "kultur": ("Kültür, Spor & Etkinlik", f'''<path d="M64 60 H192 A24 24 0 0 1 216 84 V104 A24 24 0 0 0 216 152 V172 A24 24 0 0 1 192 196 H64 A24 24 0 0 1 40 172 V152 A24 24 0 0 0 40 104 V84 A24 24 0 0 1 64 60 Z" {S}/>
<circle cx="128" cy="128" r="20" {D}/>'''),
 # artı işaretinin dış hattı, merkezde nokta
 "saglik": ("Sağlık & Acil", f'''<path d="M100 40 H156 V100 H216 V156 H156 V216 H100 V156 H40 V100 H100 Z" {S}/>
<circle cx="128" cy="128" r="18" {D}/>'''),
 # kubbe ve iki minare: İstanbul silueti, üstünde ayrı duran nokta güneş
 "sehir": ("Şehir & Katılım", f'''<path d="M32 208 H224" {S}/>
<path d="M72 208 V176 A56 56 0 0 1 184 176 V208" {S}/>
<path d="M40 208 V88 M216 208 V88" {S}/>
<circle cx="128" cy="68" r="20" {D}/>'''),
 # halka + 45° ibre, ucu nokta: "buradasın, etrafı keşfet"
 "kesfet": ("Keşfet & Eğlence", f'''<circle cx="128" cy="128" r="92" {S}/>
<path d="M100 156 L146 110" {S}/>
<circle cx="154" cy="102" r="22" {D}/>'''),
}
os.makedirs(OUT, exist_ok=True)
for k, (title, body) in ICONS.items():
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" role="img" aria-labelledby="t"><title id="t">{title.replace("&","&amp;")}</title>\n{body}\n</svg>\n'
    open(os.path.join(OUT, f"kategori-{k}.svg"), "w", encoding="utf-8").write(svg)
print("ok", len(ICONS))
