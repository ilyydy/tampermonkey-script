import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';
import { merge } from 'lodash-es';

import { version } from './package.json';
import { baseViteConfig, getBaseMonkeyConfig } from '../viteConfig';
import { getDirname } from '../util';

const dirName = getDirname(import.meta.url);

export default defineConfig({
  ...baseViteConfig,
  plugins: [
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
      })
    ),
  ],
});
