import { NextPage } from 'next';

import PageBase from '../components/PageBase';

const Home: NextPage = () => {
  return (
    <PageBase title={'Page title'} onSubmit={(str) => {}}>
      <></>
    </PageBase>
  );
};

export default Home;
