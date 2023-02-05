import { getAlreadyReadButton, getLasButton, getBook } from './parser';
import { warning, success } from '../../common/message';
import { ADD_SHELF, createCopyBtn, createAddBtn } from '../../common/douban';

const excludeUrls = [
  /https?:\/\/book.douban.com\/subject\/\d+\/comments/, // 短评
  /https?:\/\/book.douban.com\/subject\/\d+\/reviews/, // 书评
  /https?:\/\/book.douban.com\/subject\/\d+\/annotation/, // 读书笔记
  /https?:\/\/book.douban.com\/subject\/\d+\/discussion/, // 论坛
  /https?:\/\/book.douban.com\/subject\/\d+\/blockquotes/, // 原文摘录
  /https?:\/\/book.douban.com\/subject\/\d+\/doulists/, // 书单
  /https?:\/\/book.douban.com\/subject\/\d+\/new_review/, // 写书评
  /https?:\/\/book.douban.com\/subject\/\d+\/+offers/, // 转让
];

export function useInitBtns(doc: Document) {
  // 排除一些子页面
  if (!/\/subject\/\d+\/?$/.test(new URL(doc.URL).pathname)) {
    return;
  }

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
