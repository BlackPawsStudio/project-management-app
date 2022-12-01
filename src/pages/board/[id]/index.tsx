import { useRouter } from 'next/router';
import { useEffect } from 'react';
import BoardPageComponent from '../../../components/BoardPage';

import Loader from '../../../components/Loader';
import PageBase from '../../../components/PageBase';
import { useGetBoardByIdQuery, useGetBoardColumnsQuery } from '../../../utils/hooks/reactGetQueries';

const BoardPage = () => {
  const router = useRouter();

  const { data, isLoading, isError } = useGetBoardByIdQuery(
    typeof router.query.id === 'string' ? router.query.id : undefined
  );

  const {
    data: columnsData,
    isLoading: isColumnsLoading,
    isError: isColumnsError
  } = useGetBoardColumnsQuery(typeof router.query.id === 'string' ? router.query.id : undefined);

  useEffect(() => {
    if (isError || isColumnsError) {
      router.push('/404');
    }
  }, [isError, isColumnsError]);

  return (
    <>
      {isLoading || isError || isColumnsError ? (
        <div className="flex h-full w-full items-center justify-center">
          <Loader size={'w-[25vw] h-[25vw]'} />
        </div>
      ) : (
        <PageBase
          title={data.title}
          text={'Search issues: '}
          className={'overflow-hidden lg:mx-auto lg:w-[95vw]'}
          onSubmit={() => {}}
        >
          {columnsData && <BoardPageComponent data={columnsData} isColumnsLoading={isColumnsLoading} />}
        </PageBase>
      )}
    </>
  );
};

export default BoardPage;
