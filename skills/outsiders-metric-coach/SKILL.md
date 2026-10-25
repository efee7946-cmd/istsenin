---
name: outsiders-metric-coach
description: Bir tasarım değişikliğinin hangi metriklerle ve hangi yöntemle ölçüleceğini önerir; 1 ana + 1-2 destek + 1 guardrail metrik seçer, metrik kartlarını, ölçüm yöntemini, tracking plan tablosunu ve hipotezi yazar. Yeni ekran, akış veya iterasyon konuşulunca kullan. Kullanıcı "bunu nasıl ölçeriz", "hangi metrik", "başarı metriği seç", "tracking plan çıkar", "hipotez yaz" dediğinde ya da bir HMW, karar cümlesi veya design review tablosu paylaşıp ölçümden söz ettiğinde mutlaka bu skill'i kullan.
---

# Outsiders Metric Coach

Bir tasarım değişikliği için ölçüm planı çıkarır: hangi metrik, neden, nasıl ölçülür, hangi event'ler gerekir, hipotez ne.

## Girdi

Başlamadan önce şu dördü elinde olmalı:

1. **HMW ve persona**
2. **Karar cümlesi** — "X akışını seçtik, çünkü…"
3. **Design review tablosu**
4. **UX başarı metrikleri kütüphanesi** — ekibin handbook linki. Link verilmediyse [references/metric-library.md](references/metric-library.md) dosyasını kullan ve bunu çıktıda belirt.

Eksik varsa ve eksik olan seçilecek metriği değiştirebilecekse **durma noktasıdır**: neyin eksik olduğunu ve neden önemli olduğunu söyle, sor, devam etme. Kararı değiştirmeyecek bir eksik (ör. persona fotoğrafı) için not düş ve devam et.

## Adımlar

### 1. Problemi research'ten alıntıyla yaz
Değişikliğin çözdüğü problemi, verilen research/review kaynağından **doğrudan alıntıyla** yaz (kaynağı belirt). Alıntılanacak kaynak yoksa bunu söyle ve sor.

### 2. Metrikleri seç
Kütüphaneden seç:
- **1 ana metrik**
- **1-2 destek metriği**
- **1 guardrail** (değişiklik bir şeyi bozarken ana metriği iyileştiriyor mu, onu yakalar)

Her seçimin nedenini bir-iki cümleyle yaz; nedeni HMW'ye, karar cümlesine ya da review tablosundaki bir bulguya bağla.

**Ana metrik koşulları** (ikisi de sağlanmalı):
- **Outcome olmalı, output değil.** "Sepete ekledi", "görevi tamamladı" ✓ — "ekranı gördü", "butona tıkladı" ✗.
- **Bugün, odada ölçülebilir olmalı.** Görev başarısı, görev süresi, çaba skoru (SEQ) gibi bir test oturumunda hemen ölçülebilen metrikler. Geri dönüş oranı, retention, haftalık aktif kullanım gibi zamana yayılan metrikler ana metrik olamaz; **destek metriği** olarak kalır.

### 3. "%20 düşse ne yapardım?" sınaması
Her aday metriğe sor: *Bu metrik %20 düşse ne yapardım?* Somut bir aksiyon cevabı yoksa (geri al, X adımını sadeleştir, Y segmentine bak…) o metriği **önerme**, yerine başkasını seç. Cevabı karta yaz.

### 4. Her metrik için 8 alanlı kartı doldur
Şablon: [templates/metric-card.md](templates/metric-card.md). Alanları boş bırakma; bilinmeyen değer için kurala uy (aşağıda).

### 5. Ölçüm yöntemi
Her metrik için dört şeyi yaz:
- **Yöntem** — moderasyonlu test, unmoderated test, analytics, anket, A/B…
- **Gereken event'ler**
- **Ne zaman bakılacak** — test günü, lansmandan 1 hafta sonra, 2 sprint sonra…
- **Nedeni nereden öğreneceğiz** — sayı "ne"yi söyler; "neden"i hangi kaynak söyleyecek (think-aloud, oturum kaydı, açık uçlu soru, destek talepleri…)

### 6. Tracking plan tablosu
Gereken bütün event'leri tek tabloda listele:

| Event adı | Tetikleyici | Özellikler (properties) | Hangi metrik için | Ekran / adım | Not |
|---|---|---|---|---|---|

Event adlarını `nesne_eylem` biçiminde yaz (ör. `checkout_completed`). Aynı event birden fazla metrik için gerekiyorsa tek satırda topla.

### 7. Hipotez
Tek cümle, şu kalıpta:

> **Eğer** [değişiklik] yaparsak, **[ana metrik]** [yön] değişir, **çünkü** [research'e dayalı neden].

Guardrail'in bozulmaması beklentisini ikinci bir cümle olarak ekleyebilirsin.

## Kurallar

- **Sayı uydurma.** Kaynakta olmayan baseline, hedef ya da oran yazma. Bilmiyorsan: **"baseline yok, ilk hafta ölçülür"**. Hedef için de aynı: "baseline ölçüldükten sonra belirlenecek".
- **Kararı değiştirecek bilgi eksikse devam etme.** Ne eksik, söyle ve sor.
- **"%20 düşse ne yapardım?"** cevabı olmayan metrik önerilmez.
- **Ana metrik outcome'dur ve bugün odada ölçülebilir.** Zamana yayılan metrikler destek kalır.

## Çıktı düzeni

1. Problem (alıntılı)
2. Seçilen metrikler ve nedenleri (ana / destek / guardrail)
3. Metrik kartları
4. Ölçüm yöntemi (metrik başına)
5. Tracking plan tablosu
6. Hipotez
7. Açık sorular / varsayımlar (varsa)
