// Component kaydı ve nav sıralaması.
// Yeni component: src/components/<id>/<id>.js + <id>.css oluştur, aşağıdaki listeye TEK SATIR ekle.
import colors from './foundations/colors.js';
import typography from './foundations/typography.js';
import shape from './foundations/shape.js';

const modules = import.meta.glob('./components/*/*.js', { eager: true });

export const ENTRIES = [
  { id: 'button',        group: 'Actions' },
  { id: 'chip',          group: 'Actions' },
  { id: 'text-field',    group: 'Forms' },
  { id: 'search-bar',    group: 'Forms' },
  { id: 'select',        group: 'Forms' },
  { id: 'checkbox',      group: 'Forms' },
  { id: 'radio-group',   group: 'Forms' },
  { id: 'toggle',        group: 'Forms' },
  { id: 'alert',         group: 'Feedback' },
  { id: 'badge',         group: 'Feedback' },
  { id: 'list-row',      group: 'Navigation' },
  { id: 'category-card', group: 'Navigation' },
  { id: 'bottom-nav',    group: 'Navigation' },
];

export const FOUNDATIONS = [colors, typography, shape];
export const GROUP_ORDER = ['Foundations', 'Actions', 'Forms', 'Feedback', 'Navigation'];

export const components = Object.fromEntries(ENTRIES.map((e) => {
  const mod = modules[`./components/${e.id}/${e.id}.js`];
  if (!mod) throw new Error(`registry: src/components/${e.id}/${e.id}.js bulunamadı`);
  return [e.id, { ...mod.default, id: e.id, group: e.group }];
}));

export const variantCount = (c) => c.variants.reduce((n, g) => n + g.items.length, 0);
export const defaults = (c) => Object.fromEntries(c.props.map((p) => [p.k, p.d]));
