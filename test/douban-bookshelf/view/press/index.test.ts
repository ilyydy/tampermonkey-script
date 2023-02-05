import { beforeAll, beforeEach, assert, expect, test, vi } from 'vitest';
import { Window } from 'happy-dom';

import { createWindowFromFileAndUrl, DOU_DAN_PAGE } from '../../../util';
import * as douban from '../../../../packages/douban-bookshelf/src/common/douban';
import { useInitBtns } from '../../../../packages/douban-bookshelf/src/view/press/index';
import { getBookItemList } from '../../../../packages/douban-bookshelf/src/view/press/parser';

import type { Document } from 'happy-dom';

let docHuNan: Document;

beforeAll(async () => {
  const windowHuNan = await createWindowFromFileAndUrl(DOU_DAN_PAGE.pressHuNan);
  docHuNan = windowHuNan.document;
});

test('useInitBtns test', async () => {
  const firstTime = useInitBtns(docHuNan as any);
  expect(firstTime).toBe(true);

  const bookItemList = getBookItemList(docHuNan as any);
  const aElements = Array.from(
    docHuNan.getElementsByClassName(douban.IDENTIFY_CLASS)
  );
  expect(aElements.length).toBe(bookItemList.length * 2);
  expect(aElements[0].textContent).toBe(douban.COPY);
  expect(aElements[1].textContent).toBe(douban.ADD_SHELF);

  const secondTime = useInitBtns(docHuNan as any);
  expect(secondTime).toBe(false);

  const aElementsAgain = Array.from(
    docHuNan.getElementsByClassName(douban.IDENTIFY_CLASS)
  );
  expect(aElementsAgain.length).toBe(bookItemList.length * 2);
});

test('useInitBtns exclude urls test', async () => {
  const excludeUrls = [
    'https://book.douban.com/press/2146/add_subject',
    'https://book.douban.com/press/2146/remove_subject',
    'https://book.douban.com/press/2146/contrib_report',
  ];

  for (const i of excludeUrls) {
    const w = new Window();
    w.happyDOM.setURL(i);
    const r = useInitBtns(w.document as any);
    expect(r).toBe(false);
  }
});
