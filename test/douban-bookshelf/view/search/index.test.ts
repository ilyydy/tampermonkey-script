import { beforeAll, beforeEach, assert, expect, test, vi } from 'vitest';
import { fileURLToPath } from 'node:url';

import { createWindowFromFileAndUrl, DOU_DAN_PAGE } from '../../../util';
import * as douban from '../../../../packages/douban-bookshelf/src/common/douban';
import { useInitBtns } from '../../../../packages/douban-bookshelf/src/view/search/index';
import { getBookItemList } from '../../../../packages/douban-bookshelf/src/view/search/parser';

import type { Document } from 'happy-dom';

let docAd: Document;

beforeAll(async () => {
  const windowAd = await createWindowFromFileAndUrl(DOU_DAN_PAGE.searchAd);
  docAd = windowAd.document;
});

test('useInitBtns test', async () => {
  const firstTime = useInitBtns(docAd as any);
  expect(firstTime).toBe(true);

  const bookItemListAd = getBookItemList(docAd as any);
  const aElements = Array.from(
    docAd.getElementsByClassName(douban.IDENTIFY_CLASS)
  );
  expect(aElements.length).toBe(bookItemListAd.length * 2);
  expect(aElements[0].textContent).toBe(douban.COPY);
  expect(aElements[1].textContent).toBe(douban.ADD_SHELF);

  const secondTime = useInitBtns(docAd as any);
  expect(secondTime).toBe(false);

  const aElementsAgain = Array.from(
    docAd.getElementsByClassName(douban.IDENTIFY_CLASS)
  );
  expect(aElementsAgain.length).toBe(bookItemListAd.length * 2);
});
