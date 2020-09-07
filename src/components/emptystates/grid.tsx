import React from 'react';

import { useColumns } from '../../hooks/useColumns';
import { config } from '../../config';

export const GridPlaceholder = () => {
  const columnCount = useColumns(config.columnsMediaQueries, config.columns, config.defaultColumns);

  const columns: { width: number; height: number }[][] = Array.from({ length: columnCount }).map((_, i) =>
    Array.from({ length: 3 }).map((_, j) => ({
      width: 480,
      // TODO: figure this out later
      height: columnCount < 3 ? (i % 2 && j % 3 === 0 ? 180 : 300) : i % 2 === 0 && j % 2 === 0 ? 300 : 400,
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
