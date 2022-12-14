import { beforeAll, beforeEach, assert, expect, test, vi } from 'vitest';
import { fileURLToPath } from 'node:url';

import { createWindowFromFile } from '../../../util';
import * as util from '../../../../packages/douban-bookshelf/src/view/subject/util';
import { useStore } from '../../../../packages/douban-bookshelf/src/store/index';
import { bookAlice } from '../../data';

import type { Document } from 'happy-dom';

let docAlice: Document;

beforeAll(async () => {
  const windowAlice = await createWindowFromFile(
    fileURLToPath(new URL('../../html/subjectAlice.html', import.meta.url))
  );
  docAlice = windowAlice.document;
});

test('useInitBtns test', async () => {
  const btns = util.useInitBtns(docAlice as any);
  assert(btns);
  const { addBtn, copyBtn } = btns;

  const aElements = Array.from(
    docAlice.querySelectorAll('#interest_sect_level > a')
  );
  expect(aElements.length).toBe(5);
  expect(aElements[3].querySelector('input')?.getAttribute('value')).toBe(
    util.COPY
  );
  expect(aElements[4].querySelector('input')?.getAttribute('value')).toBe(
    util.ADD_SHELF
  );

  addBtn.dispatchEvent(new Event('click'));

  const { booksStore } = useStore();
  expect(booksStore.books.length).toBe(1);
  const copy = { ...booksStore.books[0] };
  delete (copy as any).addTime;
  expect(copy).toEqual(bookAlice);
});
