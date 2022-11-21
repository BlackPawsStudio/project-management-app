import { NextPage } from 'next';

import ContentField from '../components/ContentField';
import PageTitle from '../components/PageTitle';
import SearchBar from '../components/SearchBar';
import Welcome from '../components/Welcome';

const Home: NextPage = () => {
  return (
    <>
      <PageTitle>Welcome!</PageTitle>
      <SearchBar text={'Search boards:'} onSubmit={(str) => {}} />
      <ContentField className=""><Welcome/></ContentField>
    </>
  );
};

export default Home;
