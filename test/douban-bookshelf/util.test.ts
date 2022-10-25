import { describe, expect, test, vi } from 'vitest';

import * as util from '../../packages/douban-bookshelf/src/util';

import type { Book } from '../../packages/douban-bookshelf/src/types';

describe('getBookViewText test', () => {
  const book1: Book = {
    id: '1',
    title: '',
    ISBN: '',
    doubanUrl: '',
    coverUrl: '',
    subTitle: '',
    originName: '',
    authors: ['a', 'b'],
    translators: [],
    page: 1,
    publishingHouse: '',
    publishingTime: '',
    seriesName: '',
    score: 0,
    scorePeopleCount: 0,
    contentBrief: '',
  };

  test('some fields', () => {
    console.log(util.getBookViewText(book1));
    expect(util.getBookViewText(book1)).toBe(`id: 1\n作者: a, b\n页数: 1`);
  });

  test('select fields', () => {
    expect(util.getBookViewText(book1, ['authors'])).toBe(`作者: a, b`);
  });

  const book2: Book = {
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

  test('only id', () => {
    expect(util.getBookViewText(book2)).toBe(`id: 2`);
  });
});
