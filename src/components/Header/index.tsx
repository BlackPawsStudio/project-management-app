import Link from 'next/link';
import { useRouter } from 'next/router';

import Button from '../Button';
import DropdownMenu from '../DropdownMenu';
import LogIn from '../LogIn/LogIn';
import Modal from '../Modal';

const Header = () => {
  const router = useRouter();
  const isAdmin = true;
  return (
    <header className="fixed top-0 z-10 flex h-[10vh] w-screen items-center justify-center bg-header p-[0_45px]">
      {router.pathname.includes('/board/') && isAdmin && <DropdownMenu />}
      <Link href={'/'}>
        <h1 className="w-100 cursor-pointer text-[40px] font-bold italic text-headerText">NEXT BOARD</h1>
      </Link>
      <div className="absolute right-[45px] flex items-center gap-[40px]">


        <Button>SIGN UP</Button>
        <Modal open={<Button>LOG IN</Button>}><LogIn/></Modal>
      </div>
    </header>
  );
};

export default Header;
