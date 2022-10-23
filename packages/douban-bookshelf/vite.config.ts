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
      })
    ),
  ],
});
