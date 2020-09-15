import { Photo, PHOTO_TYPES } from '../../services/unsplash/types';

export function getPhotoUrl(photo: Photo, photoType: PHOTO_TYPES) {
  const jpegUrl = photo.urls[photoType];
  const webpImageUrl = new URL(jpegUrl);
  webpImageUrl.searchParams.set('fm', 'webp');
  return {
    jpegUrl,
    webpUrl: webpImageUrl.href,
  };
}

export function getPhotoDetails(photo: Photo) {
  const { description, sponsorship, created_at, alt_description, user, likes = 0, views = 0, downloads = 0 } = photo;

  const title =
    alt_description ||
    (sponsorship && sponsorship.tagline ? sponsorship.tagline : new Date(created_at).toLocaleString());
  const detailedDescription = user.bio || description;

  return {
    title,
    description: detailedDescription,
    likes,
    downloads,
    views,
  };
}
