export function getBookItemList(searchDoc: Document) {
  const rootEle = searchDoc.querySelector('#wrapper #root');
  if (!rootEle) return [];

  return Array.from(rootEle.querySelectorAll('.item-root'));
}
