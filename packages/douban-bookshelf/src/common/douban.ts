import { useStore } from '../store';
import { copyBookWithTip } from './book';
import { warning, success } from './message';

import type { Book } from '../types';

export function createBtn(
  doc: Document,
  id: string,
  text: string,
  clickHandler: () => void | Promise<void>,
  style?: Partial<CSSStyleDeclaration>
) {
  const btn = doc.createElement('a');
  btn.classList.add('j', 'a_show_login', 'colbutt', 'll');
  btn.id = id;
  btn.href = '#';
  btn.rel = 'nofollow';
  if (style) {
    Object.entries(style).map(([k, v]) => {
      btn.style[k as any] = v as any;
    });
  }

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

export const COPY_ID = 'douban-book-copy';
export const ADD_SHELF_ID = 'douban-book-add-shelf';
export const COPY = '复制';
export const ADD_SHELF = '加入书架';

export function createCopyBtn(
  doc: Document,
  getBook: (doc: Document) => Promise<Book | undefined> | Book | undefined,
  id = COPY_ID,
  style?: Partial<CSSStyleDeclaration>
) {
  const btn = createBtn(
    doc,
    id,
    COPY,
    async () => {
      const book = await getBook(doc);
      if (!book) return;
      try {
        await copyBookWithTip(book);
        btn.dispatchEvent(new CustomEvent(COPY, { detail: true }));
      } catch (error) {
        btn.dispatchEvent(new CustomEvent(COPY, { detail: false }));
        throw error;
      }
    },
    style
  );

  return btn;
}

export function createAddBtn(
  doc: Document,
  getBook: (doc: Document) => Promise<Book> | Book,
  id = ADD_SHELF_ID,
  style?: Partial<CSSStyleDeclaration>
) {
  const btn = createBtn(
    doc,
    id,
    ADD_SHELF,
    async () => {
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
    },
    style
  );

  return btn;
}

export async function getBookById(id: string) {
  return getBookByUrl(`https://book.douban.com/subject/${id}`);
}

export async function getBookByUrl(url: string) {
  // TODO:
  return {} as Book;
}