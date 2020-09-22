import React from 'react';
import { useAnalytics } from '@happykit/analytics';
import { DefaultSeo } from 'next-seo';
import Head from 'next/head';

import '../styles/index.css';
import '@reach/combobox/styles.css';
import '@snackbar/core/dist/snackbar.min.css';

function MyApp({ Component, pageProps }) {
  useAnalytics({
    publicKey: 'analytics_pub_e3ac1fb78a',

    // skipHostnames usually defaults to ["localhost"], but
    // it seems as if you haven't deployed your project yet.
    // So we enable tracking page views on localhost.
    // This way you can see what HappyKit is like.
    //
    // Delete this setting once you've deployed your app.
    skipHostnames: [],
  });
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
