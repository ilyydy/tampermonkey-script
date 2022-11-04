import { describe, expect, test, vi } from 'vitest';
import { unlinkSync, existsSync } from 'node:fs';
import { join } from 'node:path';

import { getProjectRootAbsPath } from '../../packages/util';
import * as util from '../../packages/douban-bookshelf/src/util';
import { exportExcelName } from '../../packages/douban-bookshelf/src/constant';
import { book1, book2 } from './data';

import type { Book } from '../../packages/douban-bookshelf/src/types';

describe('getBookViewText test', () => {
  test('select fields', () => {
    expect(util.getBookViewText(book1, ['authors'])).toBe(`作者: a, b`);
  });

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
    ['name', 'birthday'],
    ['George Washington', '1732-02-22'],
    ['John Adams', '1735-10-19'],
  ];
  util.exportExcel(rows);
  expect(existsSync(excelPath)).toBe(true);

  // unlinkSync(excelPath);
});

test('exportBookExcel test', () => {
  const projectRoot = getProjectRootAbsPath();
  const excelPath = join(projectRoot, exportExcelName);

  if (existsSync(excelPath)) {
    unlinkSync(excelPath);
  }
  expect(existsSync(excelPath)).toBe(false);

  const books: Book[] = [book1, book2];
  util.exportBookExcel(books);
  expect(existsSync(excelPath)).toBe(true);

  // unlinkSync(excelPath);
});
