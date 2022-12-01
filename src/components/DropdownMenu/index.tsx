import { useRouter } from 'next/router';
import { useState } from 'react';
import { useCreateColumnMutation } from '../../utils/hooks/reactPostQueries';

const DropdownMenu = () => {
  const [isDown, setIsDown] = useState(false);
  const addColumn = useCreateColumnMutation();
  const router = useRouter();

  return (
    <aside className={`absolute ${isDown ? 'top-0' : 'top-[-80vh]'} left-0 duration-[1s]`}>
      <div
        className={`z-[2] h-[80vh] w-[25vw] rounded-[0_0_50px_0] bg-headerText duration-[0.5s] ${
          isDown && 'shadow-[0_0_15px_25px_#00000043]'
        }`}
      >
        <ul className="flex h-full w-full flex-col items-center justify-center gap-10 text-3xl text-white">
          <li className="button">Rename board</li>
          <li
            onClick={() => addColumn.mutateAsync({ id: router.query.id, BoardData: { title: 'ff', order: 6 } })}
            className="button"
          >
            Add column
          </li>
          <li className="button">Delete board</li>
        </ul>
      </div>
      <div
        className="button z-1 ml-6 h-[10px] w-[10px] border-[30px] border-t-[70px] border-headerText border-b-transparent"
        onClick={() => setIsDown(!isDown)}
      ></div>
    </aside>
  );
};

export default DropdownMenu;
