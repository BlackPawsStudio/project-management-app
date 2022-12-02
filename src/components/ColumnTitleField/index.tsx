import { ReactNode } from 'react';

interface ColumnTitleProps {
  children: ReactNode | ReactNode[];
}

const ColumnTitleField = ({ children }: ColumnTitleProps) => (
  <p className="w-[100%] rounded-full bg-white px-[5px] text-center text-2xl font-bold text-black">{children}</p>
);

export default ColumnTitleField;
