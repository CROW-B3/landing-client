import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  integrations: [
    preact({ compat: true }),
  ],
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ['@b3-crow/ui-kit'],
    },
    optimizeDeps: {
      include: ['@b3-crow/ui-kit'],
    },
  },
});
