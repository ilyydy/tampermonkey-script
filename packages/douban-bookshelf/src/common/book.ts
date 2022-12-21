import { GM_setClipboard } from 'vite-plugin-monkey/dist/client';

import { error, info, success, warning } from './message';
import { exportCsv } from './csv';
import { exportXlsx } from './xlsx';

import type { AOA2SheetOpts, WritingOptions } from 'xlsx';
import type { Options } from 'csv-stringify';
import type { Book, BookField } from '../types';

export const BOOK_FIELD_MAP: { [key in BookField]: string } = {
  id: 'id',
  title: '书名',
  subTitle: '副标题',
  originName: '原作名',
  authors: '作者',
  translators: '译者',
  publishingHouse: '出版社',
  publishingTime: '出版时间',
  seriesName: '丛书',
  page: '页数',
  ISBN: 'ISBN',
  score: '评分',
  scorePeopleCount: '评分人数',
  coverUrl: '封面图链接',
  doubanUrl: '豆瓣链接',
  contentBrief: '内容简介',
};

export const defaultBookFields = Object.keys(BOOK_FIELD_MAP) as BookField[];

export const excelFormatterMap = defaultBookFields.reduce((pre, field) => {
  switch (field) {
    case 'authors':
    case 'translators':
      pre[field] = (book: Book) => book[field].join(', ');
      break;
    default:
      pre[field] = (book: Book) => book[field];
      break;
  }
  return pre;
}, {} as { [key in BookField]: (book: Book) => string | number });

interface PlainTextType {
  key: BookField;
  label: string;
  type: 'string';
  getText?: (book: Book) => any;
  styleObj?: Record<string, string>;
}

interface ButtonType {
  key: BookField;
  label: string;
  type: 'link';
  getLink?: (book: Book) => string;
  styleObj?: Record<string, string>;
}

const specialBookItemFormatters: (ButtonType | PlainTextType)[] = [
  {
    key: 'id',
    label: BOOK_FIELD_MAP.id,
    type: 'link',
    getLink: (book) => book.doubanUrl,
  },
  {
    key: 'doubanUrl',
    label: BOOK_FIELD_MAP.doubanUrl,
    type: 'link',
    getLink: (book) => book.doubanUrl,
  },
  {
    key: 'coverUrl',
    label: BOOK_FIELD_MAP.coverUrl,
    type: 'link',
    getLink: (book) => book.coverUrl,
  },
  {
    key: 'authors',
    label: BOOK_FIELD_MAP.authors,
    type: 'string',
    getText: (book) => book.authors.join(', '),
  },
  {
    key: 'translators',
    label: BOOK_FIELD_MAP.translators,
    type: 'string',
    getText: (book) => book.translators.join(', '),
  },
  {
    key: 'contentBrief',
    label: BOOK_FIELD_MAP.contentBrief,
    type: 'string',
    getText: (book) => book.contentBrief,
    styleObj: {
      'line-height': '30px',
      'white-space': 'pre-line',
      'max-height': '300px',
      'padding-right': '20px',
      width: '98%',
      display: 'inline-block',
      overflow: 'auto',
    },
  },
];

export const bookItemFormatters: (ButtonType | PlainTextType)[] =
  defaultBookFields.map((field) => {
    const v = specialBookItemFormatters.find((i) => i.key === field);
    if (v) return v;
    return {
      key: field,
      label: BOOK_FIELD_MAP[field],
      type: 'string',
      getText: (book) => book[field],
    };
  });

export function getBookViewText(book: Book, fields = defaultBookFields) {
  const textList: string[] = [];

  fields.forEach((i) => {
    const v = book[i];
    if (Array.isArray(v)) {
      if (v.length > 0) textList.push(`${BOOK_FIELD_MAP[i]}: ${v.join(', ')}`);
    } else if (v) {
      textList.push(`${BOOK_FIELD_MAP[i]}: ${v}`);
    }
  });

  return textList.join('\n');
}

export async function copyBook(book: Book, fields = defaultBookFields) {
  const text = getBookViewText(book, fields);
  GM_setClipboard(text, 'text');
}

export async function copyBookWithTip(book: Book, fields = defaultBookFields) {
  try {
    await copyBook(book);
    success('复制成功');
  } catch (err: any) {
    error(err.msg);
  }
}

export const exportName = '豆瓣书籍导出';

export const exportCsvName = '豆瓣书籍导出.csv';

export function exportBookCsv(
  books: Book[],
  filename = exportCsvName,
  options: Options = { bom: true }
) {
  const header = defaultBookFields.map((field) => BOOK_FIELD_MAP[field]);
  const data: any[] = [header];

  books.forEach((book) => {
    const row = defaultBookFields.map((field) => {
      return excelFormatterMap[field](book);
    });
    data.push(row);
  });

  exportCsv(data, filename, options);
}

export const exportXlsxName = '豆瓣书籍导出.xlsx';

export function exportBookXlsx(
  books: Book[],
  filename = exportXlsxName,
  aoa2SheetOpts?: AOA2SheetOpts,
  writingOptions?: WritingOptions
) {
  const header = defaultBookFields.map((field) => BOOK_FIELD_MAP[field]);
  const data: any[] = [header];

  books.forEach((book) => {
    const row = defaultBookFields.map((field) => {
      return excelFormatterMap[field](book);
    });
    data.push(row);
  });

  exportXlsx(data, filename, aoa2SheetOpts, writingOptions);
}
