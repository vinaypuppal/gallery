import React, { FunctionComponent } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { Photo, PHOTO_TYPES } from '../../services/unsplash/types';
import clsx from 'clsx';

export const Image: FunctionComponent<{ photo: Photo }> = ({ photo }) => {
  const router = useRouter();
  const { search } = router.query;
  return (
    <Link
      key={photo.id}
      shallow
      scroll={false}
      href={search ? `${router.pathname}?id=${photo.id}&search=${search}` : `${router.pathname}?id=${photo.id}`}
      as={search ? `/images/${photo.id}?search=${search}` : `/images/${photo.id}`}>
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
  className = 'absolute top-0 left-0 sm:rounded-lg',
}) => {
  const { jpegUrl, webpUrl } = getPhotoUrl(photo, photoType);
  return (
    <picture className={clsx('w-full', className)}>
      <source srcSet={webpUrl} type="image/webp" />
      <img alt={photo.alt_description || photo.id} loading="lazy" className={clsx('w-full', className)} src={jpegUrl} />
    </picture>
  );
};

export function getPhotoUrl(photo: Photo, photoType: PHOTO_TYPES) {
  const jpegUrl = photo.urls[photoType];
  const webpImageUrl = new URL(jpegUrl);
  webpImageUrl.searchParams.set('fm', 'webp');
  return {
    jpegUrl,
    webpUrl: webpImageUrl.href,
  };
}
