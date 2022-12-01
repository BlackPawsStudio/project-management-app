import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Loader from '../../components/Loader';
import PageBase from '../../components/PageBase';
import UserPageComponent from '../../components/UserPage';
import { useGetUserByIdQuery, useGetBoardsSetByUserIdQuery } from '../../utils/hooks/reactGetQueries';

const UserPage = () => {
  const router = useRouter();

  const [userId, setUserId] = useState(localStorage.getItem('nextBoardUserId') || '');

  useEffect(() => {
    if (!userId) {
      router.push('/404');
    }
  }, []);

  const { data, isLoading, isError } = useGetUserByIdQuery(userId as string);

  const {
    data: boardsSetData,
    isLoading: isBoardsSetLoading,
    isError: isBoardsSetError
  } = useGetBoardsSetByUserIdQuery(userId as string);

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
          text={'Search boards:'}
          className={'lg:mx-auto lg:w-[95vw] overflow-hidden'}
          onSubmit={() => {}}
        >
          {boardsSetData && <UserPageComponent boardsSetData={boardsSetData} isBoardsSetLoading={isBoardsSetLoading} />}
        </PageBase>
      )}
    </>
  );
};

export default UserPage;
