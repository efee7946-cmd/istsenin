// Code tab'ı için: mevcut property değerlerinden JS çağrısı ve biçimlenmiş HTML üretir.

export function diffProps(comp, props) {
  const out = {};
  for (const p of comp.props) if (props[p.k] !== p.d) out[p.k] = props[p.k];
  return out;
}

function lit(v) {
  if (typeof v === 'string') return `'${v.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n')}'`;
  return String(v);
}

export function jsSnippet(comp, id, props) {
  const d = diffProps(comp, props);
  const name = comp.name.replace(/[^A-Za-z]/g, '');
  const body = comp.props.map((p) => `  ${p.k}: ${lit(props[p.k])},${p.k in d ? '   // default: ' + lit(p.d) : ''}`).join('\n');
  return `import ${name} from './components/${id}/${id}.js';\n\nconst html = ${name}.render({\n${body}\n});\ndocument.querySelector('#hedef').innerHTML = html;`;
}

const VOID = new Set(['input', 'br', 'img', 'hr', 'path', 'circle', 'rect']);

export function prettyHtml(html) {
  const cleaned = html.replace(/<svg[\s\S]*?<\/svg>/g, '<svg …/>').replace(/>\s+</g, '><').trim();
  const tokens = cleaned.split(/(<[^>]+>)/).filter((t) => t.trim() !== '');
  let depth = 0; const out = [];
  for (const t of tokens) {
    if (t.startsWith('</')) { depth = Math.max(0, depth - 1); out.push('  '.repeat(depth) + t); continue; }
    if (t.startsWith('<')) {
      out.push('  '.repeat(depth) + t);
      const tag = (t.match(/^<([a-z0-9-]+)/i) || [])[1]?.toLowerCase();
      if (!t.endsWith('/>') && !VOID.has(tag)) depth++;
      continue;
    }
    out.push('  '.repeat(depth) + t.trim());
  }
  return out.join('\n');
}
