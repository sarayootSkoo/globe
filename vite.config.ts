import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte()],
  base: './',
  define: {
    'process.env': JSON.stringify({
      SECURE_STORAGE_SECRET: process.env.VITE_SECURE_STORAGE_SECRET || 'x1bQYQA4vSEcR6RQ05XtJg',
      SECURE_STORAGE_PREFIX: process.env.VITE_SECURE_STORAGE_PREFIX || '@secst',
    }),
  },
});
