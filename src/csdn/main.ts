document.body.contentEditable = 'true';

for (const element of Array.from(document.getElementsByTagName('pre'))) {
  element.style.userSelect = 'auto';
}

for (const element of Array.from(document.getElementsByTagName('code'))) {
  element.style.userSelect = 'auto';
  element.removeAttribute('onclick');
}

export {};
