<template>
  <div>
    <div
      class="book-field"
      v-for="item in briefBookItemFormatter"
      :key="item.key"
    >
      {{ item.label }}:
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

import { useStore } from '../../store';
import { BOOK_FIELD_MAP, bookItemFormatter } from '../../constant';

import type { Book, BookField } from '../../types';

const props = defineProps<{
  book: Book;
}>();
const emit = defineEmits<{ (event: 'select', book: Book): void }>();

const { booksStore } = useStore();

const briefFields: BookField[] = ['id', 'title', 'authors', 'ISBN'];

const briefBookItemFormatter = bookItemFormatter.filter((i) =>
  briefFields.includes(i.key)
);

function select() {
  emit('select', props.book);
}
</script>

<style scoped>
.book-field {
  margin-bottom: 5px;
}

.book-button {
  margin-top: 10px;
}
</style>
