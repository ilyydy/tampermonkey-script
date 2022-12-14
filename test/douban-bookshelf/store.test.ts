import { beforeAll, beforeEach, describe, expect, test, vi } from 'vitest';
import { nextTick } from 'vue';

import * as booksStore from '../../packages/douban-bookshelf/src/store/books';
import { useStore } from '../../packages/douban-bookshelf/src/store/index';
import { book1, book2 } from './data';

beforeEach(() => {
  localStorage.setItem(booksStore.BOOK_SHELF_KEY, JSON.stringify([book1]));
  useStore(true);
});

test('books test', () => {
  expect(booksStore.books).toEqual([book1]);
});

test('getBookIdx test', () => {
  expect(booksStore.getBookIdx(book1.id)).toBe(0);
  expect(booksStore.getBookIdx(book2.id)).toBe(-1);
});

test('hasBook test', () => {
  expect(booksStore.hasBook(book1.id)).toBe(true);
  expect(booksStore.hasBook(book2.id)).toBe(false);
});

test('addBook test', async () => {
  const r1 = booksStore.addBook(book2);
  expect(r1.success).toBe(true);
  const expected = [book1, book2];
  expect(
    booksStore.books.map((i) => {
      const copy = { ...i };
      delete (copy as any).addTime;
      return copy;
    })
  ).toEqual(expected);

  const r2 = booksStore.addBook(book2);
  expect(r2.success).toBe(false);
  expect(
    booksStore.books.map((i) => {
      const copy = { ...i };
      delete (copy as any).addTime;
      return copy;
    })
  ).toEqual(expected);
  await nextTick();
  expect(
    JSON.parse(localStorage.getItem(booksStore.BOOK_SHELF_KEY) as string).map(
      (i) => {
        const copy = { ...i };
        delete copy.addTime;
        return copy;
      }
    )
  ).toEqual(expected);
});

test('removeBook test', async () => {
  booksStore.removeBook(book1.id);

  const expected = [];
  expect(booksStore.books).toEqual(expected);
  await nextTick();
  expect(localStorage.getItem(booksStore.BOOK_SHELF_KEY)).toEqual(
    JSON.stringify(expected)
  );
});

test('clearBook test', async () => {
  booksStore.clearBook();

  const expected = [];
  expect(booksStore.books).toEqual(expected);
  await nextTick();
  expect(localStorage.getItem(booksStore.BOOK_SHELF_KEY)).toEqual(
    JSON.stringify(expected)
  );
});
