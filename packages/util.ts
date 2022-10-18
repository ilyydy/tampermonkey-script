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
  return dirname(fileURLToPath(new URL('../package.json', import.meta.url)));
}

export const isProd = (env?: string) => env === 'production';

export const getEnv = () => process.env.NODE_ENV;

export function getScriptName(scriptDirName: string, env = getEnv()) {
  return isProd(env) ? scriptDirName : `${scriptDirName}-test`;
}
