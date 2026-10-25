# Ölçüm planı

Ana metrik hizmeti bulma süresi; moderasyonlu testte bugün ölçülebilir. Metrikler ekibin handbook kütüphanesinden değil, outsiders-metric-coach skill'inin yedek kütüphanesinden seçildi, çünkü handbook linki verilmedi. Persona verilmedi; kullanıcı tanımı HMW'den alındı.

## 1. Problem

Kullanıcı hizmeti bulamıyor ya da geç buluyor. Bu planda kullanıcı araştırması yok; problem HMW'den ve outsider design review'dan alıntılanıyor.

**HMW** (ekibin HMW'si, 24 Ekim 2026'da paylaşıldı):

> "Arayüzü karışık bulup yine de kullanmaya devam eden kullanıcının, aradığı hizmeti kısa sürede bulma ihtiyacını, hizmetler uygulamanın içinde kayboluyor gerçeğine rağmen nasıl karşılayabiliriz"

**Outsider design review** (İstanbul Senin Prototipi-2, 24 Ekim 2026):

> "Birden fazla kelimeli aramalar sonuç vermiyor. 'fatura' İSKİ'yi buluyor ama 'su faturası' sonuçsuz kalıyor."

> "Başlık tüm uygulamaları vaat ediyor ama ekranda ana sayfadaki 8 kategori kartı tekrar ediyor. Uygulama listesi yok."

**Karar cümlesi** (handoff, Bölüm 1): Uygulamaları 8 kategoride grupladık, çünkü 69 uygulama tek düz listede taranamıyor. Resmi logoları kullandık, çünkü kullanıcı uygulamayı logosuyla tanıyor.

## 2. Seçilen metrikler

Bir ana, iki destek ve bir guardrail metriği seçildi. Ana metrik bir outcome ve test oturumunda bugün ölçülebiliyor; zamana yayılan canlı metrik destek olarak kaldı.

| Rol | Metrik | Neden |
| --- | --- | --- |
| Ana | Hizmeti bulma süresi | HMW doğrudan "kısa sürede bulma" ihtiyacını soruyor. Kullanıcının hizmeti bulup açması bir sonuç; süre moderasyonlu testte bugün ölçülüyor. |
| Destek | Yardımsız bulma oranı (görev başarısı) | Süre yalnızca bulabilenlerde ölçülür. HMW'deki "hizmetler kayboluyor" gerçeği, hiç bulamayan kullanıcıyı da görmeyi gerektiriyor. |
| Destek | Hizmete ulaşma oranı (canlı) | Testteki sonucun gerçek kullanımda sürüp sürmediğini gösterir. Zamana yayıldığı için ana metrik olamaz. |
| Guardrail | Yanlış hizmeti açma oranı | Daha hızlı bulma, kullanıcının benzer adlı ya da aynı kategorideki yanlış uygulamaya dokunmasıyla gelebilir. Arama açıklama ve anahtar kelimede de eşleştiği için (karar cümlesi) bu risk artıyor. |

**Elenen aday:** İlk tıklama doğruluğu. "%20 düşse ne yapardım?" sorusuna verdiği aksiyon (kategori adlarını gözden geçirmek) bulma süresi kartındaki aksiyonla aynı. Bu yüzden ayrı metrik yerine, sürenin nedenini anlamak için testte not alınacak (Bölüm 4).

## 3. Metrik kartları

Baseline ve hedef hiçbir kaynakta yok; dört kartta da sayı yerine kuralın cümlesi yazıldı. Süre ve hata gibi düşmesi iyi olan metriklerde "%20 düşse" sorusu "%20 kötüleşse" diye okunmalı.

**Ana · Hizmeti bulma süresi**

| # | Alan | İçerik |
| --- | --- | --- |
| 1 | Metrik adı | Hizmeti bulma süresi |
| 2 | Rol | Ana |
| 3 | Tanım | Kullanıcı Ana Sayfa'dan başlayıp kendisine söylenen hizmeti buldu ve açtı |
| 4 | Formül | Başarılı denemelerde görevin başlamasından doğru uygulamanın açılmasına kadar geçen sürenin medyanı (saniye) |
| 5 | Veri kaynakı | Moderasyonlu test oturumu kaydı |
| 6 | Baseline | baseline yok, ilk hafta ölçülür |
| 7 | Hedef / eşik | baseline ölçüldükten sonra belirlenecek |
| 8 | %20 kötüleşse ne yapardım? | Oturum kayıtlarında zamanın nerede geçtiğine bakarım. Aramadaysa çok kelimeli eşleşmeyi ve anahtar kelimeleri düzeltirim; kategoride gezinmedeyse kategori adlarını ve o hizmetin kategorisini kart sıralama testiyle yeniden kontrol ederim. |

**Destek · Yardımsız bulma oranı**

| # | Alan | İçerik |
| --- | --- | --- |
| 1 | Metrik adı | Yardımsız bulma oranı |
| 2 | Rol | Destek |
| 3 | Tanım | Kullanıcı hizmeti moderatörden ipucu almadan buldu ve açtı |
| 4 | Formül | Yardımsız tamamlanan görev / başlanan görev |
| 5 | Veri kaynakı | Moderasyonlu test oturumu |
| 6 | Baseline | baseline yok, ilk hafta ölçülür |
| 7 | Hedef / eşik | baseline ölçüldükten sonra belirlenecek |
| 8 | %20 düşse ne yapardım? | Hangi görevlerde başarısız olunduğuna bakarım. Aynı hizmette tekrarlıyorsa o hizmetin kategorisini ve arama anahtar kelimelerini değiştiririm; bütün görevlerde düştüyse kategori yapısını geri alırım. |

**Destek · Hizmete ulaşma oranı (canlı)**

| # | Alan | İçerik |
| --- | --- | --- |
| 1 | Metrik adı | Hizmete ulaşma oranı |
| 2 | Rol | Destek |
| 3 | Tanım | Kullanıcı Ana Sayfa'yı açtığı oturumda en az bir uygulama açtı |
| 4 | Formül | En az bir `app_opened` olan oturum / `home_viewed` olan oturum |
| 5 | Veri kaynakı | Analytics event'leri |
| 6 | Baseline | baseline yok, ilk hafta ölçülür |
| 7 | Hedef / eşik | baseline ölçüldükten sonra belirlenecek |
| 8 | %20 düşse ne yapardım? | Uygulama açmadan biten oturumlarda son adıma bakarım: sonuçsuz aramada bitiyorsa aramayı, kategori ekranında bitiyorsa kategori listesini düzeltirim. Düşüş yalnız bir platformda ya da sürümdeyse oradaki hatayı ararım. |

**Guardrail · Yanlış hizmeti açma oranı**

| # | Alan | İçerik |
| --- | --- | --- |
| 1 | Metrik adı | Yanlış hizmeti açma oranı |
| 2 | Rol | Guardrail |
| 3 | Tanım | Kullanıcı aradığı hizmet yerine başka bir uygulamayı açtı |
| 4 | Formül | Testte: en az bir yanlış uygulama açılan görev / başlanan görev. Canlıda: açıldıktan sonra \[SÜRE\] saniye içinde kapatılan `app_opened` / tüm `app_opened` |
| 5 | Veri kaynakı | Moderasyonlu test oturumu; lansmandan sonra analytics |
| 6 | Baseline | baseline yok, ilk hafta ölçülür |
| 7 | Hedef / eşik | baseline ölçüldükten sonra belirlenecek |
| 8 | %20 kötüleşse ne yapardım? | Hangi uygulama çiftlerinin karıştığına bakarım. Arama sonucundan geliyorsa açıklama ve anahtar kelime eşleşmesinin ağırlığını düşürürüm; kategoriden geliyorsa benzer uygulamaların açıklamalarını ayırt edici yazarım. |

## 4. Ölçüm yöntemi

Üç metrik aynı moderasyonlu test oturumunda ölçülür; canlı metrikler lansmandan sonra analytics'ten gelir. Testteki görevler aşağıdaki Test görevleri bölümünde. Katılımcı sayısı açık soru.

| Metrik | Yöntem | Gereken event'ler | Ne zaman bakılacak | Nedeni nereden öğreneceğiz |
| --- | --- | --- | --- | --- |
| Hizmeti bulma süresi | Moderasyonlu test, prototip üzerinde, görev bazlı | Test kaydında görev başlangıcı ve doğru uygulamanın açılması; prototipte `task_started`, `app_opened` | Test günü | Think-aloud kaydı. Moderatör her görevde ilk dokunuşu (kategori, arama, kısayol) ve doğru olup olmadığını not eder |
| Yardımsız bulma oranı | Aynı moderasyonlu test | Test kaydı; moderatörün verdiği ipuçları not tablosunda | Test günü | Görev sonrası açık uçlu soru: "Hizmetin nerede olmasını bekliyordun?" |
| Hizmete ulaşma oranı | Analytics | `home_viewed`, `app_opened`, `search_no_results`, `category_opened` | Lansmandan 1 hafta sonra (baseline), sonra her sprint sonunda | Uygulama açmadan biten oturumların son adımı, destek talepleri, Canlı Destek konuşmaları |
| Yanlış hizmeti açma oranı | Testte moderatör notu; canlıda analytics | `app_opened` (`source`, `position`), `app_closed` (`seconds_open`) | Test günü; lansmandan 1 hafta sonra | Think-aloud; yanlış açılan uygulamanın hangi sonuçtan ve kaçıncı sıradan geldiği (`source`, `position`) |

### Test görevleri

Görevler ekipten geldi. Prototipteki aramada denendiğinde iki görevde de doğal yazılacak çok kelimeli sorgu sonuçsuz kalıyor; bu, bulma süresini ve yardımsız bulma oranını doğrudan etkiler.

|  | Görev 1 | Görev 2 |
| --- | --- | --- |
| Katılımcıya okunan metin | "Su faturanı ödemek isteyen bir kullanıcısın. İstanbul Senin uygulamasında İSKİ uygulamasını bul." | "İstanbul Senin uygulamasında üniversite bursuna başvuracaksın. Uygulamanın adını tam olarak bilmiyorsun." |
| Başarı ölçütü | İSKİ açıldı | Genç Üniversiteli açıldı |
| Yanlış açma sayılacaklar | Askıda Fatura, İGDAŞ, Hamidiye Su | Sen Oku Diye, İBB Yurt, Gençliğimiz Var |
| Beklenen yollar | Arama › "iski" ya da Su & Enerji › İSKİ (listede 1.) | Arama › "üniversite" ya da "burs"; Kategori › Eğitim & Gençlik › Genç Üniversiteli (12 uygulamanın 7.'si) |
| Prototipte arama | "iski" → İSKİ. "fatura" → Askıda Fatura en üstte, İSKİ 2. sırada. "su" → Otobüsüm Nerede, Hamidiye Su ve Kapsül İSKİ'nin önünde. "su faturası" → sonuç yok | "üniversite" → Genç Üniversiteli. "burs" → Genç Üniversiteli ve Sen Oku Diye eşit puanla. "üniversite burs", "burs başvurusu" → sonuç yok |
| Hangi metriği zorlar | Yanlış hizmeti açma ("fatura" arayan Askıda Fatura'yı açabilir) | Yardımsız bulma ve bulma süresi (doğal sorgu sonuçsuz) |

**Görev metinleri hakkında not:**

- Görev 1 uygulamanın adını veriyor. Katılımcı "iski" yazıp tek adımda bulabilir; bu, HMW'deki ihtiyacından yola çıkarak bulmayı değil, adı bilinen uygulamayı bulmayı ölçer. İhtiyaç üzerinden ölçmek için alternatif: "Su faturanı ödemek istiyorsun. Bunu yapabileceğin uygulamayı bul."
- Görev 2'nin metninde yazım düzeltildi ("başvurucaksın" → "başvuracaksın"). Başarı ölçütü Genç Üniversiteli; Sen Oku Diye okul öğrencilerine yönelik olduğu için yanlış açma sayıldı. Bu eşleşme ürün ekibiyle doğrulanmalı.

## 5. Tracking plan

Dört metrik için 6 event gerekiyor. `task_started` yalnızca test aracında kullanılır; diğer 5 event handoff'taki event tablosuyla aynı adlarda ve özelliklerde.

| Event adı | Tetikleyici | Özellikler (properties) | Hangi metrik için | Ekran / adım | Not |
| --- | --- | --- | --- | --- | --- |
| `task_started` | Moderatör ya da test aracı görevi başlattığında | `task_id`, `participant_id` | Bulma süresi, yardımsız bulma, yanlış açma (test) | Ana Sayfa | Yalnızca prototip ve test aracında; ürüne girmez |
| `home_viewed` | Ana Sayfa görünür olduğunda | `shortcut_count` | Hizmete ulaşma oranı | Ana Sayfa | Oturum başına ilki sayılır |
| `app_opened` | Herhangi bir yerden uygulama açıldığında | `app_id`, `category_id`, `source` (shortcut, category, search, discover, help), `position`, `task_id` (yalnız testte) | Bulma süresi, yardımsız bulma, hizmete ulaşma, yanlış açma | Ana Sayfa, Kategori, Arama | Testte doğru uygulama `task_id` ile eşleştirilir |
| `app_closed` | Açılan uygulamadan İstanbul Senin'e dönüldüğünde | `app_id`, `seconds_open` | Yanlış hizmeti açma oranı (canlı) | Uygulamadan dönüş | Uygulama açılışı tanımsız olduğu için tetikleyici doğrulanmalı |
| `category_opened` | Kategori ekranı açıldığında ya da çiple değiştiğinde | `category_id`, `source` (home, all\_apps, search, chip) | Hizmete ulaşma oranı (nedeni) | Kategori | Uygulama açmadan biten oturumun son adımını gösterir |
| `search_no_results` | Sonuçsuz arama göründüğünde | `query_length`, `word_count` | Hizmete ulaşma oranı (nedeni) | Arama | `word_count` özelliği review'daki çok kelimeli arama sorununu izler |

## 6. Hipotez

> **Eğer** 69 uygulamayı resmi logolarıyla 8 kategoride toplar ve aramayı adın yanında anahtar kelime ve açıklamada da yaparsak, **hizmeti bulma süresi** kısalır, **çünkü** HMW'ye göre hizmetler uygulamanın içinde kayboluyor ve kullanıcı uygulamayı adı yerine logosundan ve ihtiyacını anlatan kelimeden tanıyor.

Bu sırada yanlış hizmeti açma oranının artmaması bekleniyor.

## 7. Açık sorular ve varsayımlar

- [ ] Ekibin UX başarı metrikleri handbook linki nedir? Plan yedek kütüphaneyle yazıldı; handbook farklı bir tanım kullanıyorsa metrik adları güncellenmeli.
- [ ] Persona nedir? Metrik seçimini değiştirmediği için plan HMW'deki kullanıcı tanımıyla yazıldı; katılımcı seçimi için gerekiyor.
- [ ] Testte kaç katılımcı olacak? Görev 1 adı verilen haliyle mi, ihtiyaç üzerinden yazılmış alternatifiyle mi kullanılacak?
- [ ] Canlıda "yanlış açma" için \[SÜRE\] eşiği ne olacak? İlk hafta `seconds_open` dağılımına bakılarak belirlenebilir.
- [ ] `app_closed` tetiklenebilir mi? Uygulamaya dokununca ne olduğu handoff'ta tanımsız.
- [ ] Varsayım: Ölçülen değişiklik prototipin tamamı (kategori yapısı, logolar, arama). Tek bir değişikliğin etkisini ayırmak için A/B ya da mevcut uygulamayla karşılaştırmalı test gerekir.
- [ ] Çözüldü: Handoff Bölüm 7 bu planla uyumlu. Guardrail yanlış hizmeti açma oranı; sonuçsuz arama, Canlı Destek'e gitme ve geri çıkarılan kısayol orada izleme göstergesi olarak duruyor.
