import { ElMessage } from 'element-plus';
import XLSX from 'xlsx';
import fs from 'node:fs';

import { BOOK_FIELD_MAP, defaultBookFields, exportExcelName } from './constant';

import type { Book } from './types';
import type { JSON2SheetOpts, WritingOptions } from 'xlsx';

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

export function exportExcel<T = any>(
  rows: T[],
  filename = exportExcelName,
  json2SheetOpts?: JSON2SheetOpts,
  writingOptions?: WritingOptions
) {
  if (import.meta.env.DEV) {
    /**
     * @see https://docs.sheetjs.com/docs/getting-started/installation/nodejs/#usage
     */
    XLSX.set_fs(fs);
  }

  const worksheet = XLSX.utils.json_to_sheet(rows, json2SheetOpts);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet);
  XLSX.writeFile(workbook, filename, writingOptions);
}
