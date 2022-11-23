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
    <div className="h-[95%] w-fit shrink-0 rounded-[30px] bg-boardCard py-4">
      <h4 className="mx-4 mb-[5px] text-center text-[28px] font-bold text-primaryText">{boardData.title}</h4>
      <p className="mx-4 my-[3px] text-center text-[24px] leading-none text-primaryText">
        Members: {boardData.users.length + 1}
      </p>
      <p className="mx-4 my-[3px] text-center text-[24px] leading-none text-primaryText">Issues: {tasks}</p>
      <p className="mx-4 my-[3px] text-center text-[24px] leading-none text-primaryText">Columns: {columns}</p>
      <div className="card-scrollbar my-[10px] max-h-[55%] m-full px-4 overflow-auto">
        <div className='h-fit flex-col flex gap-[10px]'>{children}</div>
      </div>
    </div>
  );
};

export default BoardCard;