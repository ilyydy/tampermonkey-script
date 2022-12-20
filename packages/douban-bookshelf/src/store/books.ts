import { reactive, watch } from 'vue';
import { GM_setValue, GM_getValue } from 'vite-plugin-monkey/dist/client';

import type { Book, BookInStore } from '../types';

export const BOOK_SHELF_KEY = 'tampermonkey_douban_books';

export let books: BookInStore[];

export function useStore(force = false) {
  if (!books || force) {
    if (import.meta.env.MODE === 'test') {
      books = reactive(
        JSON.parse(localStorage.getItem(BOOK_SHELF_KEY) ?? '[]')
      );
      watch(books, (newValue) => {
        localStorage.setItem(BOOK_SHELF_KEY, JSON.stringify(newValue));
      });
    } else {
      books = reactive(JSON.parse(GM_getValue(BOOK_SHELF_KEY, '[]')));
      watch(books, (newValue) => {
        GM_setValue(BOOK_SHELF_KEY, JSON.stringify(newValue));
      });
    }
  }

  return books;
}

export function getBookIdx(id: string) {
  return books.findIndex((i) => i.id === id);
}

export function hasBook(id: string) {
  return getBookIdx(id) !== -1;
}

export function addBook(book: Book) {
  if (!hasBook(book.id)) {
    books.push({ ...book, addTime: Date.now() });
    return { success: true, msg: '' };
  } else {
    return { success: false, msg: `《${book.title}》 已在书架中` };
  }
}

export function removeBook(id: string) {
  const idx = getBookIdx(id);
  if (idx === -1) return false;
  books.splice(idx, 1);
  return true;
}

export function clearBook() {
  books.splice(0, books.length);
}
