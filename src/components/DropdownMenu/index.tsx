import { useRouter } from 'next/router';
import { useState } from 'react';
import { useCreateColumnMutation } from '../../utils/hooks/reactPostQueries';
import '../../utils/i18next';
import { useTranslation } from 'react-i18next';
import ModalSure from '../ModalSure';
import { useDeleteBoardMutation } from '../../utils/hooks/reactDeleteQueries';

const DropdownMenu = () => {
  const [isDown, setIsDown] = useState(false);
  const addColumn = useCreateColumnMutation();
  const router = useRouter();
  const { t } = useTranslation();
  const deleteBoardMutation = useDeleteBoardMutation();

  const deleteBoard = async () => {
    const id = router.query.id;
    await deleteBoardMutation.mutateAsync(id as string);
    router.push('/user');
  };

  return (
    <aside className={`absolute ${isDown ? 'top-0' : 'top-[-80vh]'} left-0 hidden duration-[1s] lg:block`}>
      <div
        className={`z-[2] h-[80vh] w-[25vw] rounded-[0_0_50px_0] bg-headerText duration-[0.5s] ${
          isDown && 'shadow-[0_0_15px_25px_#00000043]'
        }`}
      >
        <ul className="flex h-full w-full flex-col items-center justify-center gap-10 text-3xl text-white">
          <li className="button">{t('rename_board')}</li>
          <li
            onClick={() => addColumn.mutateAsync({ id: router.query.id, BoardData: { title: 'ff', order: 6 } })}
            className="button"
          >
            {t('add_table')}
          </li>
          <ModalSure text="Are you sure you want to delete board?" onSubmit={deleteBoard}>
            <li className="button">{t('delete_board')}</li>
          </ModalSure>
        </ul>
      </div>
      <div
        className="button z-1 ml-6 h-[10px] w-[10px] border-[30px] border-t-[70px] border-headerText border-b-transparent"
        onClick={() => setIsDown(!isDown)}
      />
    </aside>
  );
};

export default DropdownMenu;
