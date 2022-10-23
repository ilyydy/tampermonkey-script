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
            '': '豆瓣读书书架',
            zh: '豆瓣读书书架',
          },
          version,
          description: {
            '': '无需登录，快速选择书籍加入书架，复制导出书籍信息',
            zh: '无需登录，快速选择书籍加入书架，复制导出书籍信息',
            'zh-CN': '无需登录，快速选择书籍加入书架，复制导出书籍信息',
          },
          icon: 'https://img3.doubanio.com/favicon.ico',
          match: [
            'http*://book.douban.com/subject/*',
            'https://book.douban.com/series/*',
            'https://search.douban.com/book/subject_search',
          ],
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
