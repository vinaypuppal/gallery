import React, { FunctionComponent } from 'react';
import { useSWRInfinite } from 'swr';

import { unsplash, toJson } from '../../services/unsplash';
import { Photo } from '../../services/unsplash/types';
import { config } from '../../config';
import { Image } from './image';

export const PhotoGrid: FunctionComponent = () => {
  const { data, error, size, setSize } = useSWRInfinite<Photo[]>(
    (pageIndex, prevPageData) => {
      if (prevPageData && prevPageData.length) return null;
      return [pageIndex + 1, config.perPage];
    },
    (page, perPage) => unsplash.photos.listPhotos(page, perPage).then(toJson)
  );
  const photos: Photo[] = data ? data.flatMap((d) => d) : [];
  const column1 = photos.filter((d, i) => i % 3 === 0);
  const column2 = photos.filter((d, i) => i % 3 === 1);
  const column3 = photos.filter((d, i) => i % 3 === 2);
  return (
    <main className="p-4 mt-4 sm:px-6 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap">
          {[column1, column2, column3].map((column) => (
            <div className="w-full sm:w-1/2 md:w-1/3">
              {column.map((photo, index) => (
                <Image photo={photo} index={index} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
