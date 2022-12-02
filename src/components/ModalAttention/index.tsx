import { ReactNode, useState } from 'react';
import Button from '../Button';
import Modal from '../Modal';

interface ModalAttentionProps {
  text: string;
  onSubmit: () => void;
  children: ReactNode | ReactNode[];
}

const ModalAttention = ({ text, onSubmit, children }: ModalAttentionProps) => {
  const [isDefaultOpen, setIsDefaultOpen] = useState(false);
  const modalOpener = children;

  const onClick = () => {
    onSubmit();
    setIsDefaultOpen(true);
    setTimeout(() => setIsDefaultOpen(false));
  };

  const modalWindow = (
    <div className="flex h-[190px] w-screen flex-col justify-between rounded-[15px] bg-section px-[20px] pt-[25px] pb-[25px] lg:w-[550px]">
      <h2 className="text-center text-[28px] font-bold text-titleText">{text}</h2>
      <div className="flex justify-center">
        <Button className="h-[38px] w-[80px] font-bold" submit onClick={onClick}>
          OK
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

export default ModalAttention;
