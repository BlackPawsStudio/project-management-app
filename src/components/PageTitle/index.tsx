import { ReactNode } from 'react';

interface PageTitleProps {
  children: ReactNode | ReactNode[];
}

const PageTitle = ({ children }: PageTitleProps) => (
  <h2 className="w-100 text-center text-[32px] font-bold text-titleText lg:px-0 lg:text-[40px]">{children}</h2>
);

export default PageTitle;
