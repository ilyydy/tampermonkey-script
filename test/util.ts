import { Window } from 'happy-dom';
import { promises } from 'node:fs';

export function createWindowFromHtml(html: string) {
  const window = new Window();
  window.document.body.innerHTML = html;
  return window;
}

export async function createWindowFromFile(htmlPath: string) {
  const html = await promises.readFile(htmlPath, {
    encoding: 'utf-8',
  });
  return createWindowFromHtml(html);
}
