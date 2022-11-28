import '../styles/globals.css';

import { AppType } from 'next/app';
import Head from 'next/head';
import { useState } from 'react';

import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import Layout from '../components/Layout';

import '../styles/globals.css';
interface CustomPageProps {
  dehydratedState: unknown;
}

const MyApp: AppType<CustomPageProps> = ({ Component, pageProps }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 20,
            retry() {
              return false;
            }
          }
        }
      })
  );
  
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        <Layout>
          <Head>
            <title>Next Board</title>
            <meta name="description" content="Generated by create-t3-app" />
            <link rel="icon" href="/favicon.ico" />
          </Head>{' '}
          <Component {...pageProps} />
        </Layout>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default MyApp;
