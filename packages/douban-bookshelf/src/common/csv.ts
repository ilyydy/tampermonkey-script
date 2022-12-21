import { stringify } from 'csv-stringify/browser/esm/sync';
import fs from 'node:fs';

import type { Options } from 'csv-stringify';

export function exportCsv<T = any>(
  rows: T[][],
  filename: string,
  options?: Options
) {
  const v = stringify(rows, options);

  if (import.meta.env.MODE === 'test') {
    fs.writeFileSync(filename, v);
  } else {
    const link = document.createElement('a');
    link.download = filename;
    const blob = new Blob([v], { type: 'text/csv;charset=utf-8;' });
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
  }
}
