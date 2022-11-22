import { ReactNode } from 'react';

import { BoardType } from '../../utils/types';

interface BoardCardProps {
  boardData: BoardType;
  tasks: number;
  columns: number;
  children: ReactNode | ReactNode[];
}

const BoardCard = ({ boardData, tasks, columns, children }: BoardCardProps) => {
  return (
    <div className="w-fit h-[95%] shrink-0 bg-boardCard rounded-[30px] p-4">
      <h4 className="mb-[5px] text-center text-[28px] font-bold text-primaryText">{boardData.title}</h4>
      <p className="text-center text-[24px] my-[3px] text-primaryText leading-none">Members: {boardData.users.length + 1}</p>
      <p className="text-center text-[24px] my-[3px] text-primaryText leading-none">Issues: {tasks}</p>
      <p className="text-center text-[24px] my-[3px] text-primaryText leading-none">Columns: {columns}</p>
      <div className="max-h-[55%] my-[10px] overflow-auto card-scrollbar">
        <>{children}</>
      </div>
      
    </div>
  );
};

export default BoardCard;