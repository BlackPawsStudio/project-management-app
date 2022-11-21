import { NextPage } from 'next';

import ContentField from '../components/ContentField';
import PageTitle from '../components/PageTitle';
import SearchBar from '../components/SearchBar';

const Home: NextPage = () => {
  return (
    <>
      <PageTitle>Page title</PageTitle>
      <SearchBar text={'Search boards:'} onSubmit={(str) => {}} />
      <ContentField className=""><></></ContentField>
    </>
  );
};

export default Home;
