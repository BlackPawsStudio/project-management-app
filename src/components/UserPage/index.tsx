import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { BoardType } from '../../utils/types';
import BoardCard from '../BoardCard';
import Loader from '../Loader';

interface UserPageProps {
  boardsSetData: BoardType[];
  isBoardsSetLoading: boolean;
}

const UserPageComponent = ({ boardsSetData, isBoardsSetLoading }: UserPageProps) => {
  console.log(boardsSetData);

  return (
    <>
      <h3 className="text-center text-[42px] font-bold text-primaryText lg:mb-[24px]">My boards</h3>
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
          This user has no boards
        </p>
      )}
    </>
  );
};

export default UserPageComponent;
