import './checkbox.css';
import { esc, cx, stateClass } from '../../utils/dom.js';
import { icon } from '../../icons/icons.js';
import { STATES_ERR, stateVariants } from '../../utils/states.js';

export default {
  name: 'Checkbox',
  tag: 'is-check',
  desc: 'Birden çok seçim ya da onay. Kaydetme gerektiren formlarda kullanılır; anında etkili ayar için Toggle tercih edilir.',
  props: [
    { k: 'label', t: 'text', l: 'Etiket', d: 'Aydınlatma metnini okudum, onaylıyorum' },
    { k: 'helper', t: 'text', l: 'Yardımcı metin', d: '' },
    { k: 'checked', t: 'enum', l: 'Değer', d: 'false', o: ['false', 'true', 'mixed'] },
    { k: 'errorText', t: 'text', l: 'Hata metni', d: 'Devam etmek için onay vermelisin.' },
    { k: 'state', t: 'enum', l: 'State', d: 'default', o: STATES_ERR },
  ],
  render(p) {
    const dis = p.state === 'disabled';
    const err = p.state === 'error';
    const mark = p.checked === 'true' ? icon('check', 16, 3) : p.checked === 'mixed' ? icon('minus', 16, 3) : '';
    const next = p.checked === 'true' ? 'false' : 'true';
    const msg = err ? p.errorText : p.helper;
    return `<div class="${cx('is-check', p.checked !== 'false' && 'is-checked', stateClass(p.state))}">
  <button type="button" role="checkbox" aria-checked="${p.checked}" class="is-check__row"${dis ? ' disabled' : ''}${err ? ' aria-invalid="true"' : ''} data-act="set:checked=${next}">
    <span class="is-check__box" aria-hidden="true">${mark}</span><span class="is-check__label">${esc(p.label)}</span>
  </button>
  ${msg ? `<p class="is-check__msg">${esc(msg)}</p>` : ''}
</div>`;
  },
  variants: [
    { group: 'Value', items: [
      { label: 'Seçili değil', props: { checked: 'false' } },
      { label: 'Seçili', props: { checked: 'true', label: 'Başvuru yap' } },
      { label: 'Kısmi (mixed)', props: { checked: 'mixed', label: 'Tüm sosyal destekler' } },
    ] },
    stateVariants(STATES_ERR, { checked: 'true', label: 'Başvuru yap' }),
  ],
  tokens: ['action.primary', 'action.primary-hover', 'action.on-primary', 'border.strong', 'border.focus', 'feedback.error', 'text.primary', 'text.disabled', 'radius.sm'],
};
