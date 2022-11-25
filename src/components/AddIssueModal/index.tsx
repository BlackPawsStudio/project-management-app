import { useEffect, useState } from 'react';
import Button from '../Button';
import Input from '../Input';
import Modal from '../Modal';

const AddIssueModal = () => {
  const modalOpener = <li className="button">Add issue</li>;
  const [isDefaultOpen, setIsDefaultOpen] = useState(false);

  const addIssue = () => {};

  const modalWindow = (
    <div className="relative h-[60vh] w-[50vh] overflow-hidden rounded-2xl bg-section">
      <div className="bg-circle -right-[45%] -top-[10%] h-[75vh] w-[75vh]" />
      <div className="absolute top-0 left-0 z-[2] h-full w-full p-[25px]">
        <h2 className="mb-[25px] text-2xl font-bold text-titleText">Add new issue</h2>
        <div className="flex h-[85%] w-full flex-col gap-[30px] rounded-2xl bg-white px-[50px] py-[30px] shadow-xxlInner">
          <div className="flex flex-col gap-[15px]">
            <Input placeholder="Issue title" size="w-full py-1" />
            <Input placeholder="Issue theme" size="w-full py-1" />
            <Input placeholder="Select an importance" size="w-full py-1" />
          </div>
          <textarea
            placeholder="Issue description"
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
              Cancel
            </Button>
            <Button submit onClick={addIssue}>
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal isDefaultOpen={isDefaultOpen} open={modalOpener}>
      {modalWindow}
    </Modal>
  );
};

export default AddIssueModal;
