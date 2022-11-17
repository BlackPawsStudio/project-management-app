import { ReactNode } from 'react';

import Footer from '../Footer';
import Header from '../Header';

interface LayoutProps {
  children: ReactNode | ReactNode[];
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <div className=" bg-circle top-[-50vw] right-[-35vw]" />
      <main className="mt-[10vh] w-100 h-[80vh] p-[0_45px]">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
