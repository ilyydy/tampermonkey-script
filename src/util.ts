import { basename, dirname, relative, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export function getFileAbsPath(metaUrl: string) {
  return fileURLToPath(metaUrl);
}

export function getFilename(metaUrl: string) {
  return basename(getFileAbsPath(metaUrl));
}

export function getDirAbsPath(metaUrl: string) {
  return dirname(getFileAbsPath(metaUrl));
}

export function getDirname(metaUrl: string) {
  return basename(getDirAbsPath(metaUrl));
}

export function getProjectRootAbsPath() {
  return fileURLToPath(new URL('..', import.meta.url));
}

export function isProd() {
  return process.env.NODE_ENV === 'production';
}

const mainEntry = 'main.ts';

export function getMonkeyEntry(scriptDirName: string) {
  return isProd()
    ? join(getDirname(import.meta.url), scriptDirName, mainEntry)
    : mainEntry;
}

console.log(getMonkeyEntry('csdn'));
export function getScriptName(scriptDirName: string) {
  return isProd() ? scriptDirName : `${scriptDirName}-test`;
}
