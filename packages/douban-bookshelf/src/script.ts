import { init as subjectInit } from './view/subject/index';

export default function run(doc: Document) {
  const map: { [index: string]: (doc: Document) => void } = {
    ['book.douban.com/subject']: subjectInit,
  };

  const url = new URL(doc.URL);
  const initFunc =
    map[url.host + url.pathname.split('/').slice(0, 2).join('/')];
  if (initFunc) {
    initFunc(doc);
  }
}
