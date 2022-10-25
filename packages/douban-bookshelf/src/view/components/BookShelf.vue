<template>
  <div v-for="book in booksStore.books" :key="book.id">
    <!-- TODO -->
  </div>
</template>

<script setup lang="ts">
import { useStore } from '../../store';

const { booksStore } = useStore();
</script>

<style scoped></style>
