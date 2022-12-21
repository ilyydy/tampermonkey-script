import { getAlreadyReadButton, getLasButton, getBook } from './parser';
import { warning, success } from '../../common/message';
import { ADD_SHELF, createCopyBtn, createAddBtn } from '../../common/douban';

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

  const copyBtn = createCopyBtn(doc, getBook);
  const addBtn = createAddBtn(doc, getBook);

  alreadyReadButton.after(copyBtn);
  copyBtn.after(addBtn);

  return { copyBtn, addBtn };
}

export function init(doc: Document) {
  useInitBtns(doc);
}
