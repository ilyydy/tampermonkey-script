import { defineConfig } from 'vite';
import monkey, { cdn } from 'vite-plugin-monkey';
import { merge } from 'lodash-es';
import vue from '@vitejs/plugin-vue';

import { version } from './package.json';
import { baseViteConfig, getBaseMonkeyConfig } from '../viteConfig';
import { getDirname } from '../util';

const dirName = getDirname(import.meta.url);

export default defineConfig({
  ...baseViteConfig,
  plugins: [
    vue(),
    monkey(
      merge(getBaseMonkeyConfig(dirName), {
        userscript: {
          name: {
            '': 'TODO',
            zh: 'TODO',
            en: 'TODO',
          },
          version,
          description: {
            '': 'TODO',
            zh: 'TODO',
            en: 'TODO ',
            'zh-CN': 'TODO',
          },
          icon: 'TODO',
          match: ['TODO'],
        },
        build: {
          externalGlobals: {
            vue: cdn.jsdelivr('Vue', 'dist/vue.global.prod.js'),
          },
        },
      })
    ),
  ],
});
