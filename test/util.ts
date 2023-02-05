import { Window } from 'happy-dom';
import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';

export const DOU_DAN_PAGE = {
  searchAd: {
    htmlPath: fileURLToPath(
      new URL('./douban-bookshelf/html/searchAd.html', import.meta.url)
    ),
    url: 'https://search.douban.com/book/subject_search?search_text=ad&cat=1001',
  },
  searchQing: {
    htmlPath: fileURLToPath(
      new URL('./douban-bookshelf/html/searchQing.html', import.meta.url)
    ),
    url: 'https://search.douban.com/book/subject_search?search_text=%E7%BB%99%E9%9D%92%E5%B9%B4%E4%BA%BA%E7%9A%84%E5%93%B2%E5%AD%A6%E5%8D%81%E4%BA%8C%E8%AE%B2&cat=1001',
  },
  seriesNabokov: {
    htmlPath: fileURLToPath(
      new URL('./douban-bookshelf/html/seriesNabokov.html', import.meta.url)
    ),
    url: 'https://book.douban.com/series/927',
  },
  subjectAlice: {
    htmlPath: fileURLToPath(
      new URL('./douban-bookshelf/html/subjectAlice.html', import.meta.url)
    ),
    url: 'https://book.douban.com/subject/36021313/',
  },
  subjectDing: {
    htmlPath: fileURLToPath(
      new URL('./douban-bookshelf/html/subjectDing.html', import.meta.url)
    ),
    url: 'https://book.douban.com/subject/35480487/',
  },
  subjectMySkirt: {
    htmlPath: fileURLToPath(
      new URL('./douban-bookshelf/html/subjectMySkirt.html', import.meta.url)
    ),
    url: 'https://book.douban.com/subject/36021541/',
  },
  subjectSer: {
    htmlPath: fileURLToPath(
      new URL('./douban-bookshelf/html/subjectSer.html', import.meta.url)
    ),
    url: 'https://book.douban.com/subject/19053330/',
  },
  workAlice: {
    htmlPath: fileURLToPath(
      new URL('./douban-bookshelf/html/workAlice.html', import.meta.url)
    ),
    url: 'https://book.douban.com/works/1096137',
  },
  pressHuNan: {
    htmlPath: fileURLToPath(
      new URL('./douban-bookshelf/html/pressHuNan.html', import.meta.url)
    ),
    url: 'https://book.douban.com/press/2146/',
  },
  authorBookLewis: {
    htmlPath: fileURLToPath(
      new URL('./douban-bookshelf/html/authorBookLewis.html', import.meta.url)
    ),
    url: 'https://book.douban.com/author/4535759/books?sortby=collect&format=pic',
  },
};

export function createWindowFromHtml(html: string) {
  const window = new Window();
  window.document.body.innerHTML = html;
  return window;
}

export async function createWindowFromFile(htmlPath: string) {
  const html = await promises.readFile(htmlPath, {
    encoding: 'utf-8',
  });
  return createWindowFromHtml(html);
}

export async function createWindowFromFileAndUrl(obj: {
  htmlPath: string;
  url: string;
}) {
  const w = await createWindowFromFile(obj.htmlPath);
  w.happyDOM.setURL(obj.url);
  return w;
}

export async function untilEventFired(obj: Node, event: string) {
  const p = new Promise<void>((res) => {
    obj.addEventListener(event, () => res(), { once: true });
  });
  await p;
}
