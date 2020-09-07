import React from 'react';
import { useColumns } from '../../hooks/useColumns';

export const GridPlaceholder = () => {
  const columnCount = useColumns(['(min-width: 768px)', '(min-width: 640px)'], [3, 2], 1);

  const columns: { width: number; height: number }[][] = Array.from({ length: columnCount }).map(() =>
    Array.from({ length: 3 }).map(() => ({
      width: 480,
      height: 360,
    }))
  );

  return (
    <>
      {columns.map((column, index) => (
        <div key={`placeholder-${index}`} className="w-full px-2 sm:w-1/2 md:w-1/3">
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
