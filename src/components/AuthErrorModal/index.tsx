import { useState, useEffect } from 'react';
import Button from '../Button';
import '../../utils/i18next';
import Modal from '../Modal';

interface AuthErrorModalProps {
  text: string;
  isError: boolean;
  onLogInError: () => void;
  onSignUpError: () => void;
}

const AuthErrorModal = ({ text, isError, onLogInError, onSignUpError }: AuthErrorModalProps) => {
  const [isOpen, setIsOpen] = useState(isError);

  useEffect(() => {
    setIsOpen(isError);
  }, [isError]);

  const modalWindow = (
    <div className="flex lg:h-[190px] w-screen flex-col justify-between lg:rounded-[15px] bg-section px-[20px] py-[35px] lg:py-[25px] lg:w-[550px]">
      <h2 className="text-[28px] font-bold text-titleText mb-5">{text}</h2>
      <div className="flex justify-center">
        <Button
          className="h-[38px] w-[807px] font-bold"
          cancel={false}
          onClick={() => {
            setIsOpen(false);
            onLogInError();
            onSignUpError();
          }}
        >
          OK
        </Button>
      </div>
    </div>
  );

  return (
    <Modal isError isDefaultOpen={isOpen} open={<></>}>
      {modalWindow}
    </Modal>
  );
};

export default AuthErrorModal;
