import './chip.css';
import { esc, cx, stateClass } from '../../utils/dom.js';
import { STATES, stateVariants, CATEGORIES } from '../../utils/states.js';

export default {
  name: 'Chip',
  tag: 'is-chip',
  desc: 'Filtre ve kategori seçimi. Seçili çip magenta dolar; kategori noktası uygulama kategorisinin rengini taşır.',
  props: [
    { k: 'label', t: 'text', l: 'Metin', d: 'Sosyal Destek' },
    { k: 'selected', t: 'bool', l: 'Seçili', d: false },
    { k: 'category', t: 'enum', l: 'Kategori noktası', d: 'sosyal', o: Object.keys(CATEGORIES) },
    { k: 'count', t: 'number', l: 'Sayı (0 = gizli)', d: 0, min: 0, max: 99 },
    { k: 'size', t: 'enum', l: 'Boyut', d: 'md', o: ['sm', 'md'] },
    { k: 'state', t: 'enum', l: 'State', d: 'default', o: STATES },
  ],
  render(p) {
    const dis = p.state === 'disabled';
    const dot = p.category !== 'none' && !p.selected ? `<span class="is-chip__dot" style="background: var(--category-${p.category})"></span>` : '';
    const count = p.count > 0 ? `<span class="is-chip__count">${p.count}</span>` : '';
    return `<button type="button" aria-pressed="${p.selected}" class="${cx('is-chip', `is-chip--${p.size}`, p.selected && 'is-selected', stateClass(p.state))}"${dis ? ' disabled' : ''} data-act="toggle:selected">${dot}${esc(p.label)}${count}</button>`;
  },
  variants: [
    { group: 'Selection', items: [
      { label: 'Seçili değil', props: {} },
      { label: 'Seçili + sayı', props: { selected: true, count: 7 } },
      { label: 'Noktasız', props: { category: 'none', label: 'Tümü' } },
    ] },
    { group: 'Category', items: ['ulasim', 'sosyal', 'egitim', 'kultur', 'saglik', 'sehir', 'kesfet'].map((c) => ({ label: CATEGORIES[c].short, props: { category: c, label: CATEGORIES[c].short } })) },
    stateVariants(STATES),
  ],
  tokens: ['action.primary', 'action.primary-hover', 'action.on-primary', 'surface.default', 'surface.hover', 'border.default', 'border.strong', 'text.primary', 'category.sosyal', 'radius.md', 'type.label'],
};
