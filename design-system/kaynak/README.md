# Senin UI

İstanbul Senin uygulamasının görsel diliyle hazırlanmış bir design system ve bu sistemin component kütüphanesini gösteren arayüz.

- **Renkler, köşeler, yoğunluk** uygulamanın ekran görüntülerinden alındı. Magenta başlık (`#C8105E`), turkuaz aktif sekme (`#10CFD6`), 14px köşeli butonlar ve input'lar, 28px köşeli beyaz tabaka bunlardan.
- **Yazı tipi:** Mulish (yedek: system-ui, sans-serif).
- **Marka öğeleri:** İstanbul Senin veya İBB'ye ait logo, “34” işareti ya da illüstrasyon kullanılmadı. Arayüzde yalnızca “Senin UI” adı düz metin olarak geçer.
- **Teknoloji:** Vite ve vanilla JS. Framework yok.

## Çalıştırma

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # dist/
npm run build:single # dist-single/index.html (tek dosya, her yerde açılır)
npm run lint:tokens  # component dosyalarında hex var mı kontrol eder
```

`npm run dev` ve `npm run build` önce `npm run tokens` komutunu çalıştırır. Bu komut `src/tokens/*.js` dosyalarından `src/tokens/tokens.css`'i üretir. Dev sunucusu açıkken bir token dosyasını kaydettiğinde CSS kendiliğinden yeniden üretilir ve tüm kütüphane güncellenir.

## Yapı

```
src/
  main.js               kütüphane arayüzü (nav, tab'lar, property paneli)
  registry.js           component kaydı ve nav sıralaması
  styles/app.css        sadece arayüz stilleri
  tokens/               colors.js, typography.js, shape.js → tokens.css (otomatik)
  foundations/          Colors, Typography, Shape & space sayfaları
  icons/icons.js        ortak SVG ikonlar
  utils/                dom, code (snippet), states (ortak state seti ve kategoriler)
  components/<id>/      <id>.js + <id>.css
scripts/
  build-tokens.mjs      tokens.css üreticisi
  check-no-hex.mjs      “component CSS'inde hex yok” kuralının denetimi
```

## Token kuralları

- İsimler semantik: `action.primary`, `text.secondary`, `feedback.error`, `border.default`, `category.sosyal` gibi.
- **Tek kaynak `src/tokens/`.** CSS değişkeni adı, token adındaki noktanın tireye çevrilmesiyle oluşur: `action.primary` → `--action-primary`.
- Açık ve koyu tema değerleri aynı dosyada durur. Koyu tema `:root[data-theme="dark"]` altında üretilir.
- **Component CSS'leri yalnızca `var(--…)` kullanır.** `npm run lint:tokens` hex bulursa hata verir.

## Yeni component nasıl eklenir

1. `src/components/<id>/` klasörünü aç ve içine `<id>.js` ile `<id>.css` dosyalarını koy.
2. `<id>.js` dosyası şu şekilde bir obje export eder:

```js
import './<id>.css';
import { STATES, stateVariants } from '../../utils/states.js';

export default {
  name: 'Tooltip',                 // nav'da görünen ad
  tag: 'is-tooltip',               // kök CSS sınıfı
  desc: 'Kısa açıklama.',
  props: [                         // { k: anahtar, t: tip, l: etiket, d: default, o: seçenekler }
    { k: 'text', t: 'text', l: 'Metin', d: 'Kopyalandı' },
    { k: 'placement', t: 'enum', l: 'Konum', d: 'top', o: ['top', 'bottom'] },
    { k: 'state', t: 'enum', l: 'State', d: 'default', o: STATES },
  ],
  render(p) { return `<div class="is-tooltip">${p.text}</div>`; },
  variants: [ { group: 'Placement', items: [{ label: 'Top', props: { placement: 'top' } }] }, stateVariants() ],
  tokens: ['surface.inverse', 'text.inverse', 'radius.md'],
};
```

3. `src/registry.js` içindeki `ENTRIES` listesine tek satır ekle: `{ id: 'tooltip', group: 'Feedback' },`

### Property tipleri ve panel kontrolleri

| `t` | Kontrol |
|---|---|
| `text` | text input |
| `textarea` | textarea |
| `enum` (4 ya da daha az seçenek) | segmented control |
| `enum` (4'ten fazla seçenek) | dropdown |
| `bool` | toggle |
| `range` (`min`, `max`, `step`) | slider |
| `number` (`min`, `max`) | number input |

### State kuralı

Her etkileşimli component şu state'leri destekler: `default`, `hover`, `pressed`, `focus`, `disabled` ve uygunsa `error`.

- CSS'te gerçek pseudo-class'ı ve zorlanmış sınıfı birlikte yaz: `.is-x:hover, .is-x.is-hover { … }`. Böylece Preview'da gerçek etkileşim çalışır, Variants tab'ında ise state ayrıca görünür.
- Preview'daki etkileşimin property'leri güncellemesi için elemana `data-act` ekle:
  - `toggle:prop` bir boolean'ı tersine çevirir.
  - `set:prop=değer` bir değer atar.
  - `input:prop` input'tan gelen değeri yazar.

## Composition

Component'ler birbirini import ederek oluşabilir:

- **Alert** aksiyon butonu için Button'ı kullanır.
- **List row** sağ uçta Toggle ya da Badge gösterir.
- **Bottom nav** sohbet sayacı için Badge'i kullanır.
