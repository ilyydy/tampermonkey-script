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
            '': 'csdn 页面优化处理',
            zh: 'csdn 页面优化处理',
          },
          version,
          description: {
            '': '解除页面对复制的限制',
            zh: '解除页面对复制的限制',
            'zh-CN': '解除页面对复制的限制',
          },
          icon: 'https://g.csdnimg.cn/static/logo/favicon32.ico',
          match: ['http*://blog.csdn.net/*'],
        },
      })
    ),
  ],
});
