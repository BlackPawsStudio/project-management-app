import { NextPage } from 'next';

import PageBase from '../components/PageBase';

const Home: NextPage = () => {
  return (
    <PageBase title={'Page title'} onSubmit={(str) => {}}>
      <h1>aaa</h1>
    </PageBase>
  );
};

export default Home;
