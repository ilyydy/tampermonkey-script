import { beforeAll, beforeEach, assert, expect, test, vi } from 'vitest';
import { fileURLToPath } from 'node:url';

import { createWindowFromFile } from '../../../util';
import * as douban from '../../../../packages/douban-bookshelf/src/common/douban';
import { useInitBtns } from '../../../../packages/douban-bookshelf/src/view/subject/index';

import type { Document } from 'happy-dom';

let docAlice: Document;

beforeAll(async () => {
  const windowAlice = await createWindowFromFile(
    fileURLToPath(new URL('../../html/subjectAlice.html', import.meta.url))
  );
  docAlice = windowAlice.document;
});

test('useInitBtns test', async () => {
  const btns = useInitBtns(docAlice as any);
  expect(btns).not.toBe(undefined);

  const aElements = Array.from(
    docAlice.getElementsByClassName(douban.IDENTIFY_CLASS)
  );
  expect(aElements.length).toBe(2);
  expect(aElements[0].textContent).toBe(douban.COPY);
  expect(aElements[1].textContent).toBe(douban.ADD_SHELF);

  const empty = useInitBtns(docAlice as any);
  expect(empty).toBe(undefined);

  const aElementsAgain = Array.from(
    docAlice.getElementsByClassName(douban.IDENTIFY_CLASS)
  );
  expect(aElementsAgain.length).toBe(2);
});
