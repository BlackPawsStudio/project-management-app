import Router, { useRouter } from 'next/router';
import { BoardType } from '../../utils/types';
import {
  useGetBoardByIdQuery,
  useGetBoardColumnsQuery,
  useGetBoardIssuesQuery
  } from '../../utils/hooks/reactQueries';
import ColumnTitleField from '../ColumnTitleField';

const BoardCard = ({ boardData }: { boardData: BoardType }) => {

  const { data, isLoading, isError } = useGetBoardByIdQuery(boardData._id);

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
  }

  return (
    <>
      {
        !isLoading
        && !isError
        && !isColumnsLoading
        && !isColumnsError
        && !isIssuesLoading
        && !isIssuesError
        &&
        <div onClick={goToBoardPage} className="h-[95%] w-fit shrink-0 rounded-[30px] bg-boardCard py-4 m-2 shadow-xxlInner cursor-pointer button">
          <h4 className="mx-4 mb-[5px] text-center text-[28px] font-bold text-primaryText">{data.title}</h4>
          <p className="mx-4 my-[3px] text-center text-[24px] leading-none text-primaryText">
            Members: {data.users.length + 1}
          </p>
          <p className="mx-4 my-[3px] text-center text-[24px] leading-none text-primaryText">Issues: {issuesData.length}</p>
          <p className="mx-4 my-[3px] text-center text-[24px] leading-none text-primaryText">Columns: {columnsData.length}</p>
          <div className="card-scrollbar my-[10px] max-h-[55%] m-full px-4 overflow-auto">
            <div className='h-fit flex-col flex gap-[10px]'>
              {
                columnsData.map((column, i) => (
                  <ColumnTitleField key={i}>{column.title}</ColumnTitleField>
                ))
              }
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default BoardCard;
