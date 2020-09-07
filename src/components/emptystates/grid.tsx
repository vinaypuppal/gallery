import React from 'react';

import { useColumns } from '../../hooks/useColumns';
import { config } from '../../config';

export const GridPlaceholder = () => {
  const columnCount = useColumns(config.columnsMediaQueries, config.columns, config.defaultColumns);

  const columns: { width: number; height: number }[][] = Array.from({ length: columnCount }).map(() =>
    Array.from({ length: 3 }).map(() => ({
      width: 480,
      height: 360,
    }))
  );

  return (
    <>
      {columns.map((column, index) => (
        <div key={`placeholder-${index}`} className="w-1/2 px-2 md:w-1/3">
          {column.map((photo, index) => (
            <div
              key={`placeholder-${index}`}
              className="w-full mb-4 bg-gray-200 rounded-lg"
              style={{ height: photo.height }}
            />
          ))}
        </div>
      ))}
    </>
  );
};
