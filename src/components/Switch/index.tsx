import { Tab } from '@headlessui/react';

const Switch = () => {

  const classNames = (...classes: string[]) => {
    return classes.join(' ');
  }

  const tabListStyle = 'w-[90px] h-[36px] px-[2px] rounded-lg flex justify-between items-center';
  const tabStyle = 'w-[32px] h-[28px] rounded-lg text-[20px] leading-6 font-bold';
  const borderStyle = 'border-solid border-[3px] border-headerText';
  const uiStyle = 'ui-selected:bg-white ui-selected:text-headerText ui-not-selected:bg-headerText ui-not-selected:text-background';

  return (
    <Tab.Group>
      <Tab.List className={classNames(tabListStyle, borderStyle)}>
        <Tab className={classNames(tabStyle, uiStyle, borderStyle)}>En</Tab>
        <Tab className={classNames(tabStyle, uiStyle, borderStyle)}>Ru</Tab>
      </Tab.List>
    </Tab.Group>
  );
}

export default Switch;
