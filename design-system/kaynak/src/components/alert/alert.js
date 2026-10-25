import './alert.css';
import { esc, cx, stateClass } from '../../utils/dom.js';
import { icon } from '../../icons/icons.js';
import Button from '../button/button.js';

const ICON = { info: 'info', success: 'checkCircle', warning: 'alert', error: 'errorCircle' };

export default {
  name: 'Alert',
  tag: 'is-alert',
  desc: 'Sayfa içi durum mesajı. Aksiyonu varsa Button component’ini kullanır (composition).',
  props: [
    { k: 'title', t: 'text', l: 'Başlık', d: '1 belge eksik' },
    { k: 'message', t: 'textarea', l: 'Mesaj', d: 'Nüfus kayıt örneğini yüklemezsen Yeni Doğan Desteği başvurun bekletilir.' },
    { k: 'tone', t: 'enum', l: 'Ton', d: 'warning', o: ['info', 'success', 'warning', 'error'] },
    { k: 'layout', t: 'enum', l: 'Yerleşim', d: 'inline', o: ['inline', 'banner'] },
    { k: 'action', t: 'text', l: 'Aksiyon metni', d: 'Belge yükle' },
    { k: 'dismissible', t: 'bool', l: 'Kapatılabilir', d: true },
    { k: 'closeState', t: 'enum', l: 'Kapat butonu state', d: 'default', o: ['default', 'hover', 'pressed', 'focus'] },
  ],
  render(p) {
    const act = p.action ? Button.render({ label: p.action, hierarchy: p.tone === 'error' ? 'danger' : 'secondary', size: 'sm', icon: 'none', iconPosition: 'start', fullWidth: false, loading: false, state: 'default' }) : '';
    const close = p.dismissible ? `<button type="button" class="${cx('is-alert__close', stateClass(p.closeState))}" aria-label="Kapat">${icon('x', 18, 2)}</button>` : '';
    return `<div class="${cx('is-alert', `is-alert--${p.tone}`, `is-alert--${p.layout}`)}" role="${p.tone === 'error' ? 'alert' : 'status'}">
  <span class="is-alert__icon">${icon(ICON[p.tone], 22, 2)}</span>
  <div class="is-alert__body">${p.title ? `<p class="is-alert__title">${esc(p.title)}</p>` : ''}<p class="is-alert__msg">${esc(p.message)}</p>${act ? `<div class="is-alert__actions">${act}</div>` : ''}</div>
  ${close}
</div>`;
  },
  variants: [
    { group: 'Tone', items: [
      { label: 'Info', props: { tone: 'info', title: 'Başvurun değerlendirmede', message: 'Sonuçlanınca Sohbet › Bildirimler’de haber vereceğiz.', action: '' } },
      { label: 'Success', props: { tone: 'success', title: 'Bilgilerin kaydedildi', message: 'Kaldığın yerden devam edebilirsin.', action: '' } },
      { label: 'Warning', props: { tone: 'warning' } },
      { label: 'Error', props: { tone: 'error', title: 'Bağlantı koptu', message: 'İşlemin tamamlanamadı. Doldurduğun alanlar taslak olarak saklandı.', action: 'Tekrar dene' } },
    ] },
    { group: 'Layout', items: [
      { label: 'Inline', props: { layout: 'inline' } },
      { label: 'Banner', props: { layout: 'banner', tone: 'info', title: '', message: 'Canlı Destek artık Tüm Uygulamalar’ın sağ üstünde.', action: '', dismissible: true } },
    ] },
    { group: 'Close button state', items: ['default', 'hover', 'pressed', 'focus'].map((s) => ({ label: s[0].toUpperCase() + s.slice(1), props: { closeState: s, action: '' } })) },
  ],
  tokens: ['feedback.info', 'feedback.info-subtle', 'feedback.success', 'feedback.success-subtle', 'feedback.warning', 'feedback.warning-subtle', 'feedback.error', 'feedback.error-subtle', 'text.primary', 'radius.xl', 'type.title-sm'],
};
