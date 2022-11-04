<template>
  <ElDialog
    :model-value="show && book"
    title="书籍详情"
    width="50%"
    :before-close="handleClose"
  >
    <div v-if="book">
      <div class="book-field" v-for="item in bookItemFormatter" :key="item.key">
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
    </div>
  </ElDialog>
</template>

<script setup lang="ts">
import { ElDialog } from 'element-plus';

import {
  BOOK_FIELD_MAP,
  defaultBookFields,
  bookItemFormatter,
} from '../../constant';

import type { Book, BookField } from '../../types';

defineProps<{
  book: Book | undefined;
  show: boolean;
}>();
const emit = defineEmits(['close']);

function handleClose() {
  emit('close');
}
</script>

<style scoped></style>
