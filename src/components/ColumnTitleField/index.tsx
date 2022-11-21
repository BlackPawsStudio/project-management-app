import { ReactNode } from 'react';

interface ColumnTitleProps {
  children: ReactNode | ReactNode[];
}

const ColumnTitleField = ({ children }: ColumnTitleProps) => (
  <p className="w-100 text-center text-[48px] font-bold text-titleText mt-[30px]">{children}</p>
);

export default ColumnTitleField;
