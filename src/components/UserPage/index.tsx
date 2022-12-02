import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useCreateBoardMutation } from '../../utils/hooks/reactPostQueries';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { BoardType } from '../../utils/types';
import BoardCard from '../BoardCard';
import { useTranslation } from 'react-i18next';
import '../../utils/i18next';
import crossAdd from '/public/assets/component-images/crossAdd.svg';
import Image from 'next/image';

interface UserPageProps {
  boardsSetData: BoardType[];
  refetch: () => void;
}

const UserPageComponent = ({ refetch, boardsSetData }: UserPageProps) => {
  const [userId, setUserId] = useState('');
  const createBoard = useCreateBoardMutation();
  const router = useRouter();

  useEffect(() => {
    const data = localStorage.getItem('nextBoardUserId');
    if (data) {
      setUserId(data);
    } else {
      router.push('/404');
    }
  }, []);

  const { t } = useTranslation();

  const createBoardFunc = async () => {
    await createBoard.mutateAsync(userId);
    refetch();
  };

  return (
    <>
      <h3 className="text-center text-[42px] font-bold text-primaryText lg:mb-[24px]">{t('my_boards')}</h3>
      {boardsSetData.length > 0 ? (
        <>
          <div className="w-[calc(100% - 100px)] mx-[50px] hidden h-[75%] overflow-auto lg:flex">
            {boardsSetData.map((board, id) => (
              <BoardCard boardData={board} key={id} />
            ))}
            <button
              className="button m-2 flex h-[400px] w-[95%] shrink-0 cursor-pointer items-center justify-center rounded-[30px] bg-boardCard py-4 shadow-xxlInner lg:h-[95%] lg:w-[200px]"
              onClick={createBoardFunc}
            >
              <Image src={crossAdd} alt="add button" width={75} />
            </button>
          </div>

          <div className="top-0 left-0 p-[15px] lg:hidden">
            <Swiper spaceBetween={30} slidesPerView={1}>
              {boardsSetData.map((board, id) => (
                <SwiperSlide key={id}>
                  <BoardCard boardData={board} />
                </SwiperSlide>
              ))}
              <SwiperSlide>
                <button
                  className="button m-2 flex h-[400px] w-[95%] shrink-0 cursor-pointer items-center justify-center rounded-[30px] bg-boardCard py-4 shadow-xxlInner lg:h-[95%] lg:w-[200px]"
                  onClick={createBoardFunc}
                >
                  <Image src={crossAdd} alt="add button" width={75} />
                </button>
              </SwiperSlide>
            </Swiper>
          </div>
        </>
      ) : (
        <button
          className="mx-auto flex h-[75%] w-full items-center justify-center gap-1 rounded-3xl bg-boardCard shadow-xxlInner lg:my-[22px] lg:w-[300px]"
          onClick={createBoardFunc}
        >
          <Image src={crossAdd} alt="add button" width={75} className="button" />
        </button>
      )}
    </>
  );
};

export default UserPageComponent;
