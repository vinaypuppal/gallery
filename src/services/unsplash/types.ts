export type Photo = {
  id: string;
  width: number;
  height: number;
  color: string;
  user: { bio: string | null };
  alt_description: string | null;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  description: string | null;
  likes: number;
  views: number;
  downloads: number;
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

export type AutoCompleteResult = {
  fuzzy: {
    query: string;
  }[];
};

export type SearchResults = {
  results: Photo[];
};
