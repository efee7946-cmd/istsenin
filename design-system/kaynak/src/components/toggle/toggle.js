import './toggle.css';
import { esc, cx, stateClass } from '../../utils/dom.js';
import { STATES, stateVariants } from '../../utils/states.js';

export default {
  name: 'Toggle',
  tag: 'is-toggle',
  desc: 'Anında etkili açma/kapama ayarı. “Beni hatırla” ve bildirim tercihlerinde kullanılır; kaydet butonu gerektirmez.',
  props: [
    { k: 'label', t: 'text', l: 'Etiket', d: 'Beni hatırla' },
    { k: 'description', t: 'textarea', l: 'Açıklama', d: 'Bu cihazda açık kal, sonraki girişte Face ID kullan.' },
    { k: 'checked', t: 'bool', l: 'Açık', d: true },
    { k: 'size', t: 'enum', l: 'Boyut', d: 'md', o: ['sm', 'md'] },
    { k: 'labelPosition', t: 'enum', l: 'Etiket konumu', d: 'start', o: ['start', 'end'] },
    { k: 'state', t: 'enum', l: 'State', d: 'default', o: STATES },
  ],
  render(p) {
    const dis = p.state === 'disabled';
    const text = p.label || p.description
      ? `<span class="is-toggle__text"><span class="is-toggle__label">${esc(p.label)}</span>${p.description ? `<span class="is-toggle__desc">${esc(p.description)}</span>` : ''}</span>` : '';
    const sw = `<span class="is-toggle__track" aria-hidden="true"><span class="is-toggle__thumb"></span></span>`;
    return `<button type="button" role="switch" aria-checked="${p.checked}" class="${cx('is-toggle', `is-toggle--${p.size}`, `is-toggle--label-${p.labelPosition}`, p.checked && 'is-on', stateClass(p.state))}"${dis ? ' disabled' : ''} data-act="toggle:checked">${p.labelPosition === 'start' ? text + sw : sw + text}</button>`;
  },
  variants: [
    { group: 'Value', items: [
      { label: 'Açık', props: { checked: true } },
      { label: 'Kapalı', props: { checked: false, label: 'Kampanya ve etkinlikler', description: 'Genel duyurular' } },
      { label: 'Yalnız anahtar', props: { label: '', description: '' } },
    ] },
    { group: 'Size', items: [
      { label: 'Medium', props: { size: 'md' } },
      { label: 'Small', props: { size: 'sm', label: 'Ulaşım bildirimleri', description: '' } },
    ] },
    stateVariants(STATES),
  ],
  tokens: ['action.primary', 'action.primary-hover', 'border.strong', 'surface.default', 'text.primary', 'text.secondary', 'text.disabled', 'border.focus-ring', 'radius.pill'],
};
