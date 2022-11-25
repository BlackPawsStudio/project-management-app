import { useRouter } from 'next/router';
import { useEffect } from 'react';

import Loader from '../../components/Loader';
import PageBase from '../../components/PageBase';
import UserPageComponent from '../../components/UserPage';
import { useGetUserByIdQuery, useGetBoardsSetByUserIdQuery } from '../../utils/hooks/reactGetQueries';

// Hardcode!!!
// ==========================================
const userID = '6376c99d5b9c73811c1f9528';
// ==========================================

const UserPage = () => {
  const router = useRouter();

  const { data, isLoading, isError } = useGetUserByIdQuery(userID);

  const {
    data: boardsSetData,
    isLoading: isBoardsSetLoading,
    isError: isBoardsSetError
  } = useGetBoardsSetByUserIdQuery(userID);



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
          text={''}
          className={'mx-auto w-[95vw] overflow-hidden'}
          onSubmit={() => {}}
        >
          {boardsSetData && <UserPageComponent
            boardsSetData={boardsSetData}
            isBoardsSetLoading={isBoardsSetLoading}
          />}
        </PageBase>
      )}
    </>
  );
};

export default UserPage;
