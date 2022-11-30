import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// import Loader from '../components/Loader';
import Button from '../components/Button';
import { useTranslation } from 'react-i18next';
import '../utils/i18next';

const NotFoundPage = () => {
  const router = useRouter();

  const { t } = useTranslation();

  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);
  if (!loaded) {
    return null;
  }

  return (
    <div className="flex h-full w-full items-center justify-center text-headerText">
      <div className="text-center">
        <h2 className="text-8xl font-bold italic">{t('oops')}</h2>
        <h4 className="mt-1 text-4xl font-bold italic">{t('404')}</h4>
        <p className="mx-auto mt-6 w-[430px] text-2xl italic">
        {t('page_looking_for')}
        </p>
        <Button className="mt-6 rounded-full px-6" onClick={() => router.push('/')}>
        {t('to_main_page')}
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
