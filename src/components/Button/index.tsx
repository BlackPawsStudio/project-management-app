import { ReactNode } from 'react';

interface ButtonProps {
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset' | undefined;
  children: ReactNode | ReactNode[];
  className?: string;
  submit?: boolean;
  cancel?: boolean;
}

const Button = ({ onClick, type, children, className, submit, cancel }: ButtonProps) => {
  const hover = `${submit ? 'hover:bg-submit' : cancel ? 'hover:bg-cancel' : 'hover:brightness-150'}`;
  return (
    <button
      onClick={onClick}
      type={type ? type : 'button'}
      className={`${className} rounded-lg bg-headerText p-[5px] text-[20px] text-white lg:p-[3px_10px] ${hover} active:brightness-75`}
    >
      {children}
    </button>
  );
};

export default Button;
