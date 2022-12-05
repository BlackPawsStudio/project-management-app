import { useEffect, useState } from 'react';
import { useUpdateBoardMutation } from '../../utils/hooks/reactPutQueries';
import { BoardType } from '../../utils/types';

interface PageTitleProps {
  data?: BoardType;
  title: string;
  boardsRefetch?: () => void;
}

const PageTitle = ({ title, boardsRefetch, data }: PageTitleProps) => {
  const updateBoard = useUpdateBoardMutation();
  const [isFocus, setIsFocus] = useState(false);
  const [name, setName] = useState(title);

  const update = () => {
    if (data) {
      updateBoard.mutateAsync({
        boardId: data._id,
        title: name,
        owner: data.owner,
        users: data.users
      });
    }
    if (boardsRefetch) boardsRefetch();
  };

  useEffect(() => {
    update();
  }, [name]);

  return (
    <div className="flex justify-center">
      {!isFocus ? (
        <h2
          onClick={() => setIsFocus(true)}
          className="w-100 text-center text-[32px] font-bold text-titleText lg:px-0 lg:text-[40px]"
        >
          {name}
        </h2>
      ) : (
        <input
          className="w-[50%] bg-transparent text-center text-[32px] font-bold text-titleText outline-blue-600 lg:px-0 lg:text-[40px]"
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setIsFocus(false)}
          value={name}
        />
      )}
    </div>
  );
};

export default PageTitle;
