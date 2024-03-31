/// <reference types="vitest" />
/// <reference types="vite/client" />

import eslint from '@rollup/plugin-eslint';
import react from '@vitejs/plugin-react';

import { defineConfig as defineViteConfig, mergeConfig } from 'vite';
import { defineConfig as defineVitestConfig } from 'vitest/config';

const viteConfig = defineViteConfig({
  plugins: [
    react(),
    { ...eslint({ include: 'src/**/*.+(js|jsx|ts|tsx)' }), enforce: 'pre' }
  ],
  server: {
    port: 3000,
    open: true
  }
});

const vitestConfig = defineVitestConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts']
  }
});

export default mergeConfig(viteConfig, vitestConfig);
