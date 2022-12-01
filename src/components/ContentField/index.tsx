import { ReactNode } from 'react';

interface ContentFieldProps {
  children?: ReactNode | ReactNode[];
  className?: string;
}

const ContentField = ({ children, className }: ContentFieldProps) => {
  return (
    <section className={`${className} lg:mt-[15px] mt-[5px] lg:h-[80%] h-full w-[110%] lg:rounded-[30px] bg-section shadow-xxlInner relative`}>
      {children}
    </section>
  );
};

export default ContentField;
