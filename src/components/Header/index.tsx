import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { cleanLocalStorage } from '../../utils';
import { useDeleteUserMutation } from '../../utils/hooks/reactDeleteQueries';
import BurgerMenu from '../BurgerMenu';
import LangSwitch from '../Switch';
import Button from '../Button';
import DropdownMenu from '../DropdownMenu';
import LogInModal from '../LogInModal';
import ModalSure from '../ModalSure';
import AuthErrorModal from '../AuthErrorModal';
import { useTranslation } from 'react-i18next';
import '../../utils/i18next';

const Header = () => {
  const router = useRouter();
  const isAdmin = true;

  const { t } = useTranslation();

  const mutation = useDeleteUserMutation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isBurgerOpened, setIsBurgerOpened] = useState(false);

  const [logInError, setLogInError] = useState(false);
  const [signUpError, setSignUpError] = useState(false);
  const authErrorMessage = signUpError ? t('signup_error') : t('login_error');
  const authError = logInError || signUpError;

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('nextBoardUserId'));
  }, []);

  const signOut = () => {
    setIsLoggedIn(false);
    setIsBurgerOpened(false);
    cleanLocalStorage();
    router.push('/');
  };

  const deleteAccount = async () => {
    await mutation.mutateAsync(localStorage.getItem('nextBoardUserId') as string);
    setIsLoggedIn(false);
    setIsBurgerOpened(false);
    cleanLocalStorage();
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-10 flex h-[10vh] w-screen items-center justify-center bg-header px-[22px] lg:px-[45px]">
      {router.pathname.includes('/board/') && isAdmin && <DropdownMenu />}
      <Link className="w-full" href={'/'}>
        <h1 className="w-full cursor-pointer text-center text-[30px] font-bold italic text-headerText lg:text-[40px]">
          NEXT BOARD
        </h1>
      </Link>
      <div className="absolute right-[45px] hidden items-center gap-[40px] lg:flex">
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
            <LogInModal onError={setSignUpError} />
            <LogInModal isLogin onError={setLogInError} />
            <AuthErrorModal text={authErrorMessage} isError={authError} />
          </>
        )}
      </div>
      <BurgerMenu signOut={signOut} deleteAccount={deleteAccount} isOpened={isBurgerOpened} isLoggedIn={isLoggedIn} />
    </header>
  );
};

export default Header;
