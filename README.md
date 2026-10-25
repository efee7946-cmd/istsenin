# İstanbul Senin · Yeniden tasarım

İBB'nin İstanbul Senin uygulamasının Ana Sayfa, Tüm Uygulamalar, kategori ve arama ekranları için Gestalt ilkelerine dayanan yeniden tasarım çalışması: tıklanabilir prototipler, A/B karşılaştırmaları, Senin UI tasarım sistemi, developer handoff ve ölçüm planı.

**HMW:** Arayüzü karışık bulup yine de kullanmaya devam eden kullanıcının, aradığı hizmeti kısa sürede bulma ihtiyacını, hizmetler uygulamanın içinde kayboluyor gerçeğine rağmen nasıl karşılayabiliriz?

## İçerik

| Yol | Ne |
| --- | --- |
| `index.html` | **Güncel prototip.** 69 uygulama, resmî logolar gömülü, 8 kategori. Tek dosya, internet olmadan da açılır |
| `prototip/surumler/` | Önceki sürümler: `v00-ilk-hal` (mevcut uygulama, 23 Eylül 2026 ekran görüntülerinden birebir), `v0-eylul` (ilk prototip), `v1-senin-ui` (Senin UI ve ses tonuna göre), `v1-1-tema-qr` (tema butonu, QR düzeltmesi) |
| `ab/` | A/B karşılaştırmaları: `tum-uygulamalar-ab` (yalnızca Tüm Uygulamalar), `metin-odakli-ab`, `enerjik-ab` (B: hızlı işlemler, dolgun renkler) |
| `design-system/senin-ui.html` | Senin UI gezgini: açık ve koyu temada token'lar, 13 bileşen |
| `design-system/kaynak/` | Senin UI kaynak projesi (Vite, vanilla JS). Token'ların tek kaynağı `src/tokens/` |
| `handoff/developer-handoff.docx` | Developer handoff: kararlar, bileşenler, state'ler, uç durumlar, etkileşimler, erişilebilirlik, ölçüm planı, açık sorular, v2 değişiklikleri |
| `handoff/olcum-plani.docx` | Ölçüm planı: metrik kartları, ölçüm yöntemi, test görevleri, tracking plan, hipotez |
| `handoff/analiz-ve-aksiyon.docx` | Kullanıcı görüşmesi ile yapay session replay karşılaştırması ve v2 aksiyonu |
| `ikonlar/` | Kategori ikonu önerileri (çizgi ve izometrik): örnek sayfalar, SVG'ler ve onları üreten Python betikleri. Prototipe eklenmedi |
| `skills/` | Çalışmada kullanılan Claude skill'leri: `istanbul-senin-tov` (ses tonu), `outsider-design-review` (heuristic review), `outsiders-metric-coach` (ölçüm planı) |

## Çalıştırma

HTML dosyalarını tarayıcıda açman yeterli. Masaüstünde telefon çerçevesi içinde, 760 px'in altındaki ekranlarda tam ekran görünür.

Tasarım sistemi kaynağı için:

```bash
cd design-system/kaynak
npm install
npm run dev
```

## Notlar

- Developer handoff'un canlı hali claude.ai'deki belgede; buradaki Word dosyaları, 25 Ekim 2026'daki dışa aktarımı.
- Yapay session replay'ler tahmindir, veri değildir. Aksiyonlar yalnızca gerçek kullanıcıyla doğrulanan bulgulara dayanır.

## Kaynaklar ve haklar

Uygulama adları ve logoları [istanbulsenin.istanbul/uygulamalarimiz](https://istanbulsenin.istanbul/uygulamalarimiz/) sayfasından alındı. Logolar ve İstanbul Senin markası İstanbul Büyükşehir Belediyesi'ne aittir; bu repo yalnızca tasarım çalışması içindir.
