import React, { FunctionComponent, useRef } from 'react';
import { useSWRInfinite } from 'swr';

import { unsplash, toJson } from '../../services/unsplash';
import { Photo } from '../../services/unsplash/types';
import { config } from '../../config';
import { Image } from './image';
import { useColumns } from '../../hooks/useColumns';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

export const PhotoGrid: FunctionComponent = () => {
  const endRef = useRef<HTMLDivElement>();
  const columnCount = useColumns(['(min-width: 768px)', '(min-width: 640px)'], [3, 2], 1);

  const { data, error, size, setSize } = useSWRInfinite<Photo[]>(
    (pageIndex) => {
      return [pageIndex + 1, config.perPage];
    },
    (page, perPage) => unsplash.photos.listPhotos(page, perPage).then(toJson)
  );
  const isLoadingInitialData = !data && !error;
  const isLoadingMore = isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === 'undefined');

  useIntersectionObserver({
    rootMargin: '600px',
    threshold: 1.0,
    root: null,
    target: endRef,
    onIntersect: ([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting && !isLoadingMore) {
        console.log(`Intersected`);
        setSize(size + 1);
      }
    },
  });

  const photos: Photo[] = data ? data.flatMap((d) => d) : [];
  const columns = Array.from({ length: columnCount }).map(() => []);
  const columnHeights = Array.from({ length: columnCount }).map(() => 0);
  photos.forEach((photo) => {
    const shortColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
    columns[shortColumnIndex].push(photo);
    columnHeights[shortColumnIndex] += photo.height;
  });

  return (
    <main className="p-4 mt-4 sm:px-6 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap">
          {columns.map((column, index) => (
            <div key={index} className="w-full sm:w-1/2 md:w-1/3">
              {column.map((photo, index) => (
                <Image key={photo.id} photo={photo} index={index} />
              ))}
              {columns.length !== 0 && <div className="w-20 h-20" ref={endRef} />}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
