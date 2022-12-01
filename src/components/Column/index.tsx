import { useEffect, useRef, useState } from 'react';
import { useGetColumnIssuesQuery } from '../../utils/hooks/reactGetQueries';
import { ColumnType } from '../../utils/types';
import Issue from '../Issue';
import tick from '/public/assets/component-images/tick.svg';
import cross from '/public/assets/component-images/cross.svg';
import Image from 'next/image';
import autoAnimate from '@formkit/auto-animate';
import { useDeleteColumnMutation } from '../../utils/hooks/reactDeleteQueries';
import deleteIco from '/public/assets/component-images/deleteIcon.svg';
import ModalSure from '../ModalSure';
import AddIssueModal from '../AddIssueModal';
import { useUpdateColumnMutation } from '../../utils/hooks/reactPutQueries';


interface ColumnProps {
  propData: ColumnType;
  columnsRefetch: () => void;
}

const Column = ({ propData, columnsRefetch }: ColumnProps) => {
  const { data, isLoading, isError, refetch } = useGetColumnIssuesQuery(propData.boardId, propData._id);
  const updateColumn = useUpdateColumnMutation()
  const [isChanging, setIsChanging] = useState(false);
  const [title, setTitle] = useState(propData.title);
  const deleteColumn = useDeleteColumnMutation();
  const titleInputRef = useRef<HTMLInputElement | null>(null);
  const titleParent = useRef(null);

  useEffect(() => {
    titleParent.current && autoAnimate(titleParent.current);
  }, [titleParent]);

  const update = async () => {
    await updateColumn.mutateAsync({ boardId: propData.boardId, columnId: propData._id, title: title })
    columnsRefetch();
  }

  const changeTitle = () => {
    if (titleInputRef.current) {
      setTitle(titleInputRef.current.value);
      setIsChanging(false);
      update()
    }

  };

  const removeColumn = async () => {
    await deleteColumn.mutateAsync({ boardId: propData.boardId, columnId: propData._id });
    columnsRefetch();
  };

  return (
    <div className="flex h-full min-w-[300px] flex-col gap-1 rounded-3xl bg-boardCard py-3 shadow-xxlInner">
      <div ref={titleParent}>
        {isChanging ? (
          <div className="flex h-8 w-full items-center justify-between px-3 text-2xl font-bold">
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              ref={titleInputRef}
              // defaultValue={title}
              className="h-full w-[150px] rounded-lg bg-inputBackground px-2.5 shadow-xxlInner focus:outline-none"
            />
            <div className="flex gap-2">
              <Image onClick={changeTitle} src={tick} alt="" className="button" />
              <Image onClick={() => setIsChanging(false)} src={cross} alt="" className="button" />
            </div>
          </div>
        ) : (
          <div className="flex">
            <h5
              className="mx-3 h-8 w-[67%] cursor-pointer text-2xl font-bold text-primaryText"
              onClick={() => setIsChanging(true)}
            >
              {title}
            </h5>

            <button>
              <AddIssueModal propData={propData} refetch={refetch} />
            </button>

            <ModalSure text="Are you sure want to delete column?" onSubmit={removeColumn}>
              <Image src={deleteIco} alt="Delete button" width={20} className="button" />
            </ModalSure>
          </div>
        )}
      </div>
      <div className="flex min-h-[92%] w-full flex-col gap-3 overflow-auto px-3 pt-1">
        {!isLoading &&
          !isError &&
          data
            .filter((el) => el.columnId === propData._id)
            .map((el, id) => <Issue refetch={() => refetch()} column={propData} data={el} key={id} />)}
        {!isLoading && !isError && data.length === 0 ? <div className="mt-[48%] text-center">No issue</div> : ''}
      </div>
    </div>
  );
};

export default Column;
