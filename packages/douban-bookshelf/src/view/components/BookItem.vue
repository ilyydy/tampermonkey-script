<template>
  <div>
    <ElCard>
      <div class="book-field" v-for="item in fields" :key="item.key">
        {{ BOOK_FIELD_MAP[item.key] }}:
        <span v-if="item.type === 'string'">{{ book[item.key] }}</span>
        <ElButton v-else-if="item.type === 'link'" type="primary" link>{{
          book[item.key]
        }}</ElButton>
      </div>

      <div class="book-button">
        <ElButton round size="small" type="primary">查看详情</ElButton>
        <ElButton
          round
          size="small"
          type="danger"
          @click="booksStore.removeBook(book.id)"
          >移除</ElButton
        >
      </div>
    </ElCard>
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
const fields: { key: BookField; type: 'string' | 'link' }[] = reactive([
  {
    key: 'id',
    type: 'string',
  },
  {
    key: 'title',
    type: 'string',
  },
  {
    key: 'ISBN',
    type: 'string',
  },
  {
    key: 'doubanUrl',
    type: 'link',
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
