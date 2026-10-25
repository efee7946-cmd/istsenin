import './radio-group.css';
import { esc, cx, stateClass, lines } from '../../utils/dom.js';
import { STATES_ERR, stateVariants } from '../../utils/states.js';

export default {
  name: 'Radio group',
  tag: 'is-radio',
  desc: 'Birbirini dışlayan seçenekler arasından tek seçim. 5’ten fazla seçenek varsa Select kullan.',
  props: [
    { k: 'legend', t: 'text', l: 'Başlık', d: 'Ne yapmak istiyorsun?' },
    { k: 'options', t: 'textarea', l: 'Seçenekler (satır başına bir)', d: 'Başvuru yap\nÖdeme / borç sorgula\nRezervasyon / kayıt\nBilgi al' },
    { k: 'selected', t: 'range', l: 'Seçili sıra', d: 1, min: 1, max: 6, step: 1 },
    { k: 'direction', t: 'enum', l: 'Yön', d: 'vertical', o: ['vertical', 'horizontal'] },
    { k: 'errorText', t: 'text', l: 'Hata metni', d: 'Bir seçenek seçmelisin.' },
    { k: 'state', t: 'enum', l: 'State', d: 'default', o: STATES_ERR },
  ],
  render(p) {
    const opts = lines(p.options);
    const dis = p.state === 'disabled';
    const err = p.state === 'error';
    const items = opts.map((o, i) => {
      const on = i + 1 === Number(p.selected);
      return `<button type="button" role="radio" aria-checked="${on}" class="${cx('is-radio__opt', on && 'is-selected')}"${dis ? ' disabled' : ''} tabindex="${on ? 0 : -1}" data-act="set:selected=${i + 1}"><span class="is-radio__dot" aria-hidden="true"></span><span>${esc(o)}</span></button>`;
    }).join('');
    return `<div role="radiogroup" aria-label="${esc(p.legend)}" class="${cx('is-radio', `is-radio--${p.direction}`, stateClass(p.state))}"${err ? ' aria-invalid="true"' : ''}>
  <p class="is-radio__legend">${esc(p.legend)}</p>
  <div class="is-radio__list">${items}</div>
  ${err ? `<p class="is-radio__msg">${esc(p.errorText)}</p>` : ''}
</div>`;
  },
  variants: [
    { group: 'Direction', items: [
      { label: 'Vertical', props: { direction: 'vertical' } },
      { label: 'Horizontal', props: { direction: 'horizontal', legend: 'Sırala', options: 'En çok kullandığım\nA–Z', selected: 1 } },
    ] },
    stateVariants(STATES_ERR, { options: 'Başvuru yap\nÖdeme / borç sorgula', selected: 1 }),
  ],
  tokens: ['action.primary', 'action.primary-hover', 'border.strong', 'border.focus', 'feedback.error', 'text.primary', 'text.secondary', 'text.disabled', 'type.overline'],
};
