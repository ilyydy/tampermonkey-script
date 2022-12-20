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

        const id =
          aEle?.href
            ?.split('https://book.douban.com/subject/')[1]
            ?.split('/')[0] ?? '';

        list.push({
          element: cur,
          url: aEle?.href,
          id,
          name,
        });
      }
      return list;
    },
    [] as { element: Element; url: string; id: string; name: string }[]
  );
}
