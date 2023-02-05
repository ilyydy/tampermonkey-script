import { describe, expect, test, beforeAll, vi } from 'vitest';

import * as pressParser from '../../../../packages/douban-bookshelf/src/view/press/parser';
import { createWindowFromFileAndUrl, DOU_DAN_PAGE } from '../../../util';

import type { Document } from 'happy-dom';

let docHuNan: Document;

beforeAll(async () => {
  const windowHuNan = await createWindowFromFileAndUrl(DOU_DAN_PAGE.pressHuNan);
  docHuNan = windowHuNan.document;
});

test('getBookItemList test', () => {
  const bookItemListNabokov = pressParser.getBookItemList(docHuNan as any);
  expect(bookItemListNabokov.length).toEqual(10);
});
