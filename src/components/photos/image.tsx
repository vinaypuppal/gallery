import React, { FunctionComponent } from 'react';
import Link from 'next/link';

import { Photo } from '../../services/unsplash/types';
import clsx from 'clsx';

export const Image: FunctionComponent<{ photo: Photo; index: number }> = ({ photo, index }) => {
  return (
    <Link key={photo.id} shallow href={`/?id=${photo.id}`} as={`/images/${photo.id}`}>
      <a key={photo.id} className="relative block mx-2 mb-4">
        <div
          className={clsx('relative bg-gray-100 rounded-lg')}
          style={{ paddingBottom: `${(photo.height / photo.width) * 100}%`, backgroundColor: photo.color }}>
          <Picture photo={photo} />
        </div>
      </a>
    </Link>
  );
};

export const Picture: FunctionComponent<{ photo: Photo; className?: string }> = ({
  photo,
  className = 'absolute top-0 left-0 rounded-lg',
}) => {
  const jpegUrl = photo.urls.regular;
  const webpImageUrl = new URL(jpegUrl);
  webpImageUrl.searchParams.set('fm', 'webp');
  return (
    <picture className={clsx('w-full', className)}>
      <source srcSet={webpImageUrl.href} type="image/webp" />
      <img loading="lazy" className={clsx('w-full', className)} src={jpegUrl} />
    </picture>
  );
};
