import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useCreateBoardMutation } from '../../utils/hooks/reactPostQueries';
import { BoardType } from '../../utils/types';
import BoardCard from '../BoardCard';
import Loader from '../Loader';

interface UserPageProps {
  boardsSetData: BoardType[];
  isBoardsSetLoading: boolean;
}

const UserPageComponent = ({ boardsSetData, isBoardsSetLoading }: UserPageProps) => {
  const [userId, setUserId] = useState('');
  const createBoard = useCreateBoardMutation()
  const router = useRouter();

  useEffect(() => {
    const data = localStorage.getItem('nextBoardUserId');
    if (data) {
      setUserId(data);
    } else {
      router.push('/404');
    }
  },[])

  return (
    <>
      <h3 className="my-[24px] text-center text-[42px] font-bold text-primaryText">My boards</h3>
      {isBoardsSetLoading ? (
        <div className="flex h-full max-w-full items-center justify-center">
          <Loader size={'w-[15vw] h-[15vw]'} />
        </div>
      ) : boardsSetData.length > 0 ? (
        <div className="flex w-[calc(100% - 100px)] mx-[50px] h-[75%] overflow-auto">
          {boardsSetData.map((board, i) => (
            <BoardCard boardData={board} key={i} />
          ))}
          <button
              onClick={() => createBoard.mutateAsync(userId)}>add board</button>
        </div>
      ) : (
        <p className="flex h-1/2 w-full items-center justify-center text-[36px] font-bold">This user has no boards</p>
      )}
    </>
  );
};

export default UserPageComponent;
