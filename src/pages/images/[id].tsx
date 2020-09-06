import React from 'react';
import { useRouter } from 'next/router';

import { MainHeader } from '../../components/headers/main';
import { SearchInput } from '../../components/search';

const ImageDetails = () => {
  const { query } = useRouter();
  return (
    <>
      <MainHeader />
    </>
  );
};

export default ImageDetails;
