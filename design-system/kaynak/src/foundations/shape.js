import { radius, space, shadow } from '../tokens/shape.js';

export default {
  id: 'shape',
  name: 'Shape & space',
  desc: 'Köşe yarıçapı, boşluk ve gölge token’ları. Uygulamadaki 14px buton/input ve 28px tabaka köşeleri buradan gelir.',
  count: Object.keys(radius).length + Object.keys(space).length + Object.keys(shadow).length,
  render() {
    return `
<section class="fd-section"><h3 class="fd-h">Radius <span>${Object.keys(radius).length}</span></h3>
  <div class="fd-shapes">${Object.entries(radius).map(([k, v]) => `<div class="fd-shape"><span class="fd-shape__box" style="border-radius: var(--radius-${k})"></span><code>radius.${k}</code><span>${v === 999 ? 'pill' : v + 'px'}</span></div>`).join('')}</div>
</section>
<section class="fd-section"><h3 class="fd-h">Space <span>${Object.keys(space).length}</span></h3>
  <div class="fd-spaces">${Object.entries(space).map(([k, v]) => `<div class="fd-space"><code>space.${k}</code><span class="fd-space__bar" style="width: var(--space-${k})"></span><span>${v}px</span></div>`).join('')}</div>
</section>
<section class="fd-section"><h3 class="fd-h">Shadow <span>${Object.keys(shadow).length}</span></h3>
  <div class="fd-shapes">${Object.keys(shadow).map((k) => `<div class="fd-shape"><span class="fd-shape__box fd-shape__box--shadow" style="box-shadow: var(--shadow-${k})"></span><code>shadow.${k}</code></div>`).join('')}</div>
</section>`;
  },
};
