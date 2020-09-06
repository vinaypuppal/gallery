import React from 'react';

import { MainHeader } from '../components/headers/main';
import { SearchInput } from '../components/search';
import { PhotoGrid } from '../components/photos/grid';

const Home = () => {
  return (
    <>
      <MainHeader />
      <SearchInput />
      <PhotoGrid />
    </>
  );
};

export default Home;
