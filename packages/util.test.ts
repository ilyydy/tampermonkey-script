import { describe, expect, test, vi } from 'vitest';
import path, { join } from 'node:path';

import * as util from './util';

const fileName = 'util.test.ts';

test('getFileAbsPath test', () => {
  expect(util.getFileAbsPath(import.meta.url)).toBe(
    join(process.cwd(), 'packages', fileName)
  );
});

test('getFilename test', () => {
  expect(util.getFilename(import.meta.url)).toBe('util.test.ts');
});

test('getDirAbsPath test', () => {
  expect(util.getDirAbsPath(import.meta.url)).toBe(
    join(process.cwd(), 'packages')
  );
});

test('getDirname test', () => {
  expect(util.getDirname(import.meta.url)).toBe('packages');
});

test('getProjectRootAbsPath test', () => {
  expect(util.getProjectRootAbsPath()).toBe(process.cwd());
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
