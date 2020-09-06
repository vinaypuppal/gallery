export type Photo = {
  id: string;
  width: number;
  height: number;
  color: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  description: string | null;
  likes: number;
  created_at: string;
  categories: string[];
  links: {
    download: string;
  };
  sponsorship: {
    sponsor: {
      name: string;
      bio: string;
    };
    tagline: string;
  };
};

export enum PHOTO_TYPES {
  regular = 'regular',
  small = 'small',
}
