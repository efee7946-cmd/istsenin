# İstanbul Senin · Analiz ve aksiyon

Gerçek kullanıcı görüşmesi (B aşaması) ile yapay session replay'ler (C aşaması) karşılaştırıldı. Yalnızca insanla doğrulanan bulgular aksiyona alındı.

> **Girdi notu:** Görüşme kartında yalnızca bir alıntı var. Ana metriğin değeri (başarı, süre, 1–7 kolaylık) ve takıldığı an kartta yazmıyor. Bu yüzden insan tarafının metrik değerleri aşağıda "kartta yok" olarak geçiyor; uydurulmadı. Replay tabloları, metrik kartları ve HMW handoff belgesindeki hallerinden alındı. Yapay replay'ler tahmindir, veri değildir.

## Tablo 1 · Eşleştirme

| # | Bulgu | Kanıt | Durum |
|---|---|---|---|
| 1 | Çok kelimeli arama ("su faturası") sonuç vermiyor *(birleştirildi: insanın alıntısı + Oturum 1'deki sonuçsuz arama)* | İnsan + AI | Doğrulandı |
| 2 | "fatura" aramasında "En iyi eşleşme" rozeti Askıda Fatura'da; kullanıcı yanlış uygulamayı açıyor (Oturum 2) | Sadece AI | Doğrulanmadı |
| 3 | "su" aramasında Otobüsüm Nerede ve Kapsül, İSKİ'nin önünde çıkıyor (Oturum 3) | Sadece AI | Doğrulanmadı |
| 4 | Fatura ödemek için alt menüdeki "Ödeme" sekmesine gidiyor; sekme kapalı, dead click ve rage click (Oturum 2) | Sadece AI | Doğrulanmadı |
| 5 | Mobilde "Vazgeç"e dokunuş tema butonuna gidiyor, ekran kararıyor (Oturum 3) | Sadece AI | Doğrulanmadı. Not: çakışma design review'da ölçüldü (tema butonu 187–363 px), ama yalnızca prototip çerçevesine ait |
| 6 | Kategorilerde Su & Enerji kartı ilk taramada görülmüyor (Oturum 1, "tahmin") | Sadece AI | Doğrulanmadı |
| 7 | İlk açılışta giriş ya da tanıtım ekranı bekleniyor, kısayollar önceden dolu (Oturum 3, "tahmin") | Sadece AI | Doğrulanmadı |

Sadece insandan gelen bir satır yok. Görüşme kartındaki tek alıntı, replay'in de yakaladığı sorunla örtüşüyor.

## Metriğe bağlama

| # | Etkilediği metrik |
|---|---|
| 1 | **Ana:** hizmeti bulma süresi (sonuçsuz aramadan sonra yan yola sapılıyor). **Destek:** yardımsız bulma oranı. İzleme göstergesi: sonuçsuz arama oranı |

## Tablo 2 · Aksiyon kartı

Doğrulanmış bulgu yalnızca bir tane, bu yüzden üç değil bir kart var. Kalan iki yeri yalnızca AI'ya dayanan satırlarla doldurmak kurala aykırı olurdu.

| Alan | İçerik |
|---|---|
| Bulgu | Çok kelimeli arama sorgusu ("su faturası") sonuç vermiyor |
| Kanıt | İnsan: "su faturası ve benzeri için sonuç bulamadık" · Replay: Oturum 1, 6–13. sn, "su faturası" yazıyor, sonuçsuz arama ekranında 5 sn duraksıyor, kategoriden yan yola sapıyor |
| Metrik | Ana: hizmeti bulma süresi · Destek: yardımsız bulma oranı |
| Hipotez | Eğer arama sorguyu kelimelere bölüp her kelimeyi uygulama adında, anahtar kelimelerde ve açıklamada ayrı ararsa ve Türkçe ekleri tanırsa ("faturası" → "fatura"), hizmeti bulma süresi kısalır; çünkü kullanıcı ihtiyacını birden fazla kelimeyle yazıyor ve bu sorgular şu an sonuçsuz kalıyor |
| Aksiyon | Uygula, ardından iki görevle tekrar test et |
| Etki | Y |
| Çaba | D (prototipte). Üründeki arama altyapısındaki çabası açık soru |

**Seçilmeyenler:** Seçilmeyen doğrulanmış bulgu yok. 2–7 numaralı satırlar doğrulanmadığı için aksiyon listesine girmedi.

## Test adayları (bir sonraki testte sorulacak)

1. *(Satır 2, guardrail ile ilgili)* "Fatura" yazıp sonuçları gördüğünde hangisine dokundun, neden onu seçtin?
2. *(Satır 4, beklenen yol)* Faturanı ödemek için uygulamada ilk nereye bakardın?

---

## v2 için değişiklikler

*Bu bölüm handoff belgesine olduğu gibi eklenebilir.*

Kaynak: 1 gerçek kullanıcı görüşmesi + 3 yapay session replay (tahmin, veri değil). Yalnızca insanla doğrulanan bulgular aksiyona alındı.

| Bulgu | Kanıt | Metrik | Aksiyon | Etki | Çaba |
| --- | --- | --- | --- | --- | --- |
| Çok kelimeli arama ("su faturası") sonuç vermiyor | İnsan: "su faturası ve benzeri için sonuç bulamadık" · Replay Oturum 1, 6–13. sn | Ana: hizmeti bulma süresi · Destek: yardımsız bulma oranı | Uygula: sorgu kelimelere bölünsün, her kelime ad, anahtar kelime ve açıklamada aransın, Türkçe ekler tanınsın; sonra tekrar test | Y | D (prototip) |

**Hipotez:** Eğer arama çok kelimeli sorguları kelime kelime ve eklerden bağımsız ararsa, hizmeti bulma süresi kısalır; çünkü kullanıcı ihtiyacını birden fazla kelimeyle yazıyor ve bu sorgular şu an sonuçsuz kalıyor.

**Baseline:** yok, ilk hafta ölçülür.

**Doğrulanmadı, bir sonraki testte sorulacak:**
- "Fatura" yazıp sonuçları gördüğünde hangisine dokundun, neden onu seçtin?
- Faturanı ödemek için uygulamada ilk nereye bakardın?

**Görüşme kartında eksik:** başarı, süre, 1–7 kolaylık, takıldığı an.

---

## Paylaşım cümlesi

Ana metriğimiz hizmeti bulma süresi. İnsanın süresi görüşme kartına girilmedi; Claude üç yapay oturumda 18–30 saniye arasında tahmin etti, ölçmedi. İlk aksiyonumuz çok kelimeli aramayı düzeltmek, çünkü insan da replay de aynı yerde takıldı: "su faturası" araması sonuç vermedi.
