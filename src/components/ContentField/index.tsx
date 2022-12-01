import { ReactNode } from 'react';

interface ContentFieldProps {
  children?: ReactNode | ReactNode[];
  className?: string;
}

const ContentField = ({ children, className }: ContentFieldProps) => {
  return (
    <section className={`${className} lg:mt-[15px] h-[80%] w-full rounded-[30px] bg-section shadow-xxlInner`}>
      {children}
    </section>
  );
};

export default ContentField;
