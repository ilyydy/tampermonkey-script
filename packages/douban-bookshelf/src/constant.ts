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
  contentBrief: '摘要',
};

export const defaultBookFields = Object.keys(BOOK_FIELD_MAP) as BookField[];

export const exportExcelName = '豆瓣书籍导出.xlsx';

interface PlainTextType {
  key: BookField;
  label: string;
  type: 'string';
  getText?: (book: Book) => any;
}

interface ButtonType {
  key: BookField;
  label: string;
  type: 'link';
  getLink?: (book: Book) => string;
}

const specialFormatter: (ButtonType | PlainTextType)[] = [
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
];

export const bookItemFormatter: (ButtonType | PlainTextType)[] =
  defaultBookFields.map((field) => {
    const v = specialFormatter.find((i) => i.key === field);
    if (v) return v;
    return {
      key: field,
      label: BOOK_FIELD_MAP[field],
      type: 'string',
      getText: (book) => book[field],
    };
  });
