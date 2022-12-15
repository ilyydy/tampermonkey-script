<template>
  <div class="book-field" v-for="item in bookFormatter" :key="item.key">
    <div v-if="item.key === 'contentBrief'">{{ item.label }}:</div>
    <span v-else>{{ item.label }}: </span>
    <span v-if="item.type === 'string'" :style="item.styleObj">{{
      item.getText ? item.getText(book) : book[item.key]
    }}</span>

    <a
      v-else-if="item.type === 'link'"
      :href="item.getLink ? item.getLink(book) : `${book[item.key]}`"
      target="_blank"
      :style="item.styleObj"
      >{{ book[item.key] }}
    </a>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { defaultBookFields, bookItemFormatters } from '../../common/book';

import type { Book, BookField } from '../../types';

const props = withDefaults(
  defineProps<{
    book: Book;
    fields?: BookField[];
    hideEmptyField?: boolean;
  }>(),
  { fields: () => defaultBookFields, hideEmptyField: true }
);

const bookFormatter = computed(() =>
  bookItemFormatters.filter((i) => {
    return (
      props.fields.includes(i.key) &&
      (!props.hideEmptyField || !!props.book[i.key])
    );
  })
);
</script>

<style scoped>
.book-field {
  margin-bottom: 5px;
}
</style>
