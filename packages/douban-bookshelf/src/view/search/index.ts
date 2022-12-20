import {
  ADD_SHELF_ID,
  COPY_ID,
  createCopyBtn,
  createAddBtn,
  getBookPageHtmlByUrl,
} from '../../common/douban';
import { getBook as getBookFromSubject } from '../subject/parser';
import { getBookItemList } from './parser';

import type { Book } from '../../types';

export function useInitBtns(doc: Document) {
  const btn = doc.getElementById(`${COPY_ID}-0`);
  if (btn) {
    // 已经添加过
    return false;
  }

  const list = getBookItemList(doc);
  list.forEach(({ element, url, name }, idx) => {
    let bookCache: Book | undefined = undefined;
    const getBook = async () => {
      if (bookCache) return bookCache;

      const html = await getBookPageHtmlByUrl(url);
      if (!html) {
        throw new Error(`获取《${name}》页面失败`);
      }

      const parser = new DOMParser();
      const htmlDoc = parser.parseFromString(html, 'text/html');
      const book = getBookFromSubject(htmlDoc);
      bookCache = book;
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
  return true;
}

export function init(doc: Document) {
  useInitBtns(doc);
}
