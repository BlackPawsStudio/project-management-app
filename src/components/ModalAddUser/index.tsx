import { ReactNode, useState } from 'react';
import Button from '../Button';
import Modal from '../Modal';
import { useTranslation } from 'react-i18next';
import '../../utils/i18next';
import { useStore } from '../../store/store';
import { useUpdateBoardMutation } from '../../utils/hooks/reactPutQueries';

interface ModalSureProps {
  text: string;
  children: ReactNode | ReactNode[];
}

const ModalAddUser = ({ text, children }: ModalSureProps) => {
  const [isDefaultOpen, setIsDefaultOpen] = useState(false);
  const [id, setId] = useState('')
  const currentBoard = useStore((state) => state.currentBoard)
  const update = useUpdateBoardMutation()

  const addUser = () => {
    update.mutateAsync({
      boardId:currentBoard.boardId,
      title: currentBoard.title,
      owner: currentBoard.owner,
      users: [...currentBoard.users, id]
    })
  }

  const modalOpener = children;

  const { t } = useTranslation();

  const modalWindow = (
    <div className="flex w-screen flex-col items-center justify-between gap-5 rounded-[15px] bg-section px-[20px] pt-[10px] pb-[20px] lg:h-[190px] lg:w-[550px]">
      <h2 className="text-[28px] font-bold text-titleText">{text}</h2>
      <input className=' w-[60%] p-[5px] rounded-[5px] shadow-xxlInner'
        onChange={(e) => setId(e.target.value)}
        value={id}
      />
      <div className="flex w-full flex-col-reverse justify-between gap-5 px-[120px] lg:flex-row">
        <Button
          className="h-[44px] w-[107px] font-bold"
          cancel={true}
          onClick={() => {
            setIsDefaultOpen(true);
            setTimeout(() => setIsDefaultOpen(false));
          }}
        >
          {t('cancel')}
        </Button>
        <Button className="h-[44px] w-[107px] font-bold" submit={true}
          onClick={() => {
            addUser()
            setIsDefaultOpen(true);
            setTimeout(() => setIsDefaultOpen(false));
          }}>
          {t('add')}
        </Button>
      </div>
    </div>
  );

  return (
    <Modal isDefaultOpen={isDefaultOpen} open={modalOpener}>
      {modalWindow}
    </Modal>
  );
};

export default ModalAddUser;
