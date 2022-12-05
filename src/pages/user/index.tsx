import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Loader from '../../components/Loader';
import PageBase from '../../components/PageBase';
import UserPageComponent from '../../components/UserPage';
import { useGetUserByIdQuery, useGetBoardsSetByUserIdQuery } from '../../utils/hooks/reactGetQueries';
import '../../utils/i18next';

const UserPage = () => {
  const router = useRouter();

  const [userId] = useState(localStorage.getItem('nextBoardUserId') || '');

  const { data, isLoading, isError } = useGetUserByIdQuery(userId as string);
  const { t } = useTranslation();

  const {
    data: boardsSetData,
    refetch: boardsRefetch,
    isError: isBoardsSetError
  } = useGetBoardsSetByUserIdQuery(userId as string);

  useEffect(() => {
    if (!userId) {
      router.push('/404');
    }
    boardsRefetch();
  }, []);

  useEffect(() => {
    if (isError || isBoardsSetError) {
      router.push('/404');
    }
  }, [isError, isBoardsSetError]);

  return (
    <>
      {isLoading || isError ? (
        <div className="flex h-full w-full items-center justify-center">
          <Loader size={'w-[25vw] h-[25vw]'} />
        </div>
      ) : (
        <PageBase
          title={data.name.toUpperCase()}
          text={t('search_boards') as string}
          className={'overflow-hidden lg:mx-auto lg:w-[95vw]'}
          onSubmit={() => {}}
          boardsRefetch={boardsRefetch}
        >
          {boardsSetData && <UserPageComponent refetch={() => boardsRefetch()} boardsSetData={boardsSetData} />}
        </PageBase>
      )}
    </>
  );
};

export default UserPage;
