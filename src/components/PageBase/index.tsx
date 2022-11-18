import { ReactNode } from 'react';

import ContentField from '../ContentField';
import PageTitle from '../PageTitle';
import SearchBar from '../SearchBar';

interface PageBase {
  title: string;
  onSubmit?: (search: string) => void;
  children: ReactNode | ReactNode[];
}

const PageBase = ({ title, onSubmit, children }: PageBase) => {
  return (
    <>
      <PageTitle>{title}</PageTitle>
      {onSubmit && <SearchBar text={'Search boards:'} onSubmit={onSubmit} />}
      <ContentField className="">{children}</ContentField>
    </>
  );
};

export default PageBase;
