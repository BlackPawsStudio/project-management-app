import { ReactNode } from 'react';

interface ButtonProps {
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset' | undefined;
  children: ReactNode | ReactNode[];
  className?: string;
}

const Button = ({ onClick, type, children, className }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type ? type : 'button'}
      className={`${className} rounded-lg bg-headerText p-[3px_10px] text-[20px] text-white hover:brightness-150 active:brightness-75`}
    >
      {children}
    </button>
  );
};

export default Button;
