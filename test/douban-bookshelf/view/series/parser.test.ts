import { describe, expect, test, beforeAll, vi } from 'vitest';
import { fileURLToPath } from 'node:url';

import * as seriesParser from '../../../../packages/douban-bookshelf/src/view/series/parser';
import { createWindowFromFile } from '../../../util';

import type { Document } from 'happy-dom';

let docNabokov: Document;

beforeAll(async () => {
  const windowNabokov = await createWindowFromFile(
    fileURLToPath(new URL('../../html/seriesNabokov.html', import.meta.url))
  );
  docNabokov = windowNabokov.document;
});

test('getBookItemList test', () => {
  const bookItemListNabokov = seriesParser.getBookItemList(docNabokov as any);
  expect(bookItemListNabokov.length).toEqual(10);
});
