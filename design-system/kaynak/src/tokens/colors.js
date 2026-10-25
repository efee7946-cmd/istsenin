// Renk token'larının TEK KAYNAĞI.
// Bir değeri burada değiştir → scripts/build-tokens.mjs tokens.css'i yeniden üretir → tüm kütüphane güncellenir.
// Kaynak: İstanbul Senin uygulamasının ekran görüntüleri (magenta başlık, turkuaz aktif ikon, gri liste zemini).

export const colors = {
  // Aksiyon
  'action.primary':          { light: '#C8105E', dark: '#D81B6A', usage: 'Birincil buton, seçili çip, aktif kontrol' },
  'action.primary-hover':    { light: '#B00D53', dark: '#E23C80', usage: 'Birincil aksiyonun hover hâli' },
  'action.primary-pressed':  { light: '#940B46', dark: '#B8155A', usage: 'Birincil aksiyonun basılı hâli' },
  'action.primary-subtle':   { light: '#FCE8F1', dark: '#3A1628', usage: 'İkincil buton hover zemini, vurgulu satır' },
  'action.on-primary':       { light: '#FFFFFF', dark: '#FFFFFF', usage: 'Birincil zemin üstündeki metin ve ikon' },
  'action.danger':           { light: '#D1242F', dark: '#F0525C', usage: 'Geri alınamaz işlemler (sil, iptal et)' },
  'action.danger-hover':     { light: '#B01E28', dark: '#F36B73', usage: 'Tehlikeli aksiyonun hover hâli' },

  // Vurgu
  'accent.active':           { light: '#10CFD6', dark: '#2ED8DE', usage: 'Alt menüde aktif sekme ikonu' },
  'accent.avatar':           { light: '#00E3E3', dark: '#00C9C9', usage: 'Profil avatarı zemini' },

  // Metin
  'text.primary':            { light: '#1F2430', dark: '#F2F3F7', usage: 'Başlık ve gövde metni' },
  'text.secondary':          { light: '#6B7280', dark: '#A3A9B6', usage: 'Açıklama, alt başlık, yardımcı metin' },
  'text.disabled':           { light: '#A6AFBF', dark: '#5C6372', usage: 'Pasif metin ve ikon, pasif alt menü' },
  'text.inverse':            { light: '#FFFFFF', dark: '#1F2430', usage: 'Koyu zemin üstündeki metin (toast, tooltip)' },
  'text.link':               { light: '#C8105E', dark: '#F27AAB', usage: 'Bağlantı ve “Tümü ›” gibi metin aksiyonları' },
  'text.on-brand':           { light: '#FFFFFF', dark: '#FFFFFF', usage: 'Magenta başlık üstündeki metin' },

  // Yüzey
  'surface.default':         { light: '#FFFFFF', dark: '#181B22', usage: 'Sayfa ve beyaz tabaka (sheet)' },
  'surface.subtle':          { light: '#F1F2F7', dark: '#20242D', usage: 'Gri başlık alanı, input zemini' },
  'surface.raised':          { light: '#FFFFFF', dark: '#242833', usage: 'Kart, alt sayfa (bottom sheet)' },
  'surface.brand':           { light: '#C8105E', dark: '#9E0C4A', usage: 'Magenta üst başlık' },
  'surface.hover':           { light: '#F6F7FA', dark: '#2A2F3A', usage: 'Liste satırı hover' },
  'surface.pressed':         { light: '#ECEEF3', dark: '#323845', usage: 'Liste satırı basılı' },
  'surface.inverse':         { light: '#1F2430', dark: '#F2F3F7', usage: 'Toast, seçili koyu çip' },

  // Kenarlık
  'border.default':          { light: '#E6E8EE', dark: '#2F3440', usage: 'Ayraç çizgisi, kart kenarı' },
  'border.strong':           { light: '#C5CAD3', dark: '#4A505C', usage: 'Checkbox, radio, input kenarı' },
  'border.focus':            { light: '#C8105E', dark: '#F27AAB', usage: 'Klavye odağı çerçevesi' },
  'border.focus-ring':       { light: '#F4B6D0', dark: '#6B2547', usage: 'Odak halkasının yumuşak dış katmanı' },

  // Geri bildirim
  'feedback.success':        { light: '#157A4C', dark: '#4CC38A', usage: 'Başarılı işlem, “Kaydedildi”' },
  'feedback.success-subtle': { light: '#E3F4EB', dark: '#15352A', usage: 'Başarı uyarısı zemini' },
  'feedback.warning':        { light: '#B4530B', dark: '#F0A35E', usage: 'Dikkat gerektiren durum' },
  'feedback.warning-subtle': { light: '#FFF1E3', dark: '#3A2715', usage: 'Uyarı zemini' },
  'feedback.error':          { light: '#D1242F', dark: '#F26B73', usage: 'Hata, hatalı alan' },
  'feedback.error-subtle':   { light: '#FDECEC', dark: '#3D1A1D', usage: 'Hata uyarısı zemini' },
  'feedback.info':           { light: '#1C5DA8', dark: '#6AA6EC', usage: 'Bilgilendirme' },
  'feedback.info-subtle':    { light: '#E6F0FB', dark: '#172B42', usage: 'Bilgi uyarısı zemini' },

  // Uygulama kategorileri (Tüm Uygulamalar)
  'category.ulasim':         { light: '#1C5DA8', dark: '#7FB0EC', usage: 'Ulaşım & Trafik' },
  'category.ulasim-subtle':  { light: '#E6F0FB', dark: '#1A2A3F', usage: 'Ulaşım ikon zemini' },
  'category.sosyal':         { light: '#B00E54', dark: '#F27AAB', usage: 'Sosyal Destek' },
  'category.sosyal-subtle':  { light: '#FCE8F1', dark: '#3A1628', usage: 'Sosyal Destek ikon zemini' },
  'category.egitim':         { light: '#5B3FB5', dark: '#A893F0', usage: 'Eğitim & Kariyer' },
  'category.egitim-subtle':  { light: '#EEE9FB', dark: '#2A2342', usage: 'Eğitim ikon zemini' },
  'category.kultur':         { light: '#A85400', dark: '#F2A65E', usage: 'Kültür, Spor & Etkinlik' },
  'category.kultur-subtle':  { light: '#FFF0E0', dark: '#3A2915', usage: 'Kültür ikon zemini' },
  'category.saglik':         { light: '#0B7169', dark: '#5CCBC2', usage: 'Sağlık & Acil' },
  'category.saglik-subtle':  { light: '#E2F6F4', dark: '#14332F', usage: 'Sağlık ikon zemini' },
  'category.sehir':          { light: '#454B57', dark: '#B4BAC6', usage: 'Şehir & Katılım' },
  'category.sehir-subtle':   { light: '#ECEEF2', dark: '#2A2E37', usage: 'Şehir ikon zemini' },
  'category.kesfet':         { light: '#7F6200', dark: '#E3C356', usage: 'Keşfet & Eğlence' },
  'category.kesfet-subtle':  { light: '#FFF7D6', dark: '#352D12', usage: 'Keşfet ikon zemini' },
};

export const colorGroups = {
  action: 'Aksiyon', accent: 'Vurgu', text: 'Metin', surface: 'Yüzey', border: 'Kenarlık',
  feedback: 'Geri bildirim', category: 'Uygulama kategorileri',
};
