import { useRouter } from 'next/router';
import { useEffect } from 'react';
import BoardPageComponent from '../../../components/BoardPage';

import Loader from '../../../components/Loader';
import PageBase from '../../../components/PageBase';
import { useGetBoardByIdQuery, useGetBoardColumnsQuery } from '../../../utils/hooks/reactGetQueries';

import { useTranslation } from 'react-i18next';
import '../../../utils/i18next';
import { useStore } from '../../../store/store';

const BoardPage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const setcurrentBoard = useStore((state) => state.setcurrentBoard)
  const currentBoard = useStore((state) => state.currentBoard)

  const { data, isLoading, isError } = useGetBoardByIdQuery(
    typeof router.query.id === 'string' ? router.query.id : undefined
  );

  useEffect(() => {
    if (data) setcurrentBoard({
      boardId:data._id,
      title:data.title,
      owner: data.owner,
      users:data.users
    })
    console.log(data);

  }, [data])

  const {
    data: columnsData,
    isLoading: isColumnsLoading,
    isError: isColumnsError,
    refetch: columnsRefetch
  } = useGetBoardColumnsQuery(typeof router.query.id === 'string' ? router.query.id : undefined);
  // console.log(columnsData);

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
          data={data}
          title={data.title}
          text={t('search_issues') as string}
          className={'px-0 overflow-hidden lg:mx-auto lg:w-[95vw]'}
          onSubmit={() => {}}
        >
          {columnsData && (
            <BoardPageComponent
              columnsRefetch={columnsRefetch}
              data={columnsData}
              isColumnsLoading={isColumnsLoading}
            />
          )}
        </PageBase>
      )}
    </>
  );
};

export default BoardPage;
