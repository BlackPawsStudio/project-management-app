import { ReactNode, useState } from 'react';
import Button from '../Button';
import Modal from '../Modal';

interface ModalSureProps {
  text: string;
  onSubmit: () => void;
  children: ReactNode | ReactNode[];
}

const ModalSure = ({ text, onSubmit, children }: ModalSureProps) => {
  const [isDefaultOpen, setIsDefaultOpen] = useState(false);

  const modalOpener = children;

  const modalWindow = (
    <div className="flex h-[190px] w-[550px] flex-col justify-between rounded-[15px] bg-section px-[20px] pt-[25px] pb-[40px]">
      <h2 className="text-[28px] font-bold text-titleText">{text}</h2>
      <div className="flex justify-between px-[90px]">
        <Button
          className="h-[44px] w-[107px] font-bold"
          cancel={true}
          onClick={() => {
            setIsDefaultOpen(true);
            setTimeout(() => setIsDefaultOpen(false));
          }}
        >
          No
        </Button>
        <Button className="h-[44px] w-[107px] font-bold" submit={true} onClick={onSubmit}>
          Yes
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

export default ModalSure;
