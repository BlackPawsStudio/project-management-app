import Router, { useRouter } from 'next/router';
import { useEffect } from 'react';
import { BoardType } from '../../utils/types';
import {
  useGetBoardByIdQuery,
  useGetBoardColumnsQuery,
  useGetBoardIssuesQuery
} from '../../utils/hooks/reactGetQueries';
import ColumnTitleField from '../ColumnTitleField';
import { useTranslation } from 'react-i18next';
import '../../utils/i18next';

const BoardCard = ({ boardData }: { boardData: BoardType }) => {
  const router = useRouter();
  const { data, isLoading, isError } = useGetBoardByIdQuery(boardData._id);

  const { t } = useTranslation();

  const {
    data: columnsData,
    isLoading: isColumnsLoading,
    isError: isColumnsError
  } = useGetBoardColumnsQuery(boardData._id);

  const {
    data: issuesData,
    isLoading: isIssuesLoading,
    isError: isIssuesError
  } = useGetBoardIssuesQuery(boardData._id);

  const goToBoardPage = () => {
    Router.push(`/board/${boardData._id}`);
  };

  useEffect(() => {
    if (isError || isColumnsError || isIssuesError) {
      router.push('/404');
    }
  }, [isError, isColumnsError, isIssuesError]);

  return (
    <>
      {!isLoading && !isError && !isColumnsLoading && !isColumnsError && !isIssuesLoading && !isIssuesError && (
        <div
          onClick={goToBoardPage}
          className="button m-2 h-[400px] w-[95%] shrink-0 cursor-pointer rounded-[30px] bg-boardCard py-4 shadow-xxlInner lg:h-[95%] lg:w-[200px]"
        >
          <h4 className="mx-4 mb-[5px] text-center text-[28px] font-bold text-primaryText">{data.title}</h4>
          <p className="mx-4 my-[3px] text-center text-2xl leading-none text-primaryText">
            {t('members')}: {data.users.length}
          </p>
          <p className="mx-4 my-[3px] text-center text-2xl leading-none text-primaryText">
            {t('issues')}: {issuesData.length}
          </p>
          <p className="mx-4 my-[3px] text-center text-2xl leading-none text-primaryText">
            {t('columns')}: {columnsData.length}
          </p>
          <div className="card-scrollbar m-full my-[10px] max-h-[55%] overflow-auto px-4">
            <div className="flex h-fit flex-col gap-[10px]">
              {columnsData.map((column, i) => (
                <ColumnTitleField key={i}>{column.title}</ColumnTitleField>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BoardCard;
