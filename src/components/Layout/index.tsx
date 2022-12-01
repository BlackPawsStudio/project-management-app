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
      <div className="bg-circle -z-1 top-[-50vw] right-[-35vw] h-[100vw] w-screen" />
      <main className="w-100 relative mt-[10vh] h-[80vh] px-[45px]">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
