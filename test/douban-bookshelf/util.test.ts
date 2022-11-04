import { describe, expect, test, vi } from 'vitest';
import { unlinkSync, existsSync } from 'node:fs';
import { join } from 'node:path';

import { getProjectRootAbsPath } from '../../packages/util';
import * as util from '../../packages/douban-bookshelf/src/util';
import { exportExcelName } from '../../packages/douban-bookshelf/src/constant';

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

test('exportExcel test', () => {
  const projectRoot = getProjectRootAbsPath();
  const excelPath = join(projectRoot, exportExcelName);

  if (existsSync(excelPath)) {
    unlinkSync(excelPath);
  }
  expect(existsSync(excelPath)).toBe(false);

  const rows = [
    { name: 'George Washington', birthday: '1732-02-22' },
    { name: 'John Adams', birthday: '1735-10-19' },
  ];
  util.exportExcel(rows);
  expect(existsSync(excelPath)).toBe(true);

  unlinkSync(excelPath);
});
