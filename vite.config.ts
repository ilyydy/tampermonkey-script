import { defineConfig } from 'vitest/config';

export default defineConfig(({ command, mode }) => {
  const define =
    mode !== 'test'
      ? {}
      : {
          __MONKEY_WINDOW__: {},
        };

  return {
    define,
    test: {
      environment: 'happy-dom',
    },
  };
});
