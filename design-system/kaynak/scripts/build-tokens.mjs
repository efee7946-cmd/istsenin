// src/tokens/*.js → src/tokens/tokens.css
// `npm run dev` ve `npm run build` öncesinde otomatik çalışır; dev sırasında token dosyası değişince vite.config.js yeniden çağırır.
import { writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const tokDir = resolve(root, 'src/tokens');

export const cssVar = (name) => '--' + name.replace(/\./g, '-');

export async function buildTokens() {
  const bust = `?t=${Date.now()}`;
  const { colors } = await import(pathToFileURL(resolve(tokDir, 'colors.js')).href + bust);
  const { fontFamily, typeScale } = await import(pathToFileURL(resolve(tokDir, 'typography.js')).href + bust);
  const { radius, space, shadow, motion, size } = await import(pathToFileURL(resolve(tokDir, 'shape.js')).href + bust);

  const light = [], dark = [];
  for (const [k, v] of Object.entries(colors)) { light.push(`  ${cssVar(k)}: ${v.light};`); dark.push(`  ${cssVar(k)}: ${v.dark};`); }
  for (const [k, v] of Object.entries(shadow)) { light.push(`  --shadow-${k}: ${v.light};`); dark.push(`  --shadow-${k}: ${v.dark};`); }

  const base = [`  --font-family: ${fontFamily};`];
  for (const [k, t] of Object.entries(typeScale)) {
    base.push(`  --type-${k}-size: ${t.size}px;`, `  --type-${k}-line: ${t.line}px;`, `  --type-${k}-weight: ${t.weight};`, `  --type-${k}-tracking: ${t.tracking}px;`);
  }
  for (const [k, v] of Object.entries(radius)) base.push(`  --radius-${k}: ${v}px;`);
  for (const [k, v] of Object.entries(space)) base.push(`  --space-${k}: ${v}px;`);
  for (const [k, v] of Object.entries(size)) base.push(`  --size-${k}: ${v}px;`);
  for (const [k, v] of Object.entries(motion)) base.push(`  --motion-${k}: ${v};`);

  const css = `/* OTOMATİK ÜRETİLDİ — elle düzenleme.
   Kaynak: src/tokens/colors.js, typography.js, shape.js
   Yeniden üretmek için: npm run tokens */

:root {
${base.join('\n')}
${light.join('\n')}
  color-scheme: light;
}

:root[data-theme="dark"] {
${dark.join('\n')}
  color-scheme: dark;
}
`;
  writeFileSync(resolve(tokDir, 'tokens.css'), css);
  return Object.keys(colors).length;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const n = await buildTokens();
  console.log(`tokens.css üretildi (${n} renk token'ı)`);
}
