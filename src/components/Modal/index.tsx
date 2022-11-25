import { Dialog, Transition } from '@headlessui/react';
import { Fragment, ReactNode, useEffect, useState } from 'react';

interface ModalProps {
  children: ReactNode | ReactNode[];
  open: ReactNode | ReactNode[];
  isDefaultOpen?: boolean;
}

const Modal = ({ children, open, isDefaultOpen }: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [wasTriggered, setWasTriggered] = useState(false);

  useEffect(() => {
    if (isDefaultOpen && !wasTriggered) {
      setIsOpen(false);
      setWasTriggered(true);
    }
  }, [isDefaultOpen]);

  useEffect(() => {
    if (isOpen) setWasTriggered(false);
  }, [isOpen]);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300 transition-opacity"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200  transition-opacity"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300 transition-opacity"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200  transition-opacity"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 overflow-y-auto" onClick={() => setIsOpen(false)}>
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Dialog.Panel>{children}</Dialog.Panel>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>

      <div onClick={() => setIsOpen(true)}>{open}</div>
    </>
  );
};

export default Modal;
