import Image from 'next/image';
import { useState } from 'react';
import { useCreateIssueMutation } from '../../utils/hooks/reactPostQueries';
import { ColumnType } from '../../utils/types';
import Button from '../Button';
import Input from '../Input';
import Modal from '../Modal';
import { useTranslation } from 'react-i18next';
import '../../utils/i18next';
import crossAdd from '/public/assets/component-images/crossAdd.svg';

interface AddIssueModalProps {
  propData: ColumnType;
  refetch: () => void;
  order: number;
}

const AddIssueModal = ({ propData, refetch, order }: AddIssueModalProps) => {
  const modalOpener = <Image src={crossAdd} alt="add button" width={25} className="button mr-[15px]" />;

  const { t } = useTranslation();

  const [isDefaultOpen, setIsDefaultOpen] = useState(false);
  const createIssue = useCreateIssueMutation();
  const [title, setTitle] = useState('title');
  const [text, setText] = useState('text');
  const [theme, setTheme] = useState('theme');
  const [importance, setImportance] = useState(1);

  const addIssue = async () => {
    await createIssue.mutateAsync({
      order: order,
      boardId: propData.boardId,
      columnId: propData._id,
      title: title,
      text: text,
      theme: theme,
      importance: importance
    });
    refetch();
  };

  const modalWindow = (
    <div className="relative h-[67vh] w-[50vh] overflow-hidden rounded-2xl bg-section">
      <div className="bg-circle -right-[45%] -top-[10%] h-[75vh] w-[75vh]" />
      <div className="absolute top-0 left-0 z-[2] h-full w-full p-[25px]">
        <h2 className="mb-[25px] text-2xl font-bold text-titleText">{t('add_new_issue')}</h2>
        <div className="flex h-[85%] w-full flex-col gap-[30px] rounded-2xl bg-white px-[50px] py-[30px] shadow-xxlInner">
          <div className="flex flex-col gap-[15px]">
            <Input onChange={setTitle} placeholder={t('issue_title') as string} size="w-full py-1" />
            <Input onChange={setTheme} placeholder={t('issue_theme') as string} size="w-full py-1" />

            <select
              onChange={(e) => setImportance(Number(e.target.value))}
              placeholder={t('select_importance') as string}
              className="w-full rounded-lg bg-inputBackground py-1 px-2.5 pr-14 shadow-xxlInner focus:outline-none"
            >
              <option value={1}>lowest</option>
              <option value={2}>low</option>
              <option value={3}>middle</option>
              <option value={4}>high</option>
              <option value={5}>highest</option>
            </select>
          </div>
          <textarea
            onChange={(e) => setText(e.target.value)}
            placeholder={t('issue_description') as string}
            className="min-h-[90px] w-full resize-none rounded-lg bg-inputBackground px-2.5 pr-14 shadow-xxlInner focus:outline-none"
          />
          <div className="flex w-full items-center justify-between">
            <Button
              cancel
              onClick={() => {
                setIsDefaultOpen(true);
                setTimeout(() => setIsDefaultOpen(false));
              }}
            >
              {t('cancel')}
            </Button>
            <Button
              submit
              onClick={() => {
                addIssue();
                setIsDefaultOpen(true);
                setTimeout(() => setIsDefaultOpen(false));
              }}
            >
              {t('confirm')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal hasToClose={isDefaultOpen} open={modalOpener}>
      {modalWindow}
    </Modal>
  );
};

export default AddIssueModal;
