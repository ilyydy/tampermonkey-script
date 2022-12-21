import * as XLSX from 'xlsx';

import type { AOA2SheetOpts, WritingOptions } from 'xlsx';

export function exportXlsx<T = any>(
  rows: T[][],
  filename: string,
  aoa2SheetOpts?: AOA2SheetOpts,
  writingOptions?: WritingOptions
) {
  const worksheet = XLSX.utils.aoa_to_sheet(rows, aoa2SheetOpts);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet);
  XLSX.writeFile(workbook, filename, writingOptions);
}
