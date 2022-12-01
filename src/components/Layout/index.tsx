import { ReactNode } from 'react';

import Footer from '../Footer';
import Header from '../Header';

interface LayoutProps {
  children: ReactNode | ReactNode[];
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="body">
      <Header />
      <div className="bg-circle -z-1 top-[-20vh] right-[-30vh] h-[75vh] w-[75vh] lg:top-[-50vw] lg:right-[-35vw] lg:h-[100vw] lg:w-screen" />
      <main className="w-100 relative h-[80vh] lg:px-[45px]">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
