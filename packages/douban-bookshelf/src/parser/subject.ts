import type { Book } from '../types';

export function getMetaInfo(subjectDoc: Document) {
  const data = {
    id: '',
    doubanUrl: '',
    title: '',
    ISBN: '',
    authors: [] as string[],
  };

  const jsonElement = subjectDoc.querySelector('[type="application/ld+json"]');
  if (!jsonElement || !jsonElement.textContent) {
    return data;
  }

  const obj = JSON.parse(jsonElement.textContent);
  data.doubanUrl = obj.url;
  const id = obj.url.split('/')[4];
  data.id = id;
  data.title = obj.name;
  data.ISBN = obj.isbn;
  data.authors = (obj.author as any[]).map((i) => i.name);

  return data;
}

function getFromA<T = string>(element: Element) {
  const aElements: Element[] = [];

  let current = element;
  while (current) {
    const next = current.nextElementSibling;
    if (!next || next.tagName !== 'A') break;
    current = next;
    aElements.push(current);
  }
  return aElements.map((i) => i.textContent?.trim()) as T[];
}

function getFromText(element: Element) {
  const text = element.nextSibling?.textContent?.trim();
  if (!text || text === ':') return '';
  return text;
}

function getFromAOrText(element: Element) {
  const resultFromA = getFromA(element);
  if (resultFromA.length !== 0) {
    return resultFromA;
  }

  const resultFromText = getFromText(element);
  return resultFromText ? [resultFromText] : [];
}

export function getExtraInfo(subjectDoc: Document) {
  const data = {
    publishingHouse: '',
    subTitle: '',
    originName: '',
    publishingTime: '',
    seriesName: '',
    page: 0,
    translators: [] as string[],
  };

  const infoElement = subjectDoc.getElementById('info');
  if (infoElement) {
    const plElements = infoElement.getElementsByClassName('pl');
    Array.from(plElements).forEach((element) => {
      switch (element.textContent?.trim()) {
        case '出版社:':
          data.publishingHouse = getFromAOrText(element)[0] ?? '';
          break;
        case '副标题:':
          data.subTitle = getFromText(element);
          break;
        case '原作名:':
          data.originName = getFromText(element);
          break;
        case '译者':
          data.translators = getFromAOrText(element);
          break;
        case '出版年:':
          data.publishingTime = getFromText(element);
          break;
        case '页数:': {
          const pageStr = getFromText(element);
          data.page = pageStr ? Number.parseInt(pageStr, 10) : 0;
          break;
        }
        case '丛书:':
          data.seriesName = getFromAOrText(element)[0] ?? '';
          break;
        default:
          break;
      }
    });
  }

  return data;
}

export function getScoreInfo(subjectDoc: Document) {
  const element = subjectDoc.getElementById('interest_sectl');
  const scoreStr = element?.querySelector('strong')?.textContent?.trim();
  const scorePeopleCountStr = element
    ?.querySelector('.rating_people')
    ?.querySelector('span')
    ?.textContent?.trim();

  let scorePeopleCount = 0;
  if (scorePeopleCountStr && !scorePeopleCountStr.includes('目前无人评价')) {
    scorePeopleCount = Number.parseInt(scorePeopleCountStr, 10);
  }

  return {
    score: scoreStr ? Number.parseFloat(scoreStr) : 0,
    scorePeopleCount,
  };
}

export function getContentBrief(subjectDoc: Document) {
  const element = subjectDoc.getElementById('link-report');
  if (!element) return '';

  const introElements = Array.from(element?.querySelectorAll('.intro'));
  const pElements =
    introElements[introElements.length - 1]?.getElementsByTagName('p') ?? [];

  return Array.from(pElements).reduce((str, current) => {
    const text = current.textContent?.trim();
    if (text) str += `\n${text}`;
    return str;
  }, '');
}

export function getCoverUrl(subjectDoc: Document) {
  const imgElement = subjectDoc.getElementById('mainpic')?.querySelector('img');
  return imgElement?.src ?? '';
}

export function getBook(subjectDoc: Document) {
  const book: Book = {
    ...getMetaInfo(subjectDoc),
    ...getScoreInfo(subjectDoc),
    ...getExtraInfo(subjectDoc),
    contentBrief: getContentBrief(subjectDoc),
    coverUrl: getCoverUrl(subjectDoc),
  };

  return book;
}
