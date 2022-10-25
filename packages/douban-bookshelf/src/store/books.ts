import { reactive, watch } from 'vue';

import type { Book } from '../types';

export const BOOK_SHELF_KEY = 'tampermonkey_douban_books';

export let books: Book[];

export function useStore(force = false) {
  if (!books || force) {
    books = reactive(JSON.parse(localStorage.getItem(BOOK_SHELF_KEY) ?? '[]'));
    watch(books, (newValue) => {
      localStorage.setItem(BOOK_SHELF_KEY, JSON.stringify(newValue));
    });
  }

  return books;
}

export function addBook(book: Book) {
  const idx = books.findIndex((i) => i.id === book.id);
  if (idx === -1) {
    books.push(book);
  } else {
    console.log(`书籍 ${book.id} 已在书架中`);
  }
}

export function removeBook(id: string) {
  const idx = books.findIndex((i) => i.id === id);
  if (idx === -1) return false;
  books.splice(idx, 1);
  return true;
}

export function clearBook() {
  books.splice(0, books.length);
}
