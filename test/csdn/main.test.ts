import { describe, expect, test, vi } from 'vitest';
import path, { join } from 'node:path';

import * as util from '../../src/util';

const fileName = 'util.test.ts';

test('getFileAbsPath test', () => {
  expect(util.getFileAbsPath(import.meta.url)).toBe(
    join(process.cwd(), 'test', fileName)
  );
});
