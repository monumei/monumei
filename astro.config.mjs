// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://monumei.com',
  build: { inlineStylesheets: 'auto' },
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
  // Both integrations run at build time and ship no runtime JavaScript, which
  // keeps the site's zero-runtime-dependency rule intact.
  integrations: [
    sitemap({
      filter: (page) => !new URL(page).pathname.startsWith('/blog/channel/'),
    }),
  ],
});
