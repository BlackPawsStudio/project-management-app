import { NextPage } from 'next';
import { useTranslation } from 'react-i18next';
import '../utils/i18next';

import PageBase from '../components/PageBase';

const Home: NextPage = () => {
  const { t } = useTranslation();
  return (
    <PageBase title={t('welcome_title') as string} onSubmit={(str) => {}}>
      <></>
    </PageBase>
  );
};

export default Home;
