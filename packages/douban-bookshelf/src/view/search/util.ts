import { useStore } from '../../store';
import { getAlreadyReadButton, getLasButton } from '../../parser/subject';
import { copyBookWithTip, warning, success } from '../../util';

import type { Book } from '../../types';

export function createBtn(
  doc: Document,
  text: string,
  clickHandler: () => void | Promise<void>
) {
  const btn = doc.createElement('a');
  btn.classList.add('j', 'a_show_login', 'colbutt ll');
  btn.href = '#';
  btn.rel = 'nofollow';
  const span = doc.createElement('span');
  span.textContent = text;
  span.style.fontSize = '13px';
  btn.appendChild(span);

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    clickHandler();
  });

  return btn;
}

export const COPY = '复制';
export const ADD_SHELF = '加入书架';

export function useInitBtns(bookItemElement: Element) {
  // const lastButton = getLasButton(bookItemElement);
  // if (!lastButton) {
  //   warning(`定位'读过'按钮失败`);
  //   return;
  // }
  // const input = lastButton.querySelector('input');
  // if (input?.value === ADD_SHELF) {
  //   // 已经添加过
  //   return;
  // }
  // const alreadyReadButton =
  //   input?.value === '读过' ? lastButton : getAlreadyReadButton(bookItemElement);
  // if (!alreadyReadButton) {
  //   warning(`定位'读过'按钮失败`);
  //   return;
  // }
  // const copyBtn = createBtn(alreadyReadButton, COPY, async () => {
  //   await copyBookWithTip(book);
  // });
  // const { booksStore } = useStore();
  // const addBtn = createBtn(alreadyReadButton, ADD_SHELF, () => {
  //   const r = booksStore.addBook(book);
  //   if (!r.success) {
  //     warning(r.msg);
  //   } else {
  //     success('加入成功');
  //   }
  // });
  // alreadyReadButton.after(copyBtn);
  // copyBtn.after(addBtn);
  // return { copyBtn, addBtn };
}
