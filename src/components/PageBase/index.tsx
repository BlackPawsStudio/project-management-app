import { ReactNode } from 'react';
import { BoardType } from '../../utils/types';

import ContentField from '../ContentField';
import PageTitle from '../PageTitle';

interface PageBaseProps {
  data?: BoardType;
  title: string;
  children: ReactNode | ReactNode[];
  className?: string;
  text?: string;
  onSubmit?: (search: string) => void;
  boardsRefetch?: () => void;
}

const PageBase = ({ title, children, className, boardsRefetch, data }: PageBaseProps) => {
  return (
    <>
      <PageTitle data={data} title={title} boardsRefetch={boardsRefetch} />
      <ContentField className={className}>{children}</ContentField>
    </>
  );
};

export default PageBase;
