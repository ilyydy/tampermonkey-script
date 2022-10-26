<template>
  <div v-show="!showDrawer" class="affix">
    <ElButton
      :icon="ArrowLeft"
      circle
      type="success"
      @click="showDrawer = !showDrawer"
    ></ElButton>
  </div>

  <ElDrawer v-model="showDrawer" title="书架">
    <template #default>
      <div>
        <div>
          <ElButton @click="booksStore.clearBook">清空</ElButton>
        </div>

        <div v-for="book in booksStore.books" :key="book.id">
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

const { booksStore } = useStore();

const showDrawer = ref(false);
</script>

<style scoped>
.affix {
  position: fixed;
  bottom: 50px;
  right: 50px;
}
</style>
