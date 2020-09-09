import React from 'react';

import { PhotoDetails } from '../../components/photos/image-details';
import { BackHomeHeader } from '../../components/headers/back-home';

const ImageDetails = () => {
  return (
    <>
      <BackHomeHeader />
      <PhotoDetails />
    </>
  );
};

export default ImageDetails;
