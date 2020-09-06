import React, { FunctionComponent } from 'react';
import { useSWRInfinite } from 'swr';

import { unsplash, toJson } from '../services/unsplash';
import { Photo } from '../services/unsplash/types';
import { config } from '../config';
import { Image } from './image';

export const PhotoGrid: FunctionComponent = () => {};
