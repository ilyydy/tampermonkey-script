import { beforeAll, beforeEach, describe, expect, test, vi } from 'vitest';
import { nextTick } from 'vue';

import { booksStore } from '../../packages/douban-bookshelf/src/store/index';

import type { Book } from '../../packages/douban-bookshelf/src/types';

const book1: Book = {
  id: '1',
  title: 'string',
  ISBN: 'string',
  doubanUrl: 'string',
  coverUrl: 'string',
  subTitle: 'string',
  originName: 'string',
  authors: [],
  translators: [],
  page: 1,
  publishingHouse: 'string',
  publishingTime: 'string',
  seriesName: 'string',
  score: 1,
  scorePeopleCount: 1,
  contentBrief: 'string',
};

const book2: Book = {
  id: '2',
  title: 'string',
  ISBN: 'string',
  doubanUrl: 'string',
  coverUrl: 'string',
  subTitle: 'string',
  originName: 'string',
  authors: [],
  translators: [],
  page: 1,
  publishingHouse: 'string',
  publishingTime: 'string',
  seriesName: 'string',
  score: 1,
  scorePeopleCount: 1,
  contentBrief: 'string',
};

beforeEach(() => {
  localStorage.setItem(booksStore.BOOK_SHELF_KEY, JSON.stringify([book1]));
  booksStore.init();
});

test('books test', () => {
  expect(booksStore.books).toEqual([book1]);
});

test('addBook test', async () => {
  booksStore.addBook(book2);

  const expected = [book1, book2];
  expect(booksStore.books).toEqual(expected);
  await nextTick();
  expect(localStorage.getItem(booksStore.BOOK_SHELF_KEY)).toEqual(
    JSON.stringify(expected)
  );
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
