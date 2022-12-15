import { useStore } from '../store';
import { copyBookWithTip } from './book';
import { warning, success } from './message';

import type { Book } from '../types';

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

export function createCopyBtn(
  doc: Document,
  getBook: (doc: Document) => Promise<Book | undefined> | Book | undefined
) {
  const btn = createBtn(doc, COPY, async () => {
    const book = await getBook(doc);
    if (!book) return;
    try {
      await copyBookWithTip(book);
      btn.dispatchEvent(new CustomEvent(COPY, { detail: true }));
    } catch (error) {
      btn.dispatchEvent(new CustomEvent(COPY, { detail: false }));
      throw error;
    }
  });

  return btn;
}

export function createAddBtn(
  doc: Document,
  getBook: (doc: Document) => Promise<Book> | Book
) {
  const btn = createBtn(doc, ADD_SHELF, async () => {
    const book = await getBook(doc);
    const { booksStore } = useStore();
    const r = booksStore.addBook(book);
    if (!r.success) {
      btn.dispatchEvent(new CustomEvent(ADD_SHELF, { detail: false }));
      warning(r.msg);
    } else {
      btn.dispatchEvent(new CustomEvent(ADD_SHELF, { detail: true }));
      success('加入成功');
    }
  });

  return btn;
}

export async function getBookById(id: string) {
  return getBookByUrl(`https://book.douban.com/subject/${id}`);
}

export async function getBookByUrl(url: string) {
  // TODO:
  return {} as Book;
}
