import React, { FunctionComponent } from 'react';
import Link from 'next/link';

import { Photo, PHOTO_TYPES } from '../../services/unsplash/types';
import clsx from 'clsx';

export const Image: FunctionComponent<{ photo: Photo; index: number }> = ({ photo, index }) => {
  return (
    <Link key={photo.id} shallow href={`/?id=${photo.id}`} as={`/images/${photo.id}`}>
      <a key={photo.id} className="relative block mx-2 mb-4">
        <span className="sr-only">
          Click this to open {photo.sponsorship ? photo.sponsorship.tagline : photo.id} photo
        </span>
        <div
          className={clsx('relative bg-gray-100 rounded-lg')}
          style={{ paddingBottom: `${(photo.height / photo.width) * 100}%`, backgroundColor: photo.color }}>
          <Picture photo={photo} />
        </div>
      </a>
    </Link>
  );
};

export const Picture: FunctionComponent<{ photo: Photo; className?: string; photoType?: PHOTO_TYPES }> = ({
  photo,
  photoType = PHOTO_TYPES.small,
  className = 'absolute top-0 left-0 rounded-lg',
}) => {
  const jpegUrl = photo.urls[photoType];
  const webpImageUrl = new URL(jpegUrl);
  webpImageUrl.searchParams.set('fm', 'webp');
  return (
    <picture className={clsx('w-full', className)}>
      <source srcSet={webpImageUrl.href} type="image/webp" />
      <img
        alt={photo.sponsorship ? photo.sponsorship.tagline : photo.id}
        loading="lazy"
        className={clsx('w-full', className)}
        src={jpegUrl}
      />
    </picture>
  );
};
