import deleteIco from '/public/assets/component-images/deleteIcon.svg';
import lowest from '/public/assets/component-images/importance-icons/1.svg';
import low from '/public/assets/component-images/importance-icons/2.svg';
import middle from '/public/assets/component-images/importance-icons/3.svg';
import high from '/public/assets/component-images/importance-icons/4.svg';
import highest from '/public/assets/component-images/importance-icons/5.svg';
import Image from 'next/image';

import { ColumnType, IssueType } from '../../utils/types';
import Modal from '../Modal';
import { useDeleteTaskMutation } from '../../utils/hooks/reactDeleteQueries';
import { useEffect, useState } from 'react';
import { useUpdateIssueMutation } from '../../utils/hooks/reactPutQueries';
import SelectIssue from '../SelectIssue';
import ModalSure from '../ModalSure';
import { useTranslation } from 'react-i18next';
import '../../utils/i18next';

interface IssueProps {
  data: IssueType;
  column: ColumnType;
  refetch: () => void;
}

const Issue = ({ data, column, refetch }: IssueProps) => {
  // const { text, importance, estimation, theme } = JSON.parse(data.description);
  const { estimation } = JSON.parse(data.description);

  const description = JSON.parse(data.description);
  const isAdmin = true;
  const [focusInput, setFocusInput] = useState(false);
  const [focusSelect, setFocusSelect] = useState(false);
  const [title, setTitle] = useState(data.title);
  const [text, setText] = useState(description.text);
  const [theme, setTheme] = useState(description.theme);
  const [importance, setImportance] = useState(description.importance);
  const deleteTask = useDeleteTaskMutation();
  const updateIssue = useUpdateIssueMutation();

  const deleteIssue = async () => {
    await deleteTask.mutateAsync({ boardId: data.boardId, columnId: data.columnId, taskId: data._id });
    refetch();
  };

  const { t } = useTranslation();

  const update = async () => {
    await updateIssue.mutateAsync({
      boardId: data.boardId,
      columnId: data.columnId,
      title: title,
      text: text,
      theme: theme,
      importance: importance,
      estimation: estimation,
      taskId: data._id
    });
    refetch();
  };

  useEffect(() => {
    update();
  }, [importance]);

  const copyText = async () => await navigator.clipboard.writeText(data._id);

  const modalWindow = (
    <div className="relative h-[500px] w-screen cursor-pointer rounded-3xl bg-issueBg p-4 shadow-xxl lg:w-[600px]">
      {!focusInput ? (
        <h6 onClick={() => setFocusInput(true)} className="absolute left-1/2 -translate-x-1/2 text-3xl font-bold">
          {title}
        </h6>
      ) : (
        <input
          autoFocus
          onBlur={() => {
            setFocusInput(false);
            update();
          }}
          onChange={(e) => setTitle(e.target.value)}
          className="placeholder: absolute left-1/2 w-[30%] -translate-x-1/2 bg-transparent text-center text-3xl font-bold outline-none"
          value={title}
        />
      )}
      <div className="mb-5 flex h-fit w-full items-center justify-between">
        <h6 className="text-3xl" title={column.title}>
          {column.title.length > 6 ? column.title.substring(0, 6) + '...' : column.title}
        </h6>
        {isAdmin && (
          <ModalSure text={t('delete_issue') as string} onSubmit={deleteIssue}>
            <Image src={deleteIco} alt="Delete button" width={20} className="button" />
          </ModalSure>
        )}
      </div>
      <textarea
        className="mt-8 h-[250px] w-full resize-none text-left text-2xl outline-none"
        onChange={(e) => setText(e.target.value)}
        onBlur={() => {
          update();
        }}
        value={text}
      />
      <div className="absolute bottom-4 w-[calc(100%-32px)]">
        <input
          onChange={(e) => setTheme(e.target.value)}
          onBlur={() => update()}
          className="mb-5 w-full rounded-full bg-headerText px-2 py-1 text-left text-3xl text-white outline-none"
          value={theme}
        />
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {!focusSelect ? (
              <button className="h-10 w-10 text-center" onClick={() => setFocusSelect(true)}>
                <Image
                  src={
                    +importance === 1
                      ? lowest
                      : +importance === 2
                      ? low
                      : +importance === 3
                      ? middle
                      : +importance === 4
                      ? high
                      : highest
                  }
                  alt={`Task importance is ${importance}`}
                />
              </button>
            ) : (
              <div className="h-10 w-10 text-center">
                <SelectIssue
                  importance={importance}
                  setFocusSelect={setFocusSelect}
                  setImportance={setImportance}
                  update={update}
                />
              </div>
            )}
            <div className="h-10 w-10 rounded-full bg-section text-center text-3xl">{estimation}</div>
            <div className="h-10 w-10 rounded-full bg-section text-center text-3xl">{`${data.userId}`[0]}</div>
            <div className="h-10 w-10 text-3xl">{data.userId}</div>
          </div>
          <div className="hidden cursor-pointer text-3xl lg:block" title={'Copy id ' + data._id} onClick={copyText}>
            {'id: ' + data._id.substring(0, 6) + '...'}
          </div>
        </div>
      </div>
    </div>
  );

  const modalOpener = (
    <div className="button min-h-[130px] w-full rounded-3xl bg-issueBg p-4 pb-2 shadow-xxl">
      <div className="mb-5 flex h-fit w-full items-center justify-between">
        <h6 className=" text-2xl">{data.title}</h6>
      </div>
      <div className="mb-2 rounded-xl bg-headerText px-2 text-white">{theme}</div>
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <div className="h-6 w-6 text-center">
            <Image
              src={
                +importance === 1
                  ? lowest
                  : +importance === 2
                  ? low
                  : +importance === 3
                  ? middle
                  : +importance === 4
                  ? high
                  : highest
              }
              alt={`Task importance is ${importance}`}
            />
          </div>
          <div className="h-6 w-6 rounded-full bg-section text-center">{estimation}</div>
          <div className="h-6 w-6 rounded-full bg-section text-center">{`${data.userId}`[0]}</div>
        </div>
        <div className="cursor-pointer" title={'Copy id ' + data._id} onClick={copyText}>
          {'id: ' + data._id.substring(0, 6) + '...'}
        </div>
      </div>
    </div>
  );

  return <Modal open={modalOpener}>{modalWindow}</Modal>;
};

export default Issue;
