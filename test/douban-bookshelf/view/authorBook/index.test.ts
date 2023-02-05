import { beforeAll, beforeEach, assert, expect, test, vi } from 'vitest';
import { Window } from 'happy-dom';

import { createWindowFromFileAndUrl, DOU_DAN_PAGE } from '../../../util';
import * as douban from '../../../../packages/douban-bookshelf/src/common/douban';
import { useInitBtns } from '../../../../packages/douban-bookshelf/src/view/authorBook/index';
import { getBookItemList } from '../../../../packages/douban-bookshelf/src/view/authorBook/parser';

import type { Document } from 'happy-dom';

let docLewis: Document;

beforeAll(async () => {
  const windowLewis = await createWindowFromFileAndUrl(
    DOU_DAN_PAGE.authorBookLewis
  );
  docLewis = windowLewis.document;
});

test('useInitBtns test', async () => {
  const firstTime = useInitBtns(docLewis as any);
  expect(firstTime).toBe(true);

  const bookItemList = getBookItemList(docLewis as any);
  const aElements = Array.from(
    docLewis.getElementsByClassName(douban.IDENTIFY_CLASS)
  );
  expect(aElements.length).toBe(bookItemList.length * 2);
  expect(aElements[0].textContent).toBe(douban.COPY);
  expect(aElements[1].textContent).toBe(douban.ADD_SHELF);

  const secondTime = useInitBtns(docLewis as any);
  expect(secondTime).toBe(false);

  const aElementsAgain = Array.from(
    docLewis.getElementsByClassName(douban.IDENTIFY_CLASS)
  );
  expect(aElementsAgain.length).toBe(bookItemList.length * 2);
});

test('useInitBtns exclude urls test', async () => {
  const excludeUrls = [
    'https://book.douban.com/author/4535759/',
    'https://book.douban.com/author/4535759/contributes',
    'https://book.douban.com/author/4535759/fans',
    'https://book.douban.com/author/4535759/book_report',
    'https://book.douban.com/author/4535759/add_books',
  ];

  for (const i of excludeUrls) {
    const w = new Window();
    w.happyDOM.setURL(i);
    const r = useInitBtns(w.document as any);
    expect(r).toBe(false);
  }
});
