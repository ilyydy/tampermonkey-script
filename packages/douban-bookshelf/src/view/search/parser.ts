export function getBookItemList(searchDoc: Document) {
  const rootEle = searchDoc.querySelector('#wrapper #root');
  if (!rootEle) return [];

  return Array.from(rootEle.querySelectorAll('.item-root')).reduce(
    (list, cur) => {
      const aEle = cur.querySelector('a');
      if (aEle?.href?.startsWith('https://book.douban.com/subject/')) {
        const name =
          cur.querySelector('.detail .title')?.querySelector('a')
            ?.textContent ?? '';
        list.push({
          element: cur,
          url: aEle?.href,
          name,
        });
      }
      return list;
    },
    [] as { element: Element; url: string; name: string }[]
  );
}
