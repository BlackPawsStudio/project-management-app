import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import BoardPageComponent from '../../../components/BoardPage';

import Loader from '../../../components/Loader';
import PageBase from '../../../components/PageBase';
import { useGetBoardByIdQuery, useGetBoardColumnsQuery } from '../../../utils/hooks/reactGetQueries';

import { useTranslation } from 'react-i18next';
import '../../../utils/i18next';

const BoardPage = () => {
  const router = useRouter();

  const { t } = useTranslation();

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
          text={t('search_issues')}
          className={'mx-auto w-[95vw] overflow-hidden'}
          onSubmit={() => {}}
        >
          {columnsData && <BoardPageComponent data={columnsData} isColumnsLoading={isColumnsLoading} />}
        </PageBase>
      )}
    </>
  );
};

export default BoardPage;
