import type { Book, BookField } from './types';

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

export const exportExcelName = '豆瓣书籍导出.xlsx';

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
