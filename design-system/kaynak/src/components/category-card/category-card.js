import './category-card.css';
import { esc, cx, stateClass } from '../../utils/dom.js';
import { icon } from '../../icons/icons.js';
import { STATES, stateVariants, CATEGORIES, CATEGORY_KEYS } from '../../utils/states.js';

export default {
  name: 'Category card',
  tag: 'is-catcard',
  desc: 'Ana sayfadaki kategori kartı (tile) ve Tüm Uygulamalar özet satırı (row). Ortak bölge ilkesiyle uygulamaları gruplar.',
  props: [
    { k: 'category', t: 'enum', l: 'Kategori', d: 'ulasim', o: [...CATEGORY_KEYS, 'all'] },
    { k: 'count', t: 'number', l: 'Uygulama sayısı', d: 6, min: 0, max: 99 },
    { k: 'layout', t: 'enum', l: 'Yerleşim', d: 'tile', o: ['tile', 'row'] },
    { k: 'customName', t: 'text', l: 'Özel ad (boş = kategori adı)', d: '' },
    { k: 'state', t: 'enum', l: 'State', d: 'default', o: STATES },
  ],
  render(p) {
    const all = p.category === 'all';
    const c = all ? { name: 'Tümü', short: 'Tümü', icon: 'grid' } : CATEGORIES[p.category];
    const name = p.customName || (p.layout === 'tile' ? c.short : c.name);
    const style = all ? '' : ` style="--cc-fg:var(--category-${p.category});--cc-bg:var(--category-${p.category}-subtle)"`;
    const dis = p.state === 'disabled';
    if (p.layout === 'row') {
      return `<button type="button" class="${cx('is-catcard', 'is-catcard--row', all && 'is-catcard--all', stateClass(p.state))}"${style}${dis ? ' disabled' : ''}>
  <span class="is-catcard__tile">${icon(c.icon, 24)}</span>
  <span class="is-catcard__name">${esc(name)} <span class="is-catcard__count">· ${p.count}</span></span>
  <span class="is-catcard__chev">${icon('chevronRight', 20)}</span>
</button>`;
    }
    return `<button type="button" class="${cx('is-catcard', 'is-catcard--tile', all && 'is-catcard--all', stateClass(p.state))}"${style}${dis ? ' disabled' : ''}>
  ${icon(c.icon, 24)}<span class="is-catcard__name">${esc(name)}</span><span class="is-catcard__count">${p.count} uygulama</span>
</button>`;
  },
  variants: [
    { group: 'Category', items: [...CATEGORY_KEYS.map((k, i) => ({ label: CATEGORIES[k].short, props: { category: k, count: [6, 7, 7, 8, 8, 9, 7][i] } })), { label: 'Tümü', props: { category: 'all', count: 52 } }] },
    { group: 'Layout', items: [
      { label: 'Tile (ana sayfa)', props: { layout: 'tile', category: 'sosyal', count: 7 } },
      { label: 'Row (Tüm Uygulamalar)', props: { layout: 'row', category: 'sosyal', count: 7 } },
    ] },
    stateVariants(STATES, { category: 'sosyal', count: 7 }),
  ],
  tokens: ['category.ulasim', 'category.ulasim-subtle', 'action.primary', 'text.primary', 'text.secondary', 'border.focus', 'surface.hover', 'radius.xl', 'type.caption'],
};
