import { ReactNode } from 'react';

interface ColumnTitleProps {
  children: ReactNode | ReactNode[];
}

const ColumnTitleField = ({ children }: ColumnTitleProps) => (
  <p className="w-[100%] rounded-full bg-white text-center px-[5px] text-2xl font-bold text-black">{children}</p>
);

export default ColumnTitleField;
