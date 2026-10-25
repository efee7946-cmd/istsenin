import './text-field.css';
import { esc, cx, stateClass } from '../../utils/dom.js';
import { icon } from '../../icons/icons.js';
import { STATES_ERR, stateVariants } from '../../utils/states.js';

export default {
  name: 'Text field',
  tag: 'is-field',
  desc: 'Kısa metin girişi. Etiket her zaman görünür; yardımcı metin hata olduğunda hata mesajına dönüşür.',
  props: [
    { k: 'label', t: 'text', l: 'Etiket', d: 'TC Kimlik No veya Telefon' },
    { k: 'value', t: 'text', l: 'Değer', d: '' },
    { k: 'placeholder', t: 'text', l: 'Placeholder', d: '11 haneli TC kimlik numaran' },
    { k: 'helper', t: 'textarea', l: 'Yardımcı metin', d: 'Telefon numaranı 05 ile başlayarak yaz.' },
    { k: 'errorText', t: 'text', l: 'Hata metni', d: 'TC kimlik numarası 11 haneli olmalı.' },
    { k: 'type', t: 'enum', l: 'Tür', d: 'text', o: ['text', 'password', 'tel'] },
    { k: 'required', t: 'bool', l: 'Zorunlu', d: true },
    { k: 'maxLength', t: 'number', l: 'Maks. karakter', d: 11, min: 0, max: 200 },
    { k: 'state', t: 'enum', l: 'State', d: 'default', o: STATES_ERR },
  ],
  render(p) {
    const id = 'tf-' + String(p.label).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 24);
    const err = p.state === 'error';
    const dis = p.state === 'disabled';
    const msg = err ? p.errorText : p.helper;
    const trail = p.type === 'password'
      ? `<button type="button" class="is-field__icon-btn" aria-label="Şifreyi göster" tabindex="${dis ? -1 : 0}">${icon('eye', 20)}</button>`
      : err ? `<span class="is-field__err-ico">${icon('errorCircle', 20)}</span>` : '';
    return `<div class="${cx('is-field', stateClass(p.state))}">
  <label class="is-field__label" for="${id}">${esc(p.label)}${p.required ? '<span class="is-field__req" aria-hidden="true"> *</span>' : ''}</label>
  <div class="is-field__box">
    <input id="${id}" class="is-field__input" type="${p.type}" value="${esc(p.value)}" placeholder="${esc(p.placeholder)}"${p.maxLength ? ` maxlength="${p.maxLength}"` : ''}${dis ? ' disabled' : ''}${p.required ? ' required' : ''}${err ? ` aria-invalid="true"` : ''}${msg ? ` aria-describedby="${id}-m"` : ''} data-act="input:value">${trail}
  </div>
  ${msg ? `<p class="is-field__msg" id="${id}-m">${esc(msg)}</p>` : ''}
</div>`;
  },
  variants: [
    stateVariants(STATES_ERR, { value: '123 456 789' }),
    { group: 'Type', items: [
      { label: 'Text', props: { type: 'text', value: '' } },
      { label: 'Password', props: { type: 'password', label: 'Şifre', value: 'senin2026', placeholder: 'Şifren', helper: 'En az 8 karakter.', maxLength: 0 } },
      { label: 'Phone', props: { type: 'tel', label: 'Cep telefonu', placeholder: '05__ ___ __ __', value: '' } },
    ] },
  ],
  tokens: ['surface.subtle', 'text.primary', 'text.secondary', 'border.focus', 'border.focus-ring', 'feedback.error', 'feedback.error-subtle', 'text.disabled', 'radius.lg', 'type.body-md', 'type.label'],
};
