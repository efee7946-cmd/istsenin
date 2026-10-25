# Uyarlanmış prompt: Senin UI

İstanbul Senin'in görsel dilini kullanarak, ekran görüntülerindeki renkler, köşe yarıçapı, yoğunluk, buton ve form stiliyle, "Senin UI" adlı bir design system ve bu sistemin component kütüphanesini görüntüleyen bir arayüz oluştur. Bu proje üzerinde seninle iterasyonlarla çalışacağım: her adımda arayüzü görüp yeni istek vereceğim.

## Marka bilgisi
- Design system adı: Senin UI
- Referans: İstanbul Senin mobil uygulaması (ekran görüntüleri)
- Ana renkler:
  - C8105E: birincil aksiyon ve magenta başlık
  - 10CFD6: aktif sekme vurgusu
  - 00E3E3: avatar
  - 1F2430: ana metin
  - 6B7280: ikincil metin
  - A6AFBF: pasif ikon
  - F1F2F7: gri zemin
  - E6E8EE: ayraç
  - Eksik kalanları (geri bildirim, kategori renkleri, koyu tema) sen belirle.
- Şekil:
  - Buton ve input: 14px köşe
  - Çip: 12px köşe
  - Kart: 18px köşe
  - Beyaz tabaka: üst köşeler 28px
  - Kontrol yüksekliği: 50–56px
- Font: Mulish (fallback: system-ui, sans-serif)
- İstanbul Senin, İBB ya da alt markalara ait logo, “34” işareti, uygulama ikonu veya illüstrasyon kullanma. Arayüzde yalnızca "Senin UI" adı düz metin olarak geçsin.

## Kütüphane arayüzü (3 kolon)
- Sol: arama kutusu ve gruplu component listesi (Foundations, Actions, Forms, Feedback, Navigation). Her component'in yanında varyant sayısı.
- Orta: component adı, kısa açıklama ve 3 tab:
  - Preview: canlı playground, beyaz/gri canvas seçimi.
  - Variants: tüm varyantlar grid'de; bir varyanta tıklayınca Preview'a yüklensin.
  - Code: mevcut property değerlerinden üretilen kod snippet'i ve kopyala butonu.
- Sağ: property paneli.
  - Tipine göre kontrol kullan: text input, textarea, segmented control (≤4 seçenek), dropdown (>4), toggle, slider, number.
  - Default'tan farklı değerleri işaretle, "Reset to default" butonu koy.
  - Panelin altında component'in kullandığı token'ları renk örnekleriyle listele.
- Light/dark tema geçişi, mobilde tek kolona düşen responsive yapı, görünür klavye focus'u.

## İçerik
- Foundations:
  - Colors: token adı, hex, kullanım alanı; tıklayınca hex kopyalansın.
  - Typography: tip skalası, boyut / satır yüksekliği / ağırlık.
- En az 10 component:
  - Zorunlu: Button, Text field, Toggle, Checkbox, Radio group, Select, Badge, Alert.
  - İstanbul Senin'e özgü: Chip (kategori filtresi), Search bar, List row (uygulama satırı), Category card, Bottom nav.
- Her component için:
  - anlamlı property'ler
  - en az 2 varyant grubu (ör. hierarchy, size, state)
  - default, hover, pressed, focus, disabled ve uygunsa error state'leri. Hover/pressed gerçek etkileşimde çalışsın ve Variants tab'ında ayrıca görünsün.
- En az bir component diğerlerini import ederek oluşsun (composition).
- Örnek metinler uygulamadan gerçekçi olsun (Yeni Doğan Desteği, Şehir Hatları, “İstanbul Senin'de Ara”…). Lorem ipsum yok.

## Token kuralları, proje yapısı, ilk teslim ve iterasyon kuralları
Orijinal prompt'taki gibi:
- Semantik token isimleri, tek kaynak `src/tokens/`, component CSS'inde hex yok.
- Vite + vanilla JS, `<component>/<component>.js + .css`.
- Yeni component için klasör ve registry'ye tek satır.
- README'de çalıştırma ve "yeni component nasıl eklenir" bölümü.
- Her iterasyonda build, güncel arayüzü HTML olarak gösterme ve 2–3 satırlık değişiklik özeti.
