import React, { FunctionComponent } from 'react';
import { Photo } from '../../services/unsplash/types';

export const Image: FunctionComponent<{ photo: Photo; index: number }> = ({ photo, index }) => {
  const webpImageUrl = new URL(photo.urls.regular);
  webpImageUrl.searchParams.set('fm', 'webp');
  return (
    <div key={photo.id} className="relative mx-2 mb-4">
      <div
        className="relative bg-gray-100 rounded-lg"
        style={{ paddingBottom: `${(photo.height / photo.width) * 100}%`, backgroundColor: photo.color }}>
        <picture>
          <source srcSet={webpImageUrl.href} type="image/webp" />
          <img loading="lazy" className="absolute top-0 left-0 w-full rounded-lg" src={photo.urls.regular} />
        </picture>
      </div>
    </div>
  );
};
