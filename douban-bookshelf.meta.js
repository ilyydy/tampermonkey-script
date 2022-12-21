// ==UserScript==
// @name               豆瓣读书书架
// @name:zh            豆瓣读书书架
// @namespace          https://github.com/ilyydy/tampermonkey-script
// @version            0.0.2
// @author             ilyydy
// @description        无需登录，快速选择书籍加入书架，复制导出书籍信息
// @description:zh     无需登录，快速选择书籍加入书架，复制导出书籍信息
// @description:zh-CN  无需登录，快速选择书籍加入书架，复制导出书籍信息
// @license            MIT
// @icon               https://img3.doubanio.com/favicon.ico
// @supportURL         https://github.com/ilyydy/tampermonkey-script/issues
// @downloadURL        https://github.com/ilyydy/tampermonkey-script/raw/douban-bookshelf/douban-bookshelf.user.js
// @updateURL          https://github.com/ilyydy/tampermonkey-script/raw/douban-bookshelf/douban-bookshelf.meta.js
// @match              http*://*book.douban.com/*
// @match              http*://search.douban.com/book/*
// @require            https://cdn.jsdelivr.net/npm/vue@3.2.45/dist/vue.global.prod.js
// @require            data:application/javascript,window.Vue%3DVue%3B
// @require            https://cdn.jsdelivr.net/npm/element-plus@2.2.19/dist/index.full.min.js
// @require            https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js
// @require            https://cdn.jsdelivr.net/npm/csv-stringify@6.2.3/dist/iife/sync.js
// @resource           element-plus/dist/index.css  https://cdn.jsdelivr.net/npm/element-plus@2.2.19/dist/index.css
// @connect            book.douban.com
// @grant              GM_getResourceText
// @grant              GM_getValue
// @grant              GM_setClipboard
// @grant              GM_setValue
// @grant              GM_xmlhttpRequest
// ==/UserScript==