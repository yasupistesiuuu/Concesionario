import { defineConfig } from 'astro/config';
import path from 'path';

export default defineConfig({
  output: 'static',
  site: 'https://autosvelacruz.es',
  vite: {
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
  },
});
