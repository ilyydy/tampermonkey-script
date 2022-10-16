import monkey from 'vite-plugin-monkey';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { getMonkeyEntry, getProjectRootAbsPath } from './util';

export type MonkeyOption = Parameters<typeof monkey>[0];

export const baseViteConfig = {
  build: {
    outDir: join(getProjectRootAbsPath(), 'dist'),
    emptyOutDir: true,
  },
};

export function getBaseMonkeyConfig(scriptDirName: string): MonkeyOption {
  return {
    entry: getMonkeyEntry(scriptDirName),
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
