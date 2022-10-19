import { join } from 'node:path';

import type { MonkeyOption } from 'vite-plugin-monkey';

import { getProjectRootAbsPath } from './util';

export const baseViteConfig = {
  build: {
    outDir: join(getProjectRootAbsPath(), 'dist'),
    emptyOutDir: true,
  },
};

export function getBaseMonkeyConfig(scriptDirName: string): MonkeyOption {
  return {
    entry: 'src/main.ts',
    userscript: {
      name: `${scriptDirName}.user.js`,
      namespace: 'https://github.com/ilyydy/tampermonkey-script',
      author: 'ilyydy',
    },
    build: {
      fileName: `${scriptDirName}.user.js`,
    },
  };
}