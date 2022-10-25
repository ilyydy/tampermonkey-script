import { useStore } from '../../store';
import { getAlreadyReadButton } from '../../parser/subject';
import { copyBook } from '../../util';

import type { Book } from '../../types';

export function createBtn(
  btn: Element,
  text: string,
  clickHandler: () => void | Promise<void>
) {
  const copyBtn = btn.cloneNode(true) as Element;
  const input = copyBtn?.querySelector('input');
  if (input) {
    input.value = text;
  }
  copyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    clickHandler();
  });

  return copyBtn;
}

export const COPY = '复制';
export const ADD_SHELF = '加入书架';

export function useInitBtns(doc: Document, book: Book) {
  const alreadyReadButton = getAlreadyReadButton(doc);
  if (!alreadyReadButton) {
    console.log(`定位'读过'按钮失败`);
    return;
  }

  const copyBtn = createBtn(alreadyReadButton, COPY, () => copyBook(book));
  const { booksStore } = useStore();
  const addBtn = createBtn(alreadyReadButton, ADD_SHELF, () =>
    booksStore.addBook(book)
  );

  alreadyReadButton.after(copyBtn);
  copyBtn.after(addBtn);

  return { copyBtn, addBtn };
}
