import { ReactNode } from 'react';

interface ColumnTitleProps {
  children: ReactNode | ReactNode[];
}

const ColumnTitleField = ({ children }: ColumnTitleProps) => (
  <p className="w-[100%] text-center text-[24px] font-bold text-black bg-white rounded-full">{children}</p>
);

export default ColumnTitleField;
