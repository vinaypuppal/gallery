import React from 'react';
import { DefaultSeo } from 'next-seo';

import '../styles/index.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo title="Infinite Gallery" description="Infinite Gallery using unsplash image API" />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
