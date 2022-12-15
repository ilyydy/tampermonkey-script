import { beforeAll, beforeEach, assert, expect, test, vi } from 'vitest';
import { fileURLToPath } from 'node:url';

import * as douban from '../../../packages/douban-bookshelf/src/common/douban';
import { getBook } from '../../../packages/douban-bookshelf/src/view/subject/parser';
import { useStore } from '../../../packages/douban-bookshelf/src/store/index';
import { untilEventFired, createWindowFromFile } from '../../util';
import { bookAlice } from '../data';

import type { Document } from 'happy-dom';

let docAlice: Document;

beforeAll(async () => {
  const windowAlice = await createWindowFromFile(
    fileURLToPath(new URL('../html/subjectAlice.html', import.meta.url))
  );
  docAlice = windowAlice.document;
});

test.only('createCopyBtn test', async () => {
  const copyBtn = douban.createCopyBtn(docAlice as any, getBook);
  copyBtn.dispatchEvent(new Event('click'));

  await untilEventFired(copyBtn, douban.COPY);
});

test('createAddBtn test', async () => {
  const addBtn = douban.createAddBtn(docAlice as any, getBook);
  addBtn.dispatchEvent(new Event('click'));

  await untilEventFired(addBtn, douban.ADD_SHELF);

  const { booksStore } = useStore();
  expect(booksStore.books.length).toBe(1);
  const copy = { ...booksStore.books[0] };
  delete (copy as any).addTime;
  expect(copy).toEqual(bookAlice);
});
