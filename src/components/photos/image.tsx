import React, { FunctionComponent } from 'react';
import Link from 'next/link';

import { Photo } from '../../services/unsplash/types';

export const Image: FunctionComponent<{ photo: Photo; index: number }> = ({ photo, index }) => {
  const jpegUrl = photo.urls.small;
  const webpImageUrl = new URL(jpegUrl);
  webpImageUrl.searchParams.set('fm', 'webp');
  return (
    <Link key={photo.id} href="/images/[id]" as={`/images/${photo.id}`}>
      <a key={photo.id} className="relative block mx-2 mb-4">
        <div
          className="relative bg-gray-100 rounded-lg"
          style={{ paddingBottom: `${(photo.height / photo.width) * 100}%`, backgroundColor: photo.color }}>
          <picture>
            <source srcSet={webpImageUrl.href} type="image/webp" />
            <img loading="lazy" className="absolute top-0 left-0 w-full rounded-lg" src={jpegUrl} />
          </picture>
        </div>
      </a>
    </Link>
  );
};
