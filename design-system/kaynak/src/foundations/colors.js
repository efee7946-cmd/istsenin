import { colors, colorGroups } from '../tokens/colors.js';
import { esc } from '../utils/dom.js';

export default {
  id: 'colors',
  name: 'Colors',
  desc: 'Semantik renk token’ları. Her kart bir CSS değişkenine karşılık gelir; tıklayınca o temadaki hex kopyalanır.',
  count: Object.keys(colors).length,
  render(theme) {
    const groups = {};
    for (const [k, v] of Object.entries(colors)) (groups[k.split('.')[0]] ||= []).push([k, v]);
    return Object.entries(groups).map(([g, list]) => `
<section class="fd-section">
  <h3 class="fd-h">${esc(colorGroups[g] || g)} <span>${list.length}</span></h3>
  <div class="fd-swatches">
    ${list.map(([k, v]) => `<button type="button" class="fd-swatch" data-copy="${v[theme]}" aria-label="${k} ${v[theme]} kopyala">
      <span class="fd-swatch__chip" style="background: var(--${k.replace(/\./g, '-')})"></span>
      <span class="fd-swatch__meta">
        <code class="fd-swatch__name">${k}</code>
        <span class="fd-swatch__hex">${v[theme]}<span class="fd-swatch__alt">${theme === 'light' ? 'dark' : 'light'} ${v[theme === 'light' ? 'dark' : 'light']}</span></span>
        <span class="fd-swatch__use">${esc(v.usage)}</span>
      </span>
    </button>`).join('')}
  </div>
</section>`).join('');
  },
};
