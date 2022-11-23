import deleteIco from '/public/assets/component-images/deleteIcon.svg';
import lowest from '/public/assets/component-images/importance-icons/1.svg';
import low from '/public/assets/component-images/importance-icons/2.svg';
import middle from '/public/assets/component-images/importance-icons/3.svg';
import high from '/public/assets/component-images/importance-icons/4.svg';
import highest from '/public/assets/component-images/importance-icons/5.svg';
import Image from 'next/image';

import { ColumnType, IssueType } from '../../utils/types';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

interface IssueProps {
  data: IssueType;
  column: ColumnType;
}

const Issue = ({ data, column }: IssueProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { text, importance, estimation, theme } = JSON.parse(data.description);
  const isAdmin = true;

  const copyText = async () => await navigator.clipboard.writeText(data._id);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto" onClick={() => setIsOpen(false)}>
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Dialog.Panel>
                <div className="relative min-h-[500px] w-[600px] cursor-pointer rounded-3xl bg-issueBg p-4 shadow-xxl">
                  <h6 className="absolute w-full text-center text-3xl font-bold">{data.title}</h6>
                  <div className="mb-5 flex h-fit w-full items-center justify-between">
                    <h6 className="text-3xl">{column.title}</h6>
                    {isAdmin && (
                      <button>
                        <Image src={deleteIco} alt="Delete button" width={20} />
                      </button>
                    )}
                  </div>

                  <article className="mt-8 w-full text-left text-2xl">{text}</article>

                  <div className="absolute bottom-4 w-[calc(100%-32px)]">
                    <div className="mb-5 rounded-full bg-headerText px-2 py-1 text-left text-3xl text-white">
                      {theme}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <div className="h-10 w-10 text-center">
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
                        <div className="h-10 w-10 rounded-full bg-section text-center text-3xl">{estimation}</div>
                        <div className="h-10 w-10 rounded-full bg-section text-center text-3xl">
                          {`${data.userId}`[0]}
                        </div>
                        <div className="h-10 w-10 text-3xl">{data.userId}</div>
                      </div>
                      <div className="cursor-pointer text-3xl" title={'Copy id ' + data._id} onClick={copyText}>
                        {'id: ' + data._id.substring(0, 6) + '...'}
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </Transition>

      <div
        className="button min-h-[130px] w-full cursor-pointer rounded-3xl bg-issueBg p-4 pb-2 shadow-xxl"
        onClick={() => setIsOpen(true)}
      >
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
    </>
  );
};

export default Issue;
