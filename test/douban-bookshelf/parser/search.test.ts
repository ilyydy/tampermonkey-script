import { describe, expect, test, beforeAll, vi } from 'vitest';
import { fileURLToPath } from 'node:url';

import * as searchParser from '../../../packages/douban-bookshelf/src/parser/search';
import { createWindowFromFile } from '../../util';

import type { Document } from 'happy-dom';

let docQing: Document;

beforeAll(async () => {
  const windowQing = await createWindowFromFile(
    fileURLToPath(new URL('../html/searchQing.html', import.meta.url))
  );
  docQing = windowQing.document;
});

test('getBookItemList test', () => {
  const bookItemList = searchParser.getBookItemList(docQing as any);
  expect(bookItemList.length).toEqual(15);
});
