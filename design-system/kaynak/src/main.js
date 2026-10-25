import './tokens/tokens.css';
import './styles/app.css';
import { components, ENTRIES, FOUNDATIONS, GROUP_ORDER, variantCount, defaults } from './registry.js';
import { colors } from './tokens/colors.js';
import { typeScale } from './tokens/typography.js';
import { radius } from './tokens/shape.js';
import { icon } from './icons/icons.js';
import { esc, cx, copyText, store } from './utils/dom.js';
import { jsSnippet, prettyHtml, diffProps } from './utils/code.js';

/* ------------------------------------------------------------------ state */
const S = {
  id: 'button',
  tab: 'preview',
  canvas: store.get('sui-canvas', 'white'),
  theme: store.get('sui-theme', matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
  props: {},
  query: '',
  navOpen: false,
};
const isFoundation = (id) => FOUNDATIONS.some((f) => f.id === id);
const comp = () => components[S.id];

/* ------------------------------------------------------------------ shell */
const app = document.getElementById('app');
app.innerHTML = `
<header class="ui-top">
  <button class="ui-iconbtn ui-navtoggle" type="button" aria-label="Bileşen listesi" aria-expanded="false" id="navToggle">${icon('grid', 20)}</button>
  <div class="ui-brand"><b>Senin UI</b><span>İstanbul Senin tasarım sistemi · v0.1</span></div>
  <div class="ui-top__right">
    <button class="ui-themebtn" type="button" id="themeBtn"></button>
  </div>
</header>
<div class="ui-layout">
  <aside class="ui-nav" id="nav" aria-label="Bileşenler">
    <label class="ui-search">${icon('search', 18)}<input id="q" type="search" placeholder="Bileşen ara" autocomplete="off" aria-label="Bileşen ara"></label>
    <nav id="navList"></nav>
  </aside>
  <main class="ui-main" id="main" tabindex="-1"></main>
  <aside class="ui-panel" id="panel" aria-label="Özellikler"></aside>
</div>
<div class="ui-toast" id="toast" role="status" aria-live="polite"></div>`;

const $ = (s, r = document) => r.querySelector(s);
let toastT;
function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 1600); }

/* ------------------------------------------------------------------ theme */
function applyTheme() {
  document.documentElement.dataset.theme = S.theme;
  $('#themeBtn').innerHTML = `${icon(S.theme === 'dark' ? 'sun' : 'moon', 18)}<span>${S.theme === 'dark' ? 'Açık tema' : 'Koyu tema'}</span>`;
  $('#themeBtn').setAttribute('aria-label', S.theme === 'dark' ? 'Açık temaya geç' : 'Koyu temaya geç');
}
$('#themeBtn').addEventListener('click', () => { S.theme = S.theme === 'dark' ? 'light' : 'dark'; store.set('sui-theme', S.theme); applyTheme(); if (isFoundation(S.id)) renderMain(); renderPanel(); });

/* ------------------------------------------------------------------ routing */
function readHash() {
  const [path, qs] = location.hash.replace(/^#\/?/, '').split('?');
  const id = path && (components[path] || isFoundation(path)) ? path : 'button';
  const tab = new URLSearchParams(qs || '').get('tab');
  const changed = id !== S.id || !Object.keys(S.props).length;
  S.id = id;
  if (tab && ['preview', 'variants', 'code'].includes(tab)) S.tab = tab;
  if (changed && components[id]) S.props = defaults(components[id]);
}
function go(id, tab) { location.hash = `#/${id}${tab && tab !== 'preview' ? `?tab=${tab}` : ''}`; }
addEventListener('hashchange', () => { const prev = S.id; readHash(); if (prev !== S.id) S.tab = new URLSearchParams(location.hash.split('?')[1] || '').get('tab') || 'preview'; renderAll(); if (S.navOpen) toggleNav(false); });

/* ------------------------------------------------------------------ nav */
function renderNav() {
  const q = S.query.toLocaleLowerCase('tr');
  const items = [
    ...FOUNDATIONS.map((f) => ({ id: f.id, name: f.name, group: 'Foundations', count: f.count, hint: 'token' })),
    ...ENTRIES.map((e) => ({ id: e.id, name: components[e.id].name, group: e.group, count: variantCount(components[e.id]), hint: 'varyant' })),
  ].filter((i) => !q || i.name.toLocaleLowerCase('tr').includes(q) || i.group.toLocaleLowerCase('tr').includes(q));
  const html = GROUP_ORDER.map((g) => {
    const list = items.filter((i) => i.group === g);
    if (!list.length) return '';
    return `<div class="ui-nav__group"><h2 lang="en">${g}</h2><ul>${list.map((i) => `<li><a href="#/${i.id}" class="${cx('ui-nav__item', i.id === S.id && 'is-active')}"${i.id === S.id ? ' aria-current="page"' : ''}><span>${esc(i.name)}</span><span class="ui-nav__count" title="${i.count} ${i.hint}">${i.count}</span></a></li>`).join('')}</ul></div>`;
  }).join('');
  $('#navList').innerHTML = html || `<p class="ui-empty">“${esc(S.query)}” için bileşen yok.</p>`;
}
$('#q').addEventListener('input', (e) => { S.query = e.target.value; renderNav(); });

function toggleNav(open = !S.navOpen) { S.navOpen = open; $('#nav').classList.toggle('is-open', open); $('#navToggle').setAttribute('aria-expanded', String(open)); }
$('#navToggle').addEventListener('click', () => toggleNav());

/* ------------------------------------------------------------------ main */
function renderMain() {
  if (isFoundation(S.id)) {
    const f = FOUNDATIONS.find((x) => x.id === S.id);
    $('#main').innerHTML = `<div class="ui-head"><p class="ui-eyebrow" lang="en">Foundations</p><h1>${f.name}</h1><p class="ui-desc">${esc(f.desc)}</p></div><div class="ui-foundation">${f.render(S.theme)}</div>`;
    return;
  }
  const c = comp();
  const tabs = [['preview', 'Preview'], ['variants', `Variants <span>${variantCount(c)}</span>`], ['code', 'Code']];
  $('#main').innerHTML = `
  <div class="ui-head"><p class="ui-eyebrow" lang="en">${c.group}</p><h1>${c.name}</h1><p class="ui-desc">${esc(c.desc)}</p></div>
  <div class="ui-tabs" role="tablist">${tabs.map(([k, l]) => `<button role="tab" type="button" class="ui-tab" id="tab-${k}" aria-selected="${S.tab === k}" aria-controls="tabpanel" data-tab="${k}">${l}</button>`).join('')}</div>
  <section class="ui-tabpanel" id="tabpanel" role="tabpanel" aria-labelledby="tab-${S.tab}"></section>`;
  renderTab();
}

function renderTab() {
  const c = comp(); const el = $('#tabpanel'); if (!el) return;
  if (S.tab === 'preview') {
    el.innerHTML = `
    <div class="ui-canvasbar">
      <div class="ui-seg ui-seg--sm" role="radiogroup" aria-label="Canvas">${[['white', 'Beyaz'], ['gray', 'Gri']].map(([k, l]) => `<button type="button" role="radio" aria-checked="${S.canvas === k}" data-canvas="${k}">${l}</button>`).join('')}</div>
      <span class="ui-hint">Canlı: hover, basma ve klavye odağı gerçek çalışır.</span>
    </div>
    <div class="ui-stage ui-stage--${S.canvas}" id="stage">${c.render(S.props)}</div>`;
  } else if (S.tab === 'variants') {
    el.innerHTML = c.variants.map((g, gi) => `
    <div class="ui-vgroup"><h3 lang="en">${g.group} <span>${g.items.length}</span></h3>
      <div class="ui-vgrid">${g.items.map((v, vi) => `
        <div class="ui-vcard" role="button" tabindex="0" data-v="${gi}:${vi}" aria-label="${esc(v.label)} varyantını Preview'a yükle">
          <div class="ui-vcard__stage ui-stage--${S.canvas}" inert>${c.render({ ...defaults(c), ...v.props })}</div>
          <div class="ui-vcard__label">${esc(v.label)}<span>Preview’a yükle ${icon('arrowRight', 14)}</span></div>
        </div>`).join('')}</div>
    </div>`).join('');
  } else {
    const js = jsSnippet(c, c.id, S.props);
    const html = prettyHtml(c.render(S.props));
    el.innerHTML = `
    <div class="ui-code"><div class="ui-code__bar"><span>JavaScript</span><button type="button" class="ui-copy" data-copy-code="js">${icon('copy', 16)}Kopyala</button></div><pre><code id="code-js">${esc(js)}</code></pre></div>
    <div class="ui-code"><div class="ui-code__bar"><span>Üretilen HTML</span><button type="button" class="ui-copy" data-copy-code="html">${icon('copy', 16)}Kopyala</button></div><pre><code id="code-html">${esc(html)}</code></pre></div>
    <p class="ui-hint">Snippet mevcut property değerlerinden üretilir; default’tan farklı olanlar yorumla işaretli (${Object.keys(diffProps(c, S.props)).length} adet).</p>`;
  }
}

$('#main').addEventListener('click', (e) => {
  const tab = e.target.closest('[data-tab]');
  if (tab) { S.tab = tab.dataset.tab; go(S.id, S.tab); renderMain(); $(`#tab-${S.tab}`)?.focus(); return; }
  const cv = e.target.closest('[data-canvas]');
  if (cv) { S.canvas = cv.dataset.canvas; store.set('sui-canvas', S.canvas); renderTab(); return; }
  const vc = e.target.closest('[data-v]');
  if (vc) { loadVariant(vc.dataset.v); return; }
  const cp = e.target.closest('[data-copy-code]');
  if (cp) { copyText($(`#code-${cp.dataset.copyCode}`).textContent).then((ok) => toast(ok ? 'Kod kopyalandı' : 'Kopyalanamadı')); return; }
  const sw = e.target.closest('[data-copy]');
  if (sw) { copyText(sw.dataset.copy).then((ok) => toast(ok ? `${sw.dataset.copy} kopyalandı` : 'Kopyalanamadı')); return; }
  const act = e.target.closest('#stage [data-act]');
  if (act && !act.disabled) handleAct(act, 'click');
});
$('#main').addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') { const vc = e.target.closest('[data-v]'); if (vc && e.target === vc) { e.preventDefault(); loadVariant(vc.dataset.v); } }
  if (['ArrowLeft', 'ArrowRight'].includes(e.key) && e.target.matches('[data-tab]')) {
    const order = ['preview', 'variants', 'code']; const i = order.indexOf(e.target.dataset.tab);
    const n = order[(i + (e.key === 'ArrowRight' ? 1 : 2)) % 3]; S.tab = n; go(S.id, n); renderMain(); $(`#tab-${n}`)?.focus();
  }
});
$('#main').addEventListener('input', (e) => { const act = e.target.closest('#stage [data-act^="input:"]'); if (act) handleAct(act, 'input'); });
$('#main').addEventListener('change', (e) => { const act = e.target.closest('#stage select[data-act^="input:"]'); if (act) handleAct(act, 'input'); });

function loadVariant(key) {
  const [gi, vi] = key.split(':').map(Number);
  const c = comp(); const v = c.variants[gi].items[vi];
  S.props = { ...defaults(c), ...v.props }; S.tab = 'preview'; go(S.id); renderMain(); renderPanel();
  toast(`“${v.label}” yüklendi`);
}

// Preview içindeki etkileşimler property'leri günceller (toggle, checkbox, radio, chip, input...)
function handleAct(el, kind) {
  const [type, rest] = el.dataset.act.split(':');
  if (type === 'toggle' && kind === 'click') setProp(rest, !S.props[rest], { rerender: true });
  else if (type === 'set' && kind === 'click') { const [k, v] = rest.split('='); const p = comp().props.find((x) => x.k === k); setProp(k, p && typeof p.d === 'number' ? Number(v) : v, { rerender: true }); }
  else if (type === 'input' && kind === 'input') setProp(rest, el.value, { rerender: false });
}

/* ------------------------------------------------------------------ panel */
function control(p, v) {
  const id = `pp-${p.k}`;
  if (p.t === 'text') return `<input class="ui-input" id="${id}" type="text" value="${esc(v)}" data-k="${p.k}">`;
  if (p.t === 'textarea') return `<textarea class="ui-input ui-textarea" id="${id}" rows="3" data-k="${p.k}">${esc(v)}</textarea>`;
  if (p.t === 'number') return `<input class="ui-input ui-input--num" id="${id}" type="number" value="${v}" min="${p.min ?? ''}" max="${p.max ?? ''}" step="${p.step ?? 1}" data-k="${p.k}">`;
  if (p.t === 'range') return `<div class="ui-range"><input id="${id}" type="range" value="${v}" min="${p.min}" max="${p.max}" step="${p.step ?? 1}" data-k="${p.k}"><output for="${id}">${v}</output></div>`;
  if (p.t === 'bool') return `<button type="button" role="switch" class="ui-switch" id="${id}" aria-checked="${!!v}" data-k="${p.k}" data-bool><span></span></button>`;
  if (p.t === 'enum' && p.o.length <= 4) return `<div class="ui-seg" role="radiogroup" aria-labelledby="${id}-l">${p.o.map((o) => `<button type="button" role="radio" aria-checked="${o === v}" data-k="${p.k}" data-val="${esc(o)}" tabindex="${o === v ? 0 : -1}">${esc(o)}</button>`).join('')}</div>`;
  if (p.t === 'enum') return `<div class="ui-selectwrap"><select class="ui-input" id="${id}" data-k="${p.k}">${p.o.map((o) => `<option${o === v ? ' selected' : ''}>${esc(o)}</option>`).join('')}</select>${icon('chevronDown', 16)}</div>`;
  return '';
}

function tokenRow(name) {
  if (colors[name]) return `<li><span class="ui-tok__sw" style="background: var(--${name.replace(/\./g, '-')})"></span><code>${name}</code><span>${colors[name][S.theme]}</span></li>`;
  const [g, k] = name.split('.');
  if (g === 'radius') return `<li><span class="ui-tok__sw ui-tok__sw--radius" style="border-radius: var(--radius-${k})"></span><code>${name}</code><span>${radius[k]}px</span></li>`;
  if (g === 'type') { const t = typeScale[k]; return `<li><span class="ui-tok__sw ui-tok__sw--type">Aa</span><code>${name}</code><span>${t.size}/${t.line} · ${t.weight}</span></li>`; }
  if (g === 'shadow') return `<li><span class="ui-tok__sw ui-tok__sw--shadow" style="box-shadow: var(--shadow-${k})"></span><code>${name}</code><span>gölge</span></li>`;
  return `<li><code>${name}</code></li>`;
}

function renderPanel() {
  if (isFoundation(S.id)) {
    $('#panel').innerHTML = `<div class="ui-panel__head"><h2>Token kaynağı</h2></div>
    <div class="ui-panel__body ui-prose">
      <p>Tüm değerlerin tek kaynağı <code>src/tokens/</code> klasörü: <code>colors.js</code>, <code>typography.js</code>, <code>shape.js</code>.</p>
      <p><code>npm run dev</code> ve <code>npm run build</code> bunlardan <code>tokens.css</code>’i üretir. Component CSS’leri yalnızca bu değişkenleri kullanır, hex içermez.</p>
      <p>Bir değeri değiştirdiğinde, örneğin <code>action.primary</code>, tüm kütüphane güncellenir.</p>
      <p class="ui-hint">Etkin tema: <b>${S.theme === 'dark' ? 'Koyu' : 'Açık'}</b>. Kartlar bu temanın hex değerini kopyalar.</p>
    </div>`;
    return;
  }
  const c = comp(); const d = defaults(c);
  const changed = Object.keys(diffProps(c, S.props)).length;
  $('#panel').innerHTML = `
  <div class="ui-panel__head"><h2>Properties</h2><button type="button" class="ui-reset" id="resetAll"${changed ? '' : ' disabled'}>${icon('reset', 15)}Reset to default${changed ? ` <span>${changed}</span>` : ''}</button></div>
  <div class="ui-panel__body">
    ${c.props.map((p) => {
      const mod = S.props[p.k] !== d[p.k];
      return `<div class="${cx('ui-prop', mod && 'is-modified')}" data-row="${p.k}">
        <div class="ui-prop__label"><label id="pp-${p.k}-l" for="pp-${p.k}">${esc(p.l)}</label><code>${p.k}</code>${mod ? `<button type="button" class="ui-prop__reset" data-reset="${p.k}" title="Default: ${esc(String(d[p.k]))}" aria-label="${esc(p.l)} default değere dön">${icon('reset', 13)}</button>` : ''}</div>
        ${control(p, S.props[p.k])}
      </div>`;
    }).join('')}
  </div>
  <div class="ui-panel__tokens"><h3>Kullandığı token’lar <span>${c.tokens.length}</span></h3><ul class="ui-tok">${c.tokens.map(tokenRow).join('')}</ul></div>`;
}

function setProp(k, v, { rerender = true, fromPanel = false } = {}) {
  S.props = { ...S.props, [k]: v };
  if (S.tab === 'preview' && rerender) { const st = $('#stage'); if (st) st.innerHTML = comp().render(S.props); }
  if (S.tab === 'code') renderTab();
  if (fromPanel) syncPanelMarks(); else renderPanel();
}

function syncPanelMarks() {
  const c = comp(); const d = defaults(c); const changed = Object.keys(diffProps(c, S.props)).length;
  for (const p of c.props) {
    const row = $(`[data-row="${p.k}"]`); if (!row) continue;
    const mod = S.props[p.k] !== d[p.k];
    row.classList.toggle('is-modified', mod);
    const lab = row.querySelector('.ui-prop__label'); const rb = lab.querySelector('[data-reset]');
    if (mod && !rb) lab.insertAdjacentHTML('beforeend', `<button type="button" class="ui-prop__reset" data-reset="${p.k}" title="Default: ${esc(String(d[p.k]))}" aria-label="${esc(p.l)} default değere dön">${icon('reset', 13)}</button>`);
    if (!mod && rb) rb.remove();
  }
  const r = $('#resetAll'); r.disabled = !changed; r.innerHTML = `${icon('reset', 15)}Reset to default${changed ? ` <span>${changed}</span>` : ''}`;
}

const panel = $('#panel');
panel.addEventListener('input', (e) => {
  const el = e.target; const k = el.dataset.k; if (!k) return;
  const p = comp().props.find((x) => x.k === k);
  let v = el.value;
  if (p.t === 'number' || p.t === 'range') { v = el.value === '' ? p.d : Number(el.value); if (p.t === 'range') el.nextElementSibling.textContent = v; }
  setProp(k, v, { fromPanel: true });
});
panel.addEventListener('click', (e) => {
  const sw = e.target.closest('[data-bool]');
  if (sw) { const k = sw.dataset.k; const v = !S.props[k]; sw.setAttribute('aria-checked', String(v)); setProp(k, v, { fromPanel: true }); return; }
  const seg = e.target.closest('.ui-seg [data-val]');
  if (seg) { const k = seg.dataset.k; seg.parentElement.querySelectorAll('[data-val]').forEach((b) => { const on = b === seg; b.setAttribute('aria-checked', String(on)); b.tabIndex = on ? 0 : -1; }); setProp(k, seg.dataset.val, { fromPanel: true }); return; }
  const rs = e.target.closest('[data-reset]');
  if (rs) { const k = rs.dataset.reset; setProp(k, defaults(comp())[k]); $(`#pp-${k}`)?.focus(); return; }
  if (e.target.closest('#resetAll')) { S.props = defaults(comp()); renderTab(); renderPanel(); toast('Tüm property’ler default’a döndü'); $('#resetAll')?.focus(); }
});
panel.addEventListener('keydown', (e) => {
  const seg = e.target.closest('.ui-seg [data-val]');
  if (seg && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
    e.preventDefault(); const all = [...seg.parentElement.querySelectorAll('[data-val]')]; const i = all.indexOf(seg);
    const n = all[(i + (e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : all.length - 1)) % all.length]; n.click(); n.focus();
  }
});

/* ------------------------------------------------------------------ boot */
function renderAll() { renderNav(); renderMain(); renderPanel(); document.title = `${isFoundation(S.id) ? FOUNDATIONS.find((f) => f.id === S.id).name : comp().name} · Senin UI`; }
applyTheme();
readHash();
renderAll();
