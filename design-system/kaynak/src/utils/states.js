// Ortak state seti. Variants tab'ında zorla gösterilir (is-hover vb.), Preview'da gerçek etkileşimle de çalışır.
export const STATES = ['default', 'hover', 'pressed', 'focus', 'disabled'];
export const STATES_ERR = [...STATES, 'error'];
export const stateLabel = { default: 'Default', hover: 'Hover', pressed: 'Pressed', focus: 'Focus', disabled: 'Disabled', error: 'Error' };
export const stateVariants = (list = STATES, extra = {}) => ({
  group: 'State',
  items: list.map((s) => ({ label: stateLabel[s], props: { ...extra, state: s } })),
});

// Uygulama kategorileri: list-row, chip, category-card ortak kullanır
export const CATEGORIES = {
  none: { name: 'Yok', icon: 'grid' },
  ulasim: { name: 'Ulaşım & Trafik', short: 'Ulaşım', icon: 'bus' },
  sosyal: { name: 'Sosyal Destek', short: 'Sosyal Destek', icon: 'heart' },
  egitim: { name: 'Eğitim & Kariyer', short: 'Eğitim', icon: 'cap' },
  kultur: { name: 'Kültür, Spor & Etkinlik', short: 'Kültür & Spor', icon: 'ticket' },
  saglik: { name: 'Sağlık & Acil', short: 'Sağlık & Acil', icon: 'medical' },
  sehir: { name: 'Şehir & Katılım', short: 'Şehir', icon: 'building' },
  kesfet: { name: 'Keşfet & Eğlence', short: 'Keşfet', icon: 'compass' },
};
export const CATEGORY_KEYS = Object.keys(CATEGORIES).filter((k) => k !== 'none');
