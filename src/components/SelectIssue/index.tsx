import { Menu, Transition } from '@headlessui/react'
import Image from 'next/image';
import { Fragment, useEffect, useRef, useState } from 'react'
import lowest from '/public/assets/component-images/importance-icons/1.svg';
import low from '/public/assets/component-images/importance-icons/2.svg';
import middle from '/public/assets/component-images/importance-icons/3.svg';
import high from '/public/assets/component-images/importance-icons/4.svg';
import highest from '/public/assets/component-images/importance-icons/5.svg';

type IProps = {
  setFocusSelect: (bool: boolean) => void
  importance: number,
  setImportance: (num: number) => void
  update: () => void
}

export default function SelectIssue({ setFocusSelect, importance, setImportance, update }: IProps) {
  const [select, setSelect] = useState(lowest)

  useEffect(() => {
    switch (importance) {
      case 1: setSelect(lowest)
        break
      case 2: setSelect(low)
        break
      case 3: setSelect(middle)
        break
      case 4: setSelect(high)
        break
      case 5: setSelect(highest)
        break
      default:
        break
    }

  }, [importance])

  const updateIssue = (img: any, num: number) => {
    setSelect(img)
    setFocusSelect(false)
    setImportance(num)
    update()
  }

  return (
    <div className="p-0 h-10 w-10">
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
          <Menu.Items className="absolute right-0 mt-2 w-fit top-[-180px] divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => updateIssue(lowest, 1)}
                    className={`${active ? 'bg-headerText text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <Image src={lowest} alt={`Task importance is ${lowest}`} />
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => updateIssue(low, 2)}
                    className={`${active ? 'bg-headerText text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <Image src={low} alt={`Task importance is ${low}`} />
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => updateIssue(middle, 3)}
                    className={`${active ? 'bg-headerText text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <Image src={middle} alt={`Task importance is ${middle}`} />
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => updateIssue(high, 4)}
                    className={`${active ? 'bg-headerText text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <Image src={high} alt={`Task importance is ${high}`} />
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => updateIssue(highest, 5)}
                    className={`${active ? 'bg-headerText text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <Image src={highest} alt={`Task importance is ${highest}`} />
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

