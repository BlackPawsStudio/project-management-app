import { ReactNode, useState } from 'react';
import Button from '../Button';
import Modal from '../Modal';
import { useTranslation } from 'react-i18next';
import '../../utils/i18next';

interface ModalSureProps {
  text: string;
  children: ReactNode | ReactNode[];
}

const ModalCopyId = ({ text, children }: ModalSureProps) => {
  const [isDefaultOpen, setIsDefaultOpen] = useState(false);
  const userId = localStorage.getItem('nextBoardUserId') as string;

  const copyText = async () => await navigator.clipboard.writeText(userId);
  const modalOpener = children;

  const { t } = useTranslation();

  const modalWindow = (
    <div className="flex w-screen flex-col items-center justify-between gap-5 bg-section px-[20px] pt-[10px] pb-[20px] lg:h-[190px] lg:w-[550px] lg:rounded-[15px]">
      <h2 className="text-[28px] font-bold text-titleText">{text}</h2>
      <div className="w-fit rounded-[5px] p-[5px] px-3 shadow-xxlInner">id: {userId}</div>
      <div className="mx-auto flex w-full max-w-[65%] flex-col-reverse items-center justify-between gap-5 lg:flex-row">
        <Button
          className="h-[44px] w-full font-bold"
          cancel={true}
          onClick={() => {
            setIsDefaultOpen(true);
            setTimeout(() => setIsDefaultOpen(false));
          }}
        >
          {t('cancel')}
        </Button>
        <Button
          className="h-[44px] w-full font-bold"
          submit={true}
          onClick={() => {
            copyText();
            setIsDefaultOpen(true);
            setTimeout(() => setIsDefaultOpen(false));
          }}
        >
          {t('copy')}
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

export default ModalCopyId;
