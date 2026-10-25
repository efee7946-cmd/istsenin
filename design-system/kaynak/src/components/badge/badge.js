import './badge.css';
import { esc, cx } from '../../utils/dom.js';

export default {
  name: 'Badge',
  tag: 'is-badge',
  desc: 'Okunmamış sayısı ya da kısa durum etiketi. Etkileşimli değildir; tıklanabilir bir öğenin üstünde durur.',
  props: [
    { k: 'text', t: 'text', l: 'Metin', d: '6' },
    { k: 'kind', t: 'enum', l: 'Tür', d: 'count', o: ['count', 'label', 'dot'] },
    { k: 'tone', t: 'enum', l: 'Ton', d: 'brand', o: ['brand', 'neutral', 'success', 'warning', 'error', 'info'] },
    { k: 'max', t: 'number', l: 'Üst sınır (sayı)', d: 99, min: 1, max: 999 },
    { k: 'outlined', t: 'bool', l: 'Beyaz çerçeve (ikon üstünde)', d: false },
  ],
  render(p) {
    let txt = p.text;
    if (p.kind === 'count' && /^\d+$/.test(txt) && Number(txt) > p.max) txt = `${p.max}+`;
    const label = p.kind === 'dot' ? `<span class="is-sr">Yeni</span>` : esc(txt);
    return `<span class="${cx('is-badge', `is-badge--${p.kind}`, `is-badge--${p.tone}`, p.outlined && 'is-badge--outlined')}">${label}</span>`;
  },
  variants: [
    { group: 'Tone', items: ['brand', 'neutral', 'success', 'warning', 'error', 'info'].map((t) => ({
      label: t[0].toUpperCase() + t.slice(1),
      props: { tone: t, kind: 'label', text: { brand: 'Yeni', neutral: 'Taslak', success: 'Çözüldü', warning: 'Yanıt bekliyor', error: 'Belge eksik', info: 'İnceleniyor' }[t] },
    })) },
    { group: 'Kind', items: [
      { label: 'Count', props: { kind: 'count', text: '6' } },
      { label: 'Count (üst sınır)', props: { kind: 'count', text: '128' } },
      { label: 'Label', props: { kind: 'label', text: 'En iyi eşleşme' } },
      { label: 'Dot', props: { kind: 'dot' } },
      { label: 'Outlined (ikon üstü)', props: { kind: 'count', text: '11', outlined: true } },
    ] },
  ],
  tokens: ['action.primary', 'action.primary-subtle', 'action.on-primary', 'surface.subtle', 'feedback.success', 'feedback.success-subtle', 'feedback.warning-subtle', 'feedback.error-subtle', 'feedback.info-subtle', 'radius.pill', 'type.caption'],
};
