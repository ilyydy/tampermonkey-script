<template>
  <div>
    <div>
      <div v-for="item in fields" :key="item.key">
        <div>
          {{ BOOK_FIELD_MAP[item.key] }}:
          <span v-if="item.type === 'string'">{{ book[item.key] }}</span>
          <ElButton v-else-if="item.type === 'link'" type="text">{{
            book[item.key]
          }}</ElButton>
        </div>
      </div>
    </div>

    <div>
      <ElButton>查看详情</ElButton>
      <ElButton @click="booksStore.removeBook(book.id)">移除</ElButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElButton } from 'element-plus';
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

<style scoped></style>
