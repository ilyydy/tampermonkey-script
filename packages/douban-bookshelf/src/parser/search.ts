export function getBookItemList(searchDoc: Document) {
  const rootEle = searchDoc.querySelector('#wrapper #root');
  if (!rootEle) return [];

  return Array.from(rootEle.querySelectorAll('.item-root')).filter((i) => {
    const aEle = i.querySelector('a');
    return aEle?.href?.startsWith('https://book.douban.com/subject/');
  });
}
