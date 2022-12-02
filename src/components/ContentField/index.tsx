import { ReactNode } from 'react';

interface ContentFieldProps {
  children?: ReactNode | ReactNode[];
  className?: string;
}

const ContentField = ({ children, className }: ContentFieldProps) => {
  return (
    <section
      className={`${className} relative mt-[5px] h-full w-full bg-section shadow-xxlInner lg:mt-[15px] lg:h-[80%] lg:w-full lg:rounded-[30px]`}
    >
      {children}
    </section>
  );
};

export default ContentField;
