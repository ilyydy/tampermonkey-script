import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';
import { merge } from 'lodash-es';

import { baseViteConfig, getBaseMonkeyConfig } from '../viteConfig';
import { getDirname } from '../util';

const dirName = getDirname(import.meta.url);

export default defineConfig({
  ...baseViteConfig,
  plugins: [
    monkey(
      merge(getBaseMonkeyConfig(dirName), {
        userscript: {
          version: '0.0.1',
          description: 'CSDN 页面优化处理',
          icon: 'https://g.csdnimg.cn/static/logo/favicon32.ico',
          match: ['http*://blog.csdn.net/*'],
        },
      })
    ),
  ],
});
