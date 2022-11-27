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

  return (
    <header className="fixed top-0 z-10 flex h-[10vh] w-screen items-center justify-center bg-header p-[0_45px]">
      {router.pathname.includes('/board/') && isAdmin && <DropdownMenu />}
      <Link href={'/'}>
        <h1 className="w-100 cursor-pointer text-[40px] font-bold italic text-headerText">NEXT BOARD</h1>
      </Link>
      <LangSwitch />
      <div className="absolute right-[45px] flex items-center gap-[40px]">
        {isLoggedIn ? (
          <>
            {router.pathname.includes('user') ? (
              <ModalSure text="Are you sure want to delete account?" onSubmit={deleteAccount}>
                <Button>Delete account</Button>
              </ModalSure>
            ) : (
              <Link href="/user">
                <Button>Go to user page</Button>
              </Link>
            )}
            <ModalSure text="Are you sure want to log out?" onSubmit={signOut}>
              <Button>Sign out</Button>
            </ModalSure>
          </>
        ) : (
          <>
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
