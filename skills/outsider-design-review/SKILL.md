---
name: outsider-design-review
description: Bir ekranı ya da akışı Nielsen'in 10 usability heuristic'ine, erişilebilirliğe ve eksik state'lere göre inceler. Bir tasarım review'a ya da handoff'a gitmeden önce kullan. Kullanıcı bir ekran, prototip, HTML/Figma çıktısı ya da ekran görüntüsü verip "review et", "heuristic analizi yap", "eksik state var mı", "erişilebilirliğe bak", "handoff öncesi kontrol et" dediğinde ya da seninui-ds bileşenleriyle yapılmış bir ekranın değerlendirilmesini istediğinde mutlaka bu skill'i kullan.
---

# Outsider design review

Ekrana dışarıdan gelen biri gibi bak: tasarımcının niyetini değil, ekranda gerçekten olanı değerlendir. Amaç review ya da handoff öncesi, tartışmaya değil düzeltmeye dönüşecek bulgular üretmek.

## Girdi

- **Ekran / akış:** HTML dosyası, URL, ekran görüntüsü ya da Figma çıktısı.
- **Design system:** seninui-ds (Senin UI). Öneriler bu sistemin bileşenlerine dayanır.
- **Persona ve HMW (How might we):** Kullanıcı vermediyse uydurma. Persona'ya bağlı yargıları "Sorular" bölümüne taşı ve raporun başında eksik olduğunu söyle.

## Kaynak

10 usability heuristic: https://media.nngroup.com/media/articles/attachments/Heuristic_Summary1-compressed.pdf

Numaralar (rapor bu numaraları kullanır):

1. Sistem durumunun görünürlüğü
2. Sistem ile gerçek dünya arasında uyum
3. Kullanıcı kontrolü ve özgürlüğü
4. Tutarlılık ve standartlar
5. Hata önleme
6. Hatırlamak yerine tanımak
7. Kullanım esnekliği ve verimlilik
8. Estetik ve sade tasarım
9. Kullanıcının hataları tanıması, teşhis etmesi ve düzeltmesi
10. Yardım ve dokümantasyon

## Adımlar

1. Ekranın kullanıcı için görevini tek cümleyle yaz.
2. Ekranı 10 heuristic'in her birine göre incele; ihlal yoksa "uygun" yaz.
3. Erişilebilirliği kontrol et: kontrast, dokunma alanı, ekran okuyucu etiketi.
4. Eksik state'leri listele: boş, yükleniyor, hata ve ekrana özel state'ler.
5. Eksik uç durumları listele: uzun metin, sıfır ve çok fazla öğe, eksik veri.
6. Her bulgu için tablo satırı: heuristic no · ekrandaki yer · bulgu · önem (yüksek/orta/düşük) · öneri.
7. En kritik 3 bulguyu en üste al.

## Kurallar

- **Ekranda görmediğin şeyi bulgu yazma.** Bulgu ancak ekranda gözlediğin ya da ölçtüğün bir şeye dayanır. Tahmin bulgu değildir.
- **"Güzel / çirkin" yok;** her bulgu bir heuristic'e ya da state'e bağlı. Bağlayamıyorsan yazma.
- **Emin değilsen bulgu değil, soru olarak yaz.**
- **Design system'de karşılığı olan bileşeni öner, yeni bileşen uydurma.** Önerdiğin bileşenin seninui-ds'te var olduğunu kontrol et; hangi varyantı olduğundan emin değilsen varyant adı verme.

## Ekranı gerçekten denemek (HTML / URL verildiyse)

Ekran görüntüsüne bakmak yetmez; çoğu state ve uç durum ancak etkileşimle ortaya çıkar.

- Tarayıcı paneli `file://` sayfalarında araç çalıştırmaz. Yerel bir HTML'i scratchpad'e kopyala ve `.claude/launch.json`'a geçici bir statik sunucu (`python -I -m http.server <port> --bind 127.0.0.1 --directory <klasör>`) ekleyip `preview_start` ile aç. İş bitince sunucuyu durdur ve launch.json girdisini geri al. Kullanıcının dosyasını değiştirme.
- Her iki temada (açık/koyu) ve en az iki genişlikte (masaüstü ~1280px, mobil 375px) bak.
- Uç durumları elle tetikle: alanları boşalt, çok uzun Türkçe metin gir (80+ karakter), aramada sonuç vermeyecek ve Türkçe karşılık kullanan sorgular dene, geçersiz bir rota/URL aç.
- Kontrastı göz kararı değil ölçerek ver: `scripts/contrast-audit.js` dosyasının içeriğini sayfada `javascript_tool` ile çalıştır. Oran, font boyutu ve ağırlığıyla birlikte raporla. Pasif (disabled) öğeler WCAG'den muaftır; bulgu sayma.
- Erişilebilir adları `read_page` ağacından oku: adı olmayan buton, `aria-controls`'suz açılır menü gibi eksikler orada görünür.
- Ortamdan kaynaklı olabilecek hataları (ör. otomasyon tarayıcısında pano izni) bulgu yazma; not olarak belirt.

## Rapor formatı

Raporu sohbete yaz. Şu iskeleti kullan:

```
**Ekranın görevi:** <tek cümle>

## En kritik 3 bulgu
| # | Heuristic | Yer | Bulgu | Önem | Öneri |

## Tüm bulgular
| Heuristic | Yer | Bulgu | Önem | Öneri |

## 10 heuristic özeti
1. <ad>: uygun / bulgu var (kısa gerekçe)
… 10'a kadar

**Erişilebilirlik:** kontrast · dokunma alanı · ekran okuyucu etiketi
**Eksik state'ler:** …
**Eksik uç durumlar:** … (sorun görmediğin kategori için "gözlenmedi" yaz)

## Sorular (bulgu değil)
- …
```

Önem ölçütü: **yüksek** = görevi engelliyor, erişilebilirlik standardını ihlal ediyor ya da hatalı çıktı üretiyor; **orta** = görevi yavaşlatıyor ya da kafa karıştırıyor; **düşük** = tutarlılık veya verimlilik iyileştirmesi.

Bulgu metninde ölçtüğün değeri ver ("3.17:1, 12px", "723px buton 610px canvas'ta"); okuyan kişi neden önemli olduğunu sayıdan anlasın.
