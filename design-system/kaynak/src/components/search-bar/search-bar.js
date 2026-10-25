import './search-bar.css';
import { esc, cx, stateClass } from '../../utils/dom.js';
import { icon } from '../../icons/icons.js';
import { STATES, stateVariants } from '../../utils/states.js';

export default {
  name: 'Search bar',
  tag: 'is-search',
  desc: 'Uygulama genelinde arama. Magenta başlıkta beyaz, beyaz tabakada gri zeminli kullanılır.',
  props: [
    { k: 'placeholder', t: 'text', l: 'Placeholder', d: "İstanbul Senin'de Ara" },
    { k: 'value', t: 'text', l: 'Değer', d: '' },
    { k: 'surface', t: 'enum', l: 'Zemin', d: 'on-brand', o: ['on-brand', 'on-surface'] },
    { k: 'filter', t: 'bool', l: 'Filtre butonu', d: false },
    { k: 'state', t: 'enum', l: 'State', d: 'default', o: STATES },
  ],
  render(p) {
    const dis = p.state === 'disabled';
    const clear = p.value ? `<button type="button" class="is-search__clear" aria-label="Aramayı temizle">${icon('x', 18)}</button>` : '';
    const filter = p.filter ? `<button type="button" class="is-search__filter" aria-label="Filtrele"${dis ? ' disabled' : ''}>${icon('sliders', 22)}</button>` : '';
    return `<div class="${cx('is-search', `is-search--${p.surface}`, stateClass(p.state))}">
  <label class="is-search__box">${icon('search', 22)}<span class="is-sr">Ara</span><input class="is-search__input" type="search" value="${esc(p.value)}" placeholder="${esc(p.placeholder)}"${dis ? ' disabled' : ''} data-act="input:value">${clear}</label>${filter}
</div>`;
  },
  variants: [
    { group: 'Surface', items: [
      { label: 'On brand (magenta başlık)', props: { surface: 'on-brand' } },
      { label: 'On surface (Tüm Uygulamalar)', props: { surface: 'on-surface', placeholder: '52 uygulamada ara', filter: true } },
      { label: 'Değer girilmiş', props: { surface: 'on-surface', value: 'vapur' } },
    ] },
    stateVariants(STATES, { surface: 'on-surface', placeholder: '52 uygulamada ara' }),
  ],
  tokens: ['surface.brand', 'surface.default', 'surface.subtle', 'text.secondary', 'text.primary', 'border.focus', 'border.focus-ring', 'radius.lg', 'type.body-lg'],
};
