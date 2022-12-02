import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useCreateBoardMutation } from '../../utils/hooks/reactPostQueries';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { BoardType } from '../../utils/types';
import BoardCard from '../BoardCard';
import Loader from '../Loader';
import { useTranslation } from 'react-i18next';
import '../../utils/i18next';

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

    const { t } = useTranslation();

  return (
    <>
      <h3 className="text-center text-[42px] font-bold text-primaryText lg:mb-[24px]">{t('my_boards')}</h3>
      {isBoardsSetLoading ? (
        <div className="flex h-full max-w-full items-center justify-center">
          <Loader size={'w-[15vw] h-[15vw]'} />
        </div>
      ) : boardsSetData.length > 0 ? (
        <>
          <div className="w-[calc(100% - 100px)] mx-[50px] hidden h-[75%] overflow-auto lg:flex">
            {boardsSetData.map((board, id) => (
              <BoardCard boardData={board} key={id} />
            ))}
            <button
              onClick={() => createBoard.mutateAsync(userId)}
            >
              add board
            </button>
          </div>

          <div className="top-0 left-0 p-[15px] lg:hidden">
            <Swiper spaceBetween={30} slidesPerView={1}>
              {boardsSetData.map((board, id) => (
                <SwiperSlide key={id}>
                  <BoardCard boardData={board} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      ) : (
        <p className="lg:px-0 flex h-1/2 w-full items-center px-5 text-[36px] font-bold">
          {t('no_boards')}
        </p>
      )}
    </>
  );
};

export default UserPageComponent;
