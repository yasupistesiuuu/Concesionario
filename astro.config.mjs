import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import path from 'path';

export default defineConfig({
  output: 'static',
  site: 'https://autosvelacruz.es',
  integrations: [react()],
  vite: {
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
  },
});
