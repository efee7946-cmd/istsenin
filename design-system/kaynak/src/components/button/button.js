import './button.css';
import { esc, cx, stateClass } from '../../utils/dom.js';
import { icon } from '../../icons/icons.js';
import { STATES, stateVariants } from '../../utils/states.js';

const ICONS = ['none', 'arrowRight', 'plus', 'check', 'search', 'headset', 'star'];

export default {
  name: 'Button',
  tag: 'is-button',
  desc: 'Bir işlemi başlatır. Ekranda tek bir birincil buton olmalı; diğerleri ikincil ya da metin buton.',
  props: [
    { k: 'label', t: 'text', l: 'Metin', d: 'Başvuru yap' },
    { k: 'hierarchy', t: 'enum', l: 'Hiyerarşi', d: 'primary', o: ['primary', 'secondary', 'tertiary', 'danger'] },
    { k: 'size', t: 'enum', l: 'Boyut', d: 'md', o: ['sm', 'md', 'lg'] },
    { k: 'icon', t: 'enum', l: 'İkon', d: 'none', o: ICONS },
    { k: 'iconPosition', t: 'enum', l: 'İkon konumu', d: 'start', o: ['start', 'end'] },
    { k: 'fullWidth', t: 'bool', l: 'Tam genişlik', d: false },
    { k: 'loading', t: 'bool', l: 'Yükleniyor', d: false },
    { k: 'state', t: 'enum', l: 'State', d: 'default', o: STATES },
  ],
  render(p) {
    const disabled = p.state === 'disabled';
    const ic = p.icon !== 'none' && !p.loading ? icon(p.icon, p.size === 'sm' ? 18 : 20, 2) : '';
    const spin = p.loading ? '<span class="is-button__spinner" aria-hidden="true"></span>' : '';
    return `<button type="button" class="${cx('is-button', `is-button--${p.hierarchy}`, `is-button--${p.size}`, p.fullWidth && 'is-button--full', p.loading && 'is-loading', stateClass(p.state))}"${disabled ? ' disabled' : ''}${p.loading ? ' aria-busy="true"' : ''}>${p.iconPosition === 'start' ? ic : ''}${spin}<span>${esc(p.loading ? 'Gönderiliyor…' : p.label)}</span>${p.iconPosition === 'end' ? ic : ''}</button>`;
  },
  variants: [
    { group: 'Hierarchy', items: [
      { label: 'Primary', props: { hierarchy: 'primary' } },
      { label: 'Secondary', props: { hierarchy: 'secondary', label: 'e-Devlet ile Giriş', icon: 'check' } },
      { label: 'Tertiary', props: { hierarchy: 'tertiary', label: 'Şifremi Unuttum' } },
      { label: 'Danger', props: { hierarchy: 'danger', label: 'Başvuruyu iptal et' } },
    ] },
    { group: 'Size', items: [
      { label: 'Small', props: { size: 'sm', label: 'Gör' } },
      { label: 'Medium', props: { size: 'md' } },
      { label: 'Large', props: { size: 'lg', label: 'Giriş Yap' } },
      { label: 'Icon + Loading', props: { loading: true } },
    ] },
    stateVariants(STATES),
  ],
  tokens: ['action.primary', 'action.primary-hover', 'action.primary-pressed', 'action.primary-subtle', 'action.on-primary', 'action.danger', 'border.focus-ring', 'radius.lg', 'type.button'],
};
