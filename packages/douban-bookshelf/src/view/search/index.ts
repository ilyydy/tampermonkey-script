import {
  ADD_SHELF_ID,
  COPY_ID,
  createCopyBtn,
  createAddBtn,
  getBookByUrl,
} from '../../common/douban';
import { getBookItemList } from './parser';

import type { Book } from '../../types';

export function useInitBtns(doc: Document) {
  const btn = doc.getElementById(`${COPY_ID}-0`);
  if (btn) {
    // 已经添加过
    return;
  }

  const list = getBookItemList(doc);
  list.forEach(({ element, url }, idx) => {
    let bookCache: Book | undefined = undefined;
    const getBook = async () => {
      if (bookCache) return bookCache;

      const book = await getBookByUrl(url);
      if (book) {
        bookCache = book;
      }

      return book;
    };

    const style: Partial<CSSStyleDeclaration> = {
      marginTop: '7px',
    };
    const copyBtn = createCopyBtn(doc, getBook, `${COPY_ID}-${idx}`, style);
    const addBtn = createAddBtn(doc, getBook, `${ADD_SHELF_ID}-${idx}`, style);

    element.querySelector('.detail')?.appendChild(copyBtn);
    copyBtn.after(addBtn);
  });
}

export function init(doc: Document) {
  useInitBtns(doc);
}