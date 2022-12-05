import { useRouter } from 'next/router';
import { useState } from 'react';
import '../../utils/i18next';
import { useTranslation } from 'react-i18next';
import ModalSure from '../ModalSure';
import { useDeleteBoardMutation } from '../../utils/hooks/reactDeleteQueries';
import ModalAddUser from '../ModalAddUser';

const DropdownMenu = () => {
  const [isDown, setIsDown] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();
  const deleteBoardMutation = useDeleteBoardMutation();

  const deleteBoard = async () => {
    const id = router.query.id;
    await deleteBoardMutation.mutateAsync(id as string);
    router.push('/user');
  };

  return (
    <aside
      className={`absolute ${!isDown && 'translate-y-[calc(-100%+100px)]'} top-0 left-0 hidden duration-[1s] lg:block`}
    >
      <div
        className={`z-[2] w-[25vw] rounded-[0_0_50px_0] bg-headerText py-[10vh] duration-[0.5s] ${
          isDown && 'shadow-[0_0_15px_25px_#00000043]'
        }`}
      >
        <ul className="flex h-full w-full flex-col items-center justify-center gap-10 px-4 text-center text-3xl text-white">
          <ModalAddUser text={t('add_user_text')}>
            <li className="button">{t('add_user')}</li>
          </ModalAddUser>
          <ModalSure text={t('sure_board')} onSubmit={deleteBoard}>
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
