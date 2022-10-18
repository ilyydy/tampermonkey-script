import { describe, expect, test, vi } from 'vitest';
import { Window } from 'happy-dom';

import run from '../../packages/csdn/src/script';

test('csdn test', () => {
  const html = `
<pre data-index="0" class="set-code-hide prettyprint">
  <code class="prism language-java has-numbering" onclick="mdcp.signin(event)" style="position: unset;">
    <span class="token annotation punctuation">@Data</span>
  </code>
</pre>
`;

  const window = new Window();
  const document = window.document;
  document.body.innerHTML = html;
  run(document as any);

  expect(document.body.innerHTML.split('user-select: auto').length - 1).toBe(2);
  expect(document.body.innerHTML.includes('onclick')).toBe(false);
});
