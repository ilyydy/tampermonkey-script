<template>
  <BookShelf></BookShelf>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import BookShelf from './components/BookShelf.vue';
import { init as subjectInit } from './subject/index';
import { init as searchInit } from './search/index';
import { init as seriesInit } from './series/index';
import { init as worksInit } from './works/index';
import { init as pressInit } from './press/index';
import { init as authorBookInit } from './authorBook/index';

onMounted(async () => {
  const map: { [index: string]: (doc: Document) => void } = {
    ['book.douban.com/subject']: subjectInit,
    ['search.douban.com/book']: searchInit,
    ['book.douban.com/series']: seriesInit,
    ['book.douban.com/works']: worksInit,
    ['book.douban.com/press']: pressInit,
    ['book.douban.com/author']: authorBookInit,
  };

  const url = new URL(document.URL);
  const initFunc =
    map[url.host + url.pathname.split('/').slice(0, 2).join('/')];

  if (initFunc) {
    initFunc(document);
  } else {
    console.warn(`${url} 没有对应的处理方法`);
  }
});
</script>

<style scoped></style>
