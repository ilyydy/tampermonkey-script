import { describe, expect, test, vi } from 'vitest';
import path, { join } from 'node:path';

import * as util from '@/util';

const fileName = 'util.test.ts';

test('getFileAbsPath test', () => {
  expect(util.getFileAbsPath(import.meta.url)).toBe(
    join(process.cwd(), 'test', fileName)
  );
});

test('getFilename test', () => {
  expect(util.getFilename(import.meta.url)).toBe('util.test.ts');
});

test('getDirAbsPath test', () => {
  expect(util.getDirAbsPath(import.meta.url)).toBe(join(process.cwd(), 'test'));
});

test('getDirname test', () => {
  expect(util.getDirname(import.meta.url)).toBe('test');
});

test('getProjectRootAbsPath test', () => {
  expect(util.getProjectRootAbsPath()).toBe(process.cwd());
});

describe.concurrent('getMonkeyEntry test', () => {
  const scriptDirName = 'a';

  test('production', () => {
    expect(util.getMonkeyEntry(scriptDirName, 'production')).toBe(
      path.join('src', scriptDirName, util.mainEntry)
    );
  });

  test('local dev or test', () => {
    expect(util.getMonkeyEntry(scriptDirName)).toBe(util.mainEntry);
  });
});

describe.concurrent('getScriptName test', () => {
  const scriptDirName = 'a';

  test('production', () => {
    expect(util.getScriptName(scriptDirName, 'production')).toBe(scriptDirName);
  });

  test('local dev or test', () => {
    expect(util.getScriptName(scriptDirName)).not.toBe(scriptDirName);
  });
});
