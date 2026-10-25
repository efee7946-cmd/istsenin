import './select.css';
import { esc, cx, stateClass, lines } from '../../utils/dom.js';
import { icon } from '../../icons/icons.js';
import { STATES_ERR, stateVariants } from '../../utils/states.js';

export default {
  name: 'Select',
  tag: 'is-select',
  desc: 'Uzun seçenek listesinden tek seçim. Yerel <select> kullanır; mobilde işletim sisteminin seçicisi açılır.',
  props: [
    { k: 'label', t: 'text', l: 'Etiket', d: 'Kategori' },
    { k: 'options', t: 'textarea', l: 'Seçenekler (satır başına bir)', d: 'Ulaşım & Trafik\nSosyal Destek\nEğitim & Kariyer\nKültür, Spor & Etkinlik\nSağlık & Acil\nŞehir & Katılım\nKeşfet & Eğlence' },
    { k: 'value', t: 'text', l: 'Seçili değer', d: 'Sosyal Destek' },
    { k: 'placeholder', t: 'text', l: 'Placeholder', d: 'Kategori seç' },
    { k: 'helper', t: 'text', l: 'Yardımcı metin', d: 'Uygulamalar bu kategoride listelenir.' },
    { k: 'errorText', t: 'text', l: 'Hata metni', d: 'Bir kategori seçmelisin.' },
    { k: 'state', t: 'enum', l: 'State', d: 'default', o: STATES_ERR },
  ],
  render(p) {
    const id = 'sel-' + String(p.label).toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 20);
    const dis = p.state === 'disabled';
    const err = p.state === 'error';
    const opts = lines(p.options);
    const has = opts.includes(p.value);
    const msg = err ? p.errorText : p.helper;
    return `<div class="${cx('is-select', !has && 'is-empty', stateClass(p.state))}">
  <label class="is-select__label" for="${id}">${esc(p.label)}</label>
  <div class="is-select__box">
    <select id="${id}" class="is-select__native"${dis ? ' disabled' : ''}${err ? ' aria-invalid="true"' : ''} data-act="input:value">
      <option value=""${has ? '' : ' selected'} disabled>${esc(p.placeholder)}</option>
      ${opts.map((o) => `<option${o === p.value ? ' selected' : ''}>${esc(o)}</option>`).join('')}
    </select>
    <span class="is-select__chev">${icon('chevronDown', 20, 2)}</span>
  </div>
  ${msg ? `<p class="is-select__msg">${esc(msg)}</p>` : ''}
</div>`;
  },
  variants: [
    stateVariants(STATES_ERR),
    { group: 'Value', items: [
      { label: 'Seçili', props: {} },
      { label: 'Boş (placeholder)', props: { value: '' } },
      { label: 'Uzun değer', props: { value: 'Kültür, Spor & Etkinlik', helper: '' } },
    ] },
  ],
  tokens: ['surface.subtle', 'text.primary', 'text.secondary', 'border.focus', 'border.focus-ring', 'feedback.error', 'feedback.error-subtle', 'radius.lg', 'type.body-md'],
};
