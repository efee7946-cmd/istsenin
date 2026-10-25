import './list-row.css';
import { esc, cx, stateClass } from '../../utils/dom.js';
import { icon } from '../../icons/icons.js';
import { STATES, stateVariants, CATEGORIES } from '../../utils/states.js';
import Toggle from '../toggle/toggle.js';
import Badge from '../badge/badge.js';

const GLYPHS = ['ship', 'bus', 'map', 'baby', 'heart', 'cap', 'book', 'ticket', 'medical', 'building', 'compass', 'phone', 'headset'];

export default {
  name: 'List row',
  tag: 'is-row',
  desc: 'Tüm Uygulamalar ve kategori ekranlarındaki uygulama satırı. Sağ uç Toggle ve Badge component’lerini içerebilir (composition).',
  props: [
    { k: 'title', t: 'text', l: 'Başlık', d: 'Şehir Hatları' },
    { k: 'subtitle', t: 'textarea', l: 'Açıklama', d: 'Vapur seferleri, tarifeler, güzergâhlar' },
    { k: 'category', t: 'enum', l: 'Kategori', d: 'ulasim', o: Object.keys(CATEGORIES) },
    { k: 'glyph', t: 'enum', l: 'İkon', d: 'ship', o: GLYPHS },
    { k: 'iconSize', t: 'range', l: 'İkon kutusu (px)', d: 52, min: 36, max: 64, step: 4 },
    { k: 'trailing', t: 'enum', l: 'Sağ uç', d: 'chevron', o: ['chevron', 'star', 'toggle', 'badge'] },
    { k: 'badgeText', t: 'text', l: 'Rozet metni', d: 'En iyi eşleşme' },
    { k: 'divider', t: 'bool', l: 'Alt çizgi', d: true },
    { k: 'state', t: 'enum', l: 'State', d: 'default', o: STATES },
  ],
  render(p) {
    const cat = p.category === 'none' ? 'sehir' : p.category;
    const s = Number(p.iconSize);
    const tile = `<span class="is-row__tile" style="width:${s}px;height:${s}px;background:var(--category-${cat}-subtle);color:var(--category-${cat})">${icon(p.glyph, Math.round(s * 0.46))}</span>`;
    const dis = p.state === 'disabled';
    let trail = '';
    if (p.trailing === 'chevron') trail = `<span class="is-row__chev">${icon('chevronRight', 20)}</span>`;
    if (p.trailing === 'star') trail = `<span class="is-row__star">${icon('star', 22, 1.6)}</span>`;
    if (p.trailing === 'toggle') trail = Toggle.render({ label: '', description: '', checked: true, size: 'md', labelPosition: 'start', state: dis ? 'disabled' : 'default' });
    if (p.trailing === 'badge') trail = Badge.render({ text: p.badgeText, kind: 'label', tone: 'brand', max: 99, outlined: false });
    const tag = p.trailing === 'toggle' ? 'div' : 'button';
    return `<${tag}${tag === 'button' ? ' type="button"' : ''} class="${cx('is-row', p.divider && 'is-row--divider', stateClass(p.state))}"${dis && tag === 'button' ? ' disabled' : ''}>
  ${tile}
  <span class="is-row__text"><span class="is-row__title">${esc(p.title)}</span>${p.subtitle ? `<span class="is-row__sub">${esc(p.subtitle)}</span>` : ''}</span>
  ${trail}
</${tag}>`;
  },
  variants: [
    { group: 'Trailing', items: [
      { label: 'Chevron', props: {} },
      { label: 'Star (kısayol)', props: { trailing: 'star', title: 'Metro', subtitle: 'Güzergâhlar, sefer saatleri', glyph: 'bus' } },
      { label: 'Toggle (Toggle import)', props: { trailing: 'toggle', title: 'Ulaşım', subtitle: 'Kullandığın hatlardaki değişiklikler', glyph: 'bus' } },
      { label: 'Badge (Badge import)', props: { trailing: 'badge' } },
    ] },
    { group: 'Category', items: [
      { label: 'Sosyal Destek', props: { category: 'sosyal', glyph: 'baby', title: 'Yeni Doğan Desteği', subtitle: 'Yeni doğan desteği başvurusu' } },
      { label: 'Eğitim', props: { category: 'egitim', glyph: 'book', title: 'İBB Kütüphane', subtitle: 'Kütüphane hizmetlerini keşfedin' } },
      { label: 'Sağlık & Acil', props: { category: 'saglik', glyph: 'phone', title: 'Acil ve Kısa Numaralar', subtitle: 'Tüm acil numaraların listesi' } },
    ] },
    stateVariants(STATES),
  ],
  tokens: ['surface.hover', 'surface.pressed', 'border.default', 'border.focus', 'text.primary', 'text.secondary', 'category.ulasim', 'category.ulasim-subtle', 'radius.lg', 'type.body-md', 'type.body-sm'],
};
