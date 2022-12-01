import { ReactNode } from 'react';

interface PageTitleProps {
  children: ReactNode | ReactNode[];
}

const PageTitle = ({ children }: PageTitleProps) => (
  <h2 className="w-100 mt-[30px] text-center text-[48px] font-bold text-titleText">{children}</h2>
);

export default PageTitle;
