import type { Book } from '../../packages/douban-bookshelf/src/types';

export const book1: Book = {
  id: '1',
  title: 'string',
  ISBN: 'string',
  doubanUrl: 'string',
  coverUrl: 'string',
  subTitle: 'string',
  originName: 'string',
  authors: ['a', 'b'],
  translators: [],
  page: 1,
  publishingHouse: 'string',
  publishingTime: 'string',
  seriesName: 'string',
  score: 1,
  scorePeopleCount: 1,
  contentBrief: 'string',
};

export const book2: Book = {
  id: '2',
  title: '',
  ISBN: '',
  doubanUrl: '',
  coverUrl: '',
  subTitle: '',
  originName: '',
  authors: [],
  translators: [],
  page: 0,
  publishingHouse: '',
  publishingTime: '',
  seriesName: '',
  score: 0,
  scorePeopleCount: 0,
  contentBrief: '',
};
