<template>
  <div>
    <BookFormatter :book="book" :fields="briefFields"> </BookFormatter>

    <div class="book-button">
      <ElButton round size="small" type="primary" @click="select"
        >详情</ElButton
      >
      <ElButton
        round
        size="small"
        type="danger"
        @click="booksStore.removeBook(book.id)"
        >移除</ElButton
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElButton } from 'element-plus';

import BookFormatter from './BookFormatter.vue';
import { useStore } from '../../store';

import type { Book, BookField } from '../../types';

const props = defineProps<{
  book: Book;
}>();
const emit = defineEmits<{ (event: 'select', book: Book): void }>();

const { booksStore } = useStore();

const briefFields: BookField[] = ['id', 'title', 'authors', 'ISBN'];

function select() {
  emit('select', props.book);
}
</script>

<style scoped>
.book-button {
  margin-top: 10px;
}
</style>
