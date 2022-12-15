<template>
  <div class="item">
    <div>
      <BookFormatter
        :book="book"
        :fields="briefFields"
        :hide-empty-field="false"
      >
      </BookFormatter>
    </div>

    <div class="item-button">
      <div>
        <ElButton round size="small" type="primary" @click="select"
          >详情</ElButton
        >
      </div>

      <div>
        <ElButton
          round
          size="small"
          type="primary"
          @click="() => copyBookWithTip(book)"
          >复制</ElButton
        >
      </div>

      <div>
        <ElButton
          round
          size="small"
          type="danger"
          @click="booksStore.removeBook(book.id)"
          >移除</ElButton
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElButton } from 'element-plus';

import BookFormatter from './BookFormatter.vue';
import { useStore } from '../../store';
import { copyBookWithTip } from '../../common/book';

import type { Book, BookField } from '../../types';

const props = defineProps<{
  book: Book;
}>();
const emit = defineEmits<{ (event: 'select', book: Book): void }>();

const { booksStore } = useStore();

const briefFields: BookField[] = ['id', 'title', 'authors', 'score', 'ISBN'];

function select() {
  emit('select', props.book);
}
</script>

<style scoped>
.item {
  display: grid;
  grid-template-columns: 80% 20%;
}

.item-button {
  display: grid;
}
</style>
