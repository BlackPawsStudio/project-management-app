import { Menu, Transition } from '@headlessui/react';
import Image from 'next/image';
import { Fragment, useEffect, useState } from 'react';
import lowest from '/public/assets/component-images/importance-icons/1.svg';
import low from '/public/assets/component-images/importance-icons/2.svg';
import middle from '/public/assets/component-images/importance-icons/3.svg';
import high from '/public/assets/component-images/importance-icons/4.svg';
import highest from '/public/assets/component-images/importance-icons/5.svg';

interface IProps {
  importance: number;
  setImportance: (num: number) => void;
  update: () => void;
}

const imagesArr = [lowest, low, middle, high, highest];

export default function SelectIssue({ importance, setImportance, update }: IProps) {
  const [select, setSelect] = useState(lowest);

  useEffect(() => {
    switch (importance) {
      case 1:
        setSelect(lowest);
        break;
      case 2:
        setSelect(low);
        break;
      case 3:
        setSelect(middle);
        break;
      case 4:
        setSelect(high);
        break;
      case 5:
        setSelect(highest);
        break;
      default:
        break;
    }
  }, [importance]);

  const updateIssue = (img: any, num: number) => {
    setSelect(img);
    setImportance(num);
    update();
  };

  return (
    <div className="h-10 w-10 p-0">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="h-10 w-10 text-center">
            <Image src={select} alt={`Task importance is ${lowest}`} />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 top-[-180px] mt-2 w-fit divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {imagesArr.map((el, id) => (
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => updateIssue(el, id + 1)}
                    className={`${
                      active ? 'bg-headerText text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <Image src={el} alt={`Task importance is ${id}`} />
                  </button>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
