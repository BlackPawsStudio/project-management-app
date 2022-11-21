import { ReactNode } from 'react';

import ContentField from '../ContentField';
import PageTitle from '../PageTitle';
import SearchBar from '../SearchBar';

interface PageBase {
  title: string;
  children: ReactNode | ReactNode[];
  className?: string;
  text?: string;
  onSubmit?: (search: string) => void;
}

const PageBase = ({ title, onSubmit, children, className, text }: PageBase) => {
  return (
    <>
      <PageTitle>{title}</PageTitle>
      {text && onSubmit && <SearchBar text={text} onSubmit={onSubmit} />}
      <ContentField className={className}>{children}</ContentField>
    </>
  );
};

export default PageBase;
