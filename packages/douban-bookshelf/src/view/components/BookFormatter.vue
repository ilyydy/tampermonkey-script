<template>
  <div class="book-field" v-for="item in bookItemFormatter" :key="item.key">
    <div
      v-show="
        props.fields.includes(item.key) &&
        (!props.hideEmptyField || !!props.book[item.key])
      "
    >
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
  </div>
</template>

<script setup lang="ts">
import { defaultBookFields, bookItemFormatter } from '../../constant';

import type { Book, BookField } from '../../types';

const props = withDefaults(
  defineProps<{
    book: Book;
    fields?: BookField[];
    hideEmptyField?: boolean;
  }>(),
  { fields: () => defaultBookFields, hideEmptyField: true }
);
</script>

<style scoped>
.book-field {
  margin-bottom: 5px;
}
</style>
