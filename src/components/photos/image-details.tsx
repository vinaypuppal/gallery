import React, { FunctionComponent } from 'react';
import clsx from 'clsx';
import useSwr from 'swr';

import { Photo, PHOTO_TYPES } from '../../services/unsplash/types';
import { Picture } from './image';
import { useRouter } from 'next/router';
import { unsplash, toJson } from '../../services/unsplash';
import { PhotoDetailsPlaceholder } from '../emptystates/image-details';
import { BackHomeHeader } from '../headers/back-home';

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

  const { description, color, sponsorship, created_at, likes, links, height, width } = photo;

  return (
    <div className={clsx('relative w-full sm:max-w-7xl mx-auto')}>
      {toggleModal ? <CloseButton onClick={toggleModal} /> : null}
      <div className={clsx('flex w-full px-2 sm:px-6 flex-col mx-auto', toggleModal ? 'my-4' : 'mb-4')}>
        <div className="mt-4 mr-10">
          <h3 className="mb-2 text-2xl font-bold font-display">
            {sponsorship && sponsorship.tagline ? sponsorship.tagline : new Date(created_at).toLocaleString()}
          </h3>
          <p className="mb-2 text-base">{description}</p>
        </div>
        <div className="flex justify-between">
          <p className="flex items-center justify-center px-2 text-lg border border-gray-300 border-solid rounded-md">
            <span className="block mr-1 font-semibold">{likes}</span>{' '}
            <svg
              className="w-5 h-5 text-red-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clip-rule="evenodd"
              />
            </svg>
          </p>
          <a
            target="_blank"
            href={`${links.download}?force=true`}
            rel="nofollow"
            download
            className="block px-4 py-2 border border-gray-300 border-solid rounded-md">
            Download
          </a>
        </div>
      </div>
      <div className="hidden mx-auto sm:block" style={{ maxWidth: `calc((100vh - 175px) * ${width / height})` }}>
        <div
          className={clsx('relative bg-gray-100 sm:rounded-lg w-full mx-auto')}
          style={{
            paddingBottom: `${(height / width) * 100}%`,
            backgroundColor: color,
          }}>
          <Picture photo={photo} photoType={PHOTO_TYPES.regular} />
        </div>
      </div>
      <div className="mx-auto sm:hidden">
        <div
          className={clsx('relative bg-gray-100 sm:rounded-lg w-full mx-auto')}
          style={{
            paddingBottom: `${(height / width) * 100}%`,
            backgroundColor: color,
          }}>
          <Picture photo={photo} photoType={PHOTO_TYPES.regular} />
        </div>
      </div>
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
