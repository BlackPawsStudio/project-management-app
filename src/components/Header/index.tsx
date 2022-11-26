import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Button from '../Button';
import DropdownMenu from '../DropdownMenu';
import LogInModal from '../LogInModal';

const Header = () => {
  const router = useRouter();
  const isAdmin = true;

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('nextBoardUserId'));
  }, []);

  const signOut = () => {
    localStorage.removeItem('nextBoardUserId');
    localStorage.removeItem('nextBoardUserToken');
    setIsLoggedIn(false);
    router.push('/');
  };

  return (
    <header className="fixed top-0 z-10 flex h-[10vh] w-screen items-center justify-center bg-header p-[0_45px]">
      {router.pathname.includes('/board/') && isAdmin && <DropdownMenu />}
      <Link href={'/'}>
        <h1 className="w-100 cursor-pointer text-[40px] font-bold italic text-headerText">NEXT BOARD</h1>
      </Link>
      <div className="absolute right-[45px] flex items-center gap-[40px]">
        {isLoggedIn ? (
          <Button onClick={signOut}>Sign out</Button>
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
