import { GM_xmlhttpRequest } from 'vite-plugin-monkey/dist/client';

import type { XhrRequest } from 'vite-plugin-monkey/dist/client';

const parseHeaders = (rawHeaders = '') => {
  const headers = new Headers();
  // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
  // https://tools.ietf.org/html/rfc7230#section-3.2
  const preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
  // Avoiding split via regex to work around a common IE11 bug with the core-js 3.6.0 regex polyfill
  // https://github.com/github/fetch/issues/748
  // https://github.com/zloirock/core-js/issues/751
  preProcessedHeaders
    .split('\r')
    .map(function (header) {
      return header.startsWith(`\n`) ? header.substring(1) : header;
    })
    .forEach(function (line) {
      const parts = line.split(':');
      const key = parts.shift()?.trim();
      if (key) {
        const value = parts.join(':').trim();
        headers.append(key, value);
      }
    });
  return headers;
};

export async function GM_Fetch(xhrRequest: XhrRequest): Promise<Response> {
  return new Promise<Response>((resolve, reject) => {
    const handle = GM_xmlhttpRequest({
      method: 'GET',
      async onload(e) {
        const resp = new Response(e.response ?? e.responseText, {
          status: e.status,
          statusText: e.statusText,
          headers: parseHeaders(e.responseHeaders),
        });
        Object.defineProperty(resp, 'url', { value: e.finalUrl });
        resolve(resp);
      },
      async onerror() {
        reject(new TypeError('Network request failed'));
      },
      async ontimeout() {
        reject(new TypeError('Network request failed'));
      },
      async onabort() {
        reject(new DOMException('Aborted', 'AbortError'));
      },
      ...xhrRequest,
    });
  });
}
