// Kural: component CSS dosyalarında hex renk olmaz; yalnızca token değişkenleri (var(--...)) kullanılır.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
const dir = 'src/components';
let bad = 0;
for (const c of readdirSync(dir)) {
  const p = join(dir, c);
  if (!statSync(p).isDirectory()) continue;
  for (const f of readdirSync(p).filter((x) => x.endsWith('.css') || x.endsWith('.js'))) {
    readFileSync(join(p, f), 'utf8').split('\n').forEach((line, i) => {
      if (/#[0-9a-fA-F]{3,8}\b/.test(line) && !/^\s*\/\//.test(line)) { console.log(`${p}/${f}:${i + 1}  ${line.trim()}`); bad++; }
    });
  }
}
console.log(bad ? `\n${bad} satırda hex bulundu.` : 'Component dosyalarında hex yok ✓');
process.exit(bad ? 1 : 0);
