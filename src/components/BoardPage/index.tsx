import { useState, useEffect } from 'react';
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
  
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);
  if (!loaded) {
    return null;
  }
  
  return (
    <>
      {isColumnsLoading ? (
        <div className="flex h-full max-w-full items-center justify-center">
          <Loader size={'w-[15vw] h-[15vw]'} />
        </div>
      ) : data.length > 0 ? (
        <div className="w-[calc(100% - 100px)] mx-[50px] h-full overflow-auto">
          <div className="flex h-full w-fit items-center gap-[40px] py-[22px]">
            {data.map((el, id) => (
              <Column propData={el} key={id} />
            ))}
          </div>
        </div>
      ) : (
        <p className="flex h-full w-full items-center justify-center text-[36px] font-bold">{t('no_columns')}</p>
      )}
    </>
  );
};

export default BoardPageComponent;
