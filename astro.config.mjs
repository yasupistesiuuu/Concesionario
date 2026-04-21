import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import path from 'path';

export default defineConfig({
  output: 'static',
  site: 'https://concesionario-luxury.vercel.app',
  integrations: [react(), sitemap({ filter: (page) => page !== 'https://concesionario-luxury.vercel.app/404' })],
  vite: {
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
  },
});
