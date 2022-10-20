import { join } from 'node:path';

import type { MonkeyOption } from 'vite-plugin-monkey';

import { getProjectRootAbsPath } from './util';

export const baseViteConfig = {
  build: {
    outDir: join(getProjectRootAbsPath(), 'dist'),
    emptyOutDir: true,
    sourceMap: 'inline',
  },
};

export function getBaseMonkeyConfig(scriptDirName: string): MonkeyOption {
  return {
    entry: 'src/main.ts',
    userscript: {
      namespace: 'https://github.com/ilyydy/tampermonkey-script',
      author: 'ilyydy',
      license: 'MIT',
      supportURL: 'https://github.com/ilyydy/tampermonkey-script/issues',
      updateURL: `https://github.com/ilyydy/tampermonkey-script/blob/${scriptDirName}/${scriptDirName}.meta.js`,
      downloadURL: `https://github.com/ilyydy/tampermonkey-script/blob/${scriptDirName}/${scriptDirName}.user.js`,
    },
    build: {
      metaFileName: true,
      fileName: `${scriptDirName}.user.js`,
    },
  };
}
