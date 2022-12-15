import { useStore } from '../../store';
import {
  getAlreadyReadButton,
  getLasButton,
  getBook,
} from '../../parser/subject';
import { copyBookWithTip, warning, success } from '../../util';

export function createBtn(
  doc: Document,
  text: string,
  clickHandler: () => void | Promise<void>
) {
  const btn = doc.createElement('a');
  btn.classList.add('j', 'a_show_login', 'colbutt', 'll');
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

export function useInitBtns(doc: Document) {
  const lastButton = getLasButton(doc);
  if (!lastButton) {
    warning(`定位'读过'按钮失败`);
    return;
  }

  const span = lastButton.querySelector('span');
  if (span?.textContent === ADD_SHELF) {
    // 已经添加过
    return;
  }

  const input = span?.querySelector('input');
  const alreadyReadButton =
    input?.value === '读过' ? lastButton : getAlreadyReadButton(doc);
  if (!alreadyReadButton) {
    warning(`定位'读过'按钮失败`);
    return;
  }

  const book = getBook(doc);

  const copyBtn = createBtn(doc, COPY, async () => {
    await copyBookWithTip(book);
  });
  const { booksStore } = useStore();
  const addBtn = createBtn(doc, ADD_SHELF, () => {
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
