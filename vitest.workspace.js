import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  "./vite.config.ts",
  "./packages/csdn/vite.config.ts",
  "./packages/douban-bookshelf/vite.config.ts"
])
