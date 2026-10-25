import { typeScale, fontFamily } from '../tokens/typography.js';
import { esc } from '../utils/dom.js';

const SAMPLE = {
  'display': 'İstanbul Senin', 'title-lg': 'Giriş Yap', 'title-md': 'Kısayollarım', 'title-sm': 'Sosyal Destek · 7',
  'body-lg': "İstanbul Senin'de Ara", 'body-md': 'Şehrin tüm hizmetleri, tek hesapla.', 'body-sm': 'Vapur seferleri, tarifeler, güzergâhlar',
  'label': 'TC Kimlik No veya Telefon', 'button': 'Başvuru yap', 'caption': 'Ana Sayfa', 'overline': 'Ne yapmak istiyorsun?',
};

export default {
  id: 'typography',
  name: 'Typography',
  desc: `Tip skalası. Yazı tipi: ${fontFamily.split(',')[0].replace(/'/g, '')} (yedek: system-ui, sans-serif). Değerler px; satır yüksekliği sabit.`,
  count: Object.keys(typeScale).length,
  render() {
    return `<section class="fd-section"><div class="fd-type">
  <div class="fd-type__head"><span>Token</span><span>Örnek</span><span>Boyut / satır / ağırlık</span></div>
  ${Object.entries(typeScale).map(([k, t]) => `<div class="fd-type__row">
    <code>type.${k}</code>
    <span class="fd-type__sample" style="font-size: var(--type-${k}-size); line-height: var(--type-${k}-line); font-weight: var(--type-${k}-weight); letter-spacing: var(--type-${k}-tracking);${k === 'overline' ? ' text-transform: uppercase;' : ''}">${esc(SAMPLE[k])}</span>
    <span class="fd-type__spec"><b>${t.size} / ${t.line} / ${t.weight}</b>${esc(t.usage)}</span>
  </div>`).join('')}
</div></section>`;
  },
};
