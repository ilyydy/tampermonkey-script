import { describe, expect, test, beforeAll, vi } from 'vitest';

import * as worksParser from '../../../../packages/douban-bookshelf/src/view/authorBook/parser';
import { createWindowFromFileAndUrl, DOU_DAN_PAGE } from '../../../util';

import type { Document } from 'happy-dom';

let docLewis: Document;

beforeAll(async () => {
  const windowLewis = await createWindowFromFileAndUrl(
    DOU_DAN_PAGE.authorBookLewis
  );
  docLewis = windowLewis.document;
});

test('getBookItemList test', () => {
  const bookItemListNabokov = worksParser.getBookItemList(docLewis as any);
  expect(bookItemListNabokov.length).toEqual(10);
});
