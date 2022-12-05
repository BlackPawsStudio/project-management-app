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
    <div className="flex h-[190px] w-screen flex-col justify-between rounded-[15px] bg-section px-[20px] pt-[25px] pb-[25px] lg:w-[550px]">
      <h2 className="text-[28px] font-bold text-titleText">{text}</h2>
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
    <Modal isDefaultOpen={isOpen} open={<></>}>
      {modalWindow}
    </Modal>
  );
  // return (
  //   <>
  //     <Transition appear show={isOpen} as={Fragment}>
  //       <Dialog as="div" className="relative z-20 h-screen w-screen" onClose={() => setIsOpen(false)}>
  //         <Transition.Child as={Fragment} {...transitionClasses}>
  //           <div className="fixed inset-0 bg-black bg-opacity-25" />
  //         </Transition.Child>
  //         <Transition.Child as={Fragment} {...transitionClasses}>
  //           <div className="fixed inset-0 overflow-y-auto" onClick={() => setIsOpen(false)}>
  //             <div className="flex min-h-full items-center justify-center p-4 text-center">
  //               <Dialog.Panel>{modalWindow}</Dialog.Panel>
  //             </div>
  //           </div>
  //         </Transition.Child>
  //       </Dialog>
  //     </Transition>
  //   </>
  // );
};

export default AuthErrorModal;
