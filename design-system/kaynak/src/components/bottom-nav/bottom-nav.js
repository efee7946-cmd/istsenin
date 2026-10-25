import './bottom-nav.css';
import { cx, stateClass } from '../../utils/dom.js';
import { icon, filledIcon } from '../../icons/icons.js';
import Badge from '../badge/badge.js';

const TABS = [
  { k: 'home', l: 'Ana Sayfa', i: 'home' },
  { k: 'chat', l: 'Sohbet', i: 'chat' },
  { k: 'wallet', l: 'Ödeme', i: 'wallet' },
  { k: 'profile', l: 'Profil', i: 'user' },
];

export default {
  name: 'Bottom nav',
  tag: 'is-nav',
  desc: 'Uygulamanın alt menüsü: dört sekme ve ortada QR okutma butonu. Sohbet sayacı Badge component’idir (composition).',
  props: [
    { k: 'active', t: 'enum', l: 'Aktif sekme', d: 'home', o: TABS.map((t) => t.k) },
    { k: 'chatCount', t: 'number', l: 'Sohbet sayacı (0 = gizli)', d: 6, min: 0, max: 999 },
    { k: 'showLabels', t: 'bool', l: 'Etiketler', d: true },
    { k: 'scanState', t: 'enum', l: 'QR butonu state', d: 'default', o: ['default', 'hover', 'pressed', 'focus', 'disabled'] },
  ],
  render(p) {
    const tab = (t) => {
      const on = t.k === p.active;
      const badge = t.k === 'chat' && p.chatCount > 0
        ? `<span class="is-nav__badge">${Badge.render({ text: String(p.chatCount), kind: 'count', tone: 'brand', max: 99, outlined: true })}</span>` : '';
      return `<button type="button" class="${cx('is-nav__tab', on && 'is-active')}"${on ? ' aria-current="page"' : ''} aria-label="${t.l}" data-act="set:active=${t.k}">${filledIcon(t.i, 28)}${p.showLabels ? `<span>${t.l}</span>` : ''}${badge}</button>`;
    };
    const dis = p.scanState === 'disabled';
    return `<nav class="${cx('is-nav', !p.showLabels && 'is-nav--compact')}" aria-label="Ana menü">
  ${tab(TABS[0])}${tab(TABS[1])}
  <button type="button" class="${cx('is-nav__scan', stateClass(p.scanState))}" aria-label="QR kod okut"${dis ? ' disabled' : ''}>${icon('scan', 30, 2)}</button>
  ${tab(TABS[2])}${tab(TABS[3])}
</nav>`;
  },
  variants: [
    { group: 'Active', items: TABS.map((t) => ({ label: t.l, props: { active: t.k } })) },
    { group: 'Badge', items: [
      { label: 'Sayaç 6', props: { chatCount: 6 } },
      { label: 'Sayaç 128 → 99+', props: { chatCount: 128 } },
      { label: 'Sayaç yok', props: { chatCount: 0 } },
      { label: 'Etiketsiz', props: { showLabels: false } },
    ] },
    { group: 'QR button state', items: ['default', 'hover', 'pressed', 'focus', 'disabled'].map((s) => ({ label: s[0].toUpperCase() + s.slice(1), props: { scanState: s } })) },
  ],
  tokens: ['accent.active', 'text.disabled', 'text.primary', 'action.primary', 'action.primary-hover', 'action.on-primary', 'surface.default', 'border.default', 'shadow.fab', 'type.caption'],
};
