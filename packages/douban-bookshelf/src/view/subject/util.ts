import { useStore } from '../../store';
import { getAlreadyReadButton, getLasButton } from '../../parser/subject';
import { copyBookWithTip, warning, success } from '../../util';

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
  const lastButton = getLasButton(doc);
  if (!lastButton) {
    warning(`定位'读过'按钮失败`);
    return;
  }

  const input = lastButton.querySelector('input');
  if (input?.value === ADD_SHELF) {
    // 已经添加过
    return;
  }

  const alreadyReadButton =
    input?.value === '读过' ? lastButton : getAlreadyReadButton(doc);
  if (!alreadyReadButton) {
    warning(`定位'读过'按钮失败`);
    return;
  }

  const copyBtn = createBtn(alreadyReadButton, COPY, async () => {
    await copyBookWithTip(book);
  });
  const { booksStore } = useStore();
  const addBtn = createBtn(alreadyReadButton, ADD_SHELF, () => {
    const r = booksStore.addBook(book);
    if (!r.success) {
      warning(r.msg);
    } else {
      success('加入成功');
    }
  });

  alreadyReadButton.after(copyBtn);
  copyBtn.after(addBtn);

  return { copyBtn, addBtn };
}
