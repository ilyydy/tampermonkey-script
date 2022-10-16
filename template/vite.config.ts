import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import monkey from 'vite-plugin-monkey';
import { merge } from 'lodash-es';

import { baseViteConfig, getBaseMonkeyConfig } from '@/config';
import { getDirname } from '@/util';

const dirName = getDirname(import.meta.url);

export default defineConfig({
  ...baseViteConfig,
  plugins: [
    vue(),
    monkey(
      merge(getBaseMonkeyConfig(dirName), {
        userscript: {
          version: '0.0.1',
          description: 'TODO',
          icon: 'TODO',
          match: ['TODO'],
        },
      })
    ),
  ],
});