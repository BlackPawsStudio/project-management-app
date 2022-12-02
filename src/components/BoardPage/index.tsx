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
  columnsRefetch: () => void
}

const BoardPageComponent = ({ data, isColumnsLoading, columnsRefetch }: BoardPageProps) => {
  console.log(data);

const { t } = useTranslation();

  const addColumn = useCreateColumnMutation()
  const router = useRouter()

  const createColumn = async () => {
    await addColumn.mutateAsync({ id: router.query.id, BoardData: { title: 'new column', order: 0 } })
    columnsRefetch()
  }

  return (
    <>
      {isColumnsLoading ? (
        <div className="flex h-full max-w-full items-center justify-center">
          <Loader size={'w-[15vw] h-[15vw]'} />
        </div>
      ) : data.length > 0 ? (
        <div className="w-[calc(100% - 100px)] mx-[50px] hidden h-full overflow-auto lg:block">
          <div className="flex h-full w-fit items-center gap-[40px] py-[22px]">
            {data.map((el, id) => (
              <Column columnsRefetch={columnsRefetch} propData={el} key={id} />
            ))}
            <button className='flex items-center justify-center h-full min-w-[300px] bg-boardCard rounded-3xl shadow-xxlInner' onClick={createColumn}>
              <Image src={crossAdd} alt="add button" width={75} className="button" />
            </button>
          </div>

          <div className="top-0 left-0 p-[15px] lg:hidden">
            <Swiper wrapperTag="div" className="w-full" spaceBetween={30} slidesPerView={1}>
              {data.map((el, id) => (
                <SwiperSlide key={id}>
                  <Column propData={el} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      ) : (
            <div className=' flex w-[calc(100% - 100px)] mx-[50px] h-full'>
          <button className='flex items-center justify-center h-full min-w-[300px] bg-boardCard rounded-3xl shadow-xxlInner' onClick={createColumn}>
            <Image src={crossAdd} alt="add button" width={75} className="button" />
          </button>
          <p className="flex h-full w-full items-center px-5 text-[36px] font-bold lg:px-0">{t('no_columns')}</p>
        </div>
      )}
    </>
  );
};

export default BoardPageComponent;
