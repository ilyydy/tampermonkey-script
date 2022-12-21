import { beforeAll, beforeEach, describe, expect, test, vi } from 'vitest';
import { join } from 'node:path';
import { unlinkSync, existsSync } from 'node:fs';

import {
  getBookViewText,
  exportBookCsv,
  exportCsvName,
  exportBookXlsx,
  exportXlsxName,
  copyBook,
} from '../../../packages/douban-bookshelf/src/common/book';
import { getProjectRootAbsPath } from '../../../packages/util';
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

test('exportBookCsv test', () => {
  const projectRoot = getProjectRootAbsPath();
  const excelPath = join(projectRoot, exportCsvName);

  if (existsSync(excelPath)) {
    unlinkSync(excelPath);
  }
  expect(existsSync(excelPath)).toBe(false);

  const books: Book[] = [book1, book2];
  exportBookCsv(books);
  expect(existsSync(excelPath)).toBe(true);

  // unlinkSync(excelPath);
});

test('exportBookXlsx test', () => {
  const projectRoot = getProjectRootAbsPath();
  const excelPath = join(projectRoot, exportXlsxName);

  if (existsSync(excelPath)) {
    unlinkSync(excelPath);
  }
  expect(existsSync(excelPath)).toBe(false);

  const books: Book[] = [book1, book2];
  exportBookXlsx(books);
  expect(existsSync(excelPath)).toBe(true);

  // unlinkSync(excelPath);
});
