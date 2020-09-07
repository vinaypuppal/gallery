import React from 'react';
import { DefaultSeo } from 'next-seo';
import Head from 'next/head';

import '../styles/index.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <html lang="en" />
      </Head>
      <DefaultSeo title="Infinite Gallery" description="Infinite Gallery using unsplash image API" />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
