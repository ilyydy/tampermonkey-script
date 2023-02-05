import { describe, expect, test, beforeAll, vi } from 'vitest';

import * as worksParser from '../../../../packages/douban-bookshelf/src/view/works/parser';
import { createWindowFromFileAndUrl, DOU_DAN_PAGE } from '../../../util';

import type { Document } from 'happy-dom';

let docAlice: Document;

beforeAll(async () => {
  const windowAlice = await createWindowFromFileAndUrl(DOU_DAN_PAGE.workAlice);
  docAlice = windowAlice.document;
});

test('getBookItemList test', () => {
  const bookItemListNabokov = worksParser.getBookItemList(docAlice as any);
  expect(bookItemListNabokov.length).toEqual(100);
});
