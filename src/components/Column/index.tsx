import { useEffect, useRef, useState } from 'react';
import { useGetColumnIssuesQuery } from '../../utils/hooks/reactGetQueries';
import { ColumnType, IssueType } from '../../utils/types';
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
import { useTranslation } from 'react-i18next';
import '../../utils/i18next';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { PatchIssue, usePatchIssueMutation } from '../../utils/hooks/reactPatchQueries';

interface ColumnProps {
  propData: ColumnType;
  columnsRefetch: () => void;
}

const Column = ({ propData, columnsRefetch }: ColumnProps) => {
  const { data, isLoading, isError, refetch } = useGetColumnIssuesQuery(propData.boardId, propData._id);
  const [issuesArr, setIssuesArr] = useState(data);
  const updateColumn = useUpdateColumnMutation();
  const [isChanging, setIsChanging] = useState(false);
  const [title, setTitle] = useState(propData.title);
  const deleteColumn = useDeleteColumnMutation();
  const titleInputRef = useRef<HTMLInputElement | null>(null);
  const titleParent = useRef(null);

  const updateIssue = usePatchIssueMutation();

  useEffect(() => {
    titleParent.current && autoAnimate(titleParent.current);
  }, [titleParent]);

  const update = async () => {
    await updateColumn.mutateAsync({ boardId: propData.boardId, columnId: propData._id, title: title, order: 0 });
    columnsRefetch();
  };

  const changeTitle = () => {
    if (titleInputRef.current) {
      setTitle(titleInputRef.current.value);
      setIsChanging(false);
      update();
    }
  };

  const removeColumn = async () => {
    await deleteColumn.mutateAsync({ boardId: propData.boardId, columnId: propData._id });
    columnsRefetch();
  };

  const { t } = useTranslation();

  useEffect(() => {
    setIssuesArr(data);
  }, [data]);

  const onDragEnd = async (result: DropResult) => {
    const { destination, source } = result;
    const from = source.index;
    const to = destination?.index;
    if (issuesArr && typeof to === 'number' && to !== from) {
      const newData: PatchIssue[] = issuesArr.map((el) => {
        return {
          _id: el._id,
          order: el.order,
          columnId: el.columnId
        };
      });
      const orderArr = newData.map((el) => el.order);
      orderArr.splice(from, 1);
      orderArr.splice(to, 0, from);
      console.log(orderArr);

      const requestArr = orderArr.map((el, id) => {
        const issue = newData.find((dataEl) => dataEl.order === el) as PatchIssue;
        issue.order = id;
        return issue;
      });

      if (issuesArr) {
        const newIssueArr = requestArr.map((el, id) => {
          const newIssue = issuesArr.find((issueEl) => {
            return issueEl._id === el._id;
          });
          if (newIssue) {
            console.log(newIssue);
            newIssue.order = el.order;
          }
          return newIssue as IssueType;
        });

        console.log(requestArr, newIssueArr, 'a');

        setIssuesArr(newIssueArr);
      }

      await updateIssue.mutateAsync(requestArr);
      refetch();
    }
  };

  return (
    <div className="flex min-h-[400px] flex-col gap-1 rounded-3xl bg-boardCard py-3 shadow-xxlInner lg:min-w-[300px]">
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
          <div className="flex pr-[10px]">
            <h5
              className="mx-3 h-8 w-[67%] cursor-pointer text-2xl font-bold text-primaryText"
              onClick={() => setIsChanging(true)}
            >
              {title}
            </h5>
            {data && (
              <button>
                <AddIssueModal propData={propData} refetch={refetch} order={(issuesArr && issuesArr.length) || 0} />
              </button>
            )}

            <ModalSure text={t('delete_column')} onSubmit={removeColumn}>
              <Image src={deleteIco} alt="Delete button" width={20} className="button" />
            </ModalSure>
          </div>
        )}
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={propData._id}>
          {(provided) => (
            <div
              className="flex min-h-[92%] w-full flex-col gap-3 px-3 pt-1 duration-[0s]"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {!isLoading &&
                !isError &&
                issuesArr &&
                issuesArr
                  .sort((a, b) => a.order - b.order)
                  .map((el, id) => <Issue refetch={() => refetch()} index={id} column={propData} data={el} key={id} />)}
              {provided.placeholder}
              {!isLoading && !isError && data.length === 0 ? <div className="text-center">No issue</div> : ''}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Column;
