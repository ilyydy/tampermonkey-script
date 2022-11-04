import { ElMessage } from 'element-plus';
import XLSX from 'xlsx';
import fs from 'node:fs';

import { BOOK_FIELD_MAP, defaultBookFields, exportExcelName } from './constant';

import type { Book } from './types';
import type { AOA2SheetOpts, WritingOptions } from 'xlsx';

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
  await navigator.clipboard.writeText(text);
}

export function success(msg: string) {
  return ElMessage.success({ message: msg, showClose: true, grouping: true });
}

export function warning(msg: string) {
  console.warn(msg);
  return ElMessage.warning({ message: msg, showClose: true, grouping: true });
}

export function error(msg: string) {
  console.error(msg);
  return ElMessage.error({ message: msg, showClose: true, grouping: true });
}

export function info(msg: string) {
  return ElMessage.info({ message: msg, showClose: true, grouping: true });
}

if (import.meta.env.MODE === 'test') {
  /**
   * @see https://docs.sheetjs.com/docs/getting-started/installation/nodejs/#usage
   */
  XLSX.set_fs(fs);
}

export function exportExcel<T = any>(
  rows: T[][],
  filename = exportExcelName,
  aoa2SheetOpts?: AOA2SheetOpts,
  writingOptions?: WritingOptions
) {
  const worksheet = XLSX.utils.aoa_to_sheet(rows, aoa2SheetOpts);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet);
  XLSX.writeFile(workbook, filename, writingOptions);
}

export function exportBookExcel(
  books: Book[],
  filename = exportExcelName,
  aoa2SheetOpts?: AOA2SheetOpts,
  writingOptions?: WritingOptions
) {
  const header = defaultBookFields.map((field) => BOOK_FIELD_MAP[field]);
  const data: any[] = [header];

  books.forEach((book) => {
    const row = defaultBookFields.map((field) => book[field]);
    data.push(row);
  });

  exportExcel(data, filename, aoa2SheetOpts, writingOptions);
}
