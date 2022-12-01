import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { cleanLocalStorage } from '../../utils';
import { useDeleteUserMutation } from '../../utils/hooks/reactDeleteQueries';
import LangSwitch from '../Switch';
import Button from '../Button';
import DropdownMenu from '../DropdownMenu';
import LogInModal from '../LogInModal';
import ModalSure from '../ModalSure';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const router = useRouter();
  const isAdmin = true;

  const mutation = useDeleteUserMutation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('nextBoardUserId'));
  }, []);

  const signOut = () => {
    setIsLoggedIn(false);
    cleanLocalStorage();
    router.push('/');
  };

  const deleteAccount = async () => {
    await mutation.mutateAsync(localStorage.getItem('nextBoardUserId') as string);
    setIsLoggedIn(false);
    cleanLocalStorage();
    router.push('/');
  };

  const { t } = useTranslation();

  return (
    <header className="fixed top-0 z-10 flex h-[10vh] w-screen items-center justify-center bg-header p-[0_45px]">
      {router.pathname.includes('/board/') && isAdmin && <DropdownMenu />}
      <Link href={'/'}>
        <h1 className="w-100 cursor-pointer text-[40px] font-bold italic text-headerText">NEXT BOARD</h1>
      </Link>
      <div className="absolute right-[45px] flex items-center gap-[40px]">
        {isLoggedIn ? (
          <>
            <LangSwitch />
            {router.pathname.includes('user') ? (
              <ModalSure text={t('sure_delete_account')} onSubmit={deleteAccount}>
                <Button>{t('delete_account')}</Button>
              </ModalSure>
            ) : (
              <Link href="/user">
                <Button>{t('to_user_page')}</Button>
              </Link>
            )}
            <ModalSure text={t('sure_log_out')} onSubmit={signOut}>
              <Button>{t('log_out')}</Button>
            </ModalSure>
          </>
        ) : (
          <>
            <LangSwitch />
            <LogInModal />
            <LogInModal isLogin />
          </>
        )}

        {/* <ModalSure text={'Are you sure you want to delete board'} onSubmit={() => {}}>
          <Button>ModalSure</Button>
        </ModalSure>
        <ModalAttention text={'Attention! You will be redirected to homepage.'} onSubmit={() => {}}>
          <Button>ModalAttention</Button>
        </ModalAttention> */}
      </div>
    </header>
  );
};

export default Header;
