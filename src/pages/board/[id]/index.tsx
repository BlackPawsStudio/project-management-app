import { useRouter } from 'next/router';
import { useEffect } from 'react';

import Loader from '../../../components/Loader';
import PageBase from '../../../components/PageBase';
import { useGetBoardByIdQuery } from '../../../utils/hooks/reactQueries';
import { ColumnType } from '../../../utils/types';

const arr = [
  {
    _id: '',
    title: 'Column title'
  }
];

const BoardPage = () => {
  const router = useRouter();

  const { data, isLoading, isError } = useGetBoardByIdQuery(
    typeof router.query.id === 'string' ? router.query.id : undefined
  );

  useEffect(() => {
    if (isError) {
      router.push('/404');
    }
  }, [isError]);

  return (
    <>
      {isLoading || isError ? (
        <div className="flex h-full w-full items-center justify-center">
          <Loader size={'w-[25vw] h-[25vw]'} />
        </div>
      ) : (
        <PageBase title={data.title}>
          <>{data.users}</>
        </PageBase>
      )}
    </>
  );
};

export default BoardPage;
