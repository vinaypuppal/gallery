import Unsplash from 'unsplash-js';
import { config } from '../../config';

export const unsplash = new Unsplash({ accessKey: config.unsplashAccessKey });
export { toJson } from 'unsplash-js';
