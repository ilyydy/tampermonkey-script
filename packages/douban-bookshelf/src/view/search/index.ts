import { getBookItemList } from '../../parser/search';
import { useInitBtns } from './util';

export function init(doc: Document) {
  const list = getBookItemList(doc);
  list.forEach((i) => useInitBtns(i));
}
