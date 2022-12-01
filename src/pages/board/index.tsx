import { useRouter } from 'next/router';
import { useEffect } from 'react';

const DefaultBoardPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/');
  }, []);
  return <></>;
};

export default DefaultBoardPage;
