import { Fragment, ReactNode, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Button from '../Button';
import { useTranslation } from 'react-i18next';
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
  useEffect(() => {setIsOpen(isError)}, [isError]);
  useEffect(() => {
    if (isOpen) {
      onLogInError();
      onSignUpError()
      }
    },
    [isOpen]);

  const transitionClasses = {
    enter: 'ease-out duration-300 transition-opacity',
    enterFrom: 'opacity-0',
    enterTo: 'opacity-100',
    leave: 'ease-in duration-200  transition-opacity',
    leaveFrom: 'opacity-100',
    leaveTo: 'opacity-0'
  };

  const modalWindow = (
    <div className="flex h-[190px] w-screen flex-col justify-between rounded-[15px] bg-section px-[20px] pt-[25px] pb-[25px] lg:w-[550px]">
      <h2 className="text-[28px] font-bold text-titleText">{text}</h2>
      <div className="flex justify-center">
        <Button
          className="h-[38px] w-[807px] font-bold"
          cancel={false}
          onClick={() => {
            setIsOpen(false);
            // setTimeout(() => setIsOpen(false));
          }}
        >
          OK
        </Button>
      </div>
    </div>
  );


  // return (
  //   <Modal isDefaultOpen={!isOpen} open={<></>}>{modalWindow}</Modal>
  // )
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-20 h-screen w-screen" onClose={() => setIsOpen(false)}>
          <Transition.Child as={Fragment} {...transitionClasses}>
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <Transition.Child as={Fragment} {...transitionClasses}>
            <div className="fixed inset-0 overflow-y-auto" onClick={() => setIsOpen(false)}>
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Dialog.Panel>{modalWindow}</Dialog.Panel>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
};

export default AuthErrorModal;
