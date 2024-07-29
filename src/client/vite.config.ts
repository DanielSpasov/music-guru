/// <reference types="vitest" />
/// <reference types="vite/client" />

import eslint from '@rollup/plugin-eslint';
import react from '@vitejs/plugin-react';

import { defineConfig as defineViteConfig, mergeConfig } from 'vite';
import { defineConfig as defineVitestConfig } from 'vitest/config';

const hash = (str: string) => {
  let hash = 5381;
  let i = str.length;
  while (i) hash = (hash * 33) ^ str.charCodeAt(--i);
  return hash >>> 0;
};

const viteConfig = defineViteConfig({
  plugins: [
    react(),
    { ...eslint({ include: 'src/**/*.+(js|jsx|ts|tsx)' }), enforce: 'pre' }
  ],
  server: {
    port: 3000,
    open: true
  },
  css: {
    modules: {
      generateScopedName: (name, _, css) => {
        if (name === 'dark') return 'dark';
        const i = css.indexOf(`.${name}`);
        const lineNumber = css.substring(0, i).split(/[\r\n]/).length;
        return `_${name}_${hash(css)}_${lineNumber}`;
      }
    }
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
