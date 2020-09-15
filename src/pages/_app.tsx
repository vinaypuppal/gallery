import React from 'react';
import { DefaultSeo } from 'next-seo';
import Head from 'next/head';

import '../styles/index.css';
import '@reach/combobox/styles.css';
import '@snackbar/core/dist/snackbar.min.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo title="Infinite Gallery" description="Infinite Gallery using unsplash image API" />
      <Head>
        <link rel="manifest" href="/manifest.json"></link>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
