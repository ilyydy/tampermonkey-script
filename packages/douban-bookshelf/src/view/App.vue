<template>
  <BookShelf></BookShelf>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import BookShelf from './components/BookShelf.vue';
import { init as subjectInit } from './subject/index';

onMounted(async () => {
  const map: { [index: string]: (doc: Document) => void } = {
    ['book.douban.com/subject']: subjectInit,
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
