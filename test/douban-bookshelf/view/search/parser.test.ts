import { describe, expect, test, beforeAll, vi } from 'vitest';
import { fileURLToPath } from 'node:url';

import * as searchParser from '../../../../packages/douban-bookshelf/src/view/search/parser';
import { createWindowFromFileAndUrl, DOU_DAN_PAGE } from '../../../util';

import type { Document } from 'happy-dom';

let docQing: Document;
let docAd: Document;

beforeAll(async () => {
  const windowQing = await createWindowFromFileAndUrl(DOU_DAN_PAGE.searchQing);
  docQing = windowQing.document;

  const windowAd = await createWindowFromFileAndUrl(DOU_DAN_PAGE.searchAd);
  docAd = windowAd.document;
});

test('getBookItemList test', () => {
  const bookItemListQing = searchParser.getBookItemList(docQing as any);
  expect(bookItemListQing.length).toEqual(15);

  const bookItemListAd = searchParser.getBookItemList(docAd as any);
  expect(bookItemListAd.length).toEqual(2);
});
