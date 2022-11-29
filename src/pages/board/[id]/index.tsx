import { useRouter } from 'next/router';
import { useEffect } from 'react';
import BoardPageComponent from '../../../components/BoardPage';

import Loader from '../../../components/Loader';
import PageBase from '../../../components/PageBase';
import { useStore } from '../../../store/store';
import { useGetBoardByIdQuery, useGetBoardColumnsQuery } from '../../../utils/hooks/reactGetQueries';

const BoardPage = () => {
  const router = useRouter();
  const column = useStore((state) => state.column)
  const setColumn = useStore((state) => state.setColumn)

  const { data, isLoading, isError } = useGetBoardByIdQuery(
    typeof router.query.id === 'string' ? router.query.id : undefined
  );


  const {
    data: columnsData,
    isLoading: isColumnsLoading,
    isError: isColumnsError,
    refetch: columnsRefetch
  } = useGetBoardColumnsQuery(typeof router.query.id === 'string' ? router.query.id : undefined);


  useEffect(() => {
    if (columnsData) setColumn(columnsData)
  }, [columnsData])


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
          className={'mx-auto w-[95vw] overflow-hidden'}
          onSubmit={() => { }}
        >
            {columnsData && <BoardPageComponent columnsRefetch={columnsRefetch} data={column} isColumnsLoading={isColumnsLoading} />}
        </PageBase>
      )}
    </>
  );
};

export default BoardPage;
