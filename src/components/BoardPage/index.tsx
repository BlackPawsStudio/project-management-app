import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCreateColumnMutation } from '../../utils/hooks/reactPostQueries';
import { ColumnType } from '../../utils/types';
import Column from '../Column';
import Loader from '../Loader';
import crossAdd from '/public/assets/component-images/crossAdd.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useTranslation } from 'react-i18next';
import '../../utils/i18next';

interface BoardPageProps {
  data: ColumnType[];
  isColumnsLoading: boolean;
  columnsRefetch: () => void;
}

const BoardPageComponent = ({ data, isColumnsLoading, columnsRefetch }: BoardPageProps) => {
  const { t } = useTranslation();

  const addColumn = useCreateColumnMutation();
  const router = useRouter();

  const createColumn = async () => {
    await addColumn.mutateAsync({ id: router.query.id, BoardData: { title: 'new column', order: 0 } });
    columnsRefetch();
  };

  return (
    <>
      {isColumnsLoading ? (
        <div className="flex h-full max-w-full items-center justify-center">
          <Loader size={'w-[15vw] h-[15vw]'} />
        </div>
      ) : data.length > 0 ? (
        <>
          <div className="w-[calc(100% - 100px)] mx-[50px] hidden h-full overflow-auto lg:block">
            <div className="flex h-full w-fit items-center gap-[40px] py-[22px]">
              {data.map((el, id) => (
                <Column columnsRefetch={columnsRefetch} propData={el} key={id} />
              ))}
              <button
                className="flex h-[500px] w-[90%] items-center justify-center gap-1 rounded-3xl bg-boardCard py-3 shadow-xxlInner lg:h-full lg:min-w-[300px]"
                onClick={createColumn}
              >
                <Image src={crossAdd} alt="add button" width={75} className="button" />
              </button>
            </div>
          </div>

          <div className="top-0 left-0 p-[15px] lg:hidden">
            <Swiper wrapperTag="div" className="w-full" spaceBetween={30} slidesPerView={1}>
              {data.map((el, id) => (
                <SwiperSlide key={id}>
                  <Column columnsRefetch={columnsRefetch} propData={el} />
                </SwiperSlide>
              ))}
              <SwiperSlide>
                <button
                  className="flex h-[500px] w-full items-center justify-center gap-1 rounded-3xl bg-boardCard py-3 shadow-xxlInner lg:h-full lg:min-w-[300px]"
                  onClick={createColumn}
                >
                  <Image src={crossAdd} alt="add button" width={75} className="button" />
                </button>
              </SwiperSlide>
            </Swiper>
          </div>
        </>
      ) : (
        <div className=" w-[calc(100% - 100px)] mx-[50px] flex h-full">
          <button
            className="flex w-full items-center justify-center gap-1 rounded-3xl bg-boardCard lg:my-[22px] shadow-xxlInner mx-auto h-[calc(100% + 144px)] lg:w-[300px]"
            onClick={createColumn}
          >
            <Image src={crossAdd} alt="add button" width={75} className="button" />
          </button>
        </div>
      )}
    </>
  );
};

export default BoardPageComponent;
