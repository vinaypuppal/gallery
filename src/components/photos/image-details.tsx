import React, { FunctionComponent } from 'react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import useSwr from 'swr';
import clsx from 'clsx';

import { getPhotoDetails } from './utils';
import { PhotoDetailsPlaceholder } from '../emptystates/image-details';
import { Photo, PHOTO_TYPES } from '../../services/unsplash/types';
import { unsplash, toJson } from '../../services/unsplash';
import { PhotoStats } from './stats';
import { Picture } from './image';

export const PhotoDetails: FunctionComponent<{ photo?: Photo; toggleModal?: () => void }> = ({
  photo: imageDetails,
  toggleModal,
}) => {
  const { query } = useRouter();
  const { data: photo, error } = useSwr<Photo>(query.id, (id) => unsplash.photos.getPhoto(id).then(toJson), {
    initialData: imageDetails,
  });

  if (error) {
    return <p className="p-4 text-base text-red-500">{error.toString()}</p>;
  }

  if (!photo) {
    return <PhotoDetailsPlaceholder />;
  }

  const { color, height, width } = photo;

  const { title, description } = getPhotoDetails(photo);
  return (
    <div className={clsx('relative w-full sm:max-w-7xl mx-auto')}>
      <NextSeo title={title} description={description} />
      {toggleModal ? <CloseButton onClick={toggleModal} /> : null}
      <div className={clsx('flex w-full px-2 sm:px-6 flex-col mx-auto sm:items-center', toggleModal ? 'my-2' : 'mb-2')}>
        <div className="mt-4 mr-10">
          <h3 className="mb-2 text-xl font-bold capitalize sm:text-2xl sm:text-center font-display">{title}</h3>
          {description && <p className="max-w-4xl mx-auto mb-2 text-base sm:text-center">{description}</p>}
        </div>
      </div>
      <div
        className={clsx('hidden mx-auto sm:block', toggleModal && 'pb-4')}
        style={{ maxWidth: `calc((100vh - 200px) * ${width / height})` }}>
        <div
          className={clsx('relative bg-gray-100 sm:rounded-lg w-full mx-auto')}
          style={{
            paddingBottom: `${(height / width) * 100}%`,
            backgroundColor: color,
          }}>
          <Picture photo={photo} photoType={PHOTO_TYPES.regular} />
        </div>
        <PhotoStats photo={photo} className="max-w-xl mx-auto mt-4 mb-4 bg-white" />
      </div>
      <div className={clsx('mx-auto sm:hidden')}>
        <div
          className={clsx('relative bg-gray-100 sm:rounded-lg w-full mx-auto')}
          style={{
            paddingBottom: `${(height / width) * 100}%`,
            backgroundColor: color,
          }}>
          <Picture photo={photo} photoType={PHOTO_TYPES.regular} />
        </div>
      </div>
      <PhotoStats
        photo={photo}
        className="fixed bottom-0 left-0 max-w-xl px-3 py-2 mx-auto mt-4 sm:hidden bg-gray-50"
        style={{ backdropFilter: 'saturate(180%) blur(5px)', background: 'hsla(0,0%,100%,0.8)' }}
      />
    </div>
  );
};

const CloseButton: FunctionComponent<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <button className="absolute top-0 right-0 p-4" onClick={onClick}>
      <svg
        className="w-8 h-8 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </button>
  );
};
