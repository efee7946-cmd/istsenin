import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { buildTokens } from './scripts/build-tokens.mjs';

// Dev sırasında src/tokens/*.js değişirse tokens.css yeniden üretilir → tüm kütüphane güncellenir.
const tokensPlugin = () => ({
  name: 'senin-tokens',
  async handleHotUpdate({ file }) {
    if (/src[\\/]tokens[\\/].+\.js$/.test(file)) await buildTokens();
  },
});

export default defineConfig(({ mode }) => ({
  plugins: [tokensPlugin(), ...(mode === 'single' ? [viteSingleFile()] : [])],
  build: { outDir: mode === 'single' ? 'dist-single' : 'dist' },
}));
