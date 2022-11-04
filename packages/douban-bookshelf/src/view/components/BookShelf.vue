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
            :disabled="booksStore.books.length === 0"
            @click="() => exportBookExcel(booksStore.books)"
            >导出</ElButton
          >
          <ElButton
            round
            type="danger"
            :disabled="booksStore.books.length === 0"
            @click="booksStore.clearBook"
            >清空</ElButton
          >
        </div>

        <div
          class="book-list-container-body"
          v-for="book in booksStore.books"
          :key="book.id"
        >
          <BookItem :book="book"></BookItem>
        </div>
      </div>
    </template>
  </ElDrawer>
</template>

<script setup lang="ts">
import { ElButton, ElDrawer } from 'element-plus';
import { ArrowLeft } from '@element-plus/icons-vue';
import { ref } from 'vue';

import { useStore } from '../../store';
import BookItem from './BookItem.vue';
import { exportBookExcel } from '../../util';

const { booksStore } = useStore();

const showDrawer = ref(true);
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

.book-list-container-body {
  margin-bottom: 20px;
}
</style>
