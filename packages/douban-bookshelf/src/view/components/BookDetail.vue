<template>
  <ElDialog
    :model-value="show && !!book"
    title="书籍详情"
    width="70%"
    :style="{ 'max-height': '80vh' }"
    :before-close="handleClose"
  >
    <div v-if="!!book">
      <BookFormatter :book="book"> </BookFormatter>
    </div>
  </ElDialog>
</template>

<script setup lang="ts">
import { ElDialog } from 'element-plus';

import BookFormatter from './BookFormatter.vue';

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
