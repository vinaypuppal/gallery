import React, { FunctionComponent, useRef } from 'react';
import { useSWRInfinite } from 'swr';
import { useRouter } from 'next/router';

import { unsplash, toJson } from '../../services/unsplash';
import { Photo, SearchResults } from '../../services/unsplash/types';
import { config } from '../../config';
import { Image } from './image';
import { useColumns } from '../../hooks/useColumns';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { Modal } from '../modal';
import { PhotoDetails } from './image-details';
import { GridPlaceholder } from '../emptystates/grid';

export const PhotoGrid: FunctionComponent = () => {
  const { query, push } = useRouter();
  const searchKeyword = query.search;
  const endRef = useRef<HTMLDivElement>();
  const columnCount = useColumns(config.columnsMediaQueries, config.columns, config.defaultColumns);

  const { data, error, size, setSize } = useSWRInfinite<Photo[] | SearchResults>(
    (pageIndex) => {
      return [pageIndex + 1, config.perPage, searchKeyword];
    },
    (page, perPage, searchKeyword) =>
      searchKeyword
        ? unsplash.search.photos(searchKeyword, page, perPage).then(toJson)
        : unsplash.photos.listPhotos(page, perPage).then(toJson)
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

  function toggleModal() {
    const href = searchKeyword ? { pathname: '/', query: { search: searchKeyword } } : '/';
    push(href, href, { shallow: true }).catch((error) => alert(error.toString()));
  }

  const photos: Photo[] = data ? data.flatMap((d) => (Array.isArray(d) ? d : d.results)) : [];
  const columns: Photo[][] = Array.from({ length: columnCount }).map(() => []);
  const columnHeights = Array.from({ length: columnCount }).map(() => 0);
  photos.forEach((photo) => {
    const shortColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
    columns[shortColumnIndex].push(photo);
    columnHeights[shortColumnIndex] += photo.height;
  });

  const activePhoto = photos.find((photo) => photo.id === query.id);

  return (
    <main className="p-2 mt-4 sm:px-6 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap">
          {isLoadingInitialData ? (
            <GridPlaceholder />
          ) : (
            columns.map((column, index) => (
              <div key={index} className="w-1/2 md:w-1/3">
                {column.map((photo) => (
                  <Image key={photo.id} photo={photo} />
                ))}
                {columns.length !== 0 && <div className="w-20 h-20" ref={endRef} />}
              </div>
            ))
          )}
        </div>
      </div>
      {activePhoto && (
        <Modal
          modalClassNames="w-full sm:max-w-4xl sm:w-11/12 mx-auto"
          showModal={!!query.id && !!activePhoto}
          toggleModal={toggleModal}
          closeOnBackdropClick>
          <PhotoDetails photo={activePhoto} toggleModal={toggleModal} />
        </Modal>
      )}
    </main>
  );
};
