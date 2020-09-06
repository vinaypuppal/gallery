import { useEffect, useState } from 'react';

export function useColumns(queries: string[], columns: number[], defaultColumns: number) {
  const [value, setValue] = useState(defaultColumns);

  useEffect(() => {
    const mediaQueryLists = typeof window === undefined ? [] : queries.map((q) => window.matchMedia(q));
    const getValue = () => {
      const index = mediaQueryLists.findIndex((mql) => mql.matches);
      return typeof columns[index] !== 'undefined' ? columns[index] : defaultColumns;
    };
    setValue(getValue);
    const handler = () => setValue(getValue);
    mediaQueryLists.forEach((mql) => mql.addListener(handler));
    return () => mediaQueryLists.forEach((mql) => mql.removeListener(handler));
  }, [queries, columns, defaultColumns]);

  return value;
}
