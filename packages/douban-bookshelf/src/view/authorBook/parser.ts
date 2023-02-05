export function getBookItemList(seriesDoc: Document) {
  return Array.from(seriesDoc.querySelectorAll('#content li')).reduce(
    (list, cur) => {
      const aEle = cur?.querySelector('a');
      if (aEle?.href?.startsWith('https://book.douban.com/subject/')) {
        const id =
          aEle?.href
            ?.split('https://book.douban.com/subject/')[1]
            ?.split('/')[0] ?? '';

        list.push({
          element: cur,
          url: aEle?.href,
          id,
          name: aEle?.textContent ?? '',
        });
      }
      return list;
    },
    [] as { element: Element; url: string; id: string; name: string }[]
  );
}
