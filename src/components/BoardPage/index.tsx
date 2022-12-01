import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { ColumnType } from '../../utils/types';
import Column from '../Column';
import Loader from '../Loader';
import { useTranslation } from 'react-i18next';
import '../../utils/i18next';

interface BoardPageProps {
  data: ColumnType[];
  isColumnsLoading: boolean;
}

const BoardPageComponent = ({ data, isColumnsLoading }: BoardPageProps) => {
  const { t } = useTranslation();

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
                <Column propData={el} key={id} />
              ))}
            </div>
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
        <p className="flex h-full w-full items-center px-5 text-[36px] font-bold lg:px-0">{t('no_columns')}</p>
      )}
    </>
  );
};

export default BoardPageComponent;
