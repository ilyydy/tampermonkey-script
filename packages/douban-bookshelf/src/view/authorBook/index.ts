import {
  ADD_SHELF_ID,
  COPY_ID,
  createCopyBtn,
  createAddBtn,
  getBookPageHtmlByUrl,
} from '../../common/douban';
import { useStore } from '../../store';
import { getBook as getBookFromSubject } from '../subject/parser';
import { getBookItemList } from './parser';

import type { Book } from '../../types';

export function useInitBtns(doc: Document) {
  // 排除一些页面
  if (!/\/author\/\d+\/books\/?$/.test(new URL(doc.URL).pathname)) {
    return false;
  }

  const btn = doc.getElementById(`${COPY_ID}-0`);
  if (btn) {
    // 已经添加过
    return false;
  }

  const { booksStore } = useStore();
  const list = getBookItemList(doc);
  list.forEach(({ element, url, name, id }, idx) => {
    let bookCache: Book | undefined = undefined;
    const getBook = async () => {
      if (bookCache) return bookCache;

      const bookInStore = booksStore.getBook(id);
      if (bookInStore) {
        bookCache = {
          ...bookInStore,
        };
        delete (bookCache as any).addTime;
        return bookCache;
      }

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

    const classList = ['j', 'a_collect_btn'];
    const copyBtn = doc.createElement('span');
    copyBtn.classList.add('gact');
    copyBtn.appendChild(
      createCopyBtn(doc, getBook, `${COPY_ID}-${idx}`, undefined, classList)
    );

    const addBtn = doc.createElement('span');
    addBtn.classList.add('gact');
    addBtn.appendChild(
      createAddBtn(doc, getBook, `${ADD_SHELF_ID}-${idx}`, undefined, classList)
    );

    element.querySelector('.author-collect')?.appendChild(copyBtn);
    copyBtn.after(addBtn);
  });
  return true;
}

export function init(doc: Document) {
  useInitBtns(doc);
}
