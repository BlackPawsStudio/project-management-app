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
    <div>
      <h4>{boardData.title}</h4>
      <span>Members: {boardData.users.length + 1}</span>
      <span>Issues: {tasks}</span>
      <span>Columns: {columns}</span>
      <>{children}</>
    </div>
  );
};

export default BoardCard;