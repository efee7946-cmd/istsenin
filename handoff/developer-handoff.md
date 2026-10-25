# İstanbul Senin · Ana Sayfa ve Tüm Uygulamalar — Developer Handoff

Oct 24, 2026 · @efe

## 1. Amaç ve kararlar

Kullanıcı aradığı İBB hizmetini kategoriden, aramadan ya da kısayoldan bulup açar. Kapsam: Ana Sayfa, Tüm Uygulamalar, Kategori, Arama ekranları ve Canlı Destek paneli. Bu ekranlarda 69 uygulama 8 kategoride listeleniyor.

**HMW:** Arayüzü karışık bulup yine de kullanmaya devam eden kullanıcının, aradığı hizmeti kısa sürede bulma ihtiyacını, hizmetler uygulamanın içinde kayboluyor gerçeğine rağmen nasıl karşılayabiliriz?

Kaynak: `İstanbul Senin Prototipi-2.html` (tıklanabilir prototip) ve 24 Ekim 2026 tarihli outsider design review. Ekran görüntüsü ve persona bu belgeye girdi olarak verilmedi. Bu yüzden aşağıdaki gerekçeler prototipte görülenle sınırlı, kullanıcı araştırmasıyla doğrulanmadı (bkz. Açık sorular).

**Kararlar**

- **Uygulamaları 8 kategoride grupladık, çünkü** 69 uygulama tek düz listede taranamıyor. Her kategori kartı içindeki uygulama sayısını da gösteriyor.
- **Uygulamalarda resmi logoyu kullandık, çünkü** kullanıcı uygulamayı mağazadan ve istanbulsenin.istanbul sitesinden bu logoyla tanıyor (heuristic 6: hatırlamak yerine tanımak). Logolar istanbulsenin.istanbul/uygulamalarimiz sayfasından alındı.
- **Canlı Destek'i uygulama listesinden çıkarıp Yardım bölümüne ve her ekranın sağ üstüne koyduk, çünkü** o bir uygulama değil, her ekranda gereken bir destek yolu.
- **Aramayı uygulama adına ek olarak anahtar kelimede ve açıklamada da yaptık, çünkü** kullanıcı hizmeti adıyla değil ihtiyacıyla arıyor ("vapur" yazınca Şehir Hatları çıkıyor).
- **Kısayolları en fazla 4 ile sınırladık, çünkü** 4 sütunluk satır ana sayfada tek satıra sığıyor. Bu sınırın gerekçesi prototipte yazmıyor; ürün ekibiyle doğrulanmalı.

## 2. Bileşenler

Ekranlarda 8 Senin UI bileşeni kullanılıyor. Buna ek olarak prototipe özel 6 parça var; bunların Senin UI'da karşılığı yok. Bileşen ve state adları prototipteki Senin UI sınıflarından alındı. Her bileşen hover, pressed ve focus-visible state'lerini Senin UI'daki gibi taşır.

**Senin UI bileşenleri**

| Bileşen | Varyant | State'ler | Nerede | Ölçü |
| --- | --- | --- | --- | --- |
| `is-search` | `--on-brand` | default, hover, focus | Ana Sayfa başlığı, Arama çubuğu | Yükseklik `--size-control-md` (50px) |
| `is-search` | `--on-surface` | default, hover | Tüm Uygulamalar ("69 uygulamada ara") | 50px |
| `is-button` | `--tertiary --sm` | default, hover, pressed | "Düzenle / Bitti", "Tüm Uygulamalar", "Vazgeç" | 40px yükseklik; başlık satırında 36px |
| `is-button` | `--secondary --sm` | default, hover, pressed | "Canlı Destek'e yaz" (yardım kartı) | 40px |
| `is-button` | `--secondary` | default, hover, pressed | "Canlı Destek'e sor" (sonuçsuz arama) | 50px |
| `is-button` | `--primary --full`, `--secondary --full` | default, hover, pressed | Canlı Destek paneli | 50px, tam genişlik |
| `is-catcard` | `--tile` | default, hover, pressed | Ana Sayfa kategori ızgarası (4 sütun) | min. 96px yükseklik |
| `is-catcard` | `--row` | default, hover, pressed | Tüm Uygulamalar listesi | 48px karo |
| `is-chip` | default ve `--sm` | default, selected, hover, pressed | Kategori geçiş şeridi (38px), Keşfet sekmeleri ve arama önerileri (32px) | 38px / 32px |
| `is-row` | `--divider` | default, hover, pressed | Uygulama satırları, Yardım kutusu | 52px logo, 48px ikon karosu |
| `is-badge` | `--label --brand` | — | "En iyi eşleşme" | 24px |
| `is-badge` | `--count --brand --outlined` | — | Sohbet sekmesindeki sayı | 20px |
| `is-nav` | tab, scan | active, default | Alt menü | 86px yükseklik; QR butonu 64px |
| `is-alert` | `--info` | — | "Aradığını bulamadın mı?" kartı | tam genişlik |

**Senin UI'da karşılığı olmayan parçalar** (karar gerekiyor, bkz. Açık sorular)

| Parça | Nerede | Prototipteki ölçü |
| --- | --- | --- |
| Logo karosu | Uygulama satırları, kısayollar, Keşfet kartı | 48 / 52 / 56 / 68px kare, köşe `--radius-lg`, 1px `--border-default` çerçeve |
| Kısayol hücresi | Ana Sayfa, 4 sütun | 56px karo + 13px/700 ad |
| Keşfet kartı | Ana Sayfa yatay kaydırma | 280px genişlik, 118px görsel alan |
| Toast | Tüm ekranlar | Alt menünün 104px üstü, en fazla 340px |
| Alt panel (bottom sheet) | Canlı Destek | Tam genişlik, üst köşe `--radius-2xl` |
| Ekran başlığı | Magenta (Ana Sayfa), gri (Tüm Uygulamalar, Kategori) | Geri ve kulaklık ikon butonları 44px |

**Token'lar**

Renkler `--action-*`, `--text-*`, `--surface-*`, `--border-*`, `--feedback-*` ve `--category-<ad>` / `--category-<ad>-subtle` token'larına bağlı. Kategori token'ları: `ulasim`, `enerji`, `sosyal`, `egitim`, `kultur`, `saglik`, `sehir`, `kesfet`. Yazılar `--type-*` token'larına bağlı, font Mulish.

Token'a bağlı olmayan değerler:

- `--category-enerji` ve `--category-enerji-subtle` Senin UI'da yok. Prototipteki not, bunların sisteme eklenmesi gereken yeni token'lar olduğunu söylüyor.
- Logo karosunun zemini sabit `#fff`.
- Alt panel karartması sabit `rgba(15,17,22,.5)`.
- Sahne token'ları (`--stage-bg`, `--stage-ink`, `--frame`) yalnızca prototip çerçevesine ait, ürüne taşınmayacak.
- Bazı yazılar sabit px ile verilmiş: hücre adı 13px/700, kart başlığı 16px, ekran başlığı 20px.

## 3. State'ler

Prototipte 9 state tanımlı. Yükleniyor ve hata state'leri hiçbir ekranda yok; bu ikisi Eksikler'de.

| Ekran | State | Ne görünür | Metin (son hali) |
| --- | --- | --- | --- |
| Ana Sayfa | Normal | Selam, arama kutusu, Kısayollarım (en fazla 4), 8 kategori kartı, Keşfet sekmeleri ve kartları, Yardım kutusu | "Merhaba \[AD\]", "İstanbul Senin'de ara" |
| Ana Sayfa | Kısayol yok / 4'ten az | Dolu hücrelerden sonra kesik çizgili "+" hücresi; dokununca Tüm Uygulamalar açılır | "Kısayol ekle" |
| Ana Sayfa | Düzenleme modu | Karolar sallanır, her hücrede "−" rozeti; buton "Bitti" olur | "Düzenle" / "Bitti" |
| Kategori | Kısayol sınırı dolu | 5. yıldıza dokununca toast çıkar, ekleme yapılmaz | "En fazla 4 kısayol ekleyebilirsin. Önce birini çıkar." |
| Kategori | Normal | Başlık, kategori çip şeridi (seçili çipte sayı), alt yazı, yıldızlı uygulama listesi | Kategori alt yazıları prototipteki gibi |
| Arama | Boş sorgu | "Şunları dene" çipleri (vapur, fatura, bebek, otopark, eczane, yurt) ve kategori çipleri | "Hizmet ya da kelime ara" |
| Arama | Sonuç var | İlk satırda "En iyi eşleşme" rozeti, diğerlerinde yıldız. Eşleşme açıklamadan ya da anahtar kelimeden geldiyse üstte not çıkar | "Açıklamalarda ve anahtar kelimelerde de aradık" |
| Arama | Sonuç yok | Başlık, açıklama, Canlı Destek butonu | "“\[SORGU\]” için sonuç bulamadık" · "Başka bir kelimeyle ara ya da bize sor!" · "Canlı Destek'e sor" |
| Tüm ekranlar | Canlı Destek paneli | Karartma ve alt panel, iki buton | "Temsilciye yaz" · "Acil numaraları gör" |

**Tanımlı olmayan state'ler**

- Yükleniyor: uygulama listesi, logolar, arama sonuçları.
- Hata: liste gelmedi, uygulama açılamadı, çevrimdışı.
- Boş kategori.
- Kısayol hiç yokken açıklama metni. Şu an yalnızca "Kısayol ekle" hücresi görünüyor.

"Merhaba \[AD\]" metnindeki ad kullanıcı verisinden gelir. Prototipte "Efe" yazıyor.

## 4. Uç durumlar

Prototipte 375px genişlikte bakılan 9 uç durumun 5'i doğru çalışıyor, 2'si düzeltilmeli, 1'i tanımsız (0 kısayol), 1'i (1 ve 200 öğe) test edilmedi.

| Durum | Prototipte gözlenen | Beklenen davranış |
| --- | --- | --- |
| Uzun uygulama adı (kısayol) | "Kemerburgaz Kent Ormanı", "Katılımcı Bütçe Projesi": ad iki satıra iniyor, dört hücre de 121px yükseklikte eşit kalıyor | Aynı kalsın. İki satırı aşan ad için kural yok, bkz. Açık sorular |
| Uzun uygulama adı ve açıklama (liste) | Başlık ve açıklama satır içinde kaydırılıyor, yıldız sağda sabit | Aynı kalsın |
| Uzun kategori başlığı | "Kültür, Spor & Etkinlik" geri ve kulaklık ikonları arasında tek satıra sığıyor (218px, 26px yükseklik) | Aynı kalsın |
| Uzun arama sorgusu (85 karakter) | Sonuçsuz arama başlığı 929px genişliğe çıkıyor, 375px ekranda iki yandan kesiliyor | **Düzeltilmeli:** başlık satır içinde kırılsın (`overflow-wrap:anywhere`) |
| Birden fazla kelimeli sorgu | "su faturası" ve "yol durumu" sonuçsuz; tek kelime "fatura" İSKİ'yi buluyor | **Düzeltilmeli:** sorgu kelimelere bölünsün, her kelime ad, anahtar kelime ve açıklamada ayrı aransın |
| Türkçe karakter ve büyük-küçük harf | "ispark", "ISPARK", "iski", "İSKİ" hepsi doğru sonucu buluyor | Aynı kalsın |
| Eksik logo | Logosu olmayan uygulamada kategori renginde ikon karosu gösteriliyor | Aynı kalsın |
| 0 kısayol | Yalnızca "Kısayol ekle" hücresi | Açıklama metni tanımlanmalı (State'ler) |
| 1 ve 200 öğeli liste | En kalabalık kategori 15 uygulama ve sorunsuz kayıyor. 1 ve 200 öğe test edilmedi | Bkz. Açık sorular |

Ekranlarda fiyat alanı olmadığı için "fiyatsız ürün" durumu bu ekranlara uygulanmıyor.

## 5. Etkileşimler

Prototipte bir uygulamaya dokununca uygulama açılmıyor, yalnızca "\[Uygulama adı\] açılıyor…" toast'ı çıkıyor. Gerçek açılış davranışı tanımsız (Açık sorular). Ekranlar sağdan sola kayarak açılır (0.32s), geri gidince ters yönde kapanır.

| Ekran | Dokunulan | Sonuç |
| --- | --- | --- |
| Ana Sayfa | Arama kutusu | Arama ekranı açılır, giriş alanı odaklanır |
| Ana Sayfa | Kısayol hücresi | Uygulamayı açar (prototipte toast) |
| Ana Sayfa | "Kısayol ekle" | Tüm Uygulamalar açılır |
| Ana Sayfa | "Düzenle" | Düzenleme modu açılır, buton "Bitti" olur |
| Ana Sayfa · düzenleme | Kısayol hücresi | Kısayol hemen silinir; toast: "Kısayollarından çıkardın: \[ad\]" |
| Ana Sayfa · düzenleme | "Bitti" | Normal moda döner |
| Ana Sayfa | "Tüm Uygulamalar" | Tüm Uygulamalar açılır |
| Ana Sayfa | Kategori kartı | O kategorinin ekranı açılır |
| Ana Sayfa | Keşfet sekmesi (Etkinlikler / Şehirden / Destekler) | Sekmenin kartları gösterilir |
| Ana Sayfa | Keşfet kartı | Bağlı uygulamayı açar. "Sana uygun desteğe başvur!" kartı Sosyal Destek kategorisini açar |
| Ana Sayfa | Yardım › Canlı Destek | Canlı Destek paneli açılır |
| Ana Sayfa | Yardım › Acil ve Kısa Numaralar | Uygulamayı açar (prototipte toast) |
| Alt menü | Ana Sayfa | Ana Sayfa'ya döner, sayfa en üste kayar |
| Alt menü | Sohbet, Ödeme, Profil, QR | Prototipte kapalı, toast çıkar. Gerçek hedefler bu belgenin kapsamı dışında |
| Tüm Uygulamalar | Geri | Ana Sayfa'ya döner |
| Tüm Uygulamalar | Kulaklık ikonu | Canlı Destek paneli açılır |
| Tüm Uygulamalar | Arama kutusu | Arama ekranı açılır |
| Tüm Uygulamalar | Kategori satırı | Kategori ekranı açılır |
| Tüm Uygulamalar | "Canlı Destek'e yaz" | Canlı Destek paneli açılır |
| Kategori | Kategori çipi | Aynı ekranda liste o kategoriye geçer, seçili çip ortaya kayar |
| Kategori | Uygulama satırı | Uygulamayı açar (prototipte toast) |
| Kategori | Boş yıldız | Kısayollara ekler; toast: "Kısayollarına ekledin: \[ad\]". 4 kısayol doluysa sınır toast'ı çıkar |
| Kategori | Dolu yıldız | Kısayollardan çıkarır; toast: "Kısayollarından çıkardın: \[ad\]" |
| Arama | Yazı girişi | Her harfte sonuçlar güncellenir |
| Arama | Öneri çipi | Kelime kutuya yazılır, sonuçlar gelir |
| Arama | Kategori çipi | Kategori ekranı açılır |
| Arama | "Vazgeç" | Bir önceki ekrana döner |
| Arama | "Canlı Destek'e sor" | Canlı Destek paneli açılır |
| Canlı Destek paneli | "Temsilciye yaz" | Panel kapanır, Canlı Destek açılır (prototipte toast) |
| Canlı Destek paneli | "Acil numaraları gör" | Panel kapanır, Acil ve Kısa Numaralar açılır (prototipte toast) |
| Canlı Destek paneli | Karartmaya dokunma ya da Escape | Panel kapanır |

Toast'lar 1.9 saniye görünür. Desteklenen cihazlarda uygulamaya dokununca 8ms titreşim verilir.

## 6. Erişilebilirlik

Açık temada kontrast iki yerde, koyu temada üç butonda WCAG AA'nın altında. Odak ve ekran okuyucu tarafında düzeltilmesi gereken 4 madde var. Ölçümler 1280px ve 375px genişlikte, iki temada yapıldı.

**Kontrast** (hedef: normal yazı 4.5:1, büyük yazı 3:1)

| Yer | Tema | Ölçülen | Yazı | İstenen |
| --- | --- | --- | --- | --- |
| `is-button--secondary` yazısı: "Canlı Destek'e yaz", "Canlı Destek'e sor", "Acil numaraları gör" | Koyu | 3.52:1 | 14–16px / 800 | ≥ 4.5:1. Öneri: koyu temada yazı rengi `--text-link` |
| `is-search--on-surface` yazısı "69 uygulamada ara" | Açık | 4.32:1 | 17px / 500 | ≥ 4.5:1. Öneri: kutuyu `--surface-default` zemine al |
| Alt menü pasif sekme ikonu (`--text-disabled`) | Açık | yaklaşık 2.2:1 | ikon | ≥ 3:1. Sekmenin yazı etiketi olduğu için düşük önem |

Bunların dışındaki bütün yazılar iki temada da 4.5:1'i geçiyor. Prototip çerçevesindeki tema butonu ve "Tıklanabilir prototip" rozeti ürüne taşınmayacak, bu yüzden ölçüme katılmadı.

**Dokunma alanı**

Hiçbir dokunma alanı 24×24px'in altında değil. En küçükleri 32px yüksekliğindeki `is-chip--sm` ve 40×40px yıldız butonu. Geri ve kulaklık ikon butonları 44×44px, QR butonu 64px.

**Etiketler ve odak**

| Ne | Şu an | İstenen |
| --- | --- | --- |
| İkon butonları | "Geri", "Canlı Destek", "QR kod okut" `aria-label`'ları var | Aynı kalsın |
| Yıldız butonu | `aria-pressed` + "Kısayollarına ekle" / "Kısayollarından çıkar" | Aynı kalsın |
| Kategori çipleri, Keşfet sekmeleri | `aria-pressed` var | Aynı kalsın |
| Toast | `role="status"`, `aria-live="polite"` | Aynı kalsın |
| Uygulama satırı | `div role="button"` içinde bir yıldız `button` (iç içe kontrol) | Satır ve yıldız kardeş iki ayrı kontrol olsun |
| Düzenleme modundaki kısayol hücresi | Adı "Kemerburgaz Kent Ormanı−" okunuyor; "Çıkar" etiketi bir `span` üzerinde ve okunmuyor | `aria-label="[ad] kısayolunu çıkar"` |
| Arkadaki ekranlar | Kategori açıkken Ana Sayfa'nın 28 butonu klavyeyle odaklanabiliyor | Arka ekranlar `inert` olsun |
| Canlı Destek paneli | `role="dialog"` var, `aria-modal` yok. Açılınca odak panele gidiyor, kapanınca açan butona dönmüyor | `aria-modal="true"`, kapanınca odak açan öğeye dönsün |
| Logo görselleri | `alt=""`; uygulama adı yanındaki yazıda | Aynı kalsın |

Hareket azaltma tercihi (`prefers-reduced-motion`) açıkken ekran geçişleri, panel, toast ve düzenleme modundaki sallanma kapanıyor.

## 7. Ölçüm planı

Ana metrik, HMW'deki "kısa sürede bulma" ihtiyacını ölçer: kullanıcı Ana Sayfa'ya geldikten sonra aradığı uygulamayı ne kadar sürede açıyor. Event adları bu belge için önerildi; mevcut analitik şemasıyla eşleştirilmeli. Hedef değerler için baz çizgi yok (Açık sorular).

**Ana metrik:** Hizmeti bulma süresi. `home_viewed` ile aynı oturumdaki ilk `app_opened` arasındaki sürenin medyanı, `source` kırılımıyla. Düşmesi beklenir.

**İkincil metrik:** Hizmete ulaşma oranı. `home_viewed` olan oturumların kaçında en az bir `app_opened` var. Süre yalnızca uygulama açan oturumlarda ölçüldüğü için bu oran onu tamamlıyor: bulamayıp çıkan kullanıcı burada görünür.

**Guardrail:** Yanlış hizmeti açma oranı. Açıldıktan sonra \[SÜRE\] saniye içinde kapatılan `app_opened` / tüm `app_opened`. Artmamalı. Daha hızlı bulma, yanlış uygulamaya dokunmanın artmasıyla gelebilir; bu metrik onu yakalar.

**İzleme göstergeleri.** Bunlar guardrail değil; ana metrik ya da hizmete ulaşma oranı kötüleşirse nedeni bulmak için bakılır.

- Sonuçsuz arama oranı: `search_no_results` / `search_performed`, `word_count` kırılımıyla.
- Canlı Destek'e gitme oranı: `live_support_opened` olan oturumlar / `home_viewed` olan oturumlar.
- Ekledikten sonra aynı oturumda geri çıkarılan kısayol oranı: `shortcut_removed` / `shortcut_added`. Yanlışlıkla silmeyi gösterir.

**Event tablosu**

| Event | Ne zaman | Parametreler |
| --- | --- | --- |
| `home_viewed` | Ana Sayfa görünür olduğunda | `shortcut_count` |
| `app_opened` | Herhangi bir yerden uygulama açıldığında | `app_id`, `category_id`, `source` (shortcut, category, search, discover, help), `position` |
| `app_closed` | Açılan uygulamadan İstanbul Senin'e dönüldüğünde | `app_id`, `seconds_open` |
| `category_opened` | Kategori ekranı açıldığında ya da çiple değiştiğinde | `category_id`, `source` (home, all\_apps, search, chip) |
| `all_apps_opened` | Tüm Uygulamalar açıldığında | `source` (header\_link, add\_shortcut) |
| `search_opened` | Arama ekranı açıldığında | `source` (home, all\_apps) |
| `search_performed` | Kullanıcı yazmayı bırakınca (bekleme süresi açık soru) | `query_length`, `word_count`, `result_count`, `match_type` (name, keyword, description), `from_suggestion` |
| `search_no_results` | Sonuçsuz arama göründüğünde | `query_length`, `word_count` |
| `shortcut_added` | Yıldızla kısayol eklendiğinde | `app_id`, `source` (category, search) |
| `shortcut_removed` | Yıldızla ya da düzenleme modunda kısayol çıkarıldığında | `app_id`, `source` (star, edit\_mode) |
| `shortcut_limit_hit` | 4 kısayol doluyken ekleme denendiğinde | `app_id` |
| `discover_card_opened` | Keşfet kartına dokunulduğunda | `tab`, `target` (uygulama ya da kategori kimliği) |
| `live_support_opened` | Canlı Destek paneli açıldığında | `source` (help\_section, header\_icon, all\_apps\_card, no\_results) |

Arama sorgusunun metni event'e eklenmedi, yalnızca uzunluğu var. Metnin toplanıp toplanmayacağı KVKK açısından açık soru.

Metrik kartları, ölçüm yöntemi ve hipotez ayrı sekmede: Ölçüm planı

## 8. Açık sorular

Geliştirme başlamadan 7 soru yanıtlanmalı, çünkü kapsamı değiştiriyorlar. Kalan 9 soru geliştirme sırasında yanıtlanabilir.

**Geliştirmeden önce**

- [ ] Persona nedir? Bölüm 1'deki kararlar HMW'ye göre okunmalı ve persona ile doğrulanmalı.
- [ ] Uygulamaya dokununca ne oluyor: uygulama içi mini uygulama, web görünümü, harici uygulama ya da mağaza? Prototipte yalnızca toast var.
- [ ] Senin UI'da karşılığı olmayan 6 parça (logo karosu, kısayol hücresi, Keşfet kartı, toast, alt panel, ekran başlığı) sisteme eklenecek mi, yoksa ürüne özel mi kalacak?
- [ ] `--category-enerji` token çifti Senin UI'a eklenecek mi?
- [ ] Tüm Uygulamalar ekranı kategori listesi mi kalacak, yoksa A–Z uygulama listesi mi olacak? Review bu ekranın başlığıyla içeriğinin uyuşmadığını buldu.
- [ ] Yükleniyor ve hata state'leri nasıl görünecek, metinleri ne olacak?
- [ ] Masaüstü ya da tablet düzeni var mı? Prototip masaüstünde 390×844px telefon çerçevesi gösteriyor, 760px'in altında tam ekrana geçiyor.

**Geliştirme sırasında**

- [ ] 4 kısayol sınırının gerekçesi ne? İki satırı aşan kısayol adı kısaltılacak mı?
- [ ] Düzenleme modunda yanlışlıkla silinen kısayol için geri alma eklenecek mi?
- [ ] Aramada ilk sonuçta yıldızın yerine "En iyi eşleşme" rozeti çıkıyor, bu yüzden en alakalı uygulama aramadan kısayola eklenemiyor. Bu bilinçli mi?
- [ ] Telefonun geri tuşu ve tarayıcı geçmişi ekran yığınına bağlanacak mı? Prototipte geri tuşu sayfadan çıkıyor.
- [ ] 1 öğeli ve 200 öğeli liste nasıl görünecek? Uzun listede sanallaştırma gerekiyor mu?
- [ ] `search_performed` için bekleme süresi ne olacak? Sorgu metni KVKK açısından toplanabilir mi?
- [ ] Ana metrik ve guardrail'ler için baz çizgi ve hedef değerler ne?
- [ ] Kapsül ve Ağaç A.Ş. açıklamaları kaynakla doğrulanamadı. Her Şey Yanımda hizmeti Vodafone tarafında kapanmış görünüyor; listede kalacak mı?
- [ ] Radar İstanbul'un adı 2024'te Radar Türkiye oldu. Hangi ad kullanılacak?

## Development-ready kontrol listesi

8 maddenin 2'si tam, 6'sı eksik. Bu haliyle belge geliştirmeye hazır değil. Önce "Geliştirmeden önce" soruları yanıtlanmalı ve aşağıdaki eksikler kapanmalı.

| # | Madde | Durum | Gerekçe |
| --- | --- | --- | --- |
| 1 | Tüm state'ler tanımlı mı? | Eksik | 9 state tanımlı; yükleniyor, hata, boş kategori ve 0 kısayol açıklaması yok |
| 2 | Her renk ve font token'a bağlı mı? | Eksik | `--category-enerji` Senin UI'da yok; logo zemini `#fff`, karartma `rgba(15,17,22,.5)` ve bazı yazı boyutları sabit değer |
| 3 | Metinler son halinde mi, placeholder var mı? | Eksik | Mevcut metinler son halinde; yükleniyor ve hata metinleri hiç yazılmadı; 2 uygulama açıklaması doğrulanmadı. "\[AD\]" ve "\[SORGU\]" kullanıcı verisi, placeholder sayılmadı |
| 4 | Uç durumlar yazılı mı? | Eksik | Uzun ad, uzun sorgu ve eksik logo yazılı; 1 ve 200 öğeli liste test edilmedi. Fiyat alanı olmadığı için fiyatsız ürün uygulanmıyor |
| 5 | Mobil ve masaüstü ölçüleri var mı? | Eksik | Mobil ölçüler var; masaüstü ya da tablet düzeni tanımsız |
| 6 | Kontrast, dokunma alanı ve etiketler tanımlı mı? | Tam | Ölçülen değerler ve istenen düzeltmeler Bölüm 6'da |
| 7 | Her etkileşimin sonucu yazılı mı? | Eksik | 31 etkileşim yazılı; uygulamaya dokununca ne olduğu ve alt menüdeki 4 hedef tanımsız |
| 8 | Ölçüm planı ve event adları var mı? | Tam | Ana metrik, 1 guardrail, 3 izleme göstergesi, 13 event tanımlı. Hedef değerler açık soru |

## Eksikler

- [ ] Yükleniyor state'i: uygulama listesi, logolar, arama sonuçları (madde 1)
- [ ] Hata state'leri: liste gelmedi, uygulama açılamadı, çevrimdışı. Metinler İstanbul Senin ses tonuyla yazılmalı (madde 1, 3)
- [ ] Boş kategori state'i ve 0 kısayol açıklama metni (madde 1, 3)
- [ ] `--category-enerji` token çifti Senin UI'a eklenmeli ya da mevcut bir token'a bağlanmalı (madde 2)
- [ ] Logo karosu zemini, alt panel karartması ve sabit px yazı boyutları token'a bağlanmalı (madde 2)
- [ ] Kapsül ve Ağaç A.Ş. açıklamaları doğrulanmalı (madde 3)
- [ ] 1 ve 200 öğeli liste davranışı tanımlanmalı (madde 4)
- [ ] Masaüstü ve tablet düzeni ya da "yalnızca mobil" kararı (madde 5)
- [ ] Uygulamaya dokununca ne olduğu ve alt menüdeki Sohbet, Ödeme, Profil, QR hedefleri (madde 7)
- [ ] Ana metrik ve guardrail'ler için hedef değerler (madde 8, eksik sayılmadı ama gerekli)

## v2 için değişiklikler

Kaynak: 1 gerçek kullanıcı görüşmesi + 3 yapay session replay (tahmin, veri değil). Yalnızca insanla doğrulanan bulgular aksiyona alındı. Karşılaştırmanın tamamı `İstanbul Senin - Analiz ve Aksiyon.md` dosyasında.

| Bulgu | Kanıt | Metrik | Aksiyon | Etki | Çaba |
| --- | --- | --- | --- | --- | --- |
| Çok kelimeli arama ("su faturası") sonuç vermiyor | İnsan: "su faturası ve benzeri için sonuç bulamadık" · Replay Oturum 1, 6–13. sn | Ana: hizmeti bulma süresi · Destek: yardımsız bulma oranı | Uygula: sorgu kelimelere bölünsün, her kelime ad, anahtar kelime ve açıklamada aransın, Türkçe ekler tanınsın; sonra tekrar test | Y | D (prototip) |

**Hipotez:** Eğer arama çok kelimeli sorguları kelime kelime ve eklerden bağımsız ararsa, hizmeti bulma süresi kısalır; çünkü kullanıcı ihtiyacını birden fazla kelimeyle yazıyor ve bu sorgular şu an sonuçsuz kalıyor.

**Baseline:** yok, ilk hafta ölçülür.

**Doğrulanmadı, bir sonraki testte sorulacak:**

- "Fatura" yazıp sonuçları gördüğünde hangisine dokundun, neden onu seçtin?
- Faturanı ödemek için uygulamada ilk nereye bakardın?

**Görüşme kartında eksik:** başarı, süre, 1–7 kolaylık, takıldığı an.
