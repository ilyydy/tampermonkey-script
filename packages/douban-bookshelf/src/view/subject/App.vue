<template>
  <BookShelf></BookShelf>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import BookShelf from '../components/BookShelf.vue';
import { getBook } from '../../parser/subject';
import { useInitBtns } from './util';

import type { Book } from '../../types';

let book = ref<null | Book>(null);

onMounted(() => {
  book.value = getBook(document);
  if (book.value) {
    useInitBtns(document, book.value);
  }
});
</script>

<style scoped></style>
