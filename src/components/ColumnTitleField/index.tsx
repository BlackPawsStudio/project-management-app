import { ReactNode } from 'react';

interface ColumnTitleProps {
  children: ReactNode | ReactNode[];
}

const ColumnTitleField = ({ children }: ColumnTitleProps) => (
  <p className="w-100 text-center text-[32px] font-bold text-black bg-white rounded-full my-[10px]">{children}</p>
);

export default ColumnTitleField;
