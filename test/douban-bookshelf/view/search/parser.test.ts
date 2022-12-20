import { describe, expect, test, beforeAll, vi } from 'vitest';
import { fileURLToPath } from 'node:url';

import * as searchParser from '../../../../packages/douban-bookshelf/src/view/search/parser';
import { createWindowFromFile } from '../../../util';

import type { Document } from 'happy-dom';

let docQing: Document;
let docAd: Document;

beforeAll(async () => {
  const windowQing = await createWindowFromFile(
    fileURLToPath(new URL('../../html/searchQing.html', import.meta.url))
  );
  docQing = windowQing.document;

  const windowAd = await createWindowFromFile(
    fileURLToPath(new URL('../../html/searchAd.html', import.meta.url))
  );
  docAd = windowAd.document;
});

test('getBookItemList test', () => {
  const bookItemListQing = searchParser.getBookItemList(docQing as any);
  expect(bookItemListQing.length).toEqual(15);

  const bookItemListAd = searchParser.getBookItemList(docAd as any);
  expect(bookItemListAd.length).toEqual(2);
});

test('getBookName test', () => {
  const bookItemListQing = searchParser.getBookItemList(docQing as any);
  expect(bookItemListQing.length).toEqual(15);

  const name = searchParser.getBookName(bookItemListQing[0].element);
  expect(name).toEqual('给青年人的哲学十二讲 : 尤里卡文库 II');
});
