<template>
  <div class="book-field" v-for="item in bookFormatter" :key="item.key">
    {{ item.label }}:
    <span v-if="item.type === 'string'">{{
      item.getText ? item.getText(book) : book[item.key]
    }}</span>

    <a
      v-else-if="item.type === 'link'"
      :href="item.getLink ? item.getLink(book) : `${book[item.key]}`"
      target="_blank"
      >{{ book[item.key] }}
    </a>
  </div>
</template>

<script setup lang="ts">
import { defaultBookFields, bookItemFormatter } from '../../constant';

import type { Book, BookField } from '../../types';

const props = defineProps<{
  book: Book;
  fields?: BookField[];
}>();

const bookFormatter = bookItemFormatter.filter((i) =>
  (props.fields ?? defaultBookFields).includes(i.key)
);
</script>

<style scoped>
.book-field {
  margin-bottom: 5px;
}
</style>
