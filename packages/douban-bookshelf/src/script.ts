import { init as subjectInit } from './view/subject/index';

export default async function run(doc: Document) {
  const map: { [index: string]: (doc: Document) => Promise<void> } = {
    ['book.douban.com/subject']: subjectInit,
  };

  const url = new URL(doc.URL);
  const initFunc =
    map[url.host + url.pathname.split('/').slice(0, 2).join('/')];

  if (initFunc) {
    await initFunc(doc);
  } else {
    console.log(`${url} 没有对应的处理方法`);
  }
}
