export function getBookItemList(seriesDoc: Document) {
  return Array.from(
    seriesDoc.querySelectorAll('#content .subject-item')
  ).reduce((list, cur) => {
    const aEle = cur.querySelector('.info')?.querySelector('a');
    if (aEle?.href?.startsWith('https://book.douban.com/subject/')) {
      list.push({
        element: cur,
        url: aEle?.href,
        name: aEle?.textContent ?? '',
      });
    }
    return list;
  }, [] as { element: Element; url: string; name: string }[]);
}
