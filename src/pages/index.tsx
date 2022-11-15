import { type NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Next Board</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="flex h-screen w-screen items-center justify-center text-lg font-bold">
        You are now on the main page
      </h1>
    </>
  );
};

export default Home;
