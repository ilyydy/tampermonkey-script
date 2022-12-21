import { describe, expect, test, vi } from 'vitest';

import run from '../../packages/csdn/src/script';
import { createWindowFromHtml } from '../util';

test('csdn test', () => {
  const html = `
<pre data-index="0" class="set-code-hide prettyprint">
  <code class="prism language-java has-numbering" onclick="mdcp.signin(event)" style="position: unset;">
    <span class="token annotation punctuation">@Data</span>
  </code>
</pre>
`;

  const window = createWindowFromHtml(html);
  const document = window.document;
  run(document as any);

  expect(document.body.innerHTML.split('user-select: auto').length - 1).toBe(2);
  expect(document.body.innerHTML.includes('onclick')).toBe(false);
});
