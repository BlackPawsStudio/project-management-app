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

  const { t } = useTranslation();

  return (
    <>
      <h3 className="mb-[24px] text-center text-[42px] font-bold text-primaryText">{t('my_boards')}</h3>
      {isBoardsSetLoading ? (
        <div className="flex h-full max-w-full items-center justify-center">
          <Loader size={'w-[15vw] h-[15vw]'} />
        </div>
      ) : boardsSetData.length > 0 ? (
        <div className="w-[calc(100% - 100px)] mx-[50px] h-[75%] overflow-auto">
          {boardsSetData.map((board, i) => (
            <BoardCard boardData={board} key={i} />
          ))}
        </div>
      ) : (
        <p className="flex h-1/2 w-full items-center justify-center text-[36px] font-bold">
          {t('no_boards')}
        </p>
      )}
    </>
  );
};

export default UserPageComponent;
