import { ref } from 'vue';

import { getBook } from '../../parser/subject';
import { useInitBtns } from './util';

import type { Book } from '../../types';

export function init(doc: Document) {
  const book = ref<null | Book>(null);

  book.value = getBook(doc);
  if (book.value) {
    useInitBtns(doc, book.value);
  }
}
