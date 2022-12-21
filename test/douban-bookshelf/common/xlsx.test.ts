import { beforeAll, beforeEach, describe, expect, test, vi } from 'vitest';
import { join } from 'node:path';
import { unlinkSync, existsSync } from 'node:fs';

import { exportXlsx } from '../../../packages/douban-bookshelf/src/common/xlsx';
import { getProjectRootAbsPath } from '../../../packages/util';

test('exportXlsx test', () => {
  const projectRoot = getProjectRootAbsPath();
  const filename = 'test.xlsx';
  const csvPath = join(projectRoot, filename);

  if (existsSync(csvPath)) {
    unlinkSync(csvPath);
  }
  expect(existsSync(csvPath)).toBe(false);

  const rows = [
    ['name', 'birthday'],
    ['George Washington', '1732-02-22'],
    ['John Adams', '1735-10-19'],
  ];
  exportXlsx(rows, filename);
  expect(existsSync(csvPath)).toBe(true);

  // unlinkSync(excelPath);
});
