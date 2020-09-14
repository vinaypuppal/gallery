import React, { FunctionComponent } from 'react';
import clsx from 'clsx';
import useSwr from 'swr';
import { createSnackbar } from '@snackbar/core';
import { toClipboard } from 'copee';

import { Photo, PHOTO_TYPES } from '../../services/unsplash/types';
import { Picture, getPhotoUrl } from './image';
import { useRouter } from 'next/router';
import { unsplash, toJson } from '../../services/unsplash';
import { PhotoDetailsPlaceholder } from '../emptystates/image-details';
import { supportsImgType } from '../../utils';

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

  const { description, color, sponsorship, created_at, height, width, alt_description, user } = photo;

  const title =
    alt_description ||
    (sponsorship && sponsorship.tagline ? sponsorship.tagline : new Date(created_at).toLocaleString());
  const detailedDescription = user.bio || description;
  return (
    <div className={clsx('relative w-full sm:max-w-7xl mx-auto')}>
      {toggleModal ? <CloseButton onClick={toggleModal} /> : null}
      <div className={clsx('flex w-full px-2 sm:px-6 flex-col mx-auto sm:items-center', toggleModal ? 'my-2' : 'mb-2')}>
        <div className="mt-4 mr-10">
          <h3 className="mb-2 text-xl font-bold capitalize sm:text-2xl sm:text-center font-display">{title}</h3>
          {detailedDescription && (
            <p className="max-w-4xl mx-auto mb-2 text-base sm:text-center">{detailedDescription}</p>
          )}
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
        <PhotoStats photo={photo} className="max-w-xl mx-auto mt-4 mb-4" />
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
        className="fixed bottom-0 left-0 max-w-xl px-3 py-2 mx-auto mt-4 border-t border-gray-100 border-solid sm:hidden bg-gray-50"
      />
    </div>
  );
};

const PhotoStats: FunctionComponent<{ photo: Photo; className?: string }> = ({
  photo,
  className = 'max-w-md mx-auto mb-1',
}) => {
  const { likes = 0, links, views = 0, downloads = 0, alt_description, user } = photo;

  async function onShareClick() {
    if (!window.navigator.share) {
      const success = toClipboard(window.location.href);
      if (success) {
        createSnackbar(`Copied link for sharing!`, { timeout: 5000 });
      } else {
        createSnackbar(`Failed to Copy!`, { timeout: 5000 });
      }
    } else {
      try {
        const isWebpSupported = await supportsImgType('image/webp');
        const { webpUrl, jpegUrl } = getPhotoUrl(photo, PHOTO_TYPES.regular);
        const photoBlob = await fetch(isWebpSupported ? webpUrl : jpegUrl).then((res) => res.blob());
        const shareData: { title: string; text: string; url: string; files?: File[] } = {
          title: alt_description,
          text: user.bio,
          url: window.location.href,
        };
        const files = [
          new File([photoBlob], `${photo.id}.${isWebpSupported ? 'webp' : 'jpg'}`, {
            type: isWebpSupported ? 'image/webp' : 'image/jpeg',
          }),
        ];
        // @ts-ignore
        if ('canShare' in window.navigator && window.navigator.canShare({ files })) {
          shareData.files = files;
        }
        await window.navigator.share(shareData);
      } catch (error) {
        createSnackbar(`Failed to share!, ${error.toString()}`, { timeout: 5000 });
      }
    }
  }

  return (
    <div className={clsx('flex justify-between w-full items-center', className)}>
      <div>
        <p className="text-sm font-extrabold text-center text-blue-600">{likes}</p>
        <p className="text-xs font-medium text-center text-gray-500">Likes</p>
      </div>
      <div>
        <p className="text-sm font-extrabold text-center text-pink-600">{views}</p>
        <p className="text-xs font-medium text-center text-gray-500">Views</p>
      </div>
      <div>
        <p className="text-sm font-extrabold text-center text-purple-600">{downloads}</p>
        <p className="text-xs font-medium text-center text-gray-500">Downloads</p>
      </div>
      <div>
        <a
          target="_blank"
          href={`${links.download}?force=true`}
          rel="nofollow"
          download
          onClick={() => createSnackbar(`Downloading please wait`, { timeout: 5000 })}
          className="inline-flex items-center px-2 py-1 text-xs font-medium leading-4 text-white transition duration-150 ease-in-out bg-green-600 border border-transparent rounded sm:px-3 sm:py-2 sm:text-sm hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green active:bg-green-700">
          Download
        </a>
        <button
          onClick={onShareClick}
          type="button"
          className="inline-flex items-center px-2 py-1 ml-2 text-xs font-medium leading-4 text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded sm:text-sm sm:px-3 sm:py-2 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700">
          Share
        </button>
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
