import { beforeAll, beforeEach, describe, expect, test, vi } from 'vitest';
import { join } from 'node:path';
import { unlinkSync, existsSync } from 'node:fs';

import {
  getBookViewText,
  exportExcel,
  exportBookExcel,
  copyBook,
} from '../../../packages/douban-bookshelf/src/common/book';
import { getProjectRootAbsPath } from '../../../packages/util';
import { exportExcelName } from '../../../packages/douban-bookshelf/src/common/book';
import { book1, book2 } from '../data';

import type { Book } from '../../../packages/douban-bookshelf/src/types';

describe('getBookViewText test', () => {
  test('select fields', () => {
    expect(getBookViewText(book1, ['authors'])).toBe(`作者: a, b`);
  });

  test('only id', () => {
    expect(getBookViewText(book2)).toBe(`id: 2`);
  });
});

// test('copyBook test', async () => {
//   await copyBook(book1);
//   console.log(navigator.clipboard); // clipboard undefined
//   const text = await navigator.clipboard.readText();
// });

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
  exportExcel(rows);
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
  exportBookExcel(books);
  expect(existsSync(excelPath)).toBe(true);

  // unlinkSync(excelPath);
});
