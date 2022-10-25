import * as booksStore from './books';

export function useStore(force = false) {
  booksStore.useStore(force);

  return { booksStore };
}
