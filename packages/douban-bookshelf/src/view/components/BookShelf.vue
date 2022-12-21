<template>
  <div v-show="!showDrawer" class="affix">
    <ElButton
      :icon="ArrowLeft"
      circle
      type="primary"
      @click="showDrawer = !showDrawer"
    ></ElButton>
  </div>

  <ElDrawer v-model="showDrawer" title="书架">
    <template #default>
      <div class="book-list-container">
        <div class="book-list-container-header">
          <ElButton
            round
            type="primary"
            :disabled="books.length === 0"
            @click="() => exportBookExcel(books)"
            >导出</ElButton
          >
          <ElButton
            round
            type="danger"
            :disabled="books.length === 0"
            @click="booksStore.clearBook"
            >清空</ElButton
          >

          <!-- <ElSelect v-model="sortKey" class="book-list-container-header-select">
            <ElOption
              v-for="item in sortKeyOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </ElSelect>

          <ElSwitch
            v-model="sortAsc"
            class="book-list-container-header-switch"
            inline-prompt
            :active-icon="SortUp"
            :inactive-icon="SortDown"
          /> -->
        </div>

        <div class="book-list-container-body">
          <div v-if="books.length > 0">
            <div
              class="book-list-container-book-item"
              v-for="book in books"
              :key="book.id"
            >
              <BookItem :book="book" @select="selectBook"></BookItem>
            </div>
          </div>

          <div v-else class="book-list-container-empty">
            <p>书架为空</p>
          </div>
        </div>
      </div>
    </template>
  </ElDrawer>

  <BookDetail
    :book="selectedBook"
    :show="showDetail"
    @close="showDetail = false"
  ></BookDetail>
</template>

<script setup lang="ts">
import { ElButton, ElDrawer, ElSelect, ElOption, ElSwitch } from 'element-plus';
import { ArrowLeft, SortDown, SortUp } from '@element-plus/icons-vue';
import { ref, computed } from 'vue';

import { useStore } from '../../store';
import BookItem from './BookItem.vue';
import BookDetail from './BookDetail.vue';
import { exportBookExcel } from '../../common/book';

import type { Book, BookInStore, BookField } from '../../types';
import type { Ref } from 'vue';

const { booksStore } = useStore();

const showDrawer = ref(false);

const sortKey: Ref<keyof BookInStore> = ref('addTime');
const sortKeyOptions: { value: keyof BookInStore; label: string }[] = [
  { value: 'id', label: 'id' },
  { value: 'title', label: '书名' },
  { value: 'score', label: '评分' },
  { value: 'addTime', label: '加入书架时间' },
];
const sortAsc: Ref<boolean> = ref(true);
const books = computed(() => {
  // TODO: 中文排序
  return [...booksStore.books].sort((a, b) => {
    const aValue = a[sortKey.value];
    const bValue = b[sortKey.value];

    if (Array.isArray(aValue) || Array.isArray(bValue)) return 0;
    return aValue > bValue ? (sortAsc.value ? 1 : -1) : sortAsc.value ? -1 : 1;
  });
});

const selectedBook = ref<Book | undefined>(undefined);
const showDetail = ref<boolean>(false);

function selectBook(book: Book) {
  selectedBook.value = book;
  showDetail.value = true;
}
</script>

<style scoped>
.affix {
  position: fixed;
  bottom: 50px;
  right: 50px;
}

.book-list-container {
  margin: auto 20px;
}

.book-list-container-header {
  margin-bottom: 20px;
}

.book-list-container-header-select {
  margin-left: 10px;
  width: 140px;
}

.book-list-container-header-switch {
  margin-left: 10px;
}

.book-list-container-body {
  /* margin-bottom: 20px; */
}

.book-list-container-empty p {
  font-size: 18px;
  text-align: center;
}

.book-list-container-book-item {
  margin-bottom: 20px;
}
</style>
