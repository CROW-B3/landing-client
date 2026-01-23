import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  adapter: cloudflare({
    imageService: 'cloudflare',
    platformProxy: {
      enabled: true,
      persist: true,
    },
    routes: {
      extend: {
        exclude: [
          { pattern: '/fonts/*' },
          { pattern: '/_astro/*' },
        ],
      },
    },
  }),
  integrations: [
    preact({ compat: true }),
  ],
  security: {
    checkOrigin: true,
    allowedDomains: [
      {
        hostname: '**.bitbybit-b3.workers.dev',
        protocol: 'https',
      },
      {
        hostname: 'crow-landing-client.bitbybit-b3.workers.dev',
        protocol: 'https',
      },
      {
        hostname: 'localhost',
      },
    ],
  },
  build: {
    concurrency: 4,
  },
  server: {
    port: 3000,
    host: true,
  },
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
