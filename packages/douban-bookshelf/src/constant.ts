import type { Book, BookFields } from './types';

export const BOOK_FIELD_MAP: { [key in BookFields]: string } = {
  id: 'id',
  title: '书名',
  subTitle: '子标题',
  originName: '原书名',
  authors: '作者',
  translators: '译者',
  publishingHouse: '出版社',
  publishingTime: '出版时间',
  seriesName: '系列名',
  page: '页数',
  ISBN: 'ISBN',
  score: '评分',
  scorePeopleCount: '评分人数',
  coverUrl: '封面图链接',
  doubanUrl: '豆瓣链接',
  contentBrief: '摘要',
};

export const defaultBookFields = Object.keys(BOOK_FIELD_MAP) as BookFields[];
