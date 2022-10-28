<template>
  <div>
    <div class="book-field" v-for="item in fields" :key="item.key">
      {{ BOOK_FIELD_MAP[item.key] }}:
      <span v-if="item.type === 'string'">{{
        item.getText ? item.getText(book) : book[item.key]
      }}</span>

      <a
        v-else-if="item.type === 'link'"
        :href="item.getLink ? item.getLink(book) : `${book[item.key]}`"
        target="_blank"
        >{{ book[item.key] }}</a
      >
    </div>

    <div class="book-button">
      <ElButton round size="small" type="primary">详情</ElButton>
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
import { ElButton, ElCard } from 'element-plus';
import { reactive } from 'vue';

import { useStore } from '../../store';
import { BOOK_FIELD_MAP } from '../../constant';

import type { Book, BookField } from '../../types';

defineProps<{
  book: Book;
}>();

const { booksStore } = useStore();

interface PlainTextType {
  key: BookField;
  type: 'string';
  getText?: (book: Book) => string;
}

interface ButtonType {
  key: BookField;
  type: 'link';
  getLink?: (book: Book) => string;
}

const fields: (ButtonType | PlainTextType)[] = reactive([
  {
    key: 'id',
    type: 'link',
    getLink: (book) => book.doubanUrl,
  },
  {
    key: 'title',
    type: 'string',
    getText: (book) =>
      book.subTitle ? `${book.title}-${book.subTitle}` : book.title,
  },
  {
    key: 'authors',
    type: 'string',
    getText: (book) => book.authors.join(', '),
  },
  {
    key: 'ISBN',
    type: 'string',
  },
]);
</script>

<style scoped>
.book-field {
  margin-bottom: 5px;
}

.book-button {
  margin-top: 10px;
}
</style>
