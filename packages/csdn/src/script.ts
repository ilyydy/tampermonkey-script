export default function run(doc: Document) {
  doc.body.contentEditable = 'true';

  for (const element of Array.from(doc.getElementsByTagName('pre'))) {
    element.style.userSelect = 'auto';
    element.classList.remove('set-code-hide');
    element.querySelector('.hide-preCode-box')?.remove();
  }

  for (const element of Array.from(doc.getElementsByTagName('code'))) {
    element.style.userSelect = 'auto';
    element.removeAttribute('onclick');
  }
}
