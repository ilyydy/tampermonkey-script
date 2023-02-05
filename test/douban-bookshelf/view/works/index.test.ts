import { beforeAll, beforeEach, assert, expect, test, vi } from 'vitest';
import { Window } from 'happy-dom';

import { createWindowFromFileAndUrl, DOU_DAN_PAGE } from '../../../util';
import * as douban from '../../../../packages/douban-bookshelf/src/common/douban';
import { useInitBtns } from '../../../../packages/douban-bookshelf/src/view/works/index';
import { getBookItemList } from '../../../../packages/douban-bookshelf/src/view/works/parser';

import type { Document } from 'happy-dom';

let docAlice: Document;

beforeAll(async () => {
  const windowAlice = await createWindowFromFileAndUrl(DOU_DAN_PAGE.workAlice);
  docAlice = windowAlice.document;
});

test('useInitBtns test', async () => {
  const firstTime = useInitBtns(docAlice as any);
  expect(firstTime).toBe(true);

  const bookItemList = getBookItemList(docAlice as any);
  const aElements = Array.from(
    docAlice.getElementsByClassName(douban.IDENTIFY_CLASS)
  );
  expect(aElements.length).toBe(bookItemList.length * 2);
  expect(aElements[0].textContent).toBe(douban.COPY);
  expect(aElements[1].textContent).toBe(douban.ADD_SHELF);

  const secondTime = useInitBtns(docAlice as any);
  expect(secondTime).toBe(false);

  const aElementsAgain = Array.from(
    docAlice.getElementsByClassName(douban.IDENTIFY_CLASS)
  );
  expect(aElementsAgain.length).toBe(bookItemList.length * 2);
});

test('useInitBtns exclude urls test', async () => {
  const excludeUrls = [
    'https://book.douban.com/works/remove?id=1096137',
    'https://book.douban.com/works/report?id=1096137',
  ];

  for (const i of excludeUrls) {
    const w = new Window();
    w.happyDOM.setURL(i);
    const r = useInitBtns(w.document as any);
    expect(r).toBe(false);
  }
});
