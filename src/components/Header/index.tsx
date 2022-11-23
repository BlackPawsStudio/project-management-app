import Link from 'next/link';

import Button from '../Button';

const Header = () => {
  return (
    <header className="fixed top-0 flex h-[10vh] w-screen items-center justify-center bg-header p-[0_45px]">
      <Link href={'/'}>
        <h1 className="cursor-pointer w-100 text-[40px] font-bold italic text-headerText">NEXT BOARD</h1>
      </Link>
      <div className="absolute right-[45px] flex items-center gap-[40px]">
        <Button>SIGN UP</Button>
        <Button>LOG IN</Button>
      </div>
    </header>
  );
};

export default Header;
