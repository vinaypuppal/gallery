import React, { FunctionComponent } from 'react';
import { createSnackbar } from '@snackbar/core';
import { toClipboard } from 'copee';
import clsx from 'clsx';

import { Photo, PHOTO_TYPES } from '../../services/unsplash/types';
import { getPhotoUrl, getPhotoDetails } from './utils';
import { supportsImgType } from '../../utils';

export const PhotoStats: FunctionComponent<{ photo: Photo; className?: string; style?: Record<string, string> }> = ({
  photo,
  className = 'max-w-md mx-auto mb-1',
  style,
}) => {
  const { links } = photo;
  const { title, description, likes, views, downloads } = getPhotoDetails(photo);

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
        const shareData: { title: string; text: string; url: string; files?: File[] } = {
          title: title,
          text: description,
          url: window.location.href,
        };

        // Safari: Has a bug which does not allow sharing after xhr call https://stackoverflow.com/questions/56046434/how-to-use-webshareapi-preceded-by-an-ajax-call-in-safari/59881576#59881576
        if ('canShare' in window.navigator) {
          const isWebpSupported = await supportsImgType('image/webp');
          const { webpUrl, jpegUrl } = getPhotoUrl(photo, PHOTO_TYPES.regular);
          const photoBlob = await fetch(isWebpSupported ? webpUrl : jpegUrl).then((res) => res.blob());
          const files = [
            new File([photoBlob], `${photo.id}.${isWebpSupported ? 'webp' : 'jpg'}`, {
              type: isWebpSupported ? 'image/webp' : 'image/jpeg',
            }),
          ];
          // @ts-ignore
          if (window.navigator.canShare({ files })) shareData.files = files;
        }
        await window.navigator.share(shareData);
      } catch (error) {
        createSnackbar(`Failed to share!, ${error.toString()}`, { timeout: 5000 });
      }
    }
  }

  return (
    <div className={clsx('flex justify-between w-full items-center', className)} style={style}>
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
          rel="nofollow noopener noreferrer"
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
