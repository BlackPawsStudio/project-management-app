import { ReactNode } from 'react';

import { BoardType } from '../../utils/types';
import ColumnTitleField from '../../components/ColumnTitleField';

interface BoardCardProps {
  boardData: BoardType;
  tasks: number;
  columns: number;
  children: ReactNode | ReactNode[];
}

const BoardCard = ({ boardData, tasks, columns, children }: BoardCardProps) => {
  return (
    <div className="w-fit bg-boardCard rounded-[30px] p-4">
      <h4 className="text-center text-[32px] font-bold text-primaryText">{boardData.title}</h4>
      <p className="text-center text-[32px] text-primaryText leading-none">Members: {boardData.users.length + 1}</p>
      <p className="text-center text-[32px] text-primaryText leading-none">Issues: {tasks}</p>
      <p className="text-center text-[32px] text-primaryText leading-none">Columns: {columns}</p>
      <>{children}</>
    </div>
  );
};

export default BoardCard;