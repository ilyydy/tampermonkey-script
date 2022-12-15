import { useStore } from '../../store';
import { warning, success } from '../../common/message';
import {
  ADD_SHELF,
  createCopyBtn,
  createAddBtn,
  getBookByUrl,
} from '../../common/douban';
import { getBookItemList } from './parser';

import type { Book } from '../../types';
import { el } from 'element-plus/es/locale';

export function useInitBtns(doc: Document) {
  const list = getBookItemList(doc);

  list.forEach(({ element, url }) => {
    // const lastButton = getLasButton(doc);
    // if (!lastButton) {
    //   warning(`定位'读过'按钮失败`);
    //   return;
    // }
    // const span = lastButton.querySelector('span');
    // if (span?.textContent === ADD_SHELF) {
    //   // 已经添加过
    //   return;
    // }

    // const input = span?.querySelector('input');
    // const alreadyReadButton =
    //   input?.value === '读过' ? lastButton : getAlreadyReadButton(doc);
    // if (!alreadyReadButton) {
    //   warning(`定位'读过'按钮失败`);
    //   return;
    // }
    let bookCache: Book | undefined = undefined;
    const getBook = async () => {
      if (bookCache) return bookCache;

      const book = await getBookByUrl(url);
      if (book) {
        bookCache = book;
      }

      return book;
    };

    const copyBtn = createCopyBtn(doc, getBook);
    const addBtn = createAddBtn(doc, getBook);

    // alreadyReadButton.after(copyBtn);
    // copyBtn.after(addBtn);
  });
}

export function init(doc: Document) {
  useInitBtns(doc);
}
