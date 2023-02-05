import { beforeAll, beforeEach, assert, expect, test, vi } from 'vitest';
import { Window } from 'happy-dom';

import { createWindowFromFileAndUrl, DOU_DAN_PAGE } from '../../../util';
import * as douban from '../../../../packages/douban-bookshelf/src/common/douban';
import { useInitBtns } from '../../../../packages/douban-bookshelf/src/view/series/index';
import { getBookItemList } from '../../../../packages/douban-bookshelf/src/view/series/parser';

import type { Document } from 'happy-dom';

let docNabokov: Document;

beforeAll(async () => {
  const windowNabokov = await createWindowFromFileAndUrl(
    DOU_DAN_PAGE.seriesNabokov
  );
  docNabokov = windowNabokov.document;
});

test('useInitBtns test', async () => {
  const firstTime = useInitBtns(docNabokov as any);
  expect(firstTime).toBe(true);

  const bookItemListNabokov = getBookItemList(docNabokov as any);
  const aElements = Array.from(
    docNabokov.getElementsByClassName(douban.IDENTIFY_CLASS)
  );
  expect(aElements.length).toBe(bookItemListNabokov.length * 2);
  expect(aElements[0].textContent).toBe(douban.COPY);
  expect(aElements[1].textContent).toBe(douban.ADD_SHELF);

  const secondTime = useInitBtns(docNabokov as any);
  expect(secondTime).toBe(false);

  const aElementsAgain = Array.from(
    docNabokov.getElementsByClassName(douban.IDENTIFY_CLASS)
  );
  expect(aElementsAgain.length).toBe(bookItemListNabokov.length * 2);
});

test('useInitBtns exclude urls test', async () => {
  const excludeUrls = [
    'https://book.douban.com/series/add?series_id=927',
    'https://book.douban.com/series/remove?series_id=927',
    'https://book.douban.com/series/error?series_id=927',
  ];

  for (const i of excludeUrls) {
    const w = new Window();
    w.happyDOM.setURL(i);
    const r = useInitBtns(w.document as any);
    expect(r).toBe(false);
  }
});
