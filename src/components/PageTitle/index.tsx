import { ReactNode } from 'react';

interface PageTitleProps {
  children: ReactNode | ReactNode[];
}

const PageTitle = ({ children }: PageTitleProps) => (
  <h2 className="w-100 text-center text-[48px] font-bold text-titleText mt-[30px]">{children}</h2>
);

export default PageTitle;
