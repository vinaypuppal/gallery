import Unsplash from 'unsplash-js';
import fetch from 'isomorphic-unfetch';

import { config } from '../../config';

export const unsplash = new Unsplash({ accessKey: config.unsplashAccessKey });
export { toJson } from 'unsplash-js';

async function fetcher(input: RequestInfo, init?: RequestInit) {
  const res = await fetch(input, init);
  return res.json();
}

export async function unsplashAutoComplete(keyword: string) {
  if (!keyword) {
    return { fuzzy: [] };
  }
  const res = await fetch(`https://cors.vinay.workers.dev/https://unsplash.com/nautocomplete/${keyword}`, {
    method: 'GET',
  });
  return res.json();
}
